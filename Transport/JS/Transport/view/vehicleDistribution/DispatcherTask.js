T.view.vehicleDistribution.DispatcherTask = Ext.extend(Ext.grid.GridPanel, {

    constructor:function(cfg) {
        cfg = cfg || {};

        var columns = T.view.vehicleDistribution.VehicleDistributionList.prototype.getColumns();
        var me = this;

        columns.shift();
        columns.shift();

            var store = Kdn.ModelFactory.getModel('DistributionListDto').buildStore({
            autoSave: true,
            autoLoad: false,
            api: {
                read: Kdn.Direct.DistributionListRead,
                update: Kdn.Direct.DistributionListUpdate,
                destroy: Kdn.Direct.DistributionListDestroy
            }
        });

        Ext.apply(cfg, {
               cls: 'vehicleorder-grid',
            store: store,
            loadMask: true,
            columnLines: true,
            stripeRows: true,
            plugins: ['filterrow'],
            selModel: new Ext.grid.RowSelectionModel(),
            colModel: new Ext.grid.ColumnModel({
                defaults: { filter: {},sortable:false },
                columns: columns
            }),
            tbar: [
                '-', {
                    text: 'Обновить',
                    iconCls: 'icon-refresh',
                    handler: this.reload,
                    scope: this
                },
                '-',
                'Дата:',
                {
                    xtype: 'datefield',
                    ref: '../listDate',
                    value: new Date(),
                    listeners: {
                        select: this.reload,
                        scope: this
                    }
                },
                '-',
                { xtype: 'tbspacer', width: 20 },
                /*'-', 'Группа:',
                {
                    xtype: 'combo.grouprequest',
                    enableClear: true,
                    objectValue: false,
                    listeners: {
                        select: function(e) {
                            var val;
                            if (!e) val = null;
                            else val = e.getValue();

                            var cm = me.colModel;
                            var column = cm.getColumnAt(cm.findColumnIndex('Vehicle.GroupRequestId'));
                            var combo = column.filter.field;
                            combo.setValue(val);
                            combo.fireEvent('select', combo);
                        }
                    }
                },*/
                '-', 'Колонна',
                {
                    xtype: 'combo.transportcolumn',
                    ref:"../column",
                    enableClear: true,
                    objectValue: false,
                    listeners: {
                        select: function(e) {
                            var val;
                            if (!e) val = null;
                            else val = e.getValue();

                            var cm = me.colModel;
                            var column = cm.getColumnAt(cm.findColumnIndex('Vehicle.ColumnId'));
                            var combo = column.filter.field;
                            combo.setValue(val);
                            combo.fireEvent('select', combo);
                        }
                    }
                },
                '-',
                'Время изменений',
                {
                    xtype: 'kdn.editor.fulltimefield',
                    width: 70,
                    value: new Date(),
                    ref: '../lastChange',
                    listeners: {
                        select: function () {
                            me.getView().refresh();
                        }
                    }
                },
                '-',
                {
                    text: 'Печать',
                    iconCls: 'icon-printer',
                    handler: function () {
                        var reportName = 'DistributionListPrint';
                        var params = {};
                        params.date = this.listDate.getValue();
                        params.columnId = this.column.getValue() || 0;
                        Kdn.Reporter.exportReport(reportName, params);
                    },
                    scope: this
                },
                '-'

            ]

        });
       T.view.vehicleDistribution.RequestGrid.superclass.constructor.call(this, cfg);

       this.mon(store, {
           load: this.onStoreLoad,
           scope: this
       });

        this.on({
            afterrender: this.onAfterRender,
            single: true,
            scope: this,
            buffer:100
        });

    },

    onAfterRender:function() {

        this.reload();

    },

    reload: function() {
        var date = this.listDate.getValue();
        this.store.reload({
            params: { date: date }
        });
    },

    sortStore: function () {

        var gStore = Kdn.ModelFactory.getStore("GroupRequest");
        var getGroup = function (rec) {
            var group = gStore.getById(rec.get("Vehicle").GroupRequestId);
            return group.get("OrderId");
        };
        
        this.store.data.sort('ASC',function(rec1,rec2) {
            var rez = getGroup(rec1) - getGroup(rec2);
            if (rez == 0) {
                return rec1.get("Vehicle").GarageNumber - rec2.get("Vehicle").GarageNumber;
            }
            return rez;
        });
    },
     onStoreLoad: function (s, rec, o) {
        var count = !s.data?0:s.getCount();
        if (count > 0) {
            this.sortStore();
        }
    }

});

Ext.reg('view.dispatchertask', T.view.vehicleDistribution.DispatcherTask);