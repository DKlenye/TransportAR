
Ext.override(Ext.ux.TabCloseMenu,{
	closeTabText: 'Закрыть вкладку',
    closeOtherTabsText: 'Закрыть все вкладки кроме этой',
    closeAllTabsText: 'Закрыть все вкладки'
});

Ext.override(Ext.CompositeElement, {
    getTextWidth: function() {
        var i, e, els = this.elements, result = 0;
        for(i = 0; e = Ext.get(els[i]); i++) {
            result = Math.max(result, e.getTextWidth.apply(e, arguments));
        }
        return result;
    }
});

Ext.override(Ext.grid.DateColumn,{
    format:'d.m.Y'
});

Ext.override(Ext.form.NumberField,{
    style:{
        'text-align': 'left'
    }
});

Ext.override(Ext.data.Store,{
   reload : function(o){
        o = o||{};
        o.params = o.params||{};
        if (this.lastOptions && this.lastOptions.params){
            Ext.applyIf(o.params,this.lastOptions.params)
        }        
        this.load(o);
   },
   
   hasChanges:function(){
      return this.modified.concat(this.removed).length>0;
   }   
   
});

Ext.override(Ext.form.TimeField,{
   format:'H:i'
});

Ext.override(Ext.form.DateField,{
   format:'d.m.Y' 
});

Date.monthNames$ = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
];

Date.formatCodes.K="Date.monthNames$[this.getMonth()]";


Ext.grid.ColumnModel.override({
  getTotalWidth: function(includeHidden) {
      var off = 0;
      if(!Ext.isDefined(Ext.isChrome19)){
        Ext.isChrome19 = /\bchrome\/19\b/.test(navigator.userAgent.toLowerCase());
      };
      if (Ext.isChrome19){
          off = 2;
      };
    if (!this.totalWidth) {
      this.totalWidth = 0;
      for (var i = 0, len = this.config.length; i < len; i++) {
        if (includeHidden || !this.isHidden(i)) {
          this.totalWidth += this.getColumnWidth(i)+off;
        };
      };
    };
    return this.totalWidth;
  }
});

Ext.override(Ext.data.Field, {
    allowBlank: false,
    defaultValue: null
});


Ext.override(Ext.data.Store,{

   singleSort: function(fieldName, dir) {

        var field = this.fields.get(fieldName) || fieldName;

        var name       = field.name || fieldName,
            sortInfo   = this.sortInfo || null,
            sortToggle = this.sortToggle ? this.sortToggle[name] : null;

        if (!dir) {
            if (sortInfo && sortInfo.field == name) { // toggle sort dir
                dir = (this.sortToggle[name] || 'ASC').toggle('ASC', 'DESC');
            } else {
                dir = field.sortDir || 'ASC';
            }
        }

        this.sortToggle[name] = dir;
        this.sortInfo = {field: name, direction: dir};
        this.hasMultiSort = false;

        if (this.remoteSort) {
            if (!this.load(this.lastOptions)) {
                if (sortToggle) {
                    this.sortToggle[name] = sortToggle;
                }
                if (sortInfo) {
                    this.sortInfo = sortInfo;
                }
            }
        } else {
            this.applySort();
            this.fireEvent('datachanged', this);
        }
        return true;
    },
    
    sortData : function() {
        var sortInfo  = this.hasMultiSort ? this.multiSortInfo : this.sortInfo,
            direction = sortInfo.direction || "ASC",
            sorters   = sortInfo.sorters,
            sortFns   = [];

        //if we just have a single sorter, pretend it's the first in an array
        if (!this.hasMultiSort) {
            sorters = [{direction: direction, field: sortInfo.field}];
        }

        //create a sorter function for each sorter field/direction combo
        for (var i=0, j = sorters.length; i < j; i++) {
            //если не маппинг, то сортируем по дефолту
            if(this.fields.get(sorters[i].field)){
               sortFns.push(this.createSortFunction(sorters[i].field, sorters[i].direction));
            }
            else{
               sortFns.push(this.createMappingSortFunction(sorters[i].field, sorters[i].direction))
            }
        }

        if (sortFns.length == 0) {
            return;
        }

        //the direction modifier is multiplied with the result of the sorting functions to provide overall sort direction
        //(as opposed to direction per field)
        var directionModifier = direction.toUpperCase() == "DESC" ? -1 : 1;

        //create a function which ORs each sorter together to enable multi-sort
        var fn = function(r1, r2) {
          var result = sortFns[0].call(this, r1, r2);

          //if we have more than one sorter, OR any additional sorter functions together
          if (sortFns.length > 1) {
              for (var i=1, j = sortFns.length; i < j; i++) {
                  result = result || sortFns[i].call(this, r1, r2);
              }
          }

          return directionModifier * result;
        };

        //sort the data
        this.data.sort(direction, fn);
        if (this.snapshot && this.snapshot != this.data) {
            this.snapshot.sort(direction, fn);
        }
    },
    
    createMappingSortFunction: function(field, direction) {
        direction = direction || "ASC";
        var directionModifier = direction.toUpperCase() == "DESC" ? -1 : 1;

        var map = function(rec){           
            
            var index = field,
            indexArray = index.split('.'),
            obj = rec.data;
      
            Ext.iterate(indexArray,function(i){
               if(obj && obj[i]){
                  obj = obj[i];
               }
               else {
                  obj = null
                  return false;
               }
            });     
            
            return obj;             
        }

        //create a comparison function. Takes 2 records, returns 1 if record 1 is greater,
        //-1 if record 2 is greater or 0 if they are equal
        return function(r1, r2) {
            var v1 = map(r1),
                v2 = map(r2);

            return directionModifier * (v1 > v2 ? 1 : (v1 < v2 ? -1 : 0));
        };
    }


});

Ext.override(Ext.grid.GridEditor,{
   alignment:'c-c?'
});



Ext.override(Ext.PagingToolbar,{
       doLoad : function(start){
        var o = {}, pn = this.getParams();
        o[pn.start] = start;
        o[pn.limit] = this.pageSize;
        if(this.fireEvent('beforechange', this, o) !== false){
            this.store.reload({params:o});
        }
    }
});



Ext.override( Ext.ux.grid.CheckColumn,{

   checkHandler: Ext.emptyFn,
   beforeCheck: Ext.EmptyFn,

       processEvent: function(name, e, grid, rowIndex, colIndex) {

           if (name == 'mousedown') {

               var record = grid.store.getAt(rowIndex);
               if (this.beforeCheck!=Ext.EmptyFn && this.beforeCheck(record)=== false) return false;
               
               if( this.checkHandler(record)!==false){
                  record.set(this.dataIndex, !record.data[this.dataIndex]);
               }
                              
               if(grid.focusTask){
                  grid.focusTask.delay.defer(50,grid.focusTask);
               }
               
               return false; // Cancel row selection.

           } else {
               return Ext.grid.ActionColumn.superclass.processEvent.apply(this, arguments);
           }
       }

});




Ext.override(Ext.grid.CellSelectionModel,{
   handleKeyDown : function(e){
        if(!e.isNavKeyPress()){
            return;
        }
         
        var k = e.getKey(),
            g = this.grid,
            s = this.selection,
            sm = this,
            walk = function(row, col, step){
                return g.walkCells(
                    row,
                    col,
                    step,
                    g.isEditor && g.editing ? sm.acceptsNav : sm.isSelectable, // *** handle tabbing while editorgrid is in edit mode
                    sm
                );
            },
            cell, newCell, r, c, ae;

        switch(k){
            case e.ESC:
            case e.PAGE_UP:
            case e.PAGE_DOWN:
                // do nothing
                break;
            default:
                // *** call e.stopEvent() only for non ESC, PAGE UP/DOWN KEYS
                e.stopEvent();
                break;
        }

        if(!s){
            cell = walk(0, 0, 1); // *** use private walk() function defined above
            if(cell){
                this.select(cell[0], cell[1]);
            }
            return;
        }

        cell = s.cell;  // currently selected cell
        r = cell[0];    // current row
        c = cell[1];    // current column
        
        if(!e.ctrlKey){        
           switch(k){
               case e.TAB:
                   if(e.shiftKey){
                       newCell = walk(r, c - 1, -1);
                   }else{
                       newCell = walk(r, c + 1, 1);
                   }
                   break;
               case e.DOWN:
                   newCell = walk(r + 1, c, 1);
                   break;
               case e.UP:
                   newCell = walk(r - 1, c, -1);
                   break;
               case e.RIGHT:
                   newCell = walk(r, c + 1, 1);
                   break;
               case e.LEFT:
                   newCell = walk(r, c - 1, -1);
                   break;
               case e.ENTER:
                   if (g.isEditor && !g.editing) {
                       g.startEditing(r, c);
                       return;
                   }
                   break;
           }
        }

        if(newCell){
            // *** reassign r & c variables to newly-selected cell's row and column
            r = newCell[0];
            c = newCell[1];

            this.select(r, c); // *** highlight newly-selected cell and update selection

            if(g.isEditor && g.editing){ // *** handle tabbing while editorgrid is in edit mode
                ae = g.activeEditor;
                if(ae && ae.field.triggerBlur){
                    // *** if activeEditor is a TriggerField, explicitly call its triggerBlur() method
                    ae.field.triggerBlur();
                }
                g.startEditing(r, c);
            }
        }
    }
});


Ext.override(Ext.grid.RowSelectionModel,{
onKeyPress : function(e, name){
      if(!e.ctrlKey){
           var up = name == 'up',
               method = up ? 'selectPrevious' : 'selectNext',
               add = up ? -1 : 1,
               last;
           if(!e.shiftKey || this.singleSelect){
               this[method](false);
           }else if(this.last !== false && this.lastActive !== false){
               last = this.last;
               this.selectRange(this.last,  this.lastActive + add);
               this.grid.getView().focusRow(this.lastActive);
               if(last !== false){
                   this.last = last;
               }
           }else{
              this.selectFirstRow();
           }
        }
    }
});


Ext.Msg.notify = function (title,msg){

if(Ext.isString(title)){
   return Ext.net.Notification.show({
      title:title,
      html:msg||""}
   );
}   
  else {
   return Ext.net.Notification.show(title);
  }
}



Ext.override(Ext.form.NumberField, {
    decimalSeparator: ",",
    initEvents: function() {
        var allowed = this.baseChars + '';
        if (this.allowDecimals) {
            allowed += ',.';
        }
        if (this.allowNegative) {
            allowed += '-';
        }
        allowed = Ext.escapeRe(allowed);
        this.maskRe = new RegExp('[' + allowed + ']');
        if (this.autoStripChars) {
            this.stripCharsRe = new RegExp('[^' + allowed + ']', 'gi');
        }

        Ext.form.NumberField.superclass.initEvents.call(this);
    }
}); 


/*
if(!Ext.isDefined(Ext.chromeVersion)){
    Ext.chromeVersion = Ext.isChrome ? parseInt((/chrome\/(\d{1,2})/).exec(navigator.userAgent.toLowerCase())[1],10) : NaN;
}


if(Ext.isChrome && Ext.chromeVersion > 18 && Ext.chromeVersion < 22) {
    Ext.override(Ext.grid.ColumnModel, {
        getTotalWidth: function (includeHidden) {
            if (!this.totalWidth) {
                var boxsizeadj = 2;
                this.totalWidth = 0;
                for (var i = 0, len = this.config.length; i < len; i++) {
                    if (includeHidden || !this.isHidden(i)) {
                        this.totalWidth += (this.getColumnWidth(i) + boxsizeadj);
                    }
                }
            }
            return this.totalWidth;
        }
    });

    Ext.onReady(function(){
        Ext.get(document.body).addClass('ext-chrome-fixes');
        Ext.util.CSS.createStyleSheet('@media screen and (-webkit-min-device-pixel-ratio:0) {.x-grid3-cell{box-sizing: border-box !important;}}', 'chrome-fixes-box-sizing');
    });
    */