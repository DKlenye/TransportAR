T.view.report.DriverFuelExcessDetails = Ext.extend(Kdn.view.Report, {

    reportName: 'DriverFuelExcessDetails',

    params: [
        '-',
            'Год:',
            {
                xtype: 'numberfield',
                width: 120,
                dataIndex:'year',
                value: new Date().getFullYear()
            },
            '-',
            {
                xtype: 'combo',
                width: 200,
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                store: new Ext.data.ArrayStore({
                    fields: ['id', 'name'],
                    data: [[1, 'Бухгалтерия ОАО"Нафтан"'], [2, 'Бухгалтерия ОАО"Полимир"']]
                }),
                value: 1,
                valueField: 'id',
                displayField: 'name',
                dataIndex: 'accountingId'
            }
   ]

});

Ext.reg('view.report.driverfuelexcessdetails', T.view.report.DriverFuelExcessDetails);