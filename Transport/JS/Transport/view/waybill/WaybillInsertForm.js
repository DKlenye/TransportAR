T.view.waybill.WaybillInsertForm = Ext.extend(Ext.Panel,{
   layout:'form',
  // margins:'3',
   autoScroll:true,
   frame:true,
   cls:'insertForm',
   initComponent:function(){      
      
      var em = this.EventMap = new Ext.util.MixedCollection();
      var eo = Ext.EventObject;
      em.add(eo.ENTER,'ENTER')
      em.add(eo.DOWN,'DOWN')
      em.add(eo.UP,'UP')
      em.add(eo.ESC,'ESC'),
      em.add(eo.LEFT,'LEFT'),
      em.add(eo.RIGHT,'RIGHT')
      
      var Drivers = Ext.create({
         title:'Водители',
         xtype:'view.waybill.waybillinsertdriver',
         frame:true,
         height:200  
      });
      
      var IssueButton = Ext.create({
                  xtype:'view.waybill.issuebutton',
                  scale:'large',
                  text:'Выдать',
                  anchor:null,
                  iconCls:'icon-print32',
                  width:110,
                  handler:this.onIssueButtonClick,
                  scope:this
      });
      
      var Message = Ext.create({
               xtype:'container',
               height:40
            });
      
      Ext.apply(this,{
      
         Drivers:Drivers,
         IssueButton:IssueButton,
         Message:Message,
         
         defaults:{
            anchor:'-20'
         },
      
         labelWidth:150,
         items:[
            Message,
            {
               navMap:{
                  'DOWN':'DepartureDate'
               },
               dataIndex:'Car',
               fieldLabel:'Автомобиль',
               xtype:'combo.car',
               selectOnFocus:true
            },
            {               
               fieldLabel:'Выезд',
               xtype: 'compositefield',
               items:[
                  {
                     navMap:{
                       'UP':'Car',
                       'DOWN':'ReturnDate',
                       'ENTER':'FormNumber'
                     },
                     dataIndex:'DepartureDate',
                     xtype:'kdn.form.datefield',
                     flex:3
                  },
                  {
                     dataIndex:'DepartureTime',
                     xtype:'kdn.editor.timefield',
                     flex:2
                  }
               ]
            },
            {
               fieldLabel:'Возвращение',
               xtype: 'compositefield',
               items:[
                  {
                     navMap:{
                        'UP':'DepartureDate',
                        'DOWN':'Shift',
                        'ENTER':'IssueButton'
                     },
                     dataIndex:'ReturnDate',
                     xtype:'kdn.form.datefield',
                     flex:3
                  },
                  {
                     dataIndex:'ReturnTime',
                     xtype:'kdn.editor.timefield',
                     flex:2
                  }
               ]
            },
            {
                     navMap:{
                        'UP':'ReturnDate',
                        'DOWN':'DayCount',
                        'ENTER':'FormNumber'
                     },
                     dataIndex:'Shift',
                     fieldLabel:'Смена',
                     xtype:'kdn.editor.numberfield',
                     baseChars : "12",
                     anchor:null,
                     width:30          
            },         
            
            
            {
               navMap:{
                  'UP':'Shift',
                  'ENTER':'FormNumber',
                  'DOWN':'ScheduleId'  
               },
               dataIndex:'DayCount',
               fieldLabel:'Кол-во дней',
               xtype: 'kdn.editor.numberfield',
               anchor:null,
               width:30
            },
            {
               navMap:{
                  'UP':'DayCount',
                  'ENTER':'IssueButton', 
                  'DOWN':'WaybillTypeId'             
               },
               dataIndex:'ScheduleId',
               fieldLabel:'График',
               xtype:'combo.schedule',
               editable:true,
               objectValue:false             
            },            
            {
               navMap:{
                  'UP':'ScheduleId',
                  'ENTER':'IssueButton',
                  'DOWN':'FormNumber'                
               },
               dataIndex:'WaybillTypeId',
               fieldLabel:'Форма бланка',
               xtype:'combo.waybilltype',
               selectOnFocus:true,
               editable:true,
               objectValue:false             
            },
            {              
               fieldLabel:'Бланк (Серия,№)',
               xtype: 'compositefield',
               items:[
                  {
                     navMap:{
                        'UP':'WaybillTypeId',
                        'ENTER':'IssueButton',
                        'DOWN':'Customer',
                        'RIGHT':'FormNumber'                  
                     },
                     dataIndex:'FormSerial',
                     xtype:'kdn.editor.textfield',
                     allowBlank:true,
                     width:30
                  },
                  {
                     navMap:{
                        'UP':'WaybillTypeId',
                        'ENTER':'IssueButton',
                        'DOWN':'Customer',
                        'LEFT':'FormSerial'                  
                     },
                     dataIndex:'FormNumber',
                     xtype:'kdn.editor.numberfield',
                     allowBlank:true,
                     selectOnFocus:true,
                     flex:1
                  }
               ]
            },
            {
               navMap:{
                  'UP':'FormNumber',
                  'ENTER':'IssueButton',
                  'DOWN':'TrailerId'                  
               },
               dataIndex:'Customer',
               fieldLabel:'Заказчик',
               enableClear:true,
               xtype:'combo.customer'                              
            },
            {
               navMap:{
                  'UP':'Customer', 
                  'DOWN':'Way'                  
               },
               dataIndex:'TrailerId',
               fieldLabel:'Прицеп',
               xtype:'combo.trailer',
               enableClear:true,
               objectValue:false            
            },
            {
               navMap:{
                  'ENTER':'IssueButton',
                  'DOWN':'SrcRoutePoint',
                  'UP':'TrailerId'
               },
               dataIndex:'Way',
               fieldLabel:'Маршрут',
               xtype:'kdn.editor.textfield',
               allowBlank:true          
            },
            {
               navMap:{
                  'ENTER':'DstRoutePoint',
                  'DOWN':'DstRoutePoint',
                  'UP':'Way'   
               },
               dataIndex:'SrcRoutePoint',
               fieldLabel:'Пункт отправления',
               editable:true, 
               xtype:'combo.routepoint',
               objectValue:false,
               allowBlank:true          
            },
            {
               navMap:{
                  'ENTER':'CargoName',
                  'DOWN':'CargoName',
                  'UP':'SrcRoutePoint'
               },
               dataIndex:'DstRoutePoint',
               fieldLabel:'Пункт назначения',
               editable:true,
               xtype:'combo.routepoint',
               objectValue:false,
               allowBlank:true          
            },
            {
               navMap:{
                  'ENTER':'IssueButton',
                  'DOWN':'Drivers',
                  'UP':'DstRoutePoint'
               },
               dataIndex:'CargoName',
               fieldLabel:'Груз',
               xtype:'kdn.editor.textfield',
               allowBlank:true          
            },
            
            {
                xtype: 'compositefield',
                fieldLabel:'Остатки<br/>Показания приборов',
                items:[                  
                  {
                     dataIndex:'Remains',
                     xtype:'textarea',
                     readOnly:true,
                     flex:1
                  },
                  {
                     dataIndex:'Counters',
                     xtype:'textarea',
                     flex:1,
                     readOnly:true
                  }
                ]
            },
            
            Drivers,
            {
              xtype:'container',
              layout:'hbox',
              layoutConfig: {
                  padding:'5',
                  align:'top'
              },
              items:[
              {
               xtype:'spacer',
               flex:1
              }, 
              
              IssueButton  
              ] 
            }
              
         ]
         
      });
           
      T.view.waybill.WaybillInsertForm.superclass.initComponent.call(this); 
      
      var s = this.source = Kdn.mapItems(this,'dataIndex');
      
      this.mon(s.get('DepartureDate'),{
         scope:this,
         'select':this.departureDateChange,
         'change':this.departureDateChange
      });
      this.mon(s.get('ReturnDate'),{
         scope:this,
         'select':this.returnDateChange,
         'change':this.returnDateChange
      });
      this.mon(s.get('DayCount'),{
         scope:this,
         'change':this.departureDateChange
      });
      this.mon(s.get('Shift'),{
         scope:this,
         'change':this.shiftChange
      });
      this.mon(s.get('Car'),{
         scope:this,
         'select':this.onCarSelect
      });
      this.mon(Drivers.getSelectionModel(),{
         scope:this,
         'nolast':this.onDriversNoLast,
         'nofirst':this.onDriversNoFirst
      });
      
      this.mon(Drivers,{
         'driversselect':this.onDriversSelect,
         scope:this
      });
      
            
      this.on({
         scope:this,
         single:true,
         afterrender:this.onAfterRender
      });
      
      this.CheckExistsTask = new Ext.util.DelayedTask(this.checkExistsTaskFn, this);
      
   },
   
   checkExistsTaskFn:function(){
   
      Kdn.Direct.CheckWaybillExists({
         Date:this._get('DepartureDate'),
         VehicleId:this.vehicle.VehicleId
      },this.onCheckExists.createDelegate(this));
         
   },
   
   onCheckExists:function(e){   
      this.SetMessage(!!e?'На текущую дату путевой лист уже выдавался!':'');
   },
   
   SetMessage:function(message){   
     var el = this.Message.getEl();
 
     if(el){
     
     if(message!=''){
      el.addClass('insertForm-message');
     }     
     else{
      el.removeClass('insertForm-message');
     }
     
      el.update(message);
     }
   },
   
   
   getSource:function(){

     var o = {};
     this.source.each(function(item,i){
       o[this.source.keys[i]]=item.getValue();
     },this);
     return o;
   },
   
   getData:function(){
          
     var Car = this._get('Car');
     
     if(!Car){
       this.source.get('Car').focus.defer(20,this.source.get('Car'));
       return;
     }     
           
     var typeId = this._get('WaybillTypeId');
   
     if(!typeId){
       this.source.get('WaybillTypeId').focus.defer(20,this.source.get('WaybillTypeId'));
       return;
     }
   
      var source = this.getSource();      
      var data = {};
      
      Ext.copyTo(data,source,'SrcRoutePoint,DstRoutePoint,Car,Customer,CargoName,FormSerial,FormNumber,WaybillTypeId,Shift,ScheduleId,TrailerId,Way')
      data.DepartureDate=this.getDepartureDate();
      data.ReturnDate=this.getReturnDate();
      
      var Drivers = [];
      this.Drivers.store.each(function(e){
         var d = e.get('Driver');
         if(d!=null) Drivers.push(d);   
      });
      data.Drivers = Drivers;
      
      if(data.Customer==""){
         delete data.Customer;
      }
      if(data.SrcRoutePoint==""){
         delete data.SrcRoutePoint;
      }
      if(data.DstRoutePoint==""){
         delete data.DstRoutePoint;
      }
           
      this.getEl().mask("Выдача путевого листа",'x-mask-loading');
      Kdn.Direct.InsertWaybill(data,this.onWaybillInsert.createDelegate(this));
                           
   },
   
   onWaybillInsert:function(waybill){
     this.getEl().unmask();
     
     var $ = this;
     var printFn = function(){
         $.print(waybill);
     };
     var editFn = function(){
      Kdn.Application.createView({
         xtype:'view.waybilleditor',
         mode:'update',
         withContainer:false,
         waybillId:waybill['WaybillId']
      });
     }
          
     if (this.notify){this.notify.close();}
     this.notify = Ext.Msg.notify({
      waybill:waybill,
      html:String.format('Выдан бланк путевого листа № <b><span style="color:green">{0}</span></b><br/> на дату <b>{1} <span style="color:blue">{2}</span></b><br/> Гаражный № <b>{3}</b> ',waybill.WaybillId,waybill.DepartureDate.format('d.m.Y'),waybill.DepartureDate.format('H:i'),waybill.Car.GarageNumber),
      autoHide:false,
      cls:'CFnotify',
      width:300,
      height:150,
      renderTo:this.mainView.getEl(),
      constrain:true,
      title:new Date().format("H:i"),
      bbar:[
         '-',
         {
            text:'Печать',
            iconCls:'icon-printer',
            handler:printFn
         },'-','->',
         '-',
         {
            text:'Обработать',
            iconCls:'icon-page_white_edit',
            handler:editFn
         },'-'
      ]
    });
     
     if(waybill){  
          
         var formNumber = this._get('FormNumber');
         var num=0;
         try{
            num = parseInt(formNumber);
         }
         catch(ex){
         }
                                                
         this.reset();
         
         if(num){
            this._set('FormNumber',((++num)+''));
         }
         
         this.print(waybill);
     }  
   },   
   
   print:function(waybill){
   
      var id = waybill['WaybillTypeId']
	   if (!id){
	      Ext.Msg.alert('','Не выбран бланк путевого листа');
	   return;
	   };
      
      var url = Kdn.ModelFactory.getStore('WaybillType').getById(id).get('UrlTemplate');
      var URL = Ext.urlAppend("print/"+url+".aspx",Ext.urlEncode({WaybillId:waybill.WaybillId}));
	              
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

               setTimeout(function() { win.print(); }, 100);
               setTimeout(function() { CheckWindowState(); }, 100);
         },
         failure: function(e) {
            Ext.Msg.show({ width: 800, title: 'Ошибка', buttons: Ext.Msg.OK, msg: e.responseText })
         }
      });
      
   },
   
   _get:function(name){
     return this.source.get(name).getValue(); 
   },
   _set:function(name,val){
     return this.source.get(name).setValue(val); 
   },
   
   onAfterRender:function(){
  
     this.IssueButton.on({
      scope:this,
      afterrender:function(){
          this.mon(this.IssueButton.fi,{
            scope:this,
            up:this.onIssueUp
         });
         
         
         var downFn = function(e){
                if(!this.isExpanded()){
                    return false;
                }else{
                    this.inKeyMode = true;
                    this.selectNext();
                }
            };
            
         this.source.get('ScheduleId').keyNav.down=downFn
         this.source.get('WaybillTypeId').keyNav.down=downFn
         this.source.get('DstRoutePoint').keyNav.down=downFn
         this.source.get('SrcRoutePoint').keyNav.down=downFn
         
      },
      single:true
     });
     
     this.source.each(function(field){
      this.mon(field,{
         scope:this,
         specialkey:this.onFieldKey
      });
     },this);
     
         
      this.reset();            
   },
   
   reset:function(){
      var $ = this;
            
      var date = $._get('DepartureDate')||new Date().clearTime();
      $.source.each(function(i){
         i.reset();
      });
      
      $._set('DepartureDate',date);
      $._set('ReturnDate',date);
      $._set('DayCount',1);
      $._set('Shift',1);
      
      this.Drivers.store.removeAll();
      
      $.source.get('Car').focus.defer(50,$.source.get('Car'),[true]);
      $.SetMessage('');
                
   },
   
   departureDateChange:function(){  
      var $ = this;
      var dep = $._get('DepartureDate');
      if (dep)
      $._set('ReturnDate',dep.add(Date.DAY,$._get('DayCount')-1));
      
      this.monitorRemains(this.getDepartureDate());  
      this.CheckExistsTask.delay(100);    
   },
   
   returnDateChange:function(){
     var $ = this;
     var count = Kdn.fixDecimal(($._get('ReturnDate')- $._get('DepartureDate')) / (1000 * 60 * 60 * 24),0);
     count++;
     if (count>31) count=31
     $._set('DayCount',count);
   },
   
   shiftChange:function(){
      var $ = this,
          v = $.vehicle;
      
      if(!v) return;
      
            
      var start = v['StartWork']||'08:00',
          end = v['EndWork']||'16:45',
          f = "H:i",
          startDate = Date.parseDate(start,f),
          endDate = Date.parseDate(end,f);
      
      
      if(this._get('Shift')==1){
         $._set('DepartureTime',start);
         $._set('ReturnTime',end);
         $._set('ReturnDate', $._get('DepartureDate'));
         $.returnDateChange();
         return;
      }
      
      
          
      var diffMinutes =  (
         endDate.getHours()*60+endDate.getMinutes()
         )-(
         startDate.getHours()*60+startDate.getMinutes()
         )
      
      
      $._set('DepartureTime',end);      
      var departureDate = $.getDepartureDate();
      var returnDate = departureDate.add(Date.MINUTE,diffMinutes);
      
      $._set('ReturnTime',returnDate.format('H:i'));
      $._set('ReturnDate',returnDate.clearTime());
      $.returnDateChange();
   },
   
   onCarSelect:function(rec){	
	   this.vehicleId = rec.data.VehicleId;
	   this.loadVehicle({
         VehicleId:this.vehicleId
      });
	},
   
   loadVehicle:function(cfg){
	   Kdn.Direct.LoadVehicleInsertInfo(cfg,this.onVehicleLoad.createDelegate(this));
	},
	
	onVehicleLoad:function(e){
	   this.vehicle = e;
	   this.fillForm();
	   	   
	   this.source.get('Car').el.removeClass('x-form-focus');
	   this.source.get('DepartureDate').focus();
	   this.loadInsertInfo();
	   this.CheckExistsTask.delay(10);  
	},
	
	fillForm:function(){
	   
	   var $ = this;
      var date = $._get('DepartureDate')||new Date().clearTime();
      var formNumber = $._get('FormNumber');
      
      $.source.each(function(i){
        if(i.dataIndex!='Car') i.reset();
      });
	   
	   this.source.eachKey(function(key,item){	   
	      if(this.vehicle[key]) item.setValue(this.vehicle[key]);
	   },this);
	   
	   
	   $._set('FormNumber',formNumber);
	   
	   $._set('DepartureDate',date);
      $._set('ReturnDate',date);
      $._set('DayCount',1);
	   this._set('DepartureTime',this.vehicle['StartWork']||'08:00');
	   this._set('ReturnTime',this.vehicle['EndWork']||'16:45');
	      
	   this.Drivers.store.loadData({data:this.vehicle.Drivers});
	   
	   this._set('ScheduleId',this._get('ScheduleId')||1);
	   	   
	},
	
	onIssueButtonClick:function(){
	  this.getData();
	},
	
	onDriversNoLast:function(sm){
	   this.IssueButton.focus();
	},
		
	onDriversNoFirst:function(sm){
	   this.source.get('CargoName').focus();
	},
	onDriversSelect:function(){
	   this.IssueButton.focus();
	},
	
	onIssueUp:function(){
	   this.Drivers.focusTask.delay(50);
	},
	
	onFieldKey:function(field,e){
	   var key = this.EventMap.get(e.getKey());
	   
	   if(e.getKey()==e.ESC) this.source.get('Car').focus.defer(50,this.source.get('Car'),[true]);
	   
	   if(key && field.navMap && field.navMap[key]){
	      var FocusField = field.navMap[key];
	      
	      if(field.triggerBlur) field.triggerBlur();
	      
	      if(FocusField=='IssueButton') {
	         this.IssueButton.focus.defer(50,this.IssueButton);
	      }
	      else if(FocusField=='Drivers') this.Drivers.focusTask.delay(50);
	      else{
	         this.source.get(FocusField).focus(true,20);
	      }
	   }   
	   
	},
	
	loadInsertInfo:function(){
	   Kdn.Direct.LoadInsertInfo({
	      VehicleId:this.vehicleId
	   },this.onInsertInfoLoad.createDelegate(this));
	},
	onInsertInfoLoad:function(e){
	   this.insertInfo = e;
	   this.monitorRemains(this.getDepartureDate());
	},
	
	getDepartureDate:function(){
	   var date = Kdn.parseDate(
                this._get('DepartureDate'),
                this._get('DepartureTime')
          );
      return date;
	},
	getReturnDate:function(){
	   var date = Kdn.parseDate(
                this._get('ReturnDate'),
                this._get('ReturnTime')
          );
      return date;
	},
	
		//функция работает в режиме выдачи путёвки, проверяя по дате нужно ли переносить остатки,
	// а так же формирует список остатков по предыдущей путёвке
	monitorRemains:function(date){
		   
	   var $ = this,
	       lastClose = $.insertInfo.LastClose,
	       firstOpen = $.insertInfo.FirstOpen,
	       emptyRemain = false;
          
          
          this.source.get('Remains').reset();
          this.source.get('Counters').reset();
                    
          var rem =[],cnt=[];          

        //если есть последняя закрытая, то занимаемся остатками и показаниями приборов
        if (lastClose) {
            //если есть первая открытая и дата текущей больше чем у открытой то остатки не переносятся нет
            emptyRemain = firstOpen && date >= firstOpen.DepartureDate;
            
            var FuelStore = Kdn.ModelFactory.getStore('Fuel');
            
            Ext.iterate(lastClose.WaybillFuelRemain, function(r) {
                    var fuelName = FuelStore.getById(r.FuelId).get('FuelName');                    
                    rem.push(String.format("{0}:{1}",fuelName,emptyRemain?'-':(r.ReturnRemain==null?'-':r.ReturnRemain)));
            });
            
            this._set('Remains',rem.join("\n"));
            
            var CounterStore = Kdn.ModelFactory.getStore('WorkCounter');
            Ext.iterate(lastClose.WaybillCounter, function(r) {               
                  var CounterName = CounterStore.getById(r.CounterId).get('CounterName');                    
                  cnt.push(String.format("{0}:{1}",CounterName,emptyRemain?'-':(r.Return==null?'-':r.Return)));
            });
            
            this._set('Counters',cnt.join("\n"));           
        }   	   
	}   

});

Ext.reg('view.waybill.waybillinsertform', T.view.waybill.WaybillInsertForm);