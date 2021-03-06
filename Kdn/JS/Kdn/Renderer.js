(function()
{

    var url = "images/icons/";

    Kdn.Renderer = {
        
        url : "images/icons/",
        tpl : '<img style="{2}" src="{0}{1}.png"/>',

        getIconImage:function(name,style) {
            return String.format(this.tpl, this.url, name, style||"");
        },

        object: function(propName)
        {
            var fn = function(value, metaData, record, rowIndex, colIndex, store)
            {
                if (value && value[propName]) return value[propName];
                return null;
            };
            return fn;
        },
        store: function(model, propName)
        {
            var fn = function(v, metaData, record, rowIndex, colIndex, store)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore(model),
                   rec = store.getById(v);
                if (rec) return rec.get(propName);
                return null;
            };
            return fn;
        },

        icon: function(name, interceptor)
        {
            var tpl = '<img src="{0}{1}.png"/>  ';
            var fn = function(v, metaData, record, rowIndex, colIndex, store)
            {
                metaData.css = 'icon-cell';
                if (interceptor(v))
                {
                    return String.format(tpl, url, name)
                }
                return null;
            };
            return fn;
        },

        icons: function(fnName)
        {
            var tpl = '<img style="cursor:pointer" src="{0}{1}.png"/>';
            var fn = function(v, metaData, record, rowIndex, colIndex, store)
            {
                var name = fnName(v, record);
                if (name == null) return name;

                metaData.css = 'icon-cell';
                if (Ext.isObject(name)) {
                    return String.format(tpl, url, name.iconCls) + name.text;
                }
                return String.format(tpl, url, name);
            };
            return fn;
        }
        
    };
})();