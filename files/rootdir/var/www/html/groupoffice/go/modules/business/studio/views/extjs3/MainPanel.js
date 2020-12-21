go.modules.business.studio.MainPanel = Ext.extend(go.modules.ModulePanel, {
	id: "studio",
	title: t("Group Office Studio"),
	layout: 'responsive',

	initComponent: function() {
		this.createStudioModuleGrid();
		this.sidePanel = new Ext.Panel({
			//layout: 'border',
			width: dp(300),
			cls: 'go-sidenav',
			region: 'west',
			split: true,
			autoScroll: true,
			items: [
				this.createFilterPanel()
			]
		});

		this.centerPanel = new Ext.Panel({
			region: 'center',
			layout: 'responsive',
			stateId: 'go-studio-west',
			split: true,
			width: dp(700),
			items: [
				this.studioModuleGrid,
				this.sidePanel
			]
		});

		this.items = [
			this.centerPanel
		]

		go.modules.business.studio.MainPanel.superclass.initComponent.call(this);

		this.on("render", function() {
			this.studioModuleGrid.store.load();
		}, this);
	},

	createFilterPanel: function() {
		/*
		var lockFilter = new go.NavMenu({
			store: new Ext.data.ArrayStore({
				fields: ['name', 'icon','inputValue'],
				data: [
					[t("Locked"), 'lock',true]
					]
			}),
			listeners: {
				selectionchange: function(view, nodes) {
					var fltr  = this.studioModuleGrid.store.getFilter('locked');
					if(Ext.isEmpty(fltr)) {
						this.studioModuleGrid.store.setFilter('locked', {locked: true});

					} else {
						this.studioModuleGrid.store.setFilter('locked', null);
						view.removeClass('x-view-selected'); //
					}
					this.studioModuleGrid.store.load();
				},
				scope: this
			}
		})*/
		return new Ext.Panel({
			//region: "center",
			minHeight: dp(200),
			autoScroll: true,
			tbar: [
				{
					xtype: 'tbtitle',
					text: t('Filters')
				},
				'->',
				{
					xtype: 'filteraddbutton',
					entity: 'Studio'
				}
			],
			items: [
				// lockFilter,
				{xtype: 'box', autoEl: 'hr'},
				{
					xtype: 'filtergrid',
					filterStore: this.studioModuleGrid.store,
					entity: "Studio"
				},
				{
					xtype: 'variablefilterpanel',
					filterStore: this.studioModuleGrid.store,
					entity: "Studio"
				}
			]
		});
	},

	createStudioModuleGrid: function() {
		this.studioModuleGrid = new go.modules.business.studio.StudioGrid({
			region: 'center',
			tbar: [
				'->',
				{
					xtype: 'tbsearch',
					fiters: [
						'name',
						'package'
					]
				},
				this.addButton = new Ext.Button({
					iconCls: 'ic-add',
					tooltip: t('Add'),
					cls: 'primary',
					handler: function(btn) {
						var wzdForm = new go.modules.business.studio.CreateModuleDialog();
						wzdForm.show();
					},
					scope: this
				})/*, // For now, we entirely remove the unlock and delete buttons. The unlock is unwanted, the delete not implemented
				{
					iconCls: 'ic-more-vert',
					menu: [{
						itemId: 'delete',
						iconCls: 'ic-delete',
						text: t("Delete"),
						disabled: true, // for now
						handler: function(btn,e) {
							var records = this.studioModuleGrid.getSelectionModel().getSelections();
							if(records.length === 0) {
								return;
							}
							for (var ii=0,il=records.length;ii<il;ii++) {
								var record = records[ii];
								if(record.data.locked) {
									continue;
								}
								Ext.MessageBox.confirm(
									t("Studio"),
									t("If you remove this record, you will uninstall the module and remove any generated and/or edited code. Do you really wish to remove the selected module?"),
									function(btn){
										if(btn !== 'yes') {
											return;
										}
										this.studioModuleGrid.deleteSelected();
									}
								);

							}
						},
						scope: this
					},
						{
							itemId: 'unlock',
							iconCls: "ic-lock-open",
							text: t("Unlock"),
							disabled: false,
							handler: function(btn, e) {
								var records = this.studioModuleGrid.getSelectionModel().getSelections();
								if(records.length === 0) {
									return;
								}
								for (var ii=0,il=records.length;ii<il;ii++) {
									var r = records[ii].data;
									if (r.locked) {
										var rec = this.studioModuleGrid.store.getById(r.id);
										rec.set('locked',false);
										rec.commit();
									}
								}
								this.studioModuleGrid.store.save();
							},
							scope: this
						}]
			}*/],
			listeners: {
				rowdblclick: this.onGridDblClick,
				scope:this,
				keypress: this.onGridKeyPress
		}
		});
		return this.studioModuleGrid;
	},

	onGridDblClick: function(grid, rowIndex, e) {
		this.preOpenModuleWizard(grid.getStore().getAt(rowIndex));
	},

	onGridKeyPress: function(e) {
		if (e.keyCode != e.ENTER) {
			return;
		}
		this.preOpenModuleWizard(this.studioModuleGrid.getSelectionModel().getSelected());
	},
	preOpenModuleWizard: function (record) {
		if (!record || record.get('permissionLevel') < go.permissionLevels.write) {
			return;
		}
		// var me = this;
		// if (record.data.locked) {
		// 	Ext.MessageBox.confirm(t('Locked'), t('This module was locked. Are you sure that you wish to unlock your module and overwrite your module code?'),
		// 		function (btn) {
		// 			if (btn === "yes") {
		// 				go.Db.store("Studio").save({'locked': false}, record.data.id).then(function (result) {
		// 					me.openModuleWizard(record);
		// 				})
		// 			}
		// 		}).setIcon(Ext.MessageBox.WARNING);
		// 	return;
		// } else
		if (!record.data.module.enabled) {
			Ext.MessageBox.alert(t('Disabled'), t('The module appears to be inactive. Please activate the module in system settings,'),
				function () {
					go.Router.setPath('systemsettings');
					window.location.reload(false);
				});
			return;
		}
		this.openModuleWizard(record);
	},
	openModuleWizard: function (record) {
		var module_id = record.data.module.id;
		go.Db.store("Module").single(module_id).then(function (result) {
			var wzd = new go.modules.business.studio.StudioWizard({
				studio_id: record.id,
				module_id: module_id,
				data: result
			});
			wzd.show();
		});
	}
});
