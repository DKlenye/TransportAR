Kdn.editor.LocalGrid = Ext.extend(Ext.grid.EditorGridPanel, {
    
    forceValidation: true,
    clicksToEdit: 1,
    columnLines: true,
    stripeRows: true,
    startEditColumn:0,
    selectionModel:'Row',
    addPosition:'first',
       
    constructor: function(cfg)
    {
        cfg = cfg || {};
        
        tbarCfg = ['-',
           {
               xtype: 'button.add',
               handler: this.add,
               scope: this
           }, '-',
           {
               xtype: 'button.remove',
               handler: this.remove,
               scope: this
           }, '-'
        ];
        
        if(cfg.tbarExt){
            tbarCfg = tbarCfg.concat(cfg.tbarExt);
        }
        
         
        keysCfg = [
            {
                key: 'a',
                ctrl: true,
                stopEvent: true,
                handler: function (){this.getSelectionModel().selectAll();},
                scope: this
            },
            {
                key: Ext.EventObject.ENTER,
                handler: this.onEnter,
                scope: this
            },
            {
                key: Ext.EventObject.SPACE,
                handler: this.onSpace,
                scope: this
            },
            {
                key: Ext.EventObject.DELETE,
                stopEvent: true,
                handler: this.remove,
                scope: this
            },
            {
                key: Ext.EventObject.INSERT,
                stopEvent: true,
                handler: this.add,
                scope: this
            },
            {
                key: Ext.EventObject.TAB,
                stopEvent: true,
                handler: function (){
                    console.log('tab');
                    return false;
                },
                scope: this
            },
            {
                key: Ext.EventObject.S,
                ctrl: true,
                stopEvent: true,
                handler: this.onSave,
                scope: this
            }
         ];        
        
        var selModel;
        
        if (this.selectionModel=="Row"){
            selModel = new Kdn.grid.LocalGridSelectionModel({
              moveEditorOnEnter:false 
            });
        }
        else{
            selModel = new Kdn.grid.LocalGridCellSelectionModel({
              moveEditorOnEnter:false 
            });
        }
                              
        
        Ext.applyIf(cfg, {            
            tbar: tbarCfg,
            keys: keysCfg,
            selModel : selModel
        });
         
                 
        Kdn.editor.LocalGrid.superclass.constructor.call(this, cfg);
         
         this.on({
            scope:this,
            single:true,            
            afterrender:this.onAfterRender            
        }); 


    },

    onAfterRender:function(){
      
      this.getEl().addClass('kdn-localgrid');
      
      var fn = this.returnFocusToGridView,
          tbar = this.getTopToolbar(),
          scroller = this.getEl().query('.x-grid3-scroller').shift(),
          header = this.header;
      
      
      if(tbar){
         tbar.getEl().on({
            click:fn,
            scope:this
         });
      } 
      if(scroller){      
         Ext.get(scroller).on({
            click:fn,
            scope:this
         });
      }
      if(header){      
        header.on({
            click:fn,
            scope:this
         });
      }
      
    this.focusTask = new Ext.util.DelayedTask(this.focusTaskFn, this);    
    this.on('beforedestroy',this.destroy,this);
    
    this.initFocus();
    
    },
    
    focusTaskFn:function(){
      this.getView().focusEl.focus();      
      var sm = this.getSelectionModel();
      
      
      if(this.selectionModel=="Row"){
         var selLen = sm.getSelections().length;
         if(selLen==0){
            sm.selectFirstRow();  
         } 
      }
      else{
         if(!sm.hasSelection()){
            sm.select(0,0,true)
         }
      }
      
             
      
    },
    
    returnFocusToGridView:function(e, el){
        
        var allowClasses = [
         "x-panel-header",
         "x-toolbar-left",
         "x-grid3-scroller",
         "x-grid3-body"
        ];

        
        var delay = 100;
     
        Ext.iterate(allowClasses,function(className){
            if(Ext.get(el).hasClass(className)){
               this.focusTask.delay(delay);
               return false;
            }
        },this);
                
     
    },
    
    
   destroy : function () {
        this.store.un("load", this.refilter, this);
        if (this.filterTask){
            this.filterTask.cancel();
            this.filterTask = null;
        }
    },

    add: function()
    {
        var s = this.store,
            r = this.applyDefaults(new s.recordType({}).applyDefaults()),
            sm = this.getSelectionModel();
      
        if(r){      
           this.stopEditing();
           
           if(this.addPosition=='first'){
               s.insert(0, r);
           }
           else{
            s.add(r);
           }
           
           var rowIdx = s.indexOf(r);
           
           if(this.selectionModel=="Row") sm.selectRecords([r],false);           
             
           this.startEditing.defer(100,this,[rowIdx,this.startEditColumn]);
        }
    },
    
    applyDefaults:function(record){
      return record;
    },
   
    beforeRemove:function(selections){
      return selections;          
    },

    remove: function(btn, ev)
    {
    
        var sm = this.getSelectionModel();
         
        var selections=[];
        
        if(this.selectionModel=="Row"){
          selections = sm.getSelections();
        } 
         else{
            if(sm.selection)
            {
               selections.push(sm.selection.record);
            }
         }
         
             
        var recs = this.beforeRemove(selections);
        if (!recs)
        {
            return false;
        }
        
        
        if(this.selectionModel!=="Row"){
       
           
                
            var cell = sm.getSelectedCell();
                                    
            var newCell = this.walkCells(cell[0]+1,cell[1],1,function(){return true},sm);
            if(!newCell){
               newCell = this.walkCells(cell[0]-1,cell[1],1,function(){return true},sm);
               
               if(!newCell ||newCell[0]==-1){
                  this.store.remove(recs);
                  return;
               }
               
               this.store.remove(recs);
               sm.select(newCell[0],newCell[1]);
               return;
            }
            
                        
            this.store.remove(recs);
            sm.select(newCell[0]-1,newCell[1]);
            
            return;
            
        }
        
                                 
         var store = this.store,
             first = Math.min(sm.last, sm.lastActive),
             last = Math.max(sm.last, sm.lastActive),
             rec;
         if ((last + 1) < store.getCount())
         {
             rec = store.getAt(last + 1);
         }
         else
         {
             rec = store.getAt(first - 1)
         }

         this.store.remove(recs)

         if (rec)
         {
               sm.selectRow(store.indexOf(rec));    
         }       

    },
    
    
    onEnter:function(){
      var s = this.store,
          sm = this.getSelectionModel(),
          r = sm.getSelected();
      
      if(r){
         this.startEditing(s.indexOf(r),this.startEditColumn);
      } 
      
    },
    
    onSave:Ext.emptyFn,    
    onSpace:Ext.emptyFn,
    
    onEditComplete: function(ed, value, startValue)
    {
   
        this.editing = false;
        this.lastActiveEditor = this.activeEditor;
        this.activeEditor = null;

        var r = ed.record,
            field = this.colModel.getDataIndex(ed.col);
        value = this.postEditValue(value, startValue, r, field);
        if (this.forceValidation === true || String(value) !== String(startValue))
        {
            var e = {
                grid: this,
                record: r,
                field: field,
                originalValue: startValue,
                value: value,
                row: ed.row,
                column: ed.col,
                cancel: false
            };
            if (this.fireEvent("validateedit", e) !== false && !e.cancel)
            {
                r.set(field, e.value);
                delete e.cancel;
                this.fireEvent("afteredit", e);
            }
        }
        this.view.focusCell(ed.row, ed.col);
    }
    
});

Ext.reg('editor.localgrid',Kdn.editor.LocalGrid);



Ext.override(Kdn.editor.LocalGrid, {
    
    initFocus: function(){
    
    var focusEl=this.getView().focusEl,
        frameEl=this.el;
        
    this.fi = new Ext.a11y.Focusable(focusEl,frameEl,this);
     
        this.mon(this.fi, {
            focus: this.onFocus,
            blur: this.onBlur
        });
 
    },
    
    focus: function(){
        this.fi.focus();
    },
    
    blur: function(){
        this.fi.blur();
    },
        
    onFocus: Ext.emptyFn,
    onBlur: Ext.emptyFn
    
    
});