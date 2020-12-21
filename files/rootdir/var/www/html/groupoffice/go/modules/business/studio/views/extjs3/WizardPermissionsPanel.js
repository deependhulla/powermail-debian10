go.modules.business.studio.WizardPermissionsPanel = Ext.extend(Ext.Panel, {
	stateful: false,
	stateId: 'studio-permissions',

	initComponent: function() {
		var levelLabels = {};
		levelLabels[go.permissionLevels.read] = t("Use", "users");
		levelLabels[go.permissionLevels.manage] = t("Manage", "users");

		Ext.apply(this, {
			autoScroll: true,
			layout: 'fit',
			items: [this.permissionsTab = new go.permissions.SharePanel({
				title: null,
				hideLabel: true,
				levels: [
					go.permissionLevels.read,
					go.permissionLevels.manage
				],
				levelLabels: levelLabels
			})]
		});

		go.modules.business.studio.WizardPermissionsPanel.superclass.initComponent.call(this);

	},

	show: function() {
		this.setTitle(t("Permissions") + ' ' + t("For").toLowerCase() + ' ' + this.data.name);
		go.modules.business.studio.WizardPermissionsPanel.superclass.show.call(this);
		this.permissionsTab.setValue(this.data.acl);

	}
});