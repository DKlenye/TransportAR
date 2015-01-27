T.view.vehicleDistribution.DispatcherTask = Ext.extend(Ext.grid.GridPanel, {

    constructor:function(cfg) {
        cfg = cfg || {};

        var columns = T.view.vehicleDistribution.VehicleDistributionList.prototype.getColumns();
        var me = this;
        
        columns = [
             {
                 header: 'путевой лист',
                 width: '100',
                 dataIndex: 'WaybillId',
                 align: 'center',
                 renderer: Kdn.Renderer.icons(function (v, r) {

                     if (r.get('IsInMaintenance')) {
                         return null;
                     }

                     if (v) {
                         return { iconCls: 'page_white_edit', text: ' ' + v };
                     }
                     return 'page_white_add';
                 }),
                 processEvent: function (name, e, grid, rowIndex, colIndex) {
                     if (name == "click" && e.target.tagName == "IMG") {
                         var rec = grid.store.getAt(rowIndex);

                         if (rec.get("IsInMaintenance")) {
                             return;
                         }

                         var waybillId = rec.get("WaybillId");
                         if (waybillId) {
                             Kdn.Application.createView({
                                 xtype: 'view.waybilleditor',
                                 mode: 'update',
                                 withContainer: false,
                                 waybillId: waybillId
                             });
                         }
                         else {
                             var id = rec.get("ListDetailId");
                             me.issueWaybill(id);
                         }

                     }
                 }
             },
             {
                header: 'Проверено',
                width:40,
                dataIndex: 'IsDispatcherCheck',
                renderer:function(v,meta,rec) {
                    var waybillId = rec.get("WaybillId");
                    if (waybillId) {
                        meta.css += " x-grid3-check-col-td";
                        return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', !!v ? "-on" : "");
                    }
                }
             }
        ].concat(columns);



            var store = Kdn.ModelFactory.getModel('DistributionListDto').buildStore({
            autoSave: true,
            autoLoad: false,
            api: {
                read: Kdn.Direct.DistributionListRead,
                update: Kdn.Direct.DistributionListUpdate,
                destroy: Kdn.Direct.DistributionListDestroy
            }
        });

        Ext.apply(cfg, {
               cls: 'vehicleorder-grid',
            store: store,
            loadMask: true,
            columnLines: true,
            stripeRows: true,
            plugins: ['filterrow'],
            selModel: new Ext.grid.RowSelectionModel(),
            colModel: new Ext.grid.ColumnModel({
                defaults: { filter: {},sortable:false },
                columns: columns
            }),
            tbar: [
                '-', {
                    text: 'Обновить',
                    iconCls: 'icon-refresh',
                    handler: this.reload,
                    scope: this
                },
                '-',
                'Дата:',
                {
                    xtype: 'datefield',
                    ref: '../listDate',
                    value: new Date(),
                    listeners: {
                        select: this.reload,
                        scope: this
                    }
                },
                '-',
                { xtype: 'tbspacer', width: 20 },
                /*'-', 'Группа:',
                {
                    xtype: 'combo.grouprequest',
                    enableClear: true,
                    objectValue: false,
                    listeners: {
                        select: function(e) {
                            var val;
                            if (!e) val = null;
                            else val = e.getValue();

                            var cm = me.colModel;
                            var column = cm.getColumnAt(cm.findColumnIndex('Vehicle.GroupRequestId'));
                            var combo = column.filter.field;
                            combo.setValue(val);
                            combo.fireEvent('select', combo);
                        }
                    }
                },*/
                '-', 'Колонна',
                {
                    xtype: 'combo.transportcolumn',
                    ref:"../column",
                    enableClear: true,
                    objectValue: false,
                    listeners: {
                        select: function(e) {
                            var val;
                            if (!e) val = null;
                            else val = e.getValue();

                            var cm = me.colModel;
                            var column = cm.getColumnAt(cm.findColumnIndex('Vehicle.ColumnId'));
                            var combo = column.filter.field;
                            combo.setValue(val);
                            combo.fireEvent('select', combo);
                        }
                    }
                },
                '-',
                'Время изменений',
                {
                    xtype: 'kdn.editor.fulltimefield',
                    width: 70,
                    value: new Date(),
                    ref: '../lastChange',
                    listeners: {
                        select: function () {
                            me.getView().refresh();
                        }
                    }
                },
                '-',
                {
                    text: 'Печать',
                    iconCls: 'icon-printer',
                    handler: function () {
                        var reportName = 'DistributionListPrint';
                        var params = {};
                        params.date = this.listDate.getValue();
                        params.columnId = this.column.getValue() || 0;
                        Kdn.Reporter.exportReport(reportName, params);
                    },
                    scope: this
                },
                '-'

            ]

        });
       T.view.vehicleDistribution.RequestGrid.superclass.constructor.call(this, cfg);

       this.mon(store, {
           load: this.onStoreLoad,
           scope: this
       });

        this.on({
            afterrender: this.onAfterRender,
            single: true,
            scope: this,
            buffer:100
        });

    },

    onAfterRender:function() {

        this.reload();

    },

    reload: function() {
        var date = this.listDate.getValue();
        this.store.reload({
            params: { date: date }
        });
    },

    issueWaybill: function (ListDetailId) {
        if (ListDetailId) {
            this.ListDetailId = ListDetailId;
            this.getEl().mask("Выдача путевого листа", "x-mask-loading");
            Kdn.Direct.InsertWaybillByDetail(ListDetailId, this.onWaybillInserted.createDelegate(this));
        }
    },

    onWaybillInserted: function (waybill) {

        var rec = this.store.getById(this.ListDetailId);
        rec.data["WaybillId"] = waybill.WaybillId;
        this.view.refresh();

        this.getEl().unmask();

        var $ = this;
        var printFn = function () {
            $.print(waybill);
        };
        var editFn = function () {
            Kdn.Application.createView({
                xtype: 'view.waybilleditor',
                mode: 'update',
                withContainer: false,
                waybillId: waybill['WaybillId']
            });
        }

        if (this.notify) {
            this.notify.close();
        }
        this.notify = Ext.Msg.notify({
            waybill: waybill,
            html: String.format('Выдан бланк путевого листа № <b><span style="color:green">{0}</span></b><br/> на дату <b>{1} <span style="color:blue">{2}</span></b><br/> Гаражный № <b>{3}</b> ', waybill.WaybillId, waybill.DepartureDate.format('d.m.Y'), waybill.DepartureDate.format('H:i'), waybill.Car.GarageNumber),
            autoHide: false,
            cls: 'CFnotify',
            width: 300,
            height: 150,
            renderTo: this.getEl(),
            constrain: true,
            title: new Date().format("H:i"),
            bbar: [
                '-',
                {
                    text: 'Печать',
                    iconCls: 'icon-printer',
                    handler: printFn
                }, '-', '->',
                '-',
                {
                    text: 'Обработать',
                    iconCls: 'icon-page_white_edit',
                    handler: editFn
                }, '-'
            ]
        });

        if (waybill) {
            this.print(waybill);
        }

    },

    print: function (waybill) {

        var id = waybill['WaybillTypeId']
        if (!id) {
            Ext.Msg.alert('', 'Не выбран бланк путевого листа');
            return;
        };

        var url = Kdn.ModelFactory.getStore('WaybillType').getById(id).get('UrlTemplate');
        var URL = Ext.urlAppend("print/" + url + ".aspx", Ext.urlEncode({ WaybillId: waybill.WaybillId }));

        Ext.Ajax.request({
            url: URL,
            method: 'GET',
            success: function (e) {
                var win = window.open('', 'printer', 'menubar=0,location=0,resizable=no,scrollbars=no,status=0,width=' + screen.width + ',height=' + screen.height);
                win.document.write(e.responseText);
                win.document.close();

                function CheckWindowState() {
                    if (win.document.readyState == "complete") {
                        win.close();
                    } else {
                        CheckWindowState.defer(500);
                    }
                }

                setTimeout(function () { win.print(); }, 100);
                setTimeout(function () { CheckWindowState(); }, 100);
            },
            failure: function (e) {
                Ext.Msg.show({ width: 800, title: 'Ошибка', buttons: Ext.Msg.OK, msg: e.responseText })
            }
        });

    },

    sortStore: function () {

        var gStore = Kdn.ModelFactory.getStore("GroupRequest");
        var getGroup = function (rec) {
            var group = gStore.getById(rec.get("Vehicle").GroupRequestId);
            return group.get("OrderId");
        };
        
        this.store.data.sort('ASC',function(rec1,rec2) {
            var rez = getGroup(rec1) - getGroup(rec2);
            if (rez == 0) {
                return rec1.get("Vehicle").GarageNumber - rec2.get("Vehicle").GarageNumber;
            }
            return rez;
        });
    },
     onStoreLoad: function (s, rec, o) {
        var count = !s.data?0:s.getCount();
        if (count > 0) {
            this.sortStore();
        }
    }

});

Ext.reg('view.dispatchertask', T.view.vehicleDistribution.DispatcherTask);