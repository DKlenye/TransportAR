T.view.Schedule = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Schedule',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'ScheduleId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'ScheduleName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.Schedule.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.schedule', T.view.Schedule);