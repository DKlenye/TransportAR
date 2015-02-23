Ext.define('Transport.overrides.DirectProxy', {
    override: 'Ext.data.proxy.Direct',

    doRequest: function (operation, callback, scope) {
        if (!this.api["read"]) {
            this.initApi();
        }

        return this.callParent(arguments);
    },

    initApi: function () {
        var modelName = this.model.modelName.split('.').pop();
        var controller = rpc[modelName + 'Controller'];
        if (controller) {
            this.api = Ext.copyTo({}, controller, 'create,read,update,destroy,get');
        }
    }
});