/*T.combo.TireModel = Ext.extend(Kdn.form.ComboBox, {
    initComponent: function()
    {
        Ext.apply(this, {
        valueField: 'TireModelId',
            displayField: 'TireModelName',
            store: Kdn.ModelFactory.getStore('TireModel'),
            tpl: new Ext.XTemplate(
                '<tpl for="."><div class="x-combo-list-item">',
			        '<b>{TireModelName}</b> {TireMakerName} {Description} {Size} {KmNorm} {MhNorm}',
                '</div></tpl>'
            )
        });
        T.combo.TireModel.superclass.initComponent.call(this);
    }
});

Ext.reg('combo.tiremodel', T.combo.TireModel);
*/

T.combo.TireModel = Ext.extend(Kdn.form.ComboGrid, {
    listWidth: 700,
    pageSize: 20,
    minHeight: 600,
    minListWidth: 450,

    getFilterFn: function(val) {
        var er = Ext.escapeRe;
        var regexp = new RegExp(er(String(val)), 'i');

        return function(rec) {
        var gn = rec.get('TireModelName');
            return regexp.test(gn);
        }

    },

    renderTpl: '{TireModelName} {Description} ',
    columns: [
               {
                   dataIndex: 'TireModelName',
                   header: 'Наименование',
                   width: 110,
                   fixed: true
               },
               {
                   dataIndex: 'TireMakerName',
                   header: 'Производитель'
               },
               {
                   dataIndex: 'Description',
                   header: 'Примечание'
               },
               {
                   dataIndex: 'Size',
                   header: 'Размер',
                   width: 100,
                   fixed: true
               },
               {
                   dataIndex: 'KmNorm',
                   header: 'Норма, км',
                   width: 80,
                   fixed: true
               },
               {
                   dataIndex: 'MonthNorm',
                   header: 'Норма, мес',
                   width: 90,
                   fixed: true
               }
            ],
    initComponent: function() {

        Ext.apply(this, {
            store: Kdn.ModelFactory.getStore('TireModel'),     
            objectValue: false
        });
        T.combo.TireModel.superclass.initComponent.call(this);
    }
});


Ext.reg('combo.tiremodel', T.combo.TireModel);