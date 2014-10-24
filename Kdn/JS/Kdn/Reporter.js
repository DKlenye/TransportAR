(function() {

    var serverName = 'db2.lan.naftan.by',
        folderName = 'Transport',
        defaultParams = {
            "rs:Command": "Render",
            "rc:Toolbar": false,
            "rs:ClearSession": true
        },
        defaultExportFormat = 'excel';


    Kdn.Reporter = {
        getUrl: function(reportName, params) {

            var template = "http://{0}/ReportServer/Pages/ReportViewer.aspx?/{1}/{2}&{3}";

            params = params || {};

            Ext.apply(params, defaultParams);
            if (params.tbar === false) {
                delete params["rc:Toolbar"];
            }

            return String.format(template,
                serverName,
                folderName,
                reportName,
                Ext.urlEncode(params)
            );

        },

        exportReport: function(reportName, params, format) {
            var formatParams = {
                "rs:Format": format || defaultExportFormat
            };
            params = params || {};
            Ext.apply(params, formatParams);
            location.href = this.getUrl(reportName, params);
        }

    };
})();