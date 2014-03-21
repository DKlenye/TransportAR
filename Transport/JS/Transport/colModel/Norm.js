T.colModel.Norm = Ext.extend(Ext.grid.ColumnModel, {
   
  constructor:function(cfg){
      cfg = cfg||{};
      Ext.apply(cfg,{
         columns: ((cfg.columns||[]).concat(this.getColumns()))
      });
      T.colModel.Insurance.superclass.constructor.call(this,cfg);
   },
   
   getColumns:function() {

       var vehicleIncreases = Kdn.ModelFactory.getModel('VehicleIncrease').buildStore({
           autoSave: false
       });
   
      return [
                     {
                        dataIndex: 'NormId',
                        align: 'center',
                        header: 'Код',
                        width: 80,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'WorkTypeId',
                        header: 'Вид работы',
                        width: 200,
                        editor:{
                           xtype:'combo.worktype',
                           objectValue:false,
                           editable:true
                        },
                        renderer: function(o) {
                            if (!o && !Ext.isObject(o)) return null;
                            var store = Kdn.ModelFactory.getStore('WorkType'),
                                unitStore = Kdn.ModelFactory.getStore('WorkUnit'),
                                record = store.getById(o),
                                unit= unitStore.getById(record.get('WorkUnitId'));                              
                                if (record) return String.format("{0} (<span style='color:blue'>{1}</span>)",record.get('WorkTypeName'),unit.get('UnitName'));                              
                                return o;
                        }
                    },
                    
                    
                    {
                        dataIndex: 'CounterId',
                        header: 'Cчётчик',
                        width: 100,
                        renderer:function(v){
                           if(!v)return v;
                           var s = Kdn.ModelFactory.getStore('WorkCounter'),
                               r = s.getById(v);
                           if(r) return r.get('CounterName');
                           return null;
                        },
                        editor: { xtype: 'combo.workcounter',allowBlank:true,objectValue:false,enableClear:true }
                    },
                    {
                        dataIndex: 'MotoToMachineKoef',
                        header: 'К м.ч.',
                        width: 60,
                        editor:{
                           xtype:'kdn.editor.numberfield',allowBlank:true
                        }                     
                    },                    
                    {
                        dataIndex: 'isMain',
                        align: 'center',
                        header: 'Основная',
                        width: 100,
                        renderer:function(v) {
                            if (!Ext.isBoolean(v)) return v;
                            return (!!v) ? 'Да' : 'Нет';
                        },
                        editor : {
                           xtype:'kdn.editor.booleanfield'                           
                        }
                    },
                    {
                        dataIndex:'NormFuels',
                        header:'Топливо',
                        width: 100,
                        renderer:function(o){
                           if(!o) return o;
                           var a = [],store = Kdn.ModelFactory.getStore('Petrol');
                           Ext.iterate(o,function(e){
                              a.push(store.getById(e).data.FuelName);
                           });
                           return a.join('<br/>');                           
                           
                        },
                        editor:{
                           xtype:'combo.multifuel'
                        }
                    },
                    {
                        dataIndex:'MainFuelId',
                        header:'Осн. Топливо',
                        width: 110,
                        renderer: function(o) {
                            if (!o) return o;
                            var store = Kdn.ModelFactory.getStore('Fuel'),
                              rec = store.getById(o);
                            if (rec) {
                                return rec.data.FuelName;
                            }
                            return o;
                        },
                        editor: {
                            xtype: 'combo.petrol',
                            objectValue:false,
                            store: Kdn.ModelFactory.getModel('Petrol').buildStore({
                                autoDestroy: true,
                                autoLoad: false,
                                autoSave: false
                            })
                        }
                    },
                    {
                        dataIndex:'NormIncreases',
                        header:'Надбавки',
                        width: 200,
                        renderer:function(o,metaData, record, rowIndex, colIndex, store){
                           if(!o) return o;
                           var a = [],
                               vehicleId = record.get('Car').VehicleId,
                               tpl = '{0} {1}%',
                               sum = 0,
                               store = Kdn.ModelFactory.getStore('Increase');
                           
                           Ext.iterate(o,function(e){
                              var rec = store.getById(e);
                              var findId = vehicleId + "_" + rec.id;
                              var VIncrease = vehicleIncreases.getById(findId);

                               var increase = VIncrease ? VIncrease.get('Prcn') : rec.data.Prcn;

                               sum += increase;

                               a.push(String.format(tpl, rec.data.IncreaseName, increase));
                           });
                           
                           if (a.length>1){
                              a = a.concat(String.format('<b>Всего {0}%<b>',sum));
                           }                           
                           return a.join('<br/>');                         
                           
                        },
                        editor:{
                           xtype:'combo.multiincrease'
                        }                        
                    },
                    {
                        dataIndex:'NormConsumption',
                        header:'Норма, л',
                        width: 130,
                        renderer:function(a){
                           if(a && a.length>0){
                              return String.format('<b>{0}</b> (<span style="color:green;font-size:9pt;">{1}</span>)',a[0].Consumption,a[0].ConsumptionStartDate.format('d.m.Y'));
                           }
                           return a;
                        }
                    },
                    {
                     header:'Актуальна',
                     align:'center',
                     dataIndex:'Enabled',
                     xtype:'checkcolumn',
                     width:100
                  }
          ]
   }
   
});
