T.view.acc.Posting = Ext.extend(Ext.grid.GridPanel, {
    requireModels:'Accounting',
    constructor: function(cfg) {
        cfg = cfg || {};
                
        var PostingStore = new Ext.data.DirectStore({
           autoSave:true,
           autoDestroy:true,
           api:{
               read:Kdn.Direct.AccPostingRead
           },
           fields:['Debet','Credit','Summ'],
           root: 'data'
        }); 
        
                
        
        Ext.apply(cfg, {   
        
            store: PostingStore,
            loadMask:true,
            columnLines:true,
            stripeRows:true,
            
            plugins:[
				   'filterrow',
				   new Ext.ux.grid.GridSummary({position:'bottom'})
				],  
            
            columns:[
               new Ext.grid.RowNumberer(),
               {
                  header:'Дебет',
                  dataIndex:'Debet',
                  filter:{}
               },
               {
                  header:'Кредит',
                  dataIndex:'Credit',
                  filter:{}
               },
               {
                  header:'Сумма',
                  dataIndex:'Summ',
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
               },
               {
                  xtype:'tbspacer',
                  width:20
               },
               '-',
               {
                  text:'Рассчитать', 
                  handler:function(){
                     Kdn.Direct.AccPostingCalculate(this.getParams());
                  },
                  scope:this
               },
               '-',
               {
                  xtype:'button',
                  text:'Мемориальный ордер',
                  iconCls:'icon-blue-document-word', 
                  handler:function(){

                     var o = {};
                     this.getTopToolbar().items.each(function(e){ 
                        if(e.dataIndex){
                           o[e.dataIndex]=e.getValue();
                        }
                     });
                                      
                     var params = {};                   
                     params.month = o.period.getMonth()+1;
                     params.year = o.period.getFullYear();
                     params.accountingId = o.accounting;

                      Kdn.Reporter.exportReport("AccPosting", params);
                  },
                  scope:this
               },
               '->',
               {
                  text:'Передать в балланс',
                  handler:function(){
                     Kdn.Direct.SendPostings(this.getParams(),function(e){
                        Ext.Msg.alert('Сообщение',e);
                     });
                  },
                  scope:this
               }
               
            ]
            
        });

        T.view.acc.Posting.superclass.constructor.call(this, cfg);
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

Ext.reg('view.acc.posting', T.view.acc.Posting);