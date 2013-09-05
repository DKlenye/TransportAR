T.view.RoutePoint = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'RoutePoint',
    pageSize: 50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'RoutePointId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'RoutePointName',
                        header: 'Наименование ',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    }
                ]
            })
        });

        T.view.RoutePoint.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.routepoint', T.view.RoutePoint);