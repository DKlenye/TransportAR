T.view.report.NSTCarLimit = Ext.extend(Kdn.view.Report, {
   
    reportName: 'NSTCarLimit',
   
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

Ext.reg('view.report.nstcarlimit', T.view.report.NSTCarLimit);