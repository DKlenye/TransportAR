T.view.CheckCO = Ext.extend(Kdn.view.BaseGrid, {
   pageSize:50,
   modelName: 'CheckCO',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.CheckCO({
               defaults:{filter:{}},
               columns:[
                  {
                        dataIndex: 'Car',
                        hidden:true,
                        hideable:false,
                        header:'Транспортное средство',
                        editor:{
                           xtype:'combo.car'
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

        T.view.CheckCO.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.checkco', T.view.CheckCO);