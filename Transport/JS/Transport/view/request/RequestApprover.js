T.view.RequestApprover = Ext.extend(Kdn.view.BaseGrid, {
    modelName: 'RequestApprover',

    constructor: function(cfg) {
        cfg = cfg || {};

        Ext.apply(cfg, {
            store: new Ext.data.Store(),
            colModel: new Ext.grid.ColumnModel({
                defaults: {
                    filter: {}
                },
                columns: [
                    new Ext.grid.RowNumberer({ width: 40 }),
                    {
                        dataIndex: 'Employee',
                        header: 'Работник',
                        hidden: true,
                        hideable: false,
                        editor: {
                            xtype: 'combo.employee',
                            allowBlank: false
                        }
                    },
                    {
                        dataIndex: 'Employee.EmployeeId',
                        xtype: 'mappingcolumn',
                        header: 'Код работника',
                        width: 100
                    },
                    {
                        dataIndex: 'Employee.Department',
                        xtype: 'mappingcolumn',
                        header: 'Цех/Пр-во',
                        width: 100
                    },
                    {
                        dataIndex: 'Employee.EmployeeNumber',
                        xtype: 'mappingcolumn',
                        header: 'Таб. №',
                        width: 70
                    },
                    {
                        dataIndex: 'Employee.LastName',
                        xtype: 'mappingcolumn',
                        header: 'Фамилия',
                        width: 120
                    },
                    {
                        dataIndex: 'Employee.FirstName',
                        xtype: 'mappingcolumn',
                        header: 'Имя',
                        width: 120
                    },
                    {
                        dataIndex: 'Employee.MiddleName',
                        xtype: 'mappingcolumn',
                        header: 'Отчество',
                        width: 120
                    },
                    {
                        dataIndex: 'Employee.Office',
                        xtype: 'mappingcolumn',
                        header: 'Должность',
                        width: 300
                    }
                ]
            })
        });


        T.view.RequestApprover.superclass.constructor.call(this, cfg);
    },

    __getTbar: function() {
        var tbar = T.view.RequestApprover.superclass._getTbar.call();
        return tbar.concat([
            "->",
            "-",
            {
                text: "Отправить всем электронное письмо",
                iconCls: "icon-mails-stack",
                handler: function () {
                    var me = this;
                    Kdn.Direct.MailToApprover({}, function (e) {
                        me.sendEmails(e.join(";"));
                    })
                },
                scope: this
            },
            "-"
        ]);

    },


    sendEmails: function (emails) {
        var me = this;    
        var timeout = 3000;
        var mailtoPrefix = 'mailto:?cc=';
        var maxUrlCharacters = 1900;
        var separator = ';';
        var currentIndex = 0;
        var nextIndex = 0;

        if (emails.length < maxUrlCharacters) {
            window.location = mailtoPrefix + emails;
            return;
        }

        do {
            currentIndex = nextIndex;
            nextIndex = emails.indexOf(separator, currentIndex + 1);
        } while (nextIndex != -1 && nextIndex < maxUrlCharacters)

        if (currentIndex == -1) {
            window.location = mailtoPrefix + emails;
        } else {
            window.location = mailtoPrefix + emails.slice(0, currentIndex);
            setTimeout(function () {
                var m = emails.slice(currentIndex + 1);
                me.sendEmails(m);
            }, timeout);
        }
    }

});

Ext.reg('view.requestapprover', T.view.RequestApprover);