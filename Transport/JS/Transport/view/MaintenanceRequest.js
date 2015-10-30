T.view.MaintenanceRequest = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'MaintenanceRequest',
    editor: 'view.maintenancerequesteditor',
    pageSize: 50,
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {
            colModel: new Ext.grid.ColumnModel({
                defaults: { filter: {} },
                columns: [
                    {
                        dataIndex: 'MaintenanceRequestId',
                        header: '№ заявки',
                        width: 80,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'Department',
                        hidden: true,
                        header: 'Цех/Производство',
                        width: 80,
                        editor: { xtype: 'combo.department' },
                        renderer: Kdn.Renderer.object("DepartmentName")
                    },
                    {
                        dataIndex: 'Car',
                        hidden: true,
                        hideable: false,
                        header: 'Транспортное средство',
                        editor: {
                            xtype: 'combo.car2'
                        }
                    },
                    {
                        dataIndex: 'Car.GarageNumber',
                        xtype: 'mappingcolumn',
                        align: 'center',
                        header: 'Гар. №',
                        width: 70
                    },
                    {
                        dataIndex: 'Car.Model',
                        xtype: 'mappingcolumn',
                        header: 'Марка',
                        width: 200
                    },
                    {
                        dataIndex: 'Car.RegistrationNumber',
                        align: 'center',
                        xtype: 'mappingcolumn',
                        header: 'Гос. №',
                        width: 90
                    },
                    {
                        header: 'Водитель',
                        width: 240,
                        dataIndex: 'Driver',
                        renderer: T.combo.Driver.prototype.renderTpl,
                        editor: { xtype: 'combo.driver' },
                        filter: {
                            field: {
                                xtype: 'combo.driver',
                                enableClear: true
                            },
                            fieldEvents: ["select"]
                        }
                    },
                    {
                        dataIndex: 'RequestDate',
                        header: 'Дата заявки',
                        width: 100,
                        xtype: 'datecolumn',
                        editor: { xtype: 'kdn.form.datefield' }
                    },
                    {
                        dataIndex: 'TO1',
                        align: 'center',
                        header: 'ТО1',
                        width: 50,
                        renderer: Kdn.CheckRenderer,
                        editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }
                    },
                    {
                        dataIndex: 'TO2',
                        align: 'center',
                        header: 'ТО2',
                        width: 50,
                        renderer: Kdn.CheckRenderer,
                        editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }

                    },
                    {
                        dataIndex: 'SO',
                        align: 'center',
                        header: 'СО',
                        width: 50,
                        renderer: Kdn.CheckRenderer,
                        editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }

                    },
                    {
                        dataIndex: 'TR',
                        align: 'center',
                        header: 'ТР',
                        width: 50,
                        renderer: Kdn.CheckRenderer,
                        editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }

                    },
                    {
                        dataIndex: 'OilReplace',
                        align: 'center',
                        header: 'Зам. масла',
                        width: 90,
                        renderer: Kdn.CheckRenderer,
                        editor: { xtype: 'kdn.editor.booleanfield', renderer: Kdn.CheckRenderer, allowBlank: true }
                    },
                    {
                        dataIndex: 'FuelRemain',
                        header: 'Остаток, л',
                        width: 80,
                        editor: { xtype: 'kdn.editor.decimalfield', allowBlank: true }
                    },
                    {
                        dataIndex: 'Km',
                        header: 'Спидометр, км',
                        width: 80,
                        editor: { xtype: 'kdn.editor.numberfield', allowBlank: true }
                    },
                    {
                        dataIndex: 'EndRequest',
                        header: 'Дата окончания',
                        width: 110,
                        xtype: 'datecolumn',
                        editor: { xtype: 'kdn.form.datefield', allowBlank: true }
                    }
                ]
            })
        });

        T.view.MaintenanceRequest.superclass.constructor.call(this, cfg);

        this.on({
            viewready: this.onAfterRender,
            scope: this,
            single: true
        });

    },

    onAfterRender: function() {

        var filter = "this_.DepartmentId = " + 9;
        this.store.reload({
            params: { sqlFilter: filter }
        });

    },


    _getTbar: function() {
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
            },
            '-',
            'Цех/Производство:',
            {
                xtype: 'combo.department',
                dataIndex: 'department',
                value: 9,
                width: 300,
                listeners: {
                    scope: this,
                    select: function(field) {
                        var store = Kdn.ModelFactory.getStore('MaintenanceRequest');
                        var val = field.getValue().DepartmentId;
                        var filter = "this_.DepartmentId = " + val;
                        store.reload({
                            params: { sqlFilter: filter }
                        });
                    }
                }
            },
            '-',
            {
                text: 'Добавить',
                iconCls: 'icon-add',
                handler: this.onAdd,
                scope: this,
                cls: 'add_btn'
            },
            '-',
            {
                text: 'Редактировать',
                iconCls: 'icon-edit',
                handler: this.onEdit,
                scope: this,
                cls: 'edit_btn',
                disabled: true
            },
            '-',
            {
                text: 'Удалить',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                scope: this,
                cls: 'delete_btn',
                disabled: true
            },
            '-',
            '->',
            '-',
            {
                text: 'Печать заявки',
                iconCls: 'icon-excel',
                handler: function() {
                    var sel = this.getSelectionModel().getSelected();
                    if (sel) {
                        var params = {};
                        params.RequestId = sel.get("MaintenanceRequestId");
                        Kdn.Reporter.exportReport("MaintenanceRequest", params, "PDF")
                    }
                },
                scope: this
            },
            '-',
            {
                text: 'Журнал заявок',
                iconCls: 'icon-excel',
                handler: function() {
                    var o = {};
                    this.getTopToolbar().items.each(function(e) {
                        if (e.dataIndex) {
                            o[e.dataIndex] = e.getValue();
                        }
                    });

                    var params = {};
                    params.DepartmentId = o.department.DepartmentId;
                    Kdn.Reporter.exportReport("MaintenanceRequestList", params, "EXCEL");
                },
                scope: this
            },
            '-'
        ]
    }
});

Ext.reg('view.maintenancerequest', T.view.MaintenanceRequest);