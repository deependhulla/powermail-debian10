go.modules.business.studio.StudioGrid = Ext.extend(go.grid.GridPanel, {
	initComponent: function() {
		this.store = new go.data.Store({
			fields: [
				'id',
				'name',
				'package',
				'moduleName',
				'locked',
				'enabled',
				'permissionLevel',
				{name: 'module', type: 'relation', store: 'Module', fk: 'moduleId'},
				{name: 'createdAt', type: 'date'},
				{name: 'modifiedAt', type: 'date'},
				{name: 'creator', type: "relation"},
				{name: 'modifier', type: "relation"}
			],
			entityStore: 'Studio'
		});

		Ext.apply(this, {
			columns: [
				{
					id: 'id',
					hidden: true,
					header: 'ID',
					width: dp(40),
					sortable: true,
					dataIndex: 'id'
				},
				{
					id: 'name',
					header: t('Name'),
					width: dp(75),
					sortable: true,
					dataIndex: 'name'
				},
				{
					id: 'package',
					header: t('Package'),
					width: dp(120),
					sortable: true,
					dataIndex: 'package'
				},
				{
					id: 'moduleName',
					header: t('Module Name'),
					width: dp(120),
					sortable: false,
					dataIndex: 'moduleName'
				},
				{
					id: 'enabled',
					header: t("Enabled"),
					width: dp(40),
					dataIndex: 'enabled',
					renderer: function (value, cell) {
						if(value === 1 ) {
							return t("Yes");
						}
						return t("No");
					}
				},
				// {
				// 	id: 'locked',
				// 	header: t("Locked"),
				// 	width: dp(40),
				// 	dataIndex: 'locked',
				// 	renderer: function (value, cell) {
				// 		if(value === true ) {
				// 			return t("Yes");
				// 		}
				// 		return t("No");
				// 	}
				// },
				{
					xtype:"datecolumn",
					id: 'createdAt',
					header: t('Created at'),
					width: dp(160),
					sortable: true,
					dataIndex: 'createdAt',
					hidden: true
				},
				{
					xtype:"datecolumn",
					hidden: false,
					id: 'modifiedAt',
					header: t('Modified at'),
					width: dp(160),
					sortable: true,
					dataIndex: 'modifiedAt'
				},
				{
					hidden: true,
					header: t('Created by'),
					width: dp(160),
					sortable: true,
					dataIndex: 'creator',
					renderer: function(v) {
						return v ? v.displayName : "-";
					}
				},
				{
					hidden: true,
					header: t('Modified by'),
					width: dp(160),
					sortable: true,
					dataIndex: 'modifier',
					renderer: function(v) {
						return v ? v.displayName : "-";
					}
				}

			],
			viewConfig: {
				totalDisplay: true,
				emptyText: 	'<i>description</i><p>' +t("No items to display") + '</p>'
			},
			autoExpandColumn: 'name',
			// config options for stateful behavior
			stateful: true,
			stateId: 'studio-grid'
		});

		go.modules.business.studio.StudioGrid.superclass.initComponent.call(this);
	},

	deleteSelected: function() {
		// TODO
	}
});