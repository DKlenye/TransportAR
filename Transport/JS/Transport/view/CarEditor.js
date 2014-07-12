
T.view.CarEditor = Ext.extend(Kdn.editor.ModelEditor, {

   mode:null,// create update
   
   closeAfterSave:false,

   getItems:function(){	
        
	   var propCfg = this.grid.getEditorCfg();
	   
	   var buildPropEditor = function(propArray,cfg){
	      var obj = {}, tmpCfg={}; cfg=cfg||{}; propArray = propArray ||[];
	      
	      Ext.iterate(propCfg,function(propName){
	            obj[propName]={};
	            Ext.iterate(propArray,function(arrayItem){
	                  obj[propName][arrayItem]=propCfg[propName][arrayItem];
	            });	            
	      });    	      
	      
	      Ext.apply(obj,{
	         xtype:'kdn.grid.propertyeditor'
	      });
	      
	      Ext.apply(obj,cfg);
	    		    	      	      
	      return obj;
	   };   
	   
	   
	   return [
	      {
	         xtype:'panel',
	         layout:'border',
	         border:false,
	         region:'center',
	         split:true,
	         margins:'3 3 0 3',
	         items:[	         
	            buildPropEditor(
	               [
	                  'VehicleId',	                  
	                  'GarageNumber',
	                  'Model',
	                  'FullModel',
	                  'FondModel',
	                  'RegistrationNumber',
	                  'InventoryNumber',
	                  'MakeYear',
	                  'ServiceDocNumber',
	                  'RegSertificate',
	                  'RegEnd',
	                  'DepartmentId',
	                  'Disposal',
	                  'ColumnId',
	                  'ResponsibleDriver',
	                  'PolymirSHU',
	                  'WriteOffDate'     
	               ],
	               {region:'center',split:true,margins:'0'}
	            ),
	            {
	               xtype:'panel',
	               cls:'kdn-accordion',
	               activeOnTop:'true',
	               layout:'accordion',
	               region:'east',
	               width:'50%',
	               split:true,
	               defaults:{ 
	                  border:false 
	               },
	               items:[
	                  buildPropEditor(['Customer', 'WaybillTypeId', 'TrailerId', 'PackageTypeId', 'ScheduleId', 'StartWork', 'EndWork'],
	                     {iconCls:'icon-roadworks',title:'Закрепление, настройки работы'}
	                  ),
	                  buildPropEditor(['BodyNumber','EngineModel','EngineNumber','ChassisNumber','CabinNumber','Color','EnginePower','EngineVolume','EngineTypeId','EcologyClassId','ModelHeater'],
	                     {iconCls:'icon-gear_in',title:'Кузов, Двигатель'}
	                  ),	
	                  buildPropEditor(['FuelVolume','CoolantVolume','EngineOilVolume','HydraulicOilVolume'],
	                     {iconCls:'icon-beaker-empty',title:'Заправочные объёмы'}
	                  ),	
	                  buildPropEditor(['Length','Width','Height','FullMass','SelfMass','CapacityTonns','CapacityPassengers'],
	                     {iconCls:'icon-ruler',title:'Габариты, грузоподъёмность'}
	                  ),
	                  buildPropEditor(['CostCode'],
	                     {iconCls:'icon-coins',title:'Бухг. настройки'}
	                  ),
	                  buildPropEditor(['RefuellingGroupId', 'AccGroupId','BodyTypeId','Category', 'ServiceGroupId', 'GroupRequestId','ReportGroupId'],
	                     { iconCls: 'icon-category-group', title: 'Тип/Категория/Группировка' }
	                  )   
	               ]	               
	            }
	         ]
	      },
	      {
	         xtype:'tabpanel',
	         cls:'editortab',
	         enableTabScroll : true,			  
	         activeTab:0,
	         region:'south',
	         height:300,
	         split:true,
	         collapsible:true,
	         collapseMode:'mini',
	         hideCollapseTool:true,
	         margins:'0 3 3 3',
	         defaults:{
	            'CarEditor':this
	         },
	         items:[
	           // {title:'Нормы расхода масел'},
	            {iconCls:'icon-driver',title:'Водители',xtype:'view.car.vehicledriver'},
	           // {title:'Шины'},
	           // {title:'АКБ'},
	            {iconCls: 'icon-cog_error', title: 'Лимиты на расход топлива', xtype: 'panel', xtype: 'view.car.fuellimits' },
	            {iconCls: 'icon-lorry_error', title: 'Лимиты на пробег', xtype: 'panel', xtype: 'view.car.kmlimits' },
	            {iconCls:'icon-insurance',title:'Страховка',xtype:'view.car.insurance'},
	            {iconCls:'icon-co2',title:'Проверка СО',xtype:'view.car.checkco'},
	            {iconCls:'icon-norm',title:'Нормы расхода топлива',xtype:'view.car.norm'},
	            {iconCls:'icon-TO',title:'Техосмотр',xtype:'panel',xtype:'view.car.inspection'} 
	         ]
	      }
	   ]
	   
	},
	
	onAfterRender:function(){	
	   T.view.CarEditor.superclass.onAfterRender.call(this);
	   
	   var me = this;    	   
	   me.tab = Ext.getCmp(this.getEl().query('.editortab')[0].id);
	           
      this.setMode((!me.record)?(this.mode||'create'):'update');
      if(me.record){                    
             this.onCarSelect(me.record);
      }
      
      me.tab.on({
         scope:this,
         tabchange:this.onTabChange
      });
         	   
	},
	
	onTabChange:function(panel,tab){
	  
	  if (!tab.loaded && tab.store && tab.recordId!=this.record.id){
	      var car = Ext.copyTo({},this.record.data,"VehicleId,GarageNumber");	      
	      tab.recordId=this.record.id;   
	      tab.store.fields.get('Car').defaultValue=car;
	      tab.store.reload({
            params:{
               filter:{
                  Car:car
               }
            }
         });
	  }
	   
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
	         {xtype:'tbspacer',width:10},
	         this.ComboCar,
	         {xtype:'tbspacer',width:10},
	         '-',
	         {xtype:'button.save'},
	         '-'
	      ]
	},
   
   onCarSelect:function(rec){
   	
	   Kdn.Direct.Read({
	      "typeName":"Transport.Models.FullCar",
	      id:rec.id
	   },
	      this.onCarLoad.createDelegate(this)
	   );
	     
	},
	
   onCarLoad:function(e){
      var rec =  new this.grid.store.recordType(e.data.shift());
      
      this.record = rec;
	   this.setMode('update');
	   this.fillEditor();
	   this.setTitleCar(); 
	   
	   var z = this.tab.getActiveTab();
	   this.onTabChange(this.tab,z);
      
   },
	
	setMode:function(mode){
	   
	  if (this.mode==mode) return;
	  
	  this.mode = mode;
	  
	  if (this.mode=='create'){
	      this.ComboCar.setDisabled(true);
	      this.tab.collapse();
	      this.tab.setDisabled(true);
	  }
	  else{
	    this.ComboCar.setDisabled(false);
	    this.tab.expand(true);
	    this.tab.setDisabled(false);
	    this.ComboCar.setValue(this.record);
	  }
	  this.setTitleCar(); 
	    
	},
	
	setTitleCar:function(){
	    if(this.mode=='create'){
	      this.setTitle('Гар.№ ---','icon-car_add');
	    }
	    else{
	      this.setTitle(String.format('Гар.№ {0}',(!this.record?'---':this.record.data.GarageNumber)),'icon-car');
	    }
	    
	},
	
	commitChanges:	function(){
      T.view.CarEditor.superclass.commitChanges.call(this);

      this.tab.items.each(function(e) {
      
         if (e.save) {
             e.save();
         }
      
         if (e.store){
            e.store.save();
         }
      });  
      
     this.setMode('update');
      
	}
	
});

Ext.reg('view.careditor', T.view.CarEditor);