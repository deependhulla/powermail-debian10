GO.projects2.MainPanel = function (config) {

	if (!config)
	{
		config = {};
	}

	config.id = config.id || Ext.id();


	/**
	 * This ar the template jobs types !!!
	 */
	var data = [['project', t("Project", "projects2")], ['job', t("Job", "projects2")]];
	if (go.Modules.isAvailable("legacy", "tasks"))
	{
		data.push(['task', t("Task", "tasks")]);
	}


	GO.projects2.templateJobTypesStore = new Ext.data.SimpleStore({
		fields: ['value', 'text'],
		data: data
	});

	this.treePanel = new GO.projects2.ProjectsTree({
		//		title:t("Projects", "projects2"),
		split: true,
		autoScroll: true,
		region:"center"
	});

	this.treePanel.on('click', function () {

		this._switchProject(this.treePanel.project_id);

		this.projectsGrid.show();

		this.projectsGrid.setParentProjectId(this.treePanel.project_id);

	}, this);


	this.statusesFilterGrid = new GO.projects2.StatusesFilterGrid({
		region: 'south',
		id: 'pr2-statuses',
		collapsible: true,
		floatable:false,
		autoHeight: true
	});

	this.selectManagerField = new GO.form.SelectUser({
		hiddenName: 'manager_id',
		emptyText: t("Filter on manager", "projects2"),
		startBlank: true,
		hideLabel: true,
		minListWidth: 300,
		allowBlank: true,
		displayField: 'displayName',
		valueField: 'id',
		anchor: '100%',
		store: new GO.data.JsonStore({
			url: GO.url('projects2/employee/users'),
			root: 'results',
			totalProperty: 'total',
			id: 'id',
			fields: ['id', 'displayName', 'avatarId', 'username'],
			remoteSort: true
		}),
		listeners: {
			select: function (cmb, record) {
				// Set the selected manager parameter for the treeloader
				this.treePanel.treeLoader.baseParams.manager_id = record.id;
				this.projectsGrid.store.baseParams.manager_id = record.id;
				this.projectsGrid.store.reload();
				this.treePanel.rootNode.reload();
			},
			clear: function () {
				// Clear the manager parameter for the treeloader
				this.treePanel.treeLoader.baseParams.manager_id = null;
				this.projectsGrid.store.baseParams.manager_id = null;
				this.projectsGrid.store.reload();
				this.treePanel.rootNode.reload();
			},
			scope: this
		}
	});




	this.addButton = new Ext.Button({
		iconCls: 'ic-add',
		cls: "primary",
		tooltipe: t("Add"),
		handler: function () {
			if (GO.projects2.max_projects > 0 && this.store.totalLength >= GO.projects2.max_projects)
			{
				Ext.Msg.alert(t("Error"), t("The maximum number of projects has been reached. Contact your hosting provider to activate unlimited usage of the projects module.", "projects2"));
			} else
			{
				GO.projects2.showProjectDialog({
					parent_project_id: this.projectsGrid.store.baseParams.parent_project_id
				});
			}
		},
		scope: this
	});

	var tbarItems = [{
		cls: 'go-narrow',
		iconCls: "ic-menu",
		handler: function () {
			this.westPanel.show();
		},
		scope: this
	},
		this.upButton = new Ext.Button({
			iconCls: "ic-arrow-upward",
			handler: function () {

				this._switchProject(this.projectsGrid.store.reader.jsonData.parent_project_id);
				this.projectsGrid.setParentProjectId(this.projectsGrid.store.reader.jsonData.parent_project_id);
			},
			scope: this
		}),
		this.invoiceButton = new Ext.Button({
			iconCls: 'ic-euro-symbol',
			text: t("Financial", "projects2"),
			handler: function () {
				if (!this.invoiceDialog)
					this.invoiceDialog = GO.projects2.invoiceDialog = new GO.projects2.InvoiceDialog();
				this.invoiceDialog.show();
			},
			scope: this
		}),
		'->',
		this.addButton,
		this.searchBtn = new go.toolbar.SearchButton({
			xtype: 'tbsearch'
			// tools: [{
			// 	xtype:'button',
			// 	iconCls: 'ic-more',
			// 	tooltip: t("Advanced"),
			// 	handler: function() {
			// 		var dlg = new GO.projects2.AdvancedSearchWindow();
			// 		dlg.show();
			// 	}
			// }]
		})

	], moreMenuItems = [];

	if (GO.settings.modules.projects2.permission_level == GO.permissionLevels.manage)
	{

		moreMenuItems.push({
			iconCls: 'ic-delete',
			text: t("Delete"),
			handler: function () {
				this.projectsGrid.deleteSelected({
					success: function() {
						var selectedNode = this.treePanel.getNodeById(this.projectsGrid.store.baseParams.parent_project_id);

						if (selectedNode) {
							delete selectedNode.attributes.children;
							selectedNode.reload();
						} else {
							this.treePanel.getRootNode().reload();
						}
					},
					scope: this
				});
				// if (this.project_id && this.project_id != 0) {
				//
				// 	if (confirm(t("Are you sure you want to delete '{item}'?").replace('{item}', '#' + this.project_id))) {
				// 		GO.request({
				// 			url: 'projects2/project/delete',
				// 			params: {id: this.project_id},
				// 			scope: this,
				// 			success: function () {
				// 				var selectedNode = this.treePanel.getSelectionModel().getSelectedNode();
				//
				// 				if (selectedNode) {
				// 					var parent =  selectedNode.parentNode;
				// 					selectedNode.destroy();
				// 					parent.select();
				//
				//
				// 					this.treePanel.fireEvent('click', parent);
				// 				}
				// 			}
				// 		});
				// 	}
				// }
			},
			scope: this
		},"-",{
			iconCls: 'ic-settings',
			text: t("Administration"),
			handler: function () {
				if (!this.settingsDialog)
				{
					this.settingsDialog = new GO.projects2.SettingsDialog();
				}
				this.settingsDialog.show();
			},
			scope: this
		});
	}

	moreMenuItems.push({
		iconCls: 'ic-refresh',
		text: t("Refresh"),
		handler: function () {
			this.refresh();
		},
		scope: this
	}, {
		iconCls: 'ic-receipt',
		text: t("Report", "projects2"),
		hidden: GO.settings.modules.projects2.permission_level<GO.projects2.permissionLevelFinance,
		handler: function () {
			if (!this.reportDialog)
			{
				this.reportDialog = new GO.projects2.ReportDialog();
			}
			this.reportDialog.show();
		},
		scope: this
	});



	if (GO.settings.modules.projects2.permission_level == GO.permissionLevels.manage)
	{
		moreMenuItems.push({
			iconCls: 'ic-import-export',
			text: t("Import"),
			handler: function () {
				if (!this.importDialog)
				{
					this.importDialog = new GO.projects2.CsvImportDialog();
				}
				this.importDialog.show();
			},
			scope: this
		});

		moreMenuItems.push(this.exportMenu = new GO.base.ExportMenuItem({className:'GO\\Projects2\\Export\\CurrentGrid'}));

	}

	tbarItems.push(this.moreMenuButton = new Ext.Button({
		iconCls: 'ic-more-vert',
		tooltip: t("More"),
		menu: moreMenuItems
	}));


	this.projectsGrid = new GO.projects2.SubProjectsGrid({
		stateId: "pr2-sub-projects-detail",
		region: "center",
		width: dp(600),
		narrowWidth: dp(400),
		paging: true,
		tbar: new Ext.Toolbar({enableOverflow:false,items:tbarItems})
	});

	this.projectsGrid.store.baseParams.use_status_filter = 1;

	if(this.exportMenu) {
		this.exportMenu.setColumnModel(this.projectsGrid.getColumnModel());
	}

	var westPnlItems = [];

	westPnlItems.push(
		{
			region: "north",
			height: dp(400),
			minHeight: dp(200),

			layout: "border",
			split: true,
			stateId: 'pr2-projects-side-north',
			items: [
				{
					region: 'north',
					autoHeight: true,
					padding: '0px '+dp(8),
					//cls: 'go-form-panel',
					layout: 'form',
					items: [
						this.selectManagerField
					]
				},
				this.treePanel
			]
		});

	westPnlItems.push({
		region: "center",
		minHeight: dp(200),
		autoScroll: true,
		items: [
				this.createFilterGrid(),
				this.statusesFilterGrid
			]
		}
	);

	this.westPanel = new Ext.Panel({
		id: config.id + '-west',
		region: 'west',
		cls: 'go-sidenav',
		split: true,
		width: dp(336),
		items: westPnlItems,
		layout: "border"
	});


	this.projectPanel = this.projectDetail = new GO.projects2.ProjectPanel({
		region: 'center',
		id: 'pr2-project-panel',
		title: t("General")
	});

	this.projectPanel.getTopToolbar().insert(0,  {
		cls: 'go-narrow',
		iconCls: "ic-arrow-back",
		handler: function () {
			this.gridContainer.show();
		},
		scope: this
	});
	this.projectPanel.on("fullReload", function (panel) {
		this.refresh();

		this._switchProject(panel.data.parent_project_id);

	}, this);

	this.projectPanel.on('load', function (tp, project_id) {

		this.project_id = project_id;
		this.tasksPanel.setProjectId(project_id, tp.data.use_tasks_panel == 1);

		var node = this.getTreePanel().getNodeById(project_id);

		if (node && node.rendered) {
			this.getTreePanel().getSelectionModel().select(node);
			node.expand();
		}

		if (project_id > 0 && !this.projectPanel.data.write_permission) {
			this.addButton.setDisabled(true);
		} else {
			this.addButton.setDisabled(false);
		}
	}, this);



	this.tasksPanel = new GO.projects2.TasksGrid({
		region: 'east',
		width: dp(690),
		id: 'pm-tasks',
		collapsible: true,
		title: t("Jobs")
	});

	this.statusesFilterGrid.on('change', function (grid, statuses, records) {
		this.onChangeStatusesFilterGrid(grid, statuses, records);
	}, this);




	this.treePanel.grid = this.projectsGrid;

	this.projectsGrid.store.on('load', function() {
		this.upButton.setDisabled(!this.projectsGrid.store.reader.jsonData.parent_project && (this.projectsGrid.store.baseParams.parent_project_id == -1 || this.projectsGrid.store.reader.jsonData.parent_project_id != -1));
	}, this);

	this.searchBtn.bindStore(this.projectsGrid.store);

	this.projectsGrid.on("delayedrowselect",function(grid, rowIndex, r){
		this._switchProject(r.data.id);
		this.detailPanel.show();
	}, this);

	this.projectsGrid.on("rowdblclick",function(grid, rowIndex, e){
		grid.setParentProjectId(grid.store.getAt(rowIndex).id);
	}, this);

	config.items = [
		this.gridContainer = new Ext.Panel({
			stateId: 'pr2-projects-grid-container',
			narrowWidth: dp(400), //this will only work for panels inside another panel with layout=responsive. Not ideal but at the moment the only way I could make it work
			width: dp(936),
			region: "west",
			layout: "responsive",
			split: true,
			items: [
				this.projectsGrid,
				this.westPanel
			]
		}),

		this.detailPanel = new Ext.TabPanel({
			stateId: 'pr2-projects-detail-panel',
			region:'center',
			items: [
				this.projectPanel,
				this.tasksPanel
			]
		})
	];

	config.border = false;
	config.layout = 'responsive';
	// change responsive mode on 1000 pixels
	config.layoutConfig = {
		triggerWidth: 1000
	};

	GO.projects2.MainPanel.superclass.constructor.call(this, config);

	this.tasksPanel.on('saved', function (projectId) {
		if (this._saveTaskPanelBeforeLeaving) {

			if (projectId > 0)
			{
				this.projectPanel.load(projectId);
			} else
			{
				this.projectPanel.reset();
			}
			this._saveTaskPanelBeforeLeaving = false;
		}
	}, this);

	this.on('show', function () {
		this.statusesFilterGrid.store.load();
	}, this);
};

Ext.extend(GO.projects2.MainPanel, Ext.Panel, {

	project_id: 0,

	_saveTaskPanelBeforeLeaving: false,



	// passthrough for compatibility with modules 
	getTopToolbar: function() {
		return this.projectsGrid.getTopToolbar();
	},

	refresh: function () {
		this.getTreePanel().rootNode.reload();
		this.projectsGrid.store.load();
	},

	onChangeStatusesFilterGrid: function (grid, statuses, records) {
		this.getTreePanel().treeLoader.baseParams.pr2_statuses = Ext.encode(statuses);
		//var node = this.getTreePanel().getNodeById(this.project_id) || this.getTreePanel().getRootNode();
		this.getTreePanel().getRootNode().reload();
		this.projectsGrid.store.baseParams.pr2_statuses = Ext.encode(statuses)
		this.projectsGrid.store.reload();

	},

	getTreePanel: function () {
		return this.treePanel;
	},

	afterRender: function () {

		GO.projects2.MainPanel.superclass.afterRender.call(this);

		GO.dialogListeners.add('project', {
			scope: this,
			save: function (e, project_id, parent_project_id) {
				this.getTreePanel().reloadActiveNode();
				this.projectsGrid.store.reload();
				this._switchProject(project_id);
			}
		});

		this.projectsGrid.setParentProjectId(0);
	},
	route: function(projectId) {
		this._switchProject(projectId);
	},
	_switchProject: function (projectId) {

		if (!this.tasksPanel.isDirty()) {
			this.project_id = projectId;

			if (projectId > 0) {

				this.projectPanel.show();
				this.projectPanel.load(projectId);
			} else {
				this.projectPanel.reset();

				// Disable the "Add project" button when the root node is clicked and the user doesn't have manage permissions on the project2 module.
				if (!GO.settings.modules.projects2.write_permission) {
					this.addButton.setDisabled(true);
				} else {
					this.addButton.setDisabled(false);
				}
			}
		} else {
			Ext.Msg.show({
				title: t("Save job changes before leaving?", "projects2"),
				msg: t("There are unsaved changes in the project jobs. Do you want to save them before switching to another project? If you click No, unsaved changes will be lost. If you click Cancel, we will stay at the current project.", "projects2"),
				buttons: Ext.Msg.YESNOCANCEL,
				scope: this,
				fn: function (btn) {
					if (btn == 'no') {
						this.project_id = projectId;
						if (projectId > 0)
						{
							this.projectPanel.show();
							this.projectPanel.load(projectId);
						} else
						{
							this.projectPanel.reset();
						}
					} else if (btn == 'yes') {
						this._saveTaskPanelBeforeLeaving = true;
						this.tasksPanel.save(projectId);
					}
				}
			});
		}

	},

	createFilterGrid : function() {

		//Make old store send filters.
		Ext.applyIf(this.projectsGrid.store, go.data.StoreTrait);
		this.projectsGrid.store.initFilters();
		this.projectsGrid.store.setFilter = function(cmpId, filter) {
			go.data.StoreTrait.setFilter.call(this, cmpId, filter);
			this.baseParams.filter = JSON.stringify(this.baseParams.filter);
		};


		return new Ext.Panel({
			tbar: [
				{
					xtype: 'tbtitle',
					text: t("Filters")
				},
				'->',
				{
					xtype: "filteraddbutton",
					entity: "Project"
				}
			],
			items: [
				{
					xtype: 'filtergrid',
					filterStore: this.projectsGrid.store,
					entity: "Project"
				},
				{
					xtype: 'variablefilterpanel',
					filterStore: this.projectsGrid.store,
					entity: "Project"
				}
			]
		});

	}

});

GO.projects2.showProjectDialog = function (config) {
	if (!GO.projects2.projectDialog)
		GO.projects2.projectDialog = new GO.projects2.ProjectDialog();



	GO.projects2.projectDialog.show(config);
};

/**
 * Open the projects2 tab and select the given project
 * 
 * @param int id The project id
 */
GO.projects2.openProjectTab = function (id) {
	GO.mainLayout.openModule('projects2');

	var pr2Panel = GO.mainLayout.getModulePanel('projects2');
	pr2Panel._switchProject(id);
};

Ext.onReady(function(){
	go.Entities.get('Contact').filters.push(
		{
			title: t("Project filter"),
			name: 'projectFilterId',
			multiple: false,
			type: "go.filter.FilterCombo",
			typeConfig: {entity: 'Project'}
		});

});

go.Modules.register("legacy", 'projects2', {
	mainPanel: GO.projects2.MainPanel,
	title: t("Projects", "projects2"),
	
	entities: [
		{
			name: "Project",

			filters: [
				{
					name: 'text',
					type: "string",
					multiple: false,
					title: "Query"
				},
				{
					title: t("Commented at"),
					name: 'commentedat',
					multiple: false,
					type: 'date'
				},{
					title: t("Modified at"),
					name: 'modifiedat',
					multiple: false,
					type: 'date'
				},{
					title: t("Modified by"),
					name: 'modifiedBy',
					multiple: true,
					type: 'string'
				},{
					title: t("Created at"),
					name: 'createdat',
					multiple: false,
					type: 'date'
				},{
					title: t("Created by"),
					name: 'createdby',
					multiple: true,
					type: 'string'
				},

				{
					title: t("Name"),
					name: 'name',
					multiple: true,
					type: 'string'
				}
				,{
					title: t("Customer"),
					name: 'customer',
					multiple: true,
					type: 'string'
				}

				,{
					title: t("Contact"),
					name: 'contact',
					multiple: true,
					type: 'string'
				}

				,{
					title: t("Description"),
					name: 'description',
					multiple: true,
					type: 'string'
				}

				,{
					title: t("Reference"),
					name: 'reference_no',
					multiple: true,
					type: 'string'
				}
				,{
					title: t("Manager"),
					name: 'manager',
					multiple: true,
					type: 'string'
				}
				,{
					title: t("Start time"),
					name: 'startTime',
					multiple: false,
					type: 'date'
				}
				,{
					title: t("End time"),
					name: 'endTime',
					multiple: false,
					type: 'date'
				}
				,{
					title: t("Status"),
					name: 'status',
					multiple: true,
					type: 'string'
				},{
					title: t("Type"),
					name: 'type',
					multiple: true,
					type: 'string'
				},{
					title: t("Template"),
					name: 'template',
					multiple: true,
					type: 'string'
				}
			],

			customFields: {
				fieldSetDialog: "GO.projects2.CustomFieldSetDialog"
			},
			links: [{
				iconCls: 'entity Project green',
				
				linkWindow: function() {
					var win = new GO.projects2.ProjectDialog();
					win.closeAction = "close";
					return win;
				},
				linkDetail: function() {
					return new GO.projects2.ProjectPanel();
				}	
		}]
	},'TimeEntry']
});

GO.projects2.permissionLevelFinance = 45;

