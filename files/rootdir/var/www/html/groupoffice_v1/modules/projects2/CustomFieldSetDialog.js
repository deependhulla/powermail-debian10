GO.projects2.CustomFieldSetDialog = Ext.extend(go.customfields.FieldSetDialog, {	
	
	initComponent: function() {
		GO.projects2.CustomFieldSetDialog.superclass.initComponent.call(this);
		
		this.formPanel.on("beforesubmit", function(entityPanel, values) {
			var enableFilter = entityPanel.getForm().findField("enableFilter").getValue();

			if (!enableFilter) {
				if(values.filter) {
					delete values.filter.template_id;
				} else
				{
					values.filter = {};
				}
			}
		}, this);
	},
	
	initFormItems: function () {
		var items = GO.projects2.CustomFieldSetDialog.superclass.initFormItems.call(this);

		items[0].items = items[0].items.concat([
			{
				xtype: "checkbox",
				name: "enableFilter",
				boxLabel: t("Only show this field set for selected templates"),
				hideLabel: true,
				submit: false,
				listeners: {
					check: function (f, checked) {
						this.formPanel.getForm().findField("filter.template_id").setDisabled(!checked);
					},
					scope: this
				}
			},
			{
				anchor: '100%',
				disabled: true,
				xtype: "chips",
				comboStore: GO.projects2.templatesStore,
				valueField: 'id',
				displayField: "name",
				name: "filter.template_id",
				fieldLabel: t("Templates")
			}
		]);
		
		
		
		return items;
	},
	
	load: function (id) {
		
		//templatestore must be loaded before form loads for chips component
		if(!GO.projects2.templatesStore.loaded) {
			
			this.loading = true;
			
			GO.projects2.templatesStore.load({
				callback: function() {
					GO.projects2.CustomFieldSetDialog.superclass.load.call(this, id);
				},
				scope: this
			});
		} else
		{
			GO.projects2.CustomFieldSetDialog.superclass.load.call(this, id);
		}
		
		return this;
	},
	
	show: function () {
		
		var p = arguments;
		
		//templatestore must be loaded before form loads for chips component
		if(!GO.projects2.templatesStore.loaded && !this.loading) {
			
			this.loading = true;
			
			GO.projects2.templatesStore.load({
				callback: function() {
					GO.projects2.CustomFieldSetDialog.superclass.show.apply(this, p);
				},
				scope: this
			});
		} else
		{
			GO.projects2.CustomFieldSetDialog.superclass.show.apply(this, p);
		}
		
		return this;
	},

	onLoad: function () {
		this.formPanel.getForm().findField("enableFilter").setValue(!!this.formPanel.entity.filter.template_id);
		
		return GO.projects2.CustomFieldSetDialog.superclass.onLoad.call(this);
	}
});

