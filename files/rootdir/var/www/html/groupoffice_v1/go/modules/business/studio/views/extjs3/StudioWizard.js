go.modules.business.studio.StudioWizard = Ext.extend(go.form.Dialog, {
	title: t('Create a Module', 'studio', 'business'),
	entityStore: "Module",
	stateId: 'studio-wizard-dialog',
	stateful: false,
	width: 1024,
	height: 768,
	data: {},

	initComponent: function () {
		this.previousButton = new Ext.Button({
			text: t("Previous"),
			handler: this.navigatePrevious,
			scope: this
		});

		this.nextButton = new Ext.Button({
			text: t("Next"),
			handler: this.navigateNext,
			scope: this
		});
		this.buttons = [
			this.previousButton,
			'->',
			this.nextButton
		];

		go.modules.business.studio.StudioWizard.superclass.initComponent.call(this);
		this.setButtonStates();
		var moduleCfg = go.modules[this.data.package][this.data.name].ModuleConfig;
		for(var name in moduleCfg.frontendOptions) {
			var elems = this.frontEndPanel.find('id', name);
			if(elems.length === 1) {
				elems[0].setValue(moduleCfg.frontendOptions[name]);
			}
		}

		for(var name in moduleCfg.entityOptions) {
			var elems = this.entityParamPanel.find('id',name);
			if(elems.length === 1) {
				var eo = moduleCfg.entityOptions[name];
				if(Ext.isArray(eo)) {
					// TODO...
				} else {
					elems[0].setValue(eo);
				}
			}
		}
	},

	onLoad: function (entityValues) {
		go.modules.business.studio.StudioWizard.superclass.onLoad.call(this);
	},

	initFormItems: function () {
		this.entityPanel = new go.modules.business.studio.WizardEntityPanel({
			studio_id: this.studio_id,
			module_id: this.module_id,
			data: this.data,
			hideMode: 'offsets',
			layout: 'fit',
			title: t('Entity details', 'studio', 'business')
		});

		this.entityParamPanel = new go.modules.business.studio.WizardEntityParameterPanel({
			studio_id: this.studio_id,
			module_id: this.module_id,
			data: this.data,
			hideMode: 'offsets',
			layout: 'fit',
			title: t('Entity parameters', 'studio', 'business')
		});

		this.frontEndPanel = new go.modules.business.studio.WizardFrontendOptionsPanel({
			module_id: this.module_id,
			studio_id: this.studio_id,
			data: this.data,
			hideMode: 'offsets',
			title: t('Frontend Options', 'studio', 'business')
		});

		this.permissionsPanel = new go.modules.business.studio.WizardPermissionsPanel({
			studio_id: this.studio_id,
			module_id: this.module_id,
			data: this.data,
			hideMode: 'offsets',
			title: t('Permissions')
		});
		this.activationPanel = new go.modules.business.studio.WizardActivationPanel({
			module_id: this.module_id,
			studio_id: this.studio_id,
			data: this.data,
			hideMode: 'offsets',
			title: t('Overview')
		});

		this.tabPanel = new Ext.Panel({
			layout: 'card',
			anchor: "100% 100%",
			defaults: {
				autoScroll: true
			},
			items: [
				this.entityPanel,
				this.permissionsPanel,
				this.entityParamPanel,
				this.frontEndPanel,
				this.activationPanel
			]
		});
		return [this.tabPanel];

	},
	setButtonStates: function () {
		var activeTab = this.tabPanel.getLayout().activeItem;
		var activeTabIndex = this.tabPanel.items.indexOf(activeTab);

		if (activeTab == null || activeTabIndex === 0) {
			this.previousButton.setVisible(false);
		} else {
			this.previousButton.setVisible(true);
		}

		if (activeTabIndex === this.tabPanel.items.length - 1) {
			this.nextButton.setText(t("Finish"));
		} else {
			this.nextButton.setText(t("Next"));
		}
	},

	show: function () {
		go.modules.business.studio.StudioWizard.superclass.show.call(this);
		this.setTitle(t("Configure module") + ' ' + this.data.name +  ', ' + t("Package").toLowerCase() + ' '+ this.data.package );
		this.tabPanel.getLayout().setActiveItem(0);

	},

	navigatePrevious: function () {
		var activeTab = this.tabPanel.getLayout().activeItem;
		var activeTabIndex = this.tabPanel.items.indexOf(activeTab);

		if (activeTabIndex > 0) {
			this.tabPanel.getLayout().setActiveItem(--activeTabIndex);
		}
		this.setButtonStates();
	},

	navigateNext: function () {
		var activeTab = this.tabPanel.getLayout().activeItem;

		if (!this.validateComponent(activeTab)) {
			return;
		}

		var activeTabIndex = this.tabPanel.items.indexOf(activeTab);
		if (activeTabIndex < this.tabPanel.items.length - 1) {
			this.tabPanel.getLayout().setActiveItem(++activeTabIndex);
		} else {
			if (!this.formPanel.getForm().isValid()) {
				console.error("Not all required fields are populated!");
			}
			Ext.Msg.confirm(
				t('Confirm'),
				t('You are about to regenerate the code for your module. Any manual changes will be overwritten. Do you really want to continue?'),
				function(btn) {
					if(btn !== 'yes') {
						return;
					}
					this.submit();
				},
				this
			);
		}
		this.setButtonStates();
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
	submit: function() {
		if(!this.onBeforeSubmit()) {
			return;
		}

		if (!this.isValid()) {
			this.showFirstInvalidField();
			return;
		}

		this.actionStart();
		var form = this.frontEndPanel.findParentByType('form');
		this.entityParamPanel.ACLEntityCB.enable();
		var values = form.getValues();
		var params = {
			studio_id: this.studio_id,
			module_id: this.module_id,
			doOverwrite: values.doOverwrite,
			entityOptions: values.entityOptions,
			frontendOptions: values.frontendOptions,
			moduleEnabled: values.module.enabled,
			studioLocked: values.studio.locked
		};

		go.Jmap.request({
			method: 'Studio/frontend',
			params: params,
			callback: function (options, success, response) {
				if (!response.success) {
					Ext.Msg.show({
						title: t('Group Office Studio'),
						msg: response.feedback,
						ok: true
					});
				} else {
					this.actionComplete();
					go.Router.setPath(response.redirectTo);
					//reload to make sure settings apply
					window.location.replace(window.location.pathname + window.location.hash);
					window.location.reload(true);
					this.hide();
				}
			}.bind(this)
		});
	}

});
