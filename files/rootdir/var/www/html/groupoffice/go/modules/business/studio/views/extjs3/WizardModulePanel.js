go.modules.business.studio.WizardModulePanel = Ext.extend(Ext.Panel, {

	initComponent : function(){
		Ext.apply(this,{
			autoScroll: true,
			layout:'form',
			items:this.initFormItems()
		});
		go.modules.business.studio.WizardModulePanel.superclass.initComponent.call(this);
	},
	initFormItems: function () {

		this.moduleNameField = new Ext.form.TextField({
			name: 'module.name',
			fieldLabel: t("Module", "modules"),
			allowBlank: false,
			anchor: '100%',
			hint: t('A short name for the module'),
			regex: /^[a-z0-9_]+$/,
			regexText: t('Only lower case letters are allowed')

		});

		var settings = go.Modules.get("business", "studio").settings;

		this.packageNameField = new Ext.form.TextField({
			name: 'module.package',
			fieldLabel: t("Package", "modules"),
			allowBlank: false,
			value:  settings.package ? settings.package: "studio",
			disabled: !!settings.package,
			anchor: '100%',
			hint: t('Package name, e.g. name customer or name own company'),
			regex: /^[a-z0-9_]+$/,
			regexText: t('Only lower case letters are allowed')
		});

		this.moduleDescriptionField = new Ext.form.TextArea({
			name: 'module.description',
			fieldLabel: t("Description"),
			anchor: '100%',
			allowBlank: false,
			hint: t('A description for the module, to be displayed in the module manager')
		});

		this.sortOrderField = new GO.form.NumberField({
			serverFormats: false,
			fieldLabel: t("Sort order", "modules"),
			name: 'module.sort_order',
			id: 'sort_order',
			decimals: 0,
			allowBlank: true,
			anchor: '100%',
			hint: t('Optional sort order for module')
		});

		this.entityNameField = new Ext.form.TextField({
			name: 'entity.name',
			fieldLabel: t("Entity Name", 'studio','business'),
			allowBlank: false,
			anchor: '100%',
			hint: t('A short name for the database object, should be singular'),
			regex: /^[a-z0-9]+$/i,
			regexText: t('Only lower case letters are allowed')

		});

		this.entityAclCB = new Ext.ux.form.XCheckbox({
			name: 'entity.isAclEntity',
			fieldLabel: t("ACL Entity", 'studio','business'),
			anchor: '100%',
			hint: t('Enable access control for the generated entities')
		});

		return [{
			xtype: 'fieldset',
			items: [
				this.moduleNameField,
				this.packageNameField,
				this.moduleDescriptionField,
				this.sortOrderField,
				this.entityNameField,
				this.entityAclCB
			]
		}];
	}
});