T.view.vehicleDistribution.WaybillInsertWindow = Ext.extend(Ext.Window, {
    constructor: function(cfg) {
        cfg = cfg || {};

        Ext.apply(cfg, {
            layout: 'form',
            autoScroll: true,
            cls: 'insertForm',
            defaults: {
                anchor: '-20'
            },
            labelWidth: 150,
            padding: 3,
            items: [
                {
                    dataIndex: 'Vehicle',
                    readOnly:true,
                    ref:'car',
                    fieldLabel: 'Автомобиль',
                    xtype: 'combo.car',
                    selectOnFocus: true
                },
                {
                    xtype: 'datetimefield',
                    ref: 'departuredate',
                    fieldLabel: 'Выезд',
                    anchor: null,
                    dataIndex: 'DepartureDate',
                    dateConfig: {
                        readOnly: true
                    }
                },
                {
                    xtype: 'datetimefield',
                    ref: 'returndate',
                    fieldLabel: 'Возвращение',
                    anchor: null,
                    dataIndex: 'ReturnDate',
                    listeners: {
                        change: this.onReturnDateChange,
                        specialkey: this.onFieldKey,
                        scope: this
                    }
                },
                {
                    dataIndex: 'Shift',
                    ref:'shift',
                    fieldLabel: 'Смена',
                    xtype: 'kdn.editor.numberfield',
                    baseChars: "12",
                    anchor: null,
                    width: 30,
                    listeners: {
                        change: this.onShiftChange,
                        specialkey:this.onFieldKey,
                        scope: this
                    }
                },
                {
                    dataIndex: 'DayCount',
                    listeners: {
                        change: this.onDayCountChange,
                        specialkey: this.onFieldKey,
                        scope: this
                    },
                    ref:'daycount',
                    fieldLabel: 'Кол-во дней',
                    xtype: 'kdn.editor.numberfield',
                    anchor: null,
                    width: 30
                },
                {
                    dataIndex: 'ScheduleId',
                    fieldLabel: 'График',
                    xtype: 'combo.schedule',
                    editable: true,
                    objectValue: false
                },
                {
                    dataIndex: 'WaybillTypeId',
                    ref:'waybilltypeid',
                    fieldLabel: 'Форма бланка',
                    xtype: 'combo.waybilltype',
                    selectOnFocus: true,
                    editable: true,
                    objectValue: false
                },
                {
                    dataIndex: 'TrailerId',
                    readOnly: true,
                    fieldLabel: 'Прицеп',
                    xtype: 'combo.trailer',
                    enableClear: true,
                    objectValue: false
                },
                {
                    dataIndex: 'DestRoutePoint',
                    readOnly: true,
                    fieldLabel: 'Маршрут',
                    xtype: 'kdn.editor.textfield',
                    allowBlank: true
                },
                {
                    dataIndex: 'SrcRoutePoint',
                    fieldLabel: 'Пункт отправления',
                    editable: true,
                    xtype: 'combo.routepoint',
                    objectValue: false,
                    allowBlank: true
                },
                {
                    dataIndex: 'DstRoutePoint',
                    fieldLabel: 'Пункт назначения',
                    editable: true,
                    xtype: 'combo.routepoint',
                    objectValue: false,
                    allowBlank: true
                },
                {
                    title: 'Водители',
                    ref: 'drivers',
                    xtype: 'view.waybill.waybillinsertdriver',
                    enableAdd: false,
                    frame: true,
                    height: 150
                },
                {
                    title: 'Заказчики',
                    enableAdd: false,
                    ref: 'customers',
                    xtype: 'view.waybill.waybillinsertcustomer',
                    frame: true,
                    height: 150
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    layoutConfig: {
                        padding: '5',
                        align: 'top'
                    },
                    items: [
                        {
                            xtype: 'spacer',
                            flex: 1
                        },
                        {
                            xtype: 'view.waybill.issuebutton',
                            ref:'../IssueButton',
                            scale: 'large',
                            text: 'Выдать',
                            anchor: null,
                            iconCls: 'icon-print32',
                            width: 110,
                            scope: this,
                            handler: this.onIssueButtonClick
                        }
                    ]
                }
            ]

        });


        this.addEvents("waybillinsert");

        T.view.vehicleDistribution.WaybillInsertWindow.superclass.constructor.call(this, cfg);

        var em = this.EventMap = new Ext.util.MixedCollection();
        var eo = Ext.EventObject;
        em.add(eo.ENTER, 'ENTER');

        this.on({
            afterrender:this.onAfterRender,
            scope:this,
            single:true
        });

    },


    onAfterRender: function () {
    },
    

    onFieldKey:function(field,e) {

         if (e.getKey() == e.ENTER) {

             if (field.triggerBlur) field.triggerBlur();

             this.IssueButton.focus.defer(50, this.IssueButton);

         } 
        
    },

    fill: function(rec) {

        this.fillCustomers(rec.get('Customers'));
        this.fillDrivers(rec.get('Drivers'));

        this.record = rec;

        this.items.each(function(f) {
            if (f.dataIndex) {
                f.setValue(rec.get(f.dataIndex));
            }
        });

        this.waybilltypeid.setValue(rec.get('Vehicle').WaybillTypeId);
        this.onReturnDateChange();
    },

    fillCustomers: function(c) {
        this.customers.store.loadData(c, false);
    },

    fillDrivers: function (d) {

        var _d = [];
        //фильтруем водителей не работащих.
        d.map(function(i) {
            if (i.Cause == 0) {
                _d.push(i);
            }
            return i;
        });

        this.drivers.store.loadData({ data: _d }, false);
    },
    
    onReturnDateChange: function () {

        var ret = this.returndate.getValue(),
            dep = this.departuredate.getValue();


        var count = Kdn.fixDecimal((ret - dep) / (1000 * 60 * 60 * 24), 0);
        count++;
        if (count > 31) count = 31
        this.daycount.setValue(count);
    },
    
    onDayCountChange: function () {
        var dep = this.departuredate.getValue(),
            ret = this.returndate;
        if (dep) {
            var time = ret.getValue().format('H:i');
            var date = dep.add(Date.DAY, this.daycount.getValue() - 1);
            ret.setValue(Kdn.parseDate(date.clearTime(),time));
        }
    },

    onShiftChange: function () {

        var v = (this.car.getValue());

        var dep = this.departuredate.getValue(),
            ret = this.returndate.getValue();

        var f = "H:i",
            start = v['StartWork']||'08:00',
            end = v['EndWork']||'16:45',
            startDate = Date.parseDate(start, f),
            endDate = Date.parseDate(end, f);


        if (this.shift.getValue() == 1) {
            this.departuredate.setValue(Kdn.parseDate(dep, start));
            this.returndate.setValue(Kdn.parseDate(dep, end));
            this.onReturnDateChange();
            return;
        }


        var diffMinutes = (
            endDate.getHours() * 60 + endDate.getMinutes()
        ) - (
            startDate.getHours() * 60 + startDate.getMinutes()
        );

        var d = Kdn.parseDate(dep, end);
        this.departuredate.setValue(d);
        this.returndate.setValue(d.add(Date.MINUTE, diffMinutes));

        this.onReturnDateChange();
    },

    onIssueButtonClick:function() {
        var data = {
            ListDetailId:this.record.id     
        };

        this.items.each(function(f) {
            if (f.dataIndex) {
                data[f.dataIndex] = f.getValue();
            }
        });

        data.Drivers = this.drivers.store.getData().map(function (v){return v.Driver});
        data.Customers = this.customers.store.getData().map(function(v) {return v.Customer});


        this.fireEvent("waybillinsert", data);
    }


});

Ext.reg('view.waybillinsertwindow', T.view.vehicleDistribution.WaybillInsertWindow);