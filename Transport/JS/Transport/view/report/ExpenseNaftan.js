T.view.report.ExpenseNaftan = Ext.extend(T.view.report.AccFuelObReport, {
    reportName: 'ExpenseNaftan',

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        p.ownerId = 1;
        Ext.copyTo(p, params, 'accountingId');

        return p;
    }
});
Ext.reg('view.report.expensenaftan', T.view.report.ExpenseNaftan);
