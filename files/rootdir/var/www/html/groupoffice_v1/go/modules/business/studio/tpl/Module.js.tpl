go.Modules.register("{packageName}", "{moduleName}", {
	mainPanel: "{namespace}.MainPanel",
	title: t("{moduleTitle}"),
	entities: [{
		name: "{entityName}",
		relations: {
			creator: { store: "User", fk: "createdBy" },
			modifier: { store: "User", fk: "createdBy" }
		},
		filters: [{
			name: 'text',
			type: "string",
			multiple: false,
			title: "Query"
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
			title: t("Has links to..."),
			name: 'link',
			multiple: false,
			type: 'go.links.FilterLinkEntityCombo'
		},
		{
			title: t("Commented at"),
			name: 'commentedat',
			multiple: false,
			type: 'date'
		}],
		links: [{
			iconCls: 'entity ic-note',
			linkWindow: function (entity, entityId) {
				return new {namespace}.{entityName}Dialog();
			},
			linkDetail: function () {
				return new {namespace}.{entityName}Detail();
			}
		}]
	}],
	initModule: function () {

	}
});

