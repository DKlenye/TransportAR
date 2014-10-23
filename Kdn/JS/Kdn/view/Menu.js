Kdn.view.Menu = Ext.extend(Ext.ux.tree.TreeGrid, {

    initComponent: function() {

        Ext.apply(this, {
            enableDD: true,
            enableSort: false,
            columns: [
                {
                    header: 'Наименование',
                    dataIndex: 'Text'
                },
                {
                    header: 'Иконка',
                    dataIndex: 'IconCls'
                },
                {
                    header: 'Порядок',
                    dataIndex:'Sequence'
                },
                {
                    header: 'Функция-обработчик',
                    dataIndex: 'Handler'
                },
                {
                    header: 'Конфиг обработчика',
                    dataIndex: 'HandlerCfg'
                }

            ]
        });

        Kdn.view.Menu.superclass.initComponent.call(this);

    }
});

Ext.reg('kdn.view.menu', Kdn.view.Menu);