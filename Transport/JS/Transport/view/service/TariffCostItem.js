T.view.service.TariffCostItem = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'TariffCostItem',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'Id',
                        hidden:true,
                        header: 'Код',
                        width: 130,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        xtype:'mappingcolumn',
                        dataIndex: 'Model.VehicleModelName',
                        header: 'Модель ТС',
                        width: 300
                    },
                    {
                        renderer: Kdn.Renderer.object("VehicleModelName"),
                        hidden:true,
                        dataIndex: 'Model',
                        header: 'Модель ТС',
                        editor: { xtype: 'combo.vehiclemodel', editable: true }
                    },
                    {
                        dataIndex: 'CostItemType',
                        header: 'Статья затрат',
                        width: 100,
                        editor: { xtype: 'combo.tariffcostitemtype',objectValue:false},
                        renderer: function (e) {
                            return {
                                1:'ЗП',
                                2:'МЗ',
                                3:'СМ'
                            }[e];
                        }
                    },
                    {
                      dataIndex: 'Km0',
                      header: '0-100 тыс.км',
                      width: 110,
                      editor:{xtype:'kdn.editor.decimalfield'}
                  },
                     {
                         dataIndex: 'Km100',
                         header: '101-300 тыс.км',
                         width: 110,
                         editor: { xtype: 'kdn.editor.decimalfield' }
                     },
                      {
                          dataIndex: 'Km300',
                          header: '301-500 тыс.км',
                          width: 110,
                          editor: { xtype: 'kdn.editor.decimalfield' }
                      },
                       {
                           dataIndex: 'Km500',
                           header: '501-700 тыс.км',
                           width: 110,
                           editor: { xtype: 'kdn.editor.decimalfield' }
                       },
                        {
                            dataIndex: 'Km700',
                            header: '701-900 тыс.км',
                            width: 110,
                            editor: { xtype: 'kdn.editor.decimalfield' }
                        },
                         {
                             dataIndex: 'Km900',
                             header: 'более 900 тыс.км',
                             width: 110,
                             editor: { xtype: 'kdn.editor.decimalfield' }
                         }
                ]
            })
        });

          T.view.service.TariffCostItem.superclass.constructor.call(this, cfg);

    }
});

  Ext.reg('view.tariffcostitem', T.view.service.TariffCostItem);