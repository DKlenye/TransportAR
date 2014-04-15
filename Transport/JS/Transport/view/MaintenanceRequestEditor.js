T.view.MaintenanceRequestEditor = Ext.extend(Kdn.editor.ModelEditor, {
   
   initComponent:function(){
       T.view.MaintenanceRequestEditor.superclass.initComponent.call(this);
	   this.on('editorfind',this.onEditorFind,this);
	},
	
	onEditorFind:function(e){
	   var prop = e.editors[0];
	   
	   prop.on({
	      propertychange:this.onPropertyChange,
	      scope:this
	   });

	    prop.setProperty("RequestDate", prop.getSource()["RequestDate"] || new Date());
	    
        if (!this.record) {
            var o = {};
            this.grid.getTopToolbar().items.each(function(e) {

                if (e.dataIndex) {
                    o[e.dataIndex] = e.getValue();
                }

            });

            prop.setProperty("Department", o.department);
        }
        
	},

	onPropertyChange: function(source, recordId, value, oldValue) {
	    var prop = this.editors[0];
	
        if (recordId == "Car" && !prop.record && !source["MaintenanceRequestId"]) {
            var params = {
                VehicleId: source.Car.VehicleId
            };
            this.getEl().mask('Загрузка', 'x-mask-loading');
            Kdn.Direct.MaintenanceInfoRead(params, this.onInfoLoad.createDelegate(this));
        }
    },

    onInfoLoad: function(e) {
        var prop = this.editors[0];

        prop.setProperty("Driver", e["Driver"]);
        prop.setProperty("Km", e["Km"]);
        prop.setProperty("FuelRemain", e["FuelRemain"]);
        this.getEl().unmask();
    }


});

Ext.reg('view.maintenancerequesteditor', T.view.MaintenanceRequestEditor);