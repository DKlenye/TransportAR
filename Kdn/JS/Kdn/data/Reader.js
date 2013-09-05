Kdn.data.Reader = Ext.extend(Ext.data.JsonReader, {
    constructor: function(meta, recordType) {

        meta = meta || {};

        Ext.applyIf(meta, {
            root: 'data'
        });

        Kdn.data.Reader.superclass.constructor.call(this, meta, recordType || meta.fields);
    },

    createAccessor: function() {
        var re = /[\[\.]/;
        return function(expr) {
            try {
                return (re.test(expr)) ?
                new Function('obj', 'var o=null; try{ o = obj.' + expr + '}catch(ex){}return o;') :
                function(obj) {
                    return obj[expr];
                };
            } catch (e) { }
            return Ext.emptyFn;
        };
    } ()

});