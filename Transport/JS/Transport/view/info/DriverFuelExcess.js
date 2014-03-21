T.view.info.DriverFuelExcess = Ext.extend(Ext.grid.GridPanel, {
    requireModels:'Fuel',
    constructor: function(cfg) {
        cfg = cfg || {};

        var me = this;
                
        var store = new Ext.data.DirectStore({
           autoSave:false,
           autoDestroy:true,
           api:{
               read:Kdn.Direct.DriverFuelExcessInfoRead
           },
           fields: ['WaybillId', 'WorkDate', 'GarageNumber', 'NormConsumption', 'FactConsumption', 'Excess'],
           root: 'data'
        });

        Ext.apply(cfg, {
            columnLines: true,
            stripeRows: true,
            loadMask: true,
            store: store,
            columns: [
                {
                    header: "№ п.л",
                    width: 110,
                    dataIndex: "WaybillId"
                },
                {
                    header: "Дата",
                    xtype:'datecolumn',
                    width: 110,
                    dataIndex: "WorkDate"
                },
                {
                    header: "Гар. №",
                    width: 90,
                    dataIndex: "GarageNumber"
                },
                {
                    header: "Расход по норме, л",
                    width: 150,
                    dataIndex: "NormConsumption"
                },
                {
                    header: "Расход по факту, л",
                    width: 150,
                    dataIndex: "FactConsumption"
                },
                {
                    header: "Перерасход, л",
                    width: 150,
                    dataIndex: "Excess",
                    summaryType: 'sum'
                }
            ],
            tbar: [
                '-',
                {
                    text: 'Обновить',
                    iconCls: 'icon-refresh',
                    scope: this,
                    handler: this.reload
                },
                '-',
                {
                    xtype: 'datefield',
                    plugins: 'monthPickerPlugin',
                    format: 'F Y',
                    value: new Date(),
                    width: 130,
                    listeners: {
                        scope: this,
                        select: this.reload
                    },
                    dataIndex: 'period'
                },
                '-',
                'Водитель',
                {
                    xtype: 'combo.driver',
                    enableClear: true,
                    dataIndex: 'Driver',
                    objectValue: false,
                    width: 250,
                    listeners: {
                        select: me.reload.createDelegate(me)
    }
               }
               
            ],
            plugins:[
				   new Ext.ux.grid.GridSummary({position:'bottom'})
				]
            
        });

        T.view.info.DriverFuelExcess.superclass.constructor.call(this, cfg);

        this.on({
            viewready: this.onAfterRender,
            scope: this,
            single: true
        });

        this.on({
            rowdblclick: this.onRowDblClick,
             scope: this
        });


    },
    
    
    getParams:function(){
      var tbar = this.getTopToolbar();
      var params = {};     
        tbar.items.each(function(i){
            if (i.dataIndex){
               params[i.dataIndex]=i.getValue(); 
            }         
        });
     
     return params;
      
    },
    
    reload:function(){     
     var params = this.getParams();
     this.store.reload({params:params});
 },

     onAfterRender: function() {
         if (this.filter) {
             this.applyFilter(this.filter);
         }
         else{this.reload();}

     },

     applyFilter: function(filter) {
   
        var fields = Kdn.mapItems(this.getTopToolbar(), 'dataIndex');
        fields.get('Driver').setValue(filter.driver);
        fields.get('period').setValue(filter.date);
        this.reload();
    },
    
    onRowDblClick:function() {
         var sm = this.getSelectionModel(),
                recs = sm.getSelections();
        if (recs.length == 1) {
            Kdn.Application.createView({
                xtype: 'view.waybilleditor',
                waybillId:recs[0].get('WaybillId')
            });
        
        }    
    }    
    
});

Ext.reg('view.info.driverfuelexcess', T.view.info.DriverFuelExcess);