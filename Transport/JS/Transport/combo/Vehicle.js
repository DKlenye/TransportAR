T.combo.Vehicle = Ext.extend(Kdn.form.ComboGrid ,{
   listWidth:530,
   pageSize : 30,
   minHeight:450,
   minListWidth:450,
   enableKeyEvents: true,
   renderTpl:'[{GarageNumber}] {Model} {RegistrationNumber}',
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
         store:Kdn.ModelFactory.getStore('BaseVehicle')
      });
      T.combo.Vehicle.superclass.initComponent.call(this);
   },
    
    postBlur:function(){      
      T.combo.Vehicle.superclass.postBlur.call(this);
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
   

Ext.reg('combo.vehicle', T.combo.Vehicle);