T.combo.Norm = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:360,
   pageSize : 20,
   minHeight:200,
   minListWidth:360,
   


   renderTpl: '[{Consumption}] {WorkTypeName} {Coefficient}',
   columns: [
               {
                   dataIndex: 'Consumption',
                   header: 'Гаражный №',
                   width: 110,
                   fixed: true
               },
               {
                   dataIndex: 'WorkTypeName',
                   header: 'Марка'
               },
               {
                   dataIndex: 'UnitName',
                   header: 'Гос. №',
                   width: 100,
                   fixed: true
               },
               {
                   dataIndex: 'Coefficient',
                   header: 'Инв. №',
                   width: 100,
                   fixed: true
               }
            ],

   initComponent:function(){
       var NormStore = new Ext.data.DirectStore({
           api: {
               read: Kdn.Direct.GetVehicleNorms
           },
           idProperty: 'NormId',
           fields: [
                'NormId',
                'Consumption',
                'MotoToMachineKoef',
                'WorkTypeName',
                'UnitName',
                'Coefficient'
            ],
           root: 'data',
           baseParams: {
               VehicleId: this.VehicleId
           },
           autoLoad: true
       });
      Ext.apply(this,{
          store: NormStore
      });
      T.combo.Norm.superclass.initComponent.call(this);
   }   
});


Ext.reg('combo.norm', T.combo.Norm);