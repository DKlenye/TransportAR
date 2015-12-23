T.combo.Vehicle2 = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:530,
   pageSize : 30,
   minHeight:450,
   minListWidth:450,
   enableKeyEvents: true,
   getFilterFn: function (val) {
       var er = Ext.escapeRe;
       var regexp = new RegExp(er(String(val)), 'i');

       return function (rec) {
           var gn = rec.get('GarageNumber');
           return regexp.test(gn);
       }
   },
   renderTpl:'[{GarageNumber}] {Model} {RegistrationNumber}',
   columns:[
               {
                  dataIndex:'GarageNumber',
                  header:'Гаражный №',
                  width:110,
                  fixed:true
               },
               {
                  dataIndex:'Model',
                  header:'Марка'
               },
               {
                  dataIndex:'RegistrationNumber',
                  header:'Гос. №',
                  width:100,
                  fixed:true
               },
               {
                  dataIndex:'InventoryNumber',
                  header:'Инв. №',
                  width:100,
                  fixed:true
               }
            ],
    
    initComponent:function(){      
      Ext.apply(this,{
         store:Kdn.ModelFactory.getStore('BaseVehicle')
      });
      T.combo.Vehicle2.superclass.initComponent.call(this);
  }
   
});
   

Ext.reg('combo.vehicle2', T.combo.Vehicle2);