T.view.TireSeasonReplaceEditor = Ext.extend(Kdn.editor.ModelEditor, {
    initComponent: function() {
        T.view.TireSeasonReplaceEditor.superclass.initComponent.call(this);
        this.on('editorfind', this.onEditorFind, this);
    },

    onEditorFind: function(e) {
        var prop = e.editors[0];

        prop.on({
            propertychange: this.onPropertyChange,
            scope: this
        });

        prop.setProperty("RemoveDate", new Date());


        this.firsLoadFlag = true;

        if (this.record) {
            this.firsLoadFlag = false;
        }

    },

    onPropertyChange: function(source, recordId, value, oldValue) {
        if (recordId == "Vehicle") {
            this.loadTireMovins(value);
        }
    },

    loadTireMovins:function(vehicle) {
        var me = this;

        var prop = this.editors[0];
        var editor = prop.customEditors['Tires'].field;
        var store = editor.store;


        prop.setProperty('Tires', null);

        
        Kdn.Direct.GetVehicleTires(vehicle, function (tires) {
            var data = me.buildMovingsData(tires);
            store.loadData(data, false);
            editor.setValue(prop.source['Tires']);
        });
    },

    
    buildMovingsData:function(tires) {

        var data = [];
        
        Ext.iterate(tires, function(tire) {
            var model='';
            if (tire.TireModel) {
                model = tire.TireModel.TireMakerName;
            }

            data.push({
                id: tire.TireId,
                tire:tire,
                name: String.format('{0} {1} {2} {3}', tire.FactoryNumber, model, tire.Size, tire.Season == 1 ? 'Летняя' : (tire.Season == 2 ? 'Зимняя' : ''))
            });
        });

        return data;
    }
    

});

Ext.reg('view.tireseasonreplaceeditor', T.view.TireSeasonReplaceEditor);