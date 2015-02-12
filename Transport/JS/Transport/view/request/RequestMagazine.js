T.view.RequestMagazine = Ext.extend(Ext.Panel, {

    constructor: function(cfg)
    {
        cfg = cfg || {};

        var RequestStore = Kdn.ModelFactory.getModel('v_Request').buildStore({
            baseParams: {
                start: 0,
                limit: 50
            },
            remoteSort:true,
            autoSave: false,
            autoLoad: true,
            autoDestroy: true
        });

        var createEditor = function(xtype)
        {
            var EditorDefaults = { margins: '0 0 2 0', flex: 3, cls: 'request-editor', title: '.', iconCls: 'icon-page' };
            return Ext.create(Ext.apply(EditorDefaults, { xtype: xtype }))
        }


        var Editors = {
            Empty: createEditor('container'),
            RequestFreight: createEditor('view.requestfreighteditor'),
            RequestCrane: createEditor('view.requestcraneeditor'),
            RequestPassengers: createEditor('view.requestpassengerseditor')
        }

        this.selectDelay = new Ext.util.DelayedTask(this.onSelect, this);

        Ext.apply(cfg, {

            RequestStore: RequestStore,
            Editors: Editors,
            layout: 'border',
            items: [
                {
                    region: 'center',
                    split: true,
                    margins: '2 0 2 2',
                    xtype: 'grid',
                    ref:'../requestGrid',
                    columnLines: true,
                    stripeRows: true,
                    loadMask: true,
                    store: RequestStore,
                    plugins: ['filterrow'],
                    //view: new Ext.ux.grid.BufferView({ scrollDelay: false }),
                    columns: [
                       {
                           header: '№ заявки',
                           dataIndex: 'RequestId',
                           width: 70,
                           filter: {}
                       },
                       {
                           header: 'Статус',
                           dataIndex: 'Status',
                           width: 105,
                           renderer: function(v)
                           {
                                if (v == 0)
                               {
                                   return '<span class="label label-gray">Опубликована</span>'
                               }                           
                               if (v == 1)
                               {
                                   return '<span class="label label-warning">Подписана</span>'
                               }
                               if (v == 2)
                               {
                                   return '<span class="label label-success">Принята</span>'
                               }
                               if (v == 3)
                               {
                                   return '<span class="label label-important">Возвращена</span>'
                               }

                           },
                           filter: {}
                       },
                       {
                           header: 'Тип',
                           dataIndex: 'RequestType',
                           width: 100,
                           filter: {}
                           /*renderer: Kdn.Renderer.icons(function(e)
                           {
                               if (e == 'Кран') return 'crane';
                               if (e == 'Грузовой') return 'Truck';
                               if (e == 'Пассажирский') return 'carPassenger';
                           })*/
                       },
                       {
                           header: 'Заказчик',
                           dataIndex: 'CustomerName',
                           width: 220,
                           filter: {}
                       },
                       {
                           header: 'Дата поездки',
                           xtype: 'datecolumn',
                           dataIndex: 'RequestDate',
                           filter: {
                               field: {
                                   xtype: 'datefield',
                                   triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить"}],
                                   listeners: {
                                       triggerclick: {
                                           fn: function(item, trigger, index, tag, e)
                                           {
                                               item.reset();
                                               item.fireEvent('select');
                                           }
                                       }
                                   }
                               },
                               fieldEvents: ["select"],
                               test: function(filterValue, value)
                               {
                                   if (!filterValue) return true;
                                   return value.clearTime() - filterValue.clearTime() == 0;
                               }
                           },
                           width: 120
                       },
                       {
                           header: 'ФИО отправителя',
                           dataIndex: 'UserFio',
                           width: 200,
                           filter: {}
                       },
                       {
                           header: 'Опубликовано',
                           xtype: 'datecolumn',
                           format: 'd.m.Y H:i',
                           dataIndex: 'PublishDate',
                           width: 130
                       },                       
                       {
                            header: 'На подпись, ФИО',
                            dataIndex: 'Approver',
                            width: 180
                       }
                   ],
                    tbar: [
                        {
                            text: 'Открыть для печати',
                            iconCls: 'icon-doc_pdf',
                            handler: function() {
                                this.printRequest();
                            },
                            scope: this
                        }
                    ],
                    bbar: new Ext.PagingToolbar({
                        displayInfo: true,
                        pageSize: 50,
                        store: RequestStore
                    })
                },
               {
                   region: 'east',
                   margins: '2 2 2 0',
                   split: true,
                   collapsible: true,
                   collapseMode: 'mini',
                   hideCollapseTool: true,
                   width: 600,
                   layout: {
                       type: 'vbox',
                       padding: '2',
                       align: 'stretch'
                   },
                   defaults: { margins: '0 0 2 0' },
                   items: [
                    Editors.Empty,
                    {
                        flex: 2,
                        margins: 0,
                        xtype: 'tabpanel',
                        cls: 'request-detail',
                        collapsible: true,
                        collapseMode: 'mini',
                        hideCollapseTool: true,
                        region: 'south',
                        split: true,
                        activeTab: 0,
                        items: [
                            {
                                title: 'События по заявке',
                                columnLines: true,
                                stripeRows: true,
                                viewConfig: {
                                    forceFit: true
                                },
                                xtype: 'grid',
                                store: new Ext.data.JsonStore({
                                    fields: [
                                        'EventDate', 'Message', 'Status'
                                    ]
                                }),
                                columns: [
                                    {
                                        header: 'Дата',
                                        dataIndex: 'EventDate',
                                        xtype: 'datecolumn',
                                        format: 'd.m.Y H:i',
                                        width: 130,
                                        fixed: true
                                    },
                                    {
                                        header: 'Статус',
                                        dataIndex: 'Status',
                                        width: 120,
                                        fixed: true,
                                        renderer: function(v)
                                        {
                                             if (v == 0)
                                               {
                                                   return '<span class="label label-gray">Опубликована</span>'
                                               }                           
                                               if (v == 1)
                                               {
                                                   return '<span class="label label-warning">Подписана</span>'
                                               }
                                               if (v == 2)
                                               {
                                                   return '<span class="label label-success">Принята</span>'
                                               }
                                               if (v == 3)
                                               {
                                                   return '<span class="label label-important">Возвращена</span>'
                                               }
                                        }
                                    },
                                    {
                                        header: 'Сообщение',
                                        dataIndex: 'Message'
                                    }
                                ]
                            },
                            {
                                title: 'Путевые листы'
                            }
                        ]
                    }
                   ]
               }

           ]
        });

        T.view.RequestMagazine.superclass.constructor.call(this, cfg);

        this.on({
            afterrender: this.onAfterRender,
            scope: this,
            single: true
        })
    },

    onAfterRender: function()
    {
        var RequestGrid = this.items.itemAt(0);
        var Detail = this.items.itemAt(1);

        this.RequestGrid = RequestGrid;
        this.Detail = Detail;

        RequestGrid.getSelectionModel().on({
            selectionChange: this.onRequestSelect,
            scope: this
        });

        RequestGrid.on({
            rowdblclick: this.onRowDblClick,
            scope: this
        });

        Detail.disable();
    },

    onRequestSelect: function()
    {
        this.selectDelay.delay(100);
    },

    onRowDblClick: function()
    {
        if (this.Detail.collapsed)
        {
            this.Detail.expand();
        }

    },

    onSelect: function()
    {
        var selModel = this.RequestGrid.getSelectionModel();
        var rec = selModel.getSelected();

        if (rec)
        {
            this.Detail.getEl().unmask();
            this.loadRequest(rec.id);
        }
        else
        {
            this.replaceEditor(this.Editors.Empty);
            this.Detail.getEl().mask();
        }

    },

    loadRequest: function(id)
    {
        this.maskDetail();
        Kdn.Direct.RequestLoad({ id: id }, this.onRequestLoad.createDelegate(this));
    },

    onRequestLoad: function(e)
    {

        var request = e.data[0];
        editor = this.Editors[request.type];
        editor.setTitle('Заявка № ' + request.RequestId);
        this.replaceEditor(editor);
        editor.fill(request);
        this.fillDetails(request);
        this.unmaskDetail();

    },

    fillDetails: function(request)
    {

        var EventGrid = this.Detail.items.itemAt(1).items.itemAt(0);
        EventGrid.store.loadData(request.Events);

    },


    maskDetail: function()
    {
        this.Detail.getEl().mask('загрузка', 'x-mask-loading');
    },
    unmaskDetail: function()
    {
        this.Detail.getEl().unmask();
    },

    replaceEditor: function(editor)
    {
        this.Detail.items.removeAt(0).hide();
        this.Detail.items.insert(0, editor);
        editor.show();
        this.Detail.doLayout();
    },

    printRequest: function () {
        var request = this.RequestGrid.getSelectionModel().getSelected();
        if (!request) return;
        var requestTypes = {
            "Кран": "RequestCrane",
            "Грузовой": "RequestFreight",
            "Пассажирский": "RequestPassengers"
        },
            id = request.get('RequestId'),
            type = requestTypes[request.get('RequestType')];

        this.print(id, type);
    },

    print: function (id, type) {
        var params = {};
        params.requestId = id;
        Kdn.Reporter.exportReport(type, params, "PDF");
    }

});

Ext.reg('view.requestmagazine', T.view.RequestMagazine);