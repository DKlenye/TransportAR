T.view.CalculateTariffEditor = Ext.extend(Kdn.editor.ModelEditor, {

    mode: null, // create update

    closeAfterSave: false,

    getItems: function () {

        var renderer = Ext.util.Format.numberRenderer("00,000");

        return [
            {
                    region: 'center',
                    bodyStyle: {
                        'border-width': '0 0 0 1'
                    },
                    headerStyle: {
                        'border-width': '0 0 0 0'
                    },
                    xtype: 'kdn.grid.propertygrid',
                    ref:'rezult',
                    propertyNames: {
                        DayTariff:'Дневной тариф, руб',
                        SixMonthRun: 'Среднедневной пробег за 6 месяцев, км',
                        Salary: 'Заработная плата водителя, руб',
                        AdditionalSalary: 'Заработная плата вспомогательного персонала, руб',
                        Insurance:'Страховые взносы, руб',
                        PetrolConsumption:'Расходы на топливо, руб',
                        OilConsumption:'Расходы на смазочные материалы, руб',
                        Repair : 'Расходы на техническое обслуживание, руб',
                        Amortization: 'Аммортизация основных средств, руб',
                        Tires : 'Эксплуатация шин, руб',
                        OverHead: 'Общепроизводственные расходы, руб',
                        Management:'Управленческие расходы, руб',
                        CostPrice: 'Себестоимость перевозок, руб',
                        Profit:'Прибыль, руб',
                        Proceeds: 'Выручка, руб',
                        KmRunTariff: 'Тариф за 1 км пробега, руб',
                        KmTariff: 'Себестоимость 1 км перевозки, руб',
                        KmTariff1:'Тариф за 1 км, руб',
                        HourTariff: 'Себестоимость 1 час работы, руб',
                        HourTariff1:'Тариф за 1 час работы, руб'
                    },
                    customRenderers: {
                        DayTariff: renderer,
                        SixMonthRun: renderer,
                        Salary: renderer,
                        AdditionalSalary: renderer,
                        Insurance: renderer,
                        PetrolConsumption: renderer,
                        OilConsumption: renderer,
                        Repair: renderer,
                        Amortization: renderer,
                        Tires: renderer,
                        OverHead: renderer,
                        Management: renderer,
                        CostPrice: renderer,
                        Profit: renderer,
                        Proceeds: renderer,
                        KmTariff: renderer,
                        KmRunTariff: renderer,
                        HourTariff: renderer,
                        KmTariff1: renderer,
                        HourTariff1: renderer
                    }
                },
                {
                    region: 'west',
                    layout: 'fit',
                    padding: '1',
                    split: true,
                    width: 500,
                    bodyStyle: {
                        'border-width': '0 1 0 0'
                    },
                    headerStyle: {
                        'border-width': '0 1 1 0'
                    },
                    items: [
                        {
                            xtype: 'form',
                            frame: true,
                            border: false,
                            autoScroll: true,
                            labelWidth: 180,
                            defaults: {
                                anchor: '-20',
                                xtype: 'textfield',
                                defaults: {
                                    anchor: '0',
                                    xtype: 'textfield'
                                }
                            },
                            items: [
                                {
                                    xtype: 'combo.car2',
                                    fieldLabel: 'Авто',
                                    ref: '//Car',
                                    listeners: {
                                        select: this.onCarChange,
                                        scope: this
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Дата',
                                    ref: '//Date',
                                    value: new Date()
                                },

                                { xtype: 'numberfield', fieldLabel: 'Среднемес. норма раб. вр., ч', ref: '//MonthWorkNorm' },
                                { xtype: 'numberfield', fieldLabel: 'Рабочая смена, ч', ref: '//ScheduleDuration' },
                                {
                                    xtype: 'fieldset',
                                    checkboxToggle: true,
                                    title: 'Прицеп',
                                    ref: '//IsTrailerInclude',
                                    items: [
                                        { fieldLabel: 'Прицеп', ref: '///TrailerId', xtype: 'combo.trailer',objectValue:false, enableClear:true }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    checkboxToggle: true,
                                    title: 'Заработная плата',
                                    ref: '//IsSalaryInclude',
                                    items: [
                                        { xtype: 'combo.driver', fieldLabel: 'Водитель', ref: '///Driver' },
                                        { fieldLabel: '2 водителя', ref: '///IsDoubleDriver', xtype: 'checkbox' },
                                        { xtype: 'numberfield', fieldLabel: 'К. доплат к зп. с премией', ref: '///Surcharge' }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Страховые взносы',
                                    items: [
                                        { fieldLabel: 'ФСЗН, %', ref: '///SocialInsurance' },
                                        { fieldLabel: 'Белгосстрах, %', ref: '///BgsInsurance' }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    checkboxToggle: true,
                                    title: 'ГСМ',
                                    ref: '//IsFuelInclude',
                                    items: [
                                        { xtype: 'combo.petrol', fieldLabel: 'Топливо', ref: '///Petrol' },
                                        { xtype: 'numberfield', fieldLabel: 'Норма л/100км', ref: '///CarNorm' },
                                        { xtype: 'numberfield', fieldLabel: 'Норма л/1 ткм', ref: '///TkmNorm' },
                                        { xtype: 'numberfield', fieldLabel: 'Вес груза, т', ref: '///CargoWeight' }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'ТО и ремонт',
                                    items: [
                                        { fieldLabel: 'Индекс цен произв.', ref: '///ProducerPriceIndex' }
                                    ]
                                },
                                { xtype: 'numberfield', fieldLabel: 'Общепроизв. расходы, %', ref: '//OverheadProc' },
                                { xtype: 'numberfield', fieldLabel: 'Управленческие расходы, %', ref: '//ManagementProc' },
                                { xtype: 'numberfield', fieldLabel: 'Рентабельность, %', ref: '//ProfitProc' },
                                { xtype: 'numberfield', fieldLabel: 'Ставка НДС, %', ref: '//VATRate' },
                                { xtype: 'textarea', fieldLabel: 'Примечание', ref: '//Description' }
                            ],
                            buttons: [
                                { scale: 'large', iconCls:'icon-calculator32', text: 'Рассчитать', handler: this.calculateTariff, scope: this }
                            ]
                        }
                    ]
                }
            ]
    },


    getTbar: function () {
        return [
	         { xtype: 'tbspacer', width: 10 },
	         '-',
	         { xtype: 'button.save' },
	         '-',
             { xtype: 'tbspacer', width: 10 },
             '-',
            {
                text: 'Калькуляция',
                iconCls: 'icon-excel',
                handler: function() {

                    var id = this.record.id;

                    var params = {};
                    params.id = id;
                    Kdn.Reporter.exportReport("TariffCalculation", params, "Excel")
                },
                scope: this
            },
            '-'
        ]
    },

   setRecordData: function(o) {

        var record = this.record;
        Ext.iterate(o, function(key, val) {
            record.set(key, val);
        });
    },

    onAfterRender:function() {

        T.view.CalculateTariffEditor.superclass.onAfterRender.call(this);

        this.record = this.record || new this.grid.store.recordType();

        this.record.beginEdit();

    },

    fillEditor: function () {

        var record = this.record;

        if (!record) return;
    
        this.refs.eachKey(function (dataIndex, component) {

            var value = record.get(dataIndex);
            if (component.xtype == 'fieldset') {
                (!!value) ?
                    component.expand() :
                    component.collapse();
            }
            if (component.xtype == "datefield") {
                value = Ext.data.Types.DATE.convert(value);
            }
            if (component.propertyNames/*propertygrid*/) {

                var source = {};

                Ext.iterate(component.propertyNames, function(key,val,o) {
                    value = record.get(key);
                    source[key] = value;
                });
                
                component.setSource(source);

            }
            if (component.setValue) {
                component.setValue(value);
            }
        });
    },

    onCarChange: function () {
        this.applyViewData();
        this.getCalculationParams();
    },

    applyViewData   : function () {
        var me = this;
        Ext.iterate(this.getViewData(), function(key,value) {
            if (value !== "") {
                me.record.set(key, value);
            } else {
                me.record.set(key, null);
            }
        });
    },
    getViewData:function() {
        var o = {};
        this.refs.eachKey(function(dataIndex, component) {
        
            var value;

            if (component.xtype == 'fieldset') {
                value = !component.collapsed;
            }

            if (component.getValue) {
                value = component.getValue();
            }

            if (component.source/*propertygrid*/) {
                var propertyNames = [];
                for (p in component.propertyNames) {
                    propertyNames.push(p);
                }
                Ext.copyTo(o, component.source, propertyNames);
            }

            o[dataIndex] = value;
        });
        return o;
    },
    setViewData: function () {

        var record = this.record;
        this.refs.eachKey(function (dataIndex, component) {

            var value = record.get(dataIndex);
            if (component.xtype == 'fieldset') {
                (!!value) ?
                    component.expand() :
                    component.collapse();
            }
            if (component.xtype == "datefield") {
                value = Ext.data.Types.DATE.convert(value);
            }
            if (component.propertyNames/*propertygrid*/) {

                var source = {};

                Ext.iterate(component.propertyNames, function(key,val,o) {
                    value = record.get(key);
                    source[key] = value;
                });
                
                component.setSource(source);

            }
            if (component.setValue) {
                component.setValue(value);
            }
        });
    },

    getCalculationParams: function () {
        var me = this;
        me.getEl().mask('Загрузка','x-mask-loading');
        Kdn.Direct.PrepareWithVehicle(me.record.data, function (o) {
            me.setRecordData(o);
            me.setViewData();
            me.getEl().unmask();
        });
    },

    calculateTariff: function () {

        var me = this;
        me.getEl().mask('Загрузка', 'x-mask-loading');
        me.applyViewData();
        Kdn.Direct.CalculateTariff(me.record.data, function (o) {

            me.setRecordData(o);
            me.setViewData();
            me.getEl().unmask();
        });
    },

    commitChanges: function () {

        var me = this,
            record = this.getFillRecord(),
            store = me.grid.store;
    
        me.applyViewData();

        if (!record.dirty) return;


        store.on({
            save:this.onStoreSave,
            scope:this,
            single:true,
            buffer:100
        });


        me.getEl().mask('Сохранение', 'x-mask-loading');

        record.endEdit();
         if (!record['store']) store.insert(0, record);

    },


    onStoreSave:function() {

        this.record.beginEdit();
        this.getEl().unmask();
    }


});

    Ext.reg('view.calculatetariffeditor', T.view.CalculateTariffEditor);