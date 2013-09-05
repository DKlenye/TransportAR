Kdn.grid.LocalGridCellSelectionModel = Ext.extend(Ext.grid.CellSelectionModel, {
 
   constructor : function(config){
   
      Kdn.grid.LocalGridCellSelectionModel.superclass.constructor.call(this,config);
   
      this.addEvents(
         'nofirst',
         'nolast' 
      );
   
   },
   
   
   // private
    onEditorKey: function(field, e){
    
         var k = e.getKey();
    
        //if(k == e.TAB || k==e.LEFT){
            this.handleKeyDown(e);
        
    },

    /** @ignore */
    handleKeyDown : function(e){
        if(!e.isNavKeyPress()){
            return;
        }
        
                
        var k = e.getKey(),
            ctrl = e.ctrlKey,
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
        
        switch(k){
            case e.TAB:
                if(e.shiftKey){
                    newCell = walk(r, c - 1, -1);
                }else{
                    newCell = walk(r, c + 1, 1);
                }
                break;
            case e.DOWN:
                 if(!ctrl){
                  newCell = walk(r + 1, c, 1);
                 
                    if(newCell==null){
                      this.fireEvent('nolast', this);
                    }       
                 }
                break;
            case e.UP:
                 if(!ctrl){
                     newCell = walk(r - 1, c, -1);
                   if(newCell==null){
                      this.fireEvent('nofirst', this);
                    }
                 }
                break;
            case e.RIGHT:
                if(!ctrl) newCell = walk(r, c + 1, 1);
                break;
            case e.LEFT:
                if(!ctrl) newCell = walk(r, c - 1, -1);
                break;
            case e.ENTER:
                if (g.isEditor && !g.editing) {
                    g.startEditing(r, c);
                    return;
                }
                break;
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