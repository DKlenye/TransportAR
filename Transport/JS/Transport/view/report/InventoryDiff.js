T.view.report.InventoryDiff = Ext.extend(Kdn.view.Report, {

   reportName: 'InventoryDiff',
   
   params:[
        '-',
        'Период:',
            {
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'date',
               value:new Date(),
               width:120
            },
          '-',
            {
                xtype: 'combo',
                width: 200,
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                store: new Ext.data.ArrayStore({
                    fields: ['id', 'name'],
                    data: [[1, 'Бухгалтерия ОАО"Нафтан"'], [2, 'Бухгалтерия ОАО"Полимир"']]
                }),
                value: 1,
                valueField: 'id',
                displayField: 'name',
                dataIndex: 'AccountingId'
            }
   ]
        
});
Ext.reg('view.report.inventorydiff', T.view.report.InventoryDiff);