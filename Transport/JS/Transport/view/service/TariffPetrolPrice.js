T.view.TariffPetrolPrice = Ext.extend(Ext.grid.EditorGridPanel, {
        constructor: function (cfg) {

            var api = {
                read: Kdn.Direct.TariffPetrolPriceRead,
                update: Kdn.Direct.Update
            };

            var store = new Kdn.data.DirectStore(
            Kdn.ModelFactory.modelMgr.map.TariffPetrolPrice,
            {
                autoLoad: false,
                autoSave: true,
                api: api
            }
        );
            
            cfg = cfg || {};
            Ext.apply(cfg, {
                store: store,
                loadMask:true,
                columnLines: true,
                stripeRows: true,
                clicksToEdit:1,
                colModel: new Ext.grid.ColumnModel({
                    defaults: { filter: {} },
                    columns: [
                    {
                        dataIndex: 'TariffPetrolPriceId',
                        header: 'Код',
                        width: 50,
                        hidden:true
                    },
                        {
                            xtype:'mappingcolumn',
                            dataIndex: 'Petrol.FuelName',
                            header: 'Топливо',
                            width: 200
                        },
                        {
                            dataIndex: 'Price',
                            header: 'Цена, руб',
                            width: 100,
                            editor:{xtype:'numberfield'}
                        }
                    ]
                }),

                tbar: [
                   '-',
                    'Период:',
                    {
                        xtype: 'datefield',
                        plugins: 'monthPickerPlugin',
                        format: 'F Y',
                        width: 120,
                        dataIndex: 'period',
                        value: new Date(),
                        ref:"/period"
                    },
                    '-'
                ]

            });

            T.view.TariffPetrolPrice.superclass.constructor.call(this, cfg);

            this.on('afterrender', this.AfterRender, this, {single:true});


        },

        AfterRender:function() {
            var period = this.period.getValue();
            this.store.setBaseParam('period', period);
            this.store.load();
        },

        onPeriodSelect:function() {
            var period = this.period.getValue();
            this.store.setBaseParam('period', period);
            this.store.load();
        }

    });

        Ext.reg('view.tariffpetrolprice', T.view.TariffPetrolPrice);