T.view.report._12TRInfo = Ext.extend(Kdn.view.Report,{
   
   reportName:'12TRInfo',
   
   params:[
        '-',
        'Период:',
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period',
               value:new Date(),
               width:120
            },
          '-', 
            {
               xtype:'combo',
               width:200,
               typeAhead: true,
               triggerAction: 'all',
               lazyRender:true,
               mode: 'local',
               store: new Ext.data.ArrayStore({
                   fields: ['id','name'],
                   data: [[1,'Услуги (90 счёт)'],[2,'Услуги(заграница) счёт 90260160']]
                }),
                value:1,
                valueField: 'id',
                displayField: 'name', 
                dataIndex:'reportType'                
            }  
   ],
   
   buildReportParams:function(params){
        var p = {}; 
        p.month = params.period.getMonth()+1;
        p.year = params.period.getFullYear();
        p.reportType = params.reportType;
                
        return p;        
    }
        
});

Ext.reg('view.report.12trinfo', T.view.report._12TRInfo);