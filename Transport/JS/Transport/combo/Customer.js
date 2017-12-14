T.combo.Customer = Ext.extend(Kdn.form.ComboGrid, {
    showNotActual:false,
    listWidth: 800,
    pageSize: 30,
    minHeight: 400,
    minListWidth: 800,

    serviceAgreement: 0,
    

    getFilterFn:function(val){
        var er = Ext.escapeRe;
        
      var regexp =  new RegExp(er(String(val)),'i');  
      var regexp2 =  new RegExp('^'+er(String(val)),'i');
      var regex3 = new RegExp(er(String('подр-я')), 'i');

        var agreement = this.serviceAgreement;

        return function(rec) {

            var purpose = rec.get('Purpose');
            var isService = !!purpose;

            if (isService) {
                return regexp.test(rec.get('CustomerName')) &&
                    (!agreement || purpose.AgreementId == agreement) &&
                    regex3.test(purpose.ShortName);
            } else {
               // return !!agreement? false: regexp.test(rec.get('CustomerName'));
                return regexp.test(rec.get('CustomerName'));
            }

        };

    },

   renderTpl:'[{CustomerId}] {CustomerName}',
      columns:[
         {
            dataIndex:'CustomerId',
            header:'Код',
            width:50,
            fixed:true
         },
         {
            dataIndex:'SHZ',
            header:'Шифр',
            width:50,
            fixed:true
         },
         {
            dataIndex:'CustomerName',
            header: 'Наименование',
            renderer:function(v,meta,rec) {
                return rec.get('CustomerName1') || rec.get('CustomerName');
            },
            filter: {
                test: function (f, o) {
                    if (!f) return true;
                    if (!o || o.length < 1) return false;
                    var reg = new RegExp(f, 'i');
                    return reg.test(o);
                }
            }
            
         },
         {
            dataIndex:'Purpose',
            header: 'Цель',
            renderer:function(v) {
                if (!v) return v;
                return v.ShortName;
            },
            filter: {
                test: function (f, o) {
                    if (!f) return true;
                    if (!o || o.length < 1) return false;

                    var flag = false;
                    var reg = new RegExp(f, 'i');

                    Ext.iterate(o, function (v) {
                        if (reg.test(o.PurposeName)) {
                            flag = true;
                            return false;
                        }
                    });

                    return flag;
                }
            }
        },
         {
            dataIndex:'CostCode',
            header:'Код затрат',
            width:100,
            fixed:true
         }
      ],

      initComponent:function() {

          var store;

          if (this.showNotActual) {
              store = Kdn.ModelFactory.getStore('Customer');
          } else {
              store = Kdn.ModelFactory.getModel('Customer').buildStore({
                  autoDestroy: true,
                  autoLoad: false,
                  autoSave: false
              });

              var _store = Kdn.ModelFactory.getStore('Customer');

              _store.on({
                  load: function () {
                      var store = this.store;
                      store.clearData();
                      Kdn.ModelFactory.getStore('Customer').each(function (rec) {
                          if (!rec.get('notActual')) {
                              store.add(rec.copy());
                          }
                      });
                  },
                  scope: this,
                  single: true
              });

              store.clearData();
              Kdn.ModelFactory.getStore('Customer').each(function (rec) {
                  if (!rec.get('notActual')) {
                      store.add(rec.copy());
                  }
              });
          }

      
      Ext.apply(this,{
         store:store
      });
      T.combo.Customer.superclass.initComponent.call(this);
   } 
});

Ext.reg('combo.customer', T.combo.Customer);