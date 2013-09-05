T.view.WaybillPackageType = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'WaybillPackageType',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{}
                },
                columns: [
                    {
                        dataIndex: 'PackageTypeId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'PackageTypeName',
                        header: 'Наименование',
                        width: 300,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'notActual',
                        header: 'Не актуально',
                        width: 200,
                        renderer: Ext.ux.grid.CheckColumn.prototype.renderer,
                        editor: { 
                           xtype: 'kdn.editor.booleanfield',
                           renderer: function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                           }
                        }
                    }
                ]
            }),
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds){
                    var dataIndex = 'notActual';
                    return record.get(dataIndex)?dataIndex:'';
                }
            }
        });

        T.view.WaybillPackageType.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.waybillpackagetype', T.view.WaybillPackageType);