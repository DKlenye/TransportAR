T.view.vehicleDistribution.VehicleDistributionList = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(cfg) {
        cfg = cfg || {};

        var me = this;

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
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds) {
                    var date = Date.parseDate(String.format('{0} {1}', new Date().format('d.m.Y'), me.lastChange.getValue()), 'd.m.Y H:i');
                    var changeDate = record.get('LastChange');
                    return changeDate && changeDate>date ? 'red' : '';
                }
            },
            selModel: new Ext.grid.RowSelectionModel(),
            listeners: {
                    rowcontextmenu: this.onContext,
                    rowdblclick: this.onContext,
                    scope: this
                },
            colModel: new Ext.grid.ColumnModel({
                defaults: { filter: {},sortable:false },
                columns: this.getColumns()
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
                'Колонна',
                {
                    xtype: 'combo.transportcolumn',
                    ref:'../column',
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
                  width:70,
                  value:new Date(),
                  ref: '../lastChange',
                  listeners: {
                      select:function() {
                         me.getView().refresh();
                      }
                  }
                },
                '-',
                '->',
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
            ],
            bbar: [
                '-',
                {
                    text: 'Создать разнарядку',
                    iconCls: 'icon-add',
                    ref: '../createOrder',
                    handler: this.createOrders,
                    scope: this
                },
                '-',
                {
                    text: 'Добавить авто',
                    ref: '../addOrder',
                    iconCls: 'icon-add',
                    handler: function() {
                        this.getAddWindow().show();
                    },
                    scope: this
                },
                '-',
                {
                    text: 'Удалить авто',
                    ref: '../deleteOrder',
                    iconCls: 'icon-delete',
                    handler: function() {
                        var grid = this.grid;
                        var sel = grid.getSelectionModel().getSelections();
                        if (sel) {
                            Ext.Msg.confirm(
                                'Удаление строк',
                                'Удалить выделенные строки ?',
                                function(y) {
                                    if (y == 'yes') {
                                        grid.store.remove(sel);
                                    }
                                }
                            );
                        }
                    },
                    scope: this
                },
                '-'
            ]

        });
            T.view.vehicleDistribution.VehicleDistributionList.superclass.constructor.call(this, cfg);

            this.mon(store, {
                load: this.onStoreLoad,
                scope: this
            });
        },

        getColumns: function() {
        return [
            {
                header: 'Статус',
                align: 'center',
                dataIndex: 'Status',
                width: 100,
                renderer: {
                    fn: function(value, metaData, record) {
                        if (record.get("IsInMaintenance")) {
                            return '<span class="label label-important">Ремонт</span>';
                        }
                        if (record.get("BusinessTripDepartureDate") || record.get("ScheduleId") == 6) {
                            return String.format('<span class="label label-black">Комманд.</span><br/><b>{0}</b>', record.get('DestRoutePoint') || '');
                        }


                        var drivers = record.get("Drivers");
                        var ret = "";
                        var status = {
                            0: '', //свободен
                            1: 'отпуск', // отпуск
                            2: 'болн', // больничный
                            3: 'отгул' //отгул
                        };


                        if (drivers && drivers.length > 0) {

                            var outOfWorkCount = 0;

                            Ext.iterate(drivers, function(d) {
                                if (d.Cause > 0) {
                                    outOfWorkCount++;
                                    ret = String.format('<span class="label label-warning">{0}</span>', status[d.Cause]);
                                }
                            });
                            
                            if (outOfWorkCount == drivers.length) {
                                return ret;
                            }
                        }
                        
                        var customers = record.get('Customers');
                        if (customers && customers.length > 0) {
                            return '<span class="label label-success">Занят</span>';
                        }
                        return null;

                    },
                    scope: this
                }
            },
            {
                header: 'Заказчик',
                width: 350,
                dataIndex: 'Customers',
                renderer: function(v, m, r, Idx, colIdx, store) {

                    var qtipTpl = "<b><span style='font-size:15px;'>[<span style='color:tomato'>{0}</span>] : {1} {2}</span></b>";
                    var customers = [],
                        qtips = [];
                    Ext.iterate(v, function(customer) {
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
                    test: function(f, o) {
                        if (!f) return true;
                        if (!o || o.length < 1) return false;

                        var flag = false;
                        var reg = new RegExp(f, 'i');

                        Ext.iterate(o, function(v) {
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
                xtype: 'mappingcolumn',
                dataIndex: 'Vehicle.GroupRequestId',
                renderer: function(v, metaData, record, rowIndex, colIndex, store) {
                    var store = Kdn.ModelFactory.getStore("GroupRequest"),
                        rec = store.getById(record.get("Vehicle").GroupRequestId);
                    if (rec) return rec.get("GroupRequestName");
                    return null;
                },
                filter: {
                    field: { xtype: 'combo.grouprequest', enableClear: true, objectValue: false, listWidth: 200 },
                    fieldEvents: ["select"],
                    test: function(filterValue, value, rec) {
                        if (!filterValue) return true;
                        return rec.get('Vehicle').GroupRequestId == filterValue;
                    }
                }
            },
            { header: 'г.п', xtype: 'mappingcolumn', dataIndex: 'Vehicle.CapacityTonns', width: 45 },
            {
                header: 'Водители',
                width: 250,
                dataIndex: 'Drivers',
                renderer: function(e, m, r) {

                    if (e && e.length < 1) return null;

                    var qtipTpl = "<span style='font-size:14px; background-color:{5}'>  <b>Цех:{0} Taб.№:{1} {2} {3} {4}</b></span>";
                    var tpl = "<img driverId = '{6}' style='cursor:pointer' src='images/icons/{3}.png'> <span style='font-size:14px; background-color:{5}'>{4} <span style='color:red'>{7}</span> {0} {1}.{2}.</span>";

                    var statusImages = {
                        0: 'bullet_white', //свободен
                        1: 'status', // отпуск
                        2: 'status-busy', // больничный
                        3: 'status-away' //отгул
                    };

                    var statusColors = {
                        0: '',
                        1: 'rgb(133, 236, 146)',
                        2: 'rgb(249, 151, 151)',
                        3: 'khaki'
                    }

                    var qtips = [],
                        drivers = [];

                    Ext.iterate(e, function(driver) {
                        var d = driver.Driver,
                            em = d.Employee;

                        qtips.push(String.format(qtipTpl,
                            em.Department,
                            em.EmployeeNumber,
                            em.LastName,
                            em.FirstName,
                            em.MiddleName,
                            statusColors[driver.Cause]
                        ));

                        drivers.push(String.format(tpl,
                            em.LastName,
                            em.FirstName.substr(0, 1),
                            em.MiddleName.substr(0, 1),
                            statusImages[driver.Cause],
                            driver.Cause == 0 ? "" : "(" + (!!driver.Start ? driver.Start.format('d.m') : "...") + "-" + (!!driver.End ? driver.End.format('d.m') : "...") + ")",
                            statusColors[driver.Cause],
                            d.DriverId,
                            driver.Description || '&nbsp'
                        ));
                    });

                    if (m) {
                        m.attr = 'ext:qtip="' + qtips.join("<br/>") + '"';
                    }

                    return drivers.join("<br/>");

                },
                filter: {
                    test: function(f, o) {
                        if (!f) return true;
                        if (!o || o.length < 1) return false;

                        var flag = false;
                        var reg = new RegExp(f, 'i');

                        Ext.iterate(o, function(v) {
                            if (reg.test(v.Driver.Employee.LastName)) {
                                flag = true;
                                return false;
                            }
                        });

                        return flag;
                    }
                },
                processEvent: function(name, e, grid, rowIndex, colIndex) {
                    if (name == "click" && e.target.tagName == "IMG") {
                        var driverId = Ext.get(e.target).getAttribute('driverId');
                        var rec = grid.store.getAt(rowIndex);

                        var driver;

                        Ext.iterate(rec.get("Drivers"), function(d) {
                            if (d.Driver.DriverId == driverId) {
                                driver = d.Driver;
                                return false;
                            }
                        });

                        var window = grid.getOutOfWorkWindow();
                        window.showWithDriver(driver);
                    }
                }
            },
            { header: 'Гос.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.RegistrationNumber', width: 80 },
            { header: 'Гар.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.GarageNumber', width: 60 },
            { header: 'Марка', xtype: 'mappingcolumn', dataIndex: 'Vehicle.Model', width: 100 },
            { header: 'См', dataIndex: 'Shift', width: 30 },
            {
                header: 'Выезд',
                dataIndex: 'DepartureDate',
                width: 45,
                renderer: function(v, m, r, Idx, colIdx, store) {
                    if (!v || !v.format) return null;

                    var v = r.get("BusinessTripDepartureDate") || v;

                    return String.format(
                        '<span style="font-size:9pt;">{0}<br><span style="color:blue;"><b>{1}</b><span/><span/>',
                        v.format('d.m'),
                        v.format('H:i') == "00:00" ? "" : v.format('H:i')
                    );
                }
            },
            {
                header: 'Возвр.',
                dataIndex: 'ReturnDate',
                width: 45,
                renderer: function(v) {
                    if (!v || !v.format) return null;
                    return String.format(
                        '<span style="font-size:9pt;">{0}<br><span style="color:blue;"><b>{1}</b><span/><span/>',
                        v.format('d.m'),
                        v.format('H:i')
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
            },
            {
                header:'Изменено',
                dataIndex:'LastChange',
                xtype:'datecolumn',
                format:'d.m H:i:s'
            },
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
            }
        ]
    },

    reload: function() {
        var date = this.listDate.getValue();
        this.store.reload({
            params: { date: date }
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

    getOutOfWorkWindow: function() {

        if (!this.outOfWorkWindow) {
            this.outOfWorkWindow = Ext.create({
                xtype: 'view.driveroutofworkwindow',
                constrain: true,
                width: 600,
                height: 500,
                closeAction: 'hide',
                renderTo: this.windowConstrain.getBody(),
                listeners: {
                    'outofworkchange': this.onOutOfWorkChange,
                    scope:this
                }
            });
        }
        return this.outOfWorkWindow;
    },

    getEditWindow: function() {
    
        if (!this.editWindow) {
            this.editWindow = Ext.create({
                xtype: 'view.distributioneditwindow',
                constrain: true,
                width: 600,
                height: 680,
                closeAction: 'hide',
                renderTo: this.windowConstrain.getBody()
            });
        }
        return this.editWindow;
    },

    getAddWindow:function() {
        if (!this.addWindow) {
            this.addWindow = Ext.create({
                xtype: 'view.distributionaddwindow',
                constrain: true,
                width: 600,
                height: 680,
                closeAction: 'hide',
                renderTo: this.windowConstrain.getBody(),
                listeners: {
                    'vehicleadd': this.onVehicleAdd,
                    scope: this
                }
            });
        }
        return this.addWindow;
    },


    onStoreLoad: function (s, rec, o) {
        var count = !s.data?0:s.getCount();
        this.createOrder.setDisabled(count != 0);
        this.addOrder.setDisabled(count == 0);
        this.deleteOrder.setDisabled(count == 0);

        if (count > 0) {
            this.sortStore();
        }

    },

    onContext: function (grid, idx, e) {
        var window = this.getEditWindow();
        var rec = this.store.getAt(idx);
        window.showDetail(rec);
        e.stopEvent();
        return false;
    },

    createOrders:function(){
       var date = this.listDate.getValue();
        this.getEl().mask('Создание разнарядки', 'x-mask-loading');
      Kdn.Direct.DistributionListCreate(date,this.onCreateOrders.createDelegate(this));              
    },
    
    onCreateOrders:function(){
        this.getEl().unmask();
        this.reload();
    },

    refreshDetail:function(id) {
        Kdn.Direct.DistributionListDetailRead(id, this.onRefreshDetail.createDelegate(this));
    },

    onRefreshDetail:function(e) {
        var r = this.store.getById(e.ListDetailId);
        this.store.reader.update(r, e);

    },

    onOutOfWorkChange: function (driver) {

        var recs = [], me = this;
        this.store.each(function(r) {
            var d = r.get("Drivers");
            if (d) {
                d.map(function (_d) {
                    if (driver.DriverId == _d.Driver.DriverId) {
                        recs.push(r);
                    }
                });
            }
        });

        Ext.iterate(recs, function (i) {
            var id = i.get("ListDetailId");
            me.refreshDetail(id);
        });

    },

    onVehicleAdd:function(v) {
        var me = this;
        v.Date = this.listDate.getValue();

        Kdn.Direct.DistributionListAdd(v, function (e) {
            me.store.loadData({ data: [e] }, true);
            me.getAddWindow().hide();
        });
    }


});

Ext.reg('view.vehicledestributionlist', T.view.vehicleDistribution.VehicleDistributionList);