
Kdn.data.ExtendParams = {};

Kdn.data.DirectProxy = Ext.extend(Ext.data.DirectProxy, {


    constructor: function(cfg) {
        cfg = cfg || {};
        cfg.api = cfg.api || this.api;
        Kdn.data.DirectProxy.superclass.constructor.call(this, cfg);
    },

/*
    request: function()
    {
      console.log(arguments);
      Kdn.data.DirectProxy.superclass.request.apply(this,arguments) 
   },
*/
    doRequest: function(action, rs, params, reader, callback, scope, options) {

        var args = [],
            directFn = this.api[action] || this.directFn;

        var dest = action == Ext.data.Api.actions.read ? params : params.jsonData;
        dest['typeName'] = scope.model.typeName;


        var ext = {};

        Ext.iterate(Kdn.data.ExtendParams, function(key, val, o) {
            ext[key] = (Ext.isFunction(val) ? val() : val);
        });

        Ext.apply(dest, ext);

        args.push(dest);

        var trans = {
            params: params || {},
            request: {
                callback: callback,
                scope: scope,
                arg: options
            },
            reader: reader
        };
        args.push(this.createCallback(action, rs, trans), this);
        directFn.apply(window, args);
    }
});