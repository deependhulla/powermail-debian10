GO.projects2.AdvancedSearchWindow = Ext.extend(go.Window, {

	layout: "responsive",
	title: t("Advanced search"),
	width: dp(1000),
	height: dp(800),
	maximizable: true,
	stateId: 'pr2-advanced-search-win',
	initComponent: function() {

// 		this.grid = new go.grid.GridPanel({
// 			region: "center",
// 			store: new go.data.Store({
// 				fields: ['id', 'path', 'reference_no', 'status_name', 'user_name', 'type_name', 'template_name', 'responsible_user_name', 'icon', 'start_time', 'due_time', 'customer_name', 'contact', 'ctime', 'mtime'].concat(go.customfields.CustomFields.getFieldDefinitions("Project")),
// 				entityStore: "Project",
// 				sortInfo: {field: "path", direction: "ASC"}
// 			}),
// 			columns: [{
// 				dataIndex: 'icon',
// 				xtype: 'iconcolumn'
// 			}, {
// 				header: 'ID',
// 				dataIndex: 'id',
// 				id: 'id',
// 				width: 50,
// 				hidden: true
// 			}, {
// 				header: t("Name"),
// 				dataIndex: 'path',
// 				id: 'path',
// 				width: dp(200)
// 			}, {
// 				header: t("Reference no.", "projects2"),
// 				dataIndex: 'reference_no',
// 				id: 'reference_no',
// 				width: 150,
// 				hidden: true
// 			}, {
// 				header: t("Status", "projects2"),
// 				dataIndex: 'status_name',
// 				id: 'status_name',
// 				width: 100
// 			}, {
// 				header: t("Start time", "projects2"),
// 				dataIndex: 'start_time',
// 				id: 'start_time',
// 				width: 100,
// 				scope: this,
// 				hidden: true
// 			}, {
// 				header: t("Due at", "projects2"),
// 				dataIndex: 'due_time',
// 				id: 'due_time',
// 				width: 100,
// //					renderer: function (value, metaData, record) {
// //						return '<span class="' + this.projectPanel.templateConfig.getClass(record.data) + '">' + value + '</span>';
// //					},
// 				scope: this
// 			}, {
// 				xtype: "datecolumn",
// 				dataIndex: "ctime",
// 				header: t("Created at"),
// 				hidden: true
// 			}, {
// 				xtype: "datecolumn",
// 				dataIndex: "mtime",
// 				header: t("Modified at"),
// 				hidden: true
// 			}, {
// 				header: t("User"),
// 				dataIndex: 'user_name',
// 				id: 'user_name',
// 				width: 150,
// 				sortable: false,
// 				hidden: true
// 			}, {
// 				header: t("Permission type", "projects2"),
// 				dataIndex: 'type_name',
// 				id: 'type_name',
// 				width: 80,
// 				hidden: true
// 			}, {
// 				header: t("Template", "projects2"),
// 				dataIndex: 'template_name',
// 				id: 'template_name',
// 				width: 80,
// 				hidden: true
// 			}, {
// 				header: t("Manager", "projects2"),
// 				dataIndex: 'responsible_user_name',
// 				id: 'responsible_user_name',
// 				width: 120,
// 				sortable: false,
// 				hidden: true
// 			}, {
// 				header: t("Customer", "projects2"),
// 				dataIndex: 'customer_name',
// 				id: 'customer_name',
// 				width: 150,
// 				sortable: false
// 			}, {
// 				header: t("Contact", "projects2"),
// 				dataIndex: 'contact',
// 				id: 'contact',
// 				width: 120,
// 				sortable: false,
// 				hidden: true
// 			}].concat(go.customfields.CustomFields.getColumns("Project"))
// 		});

		this.grid = new GO.projects2.SubProjectsGrid({
			region: "center"
		});

		//Make old store send filters.
		Ext.applyIf(this.grid.store, go.data.StoreTrait);
		this.grid.store.initFilters();
		this.grid.store.setFilter = function(cmpId, filter) {
			go.data.StoreTrait.setFilter.call(this, cmpId, filter);
			this.baseParams.filter = JSON.stringify(this.baseParams.filter);
		};

		this.grid.store.baseParams.parent_project_id = -1;


		this.items = [this.grid, this.createFilterGrid()];

		this.supr().initComponent.call(this);

		this.on("render", function() {
			this.grid.store.load();
		}, this);
	},

	createFilterGrid : function() {
		return new Ext.Panel({
			split: true,
			region: "west",
			width: dp(400),
			tbar: [
				{
					xtype: 'tbtitle',
					text: t("Filters")
				},
				'->',
				{
					xtype: "button",
					iconCls: "ic-add",
					handler: function() {
						var dlg = new go.filter.FilterDialog({
							entity: "Project"
						});
						dlg.show();
					},
					scope: this
				}
			],
			items: [
				this.filterGrid = new go.filter.FilterGrid({
					filterStore: this.grid.store,
					entity: "Project"
				})
			]
		});

	}

});

