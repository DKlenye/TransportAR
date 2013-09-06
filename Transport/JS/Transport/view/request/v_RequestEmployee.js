T.view.v_RequestEmployee = Ext.extend(Kdn.view.BaseGrid, {

    modelName: 'v_RequestEmployee',

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
                            dataIndex: 'EmployeeId',
                            header: 'Код работника',
                            width: 100
                        },
                        {
                            dataIndex: 'Department',
                            header: 'Цех/Пр-во',
                            width: 100
                        },
                        {
                            dataIndex: 'EmployeeNumber',
                            header: 'Таб. №',
                            width: 70
                        },
                        {
                            dataIndex: 'LastName',
                            header: 'Фамилия',
                            width: 120
                        },
                        {
                            dataIndex: 'FirstName',
                            header: 'Имя',
                            width: 120
                        },
                        {
                            dataIndex: 'MiddleName',
                            header: 'Отчество',
                            width: 120
                        },
                        {
                            dataIndex: 'Office',
                            header: 'Должность',
                            width: 300
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


        T.view.v_RequestEmployee.superclass.constructor.call(this, cfg);
    }

});

Ext.reg('view.v_requestemployee', T.view.v_RequestEmployee);