T.view.vehicleDistribution.DistributionAddWindow = Ext.extend(Ext.Window, {

    initComponent: function () {

        this.addEvents("vehicleadd");

        Ext.apply(this, {
            constrain: true,
            modal: true,
            width: 400,
            height: 'auto',
            layout: {
                type: 'form',
                padding: '2'
            },
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: "combo.car2",
                    fieldLabel: 'Авто',
                    dataIndex: 'Vehicle'
                },
                {
                    xtype: "combo.grouprequest",
                    fieldLabel: 'Группа',
                    dataIndex: 'GroupRequest'
                }
            ],
            bbar: [
                '->',
                {
                    xtype: 'button.add',
                    handler: function () {
                        var o = {};
                        var v = this.items.each(function (i) {
                            o[i.dataIndex] = i.getValue();
                        });

                        if (o.Vehicle && o.GroupRequest) {
                            this.fireEvent("vehicleadd", o);
                        }

                    },
                    scope: this
                }
            ]
        });
            T.view.vehicleDistribution.DistributionAddWindow.superclass.initComponent.call(this);

    }


    });

    Ext.reg("view.distributionaddwindow", T.view.vehicleDistribution.DistributionAddWindow); 