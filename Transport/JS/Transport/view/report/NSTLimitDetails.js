T.view.report.NSTLimitDetails = Ext.extend(Kdn.view.Report, {
   
    reportName: 'NSTLimitDetails',
   
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
       'Подразделение',
       {
           xtype: 'combo.servicedepartment',
           dataIndex: 'DepartmentId',
           objectValue:false,
           width:300
       },
       '-',
        'Включая легковой транспорт',
        {
            labelWidth: 150,
            xtype: 'checkbox',
            dataIndex: 'includeCar',
            checked: true
        }
   ]
        
});

Ext.reg('view.report.nstlimitdetails', T.view.report.NSTLimitDetails);