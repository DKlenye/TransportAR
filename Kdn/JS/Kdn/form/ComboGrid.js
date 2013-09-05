Kdn.form.ComboGrid = Ext.extend(Ext.form.TriggerField, {
    

    defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"},
    listWidth:150, 
    triggerClass : 'x-form-arrow-trigger',
    shadow : 'sides',
    listAlign : 'tl-bl?',
   
    maxHeight : 300,
    minHeight : 100,
    
    minListWidth : 70,
    
    minChars : 3,
    pageSize : 0,

    selectOnFocus : true,
    resizable : true,
        
    lazyInit : true,
    
    columns:[],
    store:null,
    renderTpl:'',
    objectValue:true,
    
    getFilterFn:function(){return function(){return true;}}, 
    
      
   
    constructor:function(cfg){
      cfg = cfg||{};
      var listeners = cfg.listeners || {};
      if (cfg.enableClear)
        {

            listeners.triggerclick = {
                fn: function(item, trigger, index, tag, e)
                {
                    if (this.objectValue){
                        this.setValue("");
                    }
                    else{
                        this.setValue("");
                    }
                    
                    this.fireEvent('select');
                }
            }

            Ext.apply(cfg, {
                triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить"}],
                listeners: listeners
            });
        }
        
      Kdn.form.ComboGrid.superclass.constructor.call(this,cfg);      
    
    },
    
    // private
    initComponent : function(){
        Kdn.form.ComboGrid.superclass.initComponent.call(this);
        this.addEvents(
            'expand',
            'collapse',
            'beforeselect',
            'select'

        );
        
        if (Ext.isFunction(this.renderTpl)){
         this.renderer = this.renderTpl;
        }
        else{
          var tpl = new Ext.Template(this.renderTpl);
        
           Ext.apply(this,{
               renderer:function(v){if(!v)return null; return tpl.apply(v);}
           }); 
        }
        
        
        
    },

    // private
    onRender : function(ct, position){
        if(this.hiddenName && !Ext.isDefined(this.submitValue)){
            this.submitValue = false;
        }
        Kdn.form.ComboGrid.superclass.onRender.call(this, ct, position);
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName,
                    id: (this.hiddenId || Ext.id())}, 'before', true);

        }
        if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }

        if(!this.lazyInit){
            this.initList();
        }else{
            this.on('focus', this.initList, this, {single: true});
        }
    },


    getParentZIndex : function(){
        var zindex;
        if (this.ownerCt){
            this.findParentBy(function(ct){
                zindex = parseInt(ct.getPositionEl().getStyle('z-index'), 10);
                return !!zindex;
            });
        }
        return zindex;
    },

    getZIndex : function(listParent){
        listParent = listParent || Ext.getDom(this.getListParent() || Ext.getBody());
        var zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);
        if(!zindex){
            zindex = this.getParentZIndex();
        }
        return (zindex || 12000) + 5;
    },


   initView:function(){
      
      
      var view,bbar;
      
      if (this.pageSize>0){
        view = new Kdn.grid.PagingGridView({
            forceFit:true
        });
        bbar = new Kdn.grid.PagingToolbar({
            displayInfo: true,
            pageSize: this.pageSize,
            view:view
        });
      }
      else{
         view = new Ext.grid.GridView({
            forceFit:true
        });
      }
      
      var grid = Ext.create({
         xtype:'grid',
         margins:'4',
         region:'center',
         store:this.store,
         enableColumnMove:false,
         enableDragDrop:false,
         enableHdMenu:false,
         view : view,
         bbar:bbar,
         selModel: new Kdn.grid.PagingRowSelModel({singleSelect:true}),
         columnLines:true,
         colModel : new Ext.grid.ColumnModel({
            defaults:{
               filter:{}
            },
            columns:Kdn.clone(this['columns']||[])
         }),                  
         plugins:['filterrow']    
      });      
      
      this.mon(grid,{
         scope:this,
         rowclick:this.onGridClick,
         keydown:this.onGridKey
      });      
            
      this.view = grid;
      
    },
      
   onGridClick:function(g,a,e){ 
      var rec = this.view.getSelectionModel().getSelected();
      if(rec){
         this.collapse();
         this.setValue(rec);         
         this.fireEvent('select',rec);
         this.triggerBlur();
         this.focus.defer(50,this);
      }
    },    
    
    onGridKey:function(e){
      if(e.getKey()==e.ENTER) this.onGridClick();
    },

    // private
    initList : function(){
        if(!this.list){
            var cls = 'x-combo-list',
                listParent = Ext.getDom(this.getListParent() || Ext.getBody());

            this.list = new Ext.Layer({
                parentEl: listParent,
                shadow: this.shadow,
                cls: [cls, this.listClass].join(' '),
                constrain:false,
                zindex: this.getZIndex(listParent)
            });

            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
            this.list.setSize(lw, 0);
            this.list.swallowEvent('mousewheel');
            this.assetHeight = 0;
            if(this.syncFont !== false){
                this.list.setStyle('font-size', this.el.getStyle('font-size'));
            }
            if(this.title){
                this.header = this.list.createChild({cls:cls+'-hd', html: this.title});
                this.assetHeight += this.header.getHeight();
            }
            
            
            this.initView();
            
            this.container = new Ext.Container({
               cls:cls+'-inner',
               applyTo:this.list,
               layout:'border',
               items:this.view
            });

            this.innerList = this.container.getEl();
            this.innerList.setWidth(this.fixWidth());
            this.innerList.setHeight(this.fixHeight());                                   

            if(this.resizable){
                this.resizer = new Ext.Resizable(this.list,  {
                   pinned:true, handles:'se'
                });
                this.mon(this.resizer, 'resize', function(r, w, h){
                    this.listWidth = w;
                    this.innerList.setWidth(this.fixWidth(w));
                    this.innerList.setHeight(this.fixHeight(h));
                    this.container.doLayout();              
                }, this);                 
            }
        }
    },
    
    initEvents : function(){
        Kdn.form.ComboGrid.superclass.initEvents.call(this);

        this.keyNav = new Ext.KeyNav(this.el, {
            "up" : function(e){               
                if(!this.isExpanded()){
                }else{
                  this.view.getSelectionModel().selectPrevious();
                }
            },

            "down" : function(e){
                if(!this.isExpanded()){
                }else{
                  this.view.getSelectionModel().selectNext();
                }
            },

            "enter" : function(e){
               this.onGridClick();
            },

            "esc" : function(e){
               this.collapse();
               this.triggerBlur();
            },

            scope : this,

            doRelay : function(e, h, hname){
                if(hname == 'down' || this.scope.isExpanded()){
                    // this MUST be called before ComboBox#fireKey()
                    var relay = Ext.KeyNav.prototype.doRelay.apply(this, arguments);
                    if(((Ext.isIE9 && Ext.isStrict) || !Ext.isIE) && Ext.EventManager.useKeydown){
                        // call Combo#fireKey() for browsers which use keydown event (except IE)
                        this.scope.fireKey(e);
                    }
                    return relay;
                }
                return true;
            },

            forceKeyDown : true,
            defaultEventAction: 'stopEvent'
        });
        this.queryDelay = Math.max(this.queryDelay || 10,
                this.mode == 'local' ? 10 : 250);
                
        this.dqTask = new Ext.util.DelayedTask(this.query, this);

        if(!this.enableKeyEvents){
            this.mon(this.el, 'keyup', this.onKeyUp, this);
        }
                
    },
    

      query:function(){         
        var val = this.getEl().dom.value;
        this.store.filterBy(this.getFilterFn(val),this);        
        this.view.getSelectionModel().selectFirstRow();        
        this.expand();             
      },

   
    getListParent : function() {
        return document.body;
    },

   
    // private
    onDestroy : function(){
        if (this.dqTask){
            this.dqTask.cancel();
            this.dqTask = null;
        }
        Ext.destroy(
            this.resizer,
            this.view,
            this.pageTb,
            this.list
        );
        Kdn.form.ComboGrid.superclass.onDestroy.call(this);
    },

    // private
    fireKey : function(e){
        if (!this.isExpanded()) {
            Kdn.form.ComboGrid.superclass.fireKey.call(this, e);
        }
    },

    // private
    onResize : function(w, h){
        Kdn.form.ComboGrid.superclass.onResize.apply(this, arguments);
        if(!isNaN(w) && this.isVisible() && this.list){
            this.doResize(w);
        }else{
            this.bufferSize = w;
        }
    },

    doResize: function(w){
        if(!Ext.isDefined(this.listWidth)){
            var lw = Math.max(w, this.minListWidth);
            this.list.setWidth(lw);
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
        }
    },

 
    getValue : function(){
       return Ext.isDefined(this.value) ? this.value : '';
    },

   fixWidth:function(w){
      var width;
      if (!w) width =  this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
      else width =  Math.max(w,this.minListWidth);
      return width-this.list.getFrameWidth('lr');
      
    },
    fixHeight:function(h){
        h=h||this.minHeight;
        var height = Math.max(h,this.minHeight);
        return height-this.list.getFrameWidth('tb');
    },

    isExpanded : function(){
        return this.list && this.list.isVisible();
    },

    // private
    onKeyUp : function(e){
        var k = e.getKey();
        if(this.editable !== false && this.readOnly !== true && (k == e.BACKSPACE || !e.isSpecialKey())){

            this.lastKey = k;
            this.dqTask.delay(this.queryDelay);
        }
        Kdn.form.ComboGrid.superclass.onKeyUp.call(this, e);
    },

    // private
    validateBlur : function(){
        return !this.list || !this.list.isVisible();
    },


    // private
    postBlur  : function(){
        Kdn.form.ComboGrid.superclass.postBlur.call(this);
        this.collapse();
        this.inKeyMode = false;
    },

    collapse : function(){
        if(!this.isExpanded()){
            return;
        }
        this.list.hide();
        Ext.getDoc().un('mousewheel', this.collapseIf, this);
        Ext.getDoc().un('mousedown', this.collapseIf, this);
        this.fireEvent('collapse', this);
    },

    // private
    collapseIf : function(e){
        if(!this.isDestroyed && !e.within(this.wrap) && !e.within(this.list)){
            this.collapse();
        }
    },

    onTriggerClick : function(){
        if(this.readOnly || this.disabled){
            return;
        }
        if(this.isExpanded()){
            this.collapse();
            this.el.focus();
        }else {
            this.onFocus({});
            this.expand();
            this.el.focus();
        }
    },
    
    expand : function(){
        
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
        
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));

        // zindex can change, re-check it and set it if necessary
        this.list.setZIndex(this.getZIndex());
        this.list.show();
        this.container.doLayout();
        if(Ext.isGecko2){
            this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac
        }
        this.mon(Ext.getDoc(), {
            scope: this,
            mousewheel: this.collapseIf,
            mousedown: this.collapseIf
        });
        this.fireEvent('expand', this);
    },
    
    setValue:function(v){
    
      var val=null;
      
      if (v && !Ext.isObject(v) && Ext.isNumber(v)){
         v = this.store.getById(v).data;
      }            
      if(v && v.data){
         v = Kdn.clone(v.data);
      }
      
      if(this.valueField && !this.objectValue && v!=null){
         val = v[this.valueField];
      }
      else{ val = v||null;}
      
      Kdn.form.ComboGrid.superclass.setValue.call(this,this.renderer(val));
      this.value = val;

            
    }


});
Ext.reg('kdn.form.combogrid', Kdn.form.ComboGrid);