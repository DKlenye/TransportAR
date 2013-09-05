T.view.User = Ext.extend(Kdn.view.User, {
    _getColumns: function() {
        var columns = T.view.User.superclass._getColumns.call(this);
        return columns.concat(
            {
                header: 'Подразделение',
                dataIndex: 'Owners',
                width: 150,
                editor:{xtype:'combo.multiowner'},
                renderer:function(o){
                           if(!o) return o;
                           var a = [],store = Kdn.ModelFactory.getStore('TransportOwner');
                           Ext.iterate(o,function(e){
                              a.push(store.getById(e).data.OwnerName);
                           });
                           return a.join('<br/>');                           
                           
               }
            });
    }
});

Ext.reg('kdn.view.user', T.view.User);