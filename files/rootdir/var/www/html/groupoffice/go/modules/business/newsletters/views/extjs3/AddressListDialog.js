Ext.onReady(function(){
	
	var data = [];
	
	go.modules.business.newsletters.entities.forEach(function(e) {
		var entity = go.Entities.get(e.name);
		if(!entity) {
			return;
		}
		data.push({
			name: e.name,
			label: entity.title
		});
	});

	go.modules.business.newsletters.AddressListDialog = Ext.extend(go.form.Dialog, {
		title: t('List'),
		entityStore: "AddressList",
		height: dp(600),
		width: dp(800),
		initFormItems: function () {

			this.addPanel(new go.permissions.SharePanel());

			return [{
					xtype: 'fieldset',
					items: [
						{
							xtype: 'textfield',
							name: 'name',
							fieldLabel: t("Name"),
							anchor: '100%',
							required: true
						},{
							editable: false,
							anchor: '100%',
							fieldLabel: t("Type"),
							xtype: "combo",
							triggerAction: 'all',
							mode: "local",
							hiddenName: "entity",
							store: {
								xtype:"gostore",
								data: {
									records: data
								},
								fields: ['name', 'label']
							},
							valueField: 'name',
							displayField: 'label'
						}]
				}
			];
		}
	});

});



