T.view.vehicleDistribution.RequestAcceptWindow = Ext.extend(Ext.Window, {

    constructor: function (cfg) {
    
        this.addEvents("confirm");

        cfg = cfg || {};
        Ext.apply(cfg, {
            layout: 'fit',
                items: [
                    {
                        xtype: 'textarea',
                        ref:"message",
                        emptyText: 'Оставте заметку, которую увидит автор заявки, и нажмите "Принять" либо "Отклонить" заявку'
                    }
                ],
                bbar: [
                    '-',
                    {
                        text: 'Принять',
                        iconCls: 'icon-accept',
                        handler: function() { this.confirm(true); },
                        scope:this
                    }, '-',
                    {
                        text: 'Отклонить',
                        iconCls: 'icon-cancel',
                        handler: function() { this.confirm(false); },
                        scope:this
                    }, '-'
                ]
        });
        T.view.vehicleDistribution.RequestAcceptWindow.superclass.constructor.call(this, cfg);
    },

    confirm:function(isAccept) {
        this.fireEvent("confirm", this, isAccept, this.message.getValue());
    },

    clear:function() {
        this.message.setValue("");
    }

});
Ext.reg('view.requestacceptwindow', T.view.vehicleDistribution.RequestAcceptWindow);