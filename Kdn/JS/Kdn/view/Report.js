Kdn.view.Report =Ext.extend(Kdn.app.TabItem, {
    reportName:'',
    params:[],
    afterParams:[],
    
    initComponent:function(){
      
      
      var tbar = this.params;

        var defaultItems = [
            '-',
            {
                text: 'Открыть',
                iconCls: 'icon-blue-document-word',
                handler: this.report,
                scope: this
            },
            '-',
            {
                xtype: 'tbspacer',
                width: 50
            },
            {
                xtype: 'combo',
                width: 70,
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                store: new Ext.data.ArrayStore({
                    fields: ['format'],
                    data: [['Excel'], ['Word'], ['Pdf']]
                }),
                value: 'Excel',
                valueField: 'format',
                displayField: 'format',
                dataIndex: 'format'
            },
            {
                text: 'Сохранить',
                iconCls: 'icon-save',
                handler: this.reportExport,
                scope: this
            }
        ];


        Ext.apply(this, {
            layout: 'form',
            bodyCfg: {
                tag: 'iframe',
                src: 'about:blank',
                style: {
                    'background-color': 'white'
                }
            },
            reporter:Kdn.Reporter,
            tbar: tbar.concat(defaultItems).concat(this.afterParams)
    });
      
     Kdn.view.Report.superclass.initComponent.call(this);
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
    
    goReport:function(params){
       this.getBody().dom.src = this.reporter.getUrl(this.reportName, params);
    },
    
    report:function(){
        this.goReport(this.getReportParams());      
    },
    
    reportExport:function(){    
        var params = this.getReportParams();
        var format = params.format;

        delete p.format;

        this.reporter.exportReport(
            this.reportName,
            params,
            format
        );
    }

});

Ext.reg('kdn.view.report', Kdn.view.Report);