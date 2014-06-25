T.view.Insurance = Ext.extend(Kdn.view.BaseGrid, {
   modelName: 'Insurance',
   pageSize:50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.Insurance({
               defaults:{filter:{}},
               columns:[
                  {
                        dataIndex: 'Car',
                        hidden:true,
                        hideable:false,
                        header:'Транспортное средство',
                        editor:{
                           xtype:'combo.car2'
                        }                                    
                    },
                    {
                        dataIndex: 'Car.GarageNumber',
                        xtype:'mappingcolumn',
                        align: 'center',
                        header: 'Гар. №',
                        width: 70                    
                    },
                    {
                        dataIndex: 'Car.Model',
                        xtype:'mappingcolumn',
                        header: 'Марка',
                        width: 200
                    },
                    {
                        dataIndex: 'Car.RegistrationNumber',
                        align: 'center',
                        xtype:'mappingcolumn',
                        header: 'Гос. №',
                        width: 90
                    }
               ]
            })
        });

        T.view.Insurance.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.insurance', T.view.Insurance);