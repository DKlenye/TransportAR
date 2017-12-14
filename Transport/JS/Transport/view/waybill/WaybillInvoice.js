T.view.waybill.WaybillInvoice = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn: 0,
    addPosition: 'last',
    constructor: function(cfg) {

        var me = this;

        cfg = cfg || {};


        Ext.apply(cfg, {
            store: Kdn.ModelFactory.getModel('WaybillInvoice').buildStore({
                autoLoad: false,
                autoSave: true
            }),
            columns: [
                
                {
                    dataIndex: 'Serial',
                    header: 'Серия ТТН',
                    width: 90,
                    editor: { xtype: 'textfield',selectOnFocus:true }
                },
                {
                    dataIndex: 'Number',
                    header: '№ ТТН',
                    width: 130,
                    editor: { xtype: 'textfield', selectOnFocus: true }
                },
                {
                    dataIndex: 'Date',
                    header: 'Дата',
                    width: 120,
                    xtype: 'datecolumn',
                    editor: { xtype: 'datefield', selectOnFocus: true }
                }
            ]
        });

        T.view.waybill.WaybillInvoice.superclass.constructor.call(this, cfg);


    },

    applyDefaults: function(record) {
        record.set('WaybillId', this.mainView.waybillId);
        return record;
    },

    setData: function(data) {
        var report = data["WaybillInvoice"];
        this.store.loadData({ data: report }, false);
    }

});

Ext.reg('view.waybill.waybillinvoice', T.view.waybill.WaybillInvoice);