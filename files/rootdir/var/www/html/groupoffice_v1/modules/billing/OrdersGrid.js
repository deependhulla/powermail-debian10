GO.billing.OrdersGrid = function(config){
	
	if(!config)
	{
		config = {};
	}

//	var summary = new Ext.grid.JsonSummary();
//
//	config.plugins = [summary];

	var fields ={
		fields : [
		'id',
		'late',
		'due_date',
		'overdue',
		'status_id',
		'status_name',
		'user_name',
		'order_id',
		'po_id',
		'ctime',
		'mtime',
		'btime',
			'dtime',
		'ptime',
		'costs',
		'subtotal',
		'vat',
		'total',
		'total_paid',
		'customer_name',
		'customer_contact_name',
		'customer_address',
		'customer_address_no',
		'customer_zip',
		'customer_city',
		'customer_state',
		'customer_country',
		'customer_vat_no',
		'customer_email',
		'customer_extra',
		'recur_type',
		'payment_method',
		'recurred_order_id',
		'reference',
		'read_only',
		'color',
		'project_name'].concat(go.customfields.CustomFields.getFieldDefinitions("Order")),
		columns :[
		{
			id: "id",
			header: t("ID", "billing"),
			dataIndex: 'order_id',
			renderer: this.renderOrderId,
			width: dp(140),
			resizable: true
			}, {
			id: "date",
			header: t("Date", "billing"),
			dataIndex: 'btime',
			xtype: "datecolumn",
				dateOnly: true
			}, {
			id: 'btime',
				header: t("Delivery date", "billing"),
				dataIndex: 'dtime',
				width: dp(110),
				hidden: true
			}, {
			id: 'status_name',
			header: t("Status", "billing"),
			dataIndex: 'status_name',
			width:dp(160),
			renderer: function(value,meta,record) {
				return '<div class="status" style="background-color: #'+record.data.color+';">'+value+'</div>';
			},
			groupRenderer: function(value) {
				return value;
			},
			summaryRenderer: function(value) {
				return '-';
			},
				resizable: true
		},		{
			id: "ptime",
			xtype: "datecolumn",
			header: t("Paid at", "billing"),
			dataIndex: 'ptime',
			hidden:true,
				dateOnly: true
		},		{
			header: t("Customer", "billing"),
			dataIndex: 'customer_name',
			id:'customer',
			width: dp(200)
		},{
			id:"payment_method",
			header: t("Payment method", "billing"),
			dataIndex: 'payment_method',
			hidden: true
		},		{
			id:"reference",
			header: t("Reference", "billing"),
			dataIndex: 'reference',
			hidden: true
		},{
			id: "po_id",
			header: t("Purchase order", "billing"),
			dataIndex: 'po_id',
			hidden:true
		},			{
				id: "costs",
			header: t("Costs", "billing"),
			dataIndex: 'costs',
			hidden:true,
			align: 'right'
		},		{
				id: "subtotal",
			header: t("Sub-total", "billing"),
			dataIndex: 'subtotal',
			align: 'right'
		},		{
				id: "vat",
			header: t("Tax", "billing"),
			dataIndex: 'vat',
			hidden:true,
			align: 'right'
		},{
				id: "total",
			header: t("Total", "billing"),
			dataIndex: 'total',
			align: 'right',
			hidden: true
		},{
				id: "total_paid",
			header: t("Total paid", "billing"),
			dataIndex: 'total_paid',
			align: 'right',
			hidden: true
		},	{
				id: "mtime",
			xtype: "datecolumn",
			header: t("Modified at"),
			dataIndex: 'mtime',
			hidden: true
		},		{
				id: "ctime",
			xtype: "datecolumn",
			header: t("Created at"),
			dataIndex: 'ctime',
			hidden:true
		},		{
				id: "customer_contact_name",
			header: t("Contact", "billing"),
			dataIndex: 'customer_contact_name',
			hidden:true
		}
		,		{
				id: "customer_address",
			header: t("Address"),
			dataIndex: 'customer_address',
			hidden:true
		},		{
				id: "customer_contact_no",
			header: t("No."),
			dataIndex: 'customer_address_no',
			hidden:true
		},		{
				id: "customer_zip",
			header: t("ZIP/Postal"),
			dataIndex: 'customer_zip',
			hidden:true
		},		{
				id: "customer_city",
			header: t("City"),
			dataIndex: 'customer_city',
			hidden:true
		},		{
				id: "customer_state",
			header: t("State"),
			dataIndex: 'customer_state',
			hidden:true
		},		{
				id: "customer_country",
			header: t("Country"),
			dataIndex: 'customer_country',
			hidden:true
		},		{
				id: "customer_vat_no",
			header: t("VAT no.", "billing"),
			dataIndex: 'customer_vat_no',
			hidden:true
		},		{
				id: "customer_email",
			header: t("E-mail"),
			dataIndex: 'customer_email',
			hidden:true
		},		{
				id: "customer_extra",
			header: t("Extra", "billing"),
			dataIndex: 'customer_extra',
			hidden:true
		},{
				id: "due_date",
			header: t("Due date", "billing"),
			dateOnly: true,
		xtype:"datecolumn",
			dataIndex: 'due_date',
			hidden:true,
			renderer: function(value,meta,record) {

				if(record.data.overdue == 1){
					meta.css = 'cellbg-red';
				}else if(record.data.overdue == 0){
					meta.css = 'cellbg-green';
				}else{
					meta.css = 'cellbg-blue';
				}

				return value;
			}
		}
		].concat(go.customfields.CustomFields.getColumns("Order"))
	};
	
	if(GO.settings.modules.billing.write_permission) {
		fields.fields.push('telesales_agent_name');
		fields.fields.push('fieldsales_agent_name');
		fields.columns.push({
			header: t("Phone sales agent", "billing"),
			dataIndex: 'telesales_agent_name',
			hidden:true
		});
		fields.columns.push({
			header: t("Field sales agent", "billing"),
			dataIndex: 'fieldsales_agent_name',
			hidden:true
		});
	}
	
	if(go.Modules.isAvailable("legacy", "projects")){
		
		fields.columns.push({
			header: t("project", "projects"),
			dataIndex: 'project_name',
			hidden:true
		});
		
	} else if(go.Modules.isAvailable("legacy", "projects2")){
		
		fields.columns.push({
			header: t("Project", "projects2"),
			dataIndex: 'project_name',
			hidden:true
		});
		
	}

//	config.title = t("Orders", "billing");
	config.layout='fit';
	config.autoScroll=true;
	config.split=true;
	//config.autoExpandColumn='customer';
	
	var reader = new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		fields: fields.fields,
		id: 'id'
	});
	
	config.store = new GO.data.GroupingStore({
		url: GO.url('billing/orderJson/store'),
		//url: GO.settings.modules.billing.url+ 'json.php',
		baseParams: {
			task: 'orders',
			book_id: 0	    	
		},
		reader: reader,
		//sortInfo: {
		//	field: 'btime',
		//	direction: 'DESC'
		//},
		//groupField: 'project_name',
		remoteGroup:true,
		remoteSort:true
	});
	
	this.searchField = new GO.form.SearchField({
		store: config.store,
		width:320
	});
        
	config.tbar = [this.addButton = new Ext.Button({
		iconCls: 'ic-add',
		itemId:'add',
		cls: 'primary',
		text: t("Add"),
		handler: function(){
//				this.displayPanel.reset();
			GO.billing.showOrderDialog(0, {
				values : {
					book_id: this.store.baseParams.book_id
				}
			});
		},
		scope: this
	}),this.deleteButton = new Ext.Button({
		iconCls: 'ic-delete',
		tooltip: t("Delete"),
		handler: function(){
			this.deleteSelected({
				callback : this.ownerCt.ownerCt.displayPanel.gridDeleteCallback,
				scope: this.ownerCt.ownerCt.displayPanel
			});
		},
		scope: this
	}),'-',
		t("Month")+': ',' ',this.searchMonthField = new Ext.form.ComboBox({
			hiddenName : 'search_month',
			triggerAction : 'all',
			editable : false,
			selectOnFocus : true,
			width : 148,
			forceSelection : true,
			mode : 'local',
			valueField : 'number',
			displayField : 'name',
			value: 0,
			store : new Ext.data.SimpleStore({
				fields : ['name', 'number'],
				data : [
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
			}),
			listeners: {
				scope:this,
				select:function(cb, record, index){
					this.store.baseParams['search_month'] = record.data['number'];
					if (this.store.baseParams['search_year']>=1900)
						this.store.load();
				}
			}
		}),this.searchYearField = new Ext.form.NumberField({
			name : 'search_year',
			width : 50,
			emptyText: t("Year"),
			minValue : '1900',
			maxValue : '3000',
			allowBlank : true,		
			enableKeyEvents : true,
			listeners : {
				change : {
					fn : function(field,newValue,oldValue) {
						this.store.baseParams['search_year'] = newValue;
						this.store.load();
					},
					scope : this
				},
				keypress : {
					fn : function(field,event) {
						if (event.getKey()==event.ENTER) {
							this.store.baseParams['search_year'] = this.searchYearField.getValue();
							this.store.load();
						}
					},
					scope : this
				}
			}
		}),this.removeProjectFilterButton = new Ext.Button({
			iconCls: 'btn-delete',
			text: t("Remove project filtering", "billing"),
			hidden:true,
			cls: 'x-btn-text-icon',
			handler: function()
			{
				delete(this.store.baseParams.filter_project_id);
				this.store.reload();
				this.removeProjectFilterButton.hide();
			},
			scope: this
		}),'->',
		this.resetSearchButton = new Ext.Button({
			iconCls: 'clear',
			tooltip: t("Reset search", "billing"),
			handler: function()
			{
				this.searchMonthField.reset();
				this.searchYearField.reset();
				this.searchField.reset();
				delete this.store.baseParams['search_month'];
				delete this.store.baseParams['search_year'];
				delete this.store.baseParams['query'];
				this.store.load();
			},
			scope: this
		}),{
			xtype: 'tbsearch',
			store: config.store,
			onSearch: function(v) {
				this.store.baseParams.query = v;
				this.store.reload();
			}
		}
	];
	
	config.paging=true;
	var columnModel =  new Ext.grid.ColumnModel({
		defaults:{
			sortable:true
		},
		columns:fields.columns
	});
	
	config.cm=columnModel;
	config.editDialogClass = GO.billing.OrderDialog;
					
	config.view=new Ext.grid.GroupingView({
			scrollOffset: 2,
			//forceFit:true,
			hideGroupedColumn:true,
			emptyText: t("No items to display"),
			getRowClass : function(record, rowIndex, p, store){
				if(record.data.late || record.data.status_id==0)
				{
					return 'bs-late';
				}
			}
		});
	
//	config.view=new Ext.grid.GridView({
//		emptyText: t("No items to display"),
//		getRowClass: function(record, index){
//
//			if(record.data.late || record.data.status_id==0)
//			{
//				return 'bs-late';
//			}
//		}
//	});
	
	config.sm=new Ext.grid.RowSelectionModel();
	config.loadMask=true;

	GO.billing.OrdersGrid.superclass.constructor.call(this, config);
	
	this.on('rowcontextmenu', this.onContextClick, this);	
};

Ext.extend(GO.billing.OrdersGrid, GO.grid.GridPanel,{
	
	onContextClick : function(grid, index, e)
	{
		if(!this.menu)
		{
			this.orderStatusStore = new GO.data.JsonStore({
				url: GO.url('billing/status/store'),
				baseParams: {
					book_id: 0,
					permissionLevel:GO.permissionLevels.manage
					},
				id: 'id',
				fields: ['id','name','checked', 'ask_to_notify_customer']
			});
			
			this.statusMenu = new Ext.menu.Menu({
				grid:grid
			});
		
			this.menu = new Ext.menu.Menu({
				id:'order-grid-ctx',
				items: [
					{
						iconCls: 'bs-duplicate',
						text: t("Change status", "billing"),
						cls: 'x-btn-text-icon',
						menu: this.statusMenu
					}
				]
			});
		}

		if(!this.orderStatusStore.loaded || this.orderStatusStore.baseParams.book_id != this.store.baseParams.book_id){
			this.orderStatusStore.baseParams.book_id=this.store.baseParams.book_id;
			
			this.orderStatusStore.load({
				callback:function(){

					this.statusMenu.removeAll();

					this.orderStatusStore.each(function(r){
						this.statusMenu.add({
							text:r.data.name,
							status_id:r.data.id,
							askNotify: r.data.ask_to_notify_customer,
							grid: this.statusMenu.grid,
							listeners: {
								
								click : function(mnu,e){
									var ids = [];
									var selected = mnu.grid.selModel.getSelections();
									for (var i = 0; i < selected.length; i++) {
										if (!GO.util.empty(selected[i].data.id))
											ids.push(selected[i].data.id);
									}
									
									var setOrderStatus = function(ids,statusId,notify) {
										GO.request({
											maskEl:Ext.getBody(),
											url:"billing/order/setOrderStatusses",
											params:{                                                    
												ids: Ext.encode(ids),
												status_id:statusId,
												notify_customer: notify
											},
											success:function(options, response, data){
												if(!data.success)	{
													GO.errorDialog.show(data.feedback);
												} else {
													mnu.grid.store.reload();
												}

											}
										});
									}.createDelegate(this);
									if(mnu.askNotify) {
										Ext.Msg.show({
											modal:false,
											title:t("Notify customer?", "billing"),
											msg: t("Do you want to send an e-mail to the customer about this status change?", "billing"),
											buttons: Ext.Msg.YESNOCANCEL,
											icon: Ext.MessageBox.QUESTION,
											fn: function(btn){

												if(btn=='cancel'){
													return false;
												}
												setOrderStatus(ids,mnu.status_id, btn=='yes' ? 1 : 0);
											}
										});
									} else {
										setOrderStatus(ids,mnu.status_id, 0);
									}
								},
								scope:this
							}
						});
					},this);
				},
				scope:this
			});
		}
		
		this.menu.on('hide', this.onContextHide, this);
		
		e.stopEvent();
		
		this.menu.showAt(e.getXY());
	},	
	
	onContextHide : function()
	{
		if(this.selectedRows)
		{
			this.selectedRows = null;
		}
	},
	
//	showBatchStatusDialog : function(grid) {
//		var ids = [];
//		var selected = grid.selModel.getSelections();
//		for (var i = 0; i < selected.length; i++) {
//			if (!GO.util.empty(selected[i].data.id))
//				ids.push(selected[i].data.id);
//		}
//		
//		console.log(ids);
//		
//	},
	
	renderOrderId : function(id,cell,record){

		var icon = '<i class="icon"></i>';
		if(id==0) {
			id=t("Scheduled order", "billing");
			icon = '<i class="icon">date_range</i>';
		}

		if(record.data.recur_type!='') {
			icon = '<i class="icon">repeat</i>';
		}
			
		return '<div>'+icon+' '+id+'</div>';
	},
					
	enableDateSearch : function( enable ) {
		
		if (!enable) {
			this.searchMonthField.reset();
			this.searchYearField.reset();
			delete this.store.baseParams['search_month'];
			delete this.store.baseParams['search_year'];
			this.store.load();
			this.searchMonthField.setDisabled(true);
			this.searchYearField.setDisabled(true);
		} else {
			this.searchMonthField.setDisabled(false);
			this.searchYearField.setDisabled(false);
		}
		
	}
});
