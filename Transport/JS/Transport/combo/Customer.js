T.combo.Customer = Ext.extend(Kdn.form.ComboGrid, {
   listWidth:500,
   pageSize : 30,
   minHeight:400,
   minListWidth:500,

   getFilterFn:function(val){
     var er = Ext.escapeRe;
     var regexp =  new RegExp(er(String(val)),'i');  
      var regexp2 =  new RegExp('^'+er(String(val)),'i'); 
     
     return function(rec){
         return regexp.test(rec.get('CustomerName'))||regexp2.test(rec.get('SHZ'));
     }       
      
   },

   renderTpl:'[{CustomerId}] {CustomerName}',
      columns:[
         {
            dataIndex:'CustomerId',
            header:'Код',
            width:50,
            fixed:true
         },
         {
            dataIndex:'SHZ',
            header:'Шифр',
            width:50,
            fixed:true
         },
         {
            dataIndex:'CustomerName',
            header:'Наименование'
         },
         {
            dataIndex:'CostCode',
            header:'Код затрат',
            width:100,
            fixed:true
         }
      ],

      initComponent:function(){    
      
      var store = Kdn.ModelFactory.getModel('Customer').buildStore({
               autoDestroy: true,
               autoLoad:false,
               autoSave:false
            });
            
      var _store = Kdn.ModelFactory.getStore('Customer');
            
       _store.on({
        load:function(){
            var store = this.store;
            store.clearData();
            Kdn.ModelFactory.getStore('Customer').each(function(rec){
                 if(!rec.get('notActual')){
                    store.add(rec.copy());
                 }
              });
        },
        scope:this,
        single:true
      });      
      
      store.clearData();
            Kdn.ModelFactory.getStore('Customer').each(function(rec){
                 if(!rec.get('notActual')){
                    store.add(rec.copy());
                 }
              });
      
           
      
      Ext.apply(this,{
         store:store
      });
      T.combo.Customer.superclass.initComponent.call(this);
   } 
});

Ext.reg('combo.customer', T.combo.Customer);