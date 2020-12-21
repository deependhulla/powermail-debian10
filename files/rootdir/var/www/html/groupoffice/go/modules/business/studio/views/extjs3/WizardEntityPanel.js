go.modules.business.studio.WizardEntityPanel = Ext.extend(Ext.Panel, {
	stateful: false,
	stateId: 'studio-entity-detail',
	entityData: {},

	initComponent: function() {
		for(var elm in this.data.entities ) {
			var entityData = go.Entities.get(elm);
			this.entityData = entityData;
		}
		this.items = [new go.customfields.EntityPanel({
			entity: this.entityData.name
		})];

		go.modules.business.studio.WizardEntityPanel.superclass.initComponent.call(this);
	},

	show: function() {
		this.setTitle(t('Custom fields')+ ' ' + t('for').toLowerCase() + ' ' +  this.entityData.name);
		go.modules.business.studio.WizardEntityPanel.superclass.show.call(this);
	},

	edit : function() {
		debugger;
		var win = new go.customfields.EntityDialog({
			entity: this.data.name
		});
		win.show();
	}
});