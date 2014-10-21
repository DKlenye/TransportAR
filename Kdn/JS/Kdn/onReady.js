Ext.onReady(function() {

    var app = Kdn['Application'];

    Ext.QuickTips.init();

    Ext.Direct.addProvider(
        Ext.apply(Kdn.DirectProvider, {
            id: 'directprovider',
            timeout: 10 * 60 * 1000
        }
    ));

    var provider = Kdn.Direct;

    Ext.override(Kdn.data.DirectProxy, {
        api: {
            create: provider['Create'],
            read: provider['Read'],
            update: provider['Update'],
            destroy: provider['Destroy']
        }
    });

    Ext.Direct.getProvider('directprovider').on('data',
	    function(provider, e) {
	        if (e.type == 'exception') {
	            Ext.MessageBox.alert('Ошибка', e.message);
	        }
	    }
    );

	    var _user = Kdn.User;
	    delete Kdn.User;

        Kdn.getUser = function() {
            return Kdn.clone(_user);
        };


	    if (Kdn['Application']) {
         	        	    
	        Kdn['Application'] = new app({ menu: Kdn.Menu });
	        Kdn['Application'].start();
    }

    Kdn.removeStartMask.defer(150);
    Kdn.ChromeFrame();

});