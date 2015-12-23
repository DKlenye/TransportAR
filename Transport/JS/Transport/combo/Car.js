T.combo.Car = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:730,
   pageSize : 30,
   minHeight:450,
   minListWidth:550,
   enableKeyEvents: true,
   //renderTpl: '[{GarageNumber}] {Model} {RegistrationNumber} {PolymirSHU}',

   renderTpl: function (e) {

       var store = Kdn.ModelFactory.getStore('TransportColumn');

       if (e) {

           var column = store.getById(e.ColumnId);
           var columnName = '';

           if (column) columnName = column.get('ColumnName');

           return String.format('[{0}] {1} {2} {3}',
             e.GarageNumber,
             e.Model,
             e.RegistrationNumber,
             columnName
         );
       }
       return '';
   },

   columns:[
               {
                  dataIndex:'GarageNumber',
                  header:'Гаражный №',
                  width:110,
                  fixed:true
               },
               {
                  dataIndex:'Model',
                  header:'Марка'
               },
               {
                  dataIndex:'RegistrationNumber',
                  header:'Гос. №',
                  width:100,
                  fixed:true
               },
               {
                  dataIndex:'InventoryNumber',
                  header:'Инв. №',
                  width:100,
                  fixed:true
              },
               {
                    
                   dataIndex: 'ColumnId',
                   header: 'Колонна',
                   width: 200,
                   fixed: true,
                   renderer:Kdn.Renderer.store("TransportColumn","ColumnName")
                 }
   ],
   /*
   initView:function(){
      
            
      this.store = Kdn.ModelFactory.getModel('Car').buildStore({
         autoLoad:true,
         autoSave:true,
         baseParams:{
            start:0,
            limit:30//,
           // sqlFilter:"WriteOffDate is null"
         },
         remoteSort:true
      });    
      
      var grid = Ext.create({
         xtype:'grid',
         margins:'4',
         region:'center',
         store:this.store,
         enableColumnMove:false,
         enableDragDrop:false,
         enableHdMenu:false,
         viewConfig:{
            forceFit:true
         },
         bbar: new Ext.PagingToolbar({
            displayInfo: true,
            pageSize: 30,
            store:this.store
         }),
         selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
         columnLines:true,
         colModel : new Ext.grid.ColumnModel({
            
            defaults:{
               filter:{}
            },
             columns:[
               {
                  dataIndex:'GarageNumber',
                  header:'Гаражный №',
                  width:110,
                  fixed:true
               },
               {
                  dataIndex:'Model',
                  header:'Марка'
               },
               {
                  dataIndex:'RegistrationNumber',
                  header:'Гос. №',
                  width:100,
                  fixed:true
               },
               {
                  dataIndex:'InventoryNumber',
                  header:'Инв. №',
                  width:100,
                  fixed:true
               }
            ]
         }),                  
         plugins:['filterrow']    
      });      
      
      this.mon(grid,{
         scope:this,
         rowclick:this.onGridClick,
         keydown:this.onGridKey
      });      
            
      this.view = grid;
      
    },
    */
    
    initComponent:function(){      
      Ext.apply(this,{
         store:Kdn.ModelFactory.getStore('Car')
      });
      T.combo.Car.superclass.initComponent.call(this);
   },
    
    postBlur:function(){      
      T.combo.Car.superclass.postBlur.call(this);
      this.setValue(this.getValue());      
    },
        
    onKeyUp:function(e){
    
        if (e.getKey()==e.ENTER){
                        
            var val = this.getEl().dom.value;
            var gn;
            if(gn = parseInt(val)){
               
               this.store.filterBy(function(rec,id){
                  return rec.get('GarageNumber')==gn;               
               });
               
               var len = this.store.data.length;
               
               if(len==0){
                  this.postBlur();
                  this.focus.defer(50,this,[true]);
               }
               else if(len==1){
                  this.collapse();
                  var rec = this.store.getAt(0);                  
                  this.setValue(rec);
                  this.fireEvent('select',rec);      
                  this.focus.defer(50,this,[true]);
               }
               else{
                  this.expand();
               }              
            }
            else{
               this.postBlur();
               this.focus.defer(50,this,[true]);
            }   
          
        }
    
    },
            
     onGridClick:function(g,a,e){ 
      var rec = this.view.getSelectionModel().getSelected();
      if(rec){
         this.collapse();
         this.setValue(rec);
         this.fireEvent('select',rec);
         this.focus.defer(50,this,[true]);
      }
    }
   
});
   

Ext.reg('combo.car', T.combo.Car);