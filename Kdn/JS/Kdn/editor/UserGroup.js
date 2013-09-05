Kdn.editor.UserGroup = Ext.extend(Ext.net.MultiCombo, {
    initComponent:function(){
        Ext.apply(this, {
            displayField: 'UserGroupName',
            valueField: 'UserGroupId',
            triggerAction: 'all',
            mode: 'local',
            store:Kdn.ModelFactory.getStore('UserGroup')
        });
        Kdn.editor.UserGroup.superclass.initComponent.call(this);
    }
});
Ext.reg('kdn.editor.usergroup', Kdn.editor.UserGroup);