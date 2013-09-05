T.view.report.Expense78 = Ext.extend(T.view.report.AccFuelObReport, {
    reportName: 'Expense78',

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        p.ownerId = 1;
        Ext.copyTo(p, params, 'accountingId');

        return p;
    }
});
Ext.reg('view.report.expense78', T.view.report.Expense78);
