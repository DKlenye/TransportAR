﻿Kdn.view.User = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'User',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({   
               defaults:{filter:{}},
                columns: this._getColumns()
            })
        });

        Kdn.view.User.superclass.constructor.call(this, cfg);

    },

    _getColumns: function() {
        return [
                    {
                        dataIndex: 'UserId',
                        header: 'Код пользователя',
                        width: 80,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'Name',
                        header: 'Имя',
                        width: 150,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'Login',
                        header: 'Логин',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'Phone',
                        header: 'Телефон',
                        width: 100,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'isAdmin',
                        header: 'Администратор',
                        width: 120,
                        renderer: Kdn.CheckRenderer,
                        editor: { xtype: 'kdn.editor.booleanfield',renderer:Kdn.TrueFalseRenderer }
                    }
        ]
    }
});
Ext.reg('kdn.view.user', Kdn.view.User);