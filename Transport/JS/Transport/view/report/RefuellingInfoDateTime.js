T.view.report.RefuellingInfoDateTime = Ext.extend(Kdn.view.Report, {

   reportName: 'RefuellingInfoDateTime',
   
   params:[
            'C:',
            {
                xtype: 'datefield',
                dataIndex: 'startDate'
            },
            {
                dataIndex: 'startTime',
                xtype: 'kdn.editor.timefield',
            },
            '-',
            'По:',
            {
                xtype: 'datefield',
                dataIndex: 'endDate'
            },
            {
                dataIndex: 'endTime',
                xtype: 'kdn.editor.timefield',
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
        p.dateStart = params.startDate;
        p.dateFinish = params.endDate;

        p.timeStart = params.startTime;
        p.timeFinish = params.endTime;

        Ext.copyTo(p, params, 'refuellingPlaceId');
        p.ownerId = 1;
        console.log(p);     
        return p;        
    }
        
});

Ext.reg('view.report.refuellinginfodatetime', T.view.report.RefuellingInfoDateTime);