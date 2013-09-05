
T.view.WaybillEditor = Ext.extend(Kdn.editor.ModelEditor, {

   requireModels:'Schedule,Driver,Trailer,Fuel,RefuellingPlace,WorkCounter,WorkUnit,WorkType,Customer,Increase,WaybillType',

   mode:null,// create update
   
   vehicle:null,
   waybill:null,
   
   //стартовые параметры
   waybillId:null,
   vehicleId:null,
   
   insertInfo:null,
   
   
   closeAfterSave:false,
   
   
   constructor:function(cfg){
     cfg = cfg||{};
     
     var waybillproperty = Ext.create(
      {
              xtype: 'view.waybill.waybillproperty',
              region: 'center',
              split: true,
              listeners: {
                  beforepropertychange: this.onPropertyChange
              },
              bbar: new Ext.Toolbar(
              {
                  defaults: {
                      scope: this
                  },
                  items: [
                      '-',
                  {
                      text: 'Список',
                      iconCls: 'icon-page_white_stack',
                      handler: this.openList,
                      scope: this
                  },
                      '-',
                  {
                      text: 'Открыть',
                      cls: 'OpenWbBtn',
                      iconCls: 'icon-lock-unlock',
                      hidden: true,
                      handler: this.open,
                      scope: this
                  },
                  {
                      text: 'Закрыть',
                      cls: 'CloseWbBtn',
                      iconCls: 'icon-lock',
                      hidden: true,
                      handler: this.close,
                      scope: this
                  },
                      '->',
                      '-',
                  {
                      iconCls: 'x-tbar-page-prev',
                      cls: 'PrevWbBtn',
                      handler: this.navWaybill,
                      direction: -1
                  },
                  {
                      iconCls: 'x-tbar-page-last',
                      cls: 'CurrentWbBtn',
                      handler: this.navWaybill,
                      direction: 0
                  },
                  {
                      iconCls: 'x-tbar-page-next',
                      cls: 'NextWbBtn',
                      handler: this.navWaybill,
                      direction: 1
                  },
                      '-']
              })
      });
     
     
     
     Ext.apply(cfg,{
      waybillproperty:waybillproperty
     });
     
      
   },
   
   

   getItems:function(){	
	   
	   return [
	      {
	         xtype:'panel',
	         layout:'border',
	         border:false,
	         region:'center',
	         split:true,
	         margins:'3 3 0 3',
	         items:[
	            waybillproperty,
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
	                        {
	                           title:'Показания приборов',
	                           xtype:'view.waybill.waybillcounter',
	                           cls:'counter',
	                           flex:1,
	                           margins:'0 3 0 0'
	                        },
	                        {
	                           title:'Водители',
	                           xtype:'view.car.waybilldriver',	                           
	                           cls:'driver',
	                           flex:1
	                        }
	                     ]
	                  },
	                  {  
	                     xtype:'view.waybill.waybilltab',
	                     deferredRender:false,
	                     cls:'fueltab',
	                     margins: '3 0 0 0',
	                     flex:3,
	                     activeTab:0,
	                     defaults:{
	                        mainView:this
	                     },
	                     items:[
	                        {title:'Движение ГСМ',xtype:'view.waybill.waybillfuelremain',cls:'fuelmoving'},
	                        {title:'Заправка',xtype:'view.waybill.waybillrefuelling',cls:'refuelling'}
	                     ]
	                  }
	               ]
	            }
	         ]
	      },
	      {
	         title:'Задания',
	         xtype:'view.waybill.waybilltask',
	         mainView:this,
	         cls:'task',
	         region:'south',
	         height:300,
	         split:true,
	         margins:'0 3 3 3'
	      }
	   ]
	   
	},
	
	
	initComponent:function(){
	
	   this.addEvents('beforesave','aftersave');	      
	
	   this.on({
	      scope:this,
	      beforesave: this.onBeforeSave,
	      aftersave : this.onAfterSave
	   });
	
	   T.view.WaybillEditor.superclass.initComponent.call(this);
	},
	
	onBeforeSave:function(){
	   this.mask('Сохранение');
	},
	
	onAfterSave:function(){
	   this.unmask();
	},
	
	getTbar:function(){
	
	   this.ComboCar = Ext.create({
	            xtype:'combo.car',
	            width:300,
	            listeners:{
	               scope:this,
	               select:this.onCarSelect
	            }
      });
	
	   return [
	         '-',
				{
                text: 'Обновить',
                iconCls: 'icon-refresh',
                cls:'refreshbutton',
                scope: this,
                handler:function(){
                  this.loadVehicle({
                     VehicleId:this.vehicleId
                  });
                }
            },
            '-',
	         {xtype:'tbspacer',width:10},
	         this.ComboCar,
	         {xtype:'tbspacer',width:10},
	         '-',
	         {xtype:'button.save'},
	         '-',
	         {
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
	         },
	         '-',
	         {
	            text: 'Удалить путёвку',
	            iconCls: 'icon-page_delete',
	            cls: 'deletebutton',
	            scope: this,
	            handler:this.deleteWaybill
	         },
	         '-',
	         {
	            text: 'Печать',
	            iconCls: 'icon-printer',
	            cls: 'printbutton',
	            scope: this,
	            handler:function(){
	            
	               var id = this.waybillproperty.getSource()['WaybillTypeId']
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
	         }
	         
	      ]
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
	
   onPropertyChange: function(source, prop, newVal, oldVal) {             
      if (this.mode == 'create' && (prop == 'DepartureDate' || prop == 'DepartureTime')) {
            var date = Kdn.parseDate(
                prop == 'DepartureDate' ? newVal : source.DepartureDate,
                prop == 'DepartureTime' ? newVal : source.DepartureTime
          );
            this.monitorRemains(date);
        }
   },
	
	commitChanges:	function(){
     T.view.WaybillEditor.superclass.commitChanges.call(this);    
     this.setMode('update'); 
	},
	
	
	setTabTitle: function() {
	
	     var WaybillId = this.waybillId;
	      
	     var title = String.format(
	      'ПЛ №{0}',
	      (!!WaybillId) ? WaybillId : '-----'),
	         iconCls = 'icon-page_white_' + (this.mode == 'update' ? 'edit' : 'add');
     
	
        Kdn.Application.viewTab.getActiveTab().setTitle(title,iconCls);
    },
    
    
    eachEditors:function(fn){
      Ext.iterate([
         'waybillproperty',
         'counter',
         'driver',
         'refuelling',
         'fuelmoving',
         'task'
      ],fn,this);
    },
    
    onAfterRender:function(){
    
    this.body.mask();
    
    var me = this,
          el = me.getEl(),
          findEditor = function(cls){
	         me[cls] = Kdn.getByCls(cls,el);
	       },
          records = me.records || [];
      
      el.addClass('waybillEditor');
      
      record = records.shift();	
         
	   Ext.iterate([
	      'waybillproperty',
	      'counter',
	      'driver',
	      'refuelling',
	      'fuelmoving',
	      'fueltab',
	      'task',
	      'newbutton',
	      'deletebutton',
	      'printbutton',
	      'refreshbutton',
	      'PrevWbBtn',
	      'CurrentWbBtn',
	      'NextWbBtn',
	      'OpenWbBtn',
	      'CloseWbBtn'
	   ],findEditor);
      this.findSaveButton();
      
      this.waybillproperty.on({
         scope:this,
         beforepropertychange:this.onWaybillPropertyChange
      });
    
       //Определяем режим формы добавление или редактирование
       var mode = me.mode;
       me.mode = null;       
       
       if(record){
         me.waybillId = record.data.WaybillId;
         me.vehicleId = record.data.Car.VehicleId;
       }
       if(me.waybillId){
         mode="update";
       }
       
       this.setMode(mode||'create');
       
       if(me.waybillId || me.vehicleId){
          me.loadVehicle({
            WaybillId:me.waybillId,
            VehicleId:me.vehicleId
          });
       }
       
       this.ComboCar.focus.defer(300,this.ComboCar,[true]);
      
        
    },
    
    
    onWaybillPropertyChange:function(source, prop, newVal, oldVal){
      if (this.mode == 'create' && (prop == 'DepartureDate' || prop == 'DepartureTime')) {
         var info = this.insertInfo,
             date = Kdn.parseDate(
            prop == 'DepartureDate' ? newVal : source.DepartureDate,
            prop == 'DepartureTime' ? newVal : source.DepartureTime
         );
         if (info.LastClose && date < info.LastClose.DepartureDate) {
                return false;
         }
         this.monitorRemains(date);
      }
    },      
    
    setMode:function(mode){	   
	  if (this.mode==mode) return;	  	  
	  this.mode = mode;
	  var cf = this.mode=='create';	  	  
	  
	  if(cf){
	   this.getEl().addClass('createWaybill');
	  }
	  else{
	   this.getEl().removeClass('createWaybill');
	  }
	  
	  this.disableNavigation(cf);	  	  
	  this.fueltab.items.get(1).setDisabled(cf);
	  
	  this.printbutton.setDisabled(cf);
	  this.newbutton.setDisabled(cf);
	  this.deletebutton.setDisabled(cf);
	  this.SaveButton.setDisabled(cf);
	  this.refreshbutton.setDisabled(cf);
	  
	  
	  
	  this.setTabTitle(); 	    
	},
	
	
	loadVehicle:function(cfg){
	   Kdn.Direct.LoadVehicle(cfg,this.onVehicleLoad.createDelegate(this));
	},
	
	onVehicleLoad:function(e){
	   this.vehicle = e;	   
	   this.ComboCar.setValue(Ext.copyTo({},e,'VehicleId,Model,GarageNumber,InventoryNumber,RegistrationNumber'));
	   this.applyVehicleSettings();	  
	   
	   this.SaveButton.setDisabled(false);
	   this.refreshbutton.setDisabled(false);
	    
	   
	   this.body.unmask();
	   
	   if(this.mode=='create'){
	      this.loadInsertInfo();
	   }
	   else{
	      this.loadWaybill()
	   } 
	   
	},	
	
	applyVehicleSettings:function(){
	  
	  var v = this.vehicle,
	      mc = Ext.util.MixedCollection;
	  if(v){
	      
	      //делаем маппинг норм и их изменений для более быстрой работы
	      norms = new mc();
	      consumption = new mc();
	      
	      
	      
	      Ext.iterate(v.Norms||[],function(n){
	         norms.add(n['NormId'],n);
	         
	         Ext.iterate(n.NormConsumption||[],function(c){
	            consumption.add(c['RecId'],c);      
	         });	         	         
	      
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
         
         var taskIncreaseStore = this.task.IncreasesEditor.store,
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
	     
	},
	
	
	loadInsertInfo:function(){
	   this.mask('Загрузка');
	   Kdn.Direct.LoadInsertInfo({
	      VehicleId:this.vehicleId
	   },this.onInsertInfoLoad.createDelegate(this));
	},
	onInsertInfoLoad:function(e){
	   this.unmask();
	   this.insertInfo = e;
	   this.fillForCreate();
	},
	
	fillForCreate:function(){
	
	   var $ = this,
	       curDate = new Date().clearTime(),
          v = $.vehicle,
          WP = $.waybillproperty,          
          data = {
                DepartureDate: curDate,
                ReturnDate: curDate,
                DepartureTime: v['StartWork'] || '08:00',
                ReturnTime: v['EndWork'] || '16:45',
                WaybillTypeId: v['WaybillTypeId'] || '',
                DayCount: 1,
                TrailerId: v['TrailerId'],
                ScheduleId: v['ScheduleId']||1,
                Shift:1,
                WaybillTypeId: v['WaybillTypeId']||1
          };          
        
        $.clearEditors();
        $.getEl().removeClass('closedWaybill');
        
        WP.resetSource();
        WP.setSource(
	        Ext.apply(WP.getSource(), data)
	    );
	    
       
       this.setVehicleDrivers();
	    var date = Kdn.parseDate(data.DepartureDate, data.DepartureTime);
       this.monitorRemains(date);
	    
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
	
	//функция работает в режиме выдачи путёвки, проверяя по дате нужно ли переносить остатки,
	// а так же формирует список остатков по предыдущей путёвке
	monitorRemains:function(date){
	   
	   var $ = this,
	       lastClose = $.insertInfo.LastClose,
	       firstOpen = $.insertInfo.FirstOpen,
	       fuelMovingStore = $.fuelmoving.store,
	       counterStore = $.counter.store,
	       emptyRemain = false;

        fuelMovingStore.removeAll();
        counterStore.removeAll();

        //если есть последняя закрытая, то занимаемся остатками и показаниями приборов
        if (lastClose) {
            //если есть первая открытая и дата текущей больше чем у открытой то остатки не переносятся нет
            emptyRemain = firstOpen && date >= firstOpen.DepartureDate;
            
            Ext.iterate(lastClose.WaybillFuelRemain, function(r) {
                    var rec = new fuelMovingStore.recordType({
                        FuelId: r.FuelId,
                        DepartureRemain:emptyRemain?null:r.ReturnRemain
                    });
                    fuelMovingStore.add(rec);
            });

            Ext.iterate(lastClose.WaybillCounter, function(r) {
                    var rec = new counterStore.recordType({
                        CounterId: r.CounterId,
                        Departure: emptyRemain? null:r.Return,
                        isBroken: emptyRemain? false:r.isBroken
                    });
                    counterStore.add(rec);
            });
                       
        }
         
        //Проверка если нет закрытых путёвок, но есть окрытые  и дата текущей больше первой открытой, то остаток не переносим
        emptyRemain = !lastClose && firstOpen && date>=firstOpen.DepartureDate;
        var initValue = emptyRemain?null:0;
        
        this.setVehicleRemains(initValue);
        this.setVehicleCounters(initValue);
	   
	},
	
	//функция контролирует список остатков по доступным транспорту видам топлива
	//т.е если в предыдущей путёвке не было остатка по новому виду топлива
	setVehicleRemains:function(value){
	   var $ = this,
	       v = $.vehicle,
	       store = $.fuelmoving.store;
	       
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
	       store = $.counter.store;
	       
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
	   
	   $.driver.onStoreWrite();
	   
	   if (!$.isDispClosed()){
	      this.getEl().removeClass('closedWaybill')
	      $.setVehicleRemains();
	      $.setVehicleCounters();
	      $.task.calculateNormConsumptionAll();
	      $.refreshCounters();
	   }
	   else{
	      this.getEl().addClass('closedWaybill');
	   }	   
	   
	  $.refreshRefuelling();
	  $.refreshNormConsumption();
	  $.refreshFact();	  
	  $.refreshDiff();
	  
	},
	
	
	disableNavigation:function(disable){
      var me = this;
      Ext.iterate(['PrevWbBtn','CurrentWbBtn','NextWbBtn'],function(e){
	      me[e].setDisabled((disable==true));
	   });
	},
	
	setNavigation:function(){
	   this.PrevWbBtn.setDisabled(this.isFirst());
	   this.CurrentWbBtn.setDisabled(this.isCurrent());
	   this.NextWbBtn.setDisabled(this.isLast());
	   
	   this.OpenWbBtn.setVisible(this.waybill.WaybillState==2);
	   this.CloseWbBtn.setVisible(this.isCurrent() && this.waybill.WaybillState==1 );
	   
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
                data[key] = data[key] ? (data[key] + q) : q;
            }
        });

        var store = this.fuelmoving.store;

        store.each(function(r) {
            r.beginEdit();
            r.set('Refuelling', 0);
            r.endEdit();
        });

        Ext.iterate(data, function(key, val, obj) {
            var r = store.getById(key);
            if (r) {
                r.beginEdit();
                r.set('Refuelling', val);
                r.endEdit();
            }
        });
    },
    
    refreshDiff: function() {
        this.fuelmoving.store.each(this.refreshDiffRecord, this);
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
        this.fuelmoving.store.each(this.refreshFactRecord, this);
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
        
        var task = this.task,
            fuelmoving = this.fuelmoving,
            data = {};


        task.store.each(function(r) {
            var id = r.get('FuelId');
            data[id] = parseFloat(((data[id] || 0) + (r.get('Consumption') || 0)).toFixed(2));
        });

        fuelmoving.store.each(function(r) {
            r.beginEdit();
            r.set('NormConsumption', data[r.get('FuelId')] || 0);
            r.endEdit();
        });

    },
    
    refreshCounters: function() {
        var $ = this,
            data = {};


        $.task.store.each(function(r) {
            var consumptionId = r.get('NormConsumptionId');
            if(consumptionId){
                var info = $.task.getConsumptionInfo(consumptionId);
                if(info){
                  var id = info.norm['CounterId'];
                  data[id] = (data[id] || 0) + (r.get('WorkAmount')||0);
                } 
            }
        });


        $.counter.store.each(function(r) {
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
      Ext.copyTo(obj,source,'TrailerId,Way,WaybillId,Position,WaybillState,WaybillPackageId,WaybillTypeId');
      
      obj.DepartureDate = Kdn.parseDate(source.DepartureDate,source.DepartureTime);
      obj.ReturnDate = Kdn.parseDate(source.ReturnDate,source.ReturnTime);
      
      obj.Car = Ext.copyTo({},$.vehicle,'VehicleId');

         
      var responsibleIdx = $.driver.store.find('isResponsible',true);
      if(responsibleIdx==-1 && $.driver.store.getCount()>0){
         responsibleIdx = 0
      }
      
      if(responsibleIdx!=-1){
         obj.ResponsibleDriver =  Kdn.clone($.driver.store.getAt(responsibleIdx).data.Driver);
      }

      Ext.apply(obj,{
         WaybillId: obj.WaybillId||0,
         Position: obj.Position||0
      });
            
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
      
      $.setMode('update');
      $.setNavigation();
      
      var dirtyStores = [];           
      
      Ext.iterate('counter,driver,refuelling,fuelmoving,task'.split(','),function(e){
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
           
      var taskStore = this.task.store,
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
      
      this.on({
         scope:this,
         single:true,
         aftersave:this.closeWaybill
      });
      
      this.onSave();
      
    },
    
    closeWaybill:function(){    
      Kdn.Direct.CloseWaybill({WaybillId:this.waybillId},this.afterClose.createDelegate(this));    
    },
    
    afterClose:function(e){
            
      this.waybill = e;
      this.waybillproperty.setData(e);
      this.getEl().addClass('closedWaybill');
      this.setNavigation();
    },
    
    open:function(){
      Kdn.Direct.OpenWaybill({WaybillId:this.waybillId},this.afterOpen.createDelegate(this));
    },
    
    afterOpen:function(e){
      this.waybill = e;
      this.waybillproperty.setData(e);
      this.getEl().removeClass('closedWaybill');
      this.setNavigation();
    },
    
    deleteWaybill:function(){
      Kdn.Direct.DeleteWaybill({WaybillId:this.waybillId},this.afterDelete.createDelegate(this));
    },
    
    afterDelete:function(){
      this.waybill=null;
      this.waybillId = null;
      this.loadWaybill();      
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
          
      
    }
    
	
});

Ext.reg('view.waybilleditor', T.view.WaybillEditor);