T.view.report.ForwardDrivers = Ext.extend(Kdn.view.Report, {
    
    reportName:'ForwardDrivers',
    params:[
         '-',
            'C:',
            {
               xtype:'datefield',
               dataIndex:'d1',
               value:new Date(),
               width:120
            },
            '-',
            'По:',
            {
               xtype:'datefield',
               dataIndex:'d2',
               value:new Date(),
               width:120
            }
    ]

});

Ext.reg('view.report.forwarddrivers', T.view.report.ForwardDrivers);