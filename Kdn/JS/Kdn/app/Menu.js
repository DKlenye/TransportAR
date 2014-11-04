Kdn.app.Menu = Ext.extend(Ext.Toolbar, {
    height: 48,
    initComponent: function() {

        Ext.apply(this, {
            region: 'north',
            style: { 'border-width': 0 }
        });
        Kdn.app.Menu.superclass.initComponent.call(this);

        this.on('afterrender', this.onAfterRender, this, { single: true });

        this.addEvents('menuclick');

    },
    onAfterRender: function() {
        this.el.addClass('main-menu');
        if (this.nodes) {
            this.buildMenu(this.nodes);
        }
    },

    removeMenu: function() {
        this.items.each(function() {
            console.log(arguments);
        });
    },

    buildMenu: function(data) {
        Ext.iterate(data.reverse(), function(e) {

            if (!Kdn.app.permission.check(e)) {
                return;
            }

            this.insert(this.insertIndex, this.getRootNode(e, this.getNodeMenu(e)));
        }, this);
    },

    getNodeMenu: function(node) {
        if (node.Child && node.Child.length > 0) {
            var menu = {
                xtype: 'menu',
                minWidth: 210,
                cls: 'big-menu',
                enableScrolling:true,
                items: [],
                listeners: {
                    click: this.onMenuClick.createDelegate(this)
                }
            };

            Ext.iterate(node.Child, function(child) {
                menu.items.push(Ext.applyIf(child, {
                    xtype: 'menuitem',
                    iconCls: 'icon-table',
                    menu: this.getNodeMenu(child)
                })
                );
            }, this);
            return menu;
        }
        return undefined;
    },

    getRootNode: function(node, menu) {
        return Ext.apply(node, { scale: 'large', menu: menu })
    },

    onMenuClick: function(menu, menuItem, e) {
        this.fireEvent('menuclick', menuItem)
    }

});
Ext.reg('kdn.app.menu', Kdn.app.Menu);