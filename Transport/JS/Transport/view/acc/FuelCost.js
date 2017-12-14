T.view.acc.FuelCost = Ext.extend(Ext.Panel, {
    requireModels:'Fuel,Accounting,RefuellingPlace',
    constructor: function(cfg) {
        cfg = cfg || {};
        
        
        var fuelCostStore = new Ext.data.DirectStore({
           autoSave:true,
           autoDestroy:true,
           writer:new Ext.data.JsonWriter({
               encode: false,
               writeAllFields: true
           }),
           api:{
               read:Kdn.Direct.FuelCostRead,
               update:Kdn.Direct.FuelCostSave,
               create:Kdn.Direct.FuelCostSave
           },
           fields:['AccPeriod','AccountingId','FuelId','RefuellingPlaceId','Quantity','Cost','Diff'],
           root: 'data'
        }); 
        
        
        fuelCostStore.on({
            scope:this,
            save:function(){
               this.fuelCalculatePriceStore.reload({params:this.getParams()});
            }
        });
        
        
        var fuelCalculatePriceStore = new Ext.data.DirectStore({
           autoSave:true,
           autoDestroy:true,
           directFn:Kdn.Direct.AccFuelPriceCalculate,
           fields:['AccPeriod','AccountingId','FuelId','RemainQuantity','RemainCost','Diff','RefuellingQuantity','FilledCost','CalculatePrice'],
           root: 'data'
        });
        
        var fuelPriceStore = new Ext.data.DirectStore({
           autoSave:true,
           autoDestroy:true,
           writer:new Ext.data.JsonWriter({
               encode: false,
               writeAllFields: true
           }),
           api:{
               read:Kdn.Direct.AccFuelPriceRead,
               update:Kdn.Direct.AccFuelPriceSave,
               create:Kdn.Direct.AccFuelPriceSave
           },
           fields:['AccPeriod','AccountingId','FuelId','Price','RetailPrice'],
           root: 'data'
        });
        
        
        Ext.apply(cfg, {   
        
            fuelCostStore: fuelCostStore,
            fuelPriceStore: fuelPriceStore,
            fuelCalculatePriceStore:fuelCalculatePriceStore,
        
            layout:'vbox',
            layoutConfig: {
                align : 'stretch',
                pack  : 'start'
            },
            tbar:[
               '-',
               {
                   text: 'Обновить',
                   iconCls: 'icon-refresh',
                   scope: this,
                   handler:this.reload
               },
               '-',
               {
                  xtype:'datefield',
                  plugins:'monthPickerPlugin',
                  format:'F Y',
                  value:new Date().add(Date.MONTH,-1),
                  width:130,
                  listeners:{
                     scope:this,
                     select:this.reload       
                  },
                  dataIndex:'period'
               },
               '-',
               {
                  xtype:'combo.accounting',
                  objectValue:false,
                  width:200,
                  listeners:{
                     scope:this,
                     select:this.reload     
                  },
                  dataIndex:'accounting'
               }
               
            ],
            
            items:[
               {
                  xtype:'container',
                  layout:'hbox',
                  flex:3,
                  margins:'3 3 0 3',
	               layoutConfig: {
	                  align: 'stretch',
	                  pack: 'start'
	               },
	               items:[
	                  {
	                     flex:4,
                        xtype:'editorgrid',
                        title:'Стоимость заправленного топлива',
                        loadMask:true,
                        columnLines:true,
                        stripeRows:true,
                        store:fuelCostStore,
                        columns:[
                           {
                              header:'Топливо',
                              dataIndex:'FuelId',
                              width:150,
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
                              header:'Место заправки',
                              dataIndex:'RefuellingPlaceId',
                              width:200,
                              renderer:function(o){
                                    if(!o) return o;
                                    var store = Kdn.ModelFactory.getStore('RefuellingPlace'),
                                       rec = store.getById(o);
                                    if(rec){
                                       return rec.data.RefuellingPlaceName
                                    }
                                    return o;
                                }  
                           },
                           {
                              header:'Количество,л',
                              align:'center',
                              dataIndex:'Quantity',
                              xtype:'numbercolumn',
                              format:'0,000.00'
                           },
                           {
                              header:'Стоимость, р',
                              align:'center',
                              dataIndex:'Cost',
                              width:130,
                              xtype:'numbercolumn',
                              format:'0,000.00',
                              editor:{
                                  xtype: 'numberfield',
                                  decimalPrecision: 2
                              }
                           },
                           {
                              header:'Отклонения, р',
                              align:'center',
                              dataIndex:'Diff',
                              width:130,
                              xtype:'numbercolumn',
                              format:'0,000.00',
                              editor:{
                                  xtype: 'numberfield',
                                  decimalPrecision:2
                              }
                           }
                        ] 
                     },
                     {
                        xtype:'editorgrid',
                        loadMask:true,
                        columnLines:true,
                        stripeRows:true,
                         viewConfig:{
                           forceFit:true
                        },
                        store:fuelPriceStore,
                        title:'Цены на топливо',
                        flex:2,
                        margins:'0 0 0 3',
                        columns:[
                           {
                              header:'Топливо', 
                              dataIndex:'FuelId',
                              width:150,
                              fixed:true,
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
                              header:'Учётная, руб',
                              dataIndex:'Price',
                              align:'center',
                              editor:{xtype:'numberfield'}
                           },
                           {
                              header:'Розничная , руб',
                              dataIndex:'RetailPrice',
                              align:'center',
                              editor:{xtype:'numberfield'}
                           }
                        ]
                     }  
	               ]
               },               
               {
                  flex:2,
                  xtype:'grid',
                  margins:'3 3 3 3',
                  viewConfig:{
                     forceFit:true
                  },
                  title:'Расчёт цен на топливо',
                  loadMask:true,
                  columnLines:true,
                  stripeRows:true,
                  store:fuelCalculatePriceStore,
                  columns:[
                     {
                        header:'Топливо',
                        dataIndex:'FuelId',
                        width:150,
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
                        header:'Остаток на начало, л',
                        dataIndex:'RemainQuantity',
                        align:'center'
                     },
                     {
                        header:'Остаток на начало, руб',
                        dataIndex:'RemainCost',
                        align:'center'
                     },
                     {
                        header:'Отклонения, руб',
                        dataIndex:'Diff',
                        align:'center'
                     },
                     {
                        header:'Заправлено, л',
                        dataIndex:'RefuellingQuantity',
                        align:'center'
                     },
                     {
                        header:'Заправлено, руб',
                        dataIndex:'FilledCost',
                        align:'center'
                     },
                     {
                        header:'Цена, руб',
                        dataIndex:'CalculatePrice',
                        align:'center'
                     }
                     
                     
                  ],
                  tbar:[
                     '->',
                     '-',
                     {
                        text:'Записать в справочник',
                        iconCls:'icon-arrow_up',
                        scope:this,
                        handler:function(){
                           
                           var priceMap={};
                           
                           this.fuelCalculatePriceStore.each(function(r){
                              priceMap[r.get('FuelId')]=r.get('CalculatePrice');
                           });
                           
                           this.fuelPriceStore.autoSave = false;
                           
                           this.fuelPriceStore.each(function(r){                              
                              if(priceMap[r.get('FuelId')] !=null){
                                 r.beginEdit();
                                 r.set('Price',priceMap[r.get('FuelId')]);
                                 r.endEdit();
                              }                                                           
                           });
                           
                           this.fuelPriceStore.autoSave = true;
                           this.fuelPriceStore.save();
                                                                                 
                        }
                     },
                     '-'
                  ]
               }
            ]
            
        });

        T.view.acc.FuelCost.superclass.constructor.call(this, cfg);
    },
    
    
    getParams:function(){
      var tbar = this.getTopToolbar();
      var params = {};     
        tbar.items.each(function(i){
            if (i.dataIndex){
               params[i.dataIndex]=i.getValue(); 
            }         
        });
     
     return params;
      
    },
    
    reload:function(){     
     var params = this.getParams();
     this.fuelCostStore.reload({params:params});
     this.fuelCalculatePriceStore.reload({params:params});
     this.fuelPriceStore.reload({params:params});
    }
    
    
});

Ext.reg('view.acc.fuelcost', T.view.acc.FuelCost);