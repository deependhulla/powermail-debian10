go.groups.GroupDialog = Ext.extend(go.form.Dialog, {
	title: t('Group'),
	entityStore: "Group",
	height: dp(800),
	width: dp(1000),
	formPanelLayout: "border",

	initComponent: function() {
		this.supr().initComponent.call(this);

		this.on('show', function() {
			if(!this.currentId) {
				//needed to load the grid.
				this.groupUserGrid.setValue([]);
			} else if(this.currentId == 2) { //group everyone
				this.groupUserGrid.setDisabled(true);
				this.groupUserGrid.hide();
			}
		}, this);

		this.formPanel.on("beforesetvalues", function(form, values) {

		}, this);
	},

	initFormItems: function () {

		this.addPanel(new go.permissions.SharePanel());
		this.addPanel(new go.groups.GroupModuleGrid());
		
		return [{
				region: "north",
				autoHeight: true,
				xtype: 'fieldset',
				items: [
					{
						xtype: 'textfield',
						name: 'name',
						fieldLabel: t("Name"),
						anchor: '100%',						
						allowBlank: false
					}]
			},
			this.groupUserGrid = new go.groups.GroupUserGrid({
				//anchor: '100% -' + dp(64),
				region: "center",
				hideLabel: true,
				value: []
			})
		];
	}
});

