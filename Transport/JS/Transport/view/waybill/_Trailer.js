T.view.Trailer = Ext.extend(Kdn.view.BaseGrid, {
    requireModels:'Department,TransportColumn,BodyType',
    modelName: 'FullTrailer',
    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(cfg, {

            colModel: new Ext.grid.ColumnModel({
                defaults:{
                  filter:{},
                  width: 80
                },
                columns: this._getColumns()
            }),
            
            viewConfig:{
                getRowClass: function(record, rowIndex, rp, ds){
                    var cls = 'notActual';
                    return record.get('WriteOffDate')?cls:'';
                }
            }
            
        });

        T.view.Trailer.superclass.constructor.call(this, cfg);
 
    },

    _getColumns: function() {

        return [
                    {
                        header: 'Код',
                        dataIndex: 'VehicleId',
                        width: 50,
                        hidden:true,
                        editor: { xtype: 'kdn.editor.id' }
                    },
                    {
                        dataIndex: 'DepartmentId',
                        header: 'Цех/Про-во',
                        width: 200,
                        editor: { xtype: 'combo.department', objectValue:false, allowBlank:true },
                        renderer:function(o){
                           if(!o) return null;
                           var store = Kdn.ModelFactory.getStore('Department');
                           var record = store.getById(o);
                           if (record) return record.data['DepartmentName']
                        },
                         filter:{
                           field:{
                              xtype:'combo.department',
                              objectValue:false,
                              enableClear:true
                           },
                           fieldEvents:["select"],
                           
                           test: function(filterValue, value) {
                               if (!filterValue) return true;
                               return value == filterValue;
                           }                      
                        }
                    },
                    {
                        dataIndex: 'ColumnId',
                        header: 'Колонна',
                        width: 100,
                        editor: { xtype: 'combo.transportcolumn', objectValue:false, allowBlank:true },
                        renderer:function(o){
                           if(!o) return null;
                           var store = Kdn.ModelFactory.getStore('TransportColumn');
                           var record = store.getById(o);
                           if (record) return record.data['ColumnName']
                        },
                        filter:{
                           field:{
                              xtype:'combo.transportcolumn',
                              objectValue:false,
                              enableClear:true
                           },
                           fieldEvents:["select"] ,
                           
                           test: function(filterValue, value) {
                               if (!filterValue) return true;
                               return value == filterValue;
                           }                          
                        }
                    },
                    {
                        header: 'Гар.№',
                        dataIndex: 'GarageNumber',
                        width: 70,
                        editor: { xtype: 'kdn.editor.numberfield' }
                    },
                    {
                        dataIndex: 'Model',
                        header: 'Марка',
                        width: 250,
                        editor: { xtype: 'kdn.editor.textfield' }
                    },
                    {
                        dataIndex: 'FullModel',
                        header: 'Полная марка',
                        hidden:true,
                        width: 250,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }
                    },
                    {
                        dataIndex: 'FondModel',
                        header: 'Марка(Фонды)',
                        width: 250,
                        editor: { xtype: 'kdn.editor.textfield',readOnly:true,allowBlank:true }
                    },
                    {
                        dataIndex: 'RegistrationNumber',
                        header: 'Гос. №',
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'InventoryNumber',
                        header: 'Инв. №',
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }
                    },
                    {
                        dataIndex: 'MakeYear',
                        header: 'Год выпуска',
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'ServiceDocNumber',
                        header: '№ техпаспорта',
                        'hidden':true,
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'BodyTypeId',
                        header: 'Тип кузова',
                        width: 200,
                        editor: { xtype: 'combo.bodytype',objectValue:false,editable:true},
                        renderer:function(o){
                           if(!o) return null;
                           var store = Kdn.ModelFactory.getStore('BodyType');
                           var record = store.getById(o);
                           if (record) return record.data['BodyTypeName']
                        }
                    },
                    {
                        dataIndex: 'BodyNumber',
                        header: 'Идентификационный №(VIN)',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }
                    },  
                    {
                        dataIndex: 'ChassisNumber',
                        header: '№ шасси(рамы)',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }
                    },    
                    {
                        dataIndex: 'Color',
                        header: 'Цвет',
                        width: 120,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true }
                    },           
                    {
                        dataIndex: 'Width',
                        header: 'Ширина',
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'Length',
                        header: 'Длина',
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'Height',
                        header: 'Высота',
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'RegSertificate',
                        header: 'Св-во о регистрации',
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.textfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'RegEnd',
                        xtype:'datecolumn',
                        header: 'Срок действия св-ва о рег.',
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.datefield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'SelfMass',
                        header: 'Масса без нагрузки, т',
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.decimalfield',allowBlank:true,decimalPrecision:3 }
                    },
                    {
                        dataIndex: 'FullMass',
                        header: 'Полная масса, т',
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true  }
                    },
                    {
                        dataIndex: 'CapacityTonns',
                        header: 'Грузоподъёмность, т',
                        width: 120,
                        'hidden':true,
                        editor: { xtype: 'kdn.editor.numberfield',allowBlank:true }
                    },
                    {
                        dataIndex: 'WriteOffDate',
                        header: 'Дата списания',
                        xtype:'datecolumn',
                        width: 120,
                        editor: { xtype: 'kdn.editor.datefield',allowBlank:true }
                    }
                    
                ]
    }

});

Ext.reg('view.trailer', T.view.Trailer);