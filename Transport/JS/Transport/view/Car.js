T.view.Car = Ext.extend(T.view.Trailer, {

    requireModels: 'WaybillType,Department,TransportColumn,BodyType,WorkType,WorkUnit,GroupAcc,Fuel,ServiceGroup,ReportGroup,TransmissionType,VehicleModel',
    modelName: 'FullCar',
    editor: 'view.careditor',
    pageMode: 'remote',
    pageSize: 50,
    _getColumns: function()
    {

        var columns = T.view.Car.superclass._getColumns.call(this);


        var _col = {

            BodyTypeId: {
                header: 'Тип тр. средства'
            },
            SelfMass: {
                header: 'Масса без нагрузки, кг'
            },
            FullMass: {
                header: 'Полная масса, кг'
            }
        };



        Ext.iterate(columns, function(e)
        {
            if (_col[e.dataIndex])
            {
                Ext.apply(e, _col[e.dataIndex]);
            }
        });



        return columns.concat([
        {
            dataIndex: 'CabinNumber',
            header: '№ кузова(кабины)',
            width: 100,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'Category',
            header: 'Категория транспорта',
            width: 100,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'Customer',
            header: 'Заказчик',
            width: 100,
            editor: { xtype: 'combo.customer', allowBlank: true, enableClear: true },
            renderer: function(o)
            {
                if (!o && !Ext.isObject(o)) return null;
                return o['CustomerName']
            },
            hidden: true
        },
        {
            dataIndex: 'ResponsibleDriver',
            header: 'мат.отв. Водитель',
            width: 250,
            editor: { xtype: 'combo.driver', readOnly: true },
            renderer: T.combo.Driver.prototype.renderTpl,
            hidden: true
        },
        {
            dataIndex: 'EngineNumber',
            header: '№ двигателя',
            width: 100,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'EngineModel',
            header: 'Модель двигателя',
            width: 100,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'EngineTypeId',
            header: 'Тип двигателя',
            width: 100,
            editor: { xtype: 'combo.enginetype', objectValue: false },
            renderer: function(v)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('EngineType'),
                   rec = store.getById(v);
                if (rec) return rec.get('EngineTypeName');
                return null;
            },
            hidden: true
        },
        {
            dataIndex: 'EcologyClassId',
            header: 'Экологический класс',
            width: 100,
            editor: { xtype: 'combo.ecologyclass', objectValue: false },
            renderer: function(v)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('EcologyClass'),
                   rec = store.getById(v);
                if (rec) return rec.get('EcologyClassName');
                return null;
            },
            hidden: true
        },
        {
            dataIndex: 'EngineVolume',
            header: 'Объём двигателя, см3',
            width: 100,
            editor: { xtype: 'kdn.editor.numberfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'EnginePower',
            header: 'Мощность двигателя, квт (лс)',
            width: 100,
            editor: { xtype: 'kdn.editor.numberfield', allowBlank: true },
            renderer: function(v)
            {
                return Ext.isNumber(v) ? (String.format("{0} ({1}л.с.)", v, (v * 1.3596).toFixed())) : v;
            },
            hidden: true
        },
        {
            dataIndex: 'FuelVolume',
            header: 'Объём топл. бака, л',
            width: 100,
            editor: { xtype: 'kdn.editor.numberfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'CoolantVolume',
            header: 'Объём охл. жидк., л',
            width: 100,
            editor: { xtype: 'kdn.editor.numberfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'EngineOilVolume',
            header: 'Объём масла в двигателе, л',
            width: 100,
            editor: { xtype: 'kdn.editor.numberfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'HydraulicOilVolume',
            header: 'Объём гидравлич. масла, л',
            width: 100,
            editor: { xtype: 'kdn.editor.numberfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'ScheduleId',
            header: 'График работы',
            width: 100,
            editor: { xtype: 'combo.schedule', allowBlank: true, objectValue: false },
            renderer: function(v)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('Schedule'),
                   rec = store.getById(v);
                if (rec) return rec.get('ScheduleName');
                return null;
            },
            hidden: true
        },
        {
            dataIndex: 'StartWork',
            header: 'Начало работы',
            width: 100,
            editor: { xtype: 'kdn.editor.timefield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'EndWork',
            header: 'Окончание работы',
            width: 100,
            editor: { xtype: 'kdn.editor.timefield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'CapacityPassengers',
            header: 'Кол-во пассажиров, чел',
            width: 100,
            editor: { xtype: 'kdn.editor.numberfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'WaybillTypeId',
            header: 'Бланк пут. листа',
            width: 120,
            renderer: function(o)
            {
                if (!o) return null;
                var store = Kdn.ModelFactory.getStore('WaybillType');
                var record = store.getById(o);
                if (record) return record.data['WaybillTypeName']
            },
            editor: { xtype: 'combo.waybilltype', objectValue: false },
            hidden: true
        },
        {
            dataIndex: 'PackageTypeId',
            header: 'Пачка пут. листа',
            width: 120,
            renderer: function(o)
            {
                if (!o) return null;
                var store = Kdn.ModelFactory.getStore('WaybillPackageType');
                var record = store.getById(o);
                if (record) return record.data['PackageTypeName']
            },
            editor: { xtype: 'combo.waybillpackagetype', objectValue: false, editable: true },
            hidden: true
        },
        {
            dataIndex: 'TrailerId',
            header: 'Прицеп',
            width: 150,
            editor: { xtype: 'combo.trailer', enableClear: true },
            hidden: 'true',
            renderer: T.combo.Trailer.prototype.renderTpl
        },
        {
            dataIndex: 'PolymirSHU',
            header: 'Участок(Полимир)',
            width: 100,
            'hidden': true,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true }
        },
        {
            dataIndex: 'CostCode',
            header: 'Код затрат',
            width: 100,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true }
        },
        {
            dataIndex: 'Disposal',
            header: 'В чьё распоряжение',
            width: 200,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true },
            hidden: true
        },
        {
            dataIndex: 'RefuellingGroupId',
            header: 'Для заправки(старая бухг.)',
            width: 100,
            'hidden': true,
            editor: { xtype: 'combo.refuellinggroup', objectValue: false, enableClear: true },
            renderer: function(v)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('RefuellingGroup'),
                   rec = store.getById(v);
                if (rec) return rec.get('RefuellingGroupName');
                return null;
            }
        },
        {
            dataIndex: 'AccGroupId',
            header: 'Группа по бухг. учёту',
            width: 100,
            editor: { xtype: 'combo.accgroup', objectValue: false, enableClear: true },
            renderer: function(v)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('AccGroup'),
                  rec = store.getById(v);
                if (rec) return rec.get('AccGroupName')+"("+rec.get("CostCode")+")";
                return null;
            }
        },
        {
            dataIndex: 'AccGroupNewId',
            header: 'Группа по бухг.учёту(2)',
            width: 100,
            editor: { xtype: 'combo.accgroupnew', objectValue: false, enableClear: true },
            renderer: function (v) {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('AccGroupNew'),
                  rec = store.getById(v);
                if (rec) return rec.get('AccGroupName');
                return null;
            }
        },
        {
            dataIndex: 'ServiceGroupId',
            header: 'Группа по услугам',
            width: 100,
            hidden:true,
            editor: { xtype: 'combo.servicegroup', objectValue: false, enableClear: true },
            renderer: function(v) {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('ServiceGroup'),
                  rec = store.getById(v);
                if (rec) return rec.get('ServiceGroupName');
                return null;
            }
        },
        {
            dataIndex: 'ReportGroupId',
            header: 'Группа для отчётов',
            width: 100,
            hidden: true,
            editor: { xtype: 'combo.reportgroup', objectValue: false, enableClear: true },
            renderer: function(v) {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('ReportGroup'),
                  rec = store.getById(v);
                if (rec) return rec.get('ReportGroupName');
                return null;
            }
        },

        {
            dataIndex: 'GroupRequestId',
            header: 'Группа по разнарядке',
            width: 100,
            editor: { xtype: 'combo.grouprequest', objectValue: false, enableClear: true },
            renderer: function(v)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('GroupRequest'),
                  rec = store.getById(v);
                if (rec) return rec.get('GroupRequestName');
                return null;
            }

        },

        {
            dataIndex: 'VehicleOilGroupId',
            header: 'Группа по маслам',
            width: 100,
            editor: { xtype: 'combo.vehicleoilgroup', objectValue: false, enableClear: true },
            renderer: function(v)
            {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('VehicleOilGroup'),
                  rec = store.getById(v);
                if (rec) return rec.get('VehicleOilGroupName');
                return null;
            }

        },
        {
            dataIndex: 'BusinessPlanGroupId',
            header: 'Группа по бизнес плану',
            width: 100,
            editor: { xtype: 'combo.businessplangroup', objectValue: false, enableClear: true },
            renderer: function (v) {
                if (!v) return v;
                var store = Kdn.ModelFactory.getStore('BusinessPlanGroup'),
                  rec = store.getById(v);
                if (rec) return rec.get('BusinessPlanGroupName');
                return null;
            }

        },
        
        {
            dataIndex: 'ModelHeater',
            hidden:true,
            header: 'Марка отопителя',
            width: 100,
            editor: { xtype: 'kdn.editor.textfield', allowBlank: true }
        },

        {
            dataIndex: 'TransmissionType',
            hidden: true,
            header: 'Тип КПП',
            width: 100,
            editor: { xtype: 'combo.transmissiontype', enableClear:true , allowBlank: true },
            renderer: Kdn.Renderer.object("TransmissionTypeName")
        },

            {
                dataIndex: 'NotUsedDate',
                xtype:'datecolumn',
                hidden: true,
                header: 'Дата вывода из эксплуатации',
                editor: {
                    xtype: 'datefield',
                    allowBlank: true
                }
            }
        
        ]);


},

_getStore: function()
{

    Ext.iterate(['Petrol', 'Increase', 'TransportColumn', 'BodyType'], function(e)
    {
        Kdn.ModelFactory.getStore(e)
    });

    return T.view.Car.superclass._getStore.call(this);
},

_getTbar: function () {
    var tBar = T.view.Car.superclass._getTbar.call(this);
    return tBar.concat([{
        iconCls: 'icon-lorry_error',
        text: 'Показывать списанные',
        pressed: true,
        enableToggle: true,
        scope: this,
        handler: function (field) {
            var store = this.store;
            store.reload({
                params: {
                    sqlFilter: field.pressed ? "" : "WriteOffDate is null"
                }
            });
        }
    }]);
}

});

Ext.reg('view.car', T.view.Car);