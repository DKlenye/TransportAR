T.combo.v_Driver = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:560,
   pageSize : 20,
   minHeight:600,
   minListWidth:450,
   
   getFilterFn:function(val){
     var er = Ext.escapeRe;
     var regexp =  new RegExp(er(String(val)),'i');
     
     return function(rec){
         var l = rec.get('LastName');         
         return regexp.test(l);     
     }       
      
   },
   
   renderTpl:function(e,m,r){
      if(!e) return e;      
                  
      if(m){
       var qtipTpl = "<span style='font-size:14px;'><b>Цех:{0} Taб.№:{1} {2} {3} {4}</b></span>";       
       m.attr = 'ext:qtip="'+String.format(qtipTpl,e.LastName,e.FirstName,e.MiddleName)+'"';
      }        
         return String.format('[Цех:{0} Таб:{1}] {2} {3}.{4}.',
            e.Department,
            e.EmployeeNumber,
            e.LastName,
            e.FirstName[0],
            e.MiddleName[0]     
         )
      return '';
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
   ],
   initComponent:function(){
      
      Ext.apply(this,{
         store:Kdn.ModelFactory.getStore('v_Driver')
      });
      T.combo.v_Driver.superclass.initComponent.call(this);
   }   
});
   

Ext.reg('combo.v_driver', T.combo.v_Driver);