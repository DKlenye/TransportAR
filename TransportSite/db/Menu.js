Ext.ns('Kdn');

Kdn.Menu = [{
    "MenuId": 0,
    "text": "Программа",
    "iconCls": "icon-application_xp32",
    "Child": [{
        "text": "Пользователи",
        "iconCls": "icon-user",
        "Handler": "createView",
        "HandlerCfg": "{xtype:'kdn.view.user',single:true}"
    }, {
        "text": "Группы пользователей",
        "iconCls": "icon-group",
        "Handler": "createView",
        "HandlerCfg": "{xtype:'kdn.view.usergroup',single:true}"
    }, {
        "text": "Меню приложения",
        "iconCls": "icon-menu",
        "Handler": "createView",
        "HandlerCfg": "{xtype:'kdn.view.menu',single:true}"
    }, {
        "text": "Обновить схему БД",
        "iconCls": "icon-database_refresh",
        "Handler": "updateDatabase"

    }, {
        "text": "Пересоздать БД",
        "iconCls": "icon-database_lightning",
        "Handler": "reCreateDatabase"

    }, {
        "text": "HQL Analyzer",
        "iconCls": "icon-sql",
        "Sequence": 0,
        "Handler": null,
        "HandlerCfg": null
}]
    }, {
        "text": "Справочники",
        "iconCls": "icon-book_open32",
        "Child": [{
            "text": "Подразделения",
            "iconCls": "icon-brick",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.transportowner',single:true}"
        }, {
            "text": "Цеха/Производства",
            "iconCls": "icon-bricks",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.department',single:true}"
        }, {
            "text": "Колонны",
            "iconCls": "icon-microformats",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.transportcolumn',single:true}"
        }, {
            "text": "География",
            "iconCls": "icon-map",
            "Handler": null,
            "HandlerCfg": null,
            "Child": [{
                "text": "Пункты",
                "iconCls": "icon-point-silver",
                "Handler": "createView",
                "HandlerCfg": "{xtype:'view.routepoint',single:true}"
            }, {
                "text": "Маршруты",
                "iconCls": "icon-layer-select-point",
                "Handler": "createView",
                "HandlerCfg": "{xtype:'view.route',single:true}"
}]
            }, {
                "text": "Работа",
                "iconCls": "icon-google_webmaster_tools",
                "Handler": null,
                "HandlerCfg": null,
                "Child": [
        {
            "text": "Счётчики работы",
            "iconCls": "icon-counter",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.workcounter',single:true}"
        },
        {
            "text": "Ед.изм. работы",
            "iconCls": "icon-speedometer",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.workunit',single:true}"
        }, {
            "text": "Виды работ",
            "iconCls": "icon-toolbox",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.worktype',single:true}"
        }, {
            "text": "Надбавки",
            "iconCls": "icon-draw_island",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.increase',single:true}"
        },
        {
            "text": "График работы",
            "iconCls": "icon-calendar",
            "Handler": "createView",
            "HandlerCfg": "{xtype:'view.schedule',single:true}"
}]
            }, {
                "text": "Группы транспорта",
                "Child": [{
                    "text": "Группы по бухгалтерии",
                    "Handler": "createView",
                    "HandlerCfg": "{xtype:'view.accgroup',single:true}"
                }, {
                    "text": "Группы по услугам",
                    "Handler": "createView",
                    "HandlerCfg": "{xtype:'view.servicegroup',single:true}"
                },

{
    "text": "Группы по разнарядке",
    "Handler": "createView",
    "HandlerCfg": "{xtype:'view.grouprequest',single:true}"
}
]
                }, {
                    "text": "Транспорт",
                    "iconCls": "icon-lorry",
                    "Handler": "createView",
                    "HandlerCfg": "{xtype:'view.car',single:true}",
                    "Child": [{
                        "text": "Прицепы",
                        "iconCls": "icon-trailer",
                        "Handler": "createView",
                        "HandlerCfg": "{xtype:'view.trailer',single:true}"
                    }, {
                        "text": "Нормы расхода топлива",
                        "iconCls": "icon-norm",
                        "Handler": "createView",
                        "HandlerCfg": "{xtype:'view.norm',single:true}"
                    }, {
                        "text": "Страховка",
                        "iconCls": "icon-insurance",
                        "Handler": "createView",
                        "HandlerCfg": "{xtype:'view.insurance',single:true}"
                    }, {
                        "text": "Проверка CO",
                        "iconCls": "icon-co2",
                        "Handler": "createView",
                        "HandlerCfg": "{xtype:'view.checkco',single:true}"
                    }, {
                        "text": "Тех. осмотр",
                        "iconCls": "icon-TO",
                        "Handler": "createView",
                        "HandlerCfg": "{xtype:'view.inspection',single:true}"
                    }, {
                        "text": "Лимиты",
                        "iconCls": "icon-cog_error",
                        "Handler": null,
                        "HandlerCfg": null
                    },
        {
            text: 'Типы двигателей',
            Handler: "createView",
            HandlerCfg: "{xtype:'view.enginetype',single:true}"
        },
        {
            text: 'Классы экологичности',
            Handler: "createView",
            HandlerCfg: "{xtype:'view.ecologyclass',single:true}"
        }

        ]
                }, {
                    "text": "Заказчики",
                    "iconCls": "icon-reseller_account",
                    "Handler": "createView",
                    "HandlerCfg": "{xtype:'view.customer',single:true}"
                }, {
                    "text": "Типы кузовов",
                    "iconCls": "icon-car",
                    "Handler": "createView",
                    "HandlerCfg": "{xtype:'view.bodytype',single:true}"
                }, {
                    "text": "ГСМ",
                    "iconCls": "icon-paintcan",
                    Child: [
         {
             "text": "Топливо",
             "iconCls": "icon-paintcan",
             "Handler": "createView",
             "HandlerCfg": "{xtype:'view.fuel',single:true}"
         },
         {
             "text": "Масла",
             "iconCls": "icon-oil",
             "Handler": "createView",
             "HandlerCfg": "{xtype:'view.oil',single:true}"
         },
         {
             "text": "Группы масел",
             "iconCls": "",
             "Handler": "createView",
             "HandlerCfg": "{xtype:'view.oilgroup',single:true}"
         }
        ]
                }, {
                    "text": "Работники",
                    "iconCls": "icon-participation_rate",
                    "Handler": "createView",
                    "HandlerCfg": "{xtype:'view.employee',single:true}"
                }, {
                    "text": "Водители",
                    "iconCls": "icon-driver",
                    "Handler": "createView",
                    "HandlerCfg": "{xtype:'view.driver',single:true}",
                    "Child": [{
                        "text": "Водительские удостоверения",
                        "iconCls": "icon-client_account_template",
                        "Handler": "createView",
                        "HandlerCfg": "{xtype:'view.driverlicence',single:true}"
                    }, {
                        "text": "Мед. справки",
                        "iconCls": "icon-flag_red_cross",
                        "Handler": "createView",
                        "HandlerCfg": "{xtype:'view.drivermedical',single:true}"
}]
                    }, {
                        "text": "Заправка",
                        "iconCls": "icon-gas",
                        "Child": [{
                            "text": "Места выдачи топлива",
                            "iconCls": null,
                            "Handler": "createView",
                            "HandlerCfg": "{xtype:'view.refuellingplace',single:true}"
}]
                        }, {
                            "text": "Температура воздуха",
                            "iconCls": "icon-temperature_3",
                            "Handler": "createView",
                            "HandlerCfg": "{xtype:'view.temperature',single:true}"
}]
                        }, {
                            "text": "Путевые листы",
                            "iconCls": "icon-page_white_gear32",
                            "Child": [{
                                "text": "Выдача путевых листов",
                                "iconCls": "icon-page_white_add",
                                "Handler": "createView",
                                "HandlerCfg": "{xtype:'view.waybillinsert'}"
                            }, {
                                "text": "Обработка путевых листов",
                                "iconCls": "icon-page_white_edit",
                                "Handler": "createView",
                                "HandlerCfg": "{xtype:'view.waybilleditor',mode:'update',withContainer:false}"
                            }, {
                                "text": "Список путевых листов",
                                "iconCls": "icon-page_white_stack",
                                "Handler": "createView",
                                "HandlerCfg": "{xtype:'view.waybill',single:true}"
                            }, {
                                "text": "Бланки пут. листов",
                                "iconCls": "icon-waybill",
                                "Handler": "createView",
                                "HandlerCfg": "{xtype:'view.waybilltype',single:true}"
                            }, {
                                "text": "Пачки путевых листов",
                                "iconCls": "icon-package",
                                "Handler": 'createView',
                                "HandlerCfg": "{xtype:'view.waybillpackage',single:true}"
                            },
     {
         "text": "Типы пачек пут. листов",
         "iconCls": "icon-package_link",
         "Handler": "createView",
         "HandlerCfg": "{xtype:'view.waybillpackagetype',single:true}"
     },
     {
         "text": "Бланки пут. листов",
         Child:[
            {
                "text": "Грузовой",
                "Handler": "printWaybillTpl",
                "HandlerCfg": "'Freight'"
            },
			{
                "text": "Легковой",
                "Handler": "printWaybillTpl",
                "HandlerCfg": "'Car7'"
            },
			{
                "text": "Тракторная техника",
                "Handler": "printWaybillTpl",
                "HandlerCfg": "'Tractor'"
            },
			{
                "text": "Автобус",
                "Handler": "printWaybillTpl",
                "HandlerCfg": "'Bus'"
            },
			{
                "text": "Строительная машина",
                "Handler": "printWaybillTpl",
                "HandlerCfg": "'Build'"
            }
        ]
        },
                                {
                                    "text": "Информация по перерасходу",
                                    "iconCls": "icon-water--exclamation",
                                 "Handler": "createView",
                                 "HandlerCfg": "{xtype:'view.info.driverfuelexcess',single:true}"
                                    
                                }

    ]
},
{
    text: 'Лимиты',
    iconCls: 'icon-cog_error32',
    Child: [
        {
            text: 'Лимиты на пробег легкового транспорта',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.limit.vehiclekmlimits',single:true}"
        },
        {
            text: 'Лимиты на выдачу топлива',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.limit.vehiclefuellimits',single:true}"
        }
    ]
    },
{
    text: 'Учёт материалов',
    permission: {
        u: [1, 29, 22]
    },
    iconCls: 'icon-layers32',
    Child: [
      {
          text: 'Шины',
          iconCls: 'icon-tire',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.tire',single:true}"
      },
      {
          text: 'ГОСТы',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.tirestandard',single:true}"
      },
      {
          text: 'Производители Шин',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.tiremaker',single:true}"
      },
      {
          text: 'Модели шин',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.tiremodel',single:true}"
      },
      {
          text: 'АКБ',
          iconCls: 'icon-battery',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.battery',single:true}"
      },
      {
          text: 'Производители АКБ',
          iconCls: 'icon-table',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.batterymaker',single:true}"
      },
      {
          text: 'Типы АКБ',
          iconCls: 'icon-table',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.batterytype',single:true}"
      },
      {
          text: 'Причины снятия АКБ',
          iconCls: 'icon-table',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.batteryremovereason',single:true}"
      },
      {
          text: 'Отчёты',
          iconCls: 'icon-report-white',
          Child: [
            {
                text: 'Общий список АКБ',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.batterylist',single:true}"
            },
            {
                text: 'Cписок АКБ, отработавших гарантийный срок',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.batterywarrantlyend',single:true}"
            },
            {
                text: 'Cписок АКБ, снятых с ТС',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.batteryremove',single:true}"
            },
            {
                text: 'Cписок АКБ, полученных со склада',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.batteryumtu',single:true}"
            },
            {
                text: 'Cписок шин, полученных со склада',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.tireumtu',single:true}"
            },
            {
                text: 'Cписок шин, полученных со склада по гар.№',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.tireumtugn',single:true}"
            }
        ]
      }
   ]
},
{
    "text": "Заявки",
    "iconCls": "icon-page_gear32",
    "Handler": null,
    "HandlerCfg": null,
    "Child": [
      {
          text: 'Список лиц для утверждения заявок',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.requestapprover',single:true}",
          iconCls: 'icon-reseller_programm'
      },
      {
          text: 'Список лиц для утверждения заявок (по должностям)',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.v_requestemployee',single:true}"
      },
      {
          text: 'Журнал заявок',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.requestmagazine',single:true}",
          iconCls: 'icon-page_copy'
      },
      {
          text: 'Обработка заявок',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.requesttask',single:true}",
          iconCls: 'icon-page_go'
      },
      {
          text: 'Разнарядка',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.vehicleorder',single:true}",
          iconCls: 'icon-document_layout'
      },
      {
          text: 'Отчёты',
          iconCls: 'icon-report-white',
          Child: [
            {
                text: 'Отчёт о состоянии заявок за период',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.requestcount',single:true}"
            }
        ]
      }
    ]
},
{
    text: 'Отчёты',
    iconCls: 'icon-report32',
    Child: [
      {
          text: 'Акт снятия остатков',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.fuelremain',single:true}"
      },
      {
          text: 'Оборотная ведомость',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.accfuelobreport',single:true}"
      },
      {
          text: 'Оборотная ведомость(детализация)',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.accvehicleobreport',single:true}"
      },
      {
          text: 'Информация по заправке',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.refuellinginfo',single:true}"
      },
      {
          text: 'Информация по заправке(РЦП АЗС)',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.rcpasz',single:true}"
      },
      {
          text: 'Пробег транспорта',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.vehiclerun',single:true}"
      },
      {        
            text: 'Пробег транспорта (ежедневный)',
            iconCls: 'icon-blue-document-word',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.report.vehiclerundetails',single:true}"
      },
      {
          text: 'Реестры путевых листов',
          iconCls: 'icon-report-white',
          Child: [
            {
                text: 'Реестр по полимиру(78011200)',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expense78',single:true}"
            },
            {
                text: 'Реестр по полимиру(78011200) сводный',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expense78summ',single:true}"
            },
            {
                text: 'Реестр по полимиру(78011200) цеховые',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expense78department',single:true}"
            },
            {
                text: 'Реестр по сторонним(90)',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expense90',single:true}"
            },
            {
                text: 'Реестр по сторонним(90) цеховые',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expense90department',single:true}"
            },
            {
                text: 'Реестр по коду затрат',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expensecode',single:true}"
            },
              {
                text: 'Реестр по коду затрат(+ водители)',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expensecodedriver',single:true}"
            },
            {
                text: 'Затраты по заказчику',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expensecustomer',single:true}"
            },
            {
                text: 'Затраты по автомобилю',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expensevehicle',single:true}"
            },
            {
                text: 'Реестр по пригнанным автомобилям',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.expenseunknown',single:true}"
            }
          ]
      },
      {
          text: 'Накопительная ведомость',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.expenselist',single:true}"
      },
      {
          text: 'Накопительная ведомость(Группы по услугам)',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.expenselistbygroup',single:true}"
      },
      {
          text: 'Информация 12-тр',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.12trinfo',single:true}"
      },
       {
           text: 'Информация 12-тр (Дни в работе)',
           iconCls: 'icon-blue-document-word',
           Handler: 'createView',
           HandlerCfg: "{xtype:'view.report.12trdaycount',single:true}"
       },
        {           
          text: 'Информация 4-тр',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.4trinfo',single:true}"
       
        },
       {
        text: 'Списки транспорта',
        iconCls: 'icon-report-white',
        Child: [
              {
                text: 'Список транспорта',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehiclelist',single:true}"
              },
              {
                  text: 'Список транспорта (водители, нормы)',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehicleinfo',single:true}"
              },
              {
                  text: 'Список транспорта (по группам)',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehicleinfobygroup',single:true}"
              },
            {                
                 text: 'Список неиспользуемого транспорта',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehiclenotusing',single:true}"
            },
            {                
                 text: 'Список безномерного транспорта',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehiclesbyregistrationnumber',single:true}"
            },
            {                
                 text: 'Количество транспорта по группам заправки',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehiclebyrefuellinggroup',single:true}"
            }, 
            {
                  text: ' Сведения о транспорте юридического лица',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehiclecountinfo',single:true}"
              },
             {
                 text: ' Сведения о транспорте юридического лица (детализация)',
                 iconCls: 'icon-blue-document-word',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.report.vehiclecountinfodetails',single:true}"

             },
             {
                 text: 'Группировка ТС в соответствии с технико-эксплуатационными характеристиками',
                 iconCls: 'icon-blue-document-word',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.report.vehiclegroupaccinfo',single:true}"

             },
            {
                 text: 'Список транспорта (группы по услугам)',
                 iconCls: 'icon-blue-document-word',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.report.vehicleservicegroup',single:true}"
            }
        ]
       },    
       {
          text: 'Список норм',
          iconCls: 'icon-blue-document-word',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.report.vehiclenorms',single:true}"
      },
    {
        text: 'Отчёты по трансопрту',
        iconCls: 'icon-report-white',
        Child: [
              {
                  text: 'Работа транспорта',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehiclework',single:true}"
              },
              {
                  text: 'Работа транспорта (по группам)',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehicleworkbygroup',single:true}"
              },
              {
                  text: 'Работа транспорта Полимира до (01.03.2013)',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.polymirvehiclework',single:true}"
              },
              {
                  text: 'Суммарная информация о работе транспорта за период',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehicleworksummary',single:true}"
              },
              {
                  text: 'Работа транспорта (ежедневная)',
                  iconCls: 'icon-blue-document-word',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.report.vehicledaywork',single:true}"
              }
        ]
    },
    {
        text: 'Отчёты по водителям',
        iconCls: 'icon-report-white',
        Child: [{
            text: 'Ведомость учёта отработанного времени по п.л.',
            iconCls: 'icon-blue-document-word',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.report.driverworkingtime',single:true}"
        },
        {
             text: 'Работа водителей',
             iconCls: 'icon-blue-document-word',
             Handler: 'createView',
             HandlerCfg: "{xtype:'view.report.driverwork',single:true}"
         },
         {
             text: 'Список водителей экспедиторов',
             iconCls: 'icon-blue-document-word',
             Handler: 'createView',
             HandlerCfg: "{xtype:'view.report.forwarddrivers',single:true}"
         },
          {
                text: 'Водители в коммандировке',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.driversbusinesstrip',single:true}"
            }
        ]
    },
     {
		text: 'Инвентаризация',
        iconCls: 'icon-report-white',
        Child: [
			{
				text: 'Комиссия',
				Handler: 'createView',
				HandlerCfg: "{xtype:'view.inventorycomission',single:true}"
			},
			{
				text: 'Описи',
				iconCls: 'icon-blue-document-word',
				Handler: 'createView',
				HandlerCfg: "{xtype:'view.report.inventory',single:true}"
			}
        ]
     },
        {
            text: 'Коэффициент выхода транспорта на линию',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.report.vehicleworkkoefficient',single:true}"
        },
        {
            text: 'Путевые листы с перекрывающимися датами',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.report.waybilldateerrors',single:true}"
        }
    ]
},
{
    "text": "ТО",
    "iconCls": "icon-setting_tools32",
    "Handler": null,
    "HandlerCfg": null,
    "Child": [
      {
          text: 'Заявки на ТО',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.maintenancerequest',single:true}"
      },
        {
          text: 'Контроль выхода транспорта на линию',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.inspection.vehicledayinspection',single:true}"
        }
    ]
},
{
    "text": "Бухгалтерия",
    permission: {
        u: [1, 15, 16]
    },
    "iconCls": "icon-coins32",
    "Handler": null,
    "HandlerCfg": null,
    "Child": [
      {
          text: 'Рассчёт цен на топливо',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.acc.fuelcost',single:true}"
      },
      {
          text: 'Проводки',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.acc.posting',single:true}"
      },
      {
          text: 'Перерасход топлива',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.acc.driverfuelexcess',single:true}"
      },
      {
          text: 'Заправка(РЦП АЗС)',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.acc.rcpazs',single:true}"
      },
      {
          text: 'Заправка',
          Handler: 'createView',
          HandlerCfg: "{xtype:'view.acc.accrefuelling',single:true}"

      },
      {
          text: 'АЗС',
          Child:[
              {
                  text: 'Расчёт цен на топливо',
                  Handler: 'createView',
                  HandlerCfg: "{xtype:'view.azsacc.fuelcost',single:true}"
              }
          ]
      }

    ]
}
]