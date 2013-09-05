T.view.report.WaybillByCustomers = Ext.extend(Kdn.view.Report,{
   
   reportName:'WaybillByCustomers',
   
   params:[
        '-',
        {
            xtype:'combo.multicustomer',
            width:500         
        },
        '-'
   ],
   
   buildReportParams:function(params){
        var p = {}; 
         console.log(params);                
        return p;        
    }
        
});

Ext.reg('view.report.waybillbycustomers', T.view.report.WaybillByCustomers);