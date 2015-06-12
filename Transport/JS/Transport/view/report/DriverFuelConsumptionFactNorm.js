T.view.report.DriverFuelConsumptionFactNorm = Ext.extend(Kdn.view.Report, {

    reportName: 'DriverFuelConsumptionFactNorm',
   
   params:[
        '-',
        'C:',
            {
                xtype: 'datefield',
                dataIndex: 'start',
                value: new Date(),
                width: 120
            },
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'end',
                value: new Date(),
                width: 120
            },
            '-',
            'Водитель',
       {
           xtype: 'combo.driver',
           enableClear:true,
           width:500,
           objectValue:false,
           dataIndex:'driverId'
       }
   ],

       buildReportParams: function (params) {
           var p = {};
           Ext.copyTo(p, params, 'start,end');

           if (params.driverId && params.driverId.DriverId) {
               p.driverId = params.driverId.DriverId;
           }
           
           return p;
       }
        
});

   Ext.reg('view.report.driverfuelconsumptionfactnorm', T.view.report.DriverFuelConsumptionFactNorm);
