T.view.report.VehiclesByRegistrationNumber = Ext.extend(Kdn.view.Report,{
   
   reportName:'VehiclesByRegistrationNumber',
   
   params:[
        '-',
        'Вид техники:',
            {
               xtype:'combo',
               width:200,
               typeAhead: true,
               triggerAction: 'all',
               lazyRender:true,
               mode: 'local',
               store: new Ext.data.ArrayStore({
                   fields: ['id','name'],
                   data: [[1,'Безномерная'],[2,'Номерная']]
                }),
                value:1,
                valueField: 'id',
                displayField: 'name', 
                dataIndex:'type'                
            }  
   ]
        
});

Ext.reg('view.report.vehiclesbyregistrationnumber', T.view.report.VehiclesByRegistrationNumber);