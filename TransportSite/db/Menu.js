Ext.ns('Kdn');

Kdn.Menu = [
    {
        MenuId: 0,
        text: "Программа",
        permission: { u: [1,168] },
        iconCls: "icon-application_xp32",
        Child: [
            {
                text: "Пользователи",
                iconCls: "icon-user",
                Handler: "createView", 
                HandlerCfg: "{xtype:'kdn.view.user',single:true}"
            }
        ]
    },
    {
        text: "Справочники",
        iconCls: "icon-book_open32",
        Child: [
            {
                text: "Подразделения",
                iconCls: "icon-brick",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.transportowner',single:true}"
            }, {
                text: "Цеха/Производства",
                iconCls: "icon-bricks",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.department',single:true}"
            }, {
                text: "Колонны",
                iconCls: "icon-microformats",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.transportcolumn',single:true}"
            }, {
                text: "География",
                iconCls: "icon-map",
                Handler: null,
                HandlerCfg: null,
                Child: [
                    {
                        text: "Пункты",
                        iconCls: "icon-point-silver",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.routepoint',single:true}"
                    }, {
                        text: "Маршруты",
                        iconCls: "icon-layer-select-point",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.route',single:true}"
                    }
                ]
            }, {
                text: "Работа",
                iconCls: "icon-google_webmaster_tools",
                Handler: null,
                HandlerCfg: null,
                Child: [
                    {
                        text: "Счётчики работы",
                        iconCls: "icon-counter",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.workcounter',single:true}"
                    }, {
                        text: "Ед.изм. работы",
                        iconCls: "icon-speedometer",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.workunit',single:true}"
                    }, {
                        text: "Виды работ",
                        iconCls: "icon-toolbox",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.worktype',single:true}"
                    }, {
                        text: "Надбавки",
                        iconCls: "icon-draw_island",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.increase',single:true}"
                    }, {
                        text: "График работы",
                        iconCls: "icon-calendar",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.schedule',single:true}"
                    }
                ]
            }, {
                text: "Группы транспорта",
                Child: [
                    {
                        text: "Группы по бухгалтерии",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.accgroup',single:true}"
                    }, {
                        text: "Группы по услугам",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.servicegroup',single:true}"
                    }, {
                        text: "Группы по разнарядке",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.grouprequest',single:true}"
                    }, {
                        text: "Группы для отчётов",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.reportgroup',single:true}"
                    },
                    {
                        text: "Группы по маслам",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.vehicleoilgroup',single:true}"
                    },
                    {
                        text: "Группы по бизнес плану",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.businessplangroup',single:true}"
                    }
                ]
            }, {
                text: "Транспорт",
                iconCls: "icon-lorry",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.car',single:true}",
                Child: [
                    {
                        text: "Прицепы",
                        iconCls: "icon-trailer",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.trailer',single:true}"
                    }, {
                        text: "Нормы расхода топлива",
                        iconCls: "icon-norm",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.norm',single:true}"
                    }, {
                        text: "Нормы расхода масел",
                        iconCls: "icon-beaker--exclamation",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.oilnorm',single:true}"
                    }, {
                        text: "Страховка",
                        iconCls: "icon-insurance",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.insurance',single:true}"
                    }, {
                        text: "Проверка CO",
                        iconCls: "icon-co2",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.checkco',single:true}"
                    }, {
                        text: "Тех. осмотр",
                        iconCls: "icon-TO",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.inspection',single:true}"
                    }, {
                        text: "Лимиты",
                        iconCls: "icon-cog_error",
                        Handler: null,
                        HandlerCfg: null
                    }, {
                        text: 'Типы двигателей',
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.enginetype',single:true}"
                    },
                    {
                        text: 'Типы КПП',
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.transmissiontype',single:true}"
                    },{
                        text: 'Классы экологичности',
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.ecologyclass',single:true}"
                    },
                    {
                        text: 'Марки (модели) транспортных средств',
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.vehiclemodel',single:true}"
                    }
                ]
            }, {
                text: "Заказчики",
                iconCls: "icon-reseller_account",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.customer',single:true}"
            }, {
                text: "Типы кузовов",
                iconCls: "icon-car",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.bodytype',single:true}"
            }, {
                text: "ГСМ",
                iconCls: "icon-paintcan",
                Child: [
                    {
                        text: "Топливо",
                        iconCls: "icon-paintcan",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.fuel',single:true}"
                    }, {
                        text: "Масла",
                        iconCls: "icon-oil",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.oil',single:true}"
                    }, {
                        text: "Группы масел",
                        iconCls: "",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.oilgroup',single:true}"
                    }
                ]
            }, {
                text: "Работники",
                iconCls: "icon-participation_rate",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.employee',single:true}"
            }, {
                text: "Водители",
                iconCls: "icon-driver",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.driver',single:true}",
                Child: [
                    {
                        text: "Водительские удостоверения",
                        iconCls: "icon-client_account_template",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.driverlicence',single:true}"
                    }, {
                        text: "Мед. справки",
                        iconCls: "icon-flag_red_cross",
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.drivermedical',single:true}"
                    }
                ]
            }, {
                text: "Заправка",
                iconCls: "icon-gas",
                Child: [
                    {
                        text: "Места выдачи топлива",
                        iconCls: null,
                        Handler: "createView",
                        HandlerCfg: "{xtype:'view.refuellingplace',single:true}"
                    }
                ]
            }, {
                text: "Температура воздуха",
                iconCls: "icon-temperature_3",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.temperature',single:true}"
            }
        ]
    }, {
        text: "Путевые",
        iconCls: "icon-page_white_gear32",
        Child: [
            {
                text: "Выдача путевых листов",
                iconCls: "icon-page_white_add",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.waybillinsert'}"
            }, {
                text: "Обработка путевых листов",
                iconCls: "icon-page_white_edit",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.waybilleditor',mode:'update',withContainer:false}"
            }, {
                text: "Список путевых листов",
                iconCls: "icon-page_white_stack",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.waybill',single:true}"
            }, {
                text: "Бланки пут. листов",
                iconCls: "icon-waybill",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.waybilltype',single:true}"
            }, {
                text: "Пачки путевых листов",
                iconCls: "icon-package",
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.waybillpackage',single:true}"
            }, {
                text: "Типы пачек пут. листов",
                iconCls: "icon-package_link",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.waybillpackagetype',single:true}"
            }, {
                text: "Бланки пут. листов",
                Child: [
                    {
                        text: "Грузовой",
                        Handler: "printWaybillTpl",
                        HandlerCfg: "'Freight'"
                    }, {
                        text: "Легковой",
                        Handler: "printWaybillTpl",
                        HandlerCfg: "'Car7'"
                    }, {
                        text: "Тракторная техника",
                        Handler: "printWaybillTpl",
                        HandlerCfg: "'Tractor'"
                    }, {
                        text: "Автобус",
                        Handler: "printWaybillTpl",
                        HandlerCfg: "'Bus'"
                    }, {
                        text: "Строительная машина",
                        Handler: "printWaybillTpl",
                        HandlerCfg: "'Build'"
                    }
                ]
            }, {
                text: "Информация по перерасходу",
                iconCls: "icon-water--exclamation",
                Handler: "createView",
                HandlerCfg: "{xtype:'view.info.driverfuelexcess',single:true}"

            },
             {
                 text: 'Реестр заказ-нарядов',
                 iconCls: 'icon-blue-document-word',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.report.orderregister',single:true}"
             },
             {
                 text: 'Заправка',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.acc.accrefuelling',single:true}"

             }
        ]
    }, {
        text: 'Лимиты',
        iconCls: 'icon-cog_error32',
        Child: [
            {
                text: 'Лимиты на пробег легкового транспорта',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.limit.vehiclekmlimits',single:true}"
            }, {
                text: 'Лимиты на выдачу топлива',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.limit.vehiclefuellimits',single:true}"
            },
            {
                text: 'Отчёты',
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Отчёт по лимитам легкового транспорта Нафтан-Спецтранс',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.nstcarlimit',single:true}"
                    },
                    {
                        text: 'Отчёт по лимитам транспорта Нафтан-Спецтранс по подразделениям',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.nstcostlimit',single:true}"
                    },
                     {
                         text: 'Детализация использования транспорта Нафтан-Спецтранс',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.nstlimitdetails',single:true}"
                     },
                    {
                        text: 'Детализация использования транспорта Нафтан-Спецтранс (по датам)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.nstlimitdetailsbydate',single:true}"
                    },
                     {
                         text: 'Детализация использования транспорта Нафтан-Спецтранс + Заказчик нафтана',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.nstlimitdetailswithcustomer',single:true}"
                     },
                     {
                         text: 'Общий отчёт по использованию транспорта Нафтан-Спецтранс',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.nstalllimit',single:true}"
                     },
                     {
                         text: 'Отчёт об использовании пассажирского транспорта Нафтан-Спецтранс',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.nstcarwork',single:true}"
                     },
                    {
                        text: 'Отчёт об использовании пассажирского транспорта Нафтан-Спецтранс (по подразделениям)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.nstcarworkbydepartment',single:true}"
                    },
                    {
                        text: 'Детализация использования легкового транспорта Нафтан-Спецтранс',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.nstcarworkdetails',single:true}"
                    },
                     {
                         text: 'Детализация использования транспорта Нафтан-Спецтранс по гаражному номеру' ,
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.nstworkdetailsbygaragenumber',single:true}"
                     },
                     {
                         text: 'Детализация использования транспорта Нафтан-Спецтранс по типу ТС',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.nstworkdetails',single:true}"
                     }
                ]
            }
        ]
    }, {
        text: 'Материалы',
        permission: {
            u: [1, 29, 22, 4, 61, 53,69,44,146,151,168]
        },
        iconCls: 'icon-layers32',
        Child: [
            {
                text: 'Шины',
                iconCls: 'icon-tire',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.tire',single:true}"
            }, {
                text: 'Производители Шин',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.tiremaker',single:true}"
            }, {
                text: 'Модели шин',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.tiremodel',single:true}"
            }, {
                text: 'Причины снятия шин',
                iconCls: 'icon-table',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.tireremovereason',single:true}"
            },
        {
            text: 'Тех. состояния шин',
            iconCls: 'icon-table',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.tiretechstate',single:true}"
        },
        {
            text: 'Сезонная замена',
            iconCls: 'icon-table',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.tireseasonreplace',single:true}"
        },
            {
                text: 'Отчёты',
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Общий список шин',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.tirelist',single:true}"
                    }, {
                        text: 'Cписок шин, отработавших нормативый срок',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.tirewarrantlyend',single:true}"
                    }, {
                        text: 'Cписок шин, снятых с ТС',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.tireremove',single:true}"
                    }
                ]
            }, '-', {
                text: 'АКБ',
                iconCls: 'icon-battery',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.battery',single:true}"
            }, {
                text: 'Производители АКБ',
                iconCls: 'icon-table',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.batterymaker',single:true}"
            }, {
                text: 'Типы АКБ',
                iconCls: 'icon-table',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.batterytype',single:true}"
            }, {
                text: 'Причины снятия АКБ',
                iconCls: 'icon-table',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.batteryremovereason',single:true}"
            },
            {
                text: 'Тех. состояния АКБ',
                iconCls: 'icon-table',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.batterytechstate',single:true}"
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
                    }, {
                        text: 'Cписок АКБ, отработавших гарантийный срок',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.batterywarrantlyend',single:true}"
                    }, {
                        text: 'Cписок АКБ, снятых с ТС',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.batteryremove',single:true}"
                    }
                ]
            }
        ]
    }, {
        text: "Заявки",
       
        iconCls: "icon-page_gear32",
        Handler: null,
        HandlerCfg: null,
        Child: [
            {
                text: 'Список лиц для утверждения заявок',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.requestapprover',single:true}",
                iconCls: 'icon-reseller_programm'
            },  {
                text: 'Журнал заявок',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.requestmagazine',single:true}",
                iconCls: 'icon-page_copy'
            }, {
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
    }, {
        text: 'Отчёты',
        iconCls: 'icon-report32',
        Child: [
            {
                text: 'Акт снятия остатков',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.fuelremain',single:true}"
            }, {
                text: 'Остатки по Гар.№',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.vehiclefuelremainsbygaragenumber',single:true}"
            },  {
                text: 'Информация по заправке',
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Информация по заправке',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.refuellinginfo',single:true}"
                    }, {
                        text: 'Информация по заправке на дату и время',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.refuellinginfodatetime',single:true}"
                    }, {
                        text: 'Информация по заправке гаражного номера',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.refuellingreoillinginfovehicle',single:true}"
                    }, {
                        text: 'Информация по заправке(РЦП АЗС)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.rcpasz',single:true}"
                    },
                    {
                        text: 'Информация по заправке гаражного номера(маршрут)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclerefuelling',single:true}"
                    }
                ]
            },
            {
                text: 'Пробеги',
                iconCls: 'icon-report-white',
                Child: [
                     {
                         text: 'Пробег транспорта',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.vehiclerun',single:true}"
                     }, {
                         text: 'Пробег транспорта (ежедневный)',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.vehiclerundetails',single:true}"
                     }, {
                         text: 'Пробег лекговых автомобилей (ежедневный)',
                         iconCls: 'icon-blue-document-word',
                         Handler: 'createView',
                         HandlerCfg: "{xtype:'view.report.runbyday',single:true}"
                     }
                ]
            },
            {
                text: 'Реестры путевых листов',
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Реестр по Полимиру(78011200)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expense78',single:true}"
                    }, {
                        text: 'Реестр по Полимиру(78011200) сводный',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expense78summ',single:true}"
                    }, {
                        text: 'Реестр по Полимиру(78011200) цеховые',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expense78department',single:true}"
                    }, {
                        text: 'Реестр по сторонним(90)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expense90',single:true}"
                    }, {
                        text: 'Реестр по сторонним(90) цеховые',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expense90department',single:true}"
                    }, 
                    {
                        text: 'Реестр по Нафтану',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expensenaftan',single:true}"
                    },
                    {
                        text: 'Реестр по коду затрат',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expensecode',single:true}"
                    }, {
                        text: 'Реестр по коду затрат(+ водители)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expensecodedriver',single:true}"
                    }, {
                        text: 'Затраты по заказчику',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expensecustomer',single:true}"
                    }, {
                        text: 'Затраты по автомобилю',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expensevehicle',single:true}"
                    }, {
                        text: 'Реестр по пригнанным автомобилям',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expenseunknown',single:true}"
                    }
                ]
            },
            {
                text: 'Ведомости по бухгалтерии',
                iconCls: 'icon-report-white',
                Child: [
                   {
                       text: 'Оборотная ведомость',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.accfuelobreport',single:true}"
                   }, {
                       text: 'Оборотная ведомость(детализация)',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.accvehicleobreport',single:true}"
                   },
                   {
                       text: 'Накопительная ведомость',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.expenselist',single:true}"
                   },
                    {
                        text: 'Накопительная ведомость по видам топлива',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expenselistbyfuel',single:true}"
                    },

                    {
                       text: 'Накопительная ведомость(цеховые)',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.expenselistdepartment',single:true}"
                   }, {
                       text: 'Накопительная ведомость(Группы по услугам)',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.expenselistbygroup',single:true}"
                   },
                    {
                        text: 'Накопительная ведомость(количество транспорта)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.expenselistvehiclecount',single:true}"
                    }
                ]
            },
            
             {
                text: 'Статистика',
                iconCls: 'icon-report-white',
                Child: [
                   {
                       text: 'Информация 12-тр',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.12trinfo',single:true}"
                   }, {
                       text: 'Информация 12-тр (Дни в работе)',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.12trdaycount',single:true}"
                   },
                   {
                       text: 'Информация 12-тр (Спецтранс)',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.12trinfospectrans',single:true}"
                   },
                    {
                        text: 'Информация 12-тр (Дни в работе)(Спецтранс)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.12trdaycountspectrans',single:true}"
                    },
                    {
                       text: 'Информация 4-тр',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.4trinfo',single:true}"
                   }
                ]
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
                        text: 'Список транспорта по колоннам',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclelistbycolumn',single:true}"
                    },


                {
                    
                    text: 'Список транспорта(по группам)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleworklist',single:true}"
                    },
                {
                    text: 'Список легкового транспорта(баллансовая стоимость)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.carballancecost',single:true}"

                    },
                {
                 
                        text: 'Ввод/списание легкового транспорта',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.carinputout',single:true}"
                    
                },

                    
                     {
                        text: 'Список транспорта (водители, нормы)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleinfo',single:true}"
                    }, {
                        text: 'Список транспорта (по группам)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleinfobygroup',single:true}"
                    }, {
                        text: 'Список неиспользуемого транспорта',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclenotusing',single:true}"
                    }, {
                        text: 'Список безномерного транспорта',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclesbyregistrationnumber',single:true}"
                    }, {
                        text: 'Количество транспорта по группам заправки',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclebyrefuellinggroup',single:true}"
                    }, {
                        text: ' Сведения о транспорте юридического лица',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclecountinfo',single:true}"
                    }, {
                        text: ' Сведения о транспорте юридического лица (детализация)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclecountinfodetails',single:true}"

                    }, {
                        text: 'Группировка ТС в соответствии с технико-эксплуатационными характеристиками',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclegroupaccinfo',single:true}"

                    }, {
                        text: 'Список транспорта (группы по услугам)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleservicegroup',single:true}"
                    }, {
                        text: 'Список транспорта (группы для отчёта)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclebyreportgroup',single:true}"
                    },
                    {
                        text: 'Информация по легковому транспорту',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.carinfo',single:true}"
                    },
                    {
                        text: 'Количество транспорта в разрезе групп по услугам',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclecountbyservicegroup',single:true}"
                    }

                ]
            }, {
                text: 'Список норм',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.vehiclenorms',single:true}"
            }, {
                text: 'Список норм по маслам',
                iconCls: 'icon-blue-document-word',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.oilnorms',single:true}"
            }, {
                text: 'Отчёты по транспорту',
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Работа транспорта',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclework',single:true}"
                    },
                    {
                        text: 'Работа транспорта по подразделениям',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleworkbydepartment',single:true}"
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
                    }, {
                        text: 'Суммарная информация о работе транспорта за период',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleworksummary',single:true}"
                    }, {
                        text: 'Работа транспорта (ежедневная)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicledaywork',single:true}"
                    },
                    {
                        text: 'Работа транспорта (по заказчикам)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.customerworkinfo',single:true}"
                    },
                    {
                        text: 'Работа транспорта (по пачке п.л.)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.packageworkinfo',single:true}"
                    },
                    {
                        text: 'Движение топлива (по пачке п.л.)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.packagefuelinfo',single:true}"
                    },
                    
                {
                    text: 'Работа транспорта за период по гаражным номерам',
                    iconCls: 'icon-blue-document-word',
                    Handler: 'createView',
                    HandlerCfg: "{xtype:'view.report.vehicleswork',single:true}"
                },
                    {
                        text: 'Работа транспорта (с начала эксплуатации)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleworkfromstart',single:true}"
                    },
                    {
                        text: 'Пробег транспорта за год',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleyearrun',single:true}"
                    },
                    {
                        text: 'Информация по экономии/перерасходу',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclefuelconsumptionfactnorm',single:true}"
                    },
                    {
                        text: 'Расход топлива за квартал',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.transportquarterconsumption',single:true}"
                    },
                    {
                        text: 'Расход топлива легкового транспорта за год',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.caryearconsumption',single:true}"
                    },
                    {
                        text: 'Расход топлива легкового транспорта за период',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.carmonthconsumption',single:true}"
                    },
                    {
                        text: 'Расход топлива по подразделениям',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehiclefuelconsumption',single:true}"
                    },
                     {
                        text: 'Дни в работе (с начала эксплуатации)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleworkingtimefromstart',single:true}"
                    },
                    {
                        text: 'Дни в работе (за период)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleworktimeperiod',single:true}"
                    },
                    {
                        text: 'Информация по перевозке груза',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.cargoinfo',single:true}"
                    }, {
                        text: 'Средний пробег за период',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.averageconsumption',single:true}"
                    },
                    {
                        text: 'Время в наряде',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.nstworkingtime',single:true}"
                    }
                    
                ]
            }, {
                text: 'Отчёты по водителям',
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Ведомость учёта отработанного времени по п.л. (время в наряде)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.driverworkingtimebycustomer',single:true}"
                    },
                    {
                        text: 'Ведомость учёта отработанного времени по п.л.',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.driverworkingtime',single:true}"
                    }, {
                        text: 'Работа водителей',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.driverwork',single:true}"
                    }, {
                        text: 'Список водителей экспедиторов',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.forwarddrivers',single:true}"
                    }, {
                        text: 'Водители в коммандировке',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.driversbusinesstrip',single:true}"
                    },
                    {
                        text: 'Работа в выходные и праздничные дни',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.driversholidaywork',single:true}"
                    },
                    {
                        text:'Информация о перерасходе(экономии) топлива',
                         iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.driverfuelconsumptionfactnorm',single:true}"
                    }
                ]
            }, {
                text: 'Инвентаризация',
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Комиссия',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.inventorycomission',single:true}"
                    }, {
                        text: 'Описи',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.inventory',single:true}"
                    }, {
                        text: 'Расхождения с бухгалтерией',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.inventorydiff',single:true}"
                    }
                ]
            }, {
                text: 'Количество путевых листов по колоннам',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.waybillcount',single:true}"
            },
            {
                text: 'Количество путевых листов по заказчикам',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.waybillcountbycustomer',single:true}"
            },
            {
                text: 'Стоимость услуг, оказанных сторонним организациям',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.ordersuminfo',single:true}"
            },
            {
                text: 'Услуги сторонним организациям за год в разрезе заказчика',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.servicewaybillsbyyear',single:true}"
            },
            {
                text: 'Заправка по малой механизации',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.smallmechrefuelling',single:true}"
            },

            {
                text: 'Показатели работы транспорта',
                iconCls: 'icon-report-white',
                Child: [
                   {
                       text: 'Коэффициент выхода транспорта на линию',
                       iconCls: 'icon-blue-document-word',
                       Handler: 'createView',
                       HandlerCfg: "{xtype:'view.report.vehicleworkkoefficient',single:true}"
                   },
                    {
                        text: 'Коэффициент использования грузового транспорта',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.truckeffiency',single:true}"
                    }, {
                        text: 'Коэффициент технической готовности',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.technicalcoefficient',single:true}"
                    },
                    {
                        text: 'Коэффициент использования рабочего времени',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.workcoefficient',single:true}"
                    },
                    {
                        text: 'Общий отчёт',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleperformance',single:true}"
                    },
                    {
                        text: 'Общий отчёт (бизнес план)',
                        iconCls: 'icon-blue-document-word',
                        Handler: 'createView',
                        HandlerCfg: "{xtype:'view.report.vehicleperformancebusinessplan',single:true}"
                    }   

                ]
                },
                 {
                text: 'Проверка актов выполненных работ с путевыми листами',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.servicecounteragentcheck',single:true}"
            }, {
             text: 'Проверка заказов по услугам с путевыми листами',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.serviceemployeecheck',single:true}"
            },
            {
                text: 'Время в наряде по путевым листам (для проверки)',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.waybillcustomerworkingtimeInfo',single:true}"

            },
            {
                text: 'Движение ГСМ АЗС Полимир кг',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.azsfuelmoving',single:true}"
            },
            {
                text: 'Движение ГСМ АЗС Полимир л',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.azsfuelmovingext',single:true}"
            },
            {
                text: 'Хозрасчёт',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.servicecalculation',single:true}"
            },
            {
                text: 'Список путевых листов по заказчку',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.waybilllistbycustomer',single:true}"
            },
            {
                text: 'Объем работ по заказчкам',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.waybilllistcustomers',single:true}"
            },
            {
                text: 'Использование транспорта УП"Нафтан-Спецтранс',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.naftanspectransworkinfo',single:true}"
            },
             {
                 text: 'Количество документов по услугам УП"Нафтан-Спецтранс',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.report.servicewaybillcount',single:true}"
             }

        ]
    }, {
        text: "ТО",
        permission: {
            u: [1,168]
        },
        iconCls: "icon-setting_tools32",
        Handler: null,
        HandlerCfg: null,
        Child: [
            {
                text: 'Заявки на ТО',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.maintenancerequest',single:true}"
            }, {
                text: 'Контроль выхода транспорта на линию',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.inspection.vehicledayinspection',single:true}"
            }/*, {
                 text: 'Выдача масла',
                 iconCls: "icon-oiltank",
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.oilwork',single:true}"
            }, {
                text: 'Отчеты',
                Handler: null,
                HandlerCfg: null,
                iconCls: 'icon-report-white',
                Child: [
                    {
                        text: 'Отчёт о фактической замене масел и смазок',
                        Handler: null,
                        HandlerCfg: null,
                        iconCls: 'icon-report-white',
                        Child: [
                            {
                                text: 'Суммарный',
                                Handler: 'createView',
                                iconCls: 'icon-blue-document-word',
                                HandlerCfg: "{xtype:'view.report.reoillingfact',single:true}"
                            },
                            {
                                text: 'Детализированный',
                                Handler: 'createView',
                                iconCls: 'icon-blue-document-word',
                                HandlerCfg: "{xtype:'view.report.reoillingfactdetails',single:true}"
                            }
                        ]   
                    }
                    ,
                    {
                        text: 'Журнал оперативного учёта расхода масла',
                        Handler: 'createView',
                        iconCls: 'icon-blue-document-word',
                        HandlerCfg: "{xtype:'view.report.reoillingjournal',single:true}"
                    }
                ]
            }*/
        ]
    },
    {
        text: "Бухгалтерия",
        permission: {
            u: [1, 15, 16,67,106,111,74,168]
        },
        iconCls: "icon-coins32",
        Handler: null,
        HandlerCfg: null,
        Child: [
        {
            text: 'Закрытие месяца',
            Handler: 'createView',
            HandlerCfg: "{xtype:'view.acc.closemonth',single:true}"
        },
            {
                text: 'Рассчёт цен на топливо',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.acc.fuelcost',single:true}"
            }, {
                text: 'Проводки',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.acc.posting',single:true}"
            }, {
                text: 'Информация по двойным проводкам',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.report.doublepostinginfo',single:true}"
            }, {
                text: 'Перерасход топлива',
                Handler: 'createView',
                HandlerCfg: "{xtype:'view.acc.driverfuelexcess',single:true}"
            },
             {
                 text: 'Детализация перерасхода топлива за год',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.report.driverfuelexcessdetails',single:true}"
             },
             {
                 text: 'Заправка(РЦП АЗС)',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.acc.rcpazs',single:true}"
             }, {
                 text: 'Заправка',
                 Handler: 'createView',
                 HandlerCfg: "{xtype:'view.acc.accrefuelling',single:true}"

             }
        ]
    }
];