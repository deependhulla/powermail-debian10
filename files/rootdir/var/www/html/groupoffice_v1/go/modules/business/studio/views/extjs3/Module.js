go.Modules.register("business", "studio", {
	mainPanel: "go.modules.business.studio.MainPanel",
	title: t("Studio"),
	entities: [{
		name: "Studio",
		relations: {
			module: {store: 'Module', fk: 'moduleId'},
			creator: {store: 'User', fk: 'createdBy'},
			modifier: {store: 'User', fk: 'modifiedBy'}
		}
		/*,
		filters: [
			{
				name: 'locked',
				title: t("Locked"),
				type: 'select',
				multiple: false,
				options:[{
					value: 1,
					title: t("Yes")
				},{
					value: 0,
					title: t("No")
				}]
			},
			{
				name: 'package',
				title: t("Package"),
				type: "string",
				multiple: true
			}
		]*/
	}],

	initModule: function () {
		go.Router.add(/studio\/([0-9]*)\/module\/([0-9]*)/, function(id, moduleId){
			go.Db.store("Module").single(moduleId).then(function(result){
				var wzd = new go.modules.business.studio.StudioWizard({studio_id: id, module_id: moduleId, data: result});
				wzd.show();
			});

		});
	}
});
