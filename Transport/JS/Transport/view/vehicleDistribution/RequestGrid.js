T.view.vehicleDistribution.RequestGrid = Ext.extend(Ext.grid.GridPanel, {

    constructor:function(cfg) {
        cfg = cfg || {};

        var store = Kdn.ModelFactory.getModel('v_Request').buildStore({
            baseParams: {
                start: 0,
                limit: 50
            },
            remoteSort: true,
            autoSave: false,
            autoLoad: true,
            autoDestroy: true
        });

        Ext.apply(cfg, {
            columnLines: true,
            stripeRows: true,
            loadMask: true,
            store: store,
            plugins:['filterrow'],
            columns: [
                {
                    header: '№ заявки',
                    dataIndex: 'RequestId',
                    width: 70,
                    filter:{}
                },
                {
                    header: 'Статус',
                    dataIndex: 'Status',
                    width: 30,
                    renderer: function(v) {
                        if (v == 0) {
                            return '<span class="label label-gray">Опубликована</span>'
                        }
                        if (v == 1) {
                            return '<span class="label label-warning">Подписана</span>'
                        }
                        if (v == 2) {
                            return '<span class="label label-success">Принята</span>'
                        }
                        if (v == 3) {
                            return '<span class="label label-important">Возвращена</span>'
                        }

                    }
                },
                {
                    header: 'Закреплена',
                    width: 40,
                    dataIndex: 'isLinked',
                    renderer: Kdn.Renderer.icon('link', function(e) {
                        return e;
                    })
                },
                {
                    header: 'Тип',
                    dataIndex: 'RequestType',
                    width: 90 
                },
                {
                    header: 'Заказчик',
                    dataIndex: 'CustomerName',
                    width: 170
                },
                {
                    header: 'Дата поездки',
                    xtype: 'datecolumn',
                    dataIndex: 'RequestDate',
                    filter: {
                        field: {
                            xtype: 'datefield',
                            triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить" }],
                            listeners: {
                                triggerclick: {
                                    fn: function(item, trigger, index, tag, e) {
                                        item.reset();
                                        item.fireEvent('select');
                                    }
                                }
                            }
                        },
                        fieldEvents: ["select"],
                        test: function(filterValue, value) {
                            if (!filterValue) return true;
                            return value.clearTime() - filterValue.clearTime() == 0;
                        }
                    },
                    width: 120
                },
                {
                    header: 'Опубликовано',
                    xtype: 'datecolumn',
                    format: 'd.m.Y H:i',
                    dataIndex: 'PublishDate',
                    width: 130
                },
                {
                    header: 'Опубликовал, ФИО',
                    dataIndex: 'UserFio',
                    width: 180
                },
                {
                    header: 'На подпись, ФИО',
                    dataIndex: 'Approver',
                    width: 180
                }
            ],
                tbar: [
                    '-', {
                        text: 'Обновить',
                        iconCls: 'icon-refresh',
                        handler: function () {
                            this.store.reload();
                        },
                        scope: this
                    },
                    '-',
                    {
                        xtype: 'tbspacer', width: 30
                    }, '-',
                    {
                        text: 'Принять/Отклонить',
                        iconCls: 'icon-comments',
                        handler: this.onAccept,
                        scope: this
                    }, '-',
                     {
                         xtype: 'tbspacer', width: 30
                     }, '-',
                    {
                        text: 'Открыть для печати',
                        iconCls: 'icon-doc_pdf',
                        handler: this.printRequest,
                        scope: this
                    }, '-'
                ],
                bbar: new Ext.PagingToolbar({
                    displayInfo: true,
                    pageSize: 50,
                    store: store
                }),
                listeners: {
                    rowcontextmenu: this.onContextMenuRequest,
                    rowdblclick: this.onContextMenuRequest,
                    scope: this
                }
        });
        T.view.vehicleDistribution.RequestGrid.superclass.constructor.call(this, cfg);
    },


    onContextMenuRequest: function (grid, idx, e) {

        grid.getSelectionModel().selectRow(idx);

        var rec = grid.store.getAt(idx);
        var w = this.getEditWindow();

        w.show();
        w.doConstrain();
        w.loadRequest(rec.id);

        e.stopEvent();
        return false;
    },


    onAccept: function(b, e) {
        var sel = this.getSelectionModel().getSelections();
        var writer = this.store.writer;
        
        if (sel.length > 0) {
            var requests = [];
            var json = [];

            Ext.iterate(sel, function(i) {
                requests.push(i.id);
                json.push(writer.toHash(i));
            });

            var w = this.getAcceptWindow();
            w.show();
            w.clear();
            w.setTitle(String.format("Заявки №: {0}", requests.join(',')));
            w.requests = json;
            w.setPosition(e.getPageX(), e.getPageY());
        }
    },

    getAcceptWindow:function() {
        if (!this.acceptWindow) {
            this.acceptWindow = Ext.create({
                xtype: 'view.requestacceptwindow',
                width: 400,
                height: 200,
                listeners: {
                    scope:this,
                    confirm:this.onConfirm
                }
            });
        }
        return this.acceptWindow;
    },

    getEditWindow:function() {
        if (!this.editWindow) {
            this.editWindow = Ext.create({
                xtype: 'view.requesteditwindow',
                width: 600,
                height: 650,
                closeAction: 'hide',
                renderTo: this.windowConstrain.getBody(),
                listeners: {
                    scope: this,
                    confirm: this.onConfirm,
                    print:this.onPrint
                }
            });
        }
        return this.editWindow;

    },
    
    onPrint:function(request) {
        this.print(request.RequestId, request.type);
    },

    onConfirm:function(window,isAccept,message) {
        this.confirmRequests(window.requests, isAccept, message);
    },

    confirmRequests: function (records, isAccept, message) {
        Kdn.Direct.ConfirmRequests({
            data: records,
            isAccept: isAccept,
            message: message
        }, this.onRequestsConfirm.createDelegate(this));
    },

    onRequestsConfirm: function(e) {
        var data = e['data'];
        var store = this.store;
        var reader = store.reader;
        Ext.iterate(data, function(d) {
            var rec = store.getById(d.RequestId);
            reader.update(rec, d);
        });

        this.getAcceptWindow().hide();
        this.getEditWindow().hide();
    },

    printRequest: function() {
        var request = this.getSelectionModel().getSelected();
        if (!request) return;
        var requestTypes = {
                "Кран": "RequestCrane",
                "Грузовой": "RequestFreight",
                "Пассажирский": "RequestPassengers"
            },
            id = request.get('RequestId'),
            type = requestTypes[request.get('RequestType')];
            
        this.print(id,type);
    },

    print: function (id, type) {
        var params = {};
        params.requestId = id;
        Kdn.Reporter.exportReport(type, params, "PDF");
    }

});

Ext.reg('view.requestgrid', T.view.vehicleDistribution.RequestGrid);