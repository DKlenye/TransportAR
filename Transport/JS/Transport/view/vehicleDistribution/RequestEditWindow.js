T.view.vehicleDistribution.RequestEditWindow = Ext.extend(Ext.Window, {
    constructor: function(cfg) {

        this.addEvents("confirm", "print");
        
        cfg = cfg || {};
        
        var createEditor = function(xtype) {
            var EditorDefaults = { margins: '0 0 2 0', flex: 3, cls: 'request-editor' };
            return Ext.create(Ext.apply(EditorDefaults, { xtype: xtype }));
        };

        var editors = {
            Empty: createEditor('container'),
            RequestFreight: createEditor('view.requestfreighteditor'),
            RequestCrane: createEditor('view.requestcraneeditor'),
            RequestPassengers: createEditor('view.requestpassengerseditor')
        };
        
        Ext.apply(cfg, {
            editors:editors,
            iconCls: 'icon-page',
            constrain: true,
            layout: {
                type: 'vbox',
                padding: '2',
                align: 'stretch'
            },
            defaults: { margins: '0 0 2 0' },
            items: [
                editors.Empty,
                {
                    xtype: 'textarea',
                    ref:'message',
                    emptyText: 'Оставте заметку, которую увидит автор заявки, и нажмите "Принять" либо "Отклонить" заявку'
                }
           ],
            bbar: [
            '-',
                    {
                        text: 'Принять',
                        iconCls: 'icon-accept',
                        handler: function () { this.confirm(true)},
                        scope: this
                    }, '-',
                    {
                        text: 'Отклонить',
                        iconCls: 'icon-cancel',
                        handler: function () {this.confirm(false)},
                        scope:this
                    }, '-', '->',
                    {
                        text: 'Открыть для печати',
                        iconCls: 'icon-doc_pdf',
                        handler: function() {this.fireEvent("print", this.request)},
                        scope: this
                    },
                    '-'
           ]

        });

        T.view.vehicleDistribution.RequestEditWindow.superclass.constructor.call(this, cfg);
    },
    
    clear: function () {
        this.message.setValue('');
    },

    confirm:function(isAccept) {
        this.fireEvent("confirm", this, isAccept, this.message.getValue());
    },

    loadRequest: function(id) {
        this.getEl().mask('загрузка заявки','x-mask-loading');
        Kdn.Direct.RequestLoad({ id: id }, this.onRequestLoad.createDelegate(this));
    },

    onRequestLoad: function(e) {
        this.clear();
        var request = e.data[0];
        this.request = request;
        this.requests = [request];
        /*
        var r = this.RequestGrid.store.getById(request.RequestId);
        var json = this.RequestGrid.store.writer.toHash(r);
        w.requests = [json];
        w.request = r;
        */
        editor = this.editors[request.type];
        this.setTitle('Заявка № ' + request.RequestId);
        this.replaceEditor(editor);
        editor.fill(request);
        this.getEl().unmask();
    },

    replaceEditor: function(editor) {
        this.items.removeAt(0).hide();
        this.items.insert(0, editor);
        editor.show();
        this.doLayout();
    }
});

Ext.reg('view.requesteditwindow', T.view.vehicleDistribution.RequestEditWindow);