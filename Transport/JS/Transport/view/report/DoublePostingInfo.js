T.view.report.DoublePostingInfo = Ext.extend(T.view.report.AccFuelObReport, {
    reportName: 'DoublePostingInfo',

    buildReportParams: function(params) {
        var p = {};
        p.month = params.period.getMonth() + 1;
        p.year = params.period.getFullYear();
        Ext.copyTo(p, params, 'accountingId');

        return p;
    }
});
Ext.reg('view.report.doublepostinginfo', T.view.report.DoublePostingInfo);
