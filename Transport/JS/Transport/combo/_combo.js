T.combo.buildCombo = function(modelName){   
      T.combo[modelName] = Ext.extend(Kdn.form.ComboBox, {
       initComponent: function() {
           Ext.applyIf(this, {
               displayField: modelName+'Name',
               valueField: modelName+'Id',
               store: Kdn.ModelFactory.getStore(modelName)
           });
           Kdn.form.ComboBox.prototype.initComponent.call(this);
       }
   });
   Ext.reg('combo.'+modelName.toLowerCase(), T.combo[modelName]);   
};

Ext.iterate([
   'BatteryType',
   'BatteryMaker',
   'Department',
   'Fuel',
   'RefuellingPlace',
   'Schedule',
   'WaybillType',
   'WorkType',
   'WorkUnit',
   'TireMaker',
   'TireStandard',
   'RoutePoint',
   'EcologyClass',
   'EngineType',
   'OilGroup',
   'RefuellingGroup',
   'Accounting',
   'AccGroup',
   'GroupRequest',
   'BatteryRemoveReason',
   'TireRemoveReason',
   'ServiceGroup'
],
T.combo.buildCombo);

