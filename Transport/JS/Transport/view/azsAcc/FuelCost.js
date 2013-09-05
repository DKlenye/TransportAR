T.view.azsAcc.FuelCost = Ext.extend(Ext.grid.EditorGridPanel, {
    requireModels:'Fuel',
    constructor: function(cfg) {
        cfg = cfg || {};
                
        var store = new Ext.data.DirectStore({
           autoSave:true,
           autoDestroy:true,
           writer:new Ext.data.JsonWriter({
               encode: false,
               writeAllFields: true
           }),
           api:{
               read:Kdn.Direct.AzsFuelCostRead,
               update:Kdn.Direct.AzsFuelExciseSave,
               create:Kdn.Direct.AzsFuelExciseSave
           },
           fields:['AccYear','AccMonth','FuelId','FuelName','StartRemainLiter','StartRemainKg','StartSummRemain','IncomeVolume','IncomeMass','IncomeCost','Excise','PriceLiter','PriceKg'],
           root: 'data'
        }); 
        
        
        store.on({
            write:this.onStoreWrite,
            scope:this
        })
               
                
        
        Ext.apply(cfg, {  
            
            xtype:'editorgrid',
            columnLines:true,
            stripeRows:true,
            loadMask:true,   
            store:store,
            columns:[
                {
                     header:'Топливо',
                     dataIndex:'FuelName',
                     width:150,
                     renderer:function(a,meta){return '<b>'+a+'</b>'}
                 },                 
                 {
                        header:"Приход, руб",
						width:90,
						dataIndex:"IncomeCost"
                 },
                 {
                        header:"Акциз, руб",
						width:90,
						dataIndex:"Excise",
						editor:[
							{
								xtype:"numberfield"
							}
						],
						renderer:function(value, metaData, record, rowIndex, colIndex, store) {
									metaData.css="editedColumn"; return value;
					    }
                 },
                 {
                        header:"Приход, л",
						width:90,
						dataIndex:"IncomeVolume"
                 },
                 {
                        header:"Приход, кг",
						width:90,
						dataIndex:"IncomeMass"
                 },
                 {
                        header:"Остаток, руб",
						width:90,
						dataIndex:"StartSummRemain"
                 },
                 {
                        header:"Остаток, л",
						width:90,
						dataIndex:"StartRemainLiter"
                 },
                 {
                        header:"Остаток, кг",
						width:90,
						dataIndex:"StartRemainKg"
                 },
                 {
                        header:"Цена, л",
						width:90,
						dataIndex:"PriceLiter"
                 },
                 {
                        header:"Цена, кг",
						width:90,
						dataIndex:"PriceKg"
                 }                 
                 
            ],            
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
               '-'
               
            ]
            
        });

        T.view.azsAcc.FuelCost.superclass.constructor.call(this, cfg);
        
        this.reload();
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
     this.store.reload({params:params});
    },
    
    onStoreWrite:function(){
        this.reload();
    }
    
    
});

Ext.reg('view.azsacc.fuelcost', T.view.azsAcc.FuelCost);