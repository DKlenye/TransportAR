T.combo.Trailer = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:500,
   pageSize : 20,
   minHeight:400,
   minListWidth:450,
   valueField:'VehicleId',
   objectValue:false,
   enableKeyEvents: true,
   renderTpl:function(v){
      if(!v) return null;
      var store = Kdn.ModelFactory.getStore('Trailer');
      var record = store.getById(v);
      if (record) return new Ext.Template('[{GarageNumber}] {Model} {RegistrationNumber}').apply(record.data);
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
   ],
   initComponent:function(){
      
      Ext.apply(this,{
         store:Kdn.ModelFactory.getStore('Trailer')
      });
      T.combo.Trailer.superclass.initComponent.call(this);
   },
   
    postBlur:function(){      
      T.combo.Car.superclass.postBlur.call(this);
      this.setValue(this.getValue());      
    },
    
        
   onKeyUp:function(e){
    
        if (e.getKey()==e.ENTER){
    
         debugger;
            
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
   

Ext.reg('combo.trailer', T.combo.Trailer);