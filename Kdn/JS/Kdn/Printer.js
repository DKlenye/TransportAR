(function()
{
    Kdn.Printer = {
    
        print: function(html) {

            var windowParams = [
                'menubar = 0',
                'location = 0',
                'resizable = no',
                'scrollbars=no',
                'status = 0',
                'width=' + screen.width,
                'height=' + screen.height
            ];

            
            var printWindow = window.open('', 'printer', windowParams.join(','));
            printWindow.document.write(html);
            printWindow.document.close();

            var checkWindowState = function() {
                if (printWindow.document.readyState == "complete") {
                    printWindow.close();
                } else {
                    checkWindowState.defer(700);
                }
            };

            setTimeout(function () { printWindow.print(); }, 100);
            setTimeout(function () { checkWindowState(); }, 100);
        },

        printWaybill: function (templateName, waybillId) {

            var url = Ext.urlAppend("print/" + templateName + ".aspx", Ext.urlEncode({ WaybillId: waybillId || 0 }));

            Ext.Ajax.request({
                url: url,
                method: 'GET',
                success: this.onWaybillTemplateLoad.createDelegate(this),
                failure: function (e) {
                    Ext.Msg.show({ width: 800, title: 'Ошибка', buttons: Ext.Msg.OK, msg: e.responseText });
                }
            });
        },

        onWaybillTemplateLoad:function(e) {
            this.print(e.responseText);
        }
    };
})();