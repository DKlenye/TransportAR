T.view.waybill.WaybillCustomerWorkingTime = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn: 2,
    addPosition: 'last',
    selectionModel: 'Cell',
    constructor: function(cfg) {

        var me = this;

        cfg = cfg || {};

        var api = {
            update: Kdn.Direct.Update
        };

        var store = new Kdn.data.DirectStore(
            Kdn.ModelFactory.modelMgr.map.WaybillCustomerWorkingTime,
            {
                autoLoad: false,
                autoSave: true,
                api: api
            }
        );

            Ext.apply(cfg, {
            tbar:null,
            store: store,
            columns: [
                {
                    dataIndex: 'Customer',
                    header: 'Заказчик',
                    width: 300,
                    renderer:function(e) {
                        return e.CustomerName;
                    },
                    editor:{xtype:'combo.customer'}
                },
                {
                    dataIndex: 'Minutes',
                    header: 'Время в наряде',
                    width: 120,
                    renderer: function (v) {
                        return String.format("{0}:{1}", Math.floor(v / 60), v % 60);
                    },
                    editor:{xtype:'minutefield'}
                }
            ]
        });

        T.view.waybill.WaybillCustomerWorkingTime.superclass.constructor.call(this, cfg);


    },
    
    setData: function(data) {
        var report = data["WaybillCustomerWorkingTime"];
        this.store.loadData({ data: report }, false);
    }

});

Ext.reg('view.waybill.waybillcustomerworkingtime', T.view.waybill.WaybillCustomerWorkingTime);