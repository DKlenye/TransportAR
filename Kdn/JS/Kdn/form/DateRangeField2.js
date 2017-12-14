Kdn.form.DateRangeField2 = Ext.extend(Ext.form.Field, {
    defaultAutoCreate: {
        tag: 'input',
        type: 'hidden'

    },

    initComponent: function() {
        Kdn.form.DateRangeField2.superclass.initComponent.call(this);

        Ext.apply(this, {
            type: new Kdn.form.ComboBox({
                displayField: 'name',
                valueField: 'id',
                store: new Ext.data.ArrayStore({
                    id: 0,
                    fields: ['id', 'name'],
                    data: [[1, 'Год'], [2, 'Квартал'], [3, 'Месяц']]
                }),
                width: 110,
                value: 2,
                listeners: {
                    scope: this,
                    select: this.onRangeTypeSelect
                }
            }),
            year: Ext.create({
                xtype: 'numberfield',
                value: new Date().getFullYear() - (new Date().getMonth() == 0 ? 1 : 0),
                width: 60
            }),
            quarter: new Kdn.form.ComboBox({
                displayField: 'name',
                valueField: 'id',
                store: new Ext.data.ArrayStore({
                    id: 0,
                    fields: ['id', 'name'],
                    data: [[1, 'I'], [2, 'II'], [3, 'III'], [4, 'IV']]
                }),
                width: 40
            }),
            month: Ext.create({
                hidden:true,
                xtype: 'datefield',
                plugins: 'monthPickerPlugin',
                format: 'F Y',
                width: 120
            }),
            start: Ext.create({
                xtype: 'datefield',
                hidden: true
            }),
            end: Ext.create({
                xtype: 'datefield',
                hidden: true
            })
        })
    },

    onRender: function(ct, position) {
        // don't run more than once
        if (this.isRendered) {
            return;
        }

        // render underlying hidden field
        Kdn.form.DateRangeField2.superclass.onRender.call(this, ct, position);

        var t = Ext.DomHelper.append(ct, {
            tag: 'table',
            style: 'border-collapse:collapse',
            children: [
                {
                    tag: 'tr',
                    children: [
                        {
                            tag: 'td',
                            style: 'padding-right:4px',
                            cls: 'ux-daterange-type'
                        }, {
                            tag: 'td',
                            cls: 'ux-daterange-year'
                        },
                        {
                            tag: 'td',
                            cls: 'ux-daterange-quarter'
                        },
                        {
                            tag: 'td',
                            cls: 'ux-daterange-month'
                        },
                        {
                            tag: 'td',
                            cls: 'ux-daterange-start'
                        },
                        {
                            tag: 'td',
                            cls: 'ux-daterange-end'
                        }
                    ]
                }
            ]
        }, true);

        this.type.render(t.child('td.ux-daterange-type'));
        this.year.render(t.child('td.ux-daterange-year'));
        this.quarter.render(t.child('td.ux-daterange-quarter'));
        this.month.render(t.child('td.ux-daterange-month'));
        this.start.render(t.child('td.ux-daterange-start'));
        this.end.render(t.child('td.ux-daterange-end'));
    },

    onRangeTypeSelect: function(c) {
        this.hideFields();
        var fields = [];
        switch (c.getValue()['id']) {
        case 1:
        {
            fields = ['year'];
            break;
        }
        case 2:
        {
            fields = ['year', 'quarter'];
            break;
        }
        case 3:
        {
            fields = ['month'];
            break;
        }
        case 4:
        {
            fields = ['start', 'end'];
            break;
        }
        }
        this.showFields(fields);
    },

    hideFields: function() {
        var me = this;
        Ext.iterate(['year', 'quarter', 'month', 'start', 'end'], function(e) {
            me[e].hide();
        });
    },

    showFields: function(fields) {
        var me = this;
        Ext.iterate(fields, function(e) {
            me[e].show();
        });
    },


    setValue:function(value) {
        Kdn.form.DateRangeField2.superclass.setValue.call(this, value);

        var date = Ext.isObject(value) ? value.start : value;
        var end = Ext.isObject(value) ? value.end : value;

        this.year.setValue(date.getFullYear());
        this.month.setValue(date);
        this.quarter.setValue(date.getQuarter());
        this.start.setValue(date);
        this.end.setValue(end);

    },

    getValue: function() {
        var type = this.type.getValue().id;
        var start, end;
        switch (type) {
        case 1:
        {
            start = Date.parseDate('0101' + this.year.getValue(), 'dmY');
            end = start.add(Date.YEAR, 1).add(Date.DAY,-1);
            break;
        }
        case 2:
        {
            var month = this.quarter.getValue().id * 3 - 3;


            start = Date.parseDate('0101' + this.year.getValue(), 'dmY').add(Date.MONTH, month);
            end = start.add(Date.MONTH, 3).add(Date.DAY, -1);
            break;
        }
        case 3:
        {
            start = this.month.getValue();
            end = start.add(Date.MONTH, 1).add(Date.DAY, -1);
            break;
        }
        case 4:
        {
            start = this.start.getValue();
            end = this.end.getValue();
            break;
        }
        }

        return {
            start: start,
            end: end
        };
    }
});

Ext.reg('daterangefield2', Kdn.form.DateRangeField2);