
Kdn.plugins.AutoSizeColumns = function(config) {
	Ext.apply(this, config);
};
Ext.extend(Kdn.plugins.AutoSizeColumns, Object, {
	cellPadding: 16,
	init: function(grid) {
	    this.grid = grid;
	    this.grid.on('afterrender',this.onAfterRender,this);
	        
		grid.on('headerdblclick', function(grid, colIndex, e) {
		   
			
		}, this);
	},
	onAfterRender:function(){
	    this.createMenu();
	},
	createMenu : function () {
        var view = this.grid.getView(),
            hmenu = view.hmenu;
        
        if (hmenu) {
            hmenu.addSeparator();
            hmenu.add({
                text:'Подбор ширины',
                iconCls:'icon-layer-resize',
                handler: this.resizeColumn,
                scope:this              
            });
            hmenu.add({
                text:'Подбор ширины (все колонки)',
                iconCls:'icon-size_horizontal',
                handler: this.resizeAllColumn,
                scope:this
            });
        }     
    },
    resizeColumn:function(){
        var colIndex = this.grid.getView().hdCtxIndex;          
        this.resizeHeader(colIndex);                
    },
    resizeAllColumn:function(){
        var me = this;
            Ext.iterate(
                me.grid.getColumnModel().columns,
                function(col,idx){
                    me.resizeHeader(idx);
            });
    },
    resizeHeader:function(colIndex){
       /* var grid = this.grid,
            view = grid.getView(),
            h = view.getHeaderCell(colIndex),
            hi = h.firstChild;
			
			var hLen=view.getColumnData()[colIndex].scope.header.length;
			
			
			console.log(hLen,view,h);
			
        hi.style.width = '0px';
		var w = hi.scrollWidth;
		hi.style.width = 'auto';
		for (var r = 0, len = grid.getStore().getCount(); r < len; r++) {
			var ci = view.getCell(r, colIndex).firstChild;
			ci.style.width = '0px';
			w = Math.max(w, ci.scrollWidth);
			ci.style.width = 'auto';
		}
		w += this.cellPadding;
		grid.getColumnModel().setColumnWidth(colIndex, w);*/
		
		
		var grid = this.grid,
            view = grid.getView(),
		    hScope=view.getColumnData()[colIndex].scope,
		    dIndex = hScope.dataIndex,
		    maxStr = hScope.header;
		
		grid.getStore().data.each(function(e){
		    var val = e.data[dIndex];
		    val = Ext.isDate(val)? val.format('d.m.Y'):val+'';
		    if(val.length>maxStr.length) maxStr=val;
		});		
	    	    
	    var tstCol = view.getCell(0, colIndex).firstChild,
	        memText = tstCol.innerHTML,
	        len;
	        
	        tstCol.innerHTML = maxStr;
	        tstCol.style.width = '0px';
			len = tstCol.scrollWidth;
			tstCol.style.width = 'auto';
			tstCol.innerHTML = memText;	        
	    
		grid.getColumnModel().setColumnWidth(colIndex, len+this.cellPadding);
		
    }
});

Ext.preg('autosizecolumns', Kdn.plugins.AutoSizeColumns);