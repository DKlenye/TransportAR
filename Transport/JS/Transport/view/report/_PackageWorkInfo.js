
T.view.report.PackageWorkInfo = Ext.extend(Kdn.view.Report, {

reportName: 'PackageWorkInfo',

params: [
        '№ пачки',
        {
            xtype:'numberfield',
            width:200,
            dataIndex: 'packageNumber'
        }
    ]

});

    Ext.reg('view.report.packageworkinfo', T.view.report.PackageWorkInfo);