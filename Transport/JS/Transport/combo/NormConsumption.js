T.combo.NormConsumption = Ext.extend(Ext.form.TriggerField,{
   triggerClass : 'x-form-ellipsis-trigger',
   editable:false,
   onTriggerClick : function(){
      var win = this.initWindow();
      win.show();
   },
   
   initWindow:function(){
      
      if(!this.window)
      {
      
            var grid = new Kdn.grid.LocalEditorGrid({
               border:false,               
               store: new Ext.data.JsonStore({
                  idProperty:'RecId',
                  fields:[
                     'RecId',
                     'ConsumptionStartDate',
                     'Consumption'
                  ]
               }),
               columns:[                 
                  {
                     dataIndex:'ConsumptionStartDate',
                     xtype:'datecolumn',
                     header:'Начало дейсвтия',
                     editor:{xtype:'kdn.editor.datefield'},
                     width:150
                  },
                  {
                     dataIndex:'Consumption',
                     align:'center',
                     header:'Норма, л',
                     editor:{xtype:'kdn.editor.numberfield'},
                     width:100
                  },
                  {
                     dataIndex:'RecId',
                     align:'center',
                     header:'Код',
                     editor:{xtype:'kdn.editor.id'},
                     hidden:true,
                     width:100
                  }
               ]
            
            });
               
         
      
         this.window = new Ext.Window({
            width:400,
            height:300,
            closable:true,
            hidden: true,
            closeAction:'hide',
            modal:true,
            animateTarget:this.getEl(),
            layout:'fit',
            bbar:[
               '->',
               '-',
               {
                  xtype:'button.save'
               },
               '-'
            ],
            items:grid 
         });
      }
      return this.window;
   }
   
});
Ext.reg('combo.normconsumption',T.combo.NormConsumption);

/*


Kdn.form.ComboGrid = Ext.extend(Ext.form.TriggerField,{   
    defaultAutoCreate : {tag: "input", type: "text", size: "24", autocomplete: "off"},
    listWidth:150, 
    triggerClass : 'x-form-arrow-trigger',
    shadow : 'sides',
    listAlign : 'tl-bl?',
   
    maxHeight : 300,
    minHeight : 100,
    
    minListWidth : 70,
    
    minChars : 3,
    pageSize : 0,

    selectOnFocus : true,
    resizable : true,
        
    lazyInit : true,
    
    columns:[],
    store:null,
    renderTpl:'',
    objectValue:true,
   
   
    // private
    initComponent : function(){
        Kdn.form.ComboGrid.superclass.initComponent.call(this);
        this.addEvents(
            'expand',            
            'collapse',
            'beforeselect',
            'select'
        );
        
        this.renderTpl = new Ext.Template(this.renderTpl);
        
     },     
     
     onRender : function(ct, position){
        Kdn.form.ComboGrid.superclass.onRender.call(this, ct, position);
        if(Ext.isGecko){
            this.el.dom.setAttribute('autocomplete', 'off');
        }
        if(!this.lazyInit){
            this.initList();
        }else{
            this.on('focus', this.initList, this, {single: true});
        }
    },
    
    getListParent : function() {
        return document.body;
    },
    
    getParentZIndex : function(){
        var zindex;
        if (this.ownerCt){
            this.findParentBy(function(ct){
                zindex = parseInt(ct.getPositionEl().getStyle('z-index'), 10);
                return !!zindex;
            });
        }
        return zindex;
    },
    
    getZIndex : function(listParent){
        listParent = listParent || Ext.getDom(this.getListParent() || Ext.getBody());
        var zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);
        if(!zindex){
            zindex = this.getParentZIndex();
        }
        return (zindex || 12000) + 5;
    },
    
    
    initView:function(){
      
      
      var view,bbar;
      
      if (this.pageSize>0){
        view = new Kdn.grid.PagingGridView({
            forceFit:true
        });
        bbar = new Kdn.grid.PagingToolbar({
            displayInfo: true,
            pageSize: this.pageSize,
            view:view
        });
      }
      else{
         view = new Ext.grid.GridView({
            forceFit:true
        });
      }
      
      var grid = Ext.create({
         xtype:'grid',
         margins:'4',
         region:'center',
         store:this.store,
         enableColumnMove:false,
         enableDragDrop:false,
         enableHdMenu:false,
         view : view,
         selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
         columnLines:true,
         colModel : new Ext.grid.ColumnModel({
            defaults:{
               filter:{}
            },
            columns:this['columns']||[]
         }),                  
         plugins:['filterrow']         
      });
      
      
      this.mon(grid,{
         scope:this,
         rowclick:this.onGridClick,
         keydown:this.onGridKey,
         preventDefault:true  
      });
      
      this.view = grid;
      
    },
    
    onGridClick:function(g,a,e){      
      var rec = this.view.getSelectionModel().getSelected();
      if(rec){
         this.collapse();
         this.setValue(rec);
         this.fireEvent('select',rec);
      }
    },    
    
    onGridKey:function(e){
      if(e.getKey()==e.ENTER) this.onGridClick();
    },
    
    
    initList : function(){
        if(!this.list){
            var cls = 'x-combo-list',
                listParent = Ext.getDom(this.getListParent() || Ext.getBody());

            this.list = new Ext.Layer({
                parentEl: listParent,
                shadow: this.shadow,
                cls: cls,
                constrain:false,
                zindex: this.getZIndex(listParent)
            });


            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
            this.list.setSize(lw, 0);
            this.list.swallowEvent('mousewheel');
                                    
            this.initView();
            
            this.container = new Ext.Container({
               cls:cls+'-inner',
               applyTo:this.list,
               layout:'border',
               items:this.view
            });
            
            this.innerList = this.container.getEl();
            this.innerList.setWidth(this.fixWidth());
            this.innerList.setHeight(this.fixHeight());                                   

            if(this.resizable){
                this.resizer = new Ext.Resizable(this.list,  {
                   pinned:true, handles:'se'
                });
                this.mon(this.resizer, 'resize', function(r, w, h){
                    this.listWidth = w;
                    this.innerList.setWidth(this.fixWidth(w));
                    this.innerList.setHeight(this.fixHeight(h));
                    this.container.doLayout();              
                }, this);                 
            }
        }
    },
    
    fixWidth:function(w){
      var width;
      if (!w) width =  this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);
      else width =  Math.max(w,this.minListWidth);
      return width-this.list.getFrameWidth('lr');
      
    },
    fixHeight:function(h){
        h=h||this.minHeight;
        var height = Math.max(h,this.minHeight);
        return height-this.list.getFrameWidth('tb');
    },
    
    
    isExpanded : function(){
        return this.list && this.list.isVisible();
    },
    
   onTriggerClick : function(){
   
        if(this.readOnly || this.disabled){
            return;
        }
        if(this.isExpanded()){
            this.collapse();
            this.el.focus();
        }else {
            this.onFocus({});
            this.el.focus();
            this.expand();
        }
    },
    
    collapse : function(){
        if(!this.isExpanded()){
            return;
        }
        this.list.hide();
        Ext.getDoc().un('mousewheel', this.collapseIf, this);
        Ext.getDoc().un('mousedown', this.collapseIf, this);
        this.fireEvent('collapse', this);
    },
    
        // private
    collapseIf : function(e){
        if(!this.isDestroyed && !e.within(this.wrap) && !e.within(this.list)){
            this.collapse();
        }
    },
    
   expand : function(){
        
        if(this.isExpanded() || !this.hasFocus){
            return;
        }
        
        this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));

        // zindex can change, re-check it and set it if necessary
        this.list.setZIndex(this.getZIndex());
        this.list.show();
        this.container.doLayout();
        if(Ext.isGecko2){
            this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac
        }
        this.mon(Ext.getDoc(), {
            scope: this,
            mousewheel: this.collapseIf,
            mousedown: this.collapseIf
        });
        this.fireEvent('expand', this);
    },
    
    setValue:function(v){
      
      if (v && !Ext.isObject(v) && Ext.isNumber(v)){
         v = this.store.getById(v);
      }      
      
      var text='';
      if(v && v.data){
         text=this.renderTpl.apply(v.data);
      }
      Kdn.form.ComboGrid.superclass.setValue.call(this,text);
      if(this.objectValue){
         this.value=v;
      }
            
    }
    
   
});
*/