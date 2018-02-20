T.view.acc.AccRefuelling = Ext.extend(Ext.grid.EditorGridPanel, {
    constructor: function(cfg)
    {
        cfg = cfg || {};


        var store = new Ext.data.DirectStore({
            autoSave: true,
            autoDestroy: true,
            writer: new Ext.data.JsonWriter({
                encode: false,
                writeAllFields: true
            }),
            api: {
                read: Kdn.Direct.AccRefuellingRead,
                update: Kdn.Direct.AccRefuellingUpdate
            },
            idProperty: 'RefuellingId',
            fields: [
            'RefuellingId',
            'WaybillId',
            { name: 'SheetNumber', allowBlank: true },
            { name: 'AccPeriod', allowBlank: true },
            { name: 'CardNumber', allowBlank: true },
            'FuelName',
            'Quantity',
            'RefuellingDate',
            'GarageNumber',
            'FIO',

             { name: 'TankId', allowBlank: true },
              { name: 'TrkId', allowBlank: true },
               { name: 'SheetId', allowBlank: true }
            ],
            root: 'data'
        });


        Ext.apply(cfg, {

            store: store,
            loadMask: true,
            columnLines: true,
            stripeRows: true,

            view: new Ext.ux.grid.BufferView({
                scrollDelay: false
            }),

            plugins: [
				   'filterrow',
				   new Ext.ux.grid.GridSummary({ position: 'bottom' })
				],

            columns: [
                   {
                       header: 'Код',
                       width: 100,
                       dataIndex: 'RefuellingId'
                   },
                   {
                       header: 'Дата',
                       xtype: 'datecolumn',
                       dataIndex: 'RefuellingDate',
                       width: 130,
                       align: 'center'
                   },
                   {
                       header: '№ пут. л.',
                       dataIndex: 'WaybillId',
                       width: 100,
                       filter: {}
                   },
                   {
                       header: 'Топливо',
                       dataIndex: 'FuelName',
                       width: 105,
                       filter: {}
                   },
                   {
                       header: 'Гар.№',
                       dataIndex: 'GarageNumber',
                       width: 100,
                       filter: {}
                   },
                   {
                       header: 'Водитель',
                       dataIndex: 'FIO',
                       width: 200,
                       filter: {}
                   },
                   {
                       header: '№ карты',
                       dataIndex: 'CardNumber',
                       editor: { xtype: 'kdn.editor.textfield', allowBlank: true },
                       width: 100,
                       filter: {}
                   },
                   {
                       header: 'Количество',
                       dataIndex: 'Quantity',
                       width: 110,
                       align: 'center',
                       summaryType: 'sum'
                   },
                   {
                       header: 'Бухг. период',
                       dataIndex: 'AccPeriod',
                       width: 130,
                       renderer: function(e)
                       {
                           if (!e) return e;
                           return Date.parseDate(e, 'Ym').format('F Yг.');
                       },
                       editor: {
                           xtype: 'datefield',
                           plugins: 'monthPickerPlugin',
                           format: 'F Y',
                           allowBlank: true,
                           triggersConfig: [{ iconCls: "x-form-clear-trigger", qtip: "Очистить"}],
                           listeners: {
                               scope: this,
                               triggerclick: function(item, trigger, index, tag, e)
                               {
                                   item.reset();
                                   item.fireEvent('select', item);
                               }
                           },
                           setValue: function(val)
                           {
                               if (val && !Ext.isDate(val))
                               {
                                   val = Date.parseDate(val + '', 'Ym');
                               }

                               return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(this.parseDate(val)));
                           },
                           getValue: function()
                           {
                               var val = this.parseDate(Ext.form.DateField.superclass.getValue.call(this));
                               if (!val) return null;
                               return parseInt(val.format('Ym'));
                           },
                           onTriggerClick: function()
                           {
                               if (this.disabled)
                               {
                                   return;
                               }
                               if (this.menu == null)
                               {
                                   this.menu = new Ext.menu.DateMenu({
                                       hideOnClick: false,
                                       focusOnSelect: false
                                   });
                               }
                               this.onFocus();
                               Ext.apply(this.menu.picker, {
                                   minDate: this.minValue,
                                   maxDate: this.maxValue,
                                   disabledDatesRE: this.disabledDatesRE,
                                   disabledDatesText: this.disabledDatesText,
                                   disabledDays: this.disabledDays,
                                   disabledDaysText: this.disabledDaysText,
                                   format: this.format,
                                   showToday: this.showToday,
                                   startDay: this.startDay,
                                   minText: String.format(this.minText, this.formatDate(this.minValue)),
                                   maxText: String.format(this.maxText, this.formatDate(this.maxValue))
                               });
                               this.menu.picker.setValue(Date.parseDate(this.getValue() + '', 'Ym') || new Date());
                               this.menu.show(this.el, "tl-bl?");
                               this.menuEvents('on');
                           }

                       }
                   },
                   {
                       header: 'Ведомость',
                       dataIndex: 'SheetId',
                       width: 80,
                       editor: { xtype: 'numberfield' }
                   },
                    {
                        header: 'ТРК.',
                        dataIndex: 'TrkId',
                        width: 80,
                        editor: { xtype: 'numberfield' }
                    },
                   {
                       header: 'Рез.',
                       dataIndex: 'TankId',
                       width: 80,
                       editor: {xtype:'numberfield'}
                   },

            ],
            tbar: [
               '-',
               {
                   text: 'Обновить',
                   iconCls: 'icon-refresh',
                   scope: this,
                   handler: this.reload
               },
               '-',
               'Период:',
               {
                   xtype: 'datefield',
                   plugins: 'monthPickerPlugin',
                   format: 'F Y',
                   value: new Date(),
                   width: 130,
                   listeners: {
                       scope: this,
                       select: this.reload
                   },
                   dataIndex: 'period'
               },
               '-',
               {
                   xtype: 'combo.accounting',
                   objectValue: false,
                   width: 200,
                   listeners: {
                       scope: this,
                       select: this.reload
                   },
                   dataIndex: 'accounting'
               },
               '-',
               'Место заправки:',
               {
                   xtype: 'combo.refuellingplace',
                   dataIndex: 'refuellingPlaceId',
                   value: 7,
                   objectValue: false,
                   listeners: {
                       scope: this,
                       select: this.reload
                   }
               }

            ]

        });

        T.view.acc.AccRefuelling.superclass.constructor.call(this, cfg);
    },



    getParams: function()
    {
        var tbar = this.getTopToolbar();
        var params = {};
        tbar.items.each(function(i)
        {
            if (i.dataIndex)
            {
                params[i.dataIndex] = i.getValue();
            }
        });

        return params;

    },

    reload: function()
    {
        var params = this.getParams();
        this.store.reload({ params: params });
    }

});

Ext.reg('view.acc.accrefuelling', T.view.acc.AccRefuelling);