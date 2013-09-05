
(function() {

    var T = Ext.Toolbar;

    Kdn.grid.PagingToolbar = Ext.extend(Ext.Toolbar, {
        pageSize: 20,
        initComponent: function() {
            
            Ext.copyTo(this,Ext.PagingToolbar.prototype,"displayMsg,emptyMsg,beforePageText,afterPageText,firstText,prevText,nextText,lastText,refreshText");
            
            
            var pagingItems = [this.first = new T.Button({
                tooltip: this.firstText,
                overflowText: this.firstText,
                iconCls: 'x-tbar-page-first',
                disabled: true,
                handler: this.moveFirst,
                scope: this
            }), this.prev = new T.Button({
                tooltip: this.prevText,
                overflowText: this.prevText,
                iconCls: 'x-tbar-page-prev',
                disabled: true,
                handler: this.movePrevious,
                scope: this
            }), '-', this.beforePageText,
        this.inputItem = new Ext.form.NumberField({
            cls: 'x-tbar-page-number',
            allowDecimals: false,
            allowNegative: false,
            enableKeyEvents: true,
            selectOnFocus: true,
            submitValue: false,
            listeners: {
                scope: this,
                keydown: this.onPagingKeyDown,
                blur: this.onPagingBlur
            }
        }), this.afterTextItem = new T.TextItem({
            text: String.format(this.afterPageText, 1)
        }), '-', this.next = new T.Button({
            tooltip: this.nextText,
            overflowText: this.nextText,
            iconCls: 'x-tbar-page-next',
            disabled: true,
            handler: this.moveNext,
            scope: this
        }), this.last = new T.Button({
            tooltip: this.lastText,
            overflowText: this.lastText,
            iconCls: 'x-tbar-page-last',
            disabled: true,
            handler: this.moveLast,
            scope: this
        })];


            var userItems = this.items || this.buttons || [];
            if (this.prependButtons) {
                this.items = userItems.concat(pagingItems);
            } else {
                this.items = pagingItems.concat(userItems);
            }
            delete this.buttons;
            if (this.displayInfo) {
                this.items.push('->');
                this.items.push(this.displayItem = new T.TextItem({}));
            }
            Kdn.grid.PagingToolbar.superclass.initComponent.call(this);
            this.addEvents(
            'change',
            'beforechange'
        );
            this.on('afterlayout', this.onFirstLayout, this, { single: true });
            this.cursor = 0;
            this.view.on('refresh', this.onViewRefresh, this);
        },

        onViewRefresh: function() {
            var d = this.getPageData(),
                ap = d.activePage,
                ps = d.pages;
            with(this){
               afterTextItem.setText(String.format(afterPageText,ps));
               inputItem.setValue(ap);
               first.setDisabled(ap == 1);
               prev.setDisabled(ap == 1);
               next.setDisabled(ap == ps);
               last.setDisabled(ap == ps);
               updateInfo(d);
            }
            this.fireEvent('change', this, d);
        },

        // private
        onFirstLayout: function() {
            with(this){
                view.pageSize=pageSize;
                view.cursor=0;
                view.refresh()
            }
        },

        // private
        updateInfo: function(d) {
            var cur,lst,msg;
            with(this){
                if (displayItem){
                    lst=(view.cursor+1)*view.pageSize;
                    cur=lst>view.total?view.total:lst;
                    msg = cur==0?emptyMsg:String.format(displayMsg,view.cursor*view.pageSize+1,cur,view.total);
                    displayItem.setText(msg); 
                }
            }
        },

        // private
        getPageData: function() {
            with(this.view){
                return{
                    total:total,
                    activePage: cursor+1,
                    pages: getPageCount()
                }
            }            
        },

        // private
        readPage: function(d) {
            var v = this.inputItem.getValue(), pageNum;
            if (!v || isNaN(pageNum = parseInt(v, 10))) {
                this.inputItem.setValue(d.activePage);
                return false;
            }
            return pageNum;
        },

        onPagingFocus: function() {
            this.inputItem.select();
        },

        //private
        onPagingBlur: function(e) {
            this.inputItem.setValue(this.getPageData().activePage);
        },

        // private
        onPagingKeyDown: function(field, e) {
            var k = e.getKey(), d = this.getPageData(), pageNum;
            if (k == e.RETURN) {
                e.stopEvent();
                pageNum = this.readPage(d);
                if (pageNum !== false) {
                    pageNum = Math.min(Math.max(1, pageNum), d.pages);
                    this.view.cursor = pageNum-1;
                    this.view.refresh();
                }
            } else if (k == e.HOME || k == e.END) {
                e.stopEvent();
                pageNum = k == e.HOME ? 1 : d.pages;
                field.setValue(pageNum);
            } else if (k == e.UP || k == e.PAGEUP || k == e.DOWN || k == e.PAGEDOWN) {
                e.stopEvent();
                if ((pageNum = this.readPage(d))) {
                    var increment = e.shiftKey ? 10 : 1;
                    if (k == e.DOWN || k == e.PAGEDOWN) {
                        increment *= -1;
                    }
                    pageNum += increment;
                    if (pageNum >= 1 & pageNum <= d.pages) {
                        field.setValue(pageNum);
                    }
                }
            }
        },
        moveFirst: function() {
            this.view.firstPage();
        },
        movePrevious: function() {
            this.view.prevPage();
        },
        moveNext: function() {
            this.view.nextPage();
        },
        moveLast: function() {
            this.view.lastPage();
        },

        onDestroy: function() {
            Ext.PagingToolbar.superclass.onDestroy.call(this);
        }
    });

})();