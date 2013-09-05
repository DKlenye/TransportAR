T.view.Department = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Department',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{}
                },
                columns: [
                    {
                        dataIndex: 'DepartmentId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'DepartmentName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'OwnerId',
                        header: 'Подразделение',
                        width: 300,
                        editor: { xtype: 'combo.transportowner',objectValue:false },
                        renderer:function(o){
                           if(!o) return null;
                           var store = Kdn.ModelFactory.getStore('TransportOwner');
                           var record = store.getById(o);
                           if (record) return record.data['OwnerName']
                        }
                    }
                ]
            })
        });

        T.view.Department.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.department', T.view.Department);