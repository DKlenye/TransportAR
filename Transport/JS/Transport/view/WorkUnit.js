T.view.WorkUnit = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'WorkUnit',
    requireModels:'WorkCounter',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{}                  
                },
                columns: [
                    {
                        dataIndex: 'WorkUnitId',
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'WorkUnitName',
                        header: 'Наименование',
                        width: 200,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'UnitName',
                        header: 'Ед.изм.',
                        width: 200,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'Coefficient',
                        header: 'Коэфффициент при расчёте нормы',
                        width: 300,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'CounterId',
                        header: 'Cчётчик',
                        width: 200,
                        renderer:function(v){
                           if(!v)return v;
                           var s = Kdn.ModelFactory.getStore('WorkCounter'),
                               r = s.getById(v);
                           if(r) return r.get('CounterName');
                           return null;
                        },
                        editor: { xtype: 'combo.workcounter',allowBlank:true,objectValue:false,enableClear:true }
                    }
                ]
            })
        });

        T.view.WorkUnit.superclass.constructor.call(this, cfg);

    }
});

Ext.reg('view.workunit', T.view.WorkUnit);