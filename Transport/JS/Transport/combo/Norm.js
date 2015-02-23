T.combo.Norm = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:480,
   pageSize : 20,
   minHeight:200,
   minListWidth: 480,
   renderTpl: function(v) {
       if (v) {
            var tpl = '{1}л/{2}{3}{4} {0}';     
            var kmtm = "";
            if (v.MotoToMachineKoef != null && v.MotoToMachineKoef != 1) {
                kmtm = String.format("(К м.ч={0})", v.MotoToMachineKoef);
            }

            var str = String.format(tpl,
                v.WorkTypeName,
                v.Consumption,
                v.Coefficient,
                v.UnitName,
                kmtm
            );
            return str;
       } else
           return null;
   },
   columns: [
               {
                   dataIndex: 'WorkTypeName',
                   header: 'Тип работы',
                   width: 150
               },
               {
                   dataIndex: 'Coefficient',
                   header: 'Коэфиицент',
                   width: 100
               },
               {
                   dataIndex: 'UnitName',
                   header: 'Ед. изм.',
                   width: 70
               },
               {
                   dataIndex: 'Consumption',
                   header: 'Норма',
                   width: 110
               }
            ],

   initComponent:function(){
       var normStore = new Ext.data.DirectStore({
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
          store: normStore
      });
      T.combo.Norm.superclass.initComponent.call(this);
   }   
});


Ext.reg('combo.norm', T.combo.Norm);