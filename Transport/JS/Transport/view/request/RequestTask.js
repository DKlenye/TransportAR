T.view.RequestTask = Ext.extend(Ext.Panel, {

    requireModels: 'BodyType,TransportColumn',

    constructor: function(cfg) {
        cfg = cfg || {};
        var me = this;

        var OrderStore = Kdn.ModelFactory.getModel('VehicleOrder').buildStore({
            autoSave: true,
            autoLoad: false,
            autoDestroy: true,
            api: {
                read: Kdn.Direct.OrderRead,
                update: Kdn.Direct.Update
            }
        });

        var OrderDate = Ext.create({
            xtype: 'datefield',
            value: new Date(),
            listeners: {
                select: this.refreshOrders,
                scope: this
            }
        });


        var RequestStore = Kdn.ModelFactory.getModel('v_Request').buildStore({
            baseParams: {
                start: 0,
                limit: 50
            },
            remoteSort: true,
            autoSave: false,
            autoLoad: true,
            autoDestroy: true
        });


        var createEditor = function(xtype) {
            var EditorDefaults = { margins: '0 0 2 0', flex: 3, cls: 'request-editor' /*title: '.', iconCls: 'icon-page'*/ };
            return Ext.create(Ext.apply(EditorDefaults, { xtype: xtype }))
        }

        var Editors = {
            Empty: createEditor('container'),
            RequestFreight: createEditor('view.requestfreighteditor'),
            RequestCrane: createEditor('view.requestcraneeditor'),
            RequestPassengers: createEditor('view.requestpassengerseditor')
        }

        var RequestEditor = Ext.create({
            xtype: 'netmulticombo',
            valueField: 'RequestId',
            displayField: 'RequestId',
            triggerAction: 'all',
            mode: 'local',
            store: new Ext.data.JsonStore({
                fields: ['RequestId']
            })
        });


        Ext.apply(cfg, {

            RequestStore: RequestStore,
            OrderStore: OrderStore,
            OrderDate: OrderDate,
            Editors: Editors,
            RequestEditor: RequestEditor,

            plain: true,
            layout: 'border',
            items: [
            {
                title: 'Заявки',
                xtype: 'grid',
                enableDragDrop: true,
                columnLines: true,
                stripeRows: true,
                loadMask: true,
                ddGroup: 'DDGroup',
                region: 'west',
                width: 950,
                collapsible:true,
                margins: '2 0 2 2',
                split: true,
                store: RequestStore,
                plugins: ['filterrow'/*, expander2*/],
                colModel: new Ext.grid.ColumnModel({
                    defaults: { filter: {} },
                    columns: [
                    //expander2,
                        {
                        header: '№ заявки',
                        dataIndex: 'RequestId',
                        width: 70
                    },
                        {
                            header: 'Статус',
                            dataIndex: 'Status',
                            width: 105,
                            renderer: function(v) {
                                if (v == 0) {
                                    return '<span class="label label-gray">Опубликована</span>'
                                }
                                if (v == 1) {
                                    return '<span class="label label-warning">Подписана</span>'
                                }
                                if (v == 2) {
                                    return '<span class="label label-success">Принята</span>'
                                }
                                if (v == 3) {
                                    return '<span class="label label-important">Возвращена</span>'
                                }

                            }
                        },
                        {
                            header: 'Закреплена',
                            width: 40,
                            dataIndex: 'isLinked',
                            renderer: Kdn.Renderer.icon('link', function(e) {
                                return e;
                            })
                        },
                        {
                            header: 'Тип',
                            dataIndex: 'RequestType',
                            width: 90/*,
                            renderer: Kdn.Renderer.icons(function(e)
                            {
                                if (e == 'Crane') return 'TruckMountedCrane';
                                if (e == 'Freight') return 'Truck';
                                if (e == 'Passengers') return 'carPassenger';
                            })*/
                        },
                        {
                            header: 'Заказчик',
                            dataIndex: 'CustomerName',
                            width: 170
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
                                            fn: function(item, trigger, index, tag, e) {
                                                item.reset();
                                                item.fireEvent('select');
                                            }
                                        }
                                    }
                                },
                                fieldEvents: ["select"],
                                test: function(filterValue, value) {
                                    if (!filterValue) return true;
                                    return value.clearTime() - filterValue.clearTime() == 0;
                                }
                            },
                            width: 120
                        },
                        {
                            header: 'Опубликовано',
                            xtype: 'datecolumn',
                            format: 'd.m.Y H:i',
                            dataIndex: 'PublishDate',
                            width: 130,
                            filter: {}
                        },
                        {
                            header: 'Опубликовал, ФИО',
                            dataIndex: 'UserFio',
                            width: 180
                        },
                        {
                            header: 'На подпись, ФИО',
                            dataIndex: 'Approver',
                            width: 180
                        }
                    ]
                }),
                tbar: [
                    '-', {
                        text: 'Обновить',
                        iconCls: 'icon-refresh',
                        handler: function() {
                            this.RequestStore.reload();
                        },
                        scope: this
                    },
                    '-',
                    {
                        xtype: 'tbspacer', width: 30
                    }, '-',
                    {
                        text: 'Принять/Отклонить',
                        iconCls: 'icon-comments',
                        handler: this.onAccept,
                        scope: this
                    }, '-',
                     {
                         xtype: 'tbspacer', width: 30
                     }, '-',
                    {
                        text: 'Открыть для печати',
                        iconCls: 'icon-doc_pdf',
                        handler: this.printRequest,
                        scope: this
                    }, '-'
                ],
                bbar: new Ext.PagingToolbar({
                    displayInfo: true,
                    pageSize: 50,
                    store: RequestStore
                })
            },
            {
                title: 'Список транспорта',
                cls: 'vehicleOrderGrid',
                xtype: 'grid',
                enableDragDrop: true,                
                region: 'center',
                margins: '2 2 2 0',
                split: true,
                view: new Ext.grid.GridView({
                    scrollDelay: false,
                    getRowClass: function(record, index) {
                        var val = record.data.LimitDiff;
                        if (!Ext.isNumber(val)) return '';
                        return val > 50 ? 'green' : val >= 0 ? 'yellow' : 'red';
                    }

                }),
                store: OrderStore,
                loadMask: true,
                columnLines: true,
                stripeRows: true,
                plugins: ['filterrow'/*, expander*/],
                selModel: new Ext.grid.RowSelectionModel(),
                colModel: new Ext.grid.ColumnModel({
                    defaults: { filter: {} },
                    columns: [
                        {
                            header: 'Статус',
                            align: 'center',
                            dataIndex: 'Status',
                            width: 100,
                            renderer: {
                                fn: function(value, metaData, record, rowIndex, colIndex, store) {
                                    if (me.isInTrip(record)) {
                                        return '<span class="label label-gray">Командировка</span>'
                                    }

                                    if (me.isVehicleUsed(record)) {
                                        return '<span class="label label-success">Занят</span>'
                                    }
                                    return null;

                                },
                                scope: this
                            }
                        },
                        {
                            header: 'Заказчик',
                            width: 170,
                            dataIndex: 'Customers',
                            renderer: function(v, m, r, Idx, colIdx, store) {
                                if (v.length < 1) return null;

                                var qtipTpl = "<b><span style='font-size:15px;'>[<span style='color:tomato'>{0}</span>] : {1} </span></b>";
                                var customers = [],
                                    qtips = [];
                                Ext.iterate(v, function(customer) {
                                    var c = customer.Customer;
                                    if(c && c.CustomerName){
                                        customers.push(String.format("[<span style='color:tomato'>{0}</span>] {1}",customer.RequestId||"...",c.CustomerName));
                                        qtips.push(String.format(qtipTpl, customer.RequestId || "...", (c['CustomerName'] + '').replace(/"/g, '\'')));
                                    }
                                });

                                m.css = 'waybill-task-customer';
                                m.attr = 'ext:qtip="' + "<b><span style='font-size:15px;'>" + qtips.join('</br>') + "</span></b>" + '"';

                                return customers.join('</br>');

                            },
                            filter: {
                                test: function(f, o) {
                                    if (!f) return true;
                                    if (!o || o.length<1) return false;
                                    
                                    var flag = false;
                                    var reg = new RegExp(f, 'i');                                    
                                    
                                   Ext.iterate(o,function(v){
                                        if(reg.test(v.Customer.CustomerName)){
                                            flag=true;
                                            return false;
                                        }
                                   });
                                    
                                    return flag;
                                }
                            }
                        },
                        { header: 'Гар.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.GarageNumber', width: 60 },
                        { header: 'Марка', xtype: 'mappingcolumn', dataIndex: 'Vehicle.Model', width: 100 },
                        { header: 'Гос.№', xtype: 'mappingcolumn', dataIndex: 'Vehicle.RegistrationNumber', width: 80 },
                        {
                            header: 'Водители',
                            width: 130,
                            dataIndex: 'Drivers',
                            renderer: function(e, m, r) {

                                if (e.length < 1) return null;

                                var qtipTpl = "<span style='font-size:14px;'><b>Цех:{0} Taб.№:{1} {2} {3} {4}</b></span>";

                                var qtips = [],
                                    drivers = [];

                                Ext.iterate(e, function(driver) {
                                    var d = driver.Driver,
                                        e = d.Employee;

                                    qtips.push(String.format(qtipTpl, e.Department, e.EmployeeNumber, e.LastName, e.FirstName, e.MiddleName))
                                    drivers.push(String.format("{0} {1}.{2}.", e.LastName, e.FirstName.substr(0, 1), e.MiddleName.substr(0, 1)));
                                });

                                if (m) {
                                    m.attr = 'ext:qtip="' + qtips.join("<br/>") + '"';
                                }

                                return drivers.join("<br/>");

                            },
                            filter: {
                                test: function(f, o) {
                                    if (!f) return true;
                                    if (!o || o.length<1) return false;
                                    
                                    var flag = false;
                                    var reg = new RegExp(f, 'i');                                    
                                    
                                   Ext.iterate(o,function(v){
                                        if(reg.test(v.Driver.Employee.LastName)){
                                            flag=true;
                                            return false;
                                        }
                                   });
                                    
                                    return flag;
                                }
                            }
                        },
                        { header: 'См',dataIndex: 'Shift',width:30},
                        { 
                            header: 'Выезд',
                            dataIndex: 'DepartureDate',
                            width:45,
                            renderer:function(v){
                                if (!v && !v.format) return null;
                                return String.format(
                                    '<span style="font-size:9pt;">{0}<br><span style="color:blue;"><b>{1}</b><span/><span/>',
                                    v.format('d.m'),
                                    v.format('H:i')
                                );
                            }
                        },
                        { 
                            header: 'Возвр.',
                            dataIndex: 'ReturnDate',
                            width:45,
                            renderer:function(v){
                                if (!v && !v.format) return null;
                                return String.format(
                                    '<span style="font-size:9pt;">{0}<br><span style="color:blue;"><b>{1}</b><span/><span/>',
                                    v.format('d.m'),
                                    v.format('H:i')
                                );                                                                
                            }
                        },
                        {
                            dataIndex: 'ScheduleId',
                            header: 'График работы',
                            width: 120,
                            editor: { xtype: 'combo.schedule', allowBlank: true, objectValue: false },
                            renderer: function(v)
                            {
                                if (!v) return v;
                                var store = Kdn.ModelFactory.getStore('Schedule'),
                                   rec = store.getById(v);
                                if (rec) return rec.get('ScheduleName');
                                return null;
                            }
                        },
                        {
                           dataIndex: 'Description',
                           header: 'Примечание', 
                           width: 120
                        },
                        { header: 'Группа', xtype: 'mappingcolumn', dataIndex: 'Vehicle.GroupRequestId', hidden: true,
                            filter: {
                                field: { xtype: 'combo.grouprequest', enableClear: true, objectValue: false },
                                fieldEvents: ["select"],
                                test: function(filterValue, value, rec) {
                                    if (!filterValue) return true;
                                    return rec.get('Vehicle').GroupRequestId == filterValue;
                                }
                            }
                        },
                        { header: '№  колонны', xtype: 'mappingcolumn', dataIndex: 'Vehicle.ColumnId', hidden: true,
                            filter: {
                                field: { xtype: 'combo.transportcolumn', enableClear: true, objectValue: false },
                                fieldEvents: ["select"],
                                test: function(filterValue, value, rec) {
                                    if (!filterValue) return true;
                                    return rec.get('Vehicle').ColumnId == filterValue;
                                }
                            }
                        }
                    ]
                }),
                tbar: [
                    '-', {
                        text: 'Обновить',
                        iconCls: 'icon-refresh',
                        handler: function() {
                            this.OrderStore.reload();
                        },
                        scope: this
                    },
                    '-',
                    'Дата:',
                    OrderDate,
                    '-',
                    { xtype: 'tbspacer', width: 20 },
                    '-', 'Группа:',
                    { xtype: 'combo.grouprequest', enableClear: true, objectValue: false,
                        listeners: {
                            select: function(e) {
                                var val;
                                if (!e) val = null;
                                else val = e.getValue();

                                var cm = me.VehicleGrid.colModel;
                                var column = cm.getColumnAt(cm.findColumnIndex('Vehicle.GroupRequestId'));
                                var combo = column.filter.field;
                                combo.setValue(val);
                                combo.fireEvent('select', combo);
                            }
                        }
                    },
                    '-', 'Колонна',
                    { xtype: 'combo.transportcolumn', enableClear: true, objectValue: false,
                        listeners: {
                            select: function(e) {

                                var val;
                                if (!e) val = null;
                                else val = e.getValue();

                                var cm = me.VehicleGrid.colModel;
                                var column = cm.getColumnAt(cm.findColumnIndex('Vehicle.ColumnId'));
                                var combo = column.filter.field;
                                combo.setValue(val);
                                combo.fireEvent('select', combo);
                            }
                        }
                    }
                ],
                bbar:[
                    {
                        text:'Создать разнарядку',
                        handler:this.createOrders,
                        scope:this
                    }
                ]
            }
        ]
        });

        T.view.RequestTask.superclass.constructor.call(this, cfg);

        this.on({
            afterrender: this.onAfterRender,
            scope: this,
            single: true,
            delay: 200
        });
    },


    onAfterRender: function() {
        var me = this;

        var RequestWindow = new Ext.Window({
            iconCls: 'icon-page',
            constrain: true,
            width: 600,
            height: 650,
            closeAction: 'hide',
            renderTo: this.getBody(),
            layout: {
                type: 'vbox',
                padding: '2',
                align: 'stretch'
            },
            defaults: { margins: '0 0 2 0' },
            items: [
                this.Editors.Empty,
                {
                    xtype: 'textarea',
                    emptyText: 'Оставте заметку, которую увидит автор заявки, и нажмите "Принять" либо "Отклонить" заявку'
                }
           ],
            bbar: [
            '-',
                    {
                        text: 'Принять',
                        iconCls: 'icon-accept',
                        handler: function() {
                            me.confirmRequests(me.RequestWindow.requests, true, me.RequestWindow.getMessage())
                        }
                    }, '-',
                    {
                        text: 'Отклонить',
                        iconCls: 'icon-cancel',
                        handler: function() {
                            me.confirmRequests(me.RequestWindow.requests, false, me.RequestWindow.getMessage())
                        }
                    }, '-', '->',
                    {
                        text: 'Открыть для печати',
                        iconCls: 'icon-doc_pdf',
                        handler: this.printRequestWindow,
                        scope: this
                    },
                    '-'
           ],
            clear: function() {
                this.items.itemAt(1).setValue('');
            },
            getMessage: function() {
                return this.items.itemAt(1).getValue();
            }

        });
        
        
        this.OrderWindow = new T.view.OrderWindow({renderTo: this.getBody()});

        this.RequestWindow = RequestWindow;

        var RequestGrid = this.items.get(0);
        var VehicleGrid = this.items.get(1);

        this.RequestGrid = RequestGrid;
        this.VehicleGrid = VehicleGrid;

        var me = this;

        RequestGrid.on({
            rowcontextmenu: this.onContextMenuRequest,
            rowdblclick: this.onContextMenuRequest,
            scope: this
        });

        VehicleGrid.on({
            rowcontextmenu: this.onContextMenuOrder,
            rowdblclick: this.onContextMenuOrder,
            scope: this
        });


        var DropTargetEl = VehicleGrid.getView().scroller.dom;
        var DropZone = new Ext.dd.DropZone(DropTargetEl, {
            ddGroup: 'DDGroup',
            getTargetFromEvent: function(e) {
                return e.getTarget(VehicleGrid.getView().rowSelector);
            },
            /* onNodeEnter: function(target, dd, e, data)
            {
            Ext.fly(target).addClass('.orange');
            },
            onNodeOut: function(target, dd, e, data)
            {
            Ext.fly(target).removeClass('.orange');
            },*/
            onNodeOver: function(target, dd, e, data) {
                return Ext.dd.DropZone.prototype.dropAllowed;
            },
            onNodeDrop: function(target, dd, e, data) {
                var store = VehicleGrid.getStore();
                var rowIndex = VehicleGrid.getView().findRowIndex(target);
                var rec = store.getAt(rowIndex);

                var writer = RequestGrid.store.writer;
                var json = [];

                var customers = []
                
                var requests = [];
                Ext.iterate(rec.get('Customers'),function(c){
                    if (c.RequestId){
                        requests.push(c.RequestId);
                    }
                });
                                
                rec.beginEdit();
                
                 var sel = data.selections;
                 Ext.each(sel, function(s) {
                    var customerId = s.get('CustomerId');
                    var customer;
                    if(customerId){
                        customer={customerId:customerId,customerName:s.get('CustomerName')}       
                    }
                    
                    if(requests.indexOf(s.get('RequestId'))==-1){
                        customers.push({
                            VehicleOrderId:rec.get('VehicleOrderId'),
                            Customer:customer,
                            RequestId:s.get('RequestId')
                        })
                        
                        if (s.get('Status') < 2) {
                            json.push(writer.toHash(s));
                        }
                        
                        s.set('isLinked', true);
                        s.commit();
                    }
                                                            
                 });
 
                rec.set('Customers',rec.get('Customers').concat(customers));
                rec.endEdit();
                z=rec;
                
                me.RequestGrid.view.refresh();
                
                me.confirmRequests(json, true, '');
                
                /*
                if (me.isInTrip(rec)) return false;

                var writer = RequestGrid.store.writer;
                var json = [];

                var sel = data.selections;
                var requests = rec.get('Requests');
                var newRequests = [];

                Ext.each(sel, function(s) {
                var RequestId = s.get('RequestId');
                newRequests.push(writer.toHash(s));
                if (s.get('Status') < 2) {
                    json.push(writer.toHash(s));
                }

                    rec.beginEdit();
                s.set('isLinked', true);
                rec.endEdit();
                s.commit();

                });

                me.RequestGrid.view.refresh();

                rec.beginEdit();
                rec.set('Requests', requests.concat(newRequests));
                rec.endEdit();

                me.confirmRequests(json, true, '');
                
                */
                return true;
            }
        });

        this.refreshOrders();


    },

    refreshRequests: function(requests) {

        Kdn.Direct.RefreshRequests({
            requests: requests
        }, this.onRequestsConfirm.createDelegate(this));

    },


    refreshOrders: function() {
        var date = this.OrderDate.getValue();

        this.OrderStore.reload({
            params: { date: date }
        })
    },
    
    createOrders:function(){
      var date = this.OrderDate.getValue();
      this.VehicleGrid.getEl().mask('Создание разнарядки','x-mask-loading')
      Kdn.Direct.CreateOrders({date:date},this.onCreateOrders.createDelegate(this));              
    },
    
    onCreateOrders:function(){
        this.VehicleGrid.getEl().unmask();
        this.refreshOrders();
    },

    
    findHiddenRecord: function(VehicleRecord) {
        return this.VehicleOrderStore.getById(VehicleRecord.get('VehicleId'));
    },

    isVehicleUsed: function(rec) {
        return rec && ((rec.get('Customers') || []).length > 0);
    },

    onContextMenuRequest: function(grid, idx, e) {

        //  var offsetY = this.getEl().getXY()[1];

        grid.getSelectionModel().selectRow(idx);

        var rec = grid.store.getAt(idx);
        var w = this.RequestWindow;
                
        this.OrderWindow.hide();
        w.show();
        // w.setPosition(e.getPageX(),e.getPageY()-offsetY);
        w.doConstrain();
        w.getEl().mask('Загрузка', 'x-mask-loading');

        this.loadRequest(rec.id);

        e.stopEvent();
        return false;
    },
    
    onContextMenuOrder:function(grid, idx, e){
        grid.getSelectionModel().selectRow(idx);
        var rec = grid.store.getAt(idx);       
        var w = this.OrderWindow;
        
        this.RequestWindow.hide();
        w.fillOrder(rec)
        w.show();
        w.doConstrain();
               
        
        e.stopEvent();
        return false;
        
    },

    loadRequest: function(id) {
        Kdn.Direct.RequestLoad({ id: id }, this.onRequestLoad.createDelegate(this));
    },

    onRequestLoad: function(e) {
        var w = this.RequestWindow;
        w.clear();

        var request = e.data[0];

        var r = this.RequestGrid.store.getById(request.RequestId);
        var json = this.RequestGrid.store.writer.toHash(r);
        w.requests = [json];
        w.request = r;

        editor = this.Editors[request.type];
        w.setTitle('Заявка № ' + request.RequestId);
        this.replaceEditor(editor);
        editor.fill(request);
        //this.fillDetails(request);
        //this.unmaskDetail();
        w.getEl().unmask();
    },

    replaceEditor: function(editor) {
        var w = this.RequestWindow;
        w.items.removeAt(0).hide();
        w.items.insert(0, editor);
        editor.show();
        w.doLayout();
    },

    confirmRequests: function(records, isAccept, message) {
        Kdn.Direct.ConfirmRequests({
            data: records,
            isAccept: isAccept,
            message: message
        }, this.onRequestsConfirm.createDelegate(this));
    },

    onRequestsConfirm: function(e) {
        var data = e['data'];
        var store = this.RequestGrid.store;
        var reader = store.reader;
        Ext.iterate(data, function(d) {
            var rec = store.getById(d.RequestId);
            reader.update(rec, d);
        });

        if (this.AcceptWindow) this.AcceptWindow.hide();
        if (this.RequestWindow) this.RequestWindow.hide();

    },

    onAccept: function(b, e) {
        var sel = this.RequestGrid.getSelectionModel().getSelections();
        var writer = this.RequestGrid.store.writer;
        var me = this;

        var getWindow = function() {
            if (me.AcceptWindow) return me.AcceptWindow;

            me.AcceptWindow = new Ext.Window({
                width: 400,
                height: 200,
                layout: 'fit',
                items: [
                        {
                            xtype: 'textarea',
                            emptyText: 'Оставте заметку, которую увидит автор заявки, и нажмите "Принять" либо "Отклонить" заявку'
                        }
                   ],
                bbar: [
                    '-',
                            {
                                text: 'Принять',
                                iconCls: 'icon-accept',
                                handler: function() {
                                    me.confirmRequests(me.AcceptWindow.requests, true, me.AcceptWindow.getMessage())
                                }
                            }, '-',
                            {
                                text: 'Отклонить',
                                iconCls: 'icon-cancel',
                                handler: function() {
                                    me.confirmRequests(me.AcceptWindow.requests, false, me.AcceptWindow.getMessage())
                                }
                            }, '-'
                   ],
                getMessage: function() {
                    return this.items.itemAt(0).getValue();
                }
            });

            return me.AcceptWindow;
        }


        if (sel.length > 0) {
            var requests = [];
            var json = [];

            Ext.iterate(sel, function(i) {
                requests.push(i.id);
                json.push(writer.toHash(i));
            });


            var w = getWindow();
            w.show();
            w.items.itemAt(0).setValue("");
            w.setTitle(String.format("Заявки №: {0}", requests.join(',')));
            w.requests = json;
            w.setPosition(e.getPageX(), e.getPageY());
        }
    },

    isInTrip: function(rec) {
        return rec.get('BusinessTripDate') && this.OrderDate.getValue() > rec.get('OrderDate')
    },

    _printRequest: function(request) {

        var reportName = "";
        var requestType = request.get('RequestType');
        var requestTypes = {
            "Кран": "RequestCrane",
            "Грузовой": "RequestFreight",
            "Пассажирский": "RequestPassengers"
        };

        reportName = requestTypes[requestType];


        var params = {};
        params.requestId = request.get('RequestId')
        Kdn.Reporter.exportReport(reportName, params,"PDF");
    },
    printRequest: function() {
        var sel = this.RequestGrid.getSelectionModel().getSelected();

        if (sel) {
            this._printRequest(sel);
        }

    },

    printRequestWindow: function() {
        this._printRequest(this.RequestWindow.request);
    }

});

Ext.reg('view.requesttask', T.view.RequestTask);







T.view.OrderWindow = Ext.extend(Ext.Window,{
    constrain: true,
    width: 600,
    height: 650,
    closeAction: 'hide',            
    layout: {
        type:'vbox',
        padding:'2',
        align:'stretch'
        },
    defaults:{margins:'0 0 2 0'},
    initComponent:function(){
        
        
        var drivers = new Kdn.editor.LocalGrid({       
            title:'Водители',
            flex:1,
            store: new Ext.data.JsonStore({
                fields:['Driver']
            }),
            viewConfig:{
                forceFit:true
            },
            columns:[
                {
                     header:'Водитель',
                     dataIndex:'Driver',
                     width:300,
                     editor:{xtype:'combo.driver'},
                     renderer:T.combo.Driver.prototype.renderTpl
                }           
            ]
        });
        
        var customers = new Kdn.editor.LocalGrid({
            startEditColumn:1,
            title:'Заказчики',
            flex:1,
            margins:0,
            store: new Ext.data.JsonStore({
                idProperty:'Id',
                fields:['Id','RequestId','Customer']
            }),
            viewConfig:{
                forceFit:true
            },
            columns:[
            {
                header:'№ заявки',
                dataIndex:'RequestId',
                width:80,
                fixed:true
            },
            {
                header:'Заказчик',
                dataIndex:'Customer',
                editor:{xtype:'combo.customer'},
                renderer: function(v){
                    if (!v) return null;
                    return String.format("[{0}] {1}",v.CustomerId,v.CustomerName);
                }
            }
            ]
        });
        
        Ext.apply(this,{
           drivers:drivers,
           customers:customers,
           items:[
                {
                    layout:'form',
                    frame:true,
                    flex:1,
                    defaults:{
                        xtype:'textfield',
                        anchor: '100%'
                    },
                    items:[
                        {
                            xtype:'datetimefield',
                            fieldLabel:'Выезд',
                            anchor: null,
                            dataIndex:'DepartureDate'
                        },
                        {
                            xtype:'datetimefield',
                            fieldLabel:'Возвращение',
                            anchor: null,
                            dataIndex:'ReturnDate'
                        },
                        {
                            xtype:'numberfield',
                            fieldLabel:'Смена',
                            dataIndex:'Shift'
                        },
                        {
                            xtype:'combo.schedule',
                            objectValue: false,
                            fieldLabel:'График',
                            dataIndex:'ScheduleId'
                        },
                        {
                            xtype:'textarea',
                            fieldLabel:'Примечание',
                            dataIndex:'Description'
                        }
                    ]
                },
                drivers,
                customers
           ],
           bbar:[
            '->',
            '-',
            {
                xtype:'button.save',
                handler:this.onSave,
                scope:this
            },
            '-'
           ]
        });
        
        
        T.view.OrderWindow.superclass.initComponent.call(this);
        
        this.on({
            hide:this.onClose,
            scope:this
        });
        
        customers.on({
            beforeedit:this.onBeforeEdit,
            scope:this
        });
        
    },
    
    onBeforeEdit:function(e){
        if(e.record.get('RequestId')) return false;
    },    
    
    eachFields:function(fn){
        this.items.itemAt(0).items.each(fn);
    },
    
    onSave:function(){
        var rec = this.Order;
        var customers = [],drivers=[];
        
        this.customers.store.each(function(e){
            var o = Ext.copyTo({},e.data,'Customer,Id,RequestId');
            o.VehicleOrderId = rec.get('VehicleOrderId');
            o.Id = o.Id||0;
            if(o.Customer) customers.push(o); 
        }); 
        
        this.drivers.store.each(function(e){
            var o = Ext.copyTo({},e.data,'Driver');
            o.VehicleOrderId = rec.get('VehicleOrderId');
            drivers.push(o); 
        }); 
        
        rec.beginEdit();
        rec.set('Customers',customers);
        rec.set('Drivers',drivers);
        
        this.eachFields(function(f){
            rec.set(f.dataIndex,f.getValue());
        });
                
        rec.endEdit();
        
        this.hide();                
    },
    
     fillOrder:function(rec){
        this.fillCustomers(rec.get('Customers'));   
        this.fillDrivers(rec.get('Drivers')); 
        
        this.Order = rec; 
        
        this.eachFields(function(f){
           if(f.dataIndex){
            f.setValue(rec.get(f.dataIndex));
           } 
        });
        
     },
            
    fillCustomers:function(c){
        this.customers.store.loadData(c, false); 
    },
            
    fillDrivers:function(d){
        this.drivers.store.loadData(d, false);   
    },
    onClose:function(){
        this.clearData();
    },
    
    clearData:function(){
        this.customers.store.clearData();
        this.drivers.store.clearData();
        
        this.eachFields(function(f){
           if(f.dataIndex){
            f.reset();
           } 
        });
    }       
});
