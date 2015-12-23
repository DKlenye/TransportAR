T.combo.Car2 = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:760,
   pageSize : 20,
   minHeight:600,
   minListWidth:550,
   
   getFilterFn:function(val){
     var er = Ext.escapeRe;
     var regexp =  new RegExp(er(String(val)),'i');
     
     return function(rec){
         var gn = rec.get('GarageNumber');         
         return regexp.test(gn);     
     }       
   },

 //renderTpl: '[{GarageNumber}] {Model} {RegistrationNumber} {PolymirSHU}',

 renderTpl: function (e) {

     var store = Kdn.ModelFactory.getStore('TransportColumn');
     
     if (e) {

         var column = store.getById(e.ColumnId);
         var columnName = '';

         if (column) columnName = column.get('ColumnName');

         return String.format('[{0}] {1} {2} {3}',
             e.GarageNumber,
             e.Model,
             e.RegistrationNumber,
             columnName
         );
     }
     return '';
 },

   columns: [
               {
                   dataIndex: 'GarageNumber',
                   header: 'Гаражный №',
                   width: 110,
                   fixed: true
               },
               {
                   dataIndex: 'Model',
                   header: 'Марка'
               },
               {
                   dataIndex: 'RegistrationNumber',
                   header: 'Гос. №',
                   width: 100,
                   fixed: true
               },
               {
                   dataIndex: 'InventoryNumber',
                   header: 'Инв. №',
                   width: 100,
                   fixed: true
               },
               {
                   dataIndex: 'ColumnId',
                   header: 'Колонна',
                   width: 200,
                   fixed: true,
                   renderer:Kdn.Renderer.store("TransportColumn","ColumnName")
               }
            ],
   initComponent:function(){
      
      Ext.apply(this,{
         store:Kdn.ModelFactory.getStore('Car')
      });
      T.combo.Car2.superclass.initComponent.call(this);
   }   
});
   

Ext.reg('combo.car2', T.combo.Car2);