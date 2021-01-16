GO.billing.OrderPanel = Ext.extend(GO.DisplayPanel,{
	
	model_name : "GO\\Billing\\Model\\Order",
	stateId : 'bs-order-panel',
	editGoDialogId: 'order',
	loadUrl: "billing/order/display",

	template: '<h4 class="status" style="float:right; margin:12px 8px 0 0;{[values.status_color != "FFFFFF" ? \'background-color:#\'+values.status_color : \'\']}">{status_name}</h4>'+
		'<h3 class="title s8">{order_id} <small>({book_name})</small></h3>' +
		'<br style="clear:both">'+

		'<p class="s4 pad">\
			<label>'+t("Date", "billing")+'</label>\
			<span>{btime}</span><br><br>\
			<tpl if="!GO.util.empty(reference)">\
			<label>'+t("Reference", "billing")+'</label>\
			<span>{reference}</span></tpl>\
		</p>'+
		'<p class="s4">'+
			'<label>'+t("Customer address", "billing")+'</label><span>{customer_to}</span><br>'+
			'<tpl if="!GO.util.empty(google_maps_link)"><a href="{google_maps_link}" target="_blank"></tpl>'+
			'{formatted_address}'+
			'<tpl if="!GO.util.empty(google_maps_link)"></a></tpl>\
		</p>\
		<p class="s4">\
			<label>'+t("Customer")+'</label>\
			<span>{[values.company_id ? \'<a href="#contact/\'+values.company_id+\'">\'+values.customer_name+\'</a>\' : values.customer_name]}</span><br>\
			<tpl if="!GO.util.empty(customer_contact_name)">\
			<span>{[values.contact_id ? \'<a href="#contact/\'+values.contact_id+\'">\'+values.customer_contact_name+\'</a>\' : values.customer_contact_name]}</span><br>\
			</tpl>\
			<tpl if="!GO.util.empty(customer_email)"><span>{[GO.mailTo(values.customer_email)]}</span></tpl>\
			</p><br style="clear:both">',
	
	editHandler : function(){
		if(this.data.read_only != '1'){
			GO.billing.showOrderDialog(this.link_id);
		}
	},
	initComponent : function(){

		this.orderStatusesStore = new GO.data.JsonStore({
			url: GO.url('billing/status/store'),
			baseParams: {
				task: 'order_statuses',
				permissionLevel: GO.permissionLevels.manage,
				book_id: 0
			},
			root: 'results',
			id: 'id',
			totalProperty:'total',
			fields: ['id','name', 'status_with_count', 'checked', 'ask_to_notify_customer'],
			remoteSort: true
		});

		this.template +=  '<table class="display-panel" cellpadding="0" border="0">'+
		'<tpl if="items.length">'+
			'<tr>'+
			'<td class="table_header_links" style="width:16px">'+t("Quantity", "billing")+'</td>'+
			'<td class="table_header_links" style="width:16px">'+t("Delivered", "billing")+'</td>'+
			'<td class="table_header_links">'+t("Description")+'</td>'+
			'<td class="r table_header_links">'+t("Unit price", "billing")+'</td>'+
			'<td class="r table_header_links">'+t("Sub-total", "billing")+'</td>'+
			'</tr>'+
			'<tpl for="items">'+
				'<tr id="pm-item-row-{id}" class="line">'+
				'<td>{amount}</td>'+
				'<td>{amount_delivered}</td>'+
				'<td>{description}</div></td>'+
				'<td class="r" style="white-space:nowrap">{unit_price}</td>'+
				'<td class="r" style="white-space:nowrap">{subtotal}</td>'+
				'</tr>'+
			'</tpl>'+
		'</tpl>'+
		'<tr class="totals"><th class="r" colspan="4">'+t("Costs", "billing")+'</th><td class="r">{costs}</td></tr>'+
		'<tr class="totals"><th colspan="4" class="r">'+t("Sub-total", "billing")+'</th><td class="r">{subtotal}</td></tr>'+
		'<tr class="totals">' +
			'<th colspan="4" class="r">'+t("Tax", "billing")+' <tpl if="!GO.util.empty(customer_vat_no)"><small>({customer_vat_no})</small></tpl></th>' +
			'<td class="r">{vat}</td>' +
			'</tr>'+
		'<tr class="totals"><th colspan="4" class="r">'+t("Total", "billing")+'</th><td class="r"><b>{total}</b></td></tr></table>'+

		'<hr><p class="pad s4">\
			<label>'+t("Owner")+'</label><span>{user_name}</span><br>\
			<tpl if="!GO.util.empty(recur_type)"><br>\
				<label>'+t("Recur", "billing")+'</label>\
				<span>{[this.showRecurrence(values)]}</span><br>\
			</tpl>\
		</p>\
		<tpl if="!GO.util.empty(po_id)"><p class="s4">\
			<label>'+t("Purchase order", "billing") +'</label>\
			<span>{po_id}</span>\
		</p></tpl>'+

		'<tpl if="!GO.util.empty(other_shipping_address)"><p class="s4"><label>'+t("Shipping address", "billing")+'</label>\
			{shipping_to}<br>\
			<tpl if="!GO.util.empty(shipping_google_maps_link)"><a href="{shipping_google_maps_link}" target="_blank"></tpl>\
			{formatted_shipping_address}\
			<tpl if="!GO.util.empty(shipping_google_maps_link)"></a></tpl>\
		</p></tpl>';

		this.template +='<table class="display-panel" cellpadding="0" cellspacing="0" border="0">'+
			'<tpl if="show_sales_agents &gt; 0">'+
			'<tpl if="!GO.util.empty(telesales_agent_name)">'+
			'<tr><td>'+t("Phone sales agent", "billing")+':</td><td>{telesales_agent_name}</td></tr>'+
			'</tpl>'+

			'<tpl if="!GO.util.empty(fieldsales_agent_name)">'+
			'<tr><td>'+t("Field sales agent", "billing")+':</td><td>{fieldsales_agent_name}</td></tr>'+
			'</tpl>'+
			'</tpl>';

		if(go.Modules.isAvailable("legacy", "projects2")){
			this.template += '<tpl if="!GO.util.empty(project_name)">'+
				'<tr>'+
				'<td>'+t("Project", "projects2")+'</td><td><a href="#project/{project_id}">{project_name}</a></td>'+
				'</tr></tpl>';
		}
		this.template += '</tr></table>';

		if(go.Modules.isAvailable("legacy", "workflow")){
			this.template +=GO.workflow.WorkflowTemplate;
		}

		if(go.Modules.isAvailable("legacy", "lists"))
			this.template += GO.lists.ListTemplate;

		Ext.apply(this.templateConfig,{
			showRecurrence : function(values) {
				var labels = {W: t("Weeks"), M: t("months"), Y: t("Years")};
				return '<a href="#order/'+values.recurred_order_id+'">'+values.recur_number+' ' +labels[values.recur_type]+'</a>';
			}
		});
						
		GO.billing.OrderPanel.superclass.initComponent.call(this);

		this.insert(1, this.frontPagePanel = new Ext.Panel({
			title: t("Frontpage", "billing"),
			collapsible: true,
			tpl:'<p class="pad">{frontpage_text:raw}</p>'
		}));

		this.insert(2,this.paymentsPanel = new Ext.Panel({
			title: t("Payments", "billing"),
			collapsible: true,
			tpl:'<tpl if="payments && payments.length">'+
				'<table class="display-panel" cellpadding="0" border="0">'+
					'<tr>'+
						'<td class="table_header_links">'+t("Date")+'</td>'+
						'<td class="r table_header_links">'+t("Amount", "billing")+'</td>'+
					'</tr>'+
					'<tpl for="payments">'+
					'<tr id="pm-payment-row-{id}">'+
						'<td>{date}</td>'+
						'<td class="r">{amount}</td>'+
					'</tr>'+
					'</tpl>'+
					'<tr class="totals">'+
						'<th class="r" style="border-top: 1px solid #eee;">'+t("Total paid", "billing")+'</th>'+
						'<td class="r" style="border-top: 1px solid #eee;">{total_paid}</td>'+
					'</tr>'+
					'<tr class="totals">'+
						'<th class="r">'+t("Total outstanding", "billing")+'</th>'+
						'<td class="r"><b>{total_outstanding}</b></td>'+
					'</tr>'+
				'</table></tpl>',
			bbar:[{
				text: t("Add Payment", "billing"),
			 	handler: function(){ GO.billing.addPayment(this.data.id) },
				scope:this
			}]
		}));

		this.insert(3,new Ext.Panel({
			title:t("Order status history", "billing"),
			collapsible: true,
			tpl:'<tpl if="status_history.length">'+
				'<table class="display-panel bs-display-items" cellpadding="0" cellspacing="0" border="0">'+
				//LINK DETAILS
				'<tr>'+
				'<td class="table_header_links">'+t("Status", "billing")+'</td>'+
				'<td class="table_header_links">' + t("Owner") + '</td>'+
				'<td class="table_header_links" style="width:100px">'+t("Created at")+'</td>'+
				'<td class="table_header_links" style="width:50px">'+t("Notified", "billing")+'</td>'+
				'</tr>'+
				'<tpl for="status_history">'+
				'<tr id="pm-status-history-{id}">'+
				'<td>{status_name}</td>'+
				'<td>{user_name}</div></td>'+
				'<td>{ctime}</td>'+
				'<td><tpl if="notified&gt;0"><div class="go-grid-icon btn-ok"><a href="#savedemail/{[Ext.util.Format.htmlEncode(values.notification_email)]}"><i class="icon">mail</i></a></div></tpl></td>'+
				'</tr>'+
				'</tpl>'+
				'</table></tpl>'
		}));

		this.add(go.customfields.CustomFields.getDetailPanels("Order"));

		this.add(new go.detail.CreateModifyPanel());
	},

	afterLoad: function(data) {
		this.frontPagePanel.setVisible(data.frontpage_text.length && data.frontpage_text!='<br>' && data.frontpage_text!='<br />');
		this.paymentsPanel.setVisible(data.status_id != 0);
		this.paymentsPanel.setTitle(t('Payments', 'billing') + (data.payment_method ? ' <small>('+data.payment_method+')</small>' : '') );
	},

	setData : function(data) {
		GO.billing.OrderPanel.superclass.setData.call(this, data);

		this.setStatusMenu();

		//this.getTopToolbar().setDisabled(!data.write_permission);
		if(this.data.read_only == '1')
			this.editButton.disable();

		this.changeStatus.setDisabled(!data.write_permission);
		this.documentItem.setDisabled(!data.write_permission);

		this.deliveryButton.setVisible(data.is_purchase_order_book);

		if(data.write_permission)
		{
			if(this.scheduleCallItem)
			{
				this.scheduleCallItem.setLinkConfig({
					name: this.data.customer_contact_name,
					model_id: this.data.contact_id,
					model_name:"GO\\Addressbook\\Model\\Contact",
					callback:this.reload,
					scope: this
				});
			}
		}
	},
	
	reset : function(){
		
		this.getTopToolbar().setDisabled(true);
		GO.billing.OrderPanel.superclass.reset.call(this);
	},

	getFile : function(order_id, is_pdf, status_id)
	{
		if(!status_id)
			status_id = 0;
		
		if(is_pdf){
			window.open(GO.url('billing/order/pdf',{id:order_id,status_id:status_id}));
		}else{
			GO.request({
				params:{
					id: order_id,
					status_id : status_id
				},
				url:"billing/order/odf",
				success: function(response, options, result){
					GO.files.openFile({id: result.file_id});															
				},
				scope:this
			});
		}		
	},

	savePDF: function(order_id, status_id)
	{
		if(!status_id) {
			status_id = 0;
		}
		GO.request({
			maskEl: Ext.getBody(),
			params:{
				id: order_id,
				status_id: status_id
			},
			url:"billing/order/savepdf",
			success: function(response, options, result) {
				this.reload();
				Ext.Msg.confirm(
					result.title,
					result.message,
					function(el){
						if(el == 'yes') {
							GO.files.openFile({id: result.file_id});
						}
					},
					this);
			},
			scope: this
		});
	},

	showMessage: function(path) {
		GO.linkHandlers['GO\\Savemailas\\Model\\LinkedEmail'].call(this, 0, {action:'path', path: path});
	},
	
	createTopToolbar : function(){

		if (GO.util.empty(this.extraMenuItems)) // used in MainPanel.js of order planning module
			this.extraMenuItems = new Array();

		var tbar = GO.billing.OrderPanel.superclass.createTopToolbar.call(this);

		var menuItems = [{
				iconCls: 'filetype-pdf',
				text: t("Download PDF","billing"),
				handler: function() {
					if(this.data.status_id>0) {
						this.getFile(this.data.id, true);
					}else {
						this.showOrderStatusSelect(true);
					}
				},
				scope: this
			},
			{
				iconCls: 'filetype-pdf',
				text: t("Save PDF","billing"),
				handler: function() {
					if(this.data.status_id > 0) {
						this.savePDF(this.data.id, this.data.status_id);
					} else {
						this.showOrderStatusSelect(true);
					}
				},
				scope: this

			},this.documentItem = new Ext.menu.Item({
				iconCls: 'filetype-doc',
				text: 'Document',
				handler: function()
				{
					if(!GO.util.empty(this.data.is_purchase_order_book))
					{
						if(this.data.status_id>0)
							this.createPurchaseOrders(0, this.data.id);
						else
							alert("Please assign a status to the order first");
					}else
					{
						if(this.data.status_id>0)
						{
							this.getFile(this.data.id);
						}else
						{
							this.showOrderStatusSelect(false);
						}
					}
				},
				scope: this
			}),{
				iconCls: 'ic-email',
				text: t("E-mail"),
				handler: function(){
					if(!GO.settings.modules.email)
					{
						GO.errorDialog.show(t("E-mail module is not installed.", "billing"));
					}else
					{
						if(this.data.status_id>0)
						{
							var composer = GO.email.showComposer({
								//link_config:this.newMenuButton.menu.link_config,
								loadUrl: GO.url("billing/order/send"),
								loadParams:{
									id: this.data.id
								},
								template_id: 0,
								disableTemplates:true
							});

							composer.createLinkButton.addLink("Order", this.data.id);
						}else
						{
							this.showOrderStatusSelect(true, true);
						}
					}

				},
				scope:this
			},{
				iconCls: 'ic-content-copy',
				text: t("Duplicate", "billing"),
				handler: function(){

					GO.mainLayout.tabPanel.setActiveTab('go-module-panel-billing');

					GO.billing.duplicateDialog.show(this.data.id, this.data.book_id);
				},
				scope:this
			},this.deliveryButton = new Ext.menu.Item({
				iconCls: 'ic-local-shipping',
				text: t("Delivery", "billing"),
				handler: function(){
					if(!GO.billing.deliveryDialog)
					{
						GO.billing.deliveryDialog = new GO.billing.DeliveryDialog();
					}

					GO.billing.deliveryDialog.show(this.data.id);

				},
				scope:this
			}),this.changeStatus = new Ext.menu.Item({
				iconCls: 'ic-turned-in',
				text: t("Change status", "billing"),
				menu: this.statusMenu = new Ext.menu.Menu()
			})];

		for (var i=0; i<this.extraMenuItems.length; i++) {
			menuItems.push(this.extraMenuItems[i]);
		}

		this.actionsButton = new Ext.menu.Item({
			iconCls: 'btn-actions',
			text: t("Actions"),
			menu: new Ext.menu.Menu({
				items: menuItems
			})
		});
		
		this.moreButton.menu.items.removeAt(0); // Remove printer button
		this.moreButton.menu.add(menuItems);

		return tbar;
	},    
	
	showOrderStatusSelect : function(pdf, email){
		this.is_pdf=pdf;
		this.email=email
		if(!this.orderStatusWindow)
		{
			this.orderStatusWindow = new GO.billing.OrderStatusWindow({
				scope:this,
				handler:function(status_id){
					if(this.email){
						GO.email.showComposer({
							link_config:this.newMenuButton.menu.link_config,
							loadUrl: GO.url("billing/order/send"),
							loadParams:{
								id: this.data.id,
								status_id: status_id
							},
							template_id: 0
						});
					}else
					{
						this.getFile(this.data.id, this.is_pdf, status_id);
					}
				}
			});
		}	
		
		this.orderStatusWindow.show();
	},    
    
	createPurchaseOrders : function(is_pdf, order_id)
	{
		GO.request({
			url:"billing/order/createPurchaseOrderDocuments",
			params:{			
				id:order_id,
				is_pdf: is_pdf
			},
			success: function(response, options, result){
				this.reload();
				Ext.Msg.alert(t("Success"), result.feedback);
			},
			scope:this
		});
	},
	
	getLinkName : function(){

		if(!this.data.order_id){
			return t("Scheduled order", "billing");
		} else {
			return this.data.order_id;
		}
	},

	setStatusMenu : function(refresh){

		if(this.orderStatusesStore.baseParams.book_id!=this.data.book_id || refresh){
			this.orderStatusesStore.baseParams.book_id=this.data.book_id;
			this.orderStatusesStore.load({
				callback:function(){
					this.statusMenu.removeAll();
					this.suppressCheck=true;
					this.orderStatusesStore.each(function(r)
					{
						this.statusMenu.add({
							text:r.data.name,
							status_id:r.data.id,
							group:'status-'+this.getId(),
							checked:this.data.status_id==r.data.id,
							checkHandler:function(i){
								if(!this.suppressCheck){

									var changeStatus = function(id, status, notify) {
										GO.request({

												maskEl:Ext.getBody(),
												url:"billing/order/submit",
												params:{                                                    
													id: id,
													status_id:status,
													notify_customer: notify
												},
												success:function(options, response, data){

                                                    
													if(!data.success)
													{
														GO.errorDialog.show(data.feedback);
                                                                                                                
														this.suppressCheck=true;
														this.statusMenu.items.each(function(i){
															i.setChecked(i.status_id==this.data.status_id, true);
														}, this);
														this.suppressCheck=false;
													}else
													{
														this.reload();
														//check if it's not a popup

														var billing = GO.mainLayout.getModulePanel('billing');

														if(billing.centerPanel.store.baseParams.book_id==this.data.book_id){
															billing.centerPanel.store.reload();
														}
														if (!GO.util.empty(data.showTaskId)) {
															go.Router.goto("task/" + data.showTaskId);
														}
													}
												},
												scope:this
											});
									}.createDelegate(this);
									
									if(r.data.ask_to_notify_customer) {
										Ext.Msg.show({
											modal:false,
											title:t("Notify customer?", "billing"),
											msg: t("Do you want to send an e-mail to the customer about this status change?", "billing"),
											buttons: Ext.Msg.YESNOCANCEL,
											fn: function(btn){
												if(btn=='cancel'){

													//reset the checked item
													this.suppressCheck=true;
													this.statusMenu.items.each(function(i){
														i.setChecked(i.status_id==this.data.status_id, true);
													}, this);
													this.suppressCheck=false;

													return false;
												}
												changeStatus(this.data.id, i.status_id, btn=='yes' ? 1 : 0);
											},
											scope:this,
											icon: Ext.MessageBox.QUESTION
										});
									} else {
										changeStatus(this.data.id, i.status_id, 0);
									}
								}
							},
							scope:this
						});
					}, this);
					this.suppressCheck=false;
				},
				scope:this
			});
			
		}else
		{
			this.suppressCheck=true;
			this.statusMenu.items.each(function(i){
				i.setChecked(i.status_id==this.data.status_id, true);
			}, this);
			this.suppressCheck=false;
		}
	}
});

/**
 * Show a dialog to add payments to the given order
 * 
 * @param int orderId
 * @returns {undefined}
 */
GO.billing.addPayment = function(orderId) {
	
	if(!this.paymentDialog){
		this.paymentDialog = new GO.billing.PaymentDialog();
	}
		
	this.paymentDialog.setOrderId(orderId);
	this.paymentDialog.show();		
};


