T.view.report.NaftanSpectransWorkInfo = Ext.extend(Kdn.view.Report,{
   
    reportName: 'NaftanSpectransWorkInfo',
   
   params:[
        '-',
        'C:',
            {
                xtype: 'datefield',
                dataIndex: 'start',
                value: new Date(),
                width: 120
            },
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'end',
                value: new Date(),
                width: 120
            },
            '-',
            {
               xtype: 'combo',
               width:300,
               typeAhead: true,
               triggerAction: 'all',
               lazyRender:true,
               mode: 'local',
               store: new Ext.data.ArrayStore({
                   fields: ['id','name'],
                   data: [[0, 'Без группировки'], [1, 'Группировка по группам услуг"'], [2, 'Группировка по заказчикам (целям)"']]
                }),
                value:0,
                valueField: 'id',
                displayField: 'name', 
                dataIndex:'GroupType'                
            }
   ]
        
});

Ext.reg('view.report.naftanspectransworkinfo', T.view.report.NaftanSpectransWorkInfo);