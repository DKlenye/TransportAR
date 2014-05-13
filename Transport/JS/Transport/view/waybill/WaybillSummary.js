T.view.waybill.WaybillSumary = Ext.extend(Kdn.editor.LocalGrid, {
    constructor: function(cfg) {
                        
        cfg = cfg || {};
        Ext.apply(cfg, {
                    
            enableHdMenu:false,
            enableColumnResize:false,            
            enableColumnMove:false,
            tbar:null,
            colModel: new Ext.grid.ColumnModel({
            defaults:{
                  sortable:false                  
               },
               columns:[
                  {header:'Работа',dateIndex:'workName',width:260},
                  {header:'Всего',dateIndex:'amount',width:130},
                  {header:'По РБ',dateIndex:'BY',width:130}
               ]
            }),
            store:new Ext.data.JsonStore({
               fields:['workName','amount','BY'],
               autoDestroy:true
            }),
            loadMask:true
        });

        T.view.waybill.WaybillSumary.superclass.constructor.call(this, cfg);
    },
    
    refreshSummary:function(){
    
      var $ = this,
         main = $.mainView,
         taskStore = main.tasks.store,
         vehicle = main.vehicle,
         mc = new Ext.util.MixedCollection(),
         weight = [],
         weightKm = 0,
         tkm = 0;
      
         
      
      taskStore.each(function(task){
         var NormConsumptionId = task.get('NormConsumptionId');
         if(NormConsumptionId){
            var norm = vehicle.norms.get(NormConsumptionId);
            if (norm) {
            
                  var info = main.tasks.getConsumptionInfo(NormConsumptionId),
                      workId = info.work.get('WorkTypeId'),
                      workName = info.work.get('WorkTypeName');
                  
                  var workCache=null;
                  workCache =  mc.get(workId);
                   
                  if(!workCache) workCache=mc.add(workId,{workName:workName,amount:0,BY:null});               
                  workCache.amount +=Kdn.fixDecimal(task.get('WorkAmount')||0); 
                  
                  if(info.unit.get('WorkUnitId')==1){
                     if (task.get('BYkm') == null || task.get('BYkm') === '') {
                         workCache.BY = Kdn.fixDecimal((workCache.BY || 0) + (task.get('WorkAmount') || 0));
                     } else {
                        workCache.BY = Kdn.fixDecimal((workCache.BY || 0) + (task.get('BYkm') || 0));
                     }
                  }
                  
                  var _weight = task.get('Weight')||0; 
                  /*
                  if(_weight!=0 && weight.indexOf(_weight)==-1){
                     weight.push(_weight);
                 }*/

                  if (_weight != 0 && task.get('isLoad')) {
                      weight.push(_weight);
                  }
                  
                  
                  
                  
                  if(_weight!=0){
                     
                     weightKm+=(task.get('WeightKm')||0);
                     tkm += (task.get('WeightKm')||0)*_weight;                     
                  }
                       
            }            
         }         
      });
      
      var weightRezult = 0
      Ext.iterate(weight,function(i){
         weightRezult+=i;
      });
      
      
      var store = this.store;
      store.clearData();     
      
      mc.each(function(data){     
         store.add(new store.recordType(data));
      });
      
      if(weightRezult>0){
         store.add(new store.recordType({workName:'Перевезено тонн, т',amount:Kdn.fixDecimal(weightRezult,3),BY:null}));
         store.add(new store.recordType({workName:'Пробег с грузом, км',amount:Kdn.fixDecimal(weightKm,3),BY:null}));
         store.add(new store.recordType({workName:'Выполнено тонно-километров, ткм',amount:Kdn.fixDecimal(tkm,3),BY:null}));
      }
              
      var source = main.waybillproperty.getSource();            
      var DepartureDate = Kdn.parseDate(source.DepartureDate,source.DepartureTime);
      var ReturnDate = Kdn.parseDate(source.ReturnDate,source.ReturnTime);     
            
            
            
      var diffMinute = ((ReturnDate-DepartureDate)/(1000*60));
      
      var hour = Math.floor(diffMinute/60);
      var minute = Kdn.fixDecimal((diffMinute-hour*60),0);
      
      store.add(new store.recordType(
         {
            workName:'Время работы по факту, ч:мин',
            amount:String.format('{0}:{1}',hour,minute) ,
            BY:null
         }
      ));
     
      
    },
    
    
    setData:function(data){
      
      this.store.clearData();
        
    }
        
});

Ext.reg('view.waybill.waybillsummary', T.view.waybill.WaybillSumary);















