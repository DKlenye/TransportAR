T.view.InventoryComission = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'InventoryComission',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
               defaults:{filter:{}},
                columns: [
                    {
                        dataIndex: 'Department',
                        header: 'Цех/Про-во',
                        width: 200,
                        editor: { xtype: 'combo.department', objectValue:true, allowBlank:true, enableClear:true},
                        renderer:function(o){
                           if(!o) return null;
                            return o['DepartmentName'];
                        }
                    },
                    {
                        dataIndex: 'Column',
                        header: 'Колонна',
                        width: 200,
                        editor: { xtype: 'combo.transportcolumn', objectValue:true, allowBlank:true, enableClear:true},
                        renderer:function(o){
                           if(!o) return null;
                            return o['ColumnName'];
                        }
                    },
                    {
                        dataIndex: 'Employee0',
                        header: 'Председатель',
                        width: 200,
                        renderer:T.combo.Employee.prototype.renderTpl,
                        editor: { xtype: 'combo.employee', enableClear:true }
                    },
                   {
                        dataIndex: 'Employee1',
                        header: '№1',
                        width: 200,
                        renderer:T.combo.Employee.prototype.renderTpl,
                        editor: { xtype: 'combo.employee', enableClear: true }
                    },
                    {
                        dataIndex: 'Employee2',
                        header: '№2',
                        width: 200,
                        renderer:T.combo.Employee.prototype.renderTpl,
                        editor: { xtype: 'combo.employee', enableClear: true }
                    },
                    {
                        dataIndex: 'Employee3',
                         header: '№3',
                        width: 200,
                        renderer:T.combo.Employee.prototype.renderTpl,
                        editor: { xtype: 'combo.employee', enableClear: true }
                    },
                    {
                        dataIndex: 'Employee4',
                         header: '№3',
                        width: 200,
                        renderer:T.combo.Employee.prototype.renderTpl,
                        editor: { xtype: 'combo.employee', enableClear: true }
                    }
                ]
            })
        });

        T.view.InventoryComission.superclass.constructor.call(this, cfg);

    },
    
    EmployeeRenderer:function(e) {
        if (!e) return null;
        return String.format("{0} {1} {2}")
    }
});

Ext.reg('view.inventorycomission', T.view.InventoryComission);