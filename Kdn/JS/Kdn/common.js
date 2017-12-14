Ext.BLANK_IMAGE_URL = "images/default/s.gif";

Kdn.removeStartMask = function(){
    Ext.get('loading').remove();
    Ext.fly('loading-mask').fadeOut({
        easing: 'easeOut',
        duration: 0.7,
        remove: true,
        useDisplay: false
    });
};

Kdn.clone = function(o, firstLevelOnly)
{
    if (!Ext.isDefined(o)) return o;
    var c = 'function' === typeof o.pop ? [] : {},p, v;
    for (p in o) {
        if (o.hasOwnProperty(p)) {
            v = o[p];
            if(Ext.isDate(v)) c[p] = v.clone();
            else if (v && 'object' === typeof v && !firstLevelOnly) c[p] = this.clone(v);
            else c[p] = v;
        }
    }
    return c;
};

Kdn.listRenderer = function(modelName, field, splitter) {

    var store = Kdn.ModelFactory.getStore(modelName);

    return function(v) {
        if (v == null || v == "") return "";

        else {
            var rezult = [];
            var itms = v.split(',');
            Ext.iterate(itms, function(i) {
                var itm = store.getById(i);
                if (itm) {
                    rezult.push(itm.data[field]);
                }
            }, this);
            return rezult.join(splitter || ",");

        }

    }

};


Kdn.CheckRenderer = function(v, p, record) {
    p.css += ' x-grid3-check-col-td';
    return String.format('<div class="x-grid3-check-col{0}">&#160;</div>', v ? '-on' : '');
};

Kdn.TrueFalseRenderer = function(v) { return v ? 'Да' : 'Нет' };


Ext.override(Ext.data.Record, {
    applyDefaults: function()
    {
        var data = {};
        this.fields.each(function(e)
        {
            if (e.defaultValue !== "")
            {
                data[e.name] = e.defaultValue;
            }
        });
        Ext.applyIf(this.data, data);        
        return this;
    }
});

            
            
Ext.override(Ext.data.Store,{
   min:function(property){
      var v;
      this.each(function(rec){
         var e = rec.data[property];
         if (!v) v=e;
         else v=(v<e?v:e);
      });
      return v;  
   },
   max:function(property){
      var v;
      this.each(function(rec){
         var e = rec.data[property];
         if (!v) v=e;
         else v=(v>e?v:e);
      });
      return v;      
   }
});

Kdn.fixDecimal = function(value, precision) {
   return parseFloat((value || 0).toFixed(Ext.isDefined(precision) ? precision : 2));
};

Kdn.getByCls=function(cls,el){
   el = el||Ext.getBody(); 
   var a = el.query('.'+cls);
   if(a.length>0){
      return Ext.getCmp(a[0].id);
   }
   return null;
};

Kdn.parseDate = function(date, time) {
   return Date.parseDate(String.format('{0} {1}', date.format('d.m.Y'), time), 'd.m.Y H:i');
};

Kdn.testFn = function(log){
   return function(){
      console.log(log,arguments);
   }
};

Kdn.mapItems = function(obj,propName){
  var map = new Ext.util.MixedCollection(),
      itemsFn = function(item){
         if(item[propName]) map.add(item[propName],item);
         objFn(item);
      },
      objFn = function(o){
         o=o||{};
         var items = o.fields||o.items;
         if(items && Ext.isIterable(items)){
            if (items.each) items.each(itemsFn);
            else Ext.each(items,itemsFn);
         }
      };  
   objFn(obj);
   return map;
};

Kdn.toArray = function(a) {
    return Ext.isDefined(a) ? (Ext.isArray(a) ? a : [a]) : a;
};



if (![].includes) {
    Array.prototype.includes = function (searchElement/*, fromIndex*/) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {
                k = 0;
            }
        }
        while (k < len) {
            var currentElement = O[k];
            if (searchElement === currentElement ||
               (searchElement !== searchElement && currentElement !== currentElement)
            ) {
                return true;
            }
            k++;
        }
        return false;
    };
}