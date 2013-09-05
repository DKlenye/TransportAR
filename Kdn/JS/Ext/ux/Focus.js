Ext.ns('Ext.a11y');

Ext.a11y.Frame = Ext.extend(Object, {
    initialized: false,
    
    constructor: function(size, color){
        this.setSize(size || 1);
        this.setColor(color || '15428B');
    },
    
    init: function(){
        if (!this.initialized) {
            this.sides = [];
            
            var s, i;
            
            this.ct = Ext.DomHelper.append(document.body, {
                cls: 'x-a11y-focusframe'
            }, true);
            
            for (i = 0; i < 4; i++) {
                s = Ext.DomHelper.append(this.ct, {
                    cls: 'x-a11y-focusframe-side',
                    style: 'background-color: #' + this.color
                }, true);
                s.visibilityMode = Ext.Element.DISPLAY;
                this.sides.push(s);
            }
            
            this.frameTask = new Ext.util.DelayedTask(function(el,refreshFrame){
                var newEl = Ext.get(el);
                if (newEl != this.curEl || refreshFrame) {
                    
                    var w = newEl.getWidth();
                    var h = newEl.getHeight();
                    var XY = newEl.getXY();
                    var downXY = [XY[0],XY[1]+h-1];
                                        
                    this.sides[0].show().setSize(w, this.size).anchorTo(el, 'tl', [0, -1]); //up
                                        
                    this.sides[2].show().setSize(w, this.size);
                    this.sides[2].setXY.defer(20,this.sides[2],[downXY]);
                                                            
                    this.sides[1].show().setSize(this.size, h).anchorTo(el, 'tr', [-1, 0]); //right
                    this.sides[3].show().setSize(this.size, h).anchorTo(el, 'tl', [-1, 0]); //left
                    this.curEl = newEl;
                }
            }, this);
            
            this.unframeTask = new Ext.util.DelayedTask(function(){
                if (this.initialized) {
                    this.sides[0].hide();
                    this.sides[1].hide();
                    this.sides[2].hide();
                    this.sides[3].hide();
                    this.curEl = null;
                }
            }, this);
            this.initialized = true;
        }
    },
    
    frame: function(el,refreshFrame){
        this.init();
        this.unframeTask.cancel();
        this.frameTask.delay(2, false, false, [el,refreshFrame]);
    },
    
    unframe: function(){
        this.init();
        this.unframeTask.delay(2);
    },
    
    setSize: function(size){
        this.size = size;
    },
    
    setColor: function(color){
        this.color = color;
    }
});

Ext.a11y.FocusFrame = new Ext.a11y.Frame(2, '15428B');

Ext.a11y.Focusable = Ext.extend(Ext.util.Observable, {
    constructor: function(el, frameEl, cmp){
        Ext.a11y.Focusable.superclass.constructor.call(this);
        
        this.addEvents('focus', 'blur', 'left', 'right', 'up', 'down', 'esc', 'enter', 'space','pageup','pagedown');
        
        if (el instanceof Ext.Component) {
            this.el = el.el;
            this.setComponent(el);
        }
        else {
            this.el = Ext.get(el);
            this.setComponent(cmp);
        }
        
        this.setFrameEl(frameEl);
        
        this.init();
        
        Ext.a11y.FocusMgr.register(this);
    },
    
    init: function(){
        this.el.dom.tabIndex = '1';
        this.el.addClass('x-a11y-focusable');
        this.el.on({
            focus: this.onFocus,
            blur: this.onBlur,
            keydown: this.onKeyDown,
            resize: this.onResize,
            scope: this
        });
    },
    
    setFrameEl: function(frameEl){
        this.frameEl = frameEl && Ext.get(frameEl) || this.el;
    },
    
    setComponent: function(cmp){
        this.component = cmp || null;
    },
    
    onKeyDown: function(e, t){
   
        var k = e.getKey(), SK = Ext.a11y.Focusable.SpecialKeys, ret, tf;
        
        tf = (t !== this.el.dom) ? Ext.a11y.FocusMgr.get(t, true) : this;
        if (!tf) {
            // this can happen when you are on a focused item within a panel body
            // that is not a Ext.a11y.Focusable
            tf = Ext.a11y.FocusMgr.get(Ext.fly(t).parent('.x-a11y-focusable'));
        }
        
        if (SK[k] !== undefined) {
            ret = this.fireEvent(SK[k], e, t, tf, this);
        }
        if (ret === false || this.fireEvent('keydown', e, t, tf, this) === false) {
            e.stopEvent();
        }
    },
    
    focus: function(){
        this.el.dom.focus();
    },
    
    blur: function(){
        this.el.dom.blur();
    },
    
    onFocus: function(e, t){
        this.el.addClass('x-a11y-focused');
        Ext.a11y.FocusFrame.frame(this.frameEl);
        this.fireEvent('focus', e, t, this);
    },
    
    onBlur: function(e, t){
        this.el.removeClass('x-a11y-focused');
        Ext.a11y.FocusFrame.unframe();
        this.fireEvent('blur', e, t, this);
    },
    onResize :function(){    
      if(this.el.hasClass('x-a11y-focused')){
         Ext.a11y.FocusFrame.frame(this.frameEl,true);
      }
    },
    
    destroy: function(){
        this.el.un('keydown', this.onKeyDown);
        this.el.un('focus', this.onFocus);
        this.el.un('blur', this.onBlur);
        this.el.un('resize', this.onResize);
        this.el.removeClass('x-a11y-focusable');
        this.el.removeClass('x-a11y-focused');
    }
});


Ext.a11y.FocusMgr = function(){
    var all = new Ext.util.MixedCollection();
    
    return {
        register: function(f){
            all.add(f.el && Ext.id(f.el), f);
        },
        
        unregister: function(f){
            all.remove(f);
        },
        
        get: function(el, noCreate){
            return all.get(Ext.id(el)) || (noCreate ? false : new Ext.a11y.Focusable(el));
        },
        
        all: all
    }
}();

Ext.a11y.Focusable.SpecialKeys = {};
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.LEFT] = 'left';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.RIGHT] = 'right';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.DOWN] = 'down';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.UP] = 'up';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.ESC] = 'esc';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.ENTER] = 'enter';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.SPACE] = 'space';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.TAB] = 'tab';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.PAGEDOWN] = 'pagedown';
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.PAGEUP] = 'pageup';