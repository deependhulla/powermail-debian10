go.modules.business.studio.CreateModuleDialog = Ext.extend(go.form.Dialog, {
	title: t('Create a Module', 'studio', 'business'),
	entityStore: "Studio",
	width: 1024,
	height: 768,
	doRedirect: false,
	initComponent: function () {

		this.saveButton = new Ext.Button({
			text: t("Save"),
			handler: this.save,
			scope: this
		});
		this.buttons = [
			'->',
			this.saveButton
		];
		go.modules.business.studio.CreateModuleDialog.superclass.initComponent.call(this);
	},

	initFormItems: function () {
		this.modulePanel = new go.modules.business.studio.WizardModulePanel({
			hideMode: 'offsets',
		});
		this.tabPanel = new Ext.Panel({
			layout: 'card',
			anchor: "100% 100%",
			defaults: {
				autoScroll: true
			},
			items: [
				this.modulePanel
			]
		});
		return [this.tabPanel];
	},

	show: function () {
		go.modules.business.studio.CreateModuleDialog.superclass.show.call(this);
		this.tabPanel.getLayout().setActiveItem(0);
	},


	validateComponent: function (cmp) {
		var validateSuccess = true;

		if (cmp.items && cmp.items.length && !(cmp.isFormField && !cmp.isComposite && cmp.getXType() !== 'checkboxgroup')) {
			cmp.items.each(function (item) {

				if (item.disabled) {
					return true;
				}

				validateSuccess = this.validateComponent(item);
				if (!validateSuccess) {
					return false;
				}
			}, this);
		} else {
			if (cmp.activeError) {
				validateSuccess = false;
			} else {
				validateSuccess = cmp.isValid ? cmp.isValid() : true;
			}
		}

		return validateSuccess;
	},

	save: function () {
		if (!this.validateComponent(this.tabPanel.getLayout().activeItem)) {
			return;
		}

		var form = this.modulePanel.findParentByType('form');
		var values = form.getValues();
		var params = {
			module: values.module.name,
			package: values.module.package,
			description: values.module.description,
			sort_order: values.module.sort_order,
			entity: values.entity.name,
			isAclEntity: values.entity.isAclEntity,
			doOverwrite: true
		};
		go.Jmap.request({
			method: 'Studio/backend',
			params: params,
			callback: function (options, success, response) {
				if (!response.success) {
					Ext.Msg.show({
						title: t('Group Office Studio'),
						msg: response.feedback,
						ok: true
					});
				} else {
					this.module_id = response.module_id;
					this.studio_id = response.studio_id;
					this.doRedirect = true;

					// Redirect to studiowizard and force a hard reload
					go.Router.setPath('/studio/'+this.studio_id+ '/module/'+this.module_id);
					window.location.replace(window.location.pathname +  window.location.hash)
					window.location.reload(true);
					this.hide();
				}
			}.bind(this)
		});
	}
});
