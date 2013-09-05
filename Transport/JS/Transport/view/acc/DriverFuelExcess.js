T.view.acc.DriverFuelExcess = Ext.extend(Ext.grid.GridPanel, {
    requireModels:'Accounting',
    constructor: function(cfg) {
        cfg = cfg || {};
                
        var ExcessStore = new Ext.data.DirectStore({
           autoSave:true,
           autoDestroy:true,
           writer:new Ext.data.JsonWriter({
               encode: false,
               writeAllFields: true
           }),
           api:{
               read:Kdn.Direct.DriverFuelExcessRead,
               update:Kdn.Direct.DriverFuelExcesssUpdate
           },
           fields:['AccountingId','DriverId','AccPeriod','Department','EmployeeNumber','Fio','Cost',
            {
               name:'SalaryPeriod',
               allowBlank:true
            }
           ],
           root: 'data'
        }); 
        
                
        
        Ext.apply(cfg, {   
        
            store: ExcessStore,
            loadMask:true,
            columnLines:true,
            stripeRows:true,
            
            plugins:[
				   'filterrow',
				   new Ext.ux.grid.GridSummary({position:'bottom'})
				],            
            columns:[
               {
                  header:'Период расхода',
                  dataIndex:'AccPeriod',
                  width:150,
                  renderer:function(e){
                     if (!e) return e;                     
                     return Date.parseDate(e+'01','Ymd').format('F Yг.');
                  }
               },
               {
                  header:'Цех',
                  dataIndex:'Department',
                  width:100,
                  filter:{
							test:function(f,v){
								if (f.length==0) return true;
								return f==v||"0"+f==v;
							}
						}
               },
               {
                  header:'Таб.№',
                  dataIndex:'EmployeeNumber',
                  filter:{}
               }, 
               {
                  header:'ФИО',
                  dataIndex:'Fio',
                  width:300,
                  filter:{}
               },
               {
                  header:'Сумма',
                  dataIndex:'Cost',
                  summaryType:'sum'
               },
               {
                  header:'Период удержания',
                  width:150,
                  dataIndex:'SalaryPeriod',
                  renderer:function(e){
                     if (!e) return e;                     
                     return Date.parseDate(e+'01','Ymd').format('F Yг.');
                  }
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
                  xtype:'button',
                  text:'Информация',
                  iconCls:'icon-blue-document-word', 
                  handler:function(){

                  var url = 'http://db2.lan.naftan.by/ReportServer/Pages/ReportViewer.aspx?/Transport/DriverFuelExcessInfo&rs:Command=Render&rc:Toolbar=false&'
                                      
                     var o = {};
                     this.getTopToolbar().items.each(function(e){ 
                     
                        if(e.dataIndex){
                           o[e.dataIndex]=e.getValue();
                        }
                                             
                     });
                                      
                     var params = {};                   
                     params['rs:Format']='Excel';
                     params.month = o.period.getMonth()+1;
                     params.year = o.period.getFullYear();
                     params.accountingId = o.accounting;
                                                                                           
                     location.href=url+Ext.urlEncode(params);
                     
                  },
                  scope:this
               },
               '-',
               {
                  xtype:'tbspacer',
                  width:20
               }, 
               '-',
               {
                  text:'Удержать',
                  handler:function(){
                     
                     var sel = this.getSelectionModel().getSelections();
                     var o = {};
                     this.getTopToolbar().items.each(function(e){
                        if(e.dataIndex){
                           o[e.dataIndex]=e.getValue();
                        }                                             
                     });
                                     
                                           
                                                           
                     Ext.iterate(sel,function(i){                     
                          i.beginEdit();
                          i.set('SalaryPeriod',o.period.add(Date.MONTH,1).format('Ym'));
                          i.endEdit();                     
                     });
                     
                     
                  },
                  scope:this
               },
               '-',
               {
                  text:'Снять удержание',
                  handler:function(){
                     
                     var sel = this.getSelectionModel().getSelections();
                                                           
                     Ext.iterate(sel,function(i){                     
                          i.beginEdit();
                          i.set('SalaryPeriod',null);
                          i.endEdit();                     
                     });
                     
                     
                  },
                  scope:this
               },     
               '-',
               '->',
               '-',
                {
                  xtype:'button',
                  text:'Ведомость',
                  iconCls:'icon-blue-document-word', 
                  handler:function(){

                  var url = 'http://db2.lan.naftan.by/ReportServer/Pages/ReportViewer.aspx?/Transport/DriverFuelExcessSheet&rs:Command=Render&rc:Toolbar=false&'
                                      
                     var o = {};
                     this.getTopToolbar().items.each(function(e){ 
                     
                        if(e.dataIndex){
                           o[e.dataIndex]=e.getValue();
                        }
                                             
                     });
                                      
                     var params = {};                   
                     params['rs:Format']='Excel';
                     
                     params.month = o.period.getMonth()+1;
                     params.year = o.period.getFullYear();
                    
                     if(params.month==12){
                        params.month=1;
                        params.year+=1;
                     }
                     else{
                         params.month+=1;
                     }
                     
                     
                     params.accountingId = o.accounting;
                                                                                           
                     location.href=url+Ext.urlEncode(params);
                     
                  },
                  scope:this
               },
               '-',
               {
                  text:'Передать в зарплату',
                  handler:function(){
                     Kdn.Direct.DriverFuelExcessSalarySend(this.getParams(),function(e){
                        Ext.Msg.alert('Сообщение',e);
                     });
                  },
                  scope:this
               },
               '-'
               
            ]
            
        });

        T.view.acc.DriverFuelExcess.superclass.constructor.call(this, cfg);
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

Ext.reg('view.acc.driverfuelexcess', T.view.acc.DriverFuelExcess);