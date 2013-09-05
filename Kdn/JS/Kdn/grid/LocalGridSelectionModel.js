Kdn.grid.LocalGridSelectionModel = Ext.extend(Ext.grid.RowSelectionModel, {

   
   constructor : function(config){
   
      Kdn.grid.LocalGridSelectionModel.superclass.constructor.call(this,config);
   
      this.addEvents(
         'nofirst',
         'nolast' 
      );
   
   },
      
   selectNext : function(keepExisting){
        if(this.hasNext()){
            this.selectRow(this.last+1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }
        this.fireEvent('nolast', this);
        return false;
    },


    selectPrevious : function(keepExisting){
        if(this.hasPrevious()){
            this.selectRow(this.last-1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }
        this.fireEvent('nofirst', this);
        return false;
    }
   
   
   

});