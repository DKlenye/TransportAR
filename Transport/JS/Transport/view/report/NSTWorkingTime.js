T.view.report.NSTWorkingTime = Ext.extend(Kdn.view.Report, {
   
    reportName: 'NSTWorkingTime',
   
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
            }
   ]
        
});

Ext.reg('view.report.nstworkingtime', T.view.report.NSTWorkingTime);