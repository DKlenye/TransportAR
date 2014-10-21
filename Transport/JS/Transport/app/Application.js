Transport.app.Application = Ext.extend(Kdn.app.Application, {
    appNS: 'Transport',
    getMenuItems: function()
    {
        Ext.apply(this, {
            Owner: Ext.create(
            {
                xtype: 'combo.transportowner',
                id: 'main.TransportOwner',
                store: Kdn.ModelFactory.getModel('TransportOwner').buildStore({ autoLoad: false }),
                style: {
                    'text-align': 'center'
                },
                enableClear: false,
                text: '',
                width: 180,
                listeners: {
                    select: this.onOwnerChange,
                    scope: this
                }
            })
        });

        return [
            { xtype: 'tbspacer', width: 10 },
            '->',
            {
                xtype: 'buttongroup',
                title: 'Подразделение',
                items: [this.Owner]
            },
            {
                xtype: 'app.temperaturebutton'
            },
            {
                xtype: 'button',
                scale: 'large',
                iconCls: 'icon-help32',
                handler: function() {
                    window.open('Manual.pdf');
                }
            }
        ];
    },

    afterStart: function()
    {
        T.modelCfg.Cfg();

        var ownerStore = Kdn.ModelFactory.getStore('TransportOwner');
        ownerStore.on({
            load: {
                fn: this.onOwnerLoad,
                single: true,
                scope: this
            }
        });
    },

    onOwnerLoad: function(store)
    {
        var u = this.getUser(),
            me = this,
            owners = u.Owners,
            s = me.Owner.store;

        store.each(function(rec)
        {
            if (owners.indexOf(rec.id) !== -1 || u.isAdmin)
            {
                var record = new store.recordType(rec.json, rec.id);
                s.add(record);
            }
        });

        this.Owner.setValue(s.getAt(0).id);

        Ext.apply(Kdn.data.ExtendParams, {
            owner: function() { return me.Owner.getValue()['OwnerId']; }
        });
    },

    onOwnerChange: function()
    {
        Kdn.ModelFactory.refreshAll();
    },


    printWaybillTpl: function(url)
    {
        var URL = Ext.urlAppend("print/" + url + ".aspx", Ext.urlEncode({ WaybillId: 0 }));

        Ext.Ajax.request({
            url: URL,
            method: 'GET',
            success: function(e)
            {
                var win = window.open('', 'printer', 'menubar=0,location=0,resizable=no,scrollbars=no,status=0,width=' + screen.width + ',height=' + screen.height);
                win.document.write(e.responseText);
                win.document.close();
                function CheckWindowState()
                {
                    if (win.document.readyState == "complete")
                    {
                        win.close();
                    }
                    else
                    {
                        CheckWindowState.defer(500);
                    }
                }
                win.print();
                CheckWindowState();
            },
            failure: function(e) {
                Ext.Msg.show({ width: 800, title: 'Ошибка', buttons: Ext.Msg.OK, msg: e.responseText });
            }
        });
        
    }


});