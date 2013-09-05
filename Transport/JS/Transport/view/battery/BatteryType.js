T.view.BatteryType = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'BatteryType',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'BatteryTypeId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'BatteryTypeName',
                        header: 'Наименование типа АКБ',
                        width: 450,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'Warrantly',
                        header: 'Гарантия, мес.',
                        width: 130,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'KmNorm',
                        header: 'Норма на пробег, км',
                        width: 150,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'MhNorm',
                        header: 'Норма на маш.часы',
                        width: 150,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.BatteryType.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.batterytype', T.view.BatteryType);