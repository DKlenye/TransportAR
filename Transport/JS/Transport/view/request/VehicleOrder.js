T.view.VehicleOrder = Ext.extend(Ext.grid.GridPanel, {
    requireModels: 'WaybillType',

    constructor: function(cfg) {
        cfg = cfg || {};

        var me = this;

        var store = Kdn.ModelFactory.getStore('VehicleOrder',{
            autoSave: true,
            autoLoad: false,
            autoDestroy: true,
            api: {
                read: Kdn.Direct.OrderRead,
                update: Kdn.Direct.VehicleOrderUpdate,
                destroy: Kdn.Direct.Destroy
            }
        });

        var OrderDate = Ext.create({
            xtype: 'datefield',
            value: new Date(),
            listeners: {
                select: this.refreshOrders,
                scope: this
            }
        });


        var OrderColumn = Ext.create({
            xtype: 'combo.transportcolumn',
            enableClear: true,
            objectValue:false,
            listeners:
            {
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
        });


    var view = new Kdn.grid.PagingGridView();

    Ext.apply(cfg, {
            cls:'vehicleorder-grid',
            OrderDate: OrderDate,
            OrderColumn:OrderColumn,
            store: store,
            columnLines: true,
            stripeRows: true,
            loadMask: true,
            plugins: ['filterrow'],
            bbar: new Kdn.grid.PagingToolbar({
                              displayInfo: true,
                              pageSize: 50,
                              view: view
                          }),
                          selModel: new Kdn.grid.PagingRowSelModel({ singleSelect: true }),
                          view: view,
            colModel: new Ext.grid.ColumnModel({
                defaults: { filter: {} },
                columns: [
                     {
                         header: 'Статус',
                         align: 'center',
                         dataIndex: 'Status',
                         width: 100,
                         renderer: {
                             fn: function (value, metaData, record, rowIndex, colIndex, store) {
                                 if (record.get("IsInMaintenance")) {
                                     return '<span class="label label-important">Ремонт</span>';
                                 }
                                 if (record.get("BusinessTripDepartureDate") || record.get("ScheduleId") == 6) {
                                     return String.format('<span class="label label-black">Комманд.</span><br/><b>{0}</b>', record.get('DestRoutePoint') || '');
                                 }

                                 var drivers = record.get("Drivers");
                                 var IsSick = true;
                                 var IsHoliday = true;
                                 var IsHolidayDate;

                                 Ext.iterate(drivers, function (d) {
                                     if (IsSick) {
                                         IsSick = d.IsSick;
                                     }
                                     if (IsHoliday) {
                                         IsHoliday = !!d.IsHoliday;
                                         IsHolidayDate = d.IsHoliday;
                                     }
                                 });


                                 if (drivers && drivers.length > 0 && IsSick) {
                                     return '<span class="label label-warning">болн</span>';
                                 }

                                 if (drivers && drivers.length > 0 && IsHoliday) {
                                     return '<span class="label label-warning">отгул<br/></span>' + IsHolidayDate.format('d.m.Y');
                                 }


                                 if (me.isVehicleUsed(record)) {
                                     return '<span class="label label-success">Занят</span>';
                                 }
                                 return null;

                             },
                             scope: this
                         }
                     },
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
                            if (name == "click" && e.target.tagName=="IMG") {
                                var rec = grid.view.getRecordByIndex(rowIndex);

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
                                else
                                {
                                     var id = rec.get("VehicleOrderId");
                                      me.issueWaybill(id);
                                }
                               
                            }
                        }
                    },
                     {
                         header: 'Заказчик',
                         width: 350,
                         dataIndex: 'Customers',
                         renderer: function (v, m, r, Idx, colIdx, store) {
                             if (v.length < 1) return null;

                             var qtipTpl = "<b><span style='font-size:15px;'>[<span style='color:tomato'>{0}</span>] : {1} {2}</span></b>";
                             var customers = [],
                                    qtips = [];
                             Ext.iterate(v, function (customer) {
                                 var c = customer.Customer;
                                 if (c && c.CustomerName) {
                                     customers.push(
                                            String.format("<span style='color:blue'>{0}{1}</span>[<span style='color:tomato'>{2}</span>] {3}<span style='color:red'> {4}</span>",
                                            customer.DepartureTime || '',
                                            customer.ReturnTime ? ('-' + customer.ReturnTime) : '',
                                            customer.RequestId || "...",
                                            c.CustomerName,
                                            customer.Description || ""
                                            )
                                        );
                                     qtips.push(String.format(qtipTpl, customer.RequestId || "...", (c['CustomerName'] + '').replace(/"/g, '\''), customer.Description || ""));
                                 }
                             });

                             m.css = 'waybill-task-customer';
                             m.attr = 'ext:qtip="' + "<b><span style='font-size:15px;'>" + qtips.join('</br>') + "</span></b>" + '"';

                             return customers.join('</br>');

                         },
                         filter: {
                             test: function (f, o) {
                                 if (!f) return true;
                                 if (!o || o.length < 1) return false;

                                 var flag = false;
                                 var reg = new RegExp(f, 'i');

                                 Ext.iterate(o, function (v) {
                                     if (reg.test(v.Customer.CustomerName)) {
                                         flag = true;
                                         return false;
                                     }
                                 });

                                 return flag;
                             }
                         }
                     },
                     {
                         header: 'Группа',
                         width: 100,
                         xtype:'mappingcolumn',
                         dataIndex: 'Vehicle.GroupRequestId',
                         filter: {
                             field: { xtype: 'combo.grouprequest', enableClear: true, objectValue: false },
                             fieldEvents: ["select"],
                             test: function (filterValue, value, rec) {
                                 if (!filterValue) return true;
                                 return rec.get('Vehicle').GroupRequestId == filterValue;
                             }
                         },
                         renderer: function (v, metaData, record, rowIndex, colIndex, store) {
                            var store = Kdn.ModelFactory.getStore("GroupRequest"),
                                 rec = store.getById(record.get("Vehicle").GroupRequestId);
                             if (rec) return rec.get("GroupRequestName");
                             return null;
                         }
                         
                     },
                    { header: 'Гар.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.GarageNumber', width: 60 },
                    { header: 'Марка', xtype: 'mappingcolumn', dataIndex: 'Vehicle.Model', width: 100 },
                    { header: 'Гос.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.RegistrationNumber', width: 80 },
                    
                    {
                        header: '№  колонны',
                        xtype: 'mappingcolumn',
                        dataIndex: 'Vehicle.ColumnId',
                        hidden: true,
                        filter: {
                            field: { xtype: 'combo.transportcolumn', enableClear: true, objectValue: false },
                            fieldEvents: ["select"],
                            test: function(filterValue, value, rec) {
                                if (!filterValue) return true;
                                return rec.get('Vehicle').ColumnId == filterValue;
                            }
                        }
                    },
                     {
                         header: 'Водители',
                         width: 130,
                         dataIndex: 'Drivers',
                         renderer: function (e, m, r) {

                             if (e.length < 1) return null;

                             var qtipTpl = "<span style='font-size:14px; background-color:{5}'><b>Цех:{0} Taб.№:{1} {2} {3} {4}</b></span>";

                             var qtips = [],
                                    drivers = [];

                             Ext.iterate(e, function (driver) {
                                 var d = driver.Driver,
                                        e = d.Employee;

                                 qtips.push(String.format(qtipTpl,
                                        e.Department,
                                        e.EmployeeNumber,
                                        e.LastName,
                                        e.FirstName,
                                        e.MiddleName,
                                        driver.IsHoliday ? 'chartreuse' : (driver.IsSick ? 'tomato' : '')
                                        ));
                                 drivers.push(String.format("<span style='background-color:{3}'>{0} {1}.{2}.</span>",
                                     e.LastName,
                                     e.FirstName.substr(0, 1),
                                     e.MiddleName.substr(0, 1),
                                     driver.IsHoliday ? 'chartreuse' : (driver.IsSick ? 'tomato' : '')
                                     ));
                             });

                             if (m) {
                                 m.attr = 'ext:qtip="' + qtips.join("<br/>") + '"';
                             }

                             return drivers.join("<br/>");

                         },
                         filter: {
                             test: function (f, o) {
                                 if (!f) return true;
                                 if (!o || o.length < 1) return false;

                                 var flag = false;
                                 var reg = new RegExp(f, 'i');

                                 Ext.iterate(o, function (v) {
                                     if (reg.test(v.Driver.Employee.LastName)) {
                                         flag = true;
                                         return false;
                                     }
                                 });

                                 return flag;
                             }
                         }
                     },
                    { header: 'См', dataIndex: 'Shift', width: 30 },
                    {
                        header: 'Выезд',
                        dataIndex: 'DepartureDate',
                        width: 80,
                        renderer: function(v) {
                            if (!v && !v.format) return null;
                            return String.format(
                                '<span style="font-size:9pt;">{0}<span style="color:blue;"><b>{1}</b><span/><span/>',
                                v.format('d.m'),
                                v.format(' H:i')
                            );
                        }
                    },
                    {
                        header: 'Возвр.',
                        dataIndex: 'ReturnDate',
                        width: 80,
                        renderer: function(v) {
                            if (!v && !v.format) return null;
                            return String.format(
                                '<span style="font-size:9pt;">{0}<span style="color:blue;"><b>{1}</b><span/><span/>',
                                v.format('d.m'),
                                v.format(' H:i')
                            );
                        }
                    },
                    {
                        dataIndex: 'ScheduleId',
                        header: 'График работы',
                        width: 120,
                        editor: { xtype: 'combo.schedule', allowBlank: true, objectValue: false },
                        renderer: function(v) {
                            if (!v) return v;
                            var store = Kdn.ModelFactory.getStore('Schedule'),
                                rec = store.getById(v);
                            if (rec) return rec.get('ScheduleName');
                            return null;
                        }
                    },
                    {
                        dataIndex: 'Description',
                        header: 'Примечание',
                        width: 120
                    }
                ]
            }),
            tbar: [
                '-',
                {
                    text: 'Обновить',
                    iconCls: 'icon-refresh',
                    handler: this.refreshOrders,
                    scope: this
                },
                '-',
                'Дата:',
                OrderDate,
                { xtype: 'tbspacer', width: 20 },
                '-', 'Группа:',
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
                },
                '-', 'Колонна',
                OrderColumn,
                '-',
                {
                    text: 'Печать',
                    iconCls: 'icon-printer',
                    handler: function() {

                        var reportName = 'VehicleOrder';
                        var params = {};
                        params.date = this.OrderDate.getValue();
                        params.columnId = this.OrderColumn.getValue() || 0;
                        Kdn.Reporter.exportReport(reportName, params);
                    },
                    scope: this

                },
                '-',
                {
                    text: 'Выдать п.л.',
                    iconCls: 'icon-page_white_add'
                },
                '-'
            ]
        });

        T.view.VehicleOrder.superclass.constructor.call(this, cfg);

        this.on({
            afterrender: this.onAfterRender,
            scope: this,
            single: true,
            delay: 200
        });

    },

    onAfterRender: function() {
        this.refreshOrders();
    },

    refreshOrders: function() {
        var date = this.OrderDate.getValue();

        this.store.reload({
            params: { date: date }
        })
    },
    isVehicleUsed: function(rec) {
        return rec && ((rec.get('Customers') || []).length > 0);
    },

    issueWaybill: function(VehicleOrderId) {
        if (VehicleOrderId) {
            this.VehicleOrderId = VehicleOrderId;
            this.getEl().mask("Выдача путевого листа", "x-mask-loading");
            Kdn.Direct.InsertWaybillByOrder(VehicleOrderId, this.onWaybillInserted.createDelegate(this));
        }
    },

    onWaybillInserted: function(waybill) {

        var rec = this.store.getById(this.VehicleOrderId);
        rec.data["WaybillId"] = waybill.WaybillId;
        this.view.refresh();
        
        this.getEl().unmask();

        var $ = this;
        var printFn = function() {
            $.print(waybill);
        };
        var editFn = function() {
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

    print: function(waybill) {

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
            success: function(e) {
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

                setTimeout(function() { win.print(); }, 100);
                setTimeout(function() { CheckWindowState(); }, 100);
            },
            failure: function(e) {
                Ext.Msg.show({ width: 800, title: 'Ошибка', buttons: Ext.Msg.OK, msg: e.responseText })
            }
        });

    }

});

Ext.reg('view.vehicleorder', T.view.VehicleOrder);