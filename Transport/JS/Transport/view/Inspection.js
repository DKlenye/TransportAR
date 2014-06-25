T.view.Inspection = Ext.extend(Kdn.view.BaseGrid, {
   modelName: 'Inspection',
   pageSize:50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.Inspection({
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

        T.view.Inspection.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.inspection', T.view.Inspection);