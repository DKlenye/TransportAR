Kdn.grid.PagingRowSelModel = Ext.extend(Ext.grid.RowSelectionModel, {
   initEvents:function(){
   Kdn.grid.PagingRowSelModel.superclass.initEvents.call(this);    
    this.grid.getView().on('page',this.clearSelections,this); 
    Ext.apply(this.rowNav,{
        pageUp:this.selectPreviousPage,
        pageDown:this.selectNextPage,
        home:this.selectFirstPage,
        end:this.selectLastPage
    });
   },
   fixIndex:function(index){
        var v = this.grid.view;
        return  v.cursor*v.pageSize+index;
   },
   
   fixRecIndex:function(index){
        var v = this.grid.view;
        return index-v.cursor*v.pageSize;
   },
   
   selectRow : function(index, keepExisting, preventViewNotify){
        if(this.isLocked() || (index < 0 || index >= this.grid.store.getCount()) || (keepExisting && this.isSelected(index))){
            return;
        }
        
        var _index= this.fixIndex(index);
        
        var r = this.grid.store.getAt(_index);
        if(r && this.fireEvent('beforerowselect', this, index, keepExisting, r) !== false){
            if(!keepExisting || this.singleSelect){
                this.clearSelections();
            }
            this.selections.add(r);
            this.last = this.lastActive = index;
            if(!preventViewNotify){
                this.grid.getView().onRowSelect(index);
            }
            if(!this.silent){
                this.fireEvent('rowselect', this, index, r);
                this.fireEvent('selectionchange', this);
            }
        }
    },
    
    deselectRow : function(index, preventViewNotify){
        if(this.isLocked()){
            return;
        }
        if(this.last == index){
            this.last = false;
        }
        if(this.lastActive == index){
            this.lastActive = false;
        }
        
        var _index= this.fixIndex(index);
        
        var r = this.grid.store.getAt(_index);
        if(r){
            this.selections.remove(r);
            if(!preventViewNotify){
                this.grid.getView().onRowDeselect(index);
            }
            this.fireEvent('rowdeselect', this, index, r);
            this.fireEvent('selectionchange', this);
        }
    },
     handleMouseDown : function(g, rowIndex, e){
        if(e.button !== 0 || this.isLocked()){
            return;
        }
        var view = this.grid.getView();
        if(e.shiftKey && !this.singleSelect && this.last !== false){
            var last = this.last;
            this.selectRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last
            view.focusRow(rowIndex);
        }else{
            var isSelected = this.isSelected(rowIndex);
            if(e.ctrlKey && isSelected){
                this.deselectRow(rowIndex);
            }else if(!isSelected || this.getCount() > 1){
                this.selectRow(rowIndex, e.ctrlKey || e.shiftKey);
                view.focusRow(rowIndex);
            }
        }
    },
    clearSelections : function(fast){
        if(this.isLocked()){
            return;
        }
        if(fast !== true){
            var ds = this.grid.store,
                s = this.selections;
            s.each(function(r){
                this.deselectRow(this.fixRecIndex(ds.indexOfId(r.id)));
            }, this);
            s.clear();
        }else{
            this.selections.clear();
        }
        this.last = false;
    },
    selectAll : function(){
        if(this.isLocked()){
            return;
        }
        this.selections.clear();
        
        var j = this.getCursorCount();
                 
        for(var i = 0;i < j; i++){
            this.selectRow(i, true);
        }
    },
    isSelected : function(index){
        var r = Ext.isNumber(index) ? this.grid.store.getAt(this.fixIndex(index)) : index;
        return (r && this.selections.key(r.id) ? true : false);
    },
    hasNext : function(){
        return this.last !== false && (this.last+1) < this.getCursorCount();
    },
    
    getCursorCount:function(){
        var v = this.grid.view,
            j = v.total-v.cursor*v.pageSize;
        j = j>v.pageSize?v.pageSize:j;
        return j;
    },
    selectLastRow : function(keepExisting){
        this.selectRow(this.getCursorCount() - 1, keepExisting);
    },
    selectRecords : function(records, keepExisting){
        if(!keepExisting){
            this.clearSelections();
        }
        var ds = this.grid.store,
            i = 0,
            len = records.length;
        for(; i < len; i++){
            this.selectRow(this.fixRecIndex(ds.indexOf(records[i])), true);
        }
    },
    
    /////////////////////
    
    hasNextPage:function(){
        with(this.grid.view){
            return cursor+1<getPageCount()
        }
    },
    hasPreviousPage:function(){
        return this.grid.view.cursor!=0;
    },
    
     selectNext : function(keepExisting){
        if(this.hasNext()){
            this.selectRow(this.last+1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }      
        return this.selectNextPage();
    },
    
    selectNextPage:function(){
        if(this.hasNextPage()){
            this.grid.view.nextPage();
            this.selectFirstRow();
            return true;
        }
        return false;
    },
    
    selectPrevious : function(keepExisting){
        if(this.hasPrevious()){
            this.selectRow(this.last-1, keepExisting);
            this.grid.getView().focusRow(this.last);
            return true;
        }
        return this.selectPreviousPage();
    },
    selectPreviousPage:function(){
        if(this.hasPreviousPage()){
            this.grid.view.prevPage();
            this.selectLastRow();
            return true;
        }
        return false;
    },
    selectFirstPage:function(){
        this.grid.view.firstPage();
        this.selectFirstRow();
    },
    selectLastPage:function(){
        this.grid.view.lastPage();
        this.selectLastRow();
    }
    
});