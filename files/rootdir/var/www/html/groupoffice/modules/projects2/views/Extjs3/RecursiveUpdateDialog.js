GO.projects2.RecursiveUpdateDialog = Ext.extend(GO.dialog.TabbedFormDialog, {
	initComponent: function () {
		Ext.apply(this, {
			enableApplyButton: false,
			goDialogId: 'precupdailog',
			title: t("Change sub projects", "projects2"),
			height: dp(600),
			width: dp(800),
			formControllerUrl: 'projects2/recursiveUpdate',
			buttons: [
				{
					text: t("Save"),
					handler: function () {
						var type_id = this.selectType.getValue();
						var template_id = this.selectTemplate.getValue();
						var status_id = this.selectStatus.getValue();

						if( !Ext.isNumber(type_id) && !Ext.isNumber(template_id) && !Ext.isNumber(status_id)) {
							Ext.MessageBox.alert(t('Error'), t('Please select one or more fields to update or close this window'));
							return false;
						}
						this.submitForm(true);
					},
					scope: this
				}, {
					text: t("Close"),
					handler: function () {
						this.hide();
					},
					scope: this
				}
			]
		});

		GO.projects2.RecursiveUpdateDialog.superclass.initComponent.call(this);

	},

	submitForm : function(hide) {
		this.formPanel.form.submit({
			url : GO.url('projects2/recursiveUpdate/submit'),
			waitMsg : t("Saving..."),
			success : function(form, action) {
				if (hide) {
					this.hide();
				}
			},
			failure : function(form, action) {
				if (action.failureType == 'client') {
					GO.errorDialog.show(t("You have errors in your form. The invalid fields are marked."));
				} else {
					GO.errorDialog.show(action.result.feedback);
				}
			},
			scope : this
		});

	},

	afterSubmit : function (action) {},

	buildForm : function () {
		this.selectType = new GO.projects2.SelectType({
			anchor:'100%',
			allowBlank:true
		});

		this.selectTemplate = new GO.projects2.SelectTemplate({
			anchor: '100%',
			allowBlank: true
		})

		this.selectStatus = new Ext.form.ComboBox({
			anchor:'100%',
			fieldLabel: t("Status", "projects2"),
			hiddenName:'status_id',
			store:GO.projects2.statusesStore,
			valueField:'id',
			displayField:'name',
			mode: 'local',
			triggerAction: 'all',
			editable: false,
			selectOnFocus:true,
			forceSelection: true,
			allowBlank:true
		});
		//
		// this.permissionsPanel = new GO.grid.PermissionsPanel({
		// 	isOverwritable: true,
		// 	levels: [
		// 		GO.permissionLevels.read,
		// 		GO.permissionLevels.create,
		// 		GO.permissionLevels.write,
		// 		GO.permissionLevels.writeAndDelete,
		// 		GO.projects2.permissionLevelFinance, //finance
		// 		GO.permissionLevels.manage
		// 	],
		// 	levelLabels : {
		// 		45: "Finance"
		// 	}
		// });
		this.addPanel({
			layout: 'form',
			cls: 'go-form-panel',
			region: 'north',
			defaults: {
				width: 300
			},
			height: 170,
			items: [
				this.projectId = new Ext.form.Hidden({
					name: 'project_id'
				}),
				this.selectTemplate,
				this.selectType,
				this.selectStatus
			// ,this.permissionsPanel
			]
		});
	},

	afterShowAndLoad : function (remoteModelId, config) {
		this.selectTemplate.store.load();
		GO.projects2.statusesStore.load();
	},


	getSubmitParams : function () {
		return {
			filters: Ext.encode(this.editGrid.getGridData(false))
		};
	},

	show :function (project_id) {
		this.formPanel.baseParams.project_id = project_id;
		this.selectTemplate.store.baseParams.project_id = project_id;

		GO.projects2.RecursiveUpdateDialog.superclass.show.call(this);

		this.projectId.setValue(project_id);
	}
});
