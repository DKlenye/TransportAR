T.modelCfg.Cfg = function()
{
   var m = Kdn.data.ModelCfg;
   
   Ext.apply(m,{
      /* Employee:{
         autoLoad:false
      }*/
   });
   
   Ext.apply(m,{
       Temperature:{
         sortInfo: {
             field: 'Date',
             direction: 'DESC' 
         }
      },
      WaybillType:{
         sortInfo: {
             field: 'WaybillTypeName',
             direction: 'ASC' 
         }
     },
     BodyType: {
         sortInfo: {
             field: 'BodyTypeName',
             direction: 'ASC'
         }
     },
      v_WaybillPackages:{
         sortInfo: {
             field: 'PackageTypeId',
             direction: 'ASC' 
         }
      },
      v_Request: {
          sortInfo: {
              field: 'RequestId',
              direction: 'DESC'
          }
      },
      MaintenanceRequest: {
        sortInfo: {
          field: 'MaintenanceRequestId',
          direction: 'DESC'
        }
      }
   });
   
   

};