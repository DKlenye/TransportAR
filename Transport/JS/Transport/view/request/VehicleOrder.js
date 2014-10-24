T.view.VehicleOrder = Ext.extend(Ext.grid.GridPanel, {
    
    constructor: function(cfg) {
        cfg = cfg || {};
        
        var me = this;
        
        var store = Kdn.ModelFactory.getModel('VehicleOrder').buildStore({
            autoSave: true,
            autoLoad: false,
            autoDestroy: true,
            api: {
                read: Kdn.Direct.OrderRead,
                update: Kdn.Direct.Update
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
        
        Ext.apply(cfg, {
            OrderDate:OrderDate,
            store:store,
            columnLines:true,
            stripeRows:true,
            loadMask:true,
            plugins: ['filterrow'],
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
               columns: [
                        {
                            header: 'Статус',
                            align: 'center',
                            dataIndex: 'Status',
                            width: 100,
                            renderer: {
                                fn: function(value, metaData, record, rowIndex, colIndex, store) {
                                    if (me.isVehicleUsed(record)) {
                                        return '<span class="label label-success">Занят</span>'
                                    }
                                    return null;

                                },
                                scope: this
                            }
                        },
                        {
                            header:'путевой лист',
                            width:'100',
                            dataIndex:'WaybillNumber'
                        },
                        {
                            header: 'Заказчик',
                            width: 170,
                            dataIndex: 'Customers',
                            renderer: function(v, m, r, Idx, colIdx, store) {
                                if (v.length < 1) return null;

                                var qtipTpl = "<b><span style='font-size:15px;'>[<span style='color:tomato'>{0}</span>] : {1} </span></b>";
                                var customers = [],
                                    qtips = [];
                                Ext.iterate(v, function(customer) {
                                    var c = customer.Customer;
                                    if(c && c.CustomerName){
                                        customers.push(String.format("[<span style='color:tomato'>{0}</span>] {1}",customer.RequestId||"...",c.CustomerName));
                                        qtips.push(String.format(qtipTpl, customer.RequestId || "...", (c['CustomerName'] + '').replace(/"/g, '\'')));
                                    }
                                });

                                m.css = 'waybill-task-customer';
                                m.attr = 'ext:qtip="' + "<b><span style='font-size:15px;'>" + qtips.join('</br>') + "</span></b>" + '"';

                                return customers.join('</br>');

                            },
                            filter: {
                                test: function(f, o) {
                                    if (!f) return true;
                                    if (!o || o.length<1) return false;
                                    
                                    var flag = false;
                                    var reg = new RegExp(f, 'i');                                    
                                    
                                   Ext.iterate(o,function(v){
                                        if(reg.test(v.Customer.CustomerName)){
                                            flag=true;
                                            return false;
                                        }
                                   });
                                    
                                    return flag;
                                }
                            }
                        },
                        { header: 'Гар.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.GarageNumber', width: 60 },
                        { header: 'Марка', xtype: 'mappingcolumn', dataIndex: 'Vehicle.Model', width: 100 },
                        { header: 'Гос.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.RegistrationNumber', width: 80 },
                        { header: 'Группа', xtype: 'mappingcolumn', dataIndex: 'Vehicle.GroupRequestId', hidden:true,
                            filter: {
                                field: { xtype: 'combo.grouprequest', enableClear: true, objectValue: false },
                                fieldEvents: ["select"],
                                test: function(filterValue, value, rec) {
                                    if (!filterValue) return true;
                                    return rec.get('Vehicle').GroupRequestId == filterValue;
                                }
                            }
                        },
                        { header: '№  колонны', xtype: 'mappingcolumn', dataIndex: 'Vehicle.ColumnId',hidden:true,
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
                            renderer: function(e, m, r) {

                                if (e.length < 1) return null;

                                var qtipTpl = "<span style='font-size:14px;'><b>Цех:{0} Taб.№:{1} {2} {3} {4}</b></span>";

                                var qtips = [],
                                    drivers = [];

                                Ext.iterate(e, function(driver) {
                                    var d = driver.Driver,
                                        e = d.Employee;

                                    qtips.push(String.format(qtipTpl, e.Department, e.EmployeeNumber, e.LastName, e.FirstName, e.MiddleName))
                                    drivers.push(String.format("{0} {1}.{2}.", e.LastName, e.FirstName.substr(0, 1), e.MiddleName.substr(0, 1)));
                                });

                                if (m) {
                                    m.attr = 'ext:qtip="' + qtips.join("<br/>") + '"';
                                }

                                return drivers.join("<br/>");

                            },
                            filter: {
                                test: function(f, o) {
                                    if (!f) return true;
                                    if (!o || o.length<1) return false;
                                    
                                    var flag = false;
                                    var reg = new RegExp(f, 'i');                                    
                                    
                                   Ext.iterate(o,function(v){
                                        if(reg.test(v.Driver.Employee.LastName)){
                                            flag=true;
                                            return false;
                                        }
                                   });
                                    
                                    return flag;
                                }
                            }
                        },
                        { header: 'См',dataIndex: 'Shift',width:30},
                        { 
                            header: 'Выезд',
                            dataIndex: 'DepartureDate',
                            width:80,
                            renderer:function(v){
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
                            width:80,
                            renderer:function(v){
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
                            renderer: function(v)
                            {
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
                    { xtype: 'combo.grouprequest', enableClear: true, objectValue: false,
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
                    { xtype: 'combo.transportcolumn', enableClear: true, objectValue: false,
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
                    {
                        text:'Печать',
                        iconCls:'icon-printer',
                        handler:function(){
                        
                            var reportName = 'VehicleOrder';
                            var params = {};
                            params.date = this.OrderDate.getValue();
                            Kdn.Reporter.exportReport(reportName, params);
                        },
                        scope:this
                        
                    },                    
                    '-',
                    {
                        text:'Выдать п.л.',
                        iconCls:'icon-page_white_add'
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
    }
});

Ext.reg('view.vehicleorder', T.view.VehicleOrder);