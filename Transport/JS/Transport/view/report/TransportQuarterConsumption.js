T.view.report.TransportQuarterConsumption = Ext.extend(Kdn.view.Report,{

    reportName: 'TransportQuarterConsumption',
   
   params:[
        '-',
        'Квартал:',
            {
               xtype:'numberfield',
               dataIndex:'quarter',
               value: new Date().getPreviousQuarter(),
               baseChars: '1234',
               maxValue: 4,
               width:120
            },
          'Год:',
            {
                xtype: 'numberfield',
                dataIndex: 'year',
                value: new Date().getFullYear() - (new Date().getMonth()==0?1:0),
                width: 120 
            }
   ]
        
});

Ext.reg('view.report.transportquarterconsumption', T.view.report.TransportQuarterConsumption);
