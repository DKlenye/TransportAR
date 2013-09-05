Kdn.view.Report =Ext.extend(Kdn.app.TabItem, {
    
    server:'db2.lan.naftan.by',
    reportName:'',
    params:[],
    
    initComponent:function(){
      
      
      var tbar = this.params;      
      
      var defaultItems = [
            '-',
            {
               text:'Открыть',
               iconCls:'icon-blue-document-word',
               handler:this.report,
               scope:this
            },
            '-',
            {
               xtype:'tbspacer',
               width:50
            },
            {
               xtype:'combo',
               width:70,
               typeAhead: true,
               triggerAction: 'all',
               lazyRender:true,
               mode: 'local',
               store: new Ext.data.ArrayStore({
                   fields: ['format'],
                   data: [['Excel'],['Word'],['Pdf']]
                }),
                value:'Excel',
                valueField: 'format',
                displayField: 'format',
                dataIndex:'format'                
            },
            {
               text:'Сохранить',
               iconCls:'icon-save',
               handler:this.reportExport,
               scope:this
            }
         
      ]
      
      
      
      
      Ext.apply(this,{
         layout:'form',
         bodyCfg: {
             tag: 'iframe',
             src: 'about:blank',
             style:{
               'background-color':'white'
             }
         },
         tbar:tbar.concat(defaultItems)
      });
      
     Kdn.view.Report.superclass.initComponent.call(this);
    },
            
    
    getUrl:function(params,withParameters){        
        var p = params||{};
        if(!withParameters===true){ 
           // p['rc:Parameters']=false;
            p['rc:Toolbar']=false;
            p['rs:ClearSession']=true;
        }                    
        return String.format("http://{0}/ReportServer/Pages/ReportViewer.aspx?/Transport/{1}&rs:Command=Render&{2}",this.server,this.reportName,Ext.urlEncode(p));
    },
    
    getParams:function(){
       var o = {};
        this.getTopToolbar().items.each(function(e){                   
            if(e.dataIndex){
                o[e.dataIndex]=e.getValue();
            }
                                          
        });
        return o;
    },
    
    getReportParams:function(){
               
        return this.buildReportParams(this.getParams());
                        
    },
    
    buildReportParams:function(params){
        return params;
    },
    
    
    goReport:function(o){
       delete o.format;
       this.getBody().dom.src= this.getUrl(o,false);
    },
    
    report:function(o){
        this.goReport(this.getReportParams());      
    },
    
    reportExport:function(){    
        var p = this.getReportParams();
        
        var _p = this.getParams();
        p['rs:Format']=_p.format;
        this.goReport(p);  
    }

});

Ext.reg('kdn.view.report', Kdn.view.Report);