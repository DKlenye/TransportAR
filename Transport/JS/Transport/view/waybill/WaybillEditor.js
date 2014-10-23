T.view.waybill.WaybillEditor = Ext.extend(Kdn.editor.ModelEditor, {
   requireModels:'User,Car,Schedule,Driver,FullTrailer,Fuel,RefuellingPlace,WorkCounter,WorkUnit,WorkType,Customer,Increase,WaybillType',
 
   vehicle:null,
   waybill:null,
   
   //стартовые параметры
   waybillId:null,
   vehicleId:null,
      
   closeAfterSave:false,

   constructor:function(cfg){
     cfg = cfg||{};
     
     var me = this;
     
     var createButton=function(cfg){
         var defaults = {
            xtype:'button',
            scope:me
         };
         
         return Ext.create(Ext.apply(defaults,cfg));
     };
     
     cfg.button={
         list:createButton({
            text: 'Список',
            iconCls: 'icon-page_white_stack',
            handler:this.openList
         }),
         open:createButton({            
            text: 'Открыть',
            iconCls: 'icon-lock-unlock',
            handler:this._open
         }),
         close:createButton({  
            text: 'Закрыть путевой лист',
            iconCls: 'icon-lock',
            handler:this.close,
            width:200
         }),
         prev:createButton({          
            iconCls: 'x-tbar-page-prev',
            direction: -1,
            handler:this.navWaybill
         }),
         last:createButton({           
            iconCls: 'x-tbar-page-last',
            direction: 0,
            handler:this.navWaybill
         }),
         next:createButton({
            iconCls: 'x-tbar-page-next',
            direction: 1,
            handler:this.navWaybill
         }),
         save:createButton({
            xtype:'button.save',
            handler:this.onSave
         }),
         calculate:createButton({
            text:'Расчёт показаний приборов',
            iconCls:'icon-counter',
            handler:this.onCalculate,
            width:150
         })
         
     };
     
     
     cfg.ComboCar = Ext.create({
	            xtype:'combo.car',
	            width:300,
	            listeners:{
	               scope:me,
	               select:me.onCarSelect
	            }
      });
     
          
     cfg.waybillproperty = Ext.create({
         navMap:{
           'RIGHT':'fueltab',
           'DOWN':'tasks'
         },
         mainView:this,
         xtype: 'view.waybill.waybillproperty',
         region: 'center',
         split: true,
         listeners: {
        
         },
         bbar: new Ext.Toolbar(
            {
                  defaults: {
                      scope: this
                  },
                  items: [
                     '-',
                     cfg.button.list,
                     '-',
                     cfg.button.open,
                     '->',
                     '-',
                     cfg.button.prev,
                     cfg.button.last,
                     cfg.button.next,
                     '-'
                  ]
           })
     });
     
     cfg.drivers = Ext.create({
         navMap:{
           'LEFT':'counters',
           'DOWN':'fueltab'
         },
        xtype:'view.waybill.waybilldriver',
         title:'Водители',
         mainView:this,
	      flex:1
     });
     
     cfg.counters = Ext.create({
         navMap:{
           'LEFT':'waybillproperty',
           'RIGHT':'drivers',
           'DOWN':'fueltab'
         },
         cls:'counter',
         title:'Показания приборов',
	      xtype:'view.waybill.waybillcounter',
	      flex:1,
	      mainView:this,
	      margins:'0 3 0 0'
     });
     
     
     
     
     cfg.summary = Ext.create({
         navMap:{
           'UP':'counters',
           'LEFT':'refuelling',
           'DOWN':'tasks'
         },
         cls:'summary',
         title:'Показатели работы',
         mainView:this,
         xtype:'view.waybill.waybillsummary'
     });
     
     cfg.refuelling = Ext.create({
         navMap:{
           'UP':'counters',
           'LEFT':'remains',
           'RIGHT':'summary',
           'DOWN':'tasks'
         },
         cls:'refuelling',
         title:'Заправка',
         mainView:this,
         xtype:'view.waybill.waybillrefuelling'
     });
     
     cfg.remains = Ext.create({
         navMap:{
           'UP':'counters',
           'RIGHT':'refuelling',
           'LEFT':'waybillproperty',
           'DOWN':'tasks'
         },
         cls:'fuelremains',
         xtype:'view.waybill.waybillfuelremain',
         mainView:this,
         title:'Движение ГСМ'
     });
     
     cfg.fueltab = Ext.create({  
         xtype:'view.waybill.waybilltab',
         deferredRender:false,
         margins: '3 0 0 0',
         flex:3,
         activeTab:0,
         items:[
	            cfg.remains,
               cfg.refuelling,
               cfg.summary
	      ]
	   });
	   
	   cfg.tasks = Ext.create({
	      navMap:{
           'UP':'fueltab'
         },
         title:'Выполнение работы',
         cls:'task',
         xtype:'view.waybill.waybilltask',
	      region:'south',
	      height:420,
	      mainView:this,
	      split:true,
         margins:'0 3 3 3'
	   });
	   
    
     cfg.closeComboWaybillPackage = Ext.create({
     
      xtype:'combo.waybillpackage',
      objectValue:false
     
     });
     cfg.closeWindow = new Ext.Window({
         
         modal:true,
         width:600,
         height:500,
         title:'Закрытие путевого листа',         
         layout:'vbox',
         layoutConfig: {
             align : 'stretch',
             pack  : 'start',
             defaultMargins:{
               top:2,
               bottom:2,
               left:2,
               right:2
             }
         },
         items:[
         {
            flex:1,
            xtype:'grid',
            stripeRows:true,
            columnLines:true,
            viewConfig:{
               forceFit:true
            },
            enableHdMenu:false,
            enableColumnMove:false,
            enableColumnResize:false,
            
            colModel: new Ext.grid.ColumnModel({
               defaults:{
                  align:'center',
                  sortable:false
               },
                  columns:[
                      {
                             header: 'Топливо',
                             dataIndex: 'FuelId',
                             align:'left',
                             fixed:true,
                             width: 120 ,
                             renderer:function(o){
                                 if(!o) return o;
                                 var store = Kdn.ModelFactory.getStore('Fuel'),
                                    rec = store.getById(o);
                                 if(rec){
                                    return rec.data.FuelName
                                 }
                                 return o;
                              }                  
                         },
                         {
                             header:'Выезд',
                             dataIndex:'DepartureRemain',
                             renderer:function(v,meta){
                                 meta.css='departure'
                                 return v;
                             }
                         },
                         {
                             header: 'Возвр.',
                             dataIndex:'ReturnRemain',
                             renderer:function(v,meta){
                                 meta.css='return'
                                 return v;
                             }
                         },
                         {
                             header:'Выдано',
                             dataIndex:'Refuelling'
                         },                   
                         {
                             header: 'НОРМА',
                             dataIndex: 'NormConsumption',
                             renderer:function(v,meta){
                                     meta.css='consumption';return v;
                             }
                         },
                         {
                             header:'ФАКТ',
                             dataIndex:'Consumption'                    
                         },
                         {
                             header:'+/-',
                             dataIndex:'Diff',
                             renderer:function(v,meta,rec,row,col,store){
                                 meta.css= v>0?(v>1?'diffWasteBig':'diffWaste'):(v<-1?'diffEconomyBig':'diffEconomy'); 
                                 return v;                                               
                              } 
                         }
                  ]
            }),
            store:cfg.remains.store
         },
         {
            flex:2,
            xtype:'grid',
            stripeRows:true,
            columnLines:true,
            columns:[
               {header:'Работа',dateIndex:'workName',width:300},
               {header:'Всего',dateIndex:'amount'},
               {header:'По РБ',dateIndex:'BY'}               
            ],
            store:cfg.summary.store 
         },
         {
            xtype:'container',height:20
         },
          cfg.closeComboWaybillPackage,
         {
            xtype:'container',height:30
         },
         {
            xtype:'label',
            text:''
         }
         ],
         buttons:[
            '->',
            '-',
            {
               xtype:'button',
               text:'Закрыть путевой лист',
               iconCls:'icon-lock',
               scope:this,
               handler:function(){                
                 this.closeWindow.hide(this.button.close.getEl());
                 this._close.defer(200,this);
               }
            },
            '-'
         ]
     });
     
     
     cfg.closeLabel = new Ext.form.Label({
         cls:'waybill-close-msg'      
     });
     
     
     Ext.apply(cfg,{
         items:[
            {
               xtype:'panel',
	            layout:'border',
	            border:false,
	            region:'center',
	            split:true,
	            margins:'3 3 0 3',
	            items:[
	               cfg.waybillproperty,
	               {
	                  xtype:'container',
	                  region:'east',
	                  width:'65%',
	                  split:true,
	                  layout:'vbox',
	                  layoutConfig: {
	                     align: 'stretch',
	                     pack: 'start'
	                  },
	                  items:[
	                     {
	                        xtype: 'container',
	                        flex: 2,
	                        layout: 'hbox',
	                        layoutConfig: {
	                           align: 'stretch',
	                           pack: 'start'
	                        },
	                        defaults:{
	                           mainView:this
	                        },
	                        items: [
	                           cfg.counters,
	                           cfg.drivers
	                        ]
	                     },
	                     cfg.fueltab
	                  ]
	               }
	            ]
            },
            cfg.tasks   
         ],
         tbar:[
            {
                text: 'Обновить',
                iconCls: 'icon-refresh',
                scope: this,
                handler:function(){
                  this.loadVehicle({
                     VehicleId:this.vehicleId
                  });
                }
            },
            '-',
	         {xtype:'tbspacer',width:10},
	         cfg.ComboCar,
	         {xtype:'tbspacer',width:10},
	         '-',
	         {xtype:'tbspacer',width:40},
	         cfg.closeLabel,
	         '->'
	         /*{
	            text: 'Новая путёвка',
	            iconCls: 'icon-page_add',
	            cls: 'newbutton',
	            scope: this,
	            handler:function(){
	               this.waybillId=null;
	               this.waybill=null;
	               this.setMode('create');
	               this.loadVehicle({
                     VehicleId:this.vehicleId
                  });
	            }
	         },*/
         ]
     });          
     
     T.view.waybill.WaybillEditor.superclass.constructor.call(this,cfg);     
   },
   
 
 initComponent:function(){  
	   Kdn.editor.ModelEditor.superclass.initComponent.call(this);	 
	},


	onAfterRender: function() {
	    var me = this;
        var fm = new T.view.waybill.FocusMgr(me);
        me.FocusMgr = fm;

	    Ext.iterate(['drivers', 'counters', 'fueltab', 'remains', 'refuelling', 'summary', 'tasks', 'waybillproperty'], function(e) {
	        fm.add(e, me[e]);
	    });
        
    this.body.mask();
    
    var me = this,
          el = me.getEl(),
          records = me.records || [];
      
      el.addClass('waybillEditor');      
      record = records.shift();	
               
    
       if(record){
         me.waybillId = record.data.WaybillId;
         me.vehicleId = record.data.Car.VehicleId;
       }
       
       if(me.waybillId || me.vehicleId){
          me.loadVehicle({
            WaybillId:me.waybillId,
            VehicleId:me.vehicleId
          });
       }
       
       this.setTabTitle();
       
       this.ComboCar.focus.defer(300,this.ComboCar,[true]);
       
       
       var tbar = this.tasks.getTopToolbar();
       tbar.add(
         '->',
         '-',
         {
	            text: 'Печать',
	            iconCls: 'icon-printer',
	            cls: 'printbutton',
	            scope: this,
	            handler:function(){
	               this.print();
	            }           
	      },
         '-',
         this.button.calculate,
         '-',
         this.button.close,
         '-'
       );
       tbar.doLayout();
       
       
      
   },
   
   onCarSelect:function(rec){	
	   this.vehicleId = rec.data.VehicleId;
	   this.waybillId = null;
	   this.loadVehicle({
         VehicleId:this.vehicleId
      });
	},
	
	navWaybill:function(btn){
      if (btn.direction == 0) this.waybillId = 0;
      this.loadWaybill(btn.direction);
	},
		
	commitChanges:	function(){
     T.view.WaybillEditor.superclass.commitChanges.call(this);
	},	
	
	setTabTitle: function() {
	
	     var WaybillId = this.waybillId;
	      
	     var title = String.format(
	      'ПЛ №{0}',
	      (!!WaybillId) ? WaybillId : '-----'),
	         iconCls = 'icon-page_white_edit';
     
	
        Kdn.Application.viewTab.getActiveTab().setTitle(title,iconCls);
    },
    
    
    eachEditors:function(fn){
      Ext.iterate([
         'waybillproperty',
         'counters',
         'drivers',
         'refuelling',
         'remains',
         'tasks',
         'summary'
      ],fn,this);
    },
    
   loadVehicle:function(cfg){
	   Kdn.Direct.LoadVehicle(cfg,this.onVehicleLoad.createDelegate(this));
	},
	
	onVehicleLoad:function(e){
	   this.vehicle = e;	   
	   this.ComboCar.setValue(Ext.copyTo({},e,'VehicleId,Model,GarageNumber,InventoryNumber,RegistrationNumber'));
	   this.applyVehicleSettings();	  
	   	    
	   this.body.unmask();   
	   this.loadWaybill();
	   this.waybillproperty.focusTask.delay(50);	   
	   
	},	
	
	applyVehicleSettings:function(){
	  
	  var v = this.vehicle,
	      mc = Ext.util.MixedCollection,
	      TkmWorkId = T.config.TkmWorkId;
	      
	  if(v){
	      //делаем маппинг норм и их изменений для более быстрой работы
	      norms = new mc();
	      Ext.iterate(v.Norms||[],function(n){
	         if(n.WorkTypeId != TkmWorkId){
	             norms.add(n['NormId'], n);
	             n.increases = [];
	         }
	      });
	      v.norms=norms;

	      //делаем маппинг надбавок к нормам
	      Ext.iterate(v.Increases || [], function(i) {
	          var n = norms.get(i.NormId);
	          n.increases.push(i);
	      });
	      
	      //формируем эдитор в заправке для разрешённых видов топлива
	      
	      var fuelEditorStore = this.refuelling.FuelEditor.store,
	          fuelStore = Kdn.ModelFactory.getStore('Fuel');
	      
	      fuelEditorStore.removeAll();
	      
	      Ext.iterate(v.Fuels,function(f){
                  var fuel = fuelStore.getById(f);
                  if(fuel) fuelEditorStore.add(new fuelEditorStore.recordType(Kdn.clone(fuel.data),fuel.id));
         });
         
         //формируем эдитор для надбавок с учётом поправок на транспортное средство
         /*
         var taskIncreaseStore = this.tasks.IncreasesEditor.store,
            increaseStore = Kdn.ModelFactory.getStore('Increase');
         
         v.increases = new mc();
         
         taskIncreaseStore.removeAll();
         increaseStore.each(function(i){
            if(!i.get('isNormConstant')){
               taskIncreaseStore.add(new taskIncreaseStore.recordType(Kdn.clone(i.data),i.id));
            }
            
            v.increases.add(i.id,Kdn.clone(i.data));
         });
         
         Ext.iterate(v.Increases||[],function(i){
            var rec = taskIncreaseStore.getById(i.IncreaseId);
            if(rec) rec.set('Prcn',i.Prcn);
            
            rec=v.increases.get(i.IncreaseId);
            rec['Prcn']=i.Prcn;
            
         });   
         */
	      	      
	  }
	},
	
	loadWaybill:function(Direction){
	   this.mask('Загрузка');
		Kdn.Direct.LoadWaybill({
		   Direction:Direction || 0,
			WaybillId:this.waybillId,			
			VehicleId:this.vehicleId
		},
		this.onWaybillLoad.createDelegate(this)
		);
	},
	
	
	onWaybillLoad:function(e){
	   var $ = this;
	   	   	   
	   $.unmask();
	   $.waybill = e;
	   
	   if ($.waybill){
	      $.waybillId = e.WaybillId;
	      $.fillForUpdate();
	      $.setNavigation();
	      $.refreshAll();
	      $.setResponseDriver();
	      $.setDateFieldSettings();
	   }
	   else{
	      $.waybillId = null;
	      $.body.mask();
	      $.clearEditors();
	   }
	   
	   $.setTabTitle();	   
	   
	},
	
	setDateFieldSettings:function(){
	   var source =  this.waybillproperty.getSource();
	   var startDate = source['DepartureDate'];
	   var endDate = source['ReturnDate'];
	   
	   this.refuelling.DateEditor.setMinValue(startDate);
	   this.refuelling.DateEditor.setMaxValue(endDate);	
	   this.tasks.DateEditor.setMinValue(startDate);
	   this.tasks.DateEditor.setMaxValue(endDate);
	},
	
	
	setResponseDriver:function(){
	  
	  var resp = this.waybill.ResponsibleDriver;
	  
	  if(resp){
	      this.drivers.store.each(function(d){
	         d.data['isResponsible']= (resp.DriverId==d.get('Driver').DriverId);
	      });
	      this.drivers.view.refresh();
	  }
	  
	   
	},
	
	setVehicleDrivers:function(){
	   var $ = this,
	       v = $.vehicle,
	       driverStore = $.driver.store,
	       isResponsible;
	       
	    driverStore.removeAll();
       driverStore.modified = [];
       driverStore.removed  = [];
       
       Ext.iterate(v.Drivers,function(d){
         
         isResponsible = false;
         if(v.ResponsibleDriver && !isResponsible){
           isResponsible = d.Driver.DriverId==v.ResponsibleDriver.DriverId;
         }
                  
         var rec = new driverStore.recordType({
            Driver:d.Driver,
            isResponsible:isResponsible
         });
         driverStore.add(rec);
         
       });
       if(!v.ResponsibleDriver && driverStore.getCount()>0){
         driverStore.getAt(0).set('isResponsible',true);
       }
       	       
	},
	
	
	
	//функция контролирует список остатков по доступным транспорту видам топлива
	//т.е если в предыдущей путёвке не было остатка по новому виду топлива
	setVehicleRemains:function(value){
	   var $ = this,
	       v = $.vehicle,
	       store = $.remains.store,
	       recs = [];
	       	       
        Ext.iterate(v.Fuels, function(f) {
            var idx = store.find('FuelId',f);
            if (idx==-1) {
                var rec = new store.recordType({
                    WaybillId: $.waybillId,
                    FuelId: f,
                    DepartureRemain: Ext.isDefined(value)? value : 0
                });
                recs.push(rec)
            }
        });
        
        if (recs.length>0) store.add(recs);
        
	},
	
	//аналогично предыдущей функции, но контроль показаний счётчиков
	setVehicleCounters:function(value){
	
	   var $ = this,
	       v = $.vehicle,
	       store = $.counters.store,
	       recs = [];
	       
        Ext.iterate(v.Counters, function(c) {
            var idx = store.find('CounterId',c);  
            if (idx==-1) {
                var rec = new store.recordType({
                    WaybillId: $.waybillId,
                    CounterId: c,
                    Departure: Ext.isDefined(value)? value : 0,
                    isBroken:false 
                });
               recs.push(rec)
            }
        });
        
        if (recs.length>0) store.add(recs);        
                
	},
	
	
	fillForUpdate:function(){
		
	   var $ = this;
	   
	   $.eachEditors(function(e){
	      var editor = $[e];
	      if(editor && editor["setData"]){
	         editor["setData"]($.waybill);
	      }
	   });
	   
	   if (!$.isDispClosed()){
	      this.getEl().removeClass('createWaybill')
	      $.setVehicleRemains();
	      $.setVehicleCounters();
	      $.closeLabel.setText("");      
	   }
	   else{
	   	      	   
	      this.getEl().addClass('createWaybill');
	   }	   
	   
	   
	   	  
	},
	
	setNavigation:function(){
	   
	   var $ = this;
	
	   $.button.prev.setDisabled($.isFirst());
	   $.button.last.setDisabled($.isCurrent());
	   $.button.next.setDisabled($.isLast());
	   
	   $.button.open.setDisabled($.waybill.WaybillState<=1);
	   $.button.close.setDisabled(!$.isCurrent()||$.waybill.WaybillState>1);
	   $.button.calculate.setDisabled($.waybill.WaybillState>1);
	   
	   if (!$.isDispClosed()){
	      $.closeLabel.setText(""); 
	   }
	   else{
	      var closeTpl = "Закрыта : {0} ({1})";
	      var user = Kdn.ModelFactory.getStore('User').getById($.waybill.UserClose);
	      $.closeLabel.setText(String.format(closeTpl,	         
            Ext.isDate($.waybill.WhenClose)?$.waybill.WhenClose.format('d.m.Y'):'',
	         user==null?"":user.get('Name')
	      ));
	   }
	   
	   
	   
	},
	
	isFirst:function(){
	   return (this.waybill && this.waybill.Position==1);
	},
	
	isCurrent:function(){
	   return (this.waybill && this.waybill.isCurrent) || (this.waybill && this.waybill.WaybillState>1 && this.isLast());
	},
	
	isLast:function(){
	   return (this.waybill && this.waybill.isLast);
	},
	
	mask:function(message){
	   this.getEl().mask(message,'x-mask-loading');
	},
	unmask:function(){
	   this.getEl().unmask();
	},
		
	isDispClosed:function(){
	   return(this.waybill && this.waybill.WaybillState>1);
	},
	
	isAccClosed:function()
	{	
	    return(this.waybill && this.waybill.AccPeriod);
	},	
	
	refreshRefuelling: function() {
	
        var data = {};

        this.refuelling.store.each(function(r) {
            var key, q;
            if ((key = r.data.FuelId) && (q = r.data.Quantity)) {
                data[key] = Kdn.fixDecimal(data[key] ? (data[key] + q) : q);
            }
        });

        var store = this.remains.store;

        store.each(function(r) {            
            r.data['Refuelling']=0;
        });

        Ext.iterate(data, function(key, val, obj) {
            var rIdx = store.find('FuelId',key);
            if (rIdx!=-1) {
               var r = store.getAt(rIdx);
                r.data['Refuelling']=val;
            }
        });
        
        this.remains.view.refresh();
    },
        
    
    refreshAll:function(){
      
         this.refreshNormConsumption();
         this.refreshRefuelling();
         this.refreshFact();
         this.refreshDiff();
         this.summary.refreshSummary();
      
    },
    
    refreshDiff: function() {
        this.remains.store.each(this.refreshDiffRecord, this);
    },
                

    refreshDiffRecord: function(r) {
        var d = r.data;
        d['Diff']= Kdn.fixDecimal((d.Consumption || 0) - (d.NormConsumption || 0));
        d['ZeroDiff'] = Kdn.fixDecimal((d.DepartureRemain || 0) + (d.Refuelling || 0) - (d.NormConsumption || 0), 2);
        this.remains.view.refresh();
    },
    
    refreshFact: function() {
        this.remains.store.each(this.refreshFactRecord, this);
    },

    refreshFactRecord: function(r) {
        var d = r.data;        
        d['Consumption']= Kdn.fixDecimal((d.DepartureRemain || 0) + (d.Refuelling || 0) - (d.ReturnRemain || 0));
        this.remains.view.refresh();
    },
    
     
    refreshNormConsumption: function() {
        
        var tasks = this.tasks,
            remains = this.remains,
            data = {};


        tasks.store.each(function(r) {
            var id = r.get('FuelId');
            data[id] = parseFloat(((data[id] || 0) + (r.get('Consumption') || 0)).toFixed(2));
        });

        remains.store.each(function(r) {
            r.data['NormConsumption'] = data[r.get('FuelId')] || 0;
        });
        
        remains.view.refresh();

    },
    
        
    clearEditors:function(){
      var $ = this;
      $.eachEditors(function(_e){
           
         var e = $[_e];
         e.store.clearData();
         e.store.modified = [];
         e.store.removed = [];
      });
    },
    
   close:function(){
     
     
     var combo = this.closeComboWaybillPackage;
     var wpStore = combo.store;
     
     wpStore.reload();
     
     
     if(this.waybill.PackageId){     
         combo.setValue(this.waybill.PackageId);     
     }
     
     
     else{
     
        var packageTypeId = this.vehicle.PackageTypeId;
        
        if(packageTypeId){
            var idx = wpStore.find('PackageTypeId',packageTypeId);
            
            if(idx!=-1){
               
               combo.setValue(wpStore.getAt(idx).get('PackageId'));
            }
            else
            {
               combo.reset();
            }
        }
        else{
          combo.reset();
        }
     }


       var $ = this,
           data = {},
           errorMesage = [],
           departureDate = $.waybillproperty.getSource()['DepartureDate'],
           returnDate = $.waybillproperty.getSource()['ReturnDate'];
        
        
        $.tasks.store.each(function(r) {
            var consumptionId = r.get('NormConsumptionId');
            if(consumptionId){
                var info = $.tasks.getConsumptionInfo(consumptionId);
                if(info){
                  var id = info.norm['CounterId'];
                  data[id] = (data[id] || 0) + (r.get('WorkAmount')||0);
                } 
            }
            
            var Customer = r.get('Customer');
            if(!Customer){
               errorMesage.push('Не внесены данные по <b>заказчику</b>');
            }

            var taskDate = r.get('TaskDepartureDate');
            if (taskDate.clearTime() < departureDate || taskDate.clearTime() > returnDate) {
                errorMesage.push('Неверная дата задания <b>' + taskDate.format('d.m.Y')+'</b>');
            }

        });

        $.counters.store.each(function(r) {
            var count = Kdn.fixDecimal(data[r.get('CounterId')]||0);            
            var counterCount = Kdn.fixDecimal((r.get('Return')||0)-(r.get('Departure')||0));
                                    
            if(count!=counterCount){
               if(r.get('CounterId')==1){
                  errorMesage.push(String.format("Не совпадение пробега.<br/> по счётчику <b>{0}</b>,<br/> в таблице <b>{1}</b>",counterCount,count));                  
               }               
               else{
                  errorMesage.push(String.format("Не совпадение м.часов <br/> по счётчику <b>{0}</b>,<br/> в таблице <b>{1}</b>",counterCount,count));                     
               }            
            }

        });

        if (!$.drivers.isResponsibleExist()) {
            errorMesage.push("Не установлен материально ответственный водитель");
        }

       $.remains.setNullRemains();
        
        if(errorMesage.length>0){
         Ext.Msg.alert('Сообщение',errorMesage.join("</br>"));
        }
        else{
        
         this.closeWindow.items.each(function(i){
            if(i.xtype=='grid'){
               if(i.view && i.view.refresh) i.view.refresh();
            }
         });
        
          this.closeWindow.show(this.button.close.getEl());
        }
     

    },
    
    _close:function(){
      
      
      var packegeId = this.closeComboWaybillPackage.getValue();      
      this.waybillproperty.setProperty('PackageId',packegeId);
      
      this.closeWaybill();
      
    },
    
    closeWaybill:function(){    
      Kdn.Direct.CloseWaybill({WaybillId:this.waybillId},this.afterClose.createDelegate(this));      
    },
    
    afterClose:function(e){
      this.waybillId = 0;
      this.loadWaybill();
    },
    
    _open:function(){
    
      if(this.isAccClosed()){
         Ext.Msg.alert('Сообщение','Закрыто бухгалтером!');
         return;  
      }
    
      Ext.Msg.confirm(
         'Открытие путевого листа',
         'Внимание!!!<br/>При открытии путевого листа, все последующие путевые будут открыты!',
         function(m){if(m=='yes') this.open();},
         this
      );
    },
    
    open:function(){
      Kdn.Direct.OpenWaybill({WaybillId:this.waybillId},this.afterOpen.createDelegate(this));
    },
    
    afterOpen:function(e){
      this.waybill = e;
      this.waybillproperty.setData(e);
      this.getEl().removeClass('createWaybill');
      this.setNavigation();
      
    },
        
    
    openList:function(){
      
      var WaybillListView = Kdn.Application.viewTab.get('view.waybill_view');
      
      var filter = {
            Vehicle:Ext.copyTo({},this.vehicle,'VehicleId,Model,GarageNumber,InventoryNumber,RegistrationNumber'),
            Date:this.waybillproperty.getSource()['DepartureDate']
      };
      
      if(WaybillListView){
         WaybillListView.items.itemAt(0).applyFilter(filter);
         Kdn.Application.viewTab.activate(WaybillListView);
      }
      else{
         Kdn.Application.createView({         
            xtype:'view.waybill',
            single:true,
            text: 'Список путевых листов',
            iconCls: 'icon-page_white_stack',
            filter:filter        
         });
      }   
      
    },
    
    print:function(){
   
      var id = this.waybillproperty.getSource()['WaybillTypeId'];
      
	  if (!id){
	     Ext.Msg.alert('','Не выбран бланк путевого листа');
	  return;
	  };

       var templateName = Kdn.ModelFactory.getStore('WaybillType').getById(id).get('UrlTemplate');
       Kdn.Printer.printWaybill(templateName, this.waybillId);
     
   },
   
   saveWaybillProperty:function(){
       
      var $ = this,
          wProperty = $.waybillproperty;
      
      var source = wProperty.getSource();
            
      var obj = {};
      Ext.copyTo(obj,source,'TrailerId,Way,WaybillId,ScheduleId,Shift,PackageId,WaybillTypeId,FormNumber,OrderNumber,OrderDate');
      
      Ext.copyTo(obj,$.waybill,'Position,WaybillState,AccPeriod,WaybillNumber,ResponsibleDriver,UserClose,WhenClose');      
      
      obj.DepartureDate = Kdn.parseDate(source.DepartureDate,source.DepartureTime);
      obj.ReturnDate = Kdn.parseDate(source.ReturnDate,source.ReturnTime);
      
      obj.Car = Ext.copyTo({},$.vehicle,'VehicleId');

      $._saveWaybillProperty(obj);   
    },
   
    _saveWaybillProperty:function(w){     
      Kdn.Direct.SaveWaybill(w,this.onWaybillPropertySave.createDelegate(this));
    },
    
    onWaybillPropertySave:function(o){
      
      this.summary.refreshSummary();
      
    },
    
    waybillTransfer:function(){
     var $ = this,
          wProperty = $.waybillproperty;
      
      var source = wProperty.getSource();
      
      var date = Kdn.parseDate(source.DepartureDate,source.DepartureTime);
      
      this.mask('Перенос путевого листа');
      
      Kdn.Direct.TransferWaybill({ 
         WaybillId:this.waybillId,
         Date:date
      },
      this.onWaybillLoad.createDelegate(this)
      );     
            
    },
    
    onCalculate:function(){
    
      var $ = this,
            data = {};

        $.tasks.store.each(function(r) {
            var consumptionId = r.get('NormConsumptionId');
            if(consumptionId){
                var info = $.tasks.getConsumptionInfo(consumptionId);
                if(info){
                  var id = info.norm['CounterId'];
                  data[id] = (data[id] || 0) + (r.get('WorkAmount')||0);
                } 
            }
        });

        $.counters.store.autoSave = false;

        $.counters.store.each(function(r) {
            var count = data[r.get('CounterId')],
                isBroken = r.get('isBroken'),
                returnCounter = r.get('Departure')+ (isBroken? 0:((!!count) ? count : 0));
                
            if(r.get('Departure')!=null){          
               r.beginEdit();
               r.set('Return',returnCounter);
               r.endEdit();
            }
        });
        
        $.counters.store.autoSave = true;
        $.counters.store.save();
      
    }
  
   

});
Ext.reg('view.waybilleditor', T.view.waybill.WaybillEditor);