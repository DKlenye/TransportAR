T.view.vehicleDistribution.VehicleDistributionTask = Ext.extend(Ext.Panel, {
    requireModels:["Schedule"],
    constructor: function(cfg) {
        cfg = cfg || {};

        Ext.apply(cfg, {
            plain: true,
            layout: 'border',
            border: false,
            items: [
                {
                    title: 'Заявки',
                    ref:'requestGrid',
                    xtype: 'view.requestgrid',
                    region: 'west',
                    width: 650,
                    collapsible: true,
                    split: true,
                    enableDragDrop: true,
                    ddGroup: 'DDGroup',
                    windowConstrain: this
                },
                {
                    title: 'Список транспорта',
                    ref:'distributionList',
                    xtype: 'view.vehicledestributionlist',
                    region: 'center',
                    windowConstrain: this,
                    enableDragDrop: true
                }
            ]
        });

        T.view.vehicleDistribution.VehicleDistributionTask.superclass.constructor.call(this, cfg);

        this.on({
            afterrender: this.onAfterRender,
            scope: this,
            single: true,
            buffer: 100
        });
    },

    onAfterRender: function () {
        var grid = this.distributionList,
            store = grid.store,
            view = grid.getView();

        var dropTargetEl = view.scroller.dom;
        new Ext.dd.DropZone(dropTargetEl, {
            ddGroup: 'DDGroup',
            getTargetFromEvent: function (e) {
                return e.getTarget(view.rowSelector);
            },
            onNodeEnter: function(target, dd, e, data)
            {
                Ext.fly(target).addClass('.orange');
            },
            onNodeOut: function(target, dd, e, data)
            {
                Ext.fly(target).removeClass('.orange');
            },
            onNodeOver: function (target, dd, e, data) {
                return Ext.dd.DropZone.prototype.dropAllowed;
            },
            onNodeDrop: function (target, dd, e, data) {

                var rowIndex = view.findRowIndex(target);
                var rec = store.getAt(rowIndex);
                var sel = data.selections;
                
                if (rec.get("IsInMaintenance")) {
                    return;
                }


                var requests = [];
                Ext.iterate(sel, function (r) {
                    r.set('isLinked', true);
                    r.set("Status", 2);
                    requests.push(r.get("RequestId"));
                });

                Kdn.Direct.JoinRequests(rec.get("ListDetailId"), requests.join(","),function(e) {
                    grid.refreshDetail(rec.get("ListDetailId"));
                });

            }
        });

        grid.reload();
    }

});

Ext.reg('view.vehicledistributiontask', T.view.vehicleDistribution.VehicleDistributionTask);