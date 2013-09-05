Kdn.grid.PagingGridView = Ext.extend(Ext.grid.GridView, {
    pageSize: 1,
    cursor: 0,
    total: 0,


    constructor: function(config) {
        Kdn.grid.PagingGridView.superclass.constructor.call(this,config);
        this.addEvents('page');
    },

    renderBody: function() {
        var s, e, m;
        with (this) {
            s = cursor * pageSize;
            e = (cursor + 1) * pageSize - 1;
            m = renderRows(s, e) || '&#160;';
            return templates.body.apply({ rows: m });
        }
    },

    refresh: function(headersToo) {
        this.total = this.grid.store.getCount() || 0;
        Kdn.grid.PagingGridView.superclass.refresh.call(this, headersToo);
    },

    nextPage: function() {
        with (this) {
            if (cursor * pageSize > total) return;
            cursor++;
            refresh();
        }
        this.fireEvent('page', this);
    },
    prevPage: function() {
        with (this) {
            if (cursor == 0) return;
            cursor--;
            refresh();
        }
        this.fireEvent('page', this);
    },
    firstPage: function() {
        this.cursor = 0;
        this.refresh();
        this.fireEvent('page', this);
    },
    lastPage: function() {
        with (this) {
            cursor = total < pageSize ? 0 : Math.ceil(total / pageSize) - 1;
            refresh();
        }
        this.fireEvent('page', this);
    },

    getPageCount: function() {
        with (this) { return total < pageSize ? 1 : Math.ceil(total / pageSize) }
    },


    initData: function(newStore, newColModel) {
        var me = this;


        if (me.ds) {
            var oldStore = me.ds;
            oldStore.un('datachanged', me.onDataChange1, me);
        }

        if (newStore) {
            newStore.on({
                scope: me,
                datachanged: me.onDataChange1
            });
        }
        Kdn.grid.PagingGridView.superclass.initData.apply(this, arguments);
    },

    onDataChange1: function() {
        this.firstPage();
    },
    
    refreshRow: function(record) {
        
        var store     = this.ds,
            sm        = this.grid.getSelectionModel(),
            colCount  = this.cm.getColumnCount(),
            columns   = this.getColumnData(),
            last      = colCount - 1,
            cls       = ['x-grid3-row'],
            rowParams = {
                tstyle: String.format("width: {0};", this.getTotalWidth())
            },
            colBuffer = [],
            cellTpl   = this.templates.cell,
            rowIndex, row, column, meta, css, i;
        
        if (Ext.isNumber(record)) {
            rowIndex = this.cursor*this.pageSize+record;
            record   = store.getAt(rowIndex);
        } else {
            rowIndex = store.indexOf(record)-this.cursor*this.pageSize;
        }
        
        //the record could not be found
        if (!record || rowIndex < 0) {
            return;
        }
        
        //builds each column in this row
        for (i = 0; i < colCount; i++) {
            column = columns[i];
            
            if (i == 0) {
                css = 'x-grid3-cell-first';
            } else {
                css = (i == last) ? 'x-grid3-cell-last ' : '';
            }
            
            meta = {
                id      : column.id,
                style   : column.style,
                css     : css,
                attr    : "",
                cellAttr: ""
            };
            // Need to set this after, because we pass meta to the renderer
            meta.value = column.renderer.call(column.scope, record.data[column.name], meta, record, rowIndex, i, store);
            
            if (Ext.isEmpty(meta.value)) {
                meta.value = '&#160;';
            }
            
            if (this.markDirty && record.dirty && typeof record.modified[column.name] != 'undefined') {
                meta.css += ' x-grid3-dirty-cell';
            }
            
            colBuffer[i] = cellTpl.apply(meta);
        }
        
        row = this.getRow(rowIndex);
        row.className = '';
        
        if (this.grid.stripeRows && ((rowIndex + 1) % 2 === 0)) {
            cls.push('x-grid3-row-alt');
        }
        
        if (this.getRowClass) {
            rowParams.cols = colCount;
            cls.push(this.getRowClass(record, rowIndex, rowParams, store));
        }
        
        this.fly(row).addClass(cls).setStyle(rowParams.tstyle);
        rowParams.cells = colBuffer.join("");
        row.innerHTML = this.templates.rowInner.apply(rowParams);
        
        this.fireEvent('rowupdated', this, rowIndex, record);
    }

});