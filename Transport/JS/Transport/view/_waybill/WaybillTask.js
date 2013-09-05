T.view.waybill.WaybillTask = Ext.extend(Kdn.editor.LocalGrid, {

    constructor: function(cfg) {    
    
        var FuelEditor = Ext.create({
            xtype:'combo.fuel',                     
            store: Kdn.ModelFactory.getModel('Fuel').buildStore({
               autoDestroy: true,
               autoLoad:false,
               autoSave:false
            }),
            objectValue:false
        });
        
        
        var ConsumptionEditor = Ext.create({
            xtype:'kdn.form.combobox',
            displayField: 'display',
            valueField: 'id',
            objectValue:false,
            store:new Ext.data.JsonStore({
               autoDestroy: true,
               fields:['display','id']
            })
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
        
      
       
        
        cfg = cfg || {};
        Ext.apply(cfg, {
            FuelEditor:FuelEditor,
            ConsumptionEditor:ConsumptionEditor,
            IncreasesEditor:IncreasesEditor,     
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
                        width: 100,
                        xtype: 'datecolumn',
                        dataIndex: 'TaskDepartureDate',
                        editor: { xtype: 'kdn.form.datefield'}
                    },
                    {
                        header: 'Заказчик',
                        width: 170,
                        dataIndex: 'Customer',
                        editor:{xtype:'combo.customer'},
                        renderer: function(o,meta) {
                            meta['white-space']='normal';
                                                      
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
      
      this.store.on({
         scope:this,
         remove:this.refreshMain
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