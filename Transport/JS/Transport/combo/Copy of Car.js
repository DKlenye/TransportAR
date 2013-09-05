T.combo.Car = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:530,
   pageSize : 20,
   minHeight:600,
   minListWidth:450,
   valueField:'VehicleId',
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
         store:Kdn.ModelFactory.getStore('Car')
      });
      T.combo.Car.superclass.initComponent.call(this);
   }   
});
   

Ext.reg('combo.car', T.combo.Car);