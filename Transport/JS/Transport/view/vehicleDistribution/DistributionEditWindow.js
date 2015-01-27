T.view.vehicleDistribution.DistributionEditWindow = Ext.extend(Ext.Window, {
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            layout: {
                type: 'vbox',
                padding: '2',
                align: 'stretch'
            },
            defaults: { margins: '0 0 2 0' },
            items: [
                {
                    layout: 'form',
                    ref: 'form',
                    frame: true,
                    flex: 1,
                    defaults: {
                        xtype: 'textfield',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'datetimefield',
                            fieldLabel: 'Выезд',
                            anchor: null,
                            dataIndex: 'DepartureDate',
                            dateConfig: {
                                readOnly: true
                            }
                        },
                        {
                            xtype: 'datetimefield',
                            fieldLabel: 'Возвращение',
                            anchor: null,
                            dataIndex: 'ReturnDate'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Смена',
                            dataIndex: 'Shift'
                        },
                        {
                            xtype: 'combo.schedule',
                            objectValue: false,
                            fieldLabel: 'График',
                            dataIndex: 'ScheduleId'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Пункт назн.',
                            dataIndex: 'DestRoutePoint'
                        },
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Примечание',
                            dataIndex: 'Description'
                        }
                    ]
                },
                new Kdn.editor.LocalGrid({
                    ref: 'drivers',
                    title: 'Водители',
                    flex: 1,
                    store: new Ext.data.JsonStore({
                        fields: ['Driver','Description']
                    }),
                    viewConfig: {
                        forceFit: true
                    },
                    columns: [
                        {
                            header: 'Примечание',
                            dataIndex: 'Description',
                            editor: { xtype: 'textfield' }
                        },
                        {
                            header: 'Водитель',
                            dataIndex: 'Driver',
                            editor: { xtype: 'combo.driver' },
                            renderer: T.combo.Driver.prototype.renderTpl
                        }
                    ]
                }),
                new Kdn.editor.LocalGrid({
                    ref: 'customers',
                    startEditColumn: 1,
                    title: 'Заказчики',
                    flex: 1,
                    margins: 0,
                    store: new Ext.data.JsonStore({
                        idProperty: 'Id',
                        fields: ['Id', 'ListDetailId', 'RequestId', 'Customer', 'DepartureTime', 'Description', 'ReturnTime']
                    }),
                    viewConfig: {
                        forceFit: true
                    },
                    columns: [
                        {
                            header: 'С',
                            dataIndex: 'DepartureTime',
                            width: 90,
                            fixed: true,
                            editor: { xtype: 'kdn.editor.fulltimefield' }
                        },
                        {
                            header: 'По',
                            dataIndex: 'ReturnTime',
                            width: 90,
                            fixed: true,
                            editor: { xtype: 'kdn.editor.fulltimefield', enableClear: true }
                        },
                        {
                            header: '№ заявки',
                            dataIndex: 'RequestId',
                            width: 80,
                            fixed: true
                        },
                        {
                            header: 'Заказчик',
                            dataIndex: 'Customer',
                            editor: { xtype: 'combo.customer' },
                            renderer: function(v) {
                                if (!v) return null;
                                return String.format("[{0}] {1}", v.CustomerId, v.CustomerName);
                            }
                        },
                        {
                            header: 'Примечание',
                            dataIndex: 'Description',
                            editor: { xtype: 'textfield' }
                        }
                    ]
                })
            ],
            bbar: [
                '->',
                '-',
                {
                    xtype: 'button.save',
                    handler: this.onSave,
                    scope: this
                },
                '-'
            ]
        });

        T.view.vehicleDistribution.DistributionEditWindow.superclass.constructor.call(this, cfg);
    },

    showDetail:function(rec) {
        this.show();
        this.fillData(rec);
    },

     fillData:function(rec){
        this.fillCustomers(rec.get('Customers'));   
        this.fillDrivers(rec.get('Drivers')); 
        
        this.record = rec; 
        
        this.form.items.each(function(f){
           if(f.dataIndex){
            f.setValue(rec.get(f.dataIndex));
           }
        });

         this.setTitle(String.format("{0} Гар.№ {1}  {2}",
             rec.get("DepartureDate").format("d.m.Y"),
             rec.get("Vehicle").GarageNumber,
             rec.get("Vehicle").Model
         ));


     },
            
    fillCustomers:function(c){
        this.customers.store.loadData(c, false); 
    },
            
    fillDrivers:function(d){
        this.drivers.store.loadData(d, false);   
    },

    onSave:function(){
        var rec = this.record;
        var customers = [],drivers=[];
        
        this.customers.store.each(function(e){
            var o = Ext.copyTo({}, e.data, 'Id,ListDetailId,RequestId,Customer,DepartureTime,Description,ReturnTime');
            o.VehicleOrderId = rec.get('ListDetailId');
            o.Id = o.Id||0;
            if(o.Customer) customers.push(o); 
        }); 
        
        this.drivers.store.each(function(e){
            var o = Ext.copyTo({ Cause: 0 }, e.data, 'Driver,Description');
            o.VehicleOrderId = rec.get('ListDetailId');
            o.Id = o.Id || 0;
            drivers.push(o); 
        }); 
        
        rec.beginEdit();
        rec.set('Customers',customers);
        rec.set('Drivers',drivers);
        
        this.form.items.each(function(f){
            rec.set(f.dataIndex,f.getValue());
        });
                
        rec.endEdit();
        
        this.hide();                
    }

});

Ext.reg('view.distributioneditwindow', T.view.vehicleDistribution.DistributionEditWindow);