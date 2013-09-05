T.colModel.KmLimits = Ext.extend(Ext.grid.ColumnModel, {
   
constructor:function(cfg){
      cfg = cfg||{};
      Ext.apply(cfg,{
         columns: ((cfg.columns||[]).concat(this.getColumns()))
      });
      T.colModel.KmLimits.superclass.constructor.call(this, cfg);
   },
   
   getColumns:function(){
      return [      
                    {
                        dataIndex: 'Period',
                        align: 'center',
                        header: 'Начало действия',
                        width: 150,
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
                        dataIndex: 'KmLimit',
                        align: 'center',
                        header: 'Лимит, км',
                        width: 150,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'Id',
                        align: 'center',
                        header: 'Код',
                        width: 80,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    }
          ]
   }
   
});
