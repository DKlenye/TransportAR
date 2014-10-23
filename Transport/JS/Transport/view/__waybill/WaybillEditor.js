T.view.waybill.WaybillEditor = Ext.extend(Kdn.editor.ModelEditor, {
   requireModels:'Car,Schedule,Driver,FullTrailer,Fuel,RefuellingPlace,WorkCounter,WorkUnit,WorkType,Customer,Increase,WaybillType',
 
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
            text: 'Закрыть',
            iconCls: 'icon-lock',
            handler:this.close
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
                     cfg.button.close,
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
         title:'Показания приборов',
	      xtype:'view.waybill.waybillcounter',
	      flex:1,
	      mainView:this,
	      margins:'0 3 0 0'
     });
     
     cfg.refuelling = Ext.create({
         navMap:{
           'UP':'counters',
           'LEFT':'remains',
           'DOWN':'tasks'
         },
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
               cfg.refuelling
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
	      height:350,
	      mainView:this,
	      split:true,
         margins:'0 3 3 3'
	   });
     
     
     
     cfg.closeStore = new Ext.data.JsonStore({
      fields:['name','amount','BY'],
      autoDestroy:true
     });
     cfg.closeComboWaybillPackage = Ext.create({
     
      xtype:'combo.waybillpackage',
      objectValue:false
     
     });
     cfg.closeWindow = new Ext.Window({
         
         modal:true,
         width:600,
         height:400,
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
         items:[{
            flex:1,
            xtype:'grid',
            stripeRows:true,
            columnLines:true,
            columns:[
               {header:'Работа',dateIndex:'workName',width:250},
               {header:'Всего',dateIndex:'amount'},
               {header:'По РБ',dateIndex:'BY'}
            ],
            store:cfg.closeStore 
         },
         {
            xtype:'container',height:20
         },
          cfg.closeComboWaybillPackage,
         {
            xtype:'container',height:30
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
	         cfg.button.save,
	         '-',
	         '->',
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
	         '-'
         ]
     });          
     
     T.view.waybill.WaybillEditor.superclass.constructor.call(this,cfg);     
   },
   
   initComponent:function(){  
	   Kdn.editor.ModelEditor.superclass.initComponent.call(this);	
	   this.addEvents('beforesave','aftersave');	      
	
	   this.on({
	      scope:this,
	      beforesave: this.onBeforeSave,
	      aftersave : this.onAfterSave
	   });
	},
	
	onBeforeSave:function(){
	   this.mask('Сохранение');
	},
	
	onAfterSave:function(){
	   this.unmask();
	},   

	
	
      
   onAfterRender:function(){
      this.FocusMgr = new T.view.waybill.FocusMgr(this);
      
	   this.FocusMgr.add('drivers',this.drivers);
	   this.FocusMgr.add('counters',this.counters);
      this.FocusMgr.add('fueltab',this.fueltab);
      this.FocusMgr.add('remains',this.remains);
      this.FocusMgr.add('refuelling',this.refuelling);
      this.FocusMgr.add('tasks',this.tasks);
      this.FocusMgr.add('waybillproperty',this.waybillproperty);
   
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
         'tasks'
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
	      consumption = new mc();
	      	      	      
	      Ext.iterate(v.Norms||[],function(n){
	         
	         if(n.WorkTypeId == TkmWorkId){
	          var tkmcons = n.NormConsumption.shift();
	          if(tkmcons){
	            v.TkmNorm = tkmcons.Consumption;
	          }
	         }
	         else{
	            norms.add(n['NormId'],n);
	         
	            Ext.iterate(n.NormConsumption||[],function(c){
	               consumption.add(c['RecId'],c);      
	            });
	         }
	                 	         
	      
	      });
	      	      
	      v.norms=norms;
	      v.consumption=consumption;
	      	      
	      //
	      
	      //формируем эдитор в заправке для разрешённых видов топлива
	      
	      var fuelEditorStore = this.refuelling.FuelEditor.store,
	          fuelStore = Kdn.ModelFactory.getStore('Fuel');
	      
	      fuelEditorStore.removeAll();
	      
	      Ext.iterate(v.Fuels,function(f){
                  var fuel = fuelStore.getById(f);
                  if(fuel) fuelEditorStore.add(new fuelEditorStore.recordType(Kdn.clone(fuel.data),fuel.id));
         });
         
         //формируем эдитор для надбавок с учётом поправок на транспортное средство
         
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
	   }
	   else{
	      $.waybillId = null;
	      $.body.mask();
	      $.clearEditors();
	   }
	   
	   $.setTabTitle();	   
	   $.setDateFieldSettings();
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
	       store = $.remains.store;
	       
        Ext.iterate(v.Fuels, function(f) {
            var idx = store.find('FuelId',f);
            if (idx==-1) {
                var rec = new store.recordType({
                    FuelId: f,
                    DepartureRemain: Ext.isDefined(value)? value : 0
                });
                store.add(rec);
            }
        });
	},
	
	//аналогично предыдущей функции, но контроль показаний счётчиков
	setVehicleCounters:function(value){
	
	   var $ = this,
	       v = $.vehicle,
	       store = $.counters.store;
	       
        Ext.iterate(v.Counters, function(c) {
            var idx = store.find('CounterId',c);
            if (idx==-1) {
                var rec = new store.recordType({
                    CounterId: c,
                    Departure: Ext.isDefined(value)? value : 0,
                    isBroken:false
                });
                store.add(rec);
            }
        });
                
	},
	
	
	fillForUpdate:function(){
	   var $ = this;
	   
	   $.eachEditors(function(e){
	      var editor = $[e];
	      if(editor && editor["setData"]){
	         editor["setData"]($.waybill);
	      }
	   });
	   
	   $.drivers.onStoreWrite();
	   
	   if (!$.isDispClosed()){
	      this.getEl().removeClass('createWaybill')
	      $.setVehicleRemains();
	      $.setVehicleCounters();
	      $.tasks.calculateNormConsumptionAll();
	      $.refreshCounters();
	   }
	   else{
	      this.getEl().addClass('createWaybill');
	   }	   
	   
	  $.refreshRefuelling();
	  $.refreshNormConsumption();
	  $.refreshFact();	  
	  $.refreshDiff();
	  
	},
	
	setNavigation:function(){
	   this.button.prev.setDisabled(this.isFirst());
	   this.button.last.setDisabled(this.isCurrent());
	   this.button.next.setDisabled(this.isLast());
	   
	   this.button.open.setVisible(this.waybill.WaybillState==2);
	   this.button.close.setVisible(this.isCurrent() && this.waybill.WaybillState==1 );
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
            r.beginEdit();
            r.set('Refuelling', 0);
            r.endEdit();
        });

        Ext.iterate(data, function(key, val, obj) {
            var rIdx = store.find('FuelId',key);
            if (rIdx!=-1) {
               var r = store.getAt(rIdx);
                r.beginEdit();
                r.set('Refuelling', val);
                r.endEdit();
            }
        });
    },
    
    refreshDiff: function() {
        this.remains.store.each(this.refreshDiffRecord, this);
    },
                

    refreshDiffRecord: function(r) {
        var d = r.data;
        r.beginEdit();
        r.set('Diff',
            Kdn.fixDecimal((d.Consumption || 0) - (d.NormConsumption || 0))
        );
        r.set('ZeroDiff',
            Kdn.fixDecimal((d.DepartureRemain || 0) + (d.Refuelling || 0) - (d.NormConsumption || 0), 2)
        );
        r.endEdit();
    },
    
    refreshFact: function() {
        this.remains.store.each(this.refreshFactRecord, this);
    },

    refreshFactRecord: function(r) {
        var d = r.data;
        r.beginEdit();
        r.set('Consumption',
            Kdn.fixDecimal((d.DepartureRemain || 0) + (d.Refuelling || 0) - (d.ReturnRemain || 0))
        );
        r.endEdit();
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
            r.beginEdit();
            r.set('NormConsumption', data[r.get('FuelId')] || 0);
            r.endEdit();
        });

    },
    
    refreshCounters: function() {
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
    },   
        
    clearEditors:function(){
      var $ = this;
      $.eachEditors(function(_e){
         var e = $[_e];
         e.store.removeAll();
         e.store.modified = [];
         e.store.removed = [];
      });
    },
    
    
   
    onSave:function(){
    
    
      this.fireEvent('beforesave');
    
      var $ = this,
          wProperty = $.waybillproperty;
      
      var source = wProperty.getSource();
      
      
      var obj = {};
      Ext.copyTo(obj,source,'TrailerId,Way,WaybillId,ScheduleId,Shift,PackageId,WaybillTypeId,FormSerial,FormNumber,UnloadDate');
      
      Ext.copyTo(obj,$.waybill,'Position,WaybillState,AccPeriod,WaybillNumber');      
      
      obj.DepartureDate = Kdn.parseDate(source.DepartureDate,source.DepartureTime);
      obj.ReturnDate = Kdn.parseDate(source.ReturnDate,source.ReturnTime);
      
      obj.Car = Ext.copyTo({},$.vehicle,'VehicleId');

         
      var responsibleIdx = $.drivers.store.find('isResponsible',true);
      if(responsibleIdx==-1 && $.drivers.store.getCount()>0){
         responsibleIdx = 0
      }
      
      if(responsibleIdx!=-1){
         obj.ResponsibleDriver =  Kdn.clone($.drivers.store.getAt(responsibleIdx).data.Driver);
      }
            
      $.saveWaybillProperty(obj);           
      
    },
    
    saveWaybillProperty:function(w){     
      Kdn.Direct.SaveWaybill(w,this.onWaybillPropertySave.createDelegate(this));
    },
    
    onWaybillPropertySave:function(o){
      var $ = this;
      
      $.waybill = o;
      $.waybillproperty.setData(o);
      $.waybillId=o['WaybillId'];
      
      $.setNavigation();
      
      var dirtyStores = [];           
      
      Ext.iterate('counters,drivers,refuelling,remains,tasks'.split(','),function(e){
         var editor = $[e];
         
         if (editor.store.hasChanges()){
         
            editor.store.each(function(r){
               r.beginEdit();
               r.set('WaybillId',$.waybillId);
               r.endEdit();
            });
         
            dirtyStores.push(editor.store);
         
         }
                  
      });
      
      
      if(dirtyStores.length > 0){         
         
         dirtyStores[dirtyStores.length-1].on({
           scope:$,
           single:true,
           write:$.onEditorsWrite 
         });
         
         Ext.iterate(dirtyStores,function(e){e.save()});
         
      }
      else{
         $.onEditorsWrite();
      }
      
            
      
    },
    
    onEditorsWrite:function(){
           
      var taskStore = this.tasks.store,
          dirtyIncreases = [];
      
      taskStore.each(function(rec){
         
         if(rec.increases.hasChanges()){
         
            rec.increases.each(function(irec){
               irec.beginEdit();
               irec.set('TaskId',rec.get('TaskId'));
               irec.endEdit();
            });
            
            dirtyIncreases.push(rec.increases);
                     
         }               
         
      });
      
      if(dirtyIncreases.length > 0){         
         
         dirtyIncreases[dirtyIncreases.length-1].on({
           scope:this,
           single:true,
           write:this.afterSave 
         });
                  
         Ext.iterate(dirtyIncreases,function(e){e.save()});
         
      }
      else{
         this.afterSave();
      }
      
    },
    
    afterSave:function(){
      this.fireEvent('aftersave');
    },
    
    
    
    
    close:function(){
     
     var store = this.closeStore;
     store.removeAll();     
     var summary = this.tasks.calculateSummary();      
      
     summary.each(function(data){     
      store.add(new store.recordType(data));
     });
     
     var combo = this.closeComboWaybillPackage;
     var wpStore = combo.store;
     
     wpStore.reload();
     
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
     
     this.closeWindow.show(this.button.close.getEl());

    },
    
    _close:function(){
      
      this.on({
         scope:this,
         single:true,
         aftersave:this.closeWaybill
      });
      
      var packegeId = this.closeComboWaybillPackage.getValue();      
      this.waybillproperty.setProperty('PackageId',packegeId);
      
      this.onSave();
      
    },
    
    closeWaybill:function(){    
      Kdn.Direct.CloseWaybill({WaybillId:this.waybillId},this.afterClose.createDelegate(this));    
    },
    
    afterClose:function(e){
      /*
      this.waybill = e;
      this.waybillproperty.setData(e);
      this.getEl().addClass('createWaybill');
      this.setNavigation();
      */
      this.waybillId = 0;
      this.loadWaybill();
    },
    
    _open:function(){
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
      
      var url = Kdn.ModelFactory.getStore('WaybillType').getById(id).get('UrlTemplate');
      var URL = Ext.urlAppend("print/"+url+".aspx",Ext.urlEncode({WaybillId:this.waybillId}));
	              
      Ext.Ajax.request({
         url: URL,
         method: 'GET',
         success: function(e) {
            var win = window.open('', 'printer', 'menubar=0,location=0,resizable=no,scrollbars=no,status=0,width='+screen.width+',height='+screen.height);
               win.document.write(e.responseText);
               win.document.close();
	            function CheckWindowState() {
                  if (win.document.readyState == "complete") {
                     win.close();
                  }
                  else {
                     CheckWindowState.defer(500);
                  }
               }
	            win.print();
               CheckWindowState();
         },
         failure: function(e) {
            Ext.Msg.show({ width: 800, title: 'Ошибка', buttons: Ext.Msg.OK, msg: e.responseText })
         }
      });
      
   } 
  
   

});
Ext.reg('view.waybilleditor', T.view.waybill.WaybillEditor);