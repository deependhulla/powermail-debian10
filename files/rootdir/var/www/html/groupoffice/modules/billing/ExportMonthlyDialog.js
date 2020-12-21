GO.billing.ExportMonthlyDialog = Ext.extend(GO.Window, {

	exportController: "billing/exportMonthly",

	initComponent: function () {

		Ext.applyIf(this, {
			title: t("Monthly invoice export", "billing"),
			modal: false,
			height: dp(240),
			width: dp(350),
			layout: 'form',
			closeAction: 'hide',
			buttons: [
				{
					text: t("Ok"),
					handler: function () {
						this.submitForm();
					},
					scope: this
				}, {
					text: t("Close"),
					handler: function () {
						this.hide()
					},
					scope: this
				}
			]
		});

		this.bookStare = new GO.billing.SelectBook({
			store:GO.billing.readableBooksStore
		});

		this.yearStore = new Ext.data.ArrayStore({
			fields: ['year'],
			idIndex: 0
		});

		this.monthStore = new Ext.data.SimpleStore({
			fields: ['name', 'number'],
			data: [
				["--", 0],
				[t("full_months")[1], 1],
				[t("full_months")[2], 2],
				[t("full_months")[3], 3],
				[t("full_months")[4], 4],
				[t("full_months")[5], 5],
				[t("full_months")[6], 6],
				[t("full_months")[7], 7],
				[t("full_months")[8], 8],
				[t("full_months")[9], 9],
				[t("full_months")[10], 10],
				[t("full_months")[11], 11],
				[t("full_months")[12], 12]
			]
		});

		var currentTime = new Date();
		this.thisYear = currentTime.getFullYear();
		this.thisMonth = currentTime.getMonth();

		var data = [];
		for (var i = this.thisYear - 7; i < this.thisYear + 5; i++) {
			data.push([i]);
		}

		this.yearStore.loadData(data);

		this.yearCombo = new GO.form.ComboBox({
			fieldLabel: t("Year"),
			hiddenName: 'year',
			anchor: '100%',
			value: this.thisYear,
			store: this.yearStore,
			valueField: 'year',
			displayField: 'year',
			mode: 'local',
			triggerAction: 'all',
			editable: true,
			selectOnFocus: true,
			forceSelection: true,
			allowBlank: false
		});

		this.monthCombo = new GO.form.ComboBox({
			fieldLabel: t("Month"),
			hiddenName: 'month',
			anchor: '100%',
			value: this.thisMonth,
			store: this.monthStore,
			valueField: 'number',
			displayField: 'name',
			mode: 'local',
			triggerAction: 'all',
			editable: false,
			forceSelection: true,
			allowBlank: false
		});

		this.formPanel = new Ext.form.FormPanel({
			standardSubmit: true,
			cls: 'go-form-panel',
			labelWidth: 70,
			autoHeight: true,
			url: GO.url(this.exportController + '/export'),
			items: [this.yearCombo, this.monthCombo, this.bookStare]

		});

		this.items = [
			this.formPanel
		]

		GO.dialog.ExportDialog.superclass.initComponent.call(this);
	},

	submitForm: function () {
		this.formPanel.form.getEl().dom.target = '_blank';
		this.formPanel.form.getEl().dom.action = GO.url(this.exportController + '/export');

		this.formPanel.form.submit({
			failure: function (form, action) {
				if (action.failureType == 'client')
					Ext.MessageBox.alert(t("Error"), t("You have errors in your form. The invalid fields are marked."));

			},
			scope: this
		});
	}

});