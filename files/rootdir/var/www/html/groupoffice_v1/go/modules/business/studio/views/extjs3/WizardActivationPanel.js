go.modules.business.studio.WizardActivationPanel = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			cls: 'go-form',
			layout: 'form',
			items: this.initFormItems()
		});
		go.modules.business.studio.WizardActivationPanel.superclass.initComponent.call(this);
	},

	initFormItems: function() {
		this.enableCB = new Ext.form.Checkbox({
			name: 'module.enabled',
			fieldLabel: '',
			hideLabel: true,
			boxLabel: t('Enable module'),
			hint: t('Make the module available for the end user'),
			checked: this.data.enabled

		});

		this.lockCB = new Ext.form.Checkbox({
			name: 'studio.locked',
			fieldLabel: '',
			hideLabel: true,
			boxLabel: t('Lock code generation'),
			hint: t('Disable editing module settings and regeneration of code'),
			hidden: true,
			checked: false
		});

		this.overwriteCB = new Ext.ux.form.XCheckbox({
			name: 'doOverwrite',
			fieldLabel: '',
			hideLabel: true,
			required: true,
			boxLabel: t('Overwrite existing code'),
			hint: t('Regenerate any client side code. WARNING: this will undo any manual modifications to earlier code!')
		})

		return [{
			xtype: 'fieldset',
			items: [
				this.enableCB,
				this.lockCB
			]
		},
			{
				xtype: 'fieldset',
				items: [
					this.overwriteCB
				]
			}]
	}
});