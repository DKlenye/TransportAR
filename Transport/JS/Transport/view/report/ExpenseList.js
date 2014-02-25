T.view.report.ExpenseList = Ext.extend(T.view.report.AccFuelObReport, {
    reportName: 'ExpenseList',
    
    initComponent:function() {

        Ext.apply(this, {
            afterParams: [
                '->','-',
                {
                    text:'Передать в себестоисмость',
                    iconCls:'icon-mail-send',
                    scope:this,
                    handler:this.onSendList
                },'-'
            ]
        });
    
        T.view.report.ExpenseList.superclass.initComponent.call(this);
    },
   
   onSendList:function() {
        
       var p = this.getParams();
       var year = p.period.getFullYear();
       var month = p.period.getMonth() + 1;
       
       this.ownerCt.body.mask('Передача данных','x-mask-loading');

       Kdn.Direct.sendExpenseList({
        year:year,
        month:month
       }, this.afterSendList.createDelegate(this));
   },
   
   afterSendList:function() {
        this.ownerCt.body.unmask();
   }
});
Ext.reg('view.report.expenselist', T.view.report.ExpenseList);