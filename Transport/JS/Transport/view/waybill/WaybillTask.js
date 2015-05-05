T.view.waybill.WaybillTask = Ext.extend(Kdn.editor.LocalGrid, {
    startEditColumn: 2,
    addPosition: 'last',
    selectionModel: 'Cell',
    constructor: function(cfg) {

        cfg = cfg || {};

        var api = {
            create: Kdn.Direct.WaybillTaskCreate,
            read: Kdn.Direct.Read,
            update: Kdn.Direct.WaybillTaskUpdate,
            destroy: Kdn.Direct.Destroy
        };

        var store = new Kdn.data.DirectStore(
            Kdn.ModelFactory.modelMgr.map.WaybillTask,
            {
                autoLoad: false,
                autoSave: true,
                api: api,
                sortInfo: {
                    field: 'TaskId',
                    direction: 'ASC'
                }
            }
        );

        var FuelEditor = Ext.create({
            xtype: 'combo.fuel',
            listWidth: 150,
            store: Kdn.ModelFactory.getModel('Fuel').buildStore({
                autoDestroy: true,
                autoLoad: false,
                autoSave: false
            }),
            objectValue: false,
            listeners: {
                afterrender: function() {
                    this.keyNav.down = function() {}
                },
                single: true,
                scope: FuelEditor
            }
        });

        var ConsumptionEditor = Ext.create({
            xtype: 'kdn.form.combobox',
            listWidth: 300,
            displayField: 'display',
            valueField: 'id',
            objectValue: false,
            store: new Ext.data.JsonStore({
                autoDestroy: true,
                fields: ['display', 'id']
            }),
            listeners: {
                afterrender: function() {
                    this.keyNav.down = function() {}
                },
                single: true,
                scope: ConsumptionEditor
            }
        });

        var DateEditor = Ext.create({
            xtype: 'kdn.editor.datefield',
            listeners: {
                afterrender: function() {
                    this.keyNav.down = function() {}
                },
                single: true,
                scope: DateEditor
            }
        });


        var IncreasesEditor = Ext.create({
            taskIncreaseStore: null,
            xtype: 'netmulticombo',
            listWidth: 300,
            valueField: 'IncreaseId',
            displayField: 'IncreaseName',
            triggerAction: 'all',
            mode: 'local',
            store: Kdn.ModelFactory.getModel('Increase').buildStore({
                autoDestroy: true,
                autoLoad: false,
                autoSave: false
            }),

            initComponent: function() {
                this.editable = false;
                if (!this.tpl) {
                    this.tpl = '<tpl for="."><div class="x-combo-list-item {[this.getItemClass()]}">' + '<img src="' + Ext.BLANK_IMAGE_URL + '" class="{[this.getImgClass(values)]}" />' + '<div class="x-mcombo-text"><b style="color:tomato;">{Prcn}%</b> {IncreaseName}</div></div></tpl>';
                    this.tpl = new Ext.XTemplate(this.tpl, {
                        getItemClass: (function() {
                            if (this.selectionMode === "selection") {
                                return "x-mcombo-nimg-item";
                            }
                            return "x-mcombo-img-item";
                        }).createDelegate(this),
                        getImgClass: (function(values) {
                            if (this.selectionMode === "selection") {
                                return "";
                            }
                            var found = false;
                            Ext.each(this.checkedRecords, function(record) {
                                if (values[this.valueField] == record.get(this.valueField)) {
                                    found = true;
                                    return false;
                                }
                            }, this);
                            return found ? "x-grid3-check-col-on" : "x-grid3-check-col";
                        }).createDelegate(this, [], true)
                    });
                }
                this.checkedRecords = [];
                Ext.net.MultiCombo.superclass.initComponent.apply(this, arguments);
                if (this.selectionPredefined) {
                    this.initSelection(this.selectionPredefined);
                }
                this.on("beforequery", this.onBeforeQuery);
            },

            triggerBlur: function() {
                this.mimicing = false;
                this.doc.un('mousedown', this.mimicBlur, this);
                if (this.monitorTab && this.el) {
                    this.un('specialkey', this.checkTab, this);
                }
                Ext.form.TriggerField.superclass.onBlur.call(this);
                if (this.wrap) {
                    this.wrap.removeClass(this.wrapFocusClass);
                }
            },

            assertValue: function() {},

            onSelect: function(record, index) {

                if (this.fireEvent("beforeselect", this, record, index) !== false) {
                    if (this.checkedRecords.indexOf(record) === -1) {
                        this.checkedRecords.push(record);
                    } else {
                        this.checkedRecords.remove(record);
                        this.deselectRecord(record);
                    }
                    if (this.store.isFiltered()) {
                        this.doQuery(this.allQuery);
                    }
                    this.setValue(this.getValue());
                    this.fireEvent("select", this, record, index);
                }
            },

            getText: function() {

                var a = this.getValue();
                var increaseStore = Kdn.ModelFactory.getStore('Increase');
                var txt = [];

                Ext.iterate(a || [], function(i) {
                    var r = increaseStore.getById(i['IncreaseId']);
                    if (r) {
                        txt.push(r.get('IncreaseName'));
                    }
                });

                return txt.join(',');
            },

            getValue: function(field) {

                var value = [];
                var taskRecord = this.taskRecord;
                var store = this.store;

                //Добавляем те, которые постоянные к норме    
                Ext.iterate(taskRecord.get('TaskIncreases') || [], function(i) {
                    var r = store.getById(i['IncreaseId']);
                    if (!r) {
                        value.push(i);
                    }
                });

                Ext.each(this.checkedRecords, function(record) {

                    value.push({
                        TaskId: taskRecord.id,
                        IncreaseId: record.get('IncreaseId'),
                        Prcn: record.get('Prcn')
                    });


                }, this);

                return this.valueType == 'array' ? value : (value.join(this.delimiter));
            },

            clearValue: function() {

                Ext.net.MultiCombo.superclass.clearValue.call(this);
                this.checkedRecords = [];
                delete this.selectionPredefined;
                this.store.clearFilter();
                this.store.fireEvent("datachanged", this.store);
                this.saveSelection();
            },

            setValue: function(v) {

                var store = this.store;
                var a = [];

                Ext.iterate(v, function(i) {
                    var r = store.getById(i['IncreaseId']);
                    if (r) {
                        a.push(i['IncreaseId']);
                    }
                });

                Ext.net.MultiCombo.prototype.setValue.call(this, a);

            }
        });


        Ext.apply(cfg, {
            FuelEditor: FuelEditor,
            ConsumptionEditor: ConsumptionEditor,
            IncreasesEditor: IncreasesEditor,
            DateEditor: DateEditor,
            enableHdMenu: false,
            enableColumnMove: false,
            colModel: new Ext.grid.ColumnModel({
                defaults: {
                    sortable: false
                },
                columns: [
                    {
                        header: "Код затрат",
                        dataIndex: "CostCode",
                        width: 90,
                        renderer: {
                            scope: this,
                            fn: function(value, meta, rec) {

                            value = value || "";
                                
                                /*meta.style += "padding:0px;";
                            return "<img src=\"images/icons/edit.png\"/>";*/
                            var vehicleCostCode = this.mainView.vehicle.CostCode||"";
                            var customer = rec.get("Customer");
                            var customerCostCode = "";
                            var returnCostCode = "";
                            
                            if (customer) {
                                customerCostCode = customer.CostCode;
                            } else {
                                return value;
                            }
                            
                            if (!!value.trim()) {
                                returnCostCode = value;
                                meta.css = 'waybill-task-hand-costcode';
                            }
                            else if (!!vehicleCostCode.trim() && !customer.isPolymir && customerCostCode.substr(0, 2) != "90") {
                                returnCostCode = vehicleCostCode;
                                meta.css = 'waybill-task-vehicle-costcode';
                            } else {
                                returnCostCode = customerCostCode;
                                meta.css = 'waybill-task-customer';
                            }

                                return returnCostCode;
                            }
                        },


                        editor: {
                            xtype: 'textfield',
                            allowBlank: true,
                            minLength: 8,
                            maxLength: 8,
                            baseChars : "0123456789"
                        }
                        /*listeners: {
                            click: function(column, view, rowIndex, e) {
                                console.log(arguments);
                            }
                        }*/
                    },
                    {
                        header: 'Код',
                        dataIndex: 'TaskId',
                        width: 30,
                        hidden: true
                    },
                    {
                        header: 'заказчик',
                        width: 170,
                        dataIndex: 'Customer',
                        editor: { xtype: 'combo.customer' },
                        renderer: function(o, meta, r) {
                            meta.css = 'waybill-task-customer';
                            if (!o && !Ext.isObject(o)) return null;

                            var tip = String.format("<b><span style='font-size:15px;'>[{0}] : {1} <span style='color:tomato'> {2}</span></span></b>", o['CustomerId'], (o['CustomerName'] + '').replace(/"/g, '\''), o['CostCode']);
                            meta.attr = 'ext:qtip="' + tip + '"';

                            return o['CustomerName1'] || o['CustomerName'];
                        }
                    },
                    {
                        header: 'дата',
                        align: 'center',
                        width: 95,
                        dataIndex: 'TaskDepartureDate',
                        editor: { field: DateEditor },
                        renderer: function(o, meta) {
                            meta.css = 'waybill-task-work';
                            return Ext.util.Format.date(o);
                        }
                    },
                    {
                        header: 'ед.',
                        width: 95,
                        dataIndex: 'WorkAmount',
                        align: 'center',
                        editor: {
                            xtype: 'kdn.editor.decimalfield',
                            decimalPrecision: 3,
                            allowNegative: false
                        },
                        renderer: {
                            scope: this,
                            fn: function(v, meta, rec) {

                                if (!v) return null;

                                meta.css = 'waybill-task-work-bold';

                                var info = this.getConsumptionInfo(rec.get('NormConsumptionId'));
                                if (info && info.norm && info.norm.MotoToMachineKoef) {
                                    var moto = Kdn.fixDecimal(v / info.norm.MotoToMachineKoef);
                                    return v + '<span style="color:tomato"><i> ' + moto + 'мшч</i></span>';
                                }

                                return v;
                            }
                        }
                    },
                    {
                        header: 'км с грузом',
                        width: 65,
                        dataIndex: 'WeightKm',
                        align: 'center',
                        editor: {
                            xtype: 'kdn.editor.decimalfield',
                            decimalPrecision: 3,
                            allowNegative: false
                        },
                        renderer: function(v, meta) {
                            meta.css = 'waybill-task-work';
                            return v;
                        }
                    },
                    {
                        header: 'груз, т',
                        align: 'center',
                        width: 70,
                        dataIndex: 'Weight',
                        editor: {
                            xtype: 'kdn.editor.decimalfield',
                            decimalPrecision: 3,
                            allowNegative: false
                        },
                        renderer: function(v, meta) {
                            meta.css = 'waybill-task-work';
                            return v;
                        }
                    },
                    {
                        header: 'Загр-узка',
                        align: 'center',
                        width: 50,
                        dataIndex: 'isLoad',
                        xtype: 'checkcolumn',
                        checkHandler: (function(rec) {
                        }).createDelegate(this),
                        beforeCheck: (function() {
                            if (this.mainView.isAccClosed()) return false;
                        }).createDelegate(this)
                    },
                    {
                        header: 'ткм',
                        width: 75,
                        dataIndex: 'tkm',
                        align: 'center',
                        renderer: function(v, meta, rec) {
                            var tkm = (rec.get('Weight') || 0) * (rec.get('WeightKm') || 0);
                            return tkm > 0 ? Kdn.fixDecimal(tkm, 3) : null;
                        }
                    },
                    {
                        header: 'пасс.',
                        align: 'center',
                        width: 45,
                        dataIndex: 'Passengers',
                        editor: {
                            xtype: 'kdn.editor.numberfield',
                            allowDecimals: false,
                            allowNegative: false,
                            allowBlank: true
                        },
                        renderer: function(v, meta) {
                            meta.css = 'waybill-task-work';
                            return v;
                        }
                    },
                    {
                        header: 'РБ',
                        align: 'center',
                        width: 55,
                        dataIndex: 'BYkm',
                        editor: {
                            xtype: 'kdn.editor.numberfield',
                            allowDecimals: false,
                            allowNegative: false,
                            allowBlank: true
                        },
                        renderer: function(v, meta, rec) {
                            meta.css = 'waybill-task-by';
                            if (v == null || v === '') {
                                return rec.get('WorkAmount');
                            } else return v;
                        }
                    },
                    {
                        header: 'Прицеп',
                        align: 'center',
                        width: 70,
                        dataIndex: 'TrailerId',
                        editor: { xtype: 'combo.trailer', enableClear: true },
                        renderer: function(v) {
                            if (!v) return null;
                            var store = Kdn.ModelFactory.getStore('Trailer');
                            var record = store.getById(v);
                            if (record) return new Ext.Template('[{GarageNumber}]').apply(record.data);
                        }
                    },
                    {
                        header: 'Норма расхода ГСМ',
                        width: 150,
                        dataIndex: 'NormConsumptionId',
                        renderer: {
                            fn: this.consumptionRenderer,
                            scope: this
                        },
                        editor: { field: ConsumptionEditor }
                    },
                    {
                        header: 'гсм',
                        width: 50,
                        align: 'center',
                        dataIndex: 'FuelId',
                        renderer: function(o, meta) {
                            meta.css = 'waybill-task-norm';
                            if (!o) return o;
                            var store = Kdn.ModelFactory.getStore('Fuel'),
                                rec = store.getById(o);
                            if (rec) {
                                return rec.data.ShortFuelName;
                            }
                            return o;
                        },
                        editor: { field: FuelEditor }
                    },
                    {
                        header: 'Надбавки',
                        width: 100,
                        dataIndex: 'TaskIncreases',
                        renderer: function(o, m, r) {

                            m.css = 'waybill-task-norm';


                            /*
                            meta.css='waybill-task-customer';
                            if (!o && !Ext.isObject(o)) return null;
                                                        
                            var tip = String.format("<b><span style='font-size:15px;'>[{0}] : {1}</span></b>",o['CustomerId'],(o['CustomerName']+'').replace(/"/g,'\''));                            
                            
                            
                            return o['CustomerName']; 
                            */

                            var increases = o,
                                a = [],
                                aQtip = [],
                                tpl = '{0}:{1}%',
                                qtipTpl = "<span style='font-size:14px;'><b style='color:tomato;'>{1}%</b> {0}</span>",
                                sum = 0,
                                store = Kdn.ModelFactory.getStore('Increase');

                            if (increases) {
                                Ext.iterate(increases, function(i) {
                                    var rec = store.getById(i['IncreaseId']);
                                    sum += i['Prcn'];
                                    a.push(String.format(tpl, rec.data.IncreaseShortName, i['Prcn']));
                                    aQtip.push(String.format(qtipTpl, rec.data.IncreaseName, i['Prcn']));
                                });

                                if (a.length > 1) {
                                    a = a.concat(String.format('<br/><b>Всего {0}%<b/>', sum));
                                    aQtip = aQtip.concat(String.format('<br/><b>Всего {0}%<b/>', sum));
                                }

                                m.attr = 'ext:qtip="' + aQtip.join('</br>') + '"';

                                return a.join(', ');
                            }

                            return null;
                        },
                        editor: { field: IncreasesEditor }
                    },
                    /*
                {
                header: 'Надбавки',
                width: 100,
                dataIndex:'TaskIncreases',
                renderer:function(o,m,r){
                        
                console.log(arguments)
                        
                m.css='waybill-task-norm';
                var increases = o,
                a = [],
                tpl = '{0}:{1}%',
                sum = 0,
                store = Kdn.ModelFactory.getStore('Increase');
                               
                if(increases){
                Ext.iterate(increases,function(i){
                var rec = store.getById(i['IncreaseId']);
                sum+=i['Prcn'];
                a.push(String.format(tpl,rec.data.IncreaseShortName,i['Prcn']));                                 
                });
                              
                if (a.length>1){
                a = a.concat(String.format('<br/><b>Всего {0}%<b>',sum));
                } 
                return a.join(', ');
                } 
                           
                return null;                          
                },
                editor:{field:IncreasesEditor}
                },*/
                    {
                        header: 'Расход топлива',
                        width: 75,
                        dataIndex: 'Consumption',
                        align: 'center',
                        editor: {
                            xtype: 'kdn.editor.decimalfield',
                            allowNegative: false
                        },
                        renderer: function(v, meta) {
                            meta.css = 'waybill-task-consumption';
                            return v;
                        }
                    },
                    {
                        header: 't°C',
                        dataIndex: 'Temperature',
                        align: 'center',
                        width: 55
                    },
                    {
                        header: 'Без уч. расх.',
                        align: 'center',
                        width: 60,
                        dataIndex: 'isUnaccounted',
                        xtype: 'checkcolumn',
                        checkHandler: (function(rec) {
                            //this.calculateNormConsumption(rec); 
                            //this.refreshMain();
                        }).createDelegate(this),
                        beforeCheck: (function() {
                            if (this.mainView.isDispClosed()) return false;
                        }).createDelegate(this)
                    },
                    {
                        header: 'Само- свал',
                        align: 'center',
                        width: 50,
                        dataIndex: 'isTruck',
                        xtype: 'checkcolumn',
                        checkHandler: (function(rec) {
                            //this.calculateNormConsumption(rec); 
                            //this.refreshMain();
                        }).createDelegate(this),
                        beforeCheck: (function() {
                            if (this.mainView.isDispClosed()) return false;
                        }).createDelegate(this)
                    },
                    {
                        header: 'Пункт отправления',
                        dataIndex: 'SrcRoutPoint',
                        width: 100,
                        editor: { xtype: 'combo.routepoint', editable: true, objectValue: false, enableClear: true },
                        renderer: function(e) {
                            if (!e) return null;
                            var rec = Kdn.ModelFactory.getStore('RoutePoint').getById(e);
                            if (rec) return rec.get('RoutePointName');
                            return null;
                        }
                    },
                    {
                        header: 'Пункт назначения',
                        dataIndex: 'DstRoutPoint',
                        width: 100,
                        editor: { xtype: 'combo.routepoint', editable: true, objectValue: false, enableClear: true },
                        renderer: function(e) {
                            if (!e) return null;
                            var rec = Kdn.ModelFactory.getStore('RoutePoint').getById(e);
                            if (rec) return rec.get('RoutePointName');
                            return null;
                        }
                    },
                    {
                        header: 'Груз',
                        dataIndex: 'CargoName',
                        width: 130,
                        editor: { xtype: 'kdn.editor.textfield', allowBlank: true }
                    }
                ]
            }),
            store: store,
            loadMask: true
        });

        T.view.waybill.WaybillTask.superclass.constructor.call(this, cfg);
    },


    initComponent: function() {
        T.view.waybill.WaybillTask.superclass.initComponent.call(this);

        this.on({
            scope: this,
            beforeedit: this.onBeforeEdit,
            afteredit: this.onAfterEdit
        });

        this.store.on({
            scope: this,
            write: this.onWrite
        });

    },

    onWrite: function() {

        this.refreshMain();

    },

    onAfterRender: function() {

        T.view.waybill.WaybillTask.superclass.onAfterRender.call(this);

        this.mon(this.getSelectionModel(), {
            scope: this,
            nolast: this.onNoLast
        });


        // Разрешаем доступ только бухгалтеру
        //TODO Переделать !!!!
        var UserId = Kdn.getUser().UserId;
        if ([1, 15, 16].indexOf(UserId) == -1) {
            this.getColumnModel().setHidden(0, true);
        }


    },

    onNoLast: function() {
        //  this.add();
    },

    setData: function(data) {
        var tasks = data["WaybillTask"];
        this.store.loadData({ data: tasks }, false);


    },

    initRecordIncrease: function(rec) {
        var taskIncreases = rec.data.TaskIncreases || [];

        var store = Kdn.ModelFactory.getModel('WaybillTaskIncrease').buildStore({
            autoDestroy: true,
            autoLoad: false,
            autoSave: false
        });

        store.loadData({ data: taskIncreases });
        rec.increases = store;

    },

    //Полная информация о норме расхода топлива 
    getConsumptionInfo: function(ConsumptionId) {

        var vehicle = this.mainView.vehicle;

        if (!ConsumptionId) return null;

        var norm = vehicle.norms.get(ConsumptionId),
            workTypeStore = Kdn.ModelFactory.getStore('WorkType'),
            workUnitStore = Kdn.ModelFactory.getStore('WorkUnit'),
            work = workTypeStore.getById(norm.WorkTypeId),
            unit = workUnitStore.getById(work.get('WorkUnitId'));

        return {
            norm: norm,
            work: work,
            unit: unit
        };

    },

    consumptionRenderer: function(v, meta) {
        if (meta) {
            meta.css = 'waybill-task-norm';
        }
        if (!v) return v;

        var info = this.getConsumptionInfo(v),
            notagTpl = '{1}л/{2}{3}{4} {0}',
            tpl = "<span style='color:blue;'><b>{1}</b>л</span>/<span style='color:brown;'>{2}{3}</span><b>{4}</b> {0}";

        if (!info) return null;


        var kmtm = "";
        if (info.norm.MotoToMachineKoef != null && info.norm.MotoToMachineKoef != 1) {
            kmtm = String.format("(К м.ч={0})", info.norm.MotoToMachineKoef);
        }


        var str = String.format((!meta ? notagTpl : tpl),
            info.work.get('WorkTypeName'),
            info.norm.Consumption,
            info.unit.get('Coefficient'),
            info.unit.get('UnitName'),
            kmtm
        );

        if (meta) {
            meta.attr = 'ext:qtip="' + "<span style='font-size:15px;'>" + str + '</span>' + '"';
        }

        return str;

    },

    getActualNorms: function(date) {
        var vehicle = this.mainView.vehicle;
        var actualNorms = [];
        Ext.iterate(vehicle.Norms, function(n) {
            var startDate = n.StartDate || date;
            var endDate = n.EndDate || date;
            if (n.Enabled && startDate <= date && endDate >= date) {
                actualNorms.push(n);
            }
        });
        return actualNorms;
    },

    beforeRemove: function(selections) {
        if (this.mainView.isDispClosed()) return null;
        return selections;
    },

    applyDefaults: function(record) {

        if (this.mainView.isDispClosed()) return null;

        var main = this.mainView,
            vehicle = main.vehicle,
            norms = vehicle.Norms,
            norm,
            tkmWorkId = T.config.TonneKilometerWorkId,
            cfg = {};

        var isTruck = vehicle.BodyTypeId == 18 || vehicle.BodyTypeId == 36;

        var TaskDepartureDate = main.waybillproperty.getSource()['DepartureDate'],
            WaybillId = main.waybillId,
            TrailerId = main.waybillproperty.getSource()['TrailerId'],
            Customer = vehicle['Customer'],
            NormConsumptionId = null,
            FuelId = null,
            WaybillTaskNormIncreases = [];

        var cnt = this.store.getCount()
        if (cnt > 0) {

            var lastRec = this.store.getAt(cnt - 1);

            /*
            var lastCustomer = lastRec.get('Customer');
            if (lastCustomer) {
            Customer = lastCustomer;
            }
            var lastFuelId = lastRec.get('FuelId');
            if (lastFuelId) {
            FuelId = lastFuelId;
            }
            
            */

            Ext.copyTo(record.data, lastRec.data, 'FuelId,WaybillId,Customer,TaskDepartureDate,NormConsumptionId,WaybillTaskNormIncreases');
            Ext.apply(record.data, {
                TrailerId: TrailerId,
                isTruck: isTruck
            });
            return record;
        }


        if (norms.length < 1) return;


        var actualNorms = this.getActualNorms(TaskDepartureDate) || [];
        Ext.iterate(actualNorms, function(n) {
            if (n.isMain) {
                norm = n;
            }
        });

        norm = norm || actualNorms.shift();

        if (norm) {
            NormConsumptionId = norm.NormId;
            FuelId = norm.MainFuelId || (norm.NormFuels.length == 0 ? null : norm.NormFuels[0]);
            WaybillTaskNormIncreases = norm.NormIncreases;
        }

        Ext.apply(cfg, {
            WaybillId: WaybillId,
            TaskDepartureDate: TaskDepartureDate,
            TrailerId: TrailerId,
            Customer: Customer,
            NormConsumptionId: NormConsumptionId,
            WaybillTaskNormIncreases: WaybillTaskNormIncreases,
            FuelId: FuelId,
            isTruck: isTruck
        });


        Ext.apply(record.data, cfg);

        return record;


    },


    onBeforeEdit: function(e) {


        var $ = this,
            main = $.mainView,
            vehicle = main.vehicle,
            rec = e.record;


        if (main.isAccClosed()) {
            var allowModifyAccFields = ['SrcRoutPoint', 'DstRoutPoint', 'CargoName'];
            if (allowModifyAccFields.indexOf(e.field) == -1) return false;
        }


        if (main.isDispClosed()) {
            var allowModifyFields = ['Customer', 'Passengers', 'SrcRoutPoint', 'DstRoutPoint', 'CargoName','CostCode'];
            if (allowModifyFields.indexOf(e.field) == -1) return false;
        }


        switch (e.field) {

        case 'Consumption':
        {
            if (rec.get('isTruck')) return false;
            this.store.autoSave = false;
            this.store.proxy.api.update = Kdn.Direct.WaybillTaskConsumptionUpdate;
            break;
        }

        case 'TaskDepartureDate':
        {

            this.store.autoSave = false;
            this.store.proxy.api.update = Kdn.Direct.WaybillTaskDateUpdate;
            break;
        }
        case 'Weight':
        {

            this.store.autoSave = false;

            break;
        }


        case 'NormConsumptionId':
        {
            var date = e.record.data.TaskDepartureDate,
                consumptionEditorStore = $.ConsumptionEditor.store,
                TkmWorkId = T.config.TkmWorkId,
                TkmWorkIdInFactory = T.config.TkmWorkIdInFactory;

            if (!date) {
                return false;
            } else {
                consumptionEditorStore.removeAll();
                vehicle.norms.each(function(n) {
                    var startDate = n.StartDate || date;
                    var endDate = n.EndDate || date;

                    if (n.WorkTypeId != TkmWorkId && n.WorkTypeId!=TkmWorkIdInFactory && n.Enabled && startDate <= date && endDate >= date) {
                        consumptionEditorStore.add(new consumptionEditorStore.recordType({
                            id: n.NormId,
                            display: $.consumptionRenderer(n.NormId)
                        }));
                    }
                });

                this.store.autoSave = false;
                this.store.proxy.api.update = Kdn.Direct.WaybillTaskNormUpdate;
                /*if (consumptionEditorStore.getCount()<=1) {
                        this.startEditing.defer(20,this,[e.row,e.column+1]);
                        return false;
                        }*/
            }
            break;
        }

        case 'FuelId':
        {
            var id = e.record.data.NormConsumptionId,
                fuelEditorStore = $.FuelEditor.store;
            if (!id) {
                // fuelEditorStore.removeAll();
                return false;
            } else {
                var norm = vehicle.norms.get(id),
                    fuelStore = Kdn.ModelFactory.getStore('Fuel'),
                    NormFuels = norm.NormFuels;
                //если топлива нет или одно то эдитор не открывать
                /* if(NormFuels && NormFuels.length<=1) {
                        this.startEditing.defer(20,this,[e.row,e.column+1]);
                        return false;
                        }  */

                fuelEditorStore.removeAll();
                Ext.iterate(norm.NormFuels, function(f) {
                    var fuel = fuelStore.getById(f);
                    if (fuel) fuelEditorStore.add(new fuelEditorStore.recordType(fuel.json));
                });
            }
            break;
        }

        case 'TaskIncreases':
        {

            this.store.autoSave = false;
            this.store.proxy.api.update = Kdn.Direct.WaybillTaskIncreasesUpdate;

            var cm = this.getColumnModel();
            column = cm.getColumnAt(e.column),
                editor = column.getEditor();
            editor.field.taskRecord = e.record;

            var norm = vehicle.norms.get(e.record.get('NormConsumptionId'));

            var taskIncreaseStore = this.IncreasesEditor.store,
                increaseStore = Kdn.ModelFactory.getStore('Increase');

            taskIncreaseStore.removeAll();

            if (norm.isMain) {
                increaseStore.each(function(i) {
                    if (i.get('isCommon')) {
                        taskIncreaseStore.add(new taskIncreaseStore.recordType(Kdn.clone(i.data), i.id));
                    }
                });
            }

            Ext.iterate(norm.increases, function(i) {

                if (!i.Const) {

                    var increase = increaseStore.getById(i.IncreaseId);
                    var data = Kdn.clone(i);
                    data.IncreaseName = increase.get('IncreaseName');


                    var defaultIncrease = taskIncreaseStore.getById(data.IncreaseId);
                    if (defaultIncrease) {
                        defaultIncrease.set('Prcn', data.Prcn);
                    } else {
                        taskIncreaseStore.add(new taskIncreaseStore.recordType(data, data.IncreaseId));
                    }
                }
            });
            break;
        }

        }

    },


    onAfterEdit: function(e) {

        var $ = this,
            main = $.mainView,
            vehicle = main.vehicle,
            rec = e.record;

        switch (e.field) {

        case 'Consumption':
        {
            this.store.save();
            this.store.autoSave = true;
            this.store.proxy.api.update = Kdn.Direct.WaybillTaskUpdate;
            break;
        }

        case 'TaskDepartureDate':
        {
            if (e.value != e.originalValue) {

                var normId = rec.data['NormConsumptionId'],
                    norm,
                    newNorm = null;

                if (!normId) {
                    var actualNorms = this.getActualNorms(e.value) || [];
                    Ext.iterate(actualNorms, function(n) {
                        if (n.isMain) {
                            norm = n;
                        }
                    });
                } else {
                    oldNorm = vehicle.norms.get(normId);
                    var actualNorms = this.getActualNorms(e.value) || [];
                    Ext.iterate(actualNorms, function(n) {
                        if (n.WorkTypeId == oldNorm.WorkTypeId) {
                            newNorm = n;
                            return false;
                        }
                    });
                }

                if (newNorm) {
                    rec.beginEdit();
                    rec.set('NormConsumptionId', newNorm['NormId']);
                    if (!rec.get('FuelId')) rec.set('FuelId', newNorm.MainFuelId || (newNorm.NormFuels.length > 0 ? newNorm.NormFuels[0] : null));
                    rec.endEdit();
                } else {
                    rec.beginEdit();
                    rec.set('NormConsumptionId', null);
                    rec.set('FuelId', null);
                    rec.endEdit();
                }
                this.store.save();
            }

            this.store.autoSave = true;
            this.store.proxy.api.update = Kdn.Direct.WaybillTaskUpdate;
            break;
        }
        case 'NormConsumptionId':
        {
            if (e.value != '' && e.value != e.originalValue) {
                var norm = vehicle.norms.get(e.value);
                rec.beginEdit();
                rec.set('FuelId', norm.MainFuelId || (norm.NormFuels.length > 0 ? norm.NormFuels[0] : null));
                rec.set('TaskIncreases', []);
                rec.endEdit();
                this.store.save();
            }

            this.store.autoSave = true;
            this.store.proxy.api.update = Kdn.Direct.WaybillTaskUpdate;

            break;
        }

        case 'Weight':
        {

            if (e.value != '' && e.value != e.originalValue) {

                rec.beginEdit();
                rec.set('isLoad', true);
                rec.endEdit();
                this.store.save();
            }

            this.store.autoSave = true;
            break;
        }

        case 'TaskIncreases':
        {
            var isTrip = false, TripIncreaseId = 1;
            this.store.each(function(rec) {
                Ext.iterate(rec.get('TaskIncreases'), function(increaseRec) {
                    if (increaseRec['IncreaseId'] == TripIncreaseId) {
                        isTrip = true;
                        return false;
                    }
                });

                if (isTrip) return false;
            });

            var mainView = this.mainView;
            var ScheduleId = mainView.waybillproperty.getSource()['ScheduleId'];

            if (isTrip && ScheduleId != 6) mainView.waybillproperty.setProperty('ScheduleId', 6);
            if (!isTrip && ScheduleId == 6) mainView.waybillproperty.setProperty('ScheduleId', 1);


            this.store.save();
            this.store.autoSave = true;
            this.store.proxy.api.update = Kdn.Direct.WaybillTaskUpdate;
        }
        }

    },
    refreshMain: function() {
        var v = this.mainView;
        if (v) {
            v.refreshNormConsumption();
            v.refreshDiff();
            v.summary.refreshSummary();
        }
    }


});

Ext.reg('view.waybill.waybilltask', Transport.view.waybill.WaybillTask);