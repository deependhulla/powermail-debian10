/**
* Copyright Intermesh
*
* This file is part of Group-Office. You should have received a copy of the
* Group-Office license along with Group-Office. See the file /LICENSE.TXT
*
* If you have questions write an e-mail to info@intermesh.nl
*
* @copyright Copyright Intermesh
* @author {authorName} <{email}>
*/

{namespace}.MainPanel = Ext.extend(go.modules.ModulePanel,
{
	id: "{moduleName}",
	title: t("{moduleTitle}"),
	layout: 'responsive',
	layoutConfig: {
		triggerWidth: 1000
	},
	frontendConfig: {},

	initComponent: function () {
		this.frontendConfig = {namespace}.ModuleConfig.frontendOptions;
		this.create{entityName}Grid();

		this.{entityName}Detail = new {namespace}.{entityName}Detail({
			region: 'center',
			split: true,
			tbar: [{
					cls: 'go-narrow', //will only show on small devices
					iconCls: "ic-arrow-back",
					tooltip: t("{moduleTitle}"),
					handler: function () {
						this.westPanel.show();
						go.Router.goto("{moduleName}");
					},
					scope: this
				}]
		});

		this.sidePanel = new Ext.Panel({
			layout: 'anchor',
			defaults: {
				anchor: "100%"
			},
			width: dp(300),
			cls: 'go-sidenav',
			region: "west",
			split: true,
			hidden: true,
			autoScroll: true,
			items: [
				this.createFilterPanel()
			]
		});

		this.westPanel = new Ext.Panel({
			region: "west",
			layout: "responsive",
			stateId: "go-{moduleName}-west",
			split: true,
			width: dp(700),
			narrowWidth: dp(400), //this will only work for panels inside another panel with layout=responsive. Not ideal but at the moment the only way I could make it work
			items: [
				this.{entityName}Grid, //first is default in narrow mode
				this.sidePanel
			]
		});

		this.items = [
			this.westPanel //first is default in narrow mode
		];
		if(this.frontendConfig.showDetailPanel) {
			this.items.push(this.{entityName}Detail);
		}
		if(this.frontendConfig.showFilter) {
			this.sidePanel.show()
		}

		{namespace}.MainPanel.superclass.initComponent.call(this);

		//use viewready so load mask can show
		this.{entityName}Grid.on("viewready", this.runModule, this);
	},
	runModule: function () {
		this.{entityName}Grid.store.load();
	},

	createFilterPanel: function () {
		return new Ext.Panel({
			region: "center",
			minHeight: dp(200),
			autoScroll: true,
			tbar: [{
				xtype: 'tbtitle',
				text: t("Filters")
			},
			'->',
			{
				xtype: 'filteraddbutton',
				entity: '{entityName}'
			},{
				cls: 'go-narrow',
				iconCls: "ic-arrow-forward",
				tooltip: t("{moduleTitle}"),
				handler: function () {
					this.{entityName}Grid.show();
					go.Router.goto("{moduleName}");
				},
				scope: this
			}],
			items: [
				this.filterGrid = new go.filter.FilterGrid({
					filterStore: this.{entityName}Grid.store,
					entity: "{entityName}"
				}),{
					xtype: 'variablefilterpanel',
					filterStore: this.{entityName}Grid.store,
					entity: "{entityName}"
				}
			]
		});
	},
	create{entityName}Grid: function () {
		this.{entityName}Grid = new {namespace}.{entityName}Grid({
		region: 'center',
		multiSelectToolbarItems: [
		{
			hidden: go.customfields.CustomFields.getFieldSets('{entityName}').length == 0,
			iconCls: 'ic-edit',
			tooltip: t("Batch edit"),
			handler: function() {
				var dlg = new go.form.BatchEditDialog({
					entityStore: "{entityName}"
				});
				dlg.setIds(this.{entityName}Grid.getSelectionModel().getSelections().column('id')).show();
			},
			scope: this
		}
		],
		tbar: [{
			cls: 'go-narrow', //Shows on mobile only
			iconCls: "ic-menu",
			handler: function () {
			this.sidePanel.show();
		},
		scope: this
	    },
	    '->',
	    {
		    xtype: 'tbsearch',
		    hidden: !this.frontendConfig.showSearchBar
		},
		this.addButton = new Ext.Button({
			iconCls: 'ic-add',
			tooltip: t('Add'),
			disabled: !go.Modules.isAvailable("{packageName}","{moduleName}",go.permissionLevels.manage),
			cls: "primary",
			handler: function (btn) {
				var {entityName}Form = new {namespace}.{entityName}Dialog();
				{entityName}Form.show();
			},
			scope: this
	    }),
	    this.moreBtn = new Ext.Button({
			iconCls: 'ic-more-vert',
	            menu: [{
	                itemId: "delete",
	                iconCls: 'ic-delete',
	                text: t("Delete"),
					disabled: !go.Modules.isAvailable("{packageName}","{moduleName}",go.permissionLevels.manage),
	                handler: function () {
	                    this.{entityName}Grid.deleteSelected();
					},
					scope: this
				}]
			})],
			listeners: {
				rowdblclick: this.onGridDblClick,
				scope: this,
				keypress: this.onGridKeyPress
			}
		});

		this.{entityName}Grid.on('navigate', function (grid, rowIndex, record) {
			go.Router.goto("{entityName}/" + record.id);
		}, this);
		if(this.frontendConfig.enableCSV) {
			this.moreBtn.menu.add('-',{
				iconCls: 'ic-cloud-upload',
				text: t("Import"),
				handler: function() {
					go.util.importFile(
						'{entityName}',
						'.csv',
						{},
						{}
					);
				},
				scope: this
			},{
				iconCls: 'ic-cloud-download',
				text: t("Export"),
				handler: function() {
					go.util.exportToFile(
						'{entityName}',
						Object.assign(go.util.clone(this.{entityName}Grid.store.baseParams), this.{entityName}Grid.store.lastOptions.params, {limit: 0, position: 0}),
						'csv');
				},
				scope: this
			});
		}

			return this.{entityName}Grid;
		},
		onGridDblClick: function (grid, rowIndex, e) {
			var record = grid.getStore().getAt(rowIndex);
			if (record.get('permissionLevel') < go.permissionLevels.write) {
				return;
			}

		    var dlg = new {namespace}.{entityName}Dialog();
		    dlg.load(record.id).show();
		},

		onGridKeyPress: function (e) {
		if (e.keyCode != e.ENTER) {
			return;
		}
		var record = this.{entityName}Grid.getSelectionModel().getSelected();
		if (!record) {
			return;
		}

		if (record.get('permissionLevel') < go.permissionLevels.write) {
			return;
		}

		var dlg = new {namespace}.{entityName}Dialog();
		dlg.load(record.id).show();
	}
});
