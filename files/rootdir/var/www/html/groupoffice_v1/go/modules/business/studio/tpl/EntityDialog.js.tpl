{namespace}.{entityName}Dialog = Ext.extend(go.form.Dialog, {
	stateId: '{moduleName}-{entityName}Form',
	title: t("{entityName}"),
	entityStore: "{entityName}",
	width: dp(800),
	height: dp(800),
	maximizable: true,
	collapsible: true,
	modal: false,

	initFormItems: function () {
		if({namespace}.ModuleConfig.entityOptions.isAclEntity) {
			this.addPanel(new go.permissions.SharePanel());
		}
		return [];
	},
	onLoad : function(entityValues) {
		this.supr().onLoad.call(this, entityValues);
	}
});
