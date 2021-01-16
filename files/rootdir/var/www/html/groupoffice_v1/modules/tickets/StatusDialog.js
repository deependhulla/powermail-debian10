/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: StatusDialog.js 23368 2018-02-05 12:54:36Z mdhart $
 * @copyright Copyright Intermesh
 * @author Michiel Schmidt <michiel@intermesh.nl>
 * @author Merijn Schering <mschering@intermesh.nl>
 */

GO.tickets.StatusDialog = function(config){

	if(!config)
	{
		config = {};
	}

	this.buildForm();

	var focusFirstField = function(){
		this.formPanel.items.items[0].focus();
	};
    
	config.layout='fit';
	config.title=t("Status", "tickets");
	config.modal=false;
	config.border=false;
	config.width=400;
	config.resizable = true;
	config.autoHeight=true;
	config.resizable=false;
	config.plain=true;
	config.shadow=false,
	config.closeAction='hide';
	config.items=this.formPanel;
	config.focus=focusFirstField.createDelegate(this);
	config.buttons=[{
		text:t("Save"),
		handler: function()
		{
			this.submitForm(true)
		},
		scope: this
	}];
		
	GO.tickets.StatusDialog.superclass.constructor.call(this,config);
	
	this.addEvents({'save' : true});
}

Ext.extend(GO.tickets.StatusDialog, Ext.Window, {
	
	show : function (record)
	{		
		if(!this.rendered)
			this.render(Ext.getBody());

		this.status_id = 0;
		if(record) {
			this.status_id=record.data.id;
			if(GO.tickets.status_per_ticket_type) {
				this.formPanel.form.findField('type_id').setValue(record.json.type_id || "");
			}
		}
		
		if(this.status_id > 0) {
			this.formPanel.form.findField('name').setValue(record.data.name);
		} else {
			this.formPanel.form.reset();
		}
		GO.tickets.StatusDialog.superclass.show.call(this);
	},
	submitForm : function(hide)
	{
		this.formPanel.form.submit(
		{		
			url:GO.url("tickets/status/submit"),
			params: {
				id:this.status_id
			},
			waitMsg:t("Saving..."),
			success:function(form, action)
			{
				if(action.result.id) {
					this.status_id=action.result.id;
				}
			
				this.fireEvent('save');
				
				if(hide) this.hide();
			},
			failure: function(form, action) 
			{
				Ext.MessageBox.alert(t("Error"), (action.failureType == 'client') ?
					t("You have errors in your form. The invalid fields are marked.") :
					action.result.feedback);
			},
			scope:this
		});		
	},
	buildForm : function () 
	{
		var formItems = [{
			fieldLabel: t("Name"),
			name: 'name',
			allowBlank:false
		}];
		if(GO.tickets.status_per_ticket_type) {
			formItems.push(new GO.tickets.SelectType({allowBlank:true}));
		}

		this.formPanel = new Ext.FormPanel({
			cls:'go-form-panel',
			anchor:'100% 100%',
			bodyStyle:'padding:5px',
			defaults:{anchor: '95%'},
			defaultType:'textfield',
			autoHeight:true,
			waitMsgTarget:true,
			labelWidth:75,
			items: formItems
		});
		if(!GO.tickets.writableTypesStore.loaded)
			GO.tickets.writableTypesStore.load();
	}	
});
