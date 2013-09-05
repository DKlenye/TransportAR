
T.view.waybill.WaybillTask = Ext.extend(Kdn.editor.LocalGrid, {

   startEditColumn:2,
   addPosition:'last',
   selectionModel:'Cell',
   constructor: function(cfg) {
   
    cfg = cfg || {};
   
   
       var FuelEditor = Ext.create({
            xtype:'combo.fuel',                     
            store: Kdn.ModelFactory.getModel('Fuel').buildStore({
               autoDestroy: true,
               autoLoad:false,
               autoSave:false
            }),
            objectValue:false,
            listeners:{
               afterrender:function(){
                  this.keyNav.down=function(){}
               },
               single:true,
               scope:FuelEditor
            }
        });
        
        
        var ConsumptionEditor = Ext.create({
            xtype:'kdn.form.combobox',
            displayField: 'display',
            valueField: 'id',
            objectValue:false,
            store:new Ext.data.JsonStore({
               autoDestroy: true,
               fields:['display','id']
            }),
            listeners:{
               afterrender:function(){
                  this.keyNav.down=function(){}
               },
               single:true,
               scope:ConsumptionEditor
            }
        });
        
        var DateEditor = Ext.create({
            xtype:'kdn.editor.datefield',
            listeners:{
               afterrender:function(){
                  this.keyNav.down=function(){}
               },
               single:true,
               scope:DateEditor
            }
        });
        
        
                        
        
        var IncreasesEditor = Ext.create({
            taskIncreaseStore:null,
            xtype:'netmulticombo',
            listWidth:300,
            valueField:'IncreaseId',
            displayField: 'IncreaseName',
            triggerAction: 'all',
            mode: 'local',
            store:Kdn.ModelFactory.getModel('Increase').buildStore({
               autoDestroy: true,
               autoLoad:false,
               autoSave:false
            }),
            
            onSelect: function (record, index) {
                        
                 if (this.fireEvent("beforeselect", this, record, index) !== false) {
                 
                     var taskIncreaseStore = this.taskIncreaseStore;
                                       
                     if (this.checkedRecords.indexOf(record) === -1) {
                         this.checkedRecords.push(record);
                         taskIncreaseStore.add(new taskIncreaseStore.recordType({
                           IncreaseId:record.get('IncreaseId'),
                           Prcn:record.get('Prcn')
                         }));
                                                  
                     } else {
                         this.checkedRecords.remove(record);
                         this.deselectRecord(record);
                         
                         var idx = taskIncreaseStore.find('IncreaseId',record.get('IncreaseId'));                         
                         taskIncreaseStore.removeAt(idx);
                         
                     }
                     if (this.store.isFiltered()) {
                         this.doQuery(this.allQuery);
                     }
                     this.setValue(this.getValue());
                     this.fireEvent("select", this, record, index);
                 }
             },

            getText: function () {
         
                  var txt = this.getValue(this.displayField);
                  var s = Ext.isArray(txt)?txt.join(','):txt; 
             
                  s = s.replace(new RegExp(RegExp.escape(this.delimiter), "g"), this.delimiter + " ");
                 if (this.wrapBySquareBrackets) {
                     s = "[" + s + "]";
                 }
                 return s;
             },
             getValue: function (field) {
                 var value = [];
                 Ext.each(this.checkedRecords, function (record) {
                     value.push(record.get(field || this.valueField));
                 }, this);
                 return this.valueType=='array'? value : (value.join(this.delimiter));
             },
             setValue: function (v) {
             
                 var taskIncreaseStore = this.taskIncreaseStore,
                     store = this.store;
                                  
                 var a=[];
                 taskIncreaseStore.each(function(rec){
                     var r = store.getById(rec.get('IncreaseId'));
                     if(r){
                        a.push(r.get('IncreaseId'));
                     }
                 });      
                      
                 Ext.net.MultiCombo.prototype.setValue.call(this,a);      
 
             }            
        });
   
      
      Ext.apply(cfg, {      
      
            //selModel: new Ext.grid.CellSelectionModel(),
            FuelEditor:FuelEditor,
            ConsumptionEditor:ConsumptionEditor,
            IncreasesEditor:IncreasesEditor,   
            DateEditor:DateEditor,
            enableHdMenu:false,
            enableColumnMove:false,
            colModel: new Ext.grid.ColumnModel({
               defaults:{
                  sortable:false                  
               },               
               columns: [
                    {
                        header: 'Код',
                        dataIndex: 'TaskId',
                        width: 30,
                        hidden: true
                    },
                    {
                        header: 'Код затрат',
                        dataIndex: 'CostCode',
                        hidden: true,
                        editor:{xtype:'kdn.editor.textfield',allowBlank:true}
                    },
                    {
                        header: 'Дата',
                        align: 'center',
                        width: 95,
                        xtype: 'datecolumn',
                        dataIndex: 'TaskDepartureDate',
                        editor: {field:DateEditor}
                    },
                    {
                        header: 'Заказчик',
                        width: 170,
                        dataIndex: 'Customer',
                        editor:{xtype:'combo.customer'},
                        renderer: function(o) {
                            if (!o && !Ext.isObject(o)) return null;
                            return o['CustomerName']
                        }
                    },                    
                    {
                        header: 'Норма расхода ГСМ',
                        width: 150,
                        dataIndex: 'NormConsumptionId',
                        renderer:{
                           fn:this.consumptionRenderer,
                           scope:this
                        },
                        editor:{field:ConsumptionEditor}
                    },
                    {
                        header: 'Топливо',
                        width: 70,
                        align:'center',
                        dataIndex: 'FuelId',
                        renderer:function(o,meta){
                        meta.css='work';
                        if(!o) return o;
                           var store = Kdn.ModelFactory.getStore('Fuel'),
                              rec = store.getById(o);
                           if(rec){
                              return rec.data.FuelName
                           }
                           return o;
                        },
                        editor:{field:FuelEditor}
                    },
                    {
                        header: 'ед.',
                        width: 50,
                        dataIndex: 'WorkAmount',
                        align:'center',
                        editor: { 
                            xtype:'kdn.editor.decimalfield',                            
                            decimalPrecision: 3,
                            allowNegative: false
                        },
                        renderer:function(v,meta){
                           meta.css='work';
                           return v;
                        }
                    },
                    {
                        header: 'км с грузом',
                        width: 60,
                        dataIndex: 'WeightKm',
                        align:'center',
                        editor: { 
                            xtype:'kdn.editor.decimalfield',                            
                            decimalPrecision: 3,
                            allowNegative: false
                        }
                    },
                    {
                        header: 'груз, т',
                        align:'center',
                        width: 65,
                        dataIndex: 'Weight',
                        editor: { 
                            xtype:'kdn.editor.decimalfield',                            
                            decimalPrecision: 3,
                            allowNegative: false
                        }
                    },                    
                    {
                        header: 'ткм',
                        width: 65,
                        dataIndex: 'tkm',
                        align:'center',
                        renderer:function(v,meta,rec){
                           var tkm =(rec.get('Weight')||0)*(rec.get('WeightKm')||0);
                           return tkm>0?Kdn.fixDecimal(tkm,3):null;                           
                        }                        
                    },                    
                    {
                        header: 'пасс.',
                        align:'center',
                        width: 45,
                        dataIndex: 'Passengers',
                        editor: { 
                            xtype:'kdn.editor.numberfield',                            
                            allowDecimals: false,
                            allowNegative: false,
                            allowBlank:true
                        }
                    },
                    {
                        header: 'РБ',
                        align:'center',
                        width: 45,
                        dataIndex: 'BYkm',
                        editor: { 
                            xtype:'kdn.editor.numberfield',                            
                            allowDecimals: false,
                            allowNegative: false,
                            allowBlank:true
                        },
                        renderer:function(v,meta,rec){                           
                           if(v==null||v===''){
                              return rec.get('WorkAmount'); 
                           }
                           else return v;                           
                        }
                    },
                    {
                        header: 'Прицеп',
                        align:'center',
                        width: 70,
                        dataIndex: 'TrailerId',
                        editor:{xtype:'combo.trailer',enableClear:true},
                        renderer:function (v){
                           if(!v) return null;
                           var store = Kdn.ModelFactory.getStore('Trailer');
                           var record = store.getById(v);
                           if (record) return new Ext.Template('[{GarageNumber}]').apply(record.data);
                        }
                    },
                    {
                        header: 'Надбавки',
                        width: 100,
                        dataIndex: '_TaskIncreases',
                        renderer:function(o,m,r){
                           var increases = r.increases,
                               a = [],
                               tpl = '{0}:{1}%',
                               sum = 0,
                               store = Kdn.ModelFactory.getStore('Increase');
                               
                           if(increases){
                              increases.each(function(i){
                                 var rec = store.getById(i.get('IncreaseId'));
                                  sum+=i.data.Prcn;
                                  a.push(String.format(tpl,rec.data.IncreaseShortName,i.data.Prcn));                                 
                              });
                              
                              if (a.length>1){
                                 a = a.concat(String.format('<br/><b>Всего {0}%<b>',sum));
                              } 
                              return a.join(', ');
                           } 
                           
                           return null;                          
                        },
                        editor:{field:IncreasesEditor}
                    },
                    {
                        header: 'Расход топлива',
                        width: 75,
                        dataIndex: 'Consumption',
                        align:'center',
                       /* editor: {
                            xtype: 'kdn.editor.decimalfield',
                            allowNegative: false
                        },*/
                        renderer: function(v, meta) {
                            meta.css = 'consumption'; return v;
                        }
                    },
                    {
                        header: 't°C',
                        dataIndex: 'Temperature',
                        align:'center',
                        width: 55                        
                    },
                    {
                        header: 'Без уч. расх.',
                        align:'center',
                        width: 45,
                        dataIndex: 'isUnaccounted',
                        xtype: 'checkcolumn',
                        checkHandler: (function(rec) { 
                           this.calculateNormConsumption(rec); 
                           this.refreshMain();
                        }).createDelegate(this),
                        beforeCheck: (function() { 
                           if (this.mainView.isDispClosed()) return false;
                        }).createDelegate(this)
                    },
                    {
                        header: 'Само- свал',
                        align:'center',
                        width: 50,
                        dataIndex: 'isTruck',
                        xtype: 'checkcolumn',
                        checkHandler: (function(rec) { 
                           this.calculateNormConsumption(rec); 
                           this.refreshMain();
                        }).createDelegate(this),
                        beforeCheck: (function() { 
                           if (this.mainView.isDispClosed()) return false;
                        }).createDelegate(this)
                    },
                    {
                        header: 'Пункт отправления',
                        dataIndex: 'SrcRoutPoint',
                        width: 100,
                        editor:{xtype:'combo.routepoint',editable:true,objectValue:false},
                        renderer:function(e){
                           if(!e) return null;
                           var rec = Kdn.ModelFactory.getStore('RoutePoint').getById(e);
                           if(rec) return rec.get('RoutePointName');
                           return null;
                        }
                    },
                    {
                        header: 'Пункт назначения',
                        dataIndex: 'DstRoutPoint',
                        width: 100,
                        editor:{xtype:'combo.routepoint',editable:true,objectValue:false},
                        renderer:function(e){
                           if(!e) return null;
                           var rec = Kdn.ModelFactory.getStore('RoutePoint').getById(e);
                           if(rec) return rec.get('RoutePointName');
                           return null;
                        }
                    },
                    {
                        header: 'Груз',
                        dataIndex: 'CargoName',
                        width: 130,
                        editor:{xtype:'kdn.editor.textfield',allowBlank:true}
                    },
                    {
                        header: 'тонн на прицепе',
                        dataIndex: 'WeightOnTrailer',
                        width: 70,
                        editor: { 
                            xtype:'kdn.editor.numberfield',                            
                            allowDecimals: false,
                            allowNegative: false,
                            allowBlank:true
                        }
                    }
                ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillTask').buildStore({
               autoLoad:false,
               autoSave:true
            }),
            loadMask:true
        });
        
      T.view.waybill.WaybillTask.superclass.constructor.call(this,cfg);      
   },
   
   initComponent:function(){
    /*
      this.on({
         scope:this,
         beforeedit:this.onBeforeEdit,
         afteredit:this.onAfterEdit       
      });*/ 
      
       this.store.on({
         scope:this,
         remove:this.refreshMain
      });
      
      T.view.waybill.WaybillTask.superclass.initComponent.call(this);
      
    },
    
    
    onAfterRender:function(){
      
      T.view.waybill.WaybillTask.superclass.onAfterRender.call(this);
      
      
      this.mon(this.getSelectionModel(),{
         scope:this,
         nolast:this.onNoLast
      });
      
    },
    
    onNoLast:function(){
      this.add();
    },
    
    setData:function(data){   
      var tasks = data["WaybillTask"];
      this.store.loadData({ data: tasks }, false);      
      
      this.store.each(function(rec){
         this.initRecordIncrease(rec);
      },this);
            
      this.view.refresh();     
            
    },
    
    initRecordIncrease:function(rec){      
      var taskIncreases = rec.data.TaskIncreases||[];
      
      var store = Kdn.ModelFactory.getModel('WaybillTaskIncrease').buildStore({
         autoDestroy: true,
         autoLoad:false,
         autoSave:false
      });
      
      store.loadData({data:taskIncreases});      
      rec.increases = store;  
    
    },
    
    //Полная информация о норме расхода топлива 
    getConsumptionInfo:function(ConsumptionId){
          
      var vehicle = this.mainView.vehicle,
         consumption = vehicle.consumption.get(ConsumptionId);
         
     if(!consumption) return null;
     
     var norm = vehicle.norms.get(consumption.NormId),
         workTypeStore = Kdn.ModelFactory.getStore('WorkType'),
         workUnitStore = Kdn.ModelFactory.getStore('WorkUnit'),
         work = workTypeStore.getById(norm.WorkTypeId),
         unit = workUnitStore.getById(work.get('WorkUnitId'));
         
         return {
            consumption:consumption,
            norm:norm,
            work:work,
            unit:unit
         }
      
    },
    
    consumptionRenderer:function(v,meta){
      if(meta) meta.css='work';
      if(!v) return v;
      var info = this.getConsumptionInfo(v),
         notagTpl = '{0} {1}л/{2}{3}',
         tpl = '{0} <span style="color:blue;"><b>{1}</b>л</span>/{2}{3}';
      
      if(!info) return null;                                                  
      
      return String.format((!meta?notagTpl:tpl),
            info.work.get('WorkTypeName'),
            info.consumption.Consumption,
            info.unit.get('Coefficient'),
            info.unit.get('UnitName')
         );                   
         
    },
    
    getNormConsumption:function(norm,date){
    
      var consumption=null;
      Ext.iterate(norm['NormConsumption'],function(c){
         if (c.ConsumptionStartDate<=date){
            consumption=c;
            return false;
         }
      });
      return consumption;            
    
    },
    
    beforeRemove:function(selections){
      if(this.mainView.isDispClosed()) return null;
      return selections;         
    },
       
    applyDefaults:function(record){
        
      if (this.mainView.isDispClosed()) return null;
      
      var main = this.mainView,
            vehicle = main.vehicle,
            norms = vehicle.Norms,
            norm,
            tkmWorkId = T.config.TonneKilometerWorkId,
            cfg={};      
        
        var TaskDepartureDate = main.waybillproperty.getSource()['DepartureDate'],
            WaybillId = main.waybillId,
            TrailerId = main.waybillproperty.getSource()['TrailerId'],
            Customer = vehicle['Customer'],
            NormConsumptionId=null,
            FuelId = null,
            WaybillTaskNormIncreases = [];
        
        var cnt = this.store.getCount() 
        if(cnt>0){
            var lastRec = this.store.getAt(cnt-1);
            var lastCustomer = lastRec.get('Customer');
            if(lastCustomer){
               Customer=lastCustomer;
            }            
        }
             
                
        if (norms.length < 1) return;

        Ext.iterate(norms, function(n) {
            if (n.isMain && n.WorkTypeId != tkmWorkId) {
                norm = n; return false;
            }
        });

        if (norm) {
            NormConsumptionId = this.getNormConsumption(norm,TaskDepartureDate);
            if(NormConsumptionId){
               NormConsumptionId = NormConsumptionId.RecId;
               FuelId = norm.NormFuels.length==0?null:norm.NormFuels[0];
               WaybillTaskNormIncreases = norm.NormIncreases;
            }
        }

        Ext.apply(cfg, {
            WaybillId:WaybillId,
            TaskDepartureDate: TaskDepartureDate,
            TrailerId:TrailerId,
            Customer: Customer,
            NormConsumptionId:NormConsumptionId,
            WaybillTaskNormIncreases:WaybillTaskNormIncreases,
            FuelId:FuelId
        });

        
        Ext.apply(record.data,cfg);
        
        //добавляем надбавки по умолчанию
       /* this.initRecordIncrease(record);
        if(WaybillTaskNormIncreases){
            var increaseStore = Kdn.ModelFactory.getStore('Increase');
            
            Ext.iterate(WaybillTaskNormIncreases,function(i){
              var _rec = vehicle.increases.get(i);              
              if(_rec){
                  record.increases.add(new record.increases.recordType(Kdn.clone(_rec)));
              }                
            });
        }*/
        
        //грузим температуру
        //this.getTemperature(record);
        return record;
        
      
    },
    
   
    getTemperature:function(record){
      var date = record.get('TaskDepartureDate'),
          time = this.mainView.waybillproperty.getSource()['DepartureTime'],
          d = Kdn.parseDate(date,time);
          
          Kdn.Direct.GetTemperature({
               ownerId:Kdn.Application.Owner.getValue().OwnerId,
               date:d
          },
          this.onTemperatureLoad.createDelegate(this,[record],true)
          );
    },
    
    onTemperatureLoad:function(temp,transaction,record){
         
            record.beginEdit();
            record.set('Temperature',(!temp)? null:temp.Temp);
            record.endEdit();
            
            temp = (!temp)? {Temp:0}:temp;
                                    
               var increaseId = T.config.WinterIncreaseId,
                   increase = this.mainView.vehicle.increases.get(increaseId);
               
               if(increase){
                  var r = record.increases.find('IncreaseId',increaseId);
                  
                  if(temp.Temp<0 && r==-1){
                     record.increases.add(new record.increases.recordType(Kdn.clone(increase)));
                     this.view.refresh();
                  }
                  else if(temp.Temp>=0 && r!=-1){
                     record.increases.removeAt(r);
                     this.view.refresh();
                  }
                  this.calculateNormConsumption(record);
               }        
         
         
    },
    
    onBeforeEdit:function(e){
      var $ = this,
          main = $.mainView,
          vehicle = main.vehicle, 
          rec = e.record;

        
      if(main.isDispClosed()){
         var allowModifyFields = ['Customer','Passengers'];
         if(allowModifyFields.indexOf(e.field)==-1) return false;
      }
      

      switch(e.field){
         
         case 'NormConsumptionId':{
            var date = e.record.data.TaskDepartureDate,
                consumptionEditorStore = $.ConsumptionEditor.store,
                TkmWorkId = T.config.TkmWorkId;
                
                
                
            if(!date){
               return false;
            }
            else{
               consumptionEditorStore.removeAll();
               vehicle.norms.each(function(n){
                  var consumption = $.getNormConsumption(n,date);                  
                  if (consumption && n.WorkTypeId != TkmWorkId){
                     consumptionEditorStore.add(new consumptionEditorStore.recordType({
                        id:consumption.RecId,
                        display:$.consumptionRenderer(consumption.RecId)
                     }));
                  }                  
               });
               /*if (consumptionEditorStore.getCount()<=1) {
                  this.startEditing.defer(20,this,[e.row,e.column+1]);
                  return false;
               }*/
            }            
            break;
         }
         
         case 'FuelId':{            
            var id = e.record.data.NormConsumptionId,
                fuelEditorStore = $.FuelEditor.store; 
            if(!id) {
              // fuelEditorStore.removeAll();
              return false;
            }
            else{ 
               var norm = vehicle.norms.get(vehicle.consumption.get(id)['NormId']),
                   fuelStore = Kdn.ModelFactory.getStore('Fuel'),
                   NormFuels = norm.NormFuels;
               //если топлива нет или одно то эдитор не открывать
              /* if(NormFuels && NormFuels.length<=1) {
                  this.startEditing.defer(20,this,[e.row,e.column+1]);
                  return false;
               }  */  
               
               fuelEditorStore.removeAll();
               Ext.iterate(norm.NormFuels,function(f){
                  var fuel = fuelStore.getById(f);
                  if(fuel) fuelEditorStore.add(new fuelEditorStore.recordType(fuel.json));
               });               
            }            
            break;
         }
         
         case '_TaskIncreases':{
            var cm = this.getColumnModel();
                column = cm.getColumnAt(e.column),
                editor = column.getEditor();                
                editor.field.taskIncreaseStore = e.record.increases;
                                                            
            break;
         }
      }     
      
    },
    
    
    onAfterEdit:function(e){
    
      var $ = this,
          main = $.mainView,
          vehicle = main.vehicle,
          rec = e.record;
      
      switch(e.field){
         case 'TaskDepartureDate':{
            if(e.value!=e.originalValue){
               var consId = rec.data['NormConsumptionId'],
                  norm,
                  newCons=null;
                  
               if(!consId){
                  Ext.iterate(vehicle.Norms, function(n) {
                     if (n.isMain) {
                         norm = n; return false;
                     }
                 });
               }
               else{
                  norm = vehicle.norms.get(vehicle.consumption.get(consId)["NormId"]);
               }
               
               if(norm){
                  newCons = $.getNormConsumption(norm,e.value);
               }
               
               if(newCons){
                  rec.beginEdit();
                  rec.set('NormConsumptionId',newCons['RecId']);
                  if(!rec.get('FuelId')) rec.set('FuelId',norm.NormFuels.length>0?norm.NormFuels[0]:null);
                  rec.endEdit();
               }
               else{
                  rec.beginEdit();
                  rec.set('NormConsumptionId',null);
                  rec.set('FuelId',null);
                  rec.endEdit();
               }
               $.getTemperature(rec);
               return;
            }                                  
            break;
         }
         case 'NormConsumptionId':{
            
            if(e.value!=e.originalValue){
               var norm = vehicle.norms.get(vehicle.consumption.get(e.value)["NormId"]);
               rec.beginEdit();
               rec.set('FuelId',norm.NormFuels.length>0?norm.NormFuels[0]:null);
               rec.endEdit();  
               
               
               rec.increases.removeAll();
               
               if(norm.NormIncreases){
                  Ext.iterate(norm.NormIncreases,function(i){
                    var _rec = vehicle.increases.get(i);                    
                    if(_rec){
                        rec.increases.add(new rec.increases.recordType(Kdn.clone(_rec)));
                    }                      
                  });
                  this.view.refresh();
               }              
               
            }
                                  
            break;
         }
         
         case 'TaskIncreases':{
            var cm = this.getColumnModel();
                column = cm.getColumnAt(e.column),
                editor = column.getEditor();
                
                editor.field.taskIncreaseStore = null;
                editor.field.clearSelections();
                
                                            
            break;
         }
      }
      
      $.calculateNormConsumption(rec);
      
    },
    
    
    calculateNormConsumptionAll:function(){
      
      this.store.each(this.calculateNormConsumption,this);
      
    },
    
    calculateNormConsumption: function(record) {

         var $ = this,
             main = $.mainView,
             vehicle = main.vehicle,
             NormConsumptionId = record.get('NormConsumptionId'),
             FuelId = record.get('NormConsumptionId'),
             isUnaccounted = record.get('isUnaccounted'),
             isTruck = record.get('isTruck'),
             TrailerId = record.get('TrailerId'),
             CONSUMPTION=null,
             tkmCoeff = vehicle.TkmNorm || T.config.TonneKilometerConsumption,
             increaseStore = Kdn.ModelFactory.getStore('Increase');
         
                              
         if(isUnaccounted){
            CONSUMPTION=0;
         }
         else if(NormConsumptionId && FuelId){            
            var normConsumption = vehicle.consumption.get(NormConsumptionId);
            if(normConsumption){
               var info = this.getConsumptionInfo(NormConsumptionId),
                   increasePrcn = 0,
                   increasePrcnWeight = 0, //надбавки которые непостоянные к норме они идут на транспортную работу
                   massValue = 0;         
               
              if (info){
                                                                                             
                  record.increases.each(function(e){
                     increasePrcn+=e.get('Prcn');
                  
                     var _i = increaseStore.getById(e.get('IncreaseId'));                  
                     if(_i && !_i.get('isNormConstant')){
                        increasePrcnWeight +=e.get('Prcn');
                     }
                  
                  });
                                                      
                  
                  var increaseK = 1 + (increasePrcn / 100),
                      increaseKWeight = 1+(increasePrcnWeight/100),
                      weightKm = record.get('WeightKm')||0,
                      weight = record.get('Weight')||0,
                      weightValue = weight*weightKm,
                      weightConsumption = weightValue * tkmCoeff / 100,
                      workAmount = record.get('WorkAmount'),
                      consumption = info.consumption.Consumption,
                      coefficient = info.unit.get('Coefficient'),
                      trailerConsumption = 0;
                      
                     
                  //Если машиночасы то проверяем коэффициент перевода из моточасов   
                  if(info.unit.get('WorkUnitId')==2){
                     var MTMk = info.norm.MotoToMachineKoef||1;
                     consumption = Kdn.fixDecimal(consumption/MTMk);
                  };
                                                      
                  weightConsumption = Kdn.fixDecimal(weightConsumption * increaseKWeight);
                  
                  if(isTruck){
                     
                     var Qv = vehicle['CapacityTonns']||0;
                     
                     if(TrailerId){
                        
                        var trailer = Kdn.ModelFactory.getStore('FullTrailer').getById(TrailerId),
                            trailerWeight = trailer.get('SelfMass'),
                            Qt = trailer.get('CapacityTonns');
                        
                        CONSUMPTION = this.calculateTruckTrailerConsumption(consumption,trailerWeight,Qt,workAmount,weightKm,Qv,weight,tkmCoeff,increaseK);
                     
                     }
                     
                     
                     CONSUMPTION = this.calculateTruckConsumption(consumption,workAmount,Qv,weight,weightKm,tkmCoeff,increaseK);
                      
                     
                  }
                  else{
                       if(TrailerId){
                                       
                           var trailer = Kdn.ModelFactory.getStore('FullTrailer').getById(TrailerId),
                               trailerWeight = trailer.get('SelfMass');
                               
                           if(trailerWeight){
                              trailerConsumption = Kdn.fixDecimal((trailerWeight)*workAmount* (tkmCoeff/100) * increaseKWeight);
                           }                     
                        }                
                  
                        CONSUMPTION = Kdn.fixDecimal(workAmount / coefficient * Kdn.fixDecimal(consumption * increaseK));                    
                        if (info.unit.id==1) CONSUMPTION = Kdn.fixDecimal(CONSUMPTION + weightConsumption + trailerConsumption);
                  }            
                 
                 
                 
                 }     
            }            
         }    
         
         //record.beginEdit();
         //record.set('Consumption',CONSUMPTION);
         //record.endEdit();
         
         record.data['Consumption']=CONSUMPTION;
         
         this.refreshMain();
                    
     },
     
     
     calculateTruckConsumption:function(H,L,q,m,S,c,increaseK){
        /* var H,//Линейная норма расхода топлива
             L,//Общий пробег автомобиля за смену
             q,//Грузоподъёмность самосвала
             m,//Масса груза
             S,//Пробег с грузом
             c,//Норма на транспортную работу,
             increase;
             */
                          
        
         var rezult = ( 0.01*H*L*1 + (0.01*(L*m-q*0.5*L)*c))*increaseK;
         return Kdn.fixDecimal(rezult);             
     },
     
     calculateTruckTrailerConsumption:function(H,Mt,Qt,L,S,q,m,c,increaseK){
      
      /*
      var H,//Линейная норма расхода топлива
          Mt,//Масса прицепа
          Qt,//Грузоподъёмность прицепа
          L,//Общий пробег автомобиля за смену
          S,//Пробег с грузом
          q,//Грузоподъёмность самосвала
          m,//Масса груза
          c,//Норма на транспортную работу
          increase
          */
      
      var rez = H+c*(Mt+0.5*Qt);
      
      rez=0.01*rez*L;
      
      var Lx = L-S;
      
      var Q1 = 0.01*Lx*0.5*(q+Qt)*c;
      var Q2 = 0.01*S*(m-(q+Qt))*c;
      
      rez=(rez-Q1+Q2)*increaseK; 
      return Kdn.fixDecimal(rez);
     },
         
          
     refreshMain: function() {
        var v = this.mainView;
        if (v) {
           v.refreshNormConsumption();
           v.refreshDiff();
           v.refreshCounters();
        }
    },
    
    calculateSummary:function(){
      
      var mc = new Ext.util.MixedCollection();
      
      var vehicle = this.mainView.vehicle;
      var fn = function(record){
         
         var NormConsumptionId = record.get('NormConsumptionId');
         if(NormConsumptionId){
            var normConsumption = vehicle.consumption.get(NormConsumptionId);
            if(normConsumption){
               var info = this.getConsumptionInfo(NormConsumptionId);
               
               var workId = info.work.get('WorkTypeId');
               var workName = info.work.get('WorkTypeName');
               
               var workCache=null;
                   workCache =  mc.get(workId);
                   
               if(!workCache) workCache=mc.add(workId,{name:workName,amount:0,BY:null});
               
               workCache.amount +=Kdn.fixDecimal(record.get('WorkAmount')||0);
                                            
               if(info.unit.get('WorkUnitId')==1){
                  if(record.get('BYkm')==null|| record.get('BYkm')==='' ){
                     workCache.BY = Kdn.fixDecimal((workCache.BY||0)+ record.get('WorkAmount')||0);
                  }
               }
               
               if((record.get('Weight')||0)>0){
                  
                  
                  var addFn = function(key,name,amount,BY){ 
                     var item =mc.get(key);                     
                     if(!item) item = mc.add(key,{name:name,amount:0,BY:null});
                     
                     item.amount = Kdn.fixDecimal((item.amount||0)+amount||0);
                     if(BY!=null) item.BY = Kdn.fixDecimal((item.BY||0)+BY||0);                     
                  }
                  
                  var BYflag = record.get('BYkm')==null || record.get('BYkm')==='';
                  addFn('weight','Перевезено тонн',record.get('Weight'),null);
                  addFn('weightKm','Пробег с грузом',record.get('WeightKm'),BYflag?record.get('WeightKm'):record.get('BYkm'));
                  addFn('tkm','Выполнено тонно-километров',record.get('WeightKm')*record.get('Weight'),BYflag?record.get('WeightKm')*record.get('Weight'):record.get('BYkm')*record.get('Weight'));   
               }
                
            }  
         }
           
      };
      
      this.store.each(fn,this);
      
      return mc;
          
    },
    
    onSave:function(){
      this.mainView.onSave();
    } 
   

});

Ext.reg('view.waybill.waybilltask', Transport.view.waybill.WaybillTask);

















/*
T.view.waybill.WaybillTask = Ext.extend(Kdn.grid.LocalEditorGrid, {
    clicksToEdit:1,
    constructor: function(cfg) {
    
    
             
       
        
        cfg = cfg || {};
        Ext.apply(cfg, {
            FuelEditor:FuelEditor,
            ConsumptionEditor:ConsumptionEditor,
            IncreasesEditor:IncreasesEditor,
            //selModel: new Ext.grid.CellSelectionModel(),     
            colModel: new Ext.grid.ColumnModel({
               columns: [
                    {
                        header: 'Код',
                        dataIndex: 'TaskId',
                        width: 30,
                        hidden: true
                    },
                    {
                        header: 'Код затрат',
                        dataIndex: 'CostCode',
                        hidden: true,
                        editor:{xtype:'kdn.editor.textfield',allowBlank:true}
                    },
                    {
                        header: 'Дата',
                        align: 'center',
                        width: 130,
                        xtype: 'datecolumn',
                        dataIndex: 'TaskDepartureDate',
                        editor: { xtype: 'kdn.form.datefield'}
                    },
                    {
                        header: 'Заказчик',
                        width: 170,
                        dataIndex: 'Customer',
                        editor:{xtype:'combo.customer'},
                        renderer: function(o) {
                            if (!o && !Ext.isObject(o)) return null;
                            return o['CustomerName']
                        }
                    },                    
                    {
                        header: 'Норма расхода ГСМ',
                        width: 150,
                        dataIndex: 'NormConsumptionId',
                        renderer:{
                           fn:this.consumptionRenderer,
                           scope:this
                        },
                        editor:{field:ConsumptionEditor}
                    },
                    {
                        header: 'Топливо',
                        width: 90,
                        align:'center',
                        dataIndex: 'FuelId',
                        renderer:function(o){
                        if(!o) return o;
                           var store = Kdn.ModelFactory.getStore('Fuel'),
                              rec = store.getById(o);
                           if(rec){
                              return rec.data.FuelName
                           }
                           return o;
                        },
                        editor:{field:FuelEditor}
                    },
                    {
                        header: 'Работа, ед', 
                        width: 65,
                        dataIndex: 'WorkAmount',
                        align:'center',
                        editor: { 
                            xtype:'kdn.editor.decimalfield',                            
                            decimalPrecision: 3,
                            allowNegative: false
                        }
                    },
                    {
                        header: 'С грузом, км',
                        width: 75,
                        dataIndex: 'WeightKm',
                        align:'center',
                        editor: { 
                            xtype:'kdn.editor.decimalfield',                            
                            decimalPrecision: 3,
                            allowNegative: false
                        }
                    },
                    {
                        header: 'Груз, т',
                        align:'center',
                        width: 60,
                        dataIndex: 'Weight',
                        editor: { 
                            xtype:'kdn.editor.decimalfield',                            
                            decimalPrecision: 3,
                            allowNegative: false
                        }
                    },
                    {
                        header: 'Пасса- жиры, чел.',
                        align:'center',
                        width: 70,
                        dataIndex: 'Passengers',
                        editor: { 
                            xtype:'kdn.editor.numberfield',                            
                            allowDecimals: false,
                            allowNegative: false,
                            allowBlank:true
                        }
                    },
                    {
                        header: 'Прицеп',
                        align:'center',
                        width: 130,
                        dataIndex: 'TrailerId',
                        editor:{xtype:'combo.trailer',enableClear:true},
                        renderer:T.combo.Trailer.prototype.renderTpl
                    },
                    {
                        header: 'Надбавки',
                        width: 100,
                        dataIndex: '_TaskIncreases',
                        renderer:function(o,m,r){
                           var increases = r.increases,
                               a = [],
                               tpl = '{0}:{1}%',
                               sum = 0,
                               store = Kdn.ModelFactory.getStore('Increase');
                               
                           if(increases){
                              increases.each(function(i){
                                 var rec = store.getById(i.get('IncreaseId'));
                                  sum+=i.data.Prcn;
                                  a.push(String.format(tpl,rec.data.IncreaseShortName,i.data.Prcn));                                 
                              });
                              
                              if (a.length>1){
                                 a = a.concat(String.format('<br/><b>Всего {0}%<b>',sum));
                              } 
                              return a.join(', ');
                           } 
                           
                           return null;                          
                        },
                        editor:{field:IncreasesEditor}
                    },
                    {
                        header: 'Расход ГСМ',
                        width: 75,
                        dataIndex: 'Consumption',
                        align:'center',
                        editor: {
                            xtype: 'kdn.editor.decimalfield',
                            allowNegative: false
                        },
                        renderer: function(v, meta) {
                            meta.css = 'consumption'; return v;
                        }
                    },
                    {
                        header: 't°C',
                        dataIndex: 'Temperature',
                        align:'center',
                        width: 55                        
                    },
                    {
                        header: 'Без учёта расхода',
                        align:'center',
                        width: 65,
                        dataIndex: 'isUnaccounted',
                        xtype: 'checkcolumn',
                        checkHandler: (function(rec) { this.calculateNormConsumption(rec); this.refreshMain();}).createDelegate(this),
                        beforeCheck: (function() { if (this.mainView.isDispClosed()) return false;}).createDelegate(this)
                    }
                ]
            }),
            store:Kdn.ModelFactory.getModel('WaybillTask').buildStore({
               autoLoad:false,
               autoSave:false
            }),
            loadMask:true
        });

        T.view.waybill.WaybillTask.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
    
      this.on({
         scope:this,
         beforeedit:this.onBeforeEdit,
         afteredit:this.onAfterEdit
      });
      
      T.view.waybill.WaybillTask.superclass.initComponent.call(this);
      
    },
    
    setData:function(data){   
      var tasks = data["WaybillTask"];
      this.store.loadData({ data: tasks }, false);      
      
      this.store.each(function(rec){
         this.initRecordIncrease(rec);
      },this);
            
      this.view.refresh();     
            
    },
    
    initRecordIncrease:function(rec){      
      var taskIncreases = rec.data.TaskIncreases||[];
      
      var store = Kdn.ModelFactory.getModel('WaybillTaskIncrease').buildStore({
         autoDestroy: true,
         autoLoad:false,
         autoSave:false
      });
      
      store.loadData({data:taskIncreases});      
      rec.increases = store;  
    
    },
    
    //Полная информация о норме расхода топлива 
    getConsumptionInfo:function(ConsumptionId){
          
      var vehicle = this.mainView.vehicle,
         consumption = vehicle.consumption.get(ConsumptionId);
         
     if(!consumption) return null;
     
     var norm = vehicle.norms.get(consumption.NormId),
         workTypeStore = Kdn.ModelFactory.getStore('WorkType'),
         workUnitStore = Kdn.ModelFactory.getStore('WorkUnit'),
         work = workTypeStore.getById(norm.WorkTypeId),
         unit = workUnitStore.getById(work.get('WorkUnitId'));
         
         return {
            consumption:consumption,
            norm:norm,
            work:work,
            unit:unit
         }
      
    },
    
    consumptionRenderer:function(v,meta){
      if(!v) return v;
      var info = this.getConsumptionInfo(v),
         notagTpl = '{0} {1}л/{2}{3}',
         tpl = '{0} <span style="color:blue;"><b>{1}</b>л</span>/{2}{3}';
      
      if(!info) return null;                                                  
      
      return String.format((!meta?notagTpl:tpl),
            info.work.get('WorkTypeName'),
            info.consumption.Consumption,
            info.unit.get('Coefficient'),
            info.unit.get('UnitName')
         );                   
    },
    
    getNormConsumption:function(norm,date){
    
      var consumption=null;
      Ext.iterate(norm['NormConsumption'],function(c){
         if (c.ConsumptionStartDate<=date){
            consumption=c;
            return false;
         }
      });
      return consumption;            
    
    },
    
    onAdd: function(btn, ev) {

    if (this.mainView.isDispClosed()) return false;
        
        var main = this.mainView,
            vehicle = main.vehicle,
            norms = vehicle.Norms,
            norm,
            cfg={};        
        
        var TaskDepartureDate = main.waybillproperty.getSource()['DepartureDate'],
            TrailerId = main.waybillproperty.getSource()['TrailerId'],
            Customer = vehicle['Customer'],
            NormConsumptionId=null,
            FuelId = null,
            WaybillTaskNormIncreases = [];
        
        if (norms.length < 1) return;

        Ext.iterate(norms, function(n) {
            if (n.isMain) {
                norm = n; return false;
            }
        });

        if (norm) {
            NormConsumptionId = this.getNormConsumption(norm,TaskDepartureDate);
            if(NormConsumptionId){
               NormConsumptionId = NormConsumptionId.RecId;
               FuelId = norm.NormFuels.length==0?null:norm.NormFuels[0];
               WaybillTaskNormIncreases = norm.NormIncreases;
            }
        }

        Ext.apply(cfg, {
            TaskDepartureDate: TaskDepartureDate,
            TrailerId:TrailerId,
            Customer: Customer,
            NormConsumptionId:NormConsumptionId,
            WaybillTaskNormIncreases:WaybillTaskNormIncreases,
            FuelId:FuelId
        });

        var r = new this.store.recordType(cfg).applyDefaults();
        
        //добавляем надбавки по умолчанию
        this.initRecordIncrease(r);
        if(WaybillTaskNormIncreases){
            var increaseStore = Kdn.ModelFactory.getStore('Increase');
            
            Ext.iterate(WaybillTaskNormIncreases,function(i){
              var _rec = vehicle.increases.get(i);
              
              if(_rec){
                  r.increases.add(new r.increases.recordType(Kdn.clone(_rec)));
              }
                
            });
        }
        
        //грузим температуру
        this.getTemperature(r);
        
        this.stopEditing();
        this.store.insert(0, r);

        if (norm) {
        //    this.onAfterEdit({ field: 'VehicleNormId', record: r, value: norm.VehicleNormId })
        }

        this.startEditing(0, 6);
    },
    
    
    onRemove: function(btn, ev) {

    if (this.mainView.isDispClosed()) return false;
    
        var index = this.getSelectionModel().getSelectedCell();
        if (!index) {
            return false;
        }
        var rec = this.store.getAt(index[0]);
        this.store.remove(rec);
        this.refreshMain();
    },
    
    getTemperature:function(record){
      var date = record.get('TaskDepartureDate'),
          time = this.mainView.waybillproperty.getSource()['DepartureTime'],
          d = Kdn.parseDate(date,time);
          
          Kdn.Direct.GetTemperature({
               ownerId:Kdn.Application.Owner.getValue().OwnerId,
               date:d
          },
          this.onTemperatureLoad.createDelegate(this,[record],true)
          );
    },
    
    onTemperatureLoad:function(temp,transaction,record){
         
            record.beginEdit();
            record.set('Temperature',(!temp)? null:temp.Temp);
            record.endEdit();
            
            temp = (!temp)? {Temp:0}:temp;
                                    
               var increaseId = T.config.WinterIncreaseId,
                   increase = this.mainView.vehicle.increases.get(increaseId);
               
               if(increase){
                  var r = record.increases.find('IncreaseId',increaseId);
                  
                  if(temp.Temp<0 && r==-1){
                     record.increases.add(new record.increases.recordType(Kdn.clone(increase)));
                     this.view.refresh();
                  }
                  else if(temp.Temp>=0 && r!=-1){
                     record.increases.removeAt(r);
                     this.view.refresh();
                  }
                  this.calculateNormConsumption(record);
               }        
         
         
    },
    
    onBeforeEdit:function(e){
      var $ = this,
          main = $.mainView,
          vehicle = main.vehicle,
          rec = e.record;

      switch(e.field){
         
         case 'NormConsumptionId':{
            var date = e.record.data.TaskDepartureDate,
                consumptionEditorStore = $.ConsumptionEditor.store;
                
            if(!date){
               return false;
            }
            else{
               consumptionEditorStore.removeAll();
               vehicle.norms.each(function(n){
                  var consumption = $.getNormConsumption(n,date);
                  if (consumption){
                     consumptionEditorStore.add(new consumptionEditorStore.recordType({
                        id:consumption.RecId,
                        display:$.consumptionRenderer(consumption.RecId)
                     }));
                  }                  
               });
               if (consumptionEditorStore.getCount()<=1) return false;
            }            
            break;
         }
         
         case 'FuelId':{            
            var id = e.record.data.NormConsumptionId,
                fuelEditorStore = $.FuelEditor.store; 
            if(!id) {
              // fuelEditorStore.removeAll();
              return false;
            }
            else{
               var norm = vehicle.norms.get(vehicle.consumption.get(id)['NormId']),
                   fuelStore = Kdn.ModelFactory.getStore('Fuel'),
                   NormFuels = norm.NormFuels;
               //если топлива нет или одно то эдитор не открывать
               if(NormFuels && NormFuels.length<=1) return false;    
               
               fuelEditorStore.removeAll();
               Ext.iterate(norm.NormFuels,function(f){
                  var fuel = fuelStore.getById(f);
                  if(fuel) fuelEditorStore.add(new fuelEditorStore.recordType(fuel.json));
               });               
            }            
            break;
         }
         
         case '_TaskIncreases':{
            var cm = this.getColumnModel();
                column = cm.getColumnAt(e.column),
                editor = column.getEditor();
                
                editor.field.taskIncreaseStore = e.record.increases;
                
                                            
            break;
         }
      }
      
      
      
    },
    
    
    onAfterEdit:function(e){
    
      var $ = this,
          main = $.mainView,
          vehicle = main.vehicle,
          rec = e.record;
      
      switch(e.field){
         case 'TaskDepartureDate':{
            if(e.value!=e.originalValue){
               var consId = rec.data['NormConsumptionId'],
                  norm,
                  newCons=null;
                  
               if(!consId){
                  Ext.iterate(vehicle.Norms, function(n) {
                     if (n.isMain) {
                         norm = n; return false;
                     }
                 });
               }
               else{
                  norm = vehicle.norms.get(vehicle.consumption.get(consId)["NormId"]);
               }
               
               if(norm){
                  newCons = $.getNormConsumption(norm,e.value);
               }
               
               if(newCons){
                  rec.beginEdit();
                  rec.set('NormConsumptionId',newCons['RecId']);
                  if(!rec.get('FuelId')) rec.set('FuelId',norm.NormFuels.length>0?norm.NormFuels[0]:null);
                  rec.endEdit();
               }
               else{
                  rec.beginEdit();
                  rec.set('NormConsumptionId',null);
                  rec.set('FuelId',null);
                  rec.endEdit();
               }
               $.getTemperature(rec);
               return;
            }                                  
            break;
         }
         case 'NormConsumptionId':{
            
            if(e.value!=e.originalValue){
               var norm = vehicle.norms.get(vehicle.consumption.get(e.value)["NormId"]);
               rec.beginEdit();
               rec.set('FuelId',norm.NormFuels.length>0?norm.NormFuels[0]:null);
               rec.endEdit();  
               
               
               rec.increases.removeAll();
               
               if(norm.NormIncreases){
                  Ext.iterate(norm.NormIncreases,function(i){
                    var _rec = vehicle.increases.get(i);                    
                    if(_rec){
                        rec.increases.add(new rec.increases.recordType(Kdn.clone(_rec)));
                    }                      
                  });
                  this.view.refresh();
               }              
               
            }
                                  
            break;
         }
         
         case 'TaskIncreases':{
            var cm = this.getColumnModel();
                column = cm.getColumnAt(e.column),
                editor = column.getEditor();
                
                editor.field.taskIncreaseStore = null;
                editor.field.clearSelections();
                
                                            
            break;
         }
      }
      
      $.calculateNormConsumption(rec);
      
    },
    
    
    calculateNormConsumptionAll:function(){
      
      this.store.each(this.calculateNormConsumption,this);
      
    },
    
    calculateNormConsumption: function(record) {
         
         var $ = this,
             main = $.mainView,
             vehicle = main.vehicle,
             NormConsumptionId = record.get('NormConsumptionId'),
             FuelId = record.get('NormConsumptionId'),
             isUnaccounted = record.get('isUnaccounted'),
             TrailerId = record.get('TrailerId')
             CONSUMPTION=null;
                     
         if(isUnaccounted){
            CONSUMPTION=0;
         }
         else if(NormConsumptionId && FuelId){            
            var normConsumption = vehicle.consumption.get(NormConsumptionId);
            if(normConsumption){
               var info = this.getConsumptionInfo(NormConsumptionId),
                   increasePrcn = 0,
                   massValue = 0,
                   tkmCoeff = T.config.TonneKilometerConsumption;
               
              if (info){
                                             
                  record.increases.each(function(e){
                     increasePrcn+=e.get('Prcn');
                  });
                  
                  var increaseK = 1 + (increasePrcn / 100),
                      weightValue = (record.get('Weight')||0)*(record.get('WeightKm')||0),
                      weightConsumption = weightValue * tkmCoeff / 100;
                  
                  weightConsumption = Kdn.fixDecimal(weightConsumption * increaseK);
                  
                  var  workAmount = record.get('WorkAmount'),
                       consumption = info.consumption.Consumption,
                       coefficient = info.unit.get('Coefficient'),
                       trailerConsumption = 0;               
                 
                  if(TrailerId){
                                       
                     var trailer = Kdn.ModelFactory.getStore('Trailer').getById(TrailerId),
                         trailerWeight = trailer.get('SelfMass');
                         
                     if(trailerWeight){
                        trailerConsumption = Kdn.fixDecimal((trailerWeight/1000)*workAmount* (tkmCoeff/100) * increaseK);
                     }                     
                  }
                 
                  
                 CONSUMPTION = Kdn.fixDecimal(workAmount / coefficient * Kdn.fixDecimal(consumption * increaseK));
                 
                 if (info.unit.id==1) CONSUMPTION = Kdn.fixDecimal(CONSUMPTION + weightConsumption + trailerConsumption);
                 
                 }     
            }            
         }    
         
         record.beginEdit();
         record.set('Consumption',CONSUMPTION);
         record.endEdit();
         
         this.refreshMain();
                    
     },
     
     refreshMain: function() {
        var v = this.mainView;
        if (v) {
           v.refreshNormConsumption();
           v.refreshDiff();
           v.refreshCounters();
        }
    }
        
});

Ext.reg('view.waybill.waybilltask', T.view.waybill.WaybillTask);
*/


/*




Transport.view.waybill.WaybillTask = Ext.extend(Ext.grid.EditorGridPanel, {

    initComponent: function() {

        var NormStore = new Ext.data.JsonStore({
            idProperty: 'VehicleNormId',
            fields: [
                'VehicleNormId',
                {
                    name: 'VehicleNormName', convert: function(v, rec) {

                        return String.format("{0} {1} л/{2}({3}) {4}",
                            rec.WorkType.WorkTypeName,
                            rec.Consumption,
                            rec.WorkType.NormType.Coefficient,
                            rec.WorkType.NormType.ValueType,
                            (!!rec.MachineHourCoef) ? String.format("k={0}", rec.MachineHourCoef) : ""
                        )
                    }
                }
            ]
        });

        var NormCombo = new Kdn.form.ComboBox({
            store: NormStore,
            displayField: 'VehicleNormName',
            valueField: 'VehicleNormId',
            enableClear: false
        });


        var FuelStore = Transport.StoreMgr.buildStore('Fuel');
        var FuelCombo = Ext.create({
            xtype: 'combo.Fuel',
            store: FuelStore,
            enableClear: false
        });


        Ext.apply(this, {
            NormStore: NormStore,
            NormCombo: NormCombo,
            FuelStore: FuelStore,
            FuelCombo: FuelCombo
        });


        Ext.apply(this, {
            clicksToEdit: 1,
            columnLines: true,
            stripeRows: true,
            viewConfig: {
                forceFit: true
            },
            store: new Kdn.data.DirectStore({
                modelName: 'Transport.Models.WaybillTask',
                autoLoad: false,
                autoSave: false,
                idProperty: 'TaskId',
                fields: [
                    'TaskId',
                    'CustomerId',
                    'WaybillId',
                    'CostCode',
                    'TaskDate',
                    'VehicleNormId',
                    'FuelId',
                    { name: 'WorkAmount', allowBlank: false, useNull: false },
                    { name: 'WeightKm', allowBlank: false, useNull: false },
                    { name: 'Weight', allowBlank: false, useNull: false },
                    { name: 'WaybillTaskNormIncreases',
                        convert: function(v, rec) { return (v || []).join(','); },
                        _convert: function(v, rec) { return v.split(',').filter(function(x) { return x != "" }).map(function(x) { return parseInt(x); }) }
                    },
                    'isUnaccounted'
                ]
            }),
            cm: new Ext.grid.ColumnModel({
                defaults: {
                    align: 'center'
                },
                columns: [
                    {
                        header: 'Код',
                        dataIndex: 'TaskId',
                        width: 30,
                        hidden: true
                    },
                    {
                        header: 'Код затрат',
                        dataIndex: 'CostCode',
                        hidden: true
                    },
                    {
                        header: 'Заказчик',
                        align: 'left',
                        width: 200,
                        dataIndex: 'CustomerId',
                        renderer: Kdn.comboRenderer(Ext.create({ xtype: 'combo.Customer' })),
                        editor: {
                            xtype: 'combo.Customer',
                            enableClear: false
                        }
                    },
                    {
                        header: 'Дата',
                        width: 80,
                        xtype: 'datecolumn',
                        dataIndex: 'TaskDate',
                        editor: {
                            xtype: 'datefield',
                            selectOnFocus: true
                        }
                    },
                    {
                        header: 'Норма расхода ГСМ',
                        width: 200,
                        dataIndex: 'VehicleNormId',
                        editor: NormCombo,
                        renderer: Kdn.comboRenderer(NormCombo)
                    },
                    {
                        header: 'ГСМ',
                        width: 100,
                        dataIndex: 'FuelId',
                        renderer: Kdn.comboRenderer(Ext.create({ xtype: 'combo.Fuel' })),
                        editor: FuelCombo
                    },
                    {
                        header: 'Работа, ед',
                        width: 90,
                        dataIndex: 'WorkAmount',
                        editor: {
                            xtype: 'numberfield',
                            allowDecimal: true,
                            decimalPrecision: 3,
                            selectOnFocus: true,
                            allowNegative: false
                        },
                        renderer: function(v, meta) {
                            meta.css = 'return'
                            return v;
                        }
                    },
                    {
                        header: 'С грузом,км',
                        dataIndex: 'WeightKm',
                        editor: {
                            xtype: 'numberfield',
                            allowDecimal: true,
                            decimalPrecision: 3,
                            selectOnFocus: true,
                            allowNegative: false
                        }
                    },
                    {
                        header: 'Тонн',
                        width: 60,
                        dataIndex: 'Weight',
                        editor: {
                            xtype: 'numberfield',
                            allowDecimal: true,
                            decimalPrecision: 3,
                            selectOnFocus: true,
                            allowNegative: false
                        }
                    },
                    {
                        header: 'Надбавки',
                        width: 150,
                        dataIndex: 'WaybillTaskNormIncreases',
                        editor: {
                            xtype: 'combo.NormIncreases'
                        },
                        renderer: function(v) {

                            if (v === undefined || v === "") return v;

                            if (!Ext.isArray(v) && Ext.isString(v)) {
                                v = (v + '').split(',');
                            }

                            var store = Transport.StoreMgr.getStore('NormIncrease', true);
                            var data = [];
                            Ext.iterate(v, function(e) {
                                var increase = store.getById(e).data;
                                data.push(String.format("{0} <b>{1}</b>%", increase.IncreaseName, increase.Percent));
                            });

                            return data.join('<br/>');

                        }
                    },
                    {
                        header: 'Расход ГСМ',
                        dataIndex: 'Consumption',
                        renderer: function(v, meta) {
                            meta.css = 'consumption'; return v;
                        },
                        editor: {
                            xtype: 'numberfield',
                            allowNegative: false,
                            allowDecimal: true,
                            decimalPrecision: 2,
                            selectOnFocus: true
                        }
                    },
                    {
                        header: 'Без учёта',
                        width: 60,
                        dataIndex: 'isUnaccounted',
                        xtype: 'checkcolumn',
                        checkHandler: (function(rec) { this.mainView._calcNormCons(rec); this.refreshMain(); }).createDelegate(this),
                        beforeCheck: (function() {
                            if (this.mainView.isWaybillClosed()) return false;
                        }).createDelegate(this)
                    }
                ]
            }),
            tbar: [
                '-', {
                    xtype: 'button.add',
                    handler: this.onAdd,
                    scope: this
                }, '-',
                {
                    xtype: 'button.delete',
                    handler: this.onDelete,
                    scope: this
                }, '-'
            ]

        });

        Transport.view.waybill.WaybillTask.superclass.initComponent.call(this);

        this.on({
            afterEdit: this.onAfterEdit,
            beforeEdit: this.onBeforeEdit,
            scope: this
        });

        this.store.on('remove', this.refreshMain, this);

    },

    onAdd: function(btn, ev) {

    if (this.mainView.isWaybillClosed()) return false;
        
        var main = this.mainView,
            vehicle = main.Vehicle,
            norms = vehicle.VehicleNorm,
            norm;


        if (norms.length < 1) return;

        Ext.iterate(norms, function(n) {
            if (n.isMain) {
                norm = n; return false;
            }
        });

        var cfg = {};

        if (norm) {
            cfg['VehicleNormId'] = norm.VehicleNormId;
        }


        Ext.apply(cfg, {
            TaskDate: this.mainView.WaybillProperty.getSource()['DepartureDate'] || new Date(),
            CustomerId: vehicle['CustomerId']
        });




        var r = Kdn.initRecord(new this.store.recordType(cfg));
        this.stopEditing();
        this.store.insert(0, r);

        if (norm) {
            this.onAfterEdit({ field: 'VehicleNormId', record: r, value: norm.VehicleNormId })
        }

        this.startEditing(0, 6);
    },

    onDelete: function(btn, ev) {

    if (this.mainView.isWaybillClosed()) return false;
    
        var index = this.getSelectionModel().getSelectedCell();
        if (!index) {
            return false;
        }
        var rec = this.store.getAt(index[0]);
        this.store.remove(rec);
    },

    onAfterEdit: function(e) {
        if (e.field == 'VehicleNormId') {

            var me = this,
            json = me.NormStore.getById(e.value).json,
            fuels = json.VehicleNormFuels,
            normIncreases = json.VehicleNormIncreases;


            if (Ext.isArray(normIncreases)) {
                normIncreases = normIncreases.join(',');
            }

            e.record.beginEdit();
            e.record.set('FuelId', fuels[0].FuelId);
            e.record.set('WaybillTaskNormIncreases', normIncreases || "");
            e.record.endEdit();

        }

        if (['VehicleNormId', 'WorkAmount', 'WaybillTaskNormIncreases', 'Weight', 'WeightKm'].indexOf(e.field) != -1) {
            this.mainView._calcNormCons(e.record);
            this.refreshMain();
        }

        if (e.field == 'FuelId') {
            this.refreshMain();
        }

    },
    onBeforeEdit: function(e) {

        if (this.mainView.isWaybillClosed()) {
            if (['CustomerId', 'TaskDate'].indexOf(e.field) == -1) return false;
        }


        if (e.field == 'FuelId') {

            if (!e.record.data.VehicleNormId) return false;

            var fuels = this.NormStore.getById(e.record.data.VehicleNormId).json.VehicleNormFuels;

            if (fuels.length <= 1) return false;
            else {
                this.FuelStore.loadData({ data: fuels }, false);
            }
        }

        else if (e.field == 'Consumption') {
            return false;
        }
    },

    refreshMain: function() {

        if (this.mainView) {
            this.mainView.refreshNormConsumption();
            this.mainView.refreshDiff();
            this.mainView.refreshCounters();
        }
    }

});

Ext.reg('view.waybill.WaybillTask', Transport.view.waybill.WaybillTask);
*/