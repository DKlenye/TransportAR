T.view.RequestApprover = Ext.extend(Kdn.view.BaseGrid, {

    modelName: 'RequestApprover',

    constructor: function(cfg) {
        cfg = cfg || {};

        Ext.apply(cfg, {
        store: new Ext.data.Store(),
            colModel: new Ext.grid.ColumnModel({
                 defaults:{
                     filter:{} 
                  },
                columns: [
                        new Ext.grid.RowNumberer({width:40}),
                        {  
                            dataIndex: 'Employee',
                            header: 'Работник',
                            hidden: true,
                            hideable: false,
                            editor: {
                                xtype: 'combo.employee',
                                allowBlank: false
                            }
                        },
                        {
                            dataIndex: 'Employee.EmployeeId',
                            xtype: 'mappingcolumn',
                            header: 'Код работника',
                            width: 100
                        },
                        {
                            dataIndex: 'Employee.Department',
                            xtype: 'mappingcolumn',
                            header: 'Цех/Пр-во',
                            width: 100
                        },
                        {
                            dataIndex: 'Employee.EmployeeNumber',
                            xtype: 'mappingcolumn',
                            header: 'Таб. №',
                            width: 70
                        },
                        {
                            dataIndex: 'Employee.LastName',
                            xtype: 'mappingcolumn',
                            header: 'Фамилия',
                            width: 120
                        },
                        {
                            dataIndex: 'Employee.FirstName',
                            xtype: 'mappingcolumn',
                            header: 'Имя',
                            width: 120
                        },
                        {
                            dataIndex: 'Employee.MiddleName',
                            xtype: 'mappingcolumn',
                            header: 'Отчество',
                            width: 120
                        },
                        {
                            dataIndex: 'Employee.Office',
                            xtype: 'mappingcolumn',
                            header: 'Должность',
                            width: 300
                        }
                ]
            })
        });



        T.view.RequestApprover.superclass.constructor.call(this, cfg);
    }

});

Ext.reg('view.requestapprover', T.view.RequestApprover);