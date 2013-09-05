T.view.Driver = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Driver',
    editor:'view.drivereditor',
    pageSize: 50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {           
            colModel: new Ext.grid.ColumnModel({
                 defaults:{
                     filter:{} 
                  },
                columns: [
                    {
                        dataIndex: 'DriverId',
                        header: 'Код',
                        hidden:true,
                        width: 90,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'DriverClass',
                        header: 'Класс',
                        hidden:true,
                        width: 90,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'Employee',
                        header: 'Работник',
                        hidden:true,
                        hideable:false,
                        editor:{
                           xtype:'combo.employee',
                           allowBlank:false
                        }
                    },
                    {
                        dataIndex: 'Employee.EmployeeId',
                        xtype:'mappingcolumn',
                        header: 'Код работника',
                        width: 100
                    },
                    {
                        dataIndex: 'Employee.Department',
                        xtype:'mappingcolumn',
                        header: 'Цех/Пр-во',
                        width: 100
                    },
                    {
                        dataIndex: 'Employee.EmployeeNumber',
                        xtype:'mappingcolumn',
                        header: 'Таб. №',
                        width: 70
                    },
                    {
                        dataIndex: 'Employee.LastName',
                        xtype:'mappingcolumn',
                        header: 'Фамилия',
                        width: 120
                    },
                    {
                        dataIndex: 'Employee.FirstName',
                         xtype:'mappingcolumn',
                        header: 'Имя',
                        width: 120
                    },
                    {
                        dataIndex: 'Employee.MiddleName',
                        xtype:'mappingcolumn',
                        header: 'Отчество',
                        width: 120
                    },
                    {
                       dataIndex: 'Employee.Office',
                       xtype:'mappingcolumn',
                       header: 'Должность',
                       width: 300
                    },
                    {
                       dataIndex: 'Employee.DSC',
                       width:120, 
                       xtype:'mappingcolumn',
                       header: 'Нафтан/Полимир',
                       renderer:function(e){
                           if (e){
                              return e==1?'Нафтан':'Полимир';
                           }
                           return e;
                       },
                       filter:{
                           field:{
                              xtype:'combo.ownerdsc',
                              objectValue:false,
                              enableClear:true
                           },
                           fieldEvents:["select"],
                           test: function(filterValue, value) {
                               if (!filterValue) return true;
                               return value == filterValue;
                           }                    
                       }
                    }
                ]
            })
        });

        T.view.Driver.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.driver', T.view.Driver);