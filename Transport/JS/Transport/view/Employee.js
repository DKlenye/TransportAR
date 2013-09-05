T.view.Employee = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Employee',
    pageSize: 50,
    pageMode:'remote',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {           
            colModel: new Ext.grid.ColumnModel({
                 defaults:{
                     filter:{} 
                  },
                columns: [
                    {
                        dataIndex: 'EmployeeId',
                        header: 'Код',
                        hidden:true,
                        width: 90,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'id_men',
                        header: 'Код (Нафтан)',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'Department',
                        header: 'Цех/Пр-во',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'EmployeeNumber',
                        header: 'Таб. №',
                        width: 70,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'LastName',
                        header: 'Фамилия',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'FirstName',
                        header: 'Имя',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'MiddleName',
                        header: 'Отчество',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                       dataIndex: 'Office',
                       header: 'Должность',
                       width: 300,
                       editor: { xtype: 'textfield' }
                    },
                    {
                       dataIndex: 'IncomeDate',
                       xtype: 'datecolumn',
                       header: 'Дата устройства',
                       width: 100,
                       editor: { xtype: 'datefield' }
                    },
                    {
                       dataIndex: 'DismissDate',
                       xtype: 'datecolumn',
                       header: 'Дата увольнения',
                       width: 100,
                       editor: { xtype: 'datefield' }
                    },
                    {
                       dataIndex: 'DSC',
                       header: 'Нафтан/Полимир',
                       width:120,
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
                           fieldEvents:["select"]                     
                        }
                    }
                ]
            })
        });

        T.view.Employee.superclass.constructor.call(this, cfg);

    }
    
});

Ext.reg('view.employee', T.view.Employee);