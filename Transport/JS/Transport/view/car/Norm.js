T.view.car.Norm = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
        cfg = cfg || {};
        
        
        var normGrid = new Kdn.grid.LocalEditorGrid({
            colModel: new T.colModel.Norm(),
            store:Kdn.ModelFactory.getModel('Norm').buildStore({
               autoLoad:false,
               autoSave:false,
               listeners:{
                  scope:this,
                  beforeload:this.onBeforeLoadNormStore,
                  save:this.onSaveNormStore
               }
            }),
            loadMask:true,
            region:'center',
            split:true,
            margins:'2 0 2 2'            
        });
                
        
        var defaultStore = new Ext.data.JsonStore();
        
        var consumptionGrid = new Kdn.grid.LocalEditorGrid({
            title:'Изменение нормы',
            width:300,
            collapsible:true,
            region:'east',
            split:true,
            margins:'2 2 2 0',
            plugins:[Ext.ux.PanelCollapsedTitle],
            store:defaultStore,
            defaultStore:defaultStore,
            colModel:new Ext.grid.ColumnModel({
               columns:[
                  {
                     dataIndex:'ConsumptionStartDate',
                     xtype:'datecolumn',
                     header:'Начало действия',
                     editor:{xtype:'kdn.editor.datefield'},
                     width:150
                  },
                  {
                     dataIndex:'Consumption',
                     header:'Расход, л',
                     editor:{xtype:'kdn.editor.decimalfield',decimalPrecision:3},
                     width:100
                  },
                  {
                     dataIndex:'RecId',
                     header:'Код',
                     editor:{xtype:'kdn.editor.id'},
                     hidden:true
                  }
               ]
           }),
           listeners:{
            scope:this,
            beforeedit:this.onBeforeEditConsumption
           }
            
        });
                        
        
        Ext.apply(cfg, {
            layout:'border',                    
            border:false,
            items:[
               normGrid,
               consumptionGrid
            ]    
        });
        
        Ext.apply(this,{
         store: normGrid.store,
         consumptionGrid:consumptionGrid,
         normGrid:normGrid
        });
         
         
        normGrid.store.save = normGrid.store.save.createSequence(
            this.onBeforeSaveNormStore.createDelegate(this),
            normGrid.store.save
        );      
        normGrid.selModel.on('selectionchange',this.onSelectionChange,this);
         
         
        T.view.car.Norm.superclass.constructor.call(this, cfg);
    },
    
    onBeforeEditConsumption:function(e){
      var CSD = 'ConsumptionStartDate';
    
      if (!e.record.phantom) return false;
      if (e.field==CSD){
         var editor = e.grid.colModel.getCellEditor(e.column),
            editorField = editor.field;
            
            var max = e.grid.store.max(CSD);
            if (Ext.isDate(max)){
              max=max.add(Date.DAY,1);
            }
            editorField.setMinValue(max);            
      }
    },
    
    onSelectionChange:function(sm){
        var rec = sm.getSelected(),
            grid = this.consumptionGrid;
        
        if(rec){            
            grid.enable(true);
            var recStore = this.initRecordStore(rec);   
            grid.reconfigure(recStore,grid.colModel);                        
        }
        else{
           grid.reconfigure(grid.defaultStore,grid.colModel);
           grid.disable(true);
        }
    },
    
    initRecordStore:function(rec){    
      var index = 'NormConsumption';
          
      if(!rec[index]){
         var store = Kdn.ModelFactory.getModel(index).buildStore({
            autoSave:false,
            autoLoad:false,
            listeners:{
               scope:this,
               save:this.onConsumptionStoreSave
            },
            data:{data:rec.data[index]||[]}
         });
         rec[index]=store;
      }                        
      return  rec[index];  
            
    },
    
    onBeforeSaveNormStore:function(){
      var store = this.normGrid.store,
          len = store.getModifiedRecords().concat(store.removed).length,
          index = 'NormConsumption';
             
          //удаляем созданный store у удаляемых записей норм       
          Ext.iterate(store.removed,function(rec){
               if(rec[index]){
                  rec[index].destroy();
                  delete rec[index];
               }
          });
                              
          if(len==0) this.saveConsumption();
      
    },    
    onSaveNormStore:function(){
      this.saveConsumption();
    },
    onBeforeLoadNormStore:function(){
      var index = 'NormConsumption',
          store = this.normGrid.store;
          
      store.each(function(rec){
          if(rec[index]){
                  rec[index].destroy();
                  delete rec[index];
          }
      });
                        
    },
    
    saveConsumption:function(){
      var index = 'NormConsumption',
          store = this.normGrid.store;
          a=[]
      store.each(function(rec){
            var cStore = rec[index];
            if(cStore){
            a.push(cStore)
               cStore.each(function(cRecord){
                  cRecord.beginEdit();
                  cRecord.set('NormId',rec.id);
                  cRecord.endEdit();
               });
               cStore.save();
            }          
      });
      
    },
    
    onConsumptionStoreSave:function(store,id,obj){
      var editRecord,      
          rec = store.data.itemAt(0); 
          
      if(rec){
            editRecord = this.normGrid.store.getById(rec.data.NormId);
         if(editRecord){
            editRecord.beginEdit();
            editRecord.set("NormConsumption",[rec.data]);
            editRecord.endEdit();
		      editRecord.commit([true]);	
         }         
      }
      else{
         var d = obj['destroy'];
         if(d && d.length>0){
               editRecord = this.normGrid.store.getById(d[0].NormId);
            if(editRecord){
               editRecord.beginEdit();
               editRecord.set("NormConsumption",[]);
               editRecord.endEdit();
		         editRecord.commit([true]);	
            }  
         }
      }
            
    }
    
    
    
});

Ext.reg('view.car.norm', T.view.car.Norm);