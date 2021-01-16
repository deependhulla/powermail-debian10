{namespace}.{entityName}Grid = Ext.extend(go.grid.GridPanel, {
	initComponent: function () {
		this.frontendConfig = {namespace}.ModuleConfig.frontendOptions;

		this.store = new go.data.Store({
			fields: [
				'id',
				{name: 'createdAt', type: 'date'},
				{name: 'modifiedAt', type: 'date'},
				{name: 'creator', type: "relation"},
				{name: 'modifier', type: "relation"},
				'permissionLevel'
			],
			sortInfo: {field: "id", direction: "{defaultIdSortDirection}"},
			entityStore: "{entityName}"
		});

		Ext.apply(this, {
			columns: [{
				id: 'showID',
				hidden: !this.frontendConfig.showID,
				header: 'ID',
				width: dp(60),
				sortable: true,
				dataIndex: 'id'
			},{
				hidden: !this.frontendConfig.showCreator,
				id: 'showCreator',
				header: t('Created by'),
				width: dp(160),
				sortable: true,
				dataIndex: 'creator',
				renderer: function(v) {
					return v ? v.displayName : "-";
				}
			},{
				xtype:"datecolumn",
				id: 'showCreationDate',
				header: t('Created at'),
				width: dp(160),
				sortable: true,
				dataIndex: 'createdAt',
				hidden: !this.frontendConfig.showCreationDate
			},{
				hidden: !this.frontendConfig.showModifier,
				header: t('Modified by'),
				width: dp(160),
				sortable: true,
				id: 'showModifier',
				dataIndex: 'modifier',
				renderer: function(v) {
					return v ? v.displayName : "-";
				}
			},{
				xtype:"datecolumn",
				hidden: !this.frontendConfig.showModificationDate,
				id: 'showModificationDate',
				header: t('Modified at'),
				width: dp(160),
				sortable: true,
				dataIndex: 'modifiedAt'
			}],
			viewConfig: {
				totalDisplay: this.frontendConfig.showTotals,
				emptyText: 	'<i>description</i><p>' +t("No items to display") + '</p>'
			},
			autoExpandColumn: '{autoExpandFld}',
			stateful: true,
			stateId: '{entityName}-grid'
		});

		{namespace}.{entityName}Grid.superclass.initComponent.call(this);
	}
});

