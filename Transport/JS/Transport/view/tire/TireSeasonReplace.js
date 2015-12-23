
T.view.TireSeasonReplace = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TireSeasonReplace',
    editor:'view.tireseasonreplaceeditor',
    constructor: function(cfg) {
        cfg = cfg || {};
       
        Ext.apply(cfg, {
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'TireSeasonReplaceId',
                        header: 'Код',
                        width: 100,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        header: 'Автомобиль(Прицеп)',
                        dataIndex: 'Vehicle',
                        width: 400,
                        renderer: function (e) {
                            if (!e) return e;
                            return String.format("[{0}] {1} {2}",
                                 e.GarageNumber,
                                 e.Model,
                                 e.RegistrationNumber
                             );
                        },
                        editor: {
                            xtype: 'combo.vehicle2',
                            enableClear: true
                        }
                    },
                    {
                        dataIndex: 'RemoveDate',
                        xtype:'datecolumn',
                        header: 'Дата снятия',
                        width: 120,
                        editor: { xtype: 'kdn.editor.datefield', value:new Date() }
                    },
                    {
                        dataIndex: 'InstallDate',
                        xtype: 'datecolumn',
                        header: 'Дата установки',
                        width: 120,
                        editor: { xtype: 'kdn.editor.datefield', allowBlank:true }
                    },
                    {
                        dataIndex:'Tires',
                        header:'Шины',
                        width:300,
                        editor: { xtype: 'combo.multitiremoving' },
                        renderer:function(v) {
                            if (v) {

                                var rezult = [];
                                
                                Ext.iterate(v, function(tire) {
                                    var model = '';
                                    if (tire.TireModel) {
                                        model = tire.TireModel.TireMakerName;
                                    }
                                
                                    rezult.push(String.format('{0} {1} {2} {3}', tire.FactoryNumber, model, tire.Size, tire.Season == 1 ? 'Летняя' : (tire.Season == 2 ? 'Зимняя' : '')));
                                });

                                return rezult.join('<br/>')

                            }
                        }
                    }
                ]
            })
        });

           T.view.TireSeasonReplace.superclass.constructor.call(this, cfg);
    }
});

Ext.reg('view.tireseasonreplace', T.view.TireSeasonReplace);