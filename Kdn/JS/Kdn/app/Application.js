Kdn.app.Application = function(cfg) {
    var me = this;
    cfg = cfg || {};
    Ext.apply(me, cfg);

    me.getUser = function() {
        return Kdn.getUser();
    }

    Ext.apply(me, {
        viewTab: Ext.create({
            xtype: 'slidingtabpanel',
            region: 'center',
            plugins: ['tabclosemenu'],            
            enableTabScroll : true
        }),
        menu: Ext.create({
            xtype: 'kdn.app.menu',
            region: 'north',
            items: me.getMenuItems(),
            nodes: Kdn.clone(Kdn.Menu),
            insertIndex: 1, //позиция меню для отрисовки
            listeners: {
                scope:me,
                menuclick:me.onMenuClick
            }   
    })
});





};


Ext.override(Kdn.app.Application, {

    getMenuItems: function() {

        return [
                { xtype: 'tbspacer', width: 10 },
                '->',
                {
                    xtype: 'button',
                    scale: 'large',
                    iconCls: 'icon-help32'
                }
       ]

    },


    start: function() {
        Ext.apply(this, {
            viewPort: Ext.create({
                xtype: 'viewport',
                layout: 'border',
                items: [
                    this.menu,
                    {
                        xtype: 'panel',
                        layout: 'border',
                        region: 'center',
                        items: {
                            xtype: 'container',
                            region: 'center',
                            layout: 'border',
                            margins: '2',
                            items: this.viewTab
                        }
                    }
                ]
            })
        });

        this.afterStart();
    },

    afterStart: Ext.emptyFn,

    onMenuClick: function(menuItem) {
        if (menuItem.Handler && this[menuItem.Handler]) {
            this[menuItem.Handler](Ext.decode(menuItem.HandlerCfg) || {}, menuItem);
        }
    },

    reCreateDatabase: function() {
        Ext.Msg.confirm(
            'Подтверждение выполнения операции',
            'Внимание!!! Данная операция удалит все данные из БД<br/>Продолжить?',
            function(e) {
                if (e == 'yes') {
                    Ext.getBody().mask('Пересоздание БД', 'x-mask-loading');
                    Kdn.Direct.ReCreateDatabase({}, function() {
                        Ext.getBody().unmask();
                    });
                }
            }
        );
    },

    updateDatabase: function() {
        Ext.getBody().mask('Обновление схемы БД', 'x-mask-loading');
        Kdn.Direct.UpdateDatabase({}, function() {
            Ext.getBody().unmask();
        });
    },
      
      
    createView:function(cfg, menuItem){
      if(cfg && cfg.xtype){
         var proto = Ext.ComponentMgr.types[cfg.xtype].prototype;
         if (proto.requireModels){
            Ext.getBody().mask('Загрузка справочников','x-mask-loading');
            Kdn.ModelFactory.requireModels(proto.requireModels,this._createView.createDelegate(this,arguments));
            return;
         }
      }
      this._createView.apply(this,arguments);
    },  
      
    _createView: function(cfg, menuItem) {
        Ext.getBody().unmask();
                
        menuItem = menuItem || cfg;
        
        var withContainer = !(cfg.withContainer===false);

        var tab = this.viewTab,
            tabItem,
            id;

        var addTab = function(cfg, id) {            
			if (!withContainer){
				tabItem = Ext.create(
					Ext.apply(cfg,{
						id:id||Ext.id()
					})
				);
			}
			else{
				tabItem = Ext.create({
					xtype: 'kdn.app.tabitem',
					title: menuItem['text'],
					iconCls: menuItem['iconCls'],
					items: Ext.create(
						Ext.apply(cfg, {
							region: 'center',
							margins: '3',
							viewTitle: menuItem['text']
						})
					),
					id: id || Ext.id()
				});
			}	
							
            tab.add(tabItem);
        }

        if (cfg.single) {
            id = String.format('{0}_view', cfg.xtype);
            tabItem = tab.get(id);
            if (!tabItem) {
                addTab(cfg, id);
            }
        }
        else {
            addTab(cfg);
        }

        tab.activate(tabItem);
        return tabItem;
    }


});

