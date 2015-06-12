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

            //printWindow.document.addEventListener("keydown", function () { printWindow.close(); }, false);

            console.log(html,new Date().format("s:u"));

            setTimeout(function() {
                console.log('print', new Date().format("s:u"));
                printWindow.print();
                console.log('afterprint', new Date().format("s:u"));
                setTimeout(function () { printWindow.close(); console.log('close', new Date().format("s:u")); }, 1000);
               //printWindow.document.addEventListener("mousemove", closeFn, false);
            }, 500);
           //--disable-print-preview
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