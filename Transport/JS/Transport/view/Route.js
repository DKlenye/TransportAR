T.view.Route = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Route',
    pageSize: 50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'RouteId',
                        header: 'Код',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'SourcePoint',
                        hidden:true,
                        hideable:false,
                        header: 'Пункт отправления',
                        editor:{xtype:'combo.routepoint',editable:true},
                        renderer:function(e){
                           if(!e) return null;
                           return e['RoutePointName']
                        }
                    },
                    {
                        dataIndex: 'DestinationPoint',
                        hidden:true,
                        hideable:false,
                        header: 'Пункт назначения',
                        editor:{xtype:'combo.routepoint',editable:true},
                        renderer:function(e){
                           if(!e) return null;
                           return e['RoutePointName']
                        }
                    },
                    {
                        dataIndex: 'SourcePoint.RoutePointName',
                        xtype:'mappingcolumn',
                        header: 'Пункт отправления ',
                        width: 300
                    },
                    {
                        dataIndex: 'DestinationPoint.RoutePointName',
                        xtype:'mappingcolumn',
                        header: 'Пункт назначения',
                        width: 300  
                    },
                    {
                        dataIndex: 'Distance',
                        header: 'Расстояние, км',
                        width: 200,
                        editor: { xtype: 'kdn.editor.numberfield' }   
                    }                    
                ]
            })
        });

        T.view.Route.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.route', T.view.Route);