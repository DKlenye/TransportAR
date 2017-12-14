Kdn.view.BaseGrid = Ext.extend(Ext.grid.GridPanel, {
    pageSize: 0,
    pageMode: 'local',
    initComponent: function () {

        var m = this.modelName,
            pageSize = this.pageSize;

        if (m) {

            Ext.applyIf(this, {
                editor: 'kdn.editor.modeleditor',
                plugins: ['filterrow', 'autosizecolumns']
            });

            Ext.apply(this, {
                store: this._getStore(),
                selModel: this._getSelModel(),
                view: this._getView(this.viewConfig)
            });

            this.tbar = this._getTbar();


            if (this.pageSize) {
                if (this.pageMode == 'local') {
                    Ext.apply(this, {
                        bbar: new Kdn.grid.PagingToolbar({
                            displayInfo: true,
                            pageSize: this.pageSize,
                            view: this.view
                        })
                    });
                }
                else {
                    Ext.apply(this, {
                        bbar: new Ext.PagingToolbar({
                            displayInfo: true,
                            pageSize: this.pageSize,
                            store: this.store
                        })
                    });
                }
            };



            Ext.apply(this, {
                columnLines: true,
                stripeRows: true,
                trackMouseOver: false,
                loadMask: true,
                keys: [
                        {
                            key: 'a',
                            ctrl: true,
                            stopEvent: true,
                            handler: function () {
                                this.getSelectionModel().selectAll();
                            },
                            scope: this
                        },
                /*{
                key: Ext.EventObject.DELETE,
                stopEvent: true,
                handler: this.onDelete,
                scope: this
                },*/
                        {
                        key: Ext.EventObject.INSERT,
                        stopEvent: true,
                        handler: this.onAdd,
                        scope: this
                    }
                    ]
            });
        }

        this.on({
            rowdblclick: this.onRowDblClick,
            scope: this
        })


        this.store.on({
            write: this.onWrite,
            scope: this
        });


        this.mon(this.getSelectionModel(), {
            selectionchange: this.onSelectionChange,
            scope: this
        });

        Kdn.view.BaseGrid.superclass.initComponent.call(this);

        this.buildEditorCfg();

    },



    buildEditorCfg: function () {

        var m = this.colModel,
                source = {},
                propertyNames = {},
                customEditors = {},
                customRenderers = {};


        Ext.iterate(m.columns, function (e) {
            if (e.editor) {
                var cfg = e.editor.initialConfig,
                        name = e.dataIndex;

                //var field = Ext.create(Kdn.clone(cfg, true))

                source[name] = Ext.data.Field.prototype.defaultValue;
                propertyNames[name] = cfg.header || e.header;
                customEditors[name] = cfg; //new Ext.grid.GridEditor(field);

                if (e.renderer) {
                    customRenderers[name] = e.editor.renderer || cfg.renderer || e.renderer;
                }

            }

        });

        this.EditorCfg = {
            source: source,
            propertyNames: propertyNames,
            customEditors: customEditors,
            customRenderers: customRenderers
        }

    },

    getEditorCfg: function () {
        var cfg = Kdn.clone(this.EditorCfg);
        var buildEditor = function (cfg) { return new Ext.grid.GridEditor(Ext.create(Kdn.clone(cfg, true))); }

        Ext.iterate(cfg.customEditors, function (key, val) {
            cfg.customEditors[key] = buildEditor(val);
        });

        return cfg;

    },

    _getStore: function () {
        var cfg = {};
        if (this.pageSize && this.pageMode != 'local') {
            Ext.apply(cfg, {
                baseParams: {
                    start: 0,
                    limit: this.pageSize
                },
                remoteSort: true
            });
        }

        return Kdn.ModelFactory.getStore(this.modelName, cfg);
    },
    _getSelModel: function () {
        if (this.pageSize && this.pageMode == 'local') {
            return new Kdn.grid.PagingRowSelModel({ singleSelect: false });
        }
        return new Ext.grid.RowSelectionModel({ singleSelect: false });
    },

    _getView: function (cfg) {
        cfg = cfg || {};

        Ext.apply(cfg, { emptyText: 'Нет данных' });

        if (this.pageSize && this.pageMode == 'local') {
            return new Kdn.grid.PagingGridView(cfg);
        }
        else {
            return new Ext.grid.GridView(cfg);
        }
    },

    _getTbar: function () {

        /* var exportButton = new Ext.ux.Exporter.Button({
        store: this.store,
        exportFunction:'exportStore',
        text     : "Экспорт в excel"
        });*/



        return [

            '-',
            {
                text: 'Обновить',
                iconCls: 'icon-refresh',
                handler: this.onRefresh,
                scope: this,
                cls: 'update_btn'
            },
            '-',
            {
                xtype: 'tbspacer',
                width: 10
            },
            '-',
            {
                text: 'Добавить',
                iconCls: 'icon-add',
                handler: this.onAdd,
                scope: this,
                cls: 'add_btn'
            },
            '-',
            {
                text: 'Клонировать',
                iconCls: 'icon-page_copy',
                handler: this.onClone,
                scope: this
            },
            '-',
            {
                text: 'Редактировать',
                iconCls: 'icon-edit',
                handler: this.onEdit,
                scope: this,
                cls: 'edit_btn',
                disabled: true
            },
            '-',
            {
                text: 'Удалить',
                iconCls: 'icon-delete',
                handler: this.onDelete,
                scope: this,
                cls: 'delete_btn',
                disabled: true
            },
          
           
            '-',
        '->'
        //exportButton

        ]
    },

    onRowDblClick: function () {

        var sm = this.getSelectionModel(),
            recs = sm.getSelections();
        if (recs.length == 1) {
            this.onEdit();
        }

    },

    onSelectionChange: function () {

        var s = this.getSelectionModel().getSelections().length,
            edit = this.getByCssClass('edit_btn'),
            del = this.getByCssClass('delete_btn');

        edit.setDisabled(s == 0);
        edit.setIconClass(s > 1 ? 'icon-table_edit' : 'icon-edit');

        del.setDisabled(s == 0);
        del.setIconClass(s > 1 ? 'icon-table_delete' : 'icon-delete');



    },

    onRefresh: function () {
        this.store.reload();
    },


    onAdd: function () {

        /*
        var record = this.createRecord();

        this.stopEditing();
        this.store.insert(0, record);
        this.selModel.selectRow(0);
        this.startEditing(0, 1);
        */


        Kdn.Application.createView({
            xtype: this.editor,
            grid: this,
            title: this.getInsertText(),
            iconCls: 'icon-add',
            withContainer: false
        });


    },
    onEdit: function () {

        var sm = this.getSelectionModel(),
            recs = sm.getSelections();


        if (recs) {
            Kdn.Application.createView({
                xtype: this.editor,
                grid: this,
                title: this.getEditText(),
                iconCls: (recs.length > 1 ? 'icon-table_edit' : 'icon-edit'),
                records: recs,
                withContainer: false
            });
        }

    },

    onClone: function () {

        var sm = this.getSelectionModel(),
            recs = sm.getSelections();

        if (recs) {
            Kdn.Application.createView({
                xtype: this.editor,
                grid: this,
                title: this.getInsertText(),
                iconCls: 'icon-add',
                records: recs,
                withContainer: false,
                clone: true
            });
        }

    },

    createRecord: function () {
        return Kdn.ModelFactory.createRecord(this.modelName);
    },

    onDelete: function () {
        var me = this,
            sm = me.getSelectionModel(),
            recs = sm.getSelections();

        if (recs.length > 0) {

            Ext.Msg.confirm(
                'Удаление строк',
                'Удалить выделенные строки ?',
                function (y) {
                    if (y == 'yes') {
                        var store = me.store,
                            first = Math.min(sm.last, sm.lastActive),
                            last = Math.max(sm.last, sm.lastActive),
                             rec;
                        if ((last + 1) < store.getCount()) {
                            rec = store.getAt(last + 1);
                        }
                        else {
                            rec = store.getAt(first - 1)
                        }

                        Ext.iterate(recs, function (rec) {
                            me.store.remove(rec);
                        }, me);

                        if (rec) {
                            sm.selectRow(store.indexOf(rec));
                        }
                    }
                }
            );
        }
    },

    onWrite: function (store, action) {
        var h = this["after" + action];
        if (h) h.call(this);
    },

    aftercreate: function () {
        try {
            var sortState = this.store.getSortState();
            if (sortState) {
                this.store.sort(sortState.field, sortState.direction);
            }
            else {
                var idField = this.store.reader.meta.idProperty;
                this.store.sort(idField, "ASC");
            }
        }
        catch (ex) {

        }
    },

    getByCssClass: function (cls) {
        var el = this.getEl().query('.' + cls);
        if (el.length > 0) {
            return Ext.getCmp(el[0].id);
        }
        return null;
    },


    getInsertText: function () {
        return 'Добавление :: ' + this.viewTitle
    },

    getEditText: function () {
        return 'Редактирование :: ' + this.viewTitle
    }


});