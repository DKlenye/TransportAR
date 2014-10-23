T.view.Request = Ext.extend(Kdn.view.BaseGrid, {

    modelName: 'v_Request',
    pageSize: 50,
    pageMode: 'remote',

    constructor: function(cfg)
    {
        cfg = cfg || {};


        Ext.apply(cfg, {
            store: new Ext.data.Store(),
            columns: [
                    {
                        header: 'Статус',
                        dataIndex: 'Status',
                        width: 110,
                        renderer: function(v)
                        {
                            if (v == 1)
                            {
                                return '<span class="label label-warning">Отправлена</span>'
                            }
                            if (v == 2)
                            {
                                return '<span class="label label-success">Принята</span>'
                            }
                            if (v == 3)
                            {
                                return '<span class="label label-important">Возвращена</span>'
                            }

                        }
                    },
                    {
                        header: 'Тип',
                        dataIndex: 'RequestType',
                        width: 120/*,
                        renderer: Kdn.Renderer.icons(function(e)
                        {
                            if (e == 'Crane') return 'TruckMountedCrane';
                            if (e == 'Freight') return 'Truck';
                            if (e == 'Passengers') return 'carPassenger';
                        })*/
                    },
                    {
                        header: '№ заявки',
                        dataIndex: 'RequestId',
                        width: 70
                    },
                    {
                        header: 'Дата поездки',
                        xtype: 'datecolumn',
                        dataIndex: 'RequestDate',
                        filter: {
                            field: {
                                xtype: 'datefield',
                                triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить"}],
                                listeners: {
                                    triggerclick: {
                                        fn: function(item, trigger, index, tag, e)
                                        {
                                            item.reset();
                                            item.fireEvent('select');
                                        }
                                    }
                                }
                            },
                            fieldEvents: ["select"],
                            test: function(filterValue, value)
                            {
                                if (!filterValue) return true;
                                return value.clearTime() - filterValue.clearTime() == 0;
                            }
                        },
                        width: 120
                    },
                    {
                        header: 'ФИО',
                        dataIndex: 'UserFio',
                        width: 200
                    },
                    {
                        header: 'Опубликовано',
                        xtype: 'datecolumn',
                        dataIndex: 'PublishDate'
                    }
         ],
            tbar: [
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
            'Дата:',
            {
                xtype: 'kdn.editor.datefield'
            }
         ]
        });



        T.view.Request.superclass.constructor.call(this, cfg);
    },

    _getTbar: function()
    {
        return null;
    },
    onSelectionChange: function()
    {
        
    }


});

Ext.reg('view.request', T.view.Request);