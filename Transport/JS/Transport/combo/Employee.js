T.combo.Employee = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:560,
   pageSize : 20,
   minHeight:600,
   minListWidth:450,
   valueField:'DriverId',
   renderTpl:function(e){
      if(e){
         return String.format('[Цех:{0} Таб:{1}] {2} {3}.{4}.',
            e.Department,
            e.EmployeeNumber,
            e.LastName,
            e.FirstName[0],
            e.MiddleName[0]     
         )
      }
      return '';
   },
   
   initView:function(){
      
            
      this.store = Kdn.ModelFactory.getModel('Employee').buildStore({
         autoLoad:true,
         autoSave:false,
         baseParams:{
            start:0,
            limit:30,
            sqlFilter:"DismissDate is null"
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
                  dataIndex:'Department',
                  header:'Цех',
                  width:60,
                  fixed:true    
               },
               {
                  dataIndex:'EmployeeNumber',
                  header:'Таб. №',
                  width:70,
                  fixed:true         
               },
               {
                  dataIndex:'LastName',
                  header:'Фамилия'
               },
               {
                  dataIndex:'FirstName',
                  header:'Имя'
               },
               {
                  dataIndex:'MiddleName',
                  header:'Отчество'
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
      
    }
   
    
});
   

Ext.reg('combo.employee', T.combo.Employee);