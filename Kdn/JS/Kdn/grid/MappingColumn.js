Kdn.grid.MappingColumn = Ext.extend(Ext.grid.Column, {

   tpl :'{0}',

   renderer:function(v,p,rec){
                
      var index = this.dataIndex,
          indexArray = index.split('.'),
          obj = rec.data;
      
      Ext.iterate(indexArray,function(i){
         if(obj && obj[i]){
            obj = obj[i];
         }
         else {
            obj = null
            return false;
         }
      });     
      
      return String.format(this.tpl,obj||'');       
   }

});

Ext.grid.Column.types.mappingcolumn=Kdn.grid.MappingColumn;