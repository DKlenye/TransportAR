T.view.report.VehicleFuelRemainsByGarageNumber = Ext.extend(Kdn.view.Report,{

reportName: 'VehicleFuelRemainsByGarageNumber',
   
   params:[
        '-',
            'Период',
            {
            xtype: 'datefield',
            plugins: 'monthPickerPlugin',
            format: 'F Y',
            width: 200,
            dataIndex: 'period',
            value: new Date()
            },
          '-',
          'Гар.№:',
            {
               xtype:'textfield',              
               width:400,
               dataIndex:'garageNumber'
            }
   ],


            buildReportParams: function(params) {
                var p = {};
                p.month = params.period.getMonth() + 1;
                p.year = params.period.getFullYear();
                p.garageNumber = params.garageNumber;
                p.ownerId = 1;
                
                return p;
            }
        
});

Ext.reg('view.report.vehiclefuelremainsbygaragenumber', T.view.report.VehicleFuelRemainsByGarageNumber);