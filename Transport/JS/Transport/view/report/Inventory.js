T.view.report.Inventory = Ext.extend(Kdn.app.TabItem, {
    
    initComponent:function(){
      
      Ext.apply(this,{
         layout:'form',
         frame:true,
         items:[
            {
                fieldLabel:'Дата',
                xtype:'datefield',
                value:Date.parseDate('01.11','d.m'),
                dataIndex:'inventoryDate'
            },
            {             
                 xtype:'compositefield',
                 items:[
                     {
                         text: 'Все',
                         width:100,
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onAll,
                         scope:this
                     },
                     {
                         text: 'Детализация Все',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onAllDetails,
                         scope:this
                     },
                     {
                         text: 'Детализация Нафтан',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onAllDetails1,
                         scope:this
                     },
                     {
                         text: 'Детализация Полимир',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onAllDetails2,
                         scope:this
                     }
                 ]
            },
            {
                 xtype:'compositefield',
                 items:[
                     {
                         fieldLabel: 'Колонна',
                         xtype: 'combo.transportcolumn',
                         dataIndex: 'columnId',
                         width: 300,
                         objectValue: false,
                         enableClear: true
                     },
                     {
                         text: 'По колонне',
                         width:100,
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onColumn,
                         scope:this
                     },
                     {
                         text: 'Детализация',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onColumnDetails,
                         scope:this
                     }
                     
                 ]
            },
            {
                 xtype:'compositefield',
                 items:[
                     {
                         fieldLabel: 'Цех/Пр-во',
                         xtype: 'combo.department',
                         dataIndex: 'departmentId',
                         width: 300,
                         objectValue: false,
                         enableClear: true
                     },
                     {
                         text: 'По цеху',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onDepartment,
                         scope:this
                     },
                     {
                         text: 'По цеху пустая',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onDepartmentEmpty,
                         scope:this
                     },
                     {
                         text: 'Детализация',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onDepartmentDetails,
                         scope:this
                     }
                 ]
            },
            {
                 xtype:'compositefield',
                 items:[
                     {
                         fieldLabel: 'Водитель',
                         xtype: 'combo.driver',
                         dataIndex: 'driverId',
                         width: 300,
                         objectValue: false,
                         enableClear: true
                     },
                     {
                         text: 'По Водителю',
                         width:100,
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onDriver,
                         scope:this
                     },
                     {
                         text: 'Детализация',
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onDriverDetails,
                         scope:this
                     }
                 ]
            },
            {
                 xtype:'compositefield',
                 items:[
                     {
                         fieldLabel: 'Работник',
                         xtype: 'combo.employee',
                         showDismiss:true,
                         dataIndex: 'employeeId',
                         width: 300,
                         enableClear: true
                     },
                     {
                         text: 'По Работнику',
                         width:100,
                         xtype: 'button',
                         iconCls: 'icon-blue-document-word',
                         handler:this.onEmployee,
                         scope:this
                     }
                 ]
            }
         ]
      });
      
      T.view.report.Inventory.superclass.initComponent.call(this);
    },
    
    onAll:function() {
        this.print();
    },
    
    onAllDetails:function() {
        this.printDetails();
    },
    
    onAllDetails1:function() {
        this.printDetails({
            accountingId:1
        });
    },
    onAllDetails2:function() {
        this.printDetails({
            accountingId:2
        });
    },
    
    onColumn: function() {
        var o = this.getParams();
        this.print({
            columnId:o.get('columnId').getValue()
        });
    },
    
    onColumnDetails:function() {
        var o = this.getParams();
        this.printDetails({
            columnId:o.get('columnId').getValue()
        });
    },
    
    
    onDepartment:function() {
        var o = this.getParams();
        this.print({
            departmentId:o.get('departmentId').getValue()
        });
    },
    
    onDepartmentEmpty:function() {
        var o = this.getParams();
        this.print({
            departmentId:o.get('departmentId').getValue(),
            employeeId: -1
        });
    },
    
    
    onDepartmentDetails:function() {
        var o = this.getParams();
        this.printDetails({
            departmentId:o.get('departmentId').getValue()
        });
    },
    
    onDriver:function() {
        
        var o = this.getParams();
        
        this.print({
            driverId:o.get('driverId').getValue().DriverId
        });
    },
    
    onEmployee:function() {
        var o = this.getParams();
        
        this.print({
            employeeId:o.get('employeeId').getValue().EmployeeId
        });
    },
    
    onDriverDetails:function() {
        
        var o = this.getParams();
        
        this.printDetails({
            driverId:o.get('driverId').getValue().DriverId
        });
    },
    
    getParams:function(){
       var o = Kdn.mapItems(this,'dataIndex');
       return o;
    },
    
    print:function(params) {

    var date = this.getParams().get('inventoryDate').getValue();
    
    var o = {
            date : date,
            columnId: 0,
            departmentId: 0,
            driverId: 0,
            employeeId: 0
        };

        o = Ext.apply(o, params);

        Kdn.Reporter.exportReport("Inventory", o,"PDF");
        
    },
    
    printDetails:function(params) {

    var o = {
            date: this.getParams().get('inventoryDate').getValue(),
            columnId: 0,
            departmentId: 0,
            driverId: 0,
            accountingId: 0
        };

        o = Ext.apply(o, params);

        Kdn.Reporter.exportReport("InventoryDetails", o, "PDF");
    }
});

Ext.reg('view.report.inventory', T.view.report.Inventory);