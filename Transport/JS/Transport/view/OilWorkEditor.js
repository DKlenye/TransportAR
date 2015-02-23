T.view.OilWorkEditor = Ext.extend(Kdn.editor.ModelEditor, {
   initComponent: function () {
        T.view.OilWorkEditor.superclass.initComponent.call(this);
        this.on('editorfind', this.onEditorFind, this);
        
    },

    //После инициализации editor-а, получаем идентификатор выбранного ТС
    onEditorFind: function (e) {
        if (!this.record) {
            var o = {};
            this.grid.getTopToolbar().items.each(function (e) {
                if (e.dataIndex) {
                    o[e.dataIndex] = e.getValue();
                }
            });
            this.VehicleId = o.vehicle.VehicleId;
        }
    },

    
    //Переопределяем метод commitChanges класса Kdn.editor.BaseModelEditor
    //для того чтобы в запись задать идентификатор выбраного ТС (актуально при добавлении данных)
    commitChanges:	function(){
      var me = this,
         record = this.getFillRecord(),
         store = me.grid.store,
         commitFn = 'commitChanges';

         record = record || new store.recordType();
            
         record.beginEdit();
         Ext.iterate(me.editors,function(e) {
             if (e[commitFn]) e[commitFn](record);
         });
         record.endEdit();
         record.data.VehicleId = this.VehicleId;
         
         if (!record['store']) store.insert(0, record);
              
         me.record = record;

         if (me.closeAfterSave) me.closeMe();
    }	

});

Ext.reg('view.oilworkeditor', T.view.OilWorkEditor);