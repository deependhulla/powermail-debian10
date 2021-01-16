go.modules.business.studio.WizardEntityParameterPanel = Ext.extend(Ext.Panel, {
	entityData: {},
	customFldStore: new Ext.data.ArrayStore({
		storeId: 'entityParamStore',
		idIndex: 2,
		fields: [
			'name',
			'databaseName',
			'sortOrder'
		],
		data: [
			['id', 'id', 0]
		]
	}),
	chipsStore: new Ext.data.ArrayStore({
		storeId: 'chippiesStore',
		// root: 'options',
		fields: [
			'name',
			'databaseName'
		],
		data: []
	}),

	initComponent: function () {
		for (var elm in this.data.entities) {
			this.entityData = go.Entities.get(elm);
		}
		Ext.apply(this, {
			autoScroll: true,
			layout: 'form',
			items: this.initFormItems()
		});

		go.modules.business.studio.WizardEntityParameterPanel.superclass.initComponent.call(this);
	},

	show: function () {
		this.getStoreData();
		this.setTitle(t('Model parameters') + ' ' + t('for').toLowerCase() + ' ' + this.entityData.name);
		go.modules.business.studio.WizardEntityParameterPanel.superclass.show.call(this);
	},

	initFormItems: function () {
		this.searchNameFld = new go.form.ComboBox({
			fieldLabel: t('Search name field', 'studio'),
			hint: t("In this field, one can configure which custom field should be configured as search name."),
			name: 'entityOptions.searchNameField',
			id: 'searchNameField',
			allowBlank: false,
			mode: 'local',
			displayField: 'name',
			valueField: 'databaseName',
			anchor: '100%',
			value: 'id',
			triggerAction: 'all',
			selectOnFocus: true,
			forceSelection: true,
			store: this.customFldStore
		});

		this.searchDescriptionFld = {
			xtype: 'chips',
			fieldLabel: t('Search description fields', 'studio'),
			hint: t("In this field, one can configure which custom field should be configured as search description."),
			name: 'entityOptions.searchDescriptionFields',
			id: 'searchDescriptionFields',
			allowBlank: true,
			displayField: 'name',
			valueField: 'databaseName',
			anchor: '100%',
			value: 'id',
			triggerAction: 'all',
			selectOnFocus: true,
			forceSelection: true,
			multiple: true,
			comboStore: this.chipsStore
		};

		this.autoExpandFld = new go.form.ComboBox({
			fieldLabel: t('Auto expand field', 'studio'),
			hint: t("In this field, one can configure which field should automatically expand in the grid view."),
			name: 'entityOptions.autoExpandField',
			id: 'autoExpandField',
			allowBlank: false,
			mode: 'local',
			displayField: 'name',
			valueField: 'databaseName',
			anchor: '100%',
			value: 'id',
			triggerAction: 'all',
			selectOnFocus: true,
			forceSelection: true,
			store: this.customFldStore
		});

		this.defaultSortDirFld = new go.form.RadioGroup({
			fieldLabel: t('Default sort direction', 'studio'),
			hint: t('Set default sort direction for ID filed'),
			name: 'entityOptions.defaultIdSortDirection',
			id: 'defaultIdSortDirection',
			anchor: '100%',
			columns: 1,
			allowBlank: false,
			items:  [{
				boxLabel: t("Ascending"),
				inputValue: 'ASC',
				name: 'entityOptions.defaultIdSortDirection'
			}, {
				boxLabel: t("Descending"),
				inputValue: "DESC",
				name: 'entityOptions.defaultIdSortDirection'
			}]

		});

		this.ACLEntityCB = new Ext.form.Checkbox({
			boxLabel: t("ACL Entity", 'studio','business'),
			fieldLabel: '',
			hideLabel: true,
			name: 'entityOptions.isAclEntity',
			disabled: true,
			id: 'isAclEntity',
			hint:t('Enable access control for the generated entities.'),
			anchor: '100%'
		});

		return [{
			xtype: 'fieldset',
			items: [
				this.searchNameFld,
				this.searchDescriptionFld,
				this.autoExpandFld,
				this.defaultSortDirFld
			]
		}, {
			xtype: "fieldset",
			title: t("ACL"),
			items: [
				this.ACLEntityCB
			]
		}];
	},

	getStoreData: function() {

		go.Db.store("FieldSet").query({
			filter: {
				entities: [this.entityData.name]
			}
		}, function (response) {
			if (!response.ids.length) {
				this.loading = false;
				return;
			}

			go.Db.store("Field").query({
				filter: {
					fieldSetId: response.ids
				}
			}, function (response) {
				go.Db.store("Field").get(response.ids, function (fields) {
					var storeData = [], lastSortOrder = 0;
					fields.forEach(function (f) {
						f.sortOrder = ++lastSortOrder;
						storeData.push([
							f.name,
							f.databaseName,
							f.sortOrder
						]);
					});
					this.customFldStore.loadData(storeData, true);
					this.chipsStore.loadData(storeData, false);
					this.loading = false;
				}, this);
			}, this);

		}, this);

	}
});