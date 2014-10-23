T.view.RequestCraneEditor = Ext.extend(Ext.Panel, {

    constructor: function(cfg)
    {
        cfg = cfg || {};

        Ext.apply(cfg, {
            layout: {
                type: 'border'
            },

            items: [
                {
                    region: 'center',
                    margins: '2 2 2 2',
                    xtype: 'kdn.grid.propertygrid',
                    source: {
                        RequestDate: '',
                        CustomerName:'',
                        CraneType: '',
                        WorkPlace: '',
                        WorkObject: '',
                        WorkType: '',
                        PowerLineExists: '',
                        Responsible: '',
                        ProjectExists:'',
                        ResponsibleOrder:'',
                        LicenceNumber:''
                    },
                    propertyNames:{
                         RequestDate: 'Выделить транспорт на дату',
                         CustomerName:'Наименование заказчика',
                         LicenceNumber:'',
                         WorkPlace:'Место проведения работ',
                         WorkObject:'Объект',
                         WorkType:'Характер(вид) работы',
                         CraneType:'Тип подъёмника',
                         PowerLineExists:'Наличие ЛЭП на месте работы',                         
                         Responsible:'Ответственное лицо за безопастное проведение работ',
                         ProjectExists:'Наличие проекта или технологии производства работ',
                         ResponsibleOrder:'№ приказа о назначении отв. лиц и стропальщиков',
                         LicenceNumber:'№ лицензии'
                    }
                },               
                {
                    region: 'south',
                    margins: '0 2 2 2',
                    height: 130,
                    xtype: 'grid',
                    columnLines: true,
                    stripeRows: true,                    
                    title: 'Стропальщики',
                    iconCls: 'icon-user-worker',
                    store: new Ext.data.JsonStore({
                            fields:['Office','FIO','CertificateNumber','DateKnowledge']
                    }),
                    viewConfig:{
                        forceFit:true
                    },
                    colModel:new Ext.grid.ColumnModel({
                        defaults:{
                            align:'center'
                        },
                        columns: [
                            {
                            header: 'Должность',
                            dataIndex: 'Office'
                        },
                        {
                            header: 'Фио',
                            dataIndex: 'FIO'
                        },
                         {
                             header: '№ удостоверения',
                             dataIndex: 'CertificateNumber'
                         },
                         {
                            header: 'Дата пров. знаний',
                              dataIndex: 'DateKnowledge',
                              format:'d.m.Y',
                              xtype:'datecolumn'
                         }
                        ]
                    })

                }

            ]
            });            

        T.view.RequestCraneEditor.superclass.constructor.call(this, cfg);
    },

    fill: function(request)
    {
        var prop = this.items.itemAt(0);
        var source = prop.getSource();

        Ext.iterate(source, function(key, val)
        {
            source[key] = request[key];
        });

        prop.setSource(source);
        this.fillSlingers(request.Slingers);

    },

    fillSlingers: function(slingers)
    {
        var grid = this.items.itemAt(1);
        grid.store.loadData(slingers, false);
    }


});

Ext.reg('view.requestcraneeditor', T.view.RequestCraneEditor);