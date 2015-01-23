T.view.waybill.WaybillProperty = Ext.extend(Kdn.grid.PropertyEditor, {
    constructor: function(cfg) {
        cfg = cfg || {};        
        
        
       // [dataIndex,header,editor,renderer]
        
        var o = [
            ['WaybillId','№ путевого листа',{xtype:'kdn.editor.id'},function(v,m){m.css = 'greenCell'; return v;}],
            
            ['DepartureDate','Выезд',{xtype:'kdn.form.datefield'},function(v,m){m.css = 'departure'; return Ext.util.Format.date(v, 'd.m.Y');}],
            ['DepartureTime', '&nbsp;', { xtype: 'kdn.editor.fulltimefield' }, function(v, m) { m.css = 'departure'; return v; } ],
            ['ReturnDate','Возвращение',{xtype:'kdn.form.datefield'},function(v,m){m.css = 'return'; return Ext.util.Format.date(v, 'd.m.Y');}],
            ['ReturnTime','&nbsp;',{xtype:'kdn.editor.fulltimefield'},function(v,m){m.css = 'return'; return v;}],
            ['Shift','Смена',{xtype:'kdn.editor.numberfield',baseChars:"12"}],
            ['ScheduleId','График',{xtype:'combo.schedule',objectValue:false},function(v){
               if(!v) return v;
               var store = Kdn.ModelFactory.getStore('Schedule'),
                   rec = store.getById(v); 
               if(rec) return rec.get('ScheduleName');
               return null;
            }],
            ['WaybillTypeId','Форма бланка',{xtype:'combo.waybilltype',objectValue:false},
            function(v){
               if(!v) return v;
               var store = Kdn.ModelFactory.getStore('WaybillType'),
                   rec = store.getById(v);
               if(rec) return rec.get('WaybillTypeName');
               return null;
            }],  
            ['FormNumber','№ Бланка',{xtype:'kdn.editor.textfield'}],
            ['TrailerId','Прицеп',{xtype:'combo.trailer',enableClear:true},T.combo.Trailer.prototype.renderTpl],
            ['Way','Маршрут',{xtype:'kdn.editor.textfield'}],
            ['PackageId', '№ Пачки', { xtype: 'kdn.editor.numberfield', allowBlank: true}],
            ['OrderNumber', '№ приказа', { xtype: 'kdn.editor.textfield', allowBlank: true}],
            ['OrderDate', 'Дата приказа', { xtype: 'kdn.editor.datefield', allowBlank: true}]
                      
        ];
                
        var propCfg = new Ext.util.MixedCollection();
        Ext.iterate(['source','propertyNames','customEditors','customRenderers'],function(e){propCfg.add(e,{})});     
        Ext.iterate(o,function(a){
            var dataIndex = a[0];
            Ext.iterate(a,function(b,i){
               propCfg.itemAt(i)[dataIndex]= i==0?null:(i==2?new Ext.grid.GridEditor(Ext.create(b)):b);
            });                   
        });        
        propCfg.each(function(o,i){cfg[propCfg.keys[i]]=o});


        Ext.apply(cfg, {
            defaultSource:Kdn.clone(propCfg.source),
            margins:'0'
        });

        T.view.waybill.WaybillProperty.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      this.on('beforepropertychange',this.onPropertyChange,this);
      
      this.on({
         scope:this,
         afterrender:this.onAfterRender,
         beforeedit: this.onBeforeEdit,
         single:true
      });
      
      T.view.waybill.WaybillProperty.superclass.initComponent.call(this);
    },
    
    
    onBeforeEdit:function(e){
      
         var $ = this,
          main = $.mainView,
          vehicle = main.vehicle, 
          rec = e.record;
      
      if(main.isAccClosed()){
         return false;
      }
      
      if(main.isDispClosed()){
          var denyModifyFields = ['DepartureDate', 'DepartureTime', 'ReturnDate', 'ReturnTime', 'ScheduleId', 'Shift'];
          if (denyModifyFields.indexOf(e.record.id) != -1) {
             return false;
         }
      }
      
    },
    
    onAfterRender:function(){
      
      var fn = this.returnFocusToGridView,
          tbar = this.getTopToolbar(),
          bbar = this.getBottomToolbar(),
          scroller = this.getEl().query('.x-grid3-scroller').shift(),
          header = this.header;
      
      
      if(tbar){
         tbar.getEl().on({
            click:fn,
            scope:this
         });
      } 
      if(bbar){
         bbar.getEl().on({
            click:fn,
            scope:this
         });
      } 
      if(scroller){      
         Ext.get(scroller).on({
            click:fn,
            scope:this
         });
      }
      if(header){      
        header.on({
            click:fn,
            scope:this
         });
      }
      
    this.focusTask = new Ext.util.DelayedTask(this.focusTaskFn, this);    
    this.on('beforedestroy',this.destroy,this);
    
    this.initFocus();
    
    },
    
    focusTaskFn:function(){
      this.getView().focusEl.focus();      
      var sm = this.getSelectionModel();  
      if(!sm.hasSelection()){
         sm.select(0,1);  
      }
                  
    },
    
    returnFocusToGridView:function(e, el){
                        
        var allowClasses = [
         "x-panel-header",
         "x-toolbar-left",
         "x-grid3-scroller",
         "x-grid3-body",
         "x-tab-page-last",
         "x-tab-page-next",
         "x-tab-page-prev"
        ];
        var delay = 100;
     
        Ext.iterate(allowClasses,function(className){
            if(Ext.get(el).hasClass(className)){
               this.focusTask.delay(delay);
               return false;
            }
        },this);
                
     
    },
    
     destroy : function () {
        if (this.filterTask){
            this.filterTask.cancel();
            this.filterTask = null;
        }
    },
    
    
    resetSource: function() {
        this.setSource(Kdn.clone(this.defaultSource));
    },
    
    onPropertyChange: function(source, name, newProp, oldProp) {             
        source[name] = newProp;    
        this.setSource(source); 
                           
        switch (name) {
            case 'DepartureDate':
               {
						this.mainView.waybillTransfer();
						return;
						break;   
					}
		      case 'DepartureTime':
               {
						this.mainView.waybillTransfer();
						return;
						break;   
					}
            case 'ReturnDate':
               {       
                  this.mainView.setDateFieldSettings()
               }
        }        
               
        this.mainView.saveWaybillProperty();  
    },
    
    setData:function(data){
      
     
      var $ = this,
          source = $.getSource();
          
      $.resetSource();
            
      Ext.iterate(source,function(name, val, obj) {
            obj[name] = data[name];
      });
      
      Ext.apply(source, {
            DepartureTime: data.DepartureDate.format('H:i'),
            ReturnTime: data.ReturnDate.format('H:i'),
            DepartureDate: data.DepartureDate.clearTime(),
            ReturnDate: data.ReturnDate.clearTime()
        });
        
         this.setSource(source);
        
     //   $.onPropertyChange(source,'ReturnDate',source.ReturnDate,source.ReturnDate);  
          
    }
    
});

Ext.reg('view.waybill.waybillproperty', T.view.waybill.WaybillProperty);


Ext.override(T.view.waybill.WaybillProperty, {
    
    initFocus: function(){
    
    var focusEl=this.getView().focusEl,
        frameEl=this.el;
        
    this.fi = new Ext.a11y.Focusable(focusEl,frameEl,this);
     
        this.mon(this.fi, {
            focus: this.onFocus,
            blur: this.onBlur
        });
 
    },
    
    focus: function(){
        this.fi.focus();
    },
    
    blur: function(){
        this.fi.blur();
    },
        
    onFocus: Ext.emptyFn,
    onBlur: Ext.emptyFn
    
    
});


