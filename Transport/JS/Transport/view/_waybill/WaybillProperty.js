T.view.waybill.WaybillProperty = Ext.extend(Kdn.grid.PropertyEditor, {
   margins:'3',
    constructor: function(cfg) {
        cfg = cfg || {};        
        
        var o = [
            ['WaybillId','№ пут. листа',{xtype:'kdn.editor.id'}],
            ['Position','Порядковый №',{xtype:'kdn.editor.id'}],            
            ['DepartureDate','Выезд',{xtype:'kdn.form.datefield'},function(v,m){m.css = 'departure'; return Ext.util.Format.date(v, 'd.m.Y');}],
            ['DepartureTime','&nbsp;',{xtype:'kdn.editor.timefield'},function(v,m){m.css = 'departure'; return v;}],
            ['ReturnDate','Возвращение',{xtype:'kdn.form.datefield'},function(v,m){m.css = 'return'; return Ext.util.Format.date(v, 'd.m.Y');}],
            ['ReturnTime','&nbsp;',{xtype:'kdn.editor.timefield'},function(v,m){m.css = 'return'; return v;}],
            ['DayCount','Количество дней',{
               xtype: 'numberfield',
               minValue: 1,
               maxValue: 99,
               allowBlank: false,
               allowDecimals:false,
               selectOnFocus:true
            }],
            ['ScheduleId','График',{xtype:'combo.schedule',objectValue:false},function(v){
               if(!v) return v;
               var store = Kdn.ModelFactory.getStore('Schedule'),
                   rec = store.getById(v);
               if(rec) return rec.get('ScheduleName');
               return null;
            }],
            ['Shift','Смена',{xtype:'kdn.editor.numberfield',baseChars:"12"}],
            ['Way','Маршрут',{xtype:'kdn.editor.textfield'}],
            ['WaybillTypeId','Форма бланка',{xtype:'combo.waybilltype',objectValue:false},
            function(v){
               if(!v) return v;
               var store = Kdn.ModelFactory.getStore('WaybillType'),
                   rec = store.getById(v);
               if(rec) return rec.get('WaybillTypeName');
               return null;
            }],
            ['TrailerId','Прицеп',{xtype:'combo.trailer',enableClear:true},T.combo.Trailer.prototype.renderTpl],
            ['PackageId','№ пачки',{xtype:'numberfield'}],
            ['WaybillState','Состояние',{xtype:'kdn.editor.id'},function(v,m){
               m.css += 'icon-column';
               if(!v) return null;
               return String.format('<div class="icon-lock{0}">&#160;</div>', v>1 ? '' : '-unlock');
            }]
        ];
        
        var propCfg = {
            source:{},
            propertyNames:{},
            customEditors:{},
            customRenderers:{}
        };
        
        Ext.iterate(o,function(a){
            var len = a.length;
            propCfg.source[a[0]]=null;
            propCfg.propertyNames[a[0]]=a[1];
            propCfg.customEditors[a[0]]=new Ext.grid.GridEditor(Ext.create(a[2]));
            if(len>3) propCfg.customRenderers[a[0]]=a[3];
        });
        
        Ext.apply(cfg, {
            defaultSource:Kdn.clone(propCfg.source),
            margins:'0'
        });
        
        Ext.apply(cfg,propCfg);

        T.view.waybill.WaybillProperty.superclass.constructor.call(this, cfg);
    },
    
    initComponent:function(){
      this.on('beforepropertychange',this.onPropertyChange,this);
      T.view.waybill.WaybillProperty.superclass.initComponent.call(this);
    },
    
    resetSource: function() {
        this.setSource(Kdn.clone(this.defaultSource));
    },
    
    onPropertyChange: function(source, name, newProp, oldProp) {             
        source[name] = newProp;                       
        switch (name) {
            case 'DepartureDate':
               {
						source['ReturnDate'] = newProp.add(Date.DAY, source.DayCount - 1);
						break;   
					}
            case 'DayCount':
               {
                    source['ReturnDate'] = source.DepartureDate.add(Date.DAY, source.DayCount - 1);
                    break;
               }
            case 'ReturnDate':
               {       
						var count = Kdn.fixDecimal((source['ReturnDate'] - source['DepartureDate']) / (1000 * 60 * 60 * 24),0);
                  count++;
                  if (count>99) return false;
                  source['DayCount'] = count;
                  break;
               }
        }        
        this.setSource(source);
    },
    
    setData:function(data){
      
      var $ = this,
          source = $.getSource();
          
      $.resetSource();
            
      Ext.iterate(source,function(name, val, obj) {
            if (data[name]) {
                obj[name] = data[name];
            }
      });
      
      Ext.apply(source, {
            DepartureTime: data.DepartureDate.format('H:i'),
            ReturnTime: data.ReturnDate.format('H:i'),
            DepartureDate: data.DepartureDate.clearTime(),
            ReturnDate: data.ReturnDate.clearTime()
        });
        
        $.onPropertyChange(source,'ReturnDate',source.ReturnDate,source.ReturnDate);  
          
    }
    
});

Ext.reg('view.waybill.waybillproperty', T.view.waybill.WaybillProperty);