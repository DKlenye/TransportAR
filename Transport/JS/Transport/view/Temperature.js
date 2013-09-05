T.view.Temperature = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'Temperature',
    pageSize: 50,
    pageMode:'remote',
    constructor: function(cfg) {
               
        cfg = cfg || {};
        Ext.apply(cfg, {           
            colModel: new Ext.grid.ColumnModel({
                 defaults:{
                     filter:{} 
                  },
                columns: [
                    {
                        dataIndex: 'Date',
                        xtype:'datecolumn',
                        format:'d.m.Y H:i',
                        header: 'Дата время',
                        width: 160,
                        filter:{
                           field:{
                              xtype:'datefield',
                              triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить"}],
                              listeners:{
                                 triggerclick:{
                                    fn: function(item, trigger, index, tag, e){
                                       item.reset();
                                       item.fireEvent('select');
                                    }                                    
                                 }
                              }
                           },
                           fieldEvents:["select"]                           
                        }
                    },
                    {
                       dataIndex: 'Temp',
                       header: 'Температура t°C',
                       width: 140,
                       renderer:function(v){
                           if(!v) return v;                           
                           return v>0?("+"+v):v;
                       }
                    }
                ]
            })
        });

        T.view.Temperature.superclass.constructor.call(this, cfg);

    },
    
    _getTbar: function()
    {
        return [

            '-',
            {
                text: 'Обновить',
                iconCls: 'icon-refresh',
                handler: this.onRefresh,
                scope: this,
                cls: 'update_btn'
            },
            '-',
            {
                xtype: 'tbspacer',
                width: 10
            }           

        ]
    },
    
    onSelectionChange: function()
    {

    }
    
});

Ext.reg('view.temperature', T.view.Temperature);