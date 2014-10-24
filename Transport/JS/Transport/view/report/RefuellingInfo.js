T.view.report.RefuellingInfo = Ext.extend(Kdn.app.TabItem, {
    
    initComponent:function(){
      
      Ext.apply(this,{
         layout:'form',
         frame:true,
         items:[
            {
               fieldLabel:'Период',
               xtype:'datefield',
               plugins:'monthPickerPlugin',
               format:'F Y',
               width:250,
               dataIndex:'period',
               value:new Date()
            },
            {
               fieldLabel:'Место заправки',
               xtype:'combo.refuellingplace',
               dataIndex:'refuellingplaceid',
               width:250,
               objectValue:false,
               enableClear:true
            },
            {
               text:'Суммы по заправке',
               xtype:'button',
               iconCls:'icon-blue-document-word',
              handler: this.report,
              reportName: "RefuellingInfo2",
               scope:this
            },
            {
               text:'Группировка по водителям',
               xtype:'button',
               iconCls:'icon-blue-document-word', 
              handler: this.report,
              reportName: "RefuellingInfo3",
              scope:this
            },
            
            {
               text:'Детализация',
               xtype:'button',
               iconCls:'icon-blue-document-word', 
               handler:this.report,
               reportName:"RefuellingInfo",
               scope:this
            }                 
            
         ]
      });
      
      T.view.report.RefuellingInfo.superclass.initComponent.call(this);
    },

    report:function(button) {
        var reportName = button.reportName;
        var o = {};
        this.items.each(function (e) {

            if (e.dataIndex) {
                o[e.dataIndex] = e.getValue();
            }

        });

        var params = {};

        params.month = o.period.getMonth() + 1;
        params.year = o.period.getFullYear();
        params.ownerId = 1;
        params.refuellingPlaceId = o['refuellingplaceid'] || 0;
        Kdn.Reporter.exportReport(reportName, params);
    }

});

Ext.reg('view.report.refuellinginfo', T.view.report.RefuellingInfo);