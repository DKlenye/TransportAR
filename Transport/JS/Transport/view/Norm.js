T.view.Norm = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Norm',
    editor: 'view.normeditor',
    pageSize: 50,
    constructor: function(cfg)
    {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.Norm({
               defaults:{filter:{}},
               columns: [                    
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

        T.view.Norm.superclass.constructor.call(this, cfg);

    },

    _getStore: function()
    {
        Kdn.ModelFactory.getStore('Increase');
        Kdn.ModelFactory.getStore('WorkUnit');
        return T.view.Norm.superclass._getStore.call(this);  
    }
});

Ext.reg('view.norm', T.view.Norm);