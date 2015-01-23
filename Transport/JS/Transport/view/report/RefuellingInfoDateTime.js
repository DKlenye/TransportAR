T.view.report.RefuellingInfoDateTime = Ext.extend(Kdn.view.Report, {

   reportName: 'RefuellingInfoDateTime',
   
   params:[
            'C:',
            {
                xtype: 'datetimefield',
                dataIndex: 'start',
                value: new Date().clearTime()
            },
            '-',
            'По:',
            {
                xtype: 'datetimefield',
                value: new Date(),
                dataIndex: 'end'
            },
            '-',
            'АЗС:',
            {
               xtype:'combo',
               width:200,
               typeAhead: true,
               triggerAction: 'all',
               lazyRender:true,
               mode: 'local',
               store: new Ext.data.ArrayStore({
                   fields: ['id','name'],
                   data: [
                            [1, 'АЗС ц.46 (Полимир)'], 
                            [6, 'АЗС ц.46 (Нафтан)']
                    ]
                }),
                value:6,
                valueField: 'id',
                displayField: 'name',
                dataIndex: 'refuellingPlaceId'                
            }
   ],
   
   buildReportParams:function(params){
        var p = {};
        Ext.copyTo(p, params, 'refuellingPlaceId,start,end');
        p.ownerId = 1;  
        return p;        
    }
        
});

Ext.reg('view.report.refuellinginfodatetime', T.view.report.RefuellingInfoDateTime);