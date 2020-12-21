/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: TicketPanel.js 23473 2018-03-07 09:55:57Z mdhart $
 * @copyright Copyright Intermesh
 * @author Michiel Schmidt <michiel@intermesh.nl>
 * @author Merijn Schering <mschering@intermesh.nl>
 */
GO.tickets.TicketPanel = Ext.extend(GO.DisplayPanel,{

	model_name : "GO\\Tickets\\Model\\Ticket",
	stateId : 'ti-ticket-panel',
	editGoDialogId : 'ticket',
	is_claimed: false,
	is_claimed_by_user : 0,
	status_id: 0,
	user_id:0,
	company_id:0,
	showComments:false,
	
	/**
	 * Use this to add extra detail to the display panel
	 */
	template_extra:'',

	template_head: '<h4 style="text-transform:uppercase; float:right; padding:12px 8px 0 0;">{status_name}</h4>'+
		'<h3 class="title s8">'+
			'<tpl if="values.priority==2"><i class="icon">priority_high</i></tpl>' +
			'<tpl if="values.priority==0"><i class="icon">low_priority</i></tpl> {subject:raw}<br>'+
			'<small>#{ticket_number}</small>'+
		'</h3><br style="clear:both">'+

		'<p class="s4 pad">\
			<label>'+t("Responsible", "tickets")+'</label>\
			<span>{agent_name}</span><br><br>\
			<tpl if="company != \'\'">\
				<label>'+t("Company")+'</label>\
				<span>\
					<tpl if="company_id &gt; 0">'+(GO.addressbook ? '<a href="#contact/{company_id}">{company}</a>' : '{company}') +'</tpl>\
					<tpl if="company_id == 0">{company}</tpl>\
				</span>\
			<br><br></tpl>\
			<label>'+t("Contact")+'</label>\
			<span>\
				<tpl if="contact_id &gt; 0">'+(GO.addressbook ? '<a href="#contact/{contact_id}">{contact}</a>' : '{contact}') +'</tpl>\
				<tpl if="contact_id == 0">{contact}</tpl>\
			</span><br><br>\
			<label>'+t("Owner") +'</label>\
			<span>{user_name}</span>\
		</p>'+
		'<p class="s5">\
			<label>'+t("E-mail") +'</label>\
			<span>{[this.mailTo(values.email, values.contact)]}</span><br><br>\
			<tpl if="phone.length">\
				<label>'+t("Phone")+'</label>\
				<span>{[GO.util.callToLink(values.phone)]}</span>\
			</tpl>\
		</p>\
		<p class="s3">\
			<tpl if="values.due_date">\
				<label>'+t("Due at")+'</label>\
				<span>{due_date}</span><br><br>\
			</tpl>\
			<label>'+t("Type")+'</label>\
			<span>{type_name}</span><br><br>\
			<label>'+t("Ticket group", "tickets")+'</label>\
			<span>{group_name}</span>\
		</p><br style="clear:both">',

	editHandler : function(){
		GO.tickets.showTicketDialog(this.link_id);		
	},

	initComponent : function(){	
		this.template ='';

		this.messageForm = new GO.tickets.MessageForm();
		this.messageForm.on('save', function(){		
			var tp = GO.mainLayout.getModulePanel('tickets');
			if(tp){
				if(this.messageForm.statusChanged){
					tp.refresh();
				} else {
					tp.centerPanel.store.reload();
				}
			}
			this.reload();
			
			
		}, this);

		this.openButton = new Ext.Button({
			iconCls:"ic-reply",
			text:t("Reopen", "tickets"),
			tooltip:t("Reopen ticket", "tickets"),
			handler: function()
			{
				this.reopen();
			},
			hidden:true,
			scope:this
		});

		this.buttonAlign = 'left';
	this.buttons = [
		this.readButton = new Ext.Button({
			text:t("Read", "tickets"),
			enableToggle:true,
			toggleHandler: function(button, enabled)
			{
				GO.mainLayout.openModule("tickets").centerPanel.flagTickets([this.data.id], enabled ? '0' : '1');
			},
			scope:this
		}), '->',
			this.openButton,
			this.closeButton = new Ext.Button({
				hidden:true,
				iconCls: 'ic-lock',
				text: t("Close ticket", "tickets"),
				handler:function(){
					
					var doRequest = true;
					if(GO.tickets.show_close_confirm && !confirm(t("Are you sure you want to close this ticket?", "tickets"))){
						doRequest = false;
					}

					if(doRequest){
						GO.request({
							url:'tickets/ticket/close',
							params:{
								id:this.data.id
							},
							success:function(){
								this.reload();
								GO.tickets.ticketsGrid.store.reload();
							},
							scope:this
						});
					}
				},
				scope:this
			}),
			this.newMessageButton = new Ext.Button({
				disabled:true,
				iconCls: 'ic-reply',
				text:t("New message", "tickets"),
				handler:function(){
					this.messageForm.show(0,this.data);
				},
				scope:this
			})
		];

		this.store  = new GO.data.JsonStore({
			url:GO.url('tickets/ticket/display'),
			baseParams:{hiddenSections:''},
			root:'data',
			totalProperty:'total',
			fields:['id', 'agent_id', 'ticket_number', 'contact', 'contact_id', 'subject', 'email', 'phone',
			'ctime', 'create_by_name', 'mtime', 'type_name', 'status_name', 'status_id', 'agent_name', 'files_folder_id',
			'files', 'acl_id', 'priority', 'reload_ticketsgrid', 'user_id', 'muser_name', 'user_name', 'company_id',
			'company', 'comments', 'customFields', 'panelId', 'events', 'tasks', 'completed_tasks', 'is_note', 'links',
			"permission_level", 'model_name', 'model_name_underscores', 'unseen', 'workflow', 'type_id', 'group_name',
			'timeEntries', 'timeEntriesTotal','muser_id', 'due_date', {name: 'rate_totals'}, {name:'messages'}
			]
		});

		this.store.on('beforeload',function(){
			this.getEl().mask(t("Loading..."));
		}, this);
		this.store.on('load', function(){
			this.getEl().unmask();
			//this.setCompanyId(this.store.getAt(0).data.company_id);
		}, this);

		var tpl =
		'<tpl for=".">'+
			'<div id="ti-messages-{id}">'+
		'<tpl for="messages">'+
			'<div class="msg-wrap<tpl if="user_id==GO.settings.user_id && !is_note"> to</tpl><tpl if="user_id!=GO.settings.user_id && !is_note"> from</tpl><tpl if="is_note"> note</tpl>" id="{message_id}">'+
			'<tpl if="user_id==GO.settings.user_id && !is_note"><div class="ti-msg to">{[go.util.avatar(values.from_name, values.agent_image)]}<div class="arrow"></div></div></tpl>'+
			'<tpl if="user_id!=GO.settings.user_id && !is_note"><div class="ti-msg from">{[go.util.avatar(values.from_name, values.agent_image)]}<div class="arrow"></div></div></tpl>'+
			'<div class="msg-head"><span class="msg-left">{from_name}'+
			'</span>'+
			'<span class="msg-right light">{ctime}</span></div>'+
			'<tpl if="content">'+
			'<div class="msg-content">{content:raw}</div>'+
			'</tpl>'+
			'<div class="msg-foot">'+
				'<tpl if="values.template_name && !is_note">'+
					'<span class="msg-right light">'+
					'{template_name}' +
					'</span>'+
				'</tpl>'+
				'<tpl if="is_note">'+
					'<span class="msg-right light">'+
					t("Note", "tickets") +
					'</span>'+
				'</tpl>'+
				'<tpl if="!Ext.isEmpty(status) || !Ext.isEmpty(type)">'+
					'<span class="msg-left">'+
					'<tpl if="status.length">'+
					t("* Status changed to", "tickets")+': {status}' +
					'</tpl><tpl if="!Ext.isEmpty(type)"><tpl if="!Ext.isEmpty(status)"><br></tpl>'+
					t("* Type changed to", "tickets")+': {type}' +
					'</tpl>'+
					'</span>'+
				'</tpl>'+
			'</div>'+
			'<tpl if="rate_name!=\'\'">'+
				'<div class="ti-rate">{rate_name}: {rate_hours}</div>'+
			'</tpl>'+
			'<tpl if="num_files">'+
				'<div style="padding: 8px">' + 
				'<div title="'+t("Attachments", "tickets")+'" class="ti-icon-attach"></div>&nbsp;'+
				'<tpl for="files">'+
					'<a class="filetype-link filetype filetype-{extension}" data-index="{index}">{name}</a>'+
		//		if(go.Modules.isAvailable("legacy", "files"))
		//			tpl += ' onclick="{handler"';
		//		else
		//			tpl += 'href="'+GO.url("files/file/download",{id:'_id_'}).replace('_id_','{id}')+'"';
				'</tpl></div>'+
			'</tpl>'+
			'<div class="x-clear"></div>'+
			'</div>'+
			
		'</tpl>'+
			'<tpl if="rate_totals.length">'
			
			+ '{[this.collapsibleSectionHeader("' + t("Rate totals", "tickets") + '", "rt-rates-{id}","name")]}'
			+ '<table cellpadding="0" cellspacing="0" border="0" class="display-panel" id="rt-rates-{id}">'
			
//			+ '<div class="display-panel-heading">' + t("Rate totals", "tickets") + '</div>'
//			+ '<table class="ti-rate-totals" cellpadding="0" cellspacing="0">'
			+ '<tpl for="rate_totals">'
			+ '<tr><td>{name} :</td><td>{amount}</td></tr>'
			+ '</tpl>'
			+ '</table>'
			+ '</tpl>';


		var tplConfig={};

		if(go.Modules.isAvailable("legacy", "workflow"))
			tpl += GO.workflow.WorkflowTemplate;

		tplConfig= Ext.apply(tplConfig, GO.linksTemplateConfig);

		//tpl += GO.createModifyTemplate;
		tpl += '</tpl>';

		tplConfig.panel=this;

		tplConfig.collapsibleSectionHeader = function(title, id, dataKey){
			this.panel.collapsibleSections[id]=dataKey;

			return '<div class="collapsible-display-panel-header">'+title+'<div class="x-tool x-tool-toggle" style="float:right;cursor:pointer" id="toggle-'+id+'">&nbsp;</div></div>';
		};
		
		tplConfig = this.extraConfig(tplConfig);

		tplConfig = Ext.apply(tplConfig, {
			addSlashes : function(str)
			{
				str = GO.util.html_entity_decode(str, 'ENT_QUOTES');
				str = GO.util.add_slashes(str);
				return str;
			},
			mailTo : function(email, name)
			{
				return '<a href="mailto:&quot; ' + GO.util.html_entity_decode(name, 'ENT_QUOTES') + '&quot; &lt;'+email+'&gt;">'+email+'</a>';
			}
		});
			
		this.deleteContextMnuItem = new Ext.menu.Item({
			iconCls: 'ic-delete',
			text: t("Delete"),
			scope:this,
			handler: function()
			{
				if(confirm(t("Are you sure you want to delete the selected item?"))){
					GO.request({
						url:'tickets/message/delete',
						params:{id: this.messageContextMnu.record.id},
						success:function(){
							this.reload();
						},
						scope:this
					});
				}
			}
		});
		
		this.editContextMnuItem = new Ext.menu.Item({
			iconCls: 'ic-edit',
			text: t("Edit"),
			handler: function() {
				this.messageForm.show(this.messageContextMnu.record.id,this.data);
			},scope:this
		});
		
		this.messageContextMnu = new Ext.menu.Menu({
			scope:this,
			items:[
				this.editContextMnuItem,
				this.deleteContextMnuItem
			]
		});

		this.messagesView =  new Ext.DataView({
			store:this.store,
			singleSelect:true,
			scope:this,
			itemSelector:'div.msg-wrap',
			//emptyText:t("No items to display"),
			tpl: new Ext.XTemplate(tpl,tplConfig),
		});
		
		this.messagesView.on("contextmenu", function(dv, index, node, e){
			e.stopEvent();		

			if((this.data.messages[index].user_id == GO.settings.user_id || GO.settings.modules.tickets.permission_level >= GO.permissionLevels.manage)){
				this.editContextMnuItem.setDisabled(false);
			} else {
				this.editContextMnuItem.setDisabled(true);
			}
	
			if(GO.settings.modules.tickets.permission_level >= GO.permissionLevels.manage){
				this.deleteContextMnuItem.setDisabled(false);
			} else {
				this.deleteContextMnuItem.setDisabled(true);
			}
	
			if(this.isAgent()){
				this.messageContextMnu.record = this.data.messages[index];
				this.messageContextMnu.showAt(e.xy);
			}
		}, this);

		this.messagesView.on('click', function(dataview, index, node, e){			
			
			if(e.target.classList.contains('filetype')) {
				var fileIndex = e.target.getAttribute("data-index");
				var file = this.data.files[fileIndex];

				if(file.extension=='folder')
				{
					GO.files.openFolder(this.data.files_folder_id, file.id);
				}else
				{
					if(GO.files){
						//GO.files.openFile({id:file.id});
						file.handler.call(this);
					}else
					{
						window.open(GO.url("files/file/download",{id:file.id}));
					}
				}
				e.preventDefault();
			}
			
			if(e.target.tagName=='A' && e.target.attributes['href'])
			{
				var href = e.target.attributes['href'].value;
				window.open(href);
			}
		}, this);

		this.summaryView = new Ext.Panel({tpl:new Ext.XTemplate(this.template_head+this.template_extra, tplConfig)})
			
		GO.tickets.TicketPanel.superclass.initComponent.call(this);

		this.mainItem.insert(0,new Ext.Container({items:[
			this.summaryView,
			new Ext.Panel({
				autoHeight: true,
				title: t("Messages", "tickets"),
				collapsible: true,
				items:[this.messagesView]
			})
		]}));
		//this.mainItem.insert(1,this.messagesView);

		this.add(go.customfields.CustomFields.getDetailPanels("Ticket"));
		this.add(new go.detail.CreateModifyPanel());

	},

	extraConfig : function(config) {
		return config;
	},
	createTopToolbar : function(){


		var tbar = GO.tickets.TicketPanel.superclass.createTopToolbar.call(this);


		tbar.splice(1,0,'-');
		tbar.splice(2,0,this.claimButton = new Ext.Button({
			iconCls:"ic-chat-bubble",
			text:t("Claim", "tickets"),
			tooltip:t("Claim ticket", "tickets"),
			handler: function()
			{
				this.toggleClaim(1);
			},
//			hidden:true,
			scope:this
		}));
		tbar.splice(3,0,this.unclaimButton = new Ext.Button({
			iconCls:"ic-chat-bubble-outline",
			text:t("Unclaim", "tickets"),
			tooltip:t("Unclaim ticket", "tickets"),
			handler: function()
			{
				this.toggleClaim(0);
			},
//			hidden:true,
			scope:this
		}));
		
		return tbar;
		
	},

	afterLoad: function(data) {
		this.summaryView.update(data);
	},


	load : function(id, reload)
	{
		
		this.fireEvent('beforeload',this, id);
		
		if(this.collapsed){
			this.collapsedLinkId=id;
		}else if(this.link_id!=id || reload)
		{
			this.ticket_id = this.link_id  = this.model_id = id;

			if(!GO.tickets.statusesStore.loaded)
			{
				GO.tickets.statusesStore.load();
			}
			if(!GO.tickets.templatesStore.loaded)
			{
				GO.tickets.templatesStore.load();
			}

			this.store.baseParams.id = this.ticket_id;
			this.store.baseParams.hidden_sections=Ext.encode(this.hiddenSections);
			this.store.load({
				callback:function(){
					if(!this.store.getAt(0)){
						return;
					}	
					this.data = this.store.getAt(0).data;
					this.data.model_name=this.model_name;
					this.data.panelId=this.getId();

//					var title = t("Ticket", "tickets")+': #'+this.data.ticket_number+' '+this.data.subject;
//					this.setTitle('<div style="height:15px"><span style="overflow:hidden" title="'+title+'">'+title+'</span></div>');

					this.updateToolbar();

					this.readButton.toggle(GO.util.empty(this.data.unseen), true);

					//this.messageForm.prepareForm(this.data.id, this.data.status_id, this.data.status_name);
					for(var id in this.collapsibleSections){
						if(this.hiddenSections.indexOf(this.collapsibleSections[id])>-1){
							this.toggleSection(id, true);
						}
					}



					this.onLoad();

					this.afterLoad(this.data);
				},
				scope:this
			});
		}
	},
	getLinkName : function(){
		return this.data.ticket_number;
	},
	
	reset : function(){
		this.store.removeAll();
		var tbar = this.getTopToolbar();

		if(tbar)
			this.getTopToolbar().setDisabled(true);

		this.newMessageButton.setDisabled(true);
		
		this.link_id=0;		
		this.data={};
		this.ticket_id=0;
	},	
	isClaimedByMe : function(){
		return this.data.agent_id==GO.settings.user_id;
	},
	isClaimed : function(){
		return this.data.agent_id>0;
	},
	isAgent : function(){	
		var isAgent = this.data.permission_level==GO.permissionLevels.manage;	
		return isAgent;
	},
	
	isCustomer : function(){
		return !this.isAgent() && this.data.user_id==GO.settings.user_id;
	},
	
	updateToolbar : function()
	{
		this.getTopToolbar().setDisabled(false);
		
		this.newMessageButton.setDisabled(this.data.status_id == -1 || ((!this.isAgent() || !this.isClaimed()) && !this.isCustomer()));
		this.closeButton.setVisible(this.data.status_id != -1);
//		this.reopenButton.setVisible(this.data.status_id == -1 && this.isAgent());
		
		this.unclaimButton.setVisible(this.isClaimedByMe() && this.data.status_id != -1);
		this.claimButton.setVisible(!this.isClaimed() && this.data.status_id != -1);
		this.openButton.setVisible(this.data.status_id == -1);

		this.unclaimButton.setDisabled(!this.isClaimedByMe());
		this.claimButton.setDisabled(this.isClaimed() || !this.isAgent());

		this.openButton.setDisabled(!this.isAgent() || (GO.tickets.manage_permission_can_reopen && GO.settings.modules.tickets.permission_level < GO.permissionLevels.manage));
		this.editButton.setDisabled(!this.isAgent() || this.data.status_id == -1);

		if(this.fileBrowseButton){
			if(this.isAgent())
				this.fileBrowseButton.setId(this.data.id);
			else
				this.fileBrowseButton.setId(0);			
		}
		
		this.newMenuButton.setDisabled(!this.isAgent());
		
		this.readButton.setDisabled(this.data.permission_level<GO.permissionLevels.manage);
		
		// check buttons stil fit on te toolbar
		this.getTopToolbar().layout.fitToSize(this.getTopToolbar().getEl());
		
	},
	reopen : function()
	{
		GO.request({
			url: 'tickets/message/submit',
			params: {
				ticket_id: this.ticket_id,
				status_id: 0
			},
			scope: this,
			success: function(options, response, result)
			{				
				if (!result.success)
				{
					GO.errorDialog.show(result.feedback)
				} else
				{
					this.reload();

					GO.tickets.ticketsGrid.store.reload();
				}
			}
		});
	},

	toggleClaim : function(claimed)
	{
		GO.request({
			url: 'tickets/ticket/claim',
			params: {
				id: this.ticket_id,
				agent_id: claimed ? GO.settings.user_id : 0
			},
			scope: this,
			success: function(options, response, result)
			{			
				if (!result.success)
				{
					GO.errorDialog.show(result.feedback)
					this.store.reload();
				} else {
					
					this.data.agent_id=result.agent_id;
					this.updateToolbar();

					var store = this.store.data.items[0].data;
					store.agent_name = GO.settings.name;
					store.mtime = new Date().format(GO.settings.date_format+' '+GO.settings.time_format);

					GO.tickets.mainPanel.centerPanel.store.reload();
					this.messagesView.refresh();
				}
			}
		});
	}
});
