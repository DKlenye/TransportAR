T.view.acc.RcpAzs = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(cfg) {
        cfg = cfg || {};
                
        var RcpAzsStore = new Ext.data.DirectStore({
           autoSave:true,
           autoDestroy:true,
           api:{
               read:Kdn.Direct.RcpAzsRead
           },
           fields:['AccName','CardCode','RealDose','Price','NDSValue','SaleSum','DocDate','MarkName'],
           root: 'data'
        }); 
               
        
        Ext.apply(cfg, {   
        
            store: RcpAzsStore,
            loadMask:true,
            columnLines:true,
            stripeRows:true,
            
            plugins:[
				   'filterrow',
				   new Ext.ux.grid.GridSummary({position:'bottom'})
				],  
            
            columns:[
               {
                  header:'Принадлежность',
                  dataIndex:'AccName',
                  width:130,
                  filter:{}
               },
               {
                  header:'Дата',
                  dataIndex:'DocDate',
                  xtype:'datecolumn',
                  format:'d.m.Y H:i',
                  width:150
               },
               {
                  header:'Марка ГСМ',
                  dataIndex:'MarkName',
                  width:130,
                  filter:{}
               },
               {
                  header:'№ карты',
                  dataIndex:'CardCode',
                  filter:{}
               },
               {
                  header:'Кол-во, л',
                  dataIndex:'RealDose',
                  summaryType:'sum'
               },
               {
                  header:'Цена, руб',
                  dataIndex:'Price'
               },
               {
                  header:'НДС, руб',
                  dataIndex:'NDSValue',
                  summaryType:'sum'
               },
               {
                  header:'Сумма, руб',
                  dataIndex:'SaleSum',
                  summaryType:'sum'
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
                  value:new Date(),
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

        T.view.acc.RcpAzs.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
    
      this.on({
         afterrender:this.reload,
         scope:this,
         single:true
      });
    
      T.view.acc.RcpAzs.superclass.initComponent.call(this);      
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
    }
    
    
});

Ext.reg('view.acc.rcpazs', T.view.acc.RcpAzs);