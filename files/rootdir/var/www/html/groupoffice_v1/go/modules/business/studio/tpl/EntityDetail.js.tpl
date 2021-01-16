{namespace}.{entityName}Detail = Ext.extend(go.detail.Panel, {
	entityStore: "{entityName}",
	stateId: 'no-{entityName}-detail',

	initComponent: function () {
		this.frontendConfig = {namespace}.ModuleConfig.frontendOptions;

		this.tbar = this.initToolbar();

//		Ext.apply(this, {
//			items: [{
//				title: t("{entityName}"),
//				onLoad: function (detailView) {
//					this.setTitle(detailView.data.name);
//				},
//				tpl: "<div class='pad go-html-formatted'>{description}</div>"
//			}]
//		});

		{namespace}.{entityName}Detail.superclass.initComponent.call(this);

		this.addCustomFields();

		if(this.frontendConfig.showLinks) {
			this.addLinks();
		}
		if(this.frontendConfig.showComments) {
			this.addComments();
		}
		if(this.frontendConfig.showFileUploads) {
			this.addFiles();
		}
		if(this.frontendConfig.showModifyPanel) {
			this.add(new go.detail.CreateModifyPanel());
		}
	},


	onLoad: function () {
		this.getTopToolbar().getComponent("edit").setDisabled(this.data.permissionLevel < go.permissionLevels.write);
		this.deleteItem.setDisabled(this.data.permissionLevel < go.permissionLevels.writeAndDelete);

		{namespace}.{entityName}Detail.superclass.onLoad.call(this);
	},

	initToolbar: function () {
		var items = this.tbar || [];
		items = items.concat([
			'->',
			{
				itemId: "edit",
				iconCls: 'ic-edit',
				tooltip: t("Edit"),
				handler: function (btn, e) {
					var editDlg = new {namespace}.{entityName}Dialog();
					editDlg.load(this.data.id).show();
				},
				scope: this
			},

			this.moreMenu = {
				iconCls: 'ic-more-vert',
				menu: [{
				iconCls: "btn-print",
				text: t("Print"),
				handler: function () {
					this.body.print({title: this.data.name});
				},
				scope: this
			},
			"-",
			this.deleteItem = new Ext.menu.Item({
				itemId: "delete",
				iconCls: 'ic-delete',
				text: t("Delete"),
				handler: function () {
					Ext.MessageBox.confirm(t("Confirm delete"), t("Are you sure you want to delete this item?"), function (btn) {
						if (btn !== "yes") {
						return;
					}
					this.entityStore.set({destroy: [this.currentId]});
				}, this);
				},
				scope: this
			})
		]
		}]);
		if(this.frontendConfig.showLinks) {
			items.splice(3, 0, new go.detail.addButton({
				detailView: this
			}), {xtype: "linkbrowserbutton"});
		}

		if(this.frontendConfig.showFileUploads && go.Modules.isAvailable("legacy", "files")) {
			items.splice(items.length - 1, 0,{
				xtype: "detailfilebrowserbutton"
			});
		}

		var tbarCfg = {
			disabled: true,
			items: items
		};
		return new Ext.Toolbar(tbarCfg);
	}
});
