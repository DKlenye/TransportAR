T.combo.DriverCategory = Ext.extend(Ext.net.MultiCombo, {
   
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            displayField: 'v',
            valueField: 'v',
            valueType:'string',
            triggerAction: "all",
            mode: "local"
        });
        T.combo.DriverCategory.superclass.constructor.call(this, cfg);
    },
    initComponent: function() {
        this.store = new Ext.data.ArrayStore({
		        fields:['v'],
		        data:[
		            ['AM'],['A1'],
		            ['A'],['B'],['C'],['D'],['E'],
		            ['BE'],['CE'],['DE'],
		            ['F'],['I']
		        ]
		    });
        T.combo.DriverCategory.superclass.initComponent.call(this); 
    }
});

Ext.reg('combo.drivercategory', T.combo.DriverCategory);





    
        
    
    
