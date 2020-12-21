GO.tickets.CustomFieldSetDialog = Ext.extend(go.customfields.FieldSetDialog, {	
	initComponent: function() {
		GO.tickets.CustomFieldSetDialog.superclass.initComponent.call(this);
		
		this.formPanel.on("beforesubmit", function(entityPanel, values) {
			var enableFilter = entityPanel.getForm().findField("enableFilter").getValue();

			if(!enableFilter) {
				if(values.filter) {
					delete values.filter.type_id;
				} else
				{
					values.filter = {};
				}
			}
		}, this);
	},
	
	initFormItems: function () {
		var items = GO.tickets.CustomFieldSetDialog.superclass.initFormItems.call(this);

		items[0].items = items[0].items.concat([
			{
				xtype: "checkbox",
				name: "enableFilter",
				boxLabel: t("Only show this field set for selected types"),
				hideLabel: true,
				submit: false,
				listeners: {
					check: function (f, checked) {
						this.formPanel.getForm().findField("filter.type_id").setDisabled(!checked);						
					},
					scope: this
				}
			},
			{
				anchor: '100%',
				disabled: true,
				xtype: "chips",
				comboStore: GO.tickets.writableTypesStore,
				pageSize: 50,
				valueField: 'id',
				displayField: "name",
				name: "filter.type_id",
				fieldLabel: t("Types")
			}
		]);
		
		return items;
	},
	
	load: function (id) {
		
		//templatestore must be loaded before form loads for chips component
		if(!GO.tickets.writableTypesStore.loaded) {
			
			this.loading = true;
			
			GO.tickets.writableTypesStore.load({
				callback: function() {
					GO.tickets.CustomFieldSetDialog.superclass.load.call(this, id);
				},
				scope: this
			});
		} else
		{
			GO.tickets.CustomFieldSetDialog.superclass.load.call(this, id);
		}
		
		return this;
	},
	
	show: function () {
		
		var p = arguments;
		
		//templatestore must be loaded before form loads for chips component
		if(!GO.tickets.writableTypesStore.loaded && !this.loading) {
			
			this.loading = true;
			
			GO.tickets.templatesStore.load({
				callback: function() {
					GO.tickets.CustomFieldSetDialog.superclass.show.apply(this, p);
				},
				scope: this
			});
		} else
		{
			GO.tickets.CustomFieldSetDialog.superclass.show.apply(this, p);
		}
		
		return this;
	},

	onLoad: function () {
		this.formPanel.getForm().findField("enableFilter").setValue(!!this.formPanel.entity.filter.type_id);
		
		return GO.tickets.CustomFieldSetDialog.superclass.onLoad.call(this);
	}

	
});

