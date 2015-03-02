T.view.waybill.WaybillAdvanceReport = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn: 2,
    addPosition: 'last',
    selectionModel: 'Cell',
    constructor: function(cfg) {

        var me = this;

        cfg = cfg || {};

        var api = {
            create: Kdn.Direct.CreateWaybillAdvanceReport,
            read: Kdn.Direct.Read,
            update: Kdn.Direct.UpdateWaybillAdvanceReport,
            destroy: Kdn.Direct.Destroy
        };

        var store = new Kdn.data.DirectStore(
            Kdn.ModelFactory.modelMgr.map.WaybillAdvanceReport,
            {
                autoLoad: false,
                autoSave: true,
                api: api
            }
        );


        Ext.apply(cfg, {
            plugins: ["filterrow", "gridsummary"],
            tbar: [
                '-',
                {
                    text: 'Найти авансовый отчёт',
                    iconCls:'icon-find',
                    handler: function() {

                        var win = me.getWindow();
                        win.grid.store.reload({
                            params: {
                                WaybillId: me.mainView.waybillId
                            }
                        });
                        win.show();
                    }
                },
                '-'
            ],
            store: store,
            columns: [
                {
                    xtype: 'mappingcolumn',
                    dataIndex: 'Customer.CustomerName',
                    header: 'Заказчик',
                    width: 300,
                    filter: {}
                },
                {
                    xtype: 'mappingcolumn',
                    dataIndex: 'ReportItem.ItemName',
                    header: 'Статья затрат',
                    width: 200,
                    filter: {}
                },
                {
                    dataIndex: 'Cost',
                    header: 'Сумма, руб',
                    editor: { xtype: 'numberfield', allowBlank: false, selectOnFocus: true },
                    summaryType: "sum"
                }
            ]
        });

        T.view.waybill.WaybillAdvanceReport.superclass.constructor.call(this, cfg);


    },

    refresh: function() {
        var $ = this,
            store = $.store,
            main = $.mainView,
            taskStore = main.tasks.store,
            vehicle = main.vehicle;

        store.autoSave = false;

        var itemStore = Kdn.ModelFactory.getStore("AdvanceReportItem");


        taskStore.each(function(task) {
            var customer = task.get('Customer');

            if (customer) {

                var customerId = customer.CustomerId;

                itemStore.each(function(i) {

                    var idx = store.findBy(function(rec) {
                        return rec.get("Customer").CustomerId == task.get('Customer').CustomerId && rec.get("ReportItem").Id == i.get('Id');
                    });

                    if (idx == -1) {
                        store.add(new store.recordType({
                            WaybillId: main.waybillId,
                            ReportItem: Kdn.clone(i.data),
                            Customer: task.get('Customer'),
                            Cost: 0
                        }));
                    }
                });
            }

        });

        store.data.sort("ASC", function(a, b) {
            var c = a.get("Customer").CustomerId - b.get("Customer").CustomerId;
            if (c == 0) {
                var i = a.get("ReportItem").Id - b.get("ReportItem").Id;
                return i;
            }
            return c;
        });
        try {
            $.view.refresh();
        } catch (ex) {
        }
        store.autoSave = true;

    },

    setData: function(data) {

        var report = data["WaybillAdvanceReport"];
        this.store.loadData({ data: report }, false);

    },

    getWindow: function() {
        if (!this.win) {
            this.win = new Ext.Window({
                layout: 'fit',
                renderTo: this.mainView.getEl(),
                constrain: true,
                items: [
                    {
                        xtype: 'grid',
                        viewConfig: {
                          forceFit:true
                      },
                      columnLines: true,
                      stripeRows: true,
                        loadMask:true,
                        ref: 'grid',
                        border:false,
                        width: 500,
                        height: 200,
                        store: Kdn.ModelFactory.getStore("CashBoxDataDto", {
                            api: {
                                read: Kdn.Direct.ReadCashBoxData
                            },
                            autoLoad: false,
                            autoSave: false
                        }),
                        columns: [
                            {
                                dataIndex: 'ndok',
                                header: '№ док.'
                            },
                            {
                                dataIndex: 'ddok',
                                xtype:'datecolumn',
                                header: 'Дата док.'
                            },
                            {
                                dataIndex: 'fio',
                                header: 'ФИО'
                            }
                        ],
                            bbar: [
                            '->','-',
                            {
                              xtype:'button.add',
                              handler:function() {
                                  var sel = this.win.grid.getSelectionModel().getSelections();
                                  if (sel.length > 0) {
                                      var data = [];
                                      Ext.iterate(sel, function(record) {
                                          data.push(record.data);
                                      });
                                      this.addCashBoxData(data);
                                      this.win.hide();
                                  }
                              },
                              scope:this
                            },
                            '-'
                        ]
                    }
                ]
            });
        }
        return this.win;

    },

    addCashBoxData:function(data) {
        var me = this,
        main = me.mainView,
        taskStore = main.tasks.store,
        customer;


        taskStore.each(function (task) {
            var c = task.get('Customer');
            if (c) {
                customer = c;
                return false;
            }
        });

        Kdn.Direct.AddCashBoxData({
            data: data,
            WaybillId : me.mainView.waybillId,
            CustomerId: customer.CustomerId
        }, function(data) {
            me.store.loadData(data);
            me.refresh();
        });
    }

});

Ext.reg('view.waybill.waybilladvancereport', T.view.waybill.WaybillAdvanceReport);