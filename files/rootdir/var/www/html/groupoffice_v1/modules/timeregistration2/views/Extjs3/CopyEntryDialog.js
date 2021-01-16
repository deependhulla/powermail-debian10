/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: CopyEntryDialog.js 22939 2018-01-12 08:01:21Z mschering $
 * @copyright Copyright Intermesh
 * @author Richard van Dartel <rvdartel@intermesh.nl>
 */
GO.timeregistration2.CopyEntryDialog = Ext.extend(GO.dialog.TabbedFormDialog, {

	selectedIds: [],
	timeEntryGridStore: {},
	copyTimeEntry: function() {
		this.selectedDate = this.datePicker.activeDate.format(GO.settings.date_format);

		GO.request({
			url:'timeregistration2/timeEntry/copyTimeEntry',
			params:{
				selectedIds:this.selectedIds,
				selectedDate: this.selectedDate
			},
			success:function(){
				this.timeEntryGridStore.reload();
				this.hide();
				Ext.Msg.alert(t("Success","timeregistration2"),t("Succesfully copied selected time entries","timeregistration2"))
			},
			scope:this
		});
	},
	initComponent: function() {

		Ext.apply(this, {
			layout: 'fit',
			title: t("Copy time entry", "timeregistration2"),
			width: 250,
			height: 380,
			resizable: false,
			formControllerUrl: 'timeregistration2/employee'
		});

		this.buttons=[
		{
			text:t("Copy", "timeregistration2"),
			handler: this.copyTimeEntry,
			scope: this
		}];



		GO.timeregistration2.CopyEntryDialog.superclass.initComponent.call(this);
	},
	buildForm: function() {

		this.formPanel = new Ext.Panel({
			cls: 'go-form-panel',
			layout: 'form',
			labelWidth: 140,
			items: [this.datePicker = new Ext.DatePicker({
					internalRender: true,
					xtype: 'datepicker',
					name: 'due_time',
					format: GO.settings.date_format,
					hideLabel:true
				})
			]
		});

		this.addPanel(this.formPanel);
	}
});
