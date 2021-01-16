go.modules.business.studio.WizardFrontendOptionsPanel = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			autoScroll: true,
			layout: 'form',
			items: this.initFormItems()
		});
		go.modules.business.studio.WizardFrontendOptionsPanel.superclass.initComponent.call(this);
	},

	initFormItems: function() {
		this.showDetailPanelCB = new Ext.form.Checkbox({
			boxLabel: t('Display detail panel on single click'),
			fieldLabel: '',
			name: 'frontendOptions.showDetailPanel',
			anchor: '100%',
			id: 'showDetailPanel',
			hint: t("Show a detail panel when an item is selected"),
			hideLabel: true
		});
		this.showSearchBarCB = new Ext.form.Checkbox({
			boxLabel: t('Display search bar'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showSearchBar',
			id: 'showSearchBar',
			hint: t("Show a search bar on top of the grid"),
			anchor: '100%'
		});
		this.showTotalsCB = new Ext.form.Checkbox({
			boxLabel: t('Display totals'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showTotals',
			id: 'showTotals',
			hint: t("Display the total number of items in the grid"),
			anchor: '100%'
		});
		this.showFiltersCB = new Ext.form.Checkbox({
			boxLabel: t('Display filter sidebar'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showFilter',
			id: 'showFilter',
			hint: t("Show a sidebar with configurable filters"),
			anchor: '100%'
		});

		this.showLinksCB = new Ext.form.Checkbox({
			boxLabel: t('Display links'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showLinks',
			id: 'showLinks',
			hint: t("Enable linking this entity to other entities"),
			anchor: '100%'
		});

		this.showCommentsCB = new Ext.form.Checkbox({
			boxLabel: t('Display comments'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showComments',
			id: 'showComments',
			hint: t("Enable the display of comments in the detail panel"),
			anchor: '100%'
		});

		this.showFileUploadsCB = new Ext.form.Checkbox({
			boxLabel: t('Display file uploads'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showFileUploads',
			id: 'showFileUploads',
			hint: t("Enable file uploads in the detail panel"),
			anchor: '100%'
		});

		this.showModifyPanelCB = new Ext.form.Checkbox({
			boxLabel: t('Display modification information'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showModifyPanel',
			id: 'showModifyPanel',
			hint: t("Display modification and creation information in the detail panel"),
			anchor: '100%'
		});

		this.showImportExportCB = new Ext.form.Checkbox({
			boxLabel: t('Enable CSV import / export'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.enableCSV',
			id: 'enableCSV',
			hint: t('Enable CSV import and export'),
			anchor: '100%'
		});

		this.showIdCB = new Ext.form.Checkbox({
			boxLabel: t('Show ID in grid'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showID',
			id: 'showID',
			hint: t('Display the ID of the items in the grid by default'),
			anchor: '100%'
		});
		this.showCreateDateCB = new Ext.form.Checkbox({
			boxLabel: t('Show creation date in grid'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showCreationDate',
			id: 'showCreationDate',
			hint: t('Display the creation date in the grid by default'),
			anchor: '100%'
		});

		this.showModifyDateCB = new Ext.form.Checkbox({
			boxLabel: t('Show modification date in grid'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showModificationDate',
			id: 'showModificationDate',
			hint: t('Display the modification date in the grid by default'),
			anchor: '100%'
		});

		this.showCreatorCB = new Ext.form.Checkbox({
			boxLabel: t('Show creator'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showCreator',
			id: 'showCreator',
			hint: t('Display the name of the creator in the grid by default'),
			anchor: '100%'
		});

		this.showModifierCB = new Ext.form.Checkbox({
			boxLabel: t('Show modifier'),
			fieldLabel: '',
			hideLabel: true,
			name: 'frontendOptions.showModifier',
			id: 'showModifier',
			hint: t('Display the name of modifier in the grid by default'),
			anchor: '100%'
		});

		return [{
			xtype: 'fieldset',
			title: t('Grid options'),
			items:[
				this.showDetailPanelCB,
				this.showSearchBarCB,
				this.showTotalsCB,
				this.showFiltersCB,
				this.showImportExportCB
			]
		},
			{
				xtype: "fieldset",
				title: t("Grid column options"),
				items: [
					this.showIdCB,
					this.showCreateDateCB,
					this.showModifyDateCB,
					this.showCreatorCB,
					this.showModifierCB
				]
			},
			{
				xtype: "fieldset",
				title: t("Detail panel options"),
				items: [
					this.showLinksCB,
					this.showCommentsCB,
					this.showFileUploadsCB,
					this.showModifyPanelCB
				]
			}];
	}
});