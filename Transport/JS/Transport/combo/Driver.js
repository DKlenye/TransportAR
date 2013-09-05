T.combo.Driver = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:560,
   pageSize : 20,
   minHeight:600,
   minListWidth:450,
   
   getFilterFn:function(val){
     var er = Ext.escapeRe;
     var regexp =  new RegExp(er(String(val)),'i');
     
     return function(rec){
         var employee = rec.get('Employee');         
         return regexp.test(employee.LastName);     
     }       
      
   },
   
   renderTpl:function(e,m,r){
      if(!e) return e;      
      var employee = e.Employee;
      if(employee){
            
      if(m){
       var qtipTpl = "<span style='font-size:14px;'><b>{0} {1} {2}</b></span>";       
       m.attr = 'ext:qtip="'+String.format(qtipTpl,employee.LastName,employee.FirstName,employee.MiddleName)+'"';
      }        
         return String.format('[Цех:{0} Таб:{1}] {2} {3}.{4}.',
            employee.Department,
            employee.EmployeeNumber,
            employee.LastName,
            employee.FirstName[0],
            employee.MiddleName[0]     
         )
      }
      return '';
   },
   columns:[
      {
         dataIndex:'Employee.Department',
         xtype:'mappingcolumn',
         header:'Цех',
         width:60,
         fixed:true    
      },
      {
         dataIndex:'Employee.EmployeeNumber',
         xtype:'mappingcolumn',
         header:'Таб. №',
         width:70,
         fixed:true         
      },
      {
         dataIndex:'Employee.LastName',
         xtype:'mappingcolumn',
         header:'Фамилия'
      },
      {
         dataIndex:'Employee.FirstName',
         xtype:'mappingcolumn',
         header:'Имя'
      },
      {
         dataIndex:'Employee.MiddleName',
         xtype:'mappingcolumn',
         header:'Отчество'
      }
   ],
   initComponent:function(){
      
      Ext.apply(this,{
         store:Kdn.ModelFactory.getStore('Driver')
      });
      T.combo.Driver.superclass.initComponent.call(this);
   }   
});
   

Ext.reg('combo.driver', T.combo.Driver);