T.view.DriverMedical = Ext.extend(Kdn.view.BaseGrid, {
   modelName: 'DriverMedical',
   pageSize:50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new T.colModel.DriverMedical({
               defaults:{filter:{}},               
               columns:[
                    {
                        dataIndex: 'Driver',
                        hidden:true,
                        hideable:false,
                        header:'Водитель',
                        editor:{
                           xtype:'combo.driver'
                        }                                    
                    },
                    {
                        dataIndex: 'Driver.Employee.Department',
                        xtype:'mappingcolumn',
                        header: 'Цех/Пр-во',
                        width: 100
                    },
                    {
                        dataIndex: 'Driver.Employee.EmployeeNumber',
                        xtype:'mappingcolumn',
                        header: 'Таб. №',
                        width: 70
                    },
                    {
                        dataIndex: 'Driver.Employee.LastName',
                        xtype:'mappingcolumn',
                        header: 'Фамилия',
                        width: 120
                    },
                    {
                        dataIndex: 'Driver.Employee.FirstName',
                         xtype:'mappingcolumn',
                        header: 'Имя',
                        width: 120
                    },
                    {
                        dataIndex: 'Driver.Employee.MiddleName',
                        xtype:'mappingcolumn',
                        header: 'Отчество',
                        width: 120
                    }
               ]
            })
        });

        T.view.DriverMedical.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.drivermedical', T.view.DriverMedical);