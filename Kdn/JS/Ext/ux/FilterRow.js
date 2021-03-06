/*!
 * Ext JS FilterRow plugin v0.6
 * http://github.com/nene/filter-row
 *
 * Copyright 2010 Rene Saarsoo
 * Licensed under GNU General Public License v3.
 * http://www.gnu.org/licenses/
 */
Ext.namespace('Ext.ux.grid');

/**
 * @class Ext.ux.grid.FilterRow
 * @extends Ext.util.Observable
 * 
 * Grid plugin that adds filtering row below grid header.
 * 
 * <p>To add filtering to column, define "filter" property in column
 * to be FilterRowFilter configuration object or an instance of it.
 * 
 * <p>Example:
 * 
 * <pre><code>
var grid = new Ext.grid.GridPanel({
  columns: [
    {
      header: 'Name',
      dataIndex: 'name',
      // Filter by regular expression
      // {0} will be substituted with current field value
      filter: {
        test: "/{0}/i"
      }
    },
    {
      header: 'Age',
      dataIndex: 'age',
      filter: {
        // Show larger ages than the one entered to field
        test: function(filterValue, value) {
          return value > filterValue;
        }
      }
    }
  ],
  plugins: ["filterrow"],
  ...
});
 * </code></pre>
 */
Ext.ux.grid.FilterRow = Ext.extend(Ext.util.Observable, {

  autoFilter: true,
  
  constructor: function(conf) {
    Ext.apply(this, conf || {});
    
    this.addEvents(
      /**
       * @event change
       * Fired when any one of the fields is changed.
       * @param {Object} filterValues object containing values of all
       * filter-fields.  When column has "id" defined, then property
       * with that ID will hold filter value.  When no "id" defined,
       * then dataIndexes are used.  That is, you only need to specify
       * ID-s for columns, when two filters use the same dataIndex.
       */
      "change"
    );
    if (this.listeners) {
      this.on(this.listeners);
    }
  },
  
  init: function(grid) {
   
   var store = grid.store,
       cm = grid.getColumnModel(),
       view = grid.getView(),
       filterCls = Ext.ux.grid.FilterRowFilter;
    
	 grid.RowFilter = this;
      
      Ext.apply(this,{
         store:store,
         grid:grid,
         cm:cm,
         view:view
      });
      
     
    view.onDataChange = function() {
      this.refresh(); // this was: this.refresh(true);
      this.updateHeaderSortState();
      this.syncFocusEl(0);
    };
    
    // convert all filter configs to FilterRowFilter instances

    this.eachFilterColumn(function(col) {
      if (!(col.filter instanceof filterCls)) {
        col.filter = new filterCls(col.filter);
      }
      col.filter.on("change", this.onFieldChange, this);
    });
    
    //this.applyTemplate();
    // add class for attatching plugin specific styles
    grid.addClass('filter-row-grid');
    
    // when grid initially rendered
    grid.on("render", this.renderFields, this);
    
    // when Ext grid state restored (untested)
    grid.on("staterestore", this.resetFilterRow, this);
    
    // when the width of the whole grid changed
    grid.on("resize", this.resizeAllFilterFields, this);
    // when column width programmatically changed
    cm.on("widthchange", this.onColumnWidthChange, this);
    // Monitor changes in column widths
    // newWidth will contain width like "100px", so we use parseInt to get rid of "px"
    view.onColumnWidthUpdated = view.onColumnWidthUpdated.createSequence(function(colIndex, newWidth) {
      this.onColumnWidthChange(this.cm, colIndex, parseInt(newWidth, 10));
    }, this);
    
    // when column is moved, remove fields, after the move add them back
    cm.on("columnmoved", this.resetFilterRow, this);
    view.afterMove = view.afterMove.createSequence(this.renderFields, this);
    
    // when column header is renamed, remove fields, afterwards add them back
    cm.on("headerchange", this.resetFilterRow, this);
    view.onHeaderChange = view.onHeaderChange.createSequence(this.renderFields, this);
    
    // When column hidden or shown
    cm.on("hiddenchange", this.onColumnHiddenChange, this);
    
    if (!store.remoteSort) {
      this.respectStoreFilter();
    }
   
    this.filterTask = new Ext.util.DelayedTask(this.onFilterTask, this);
    
    this.grid.on('beforedestroy',this.destroy,this);
         
  },
  
   destroy : function () {
        this.store.un("load", this.refilter, this);
        if (this.filterTask){
            this.filterTask.cancel();
            this.filterTask = null;
        }
    },
 
  
  // Makes store add() and load() methods to respect filtering.
  respectStoreFilter: function() {
    var store = this.store;
    
    // re-apply filter after store load
    store.on("load", this.refilter, this);
    
    // re-apply filter after adding stuff to store
    this.refilterAfter(store, "add");
    this.refilterAfter(store, "addSorted");
    this.refilterAfter(store, "insert");
  },
  
  // Appends refiltering action to after store method
  refilterAfter: function(store, method) {
    var filterRow = this;
    store[method] = store[method].createSequence(function() {
      if (this.isFiltered()) {
        filterRow.refilter();
      }
    });
  },
  
  onColumnHiddenChange: function(cm, colIndex, hidden) {
    var filterDiv = Ext.get(this.getFilterDivId(cm.getColumnId(colIndex)));
    if (filterDiv) {
      filterDiv.parent().dom.style.display = hidden ? 'none' : '';
    }
    this.resizeAllFilterFields();
  },
  
  applyTemplate: function() {
  /*
    var colTpl = "";
    this.eachColumn(function(col) {
      var filterDivId = this.getFilterDivId(col.id);
      var style = col.hidden ? " style='display:none'" : "";
      var icon = (col.filter && col.filter.showFilterIcon) ? "filter-row-icon" : "";
      colTpl += '<td' + style + '><div class="x-small-editor ' + icon + '" id="' + filterDivId + '"></div></td>';
    });
    
    var headerTpl = new Ext.Template(
      '<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
      '<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',
      '<tbody><tr class="filter-row-header">',
      colTpl,
      '</tr></tbody>',
      "</table>"
    );
    
    var view = this.grid.getView();
    Ext.applyIf(view, { templates: {} });
    view.templates.header = headerTpl;
	*/
	
	var dh = Ext.DomHelper,
		tbody = dh.createDom({tag:'tbody'}),
		tr = dh.createDom({tag:'tr','class':'filter-row-header','style':'height: 26px;'}),
		view = this.grid.getView();
		
	this.eachColumn(function(col) {
		
		var filterDivId = this.getFilterDivId(col.id),
			style = col.hidden ? "display:none" : "",
			icon = (col.filter && col.filter.showFilterIcon) ? "filter-row-icon" : "";
	
		var td = dh.createDom({tag:'td',style:style}),
			div = dh.createDom({tag:'div','class':'x-small-editor '+ icon,id:filterDivId});
			
		td.appendChild(div);
		tr.appendChild(td);		
	});
	
	tbody.appendChild(tr);
	view.mainHd.dom.firstChild.firstChild.lastChild.appendChild(tbody);
  },
  
  clearFilters:function(silent){
   
   this.eachFilterColumn(function(col) {
      var editor = col.filter.getField();
      if (editor) {
        editor.reset();
      }
    });
    
    if(silent) return;
    
    this.refilter();
      
   
  },
  
  
  // Removes filter fields from grid header and recreates
  // template. The latter is needed in case columns have been
  // reordered.
  resetFilterRow: function() {  
    this.eachFilterColumn(function(col) {
      var editor = col.filter.getField();
      if (editor && editor.rendered) {
        var el = col.filter.getFieldDom();
        el.parentNode.removeChild(el);
      }
    });		
    this.applyTemplate();
  },
  
  renderFields: function() {
  
	this.applyTemplate();
  
    this.eachFilterColumn(function(col) {
      var filterDiv = Ext.get(this.getFilterDivId(col.id));
      var editor = col.filter.getField();
      editor.setWidth(col.width - 2);
      if (editor.rendered) {
        filterDiv.appendChild(col.filter.getFieldDom());
      }
      else {
        editor.render(filterDiv);
      }
    });
  },
  
  onFieldChange: function() {
    
    if (this.hasListener("change")) {
      this.fireEvent("change", this.getFilterData());
    }
    
    if (this.autoFilter) {
      this.refilter();
    }
    
  },
  
  // refilters the store with current filter.
  refilter: function() {
    var delay = this.store.remoteSort?300:100;
    this.filterTask.delay(delay);
  },
  
  onFilterTask:function(){
  
  if(Ext.Ajax.isLoading()) {this.refilter(); return;}
  
   var store = this.store;   
   
   if(store.remoteSort){
      
      var filterData = this.getFilterData();
      store.reload({
         params:{
            filter:filterData,
            start:0            
         }
      });
      
   } 
   else{
      this.store.filterBy(this.getFilterFunction());
   }
  
   
  },
  
  // collects values from all filter-fields into hash that maps column
  // dataindexes (or id-s) to filter values.
  getFilterData: function() {
    var data = {};
    this.eachFilterColumn(function(col) {
      var name = (typeof col.id === "number") ? col.dataIndex : col.id,
          fieldValue = col.filter.getFieldValue();
          if(fieldValue!=""){
            data[name] = fieldValue;
          }
    });
    return data;
  },
  
  /**
   * Returns store filtering function for the current values in filter
   * fields.
   * 
   * @return {Function}  function to use with store.filterBy()
   */
  getFilterFunction: function() {
    var tests = [];
    this.eachFilterColumn(function(col) {
      var p = col.filter.createPredicate(col.dataIndex);
      if (p) {
        tests.push(p);
      }
    });
	 
    return function(record) {
      for (var i=0; i<tests.length; i++) {
        if (!tests[i](record)) {
          return false;
        }
      }
      return true;
    };
  },
  
  onColumnWidthChange: function(cm, colIndex, newWidth) {
    var col = cm.getColumnById(cm.getColumnId(colIndex));
    if (col.filter) {
      this.resizeFilterField(col, newWidth);
    }
  },
  
  // When grid has forceFit: true, then all columns will be resized
  // when grid resized or column added/removed.
  resizeAllFilterFields: function() {
    var cm = this.grid.getColumnModel();
    this.eachFilterColumn(function(col, i) {
      this.resizeFilterField(col, cm.getColumnWidth(i));
    });
  },
  
  // Resizes filter field according to the width of column
  resizeFilterField: function(column, newColumnWidth) {
    var editor = column.filter.getField();
    editor.setWidth(newColumnWidth - 2);
  },
  
  // Returns HTML ID of element containing filter div
  getFilterDivId: function(columnId) {
    return this.grid.id + '-filter-' + columnId;
  },
  
  // Iterates over each column that has filter
  eachFilterColumn: function(func) {
    this.eachColumn(function(col, i) {
      if (col.filter) {
        func.call(this, col, i);
      }
    });
  },
  
  // Iterates over each column in column config array
  eachColumn: function(func) {
    Ext.each(this.grid.getColumnModel().config, func, this);
  }
});
Ext.preg("filterrow", Ext.ux.grid.FilterRow);

/**
 * @class Ext.ux.grid.FilterRowFilter
 * @extends Ext.util.Observable
 * 
 * This class encapsulates the definition of filter for one column.
 */
Ext.ux.grid.FilterRowFilter = Ext.extend(Ext.util.Observable, {
  /**
   * @cfg {Ext.form.Field} field
   * Instance of some form field to use for filtering, or just a
   * config object - xtype will default to "textfield".  Defaults to
   * TextField with enableKeyEvents set to true.
   */
  field: undefined,
  
  /**
   * @cfg {[String]} fieldEvents
   * 
   * Names of events to listen from this field.  Each time one of the
   * events is heard, FilterRow will filter the grid.  By default it
   * contains the "keyup" event to provide useful default together with
   * the default TextField.
   */
  fieldEvents: ["keyup"],
  
  /**
   * @cfg {String/Function} test
   * Determines how this column is filtered.
   * 
   * <p>When it's a string like "/^{0}/i", a regular expression filter
   * is created - substituting "{0}" with current value from field.
   * 
   * <p>When it's a function, it will be called with three arguments:
   * 
   * <ul>
   * <li>filterValue - the current value of field,
   * <li>value - the value from record at dataIndex,
   * <li>record - the record object itself.
   * </ul>
   * 
   * <p>When function returns true, the row will be filtered in,
   * otherwise excluded from grid view.
   * 
   * <p>Defaults to "/{0}/i".
   */
  test: "/{0}/i",
  
  /**
   * @cfg {Object} scope
   * Scope for the test function.
   */
  scope: undefined,
  
  /**
   * @cfg {Boolean} showFilterIcon
   * By default a magnifier-glass icon is shown inside filter field.
   * Set this to false, to disable that behaviour. (Default is true.)
   */
  showFilterIcon: true,
  
  constructor: function(config) {
    Ext.apply(this, config);
    
    if (!this.field) {
      this.field = new Ext.form.TextField({enableKeyEvents: true});
    }
    else if (!(this.field instanceof Ext.form.Field)) {
      this.field = Ext.create(this.field, "textfield");
    }
    
    this.addEvents(
      /**
       * @event change
       * Fired when ever one of the events listed in "events" config
       * option is fired by field.
       */
      "change"
    );
    Ext.each(this.fieldEvents, function(event) {
      this.field.on(event, this.fireChangeEvent, this);
    }, this);
  },
  
  fireChangeEvent: function(f,e) {
    if (e && e.getKey) {
      var k = e.getKey();
      if (!(k == e.DELETE || k == e.BACKSPACE || !e.isSpecialKey())) return;
    }   
    this.fireEvent("change");
     
  },
  
  /**
   * Returns the field of this filter.
   * 
   * @return {Ext.form.Field}
   */
  getField: function() {
    return this.field;
  },
  
  /**
   * Returns DOM Element that is the root element of form field.
   * 
   * <p>For most fields, this will be the "el" property, but
   * TriggerField and it's descendants will wrap "el" inside another
   * div called "wrap".
   * 
   * @return {HTMLElement}
   */
  getFieldDom: function() {
    return this.field.wrap ? this.field.wrap.dom : this.field.el.dom;
  },
  
  /**
   * Returns the value of filter field.
   * 
   * @return {Anything}
   */
  getFieldValue: function() {
    return this.field.getValue();
  },
  
  /**
   * Creates predicate function for filtering the column associated
   * with this filter.
   * 
   * @param {String} dataIndex
   * @return {Function}
   */
  createPredicate: function(dataIndex) {
    var test = this.test,
        filterValue = this.field.getValue();
        
    // is test a regex string?
    if (typeof test === "string" && test.match(/^\/.*\/[img]*$/)) {
      return this.createRegExpPredicate(test, filterValue, dataIndex);
    }
    else {
      // otherwise assume it's a function
      var scope = this.scope;
      return function(r) {   
        return test.call(scope, filterValue, r.get(dataIndex), r);
      };
    }
  },
  
  createRegExpPredicate: function(reString, filterValue, dataIndex) {
    // don't filter the column at all when field is empty
    if (!filterValue) {
      return false;
    }
    
    var regex = this.createRegExp(reString, filterValue);
	 
    return function(rec) {
	 
		//�������� ��� ����������� �������
		var indexArray = dataIndex.split('.'),
          obj = rec.data;
      
      Ext.iterate(indexArray,function(i){
         if(obj && obj[i]){
            obj = obj[i];
         }
         else {
            obj = null
            return false;
         }
      });     
      
      return regex.test(obj);
		
    };
  },
  
  // Given string "/^{0}/i" and value "foo" creates regex: /^foo/i
  createRegExp: function(reString, value) {
    // parse the reString into pattern and flags
    var m = reString.match(/^\/(.*)\/([img]*)$/);
    var pattern = m[1];
    var flags = m[2];
    // Create new RegExp substituting value inside pattern
    return new RegExp(String.format(pattern, Ext.escapeRe(value)), flags);
  }
});



