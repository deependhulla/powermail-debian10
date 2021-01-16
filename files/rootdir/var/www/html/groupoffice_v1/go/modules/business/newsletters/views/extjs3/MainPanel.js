go.modules.business.newsletters.MainPanel = Ext.extend(go.modules.ModulePanel, {
	id: "business-newsletters",
	title: t("Newsletters"),

	layout: 'responsive',
	layoutConfig: {
		triggerWidth: 1000
	},

	addressListId : null,

	entityStore: "AddressList",

	onChanges : function(entityStore, added, changed, destroyed) {		

		if(changed[this.addressListId]) {
			this.cardPanel.getLayout().activeItem.store.reload();
		}
		
	},	

	initComponent: function () {		
		this.grids = {};

		this.items = [
			{
				xtype:"panel",
				layout: "responsive",
				region: "center",
				items: 
				[this.cardPanel = new Ext.Panel({
					stateId: 'business-newsletters-west',
					disabled: true,				
					region: "west",
					layout: "card",
					width: dp(500),
					items: [],
					split: true
				}),
				this.sentItemsGrid = new go.modules.business.newsletters.SentItemsGrid({
					region: "center",
					
					split: true
				})]
			},
			this.createListsGrid()			
		];

		go.modules.business.newsletters.MainPanel.superclass.initComponent.call(this);

		this.on("afterrender", this.runModule, this);
	},

	runModule: function () {
		this.addressListGrid.store.load({
			callback: function() {
				this.addressListGrid.getSelectionModel().selectFirstRow();

				var selected = this.addressListGrid.getSelectionModel().getSelected();

				if(selected) {
					this.loadAddressList(selected.id);
				}
			},
			scope: this
		});
	},
	
	addEntities : function() {
		var me = this;
		this.entity.add().then(function(ids) {
			var record = me.addressListGrid.getSelectionModel().getSelected(), store = go.Db.store("AddressList");
			
			store.get([record.id]).then(function(result) {
				var update = {};
				var e = result.entities[0];
				update[e.id] = {
					entities: e.entities || {}
				};

				ids.forEach(function(id){
					update[e.id].entities[id] = {entityId: id};
				});
				
				store.set({
					update: update
				});
			});
		}).catch(function() {
			//closed
		});
	},

	createListsGrid: function () {
		return this.addressListGrid = new go.modules.business.newsletters.AddressListGrid({
			region: 'west',
			cls: 'go-sidenav',
			hideHeaders: true,
			selModel: new Ext.grid.RowSelectionModel({singleSelect: true}),
			width: dp(280),
			split: true,
			tbar: [{
					xtype: 'tbtitle',
					text: t('Lists')
				}, '->', {xtype:'tbsearch'}, {
					//disabled: go.Modules.get("community", 'notes').permissionLevel < go.permissionLevels.write,
					iconCls: 'ic-add',
					tooltip: t('Add'),
					handler: function (e, toolEl) {
						var dlg = new go.modules.business.newsletters.AddressListDialog();

						//TODO make selectable
						dlg.setValues({
							entity: "Contact"
						}).show();
					}
				},
				{
					cls: 'go-narrow',
					iconCls: "ic-arrow-forward",
					tooltip: t("Items"),
					handler: function () {
						this.cardPanel.show();
					},
					scope: this
				}],
			listeners: {
				navigate: function (grid, rowIndex, record) {					
					this.loadAddressList(record.id);
				},
				scope: this
			}
		});
	},
	
	loadAddressList : function(addressListId) {
		var me = this;
		go.Db.store("AddressList").single(addressListId).then(function(addressList) {
			me.cardPanel.show();
			me.entity = null;
			
			go.modules.business.newsletters.entities.forEach(function(e) {
					if(e.name == addressList.entity) {
						me.entity = e;
						return false;
					}
			}, me);
			
			if(!me.entity) {
				throw "Could not find entity " + addressList.entity + " for newsletters. Is it registered?";
			}
			me.cardPanel.setDisabled(false);
			me.sentItemsGrid.setAddressListId(addressList.id);
			me.addressListId = addressList.id;
			
			if(!me.grids[me.entity.name]) {
				me.grids[me.entity.name] = new me.entity.grid({
					stateId: 'business-newsletters-' + me.entity.name,
					listeners: {
						rowdblclick: function(grid, rowIndex, e) {
							var win = new go.links.LinkDetailWindow({
								entity: me.entity.name
							});
							
							var record = grid.store.getAt(rowIndex);
							win.load(record.data.id);
						}
					},
					tbar: [{
						xtype: 'tbtitle',
						text: t('Contents')
						}, '->', 
						{
							xtype: 'tbsearch'
						},
						{
							xtype:"button",
							iconCls: "ic-add",
							tooltip: t("Add recipients"),
							handler: me.addEntities,
							scope: me
						},{
							xtype:"button",
							iconCls: "ic-delete",
							tooltip: t("Delete"),
							handler: function() {
								me.grids[me.entity.name].deleteSelected();
							},
							scope: me
						}
					]
				});
				//Override delete function
				me.grids[me.entity.name].doDelete = me.deleteEntities;
				me.cardPanel.add(me.grids[me.entity.name]);
			} 
			
			me.cardPanel.getLayout().setActiveItem(me.grids[me.entity.name]);
			
			me.grids[me.entity.name].store.setFilter('addresslist', {addressListId: addressList.id}).load();
			me.sentItemsGrid.store.setFilter('addresslist', {addressListId: addressList.id}).load();
		});
		
	},

	deleteEntities : function(selectedRecords) {		
		var removeIds = selectedRecords.column("id"), 
			addressListId = this.store.getFilter("addresslist").addressListId;

		go.Db.store("AddressList").single(addressListId).then(function(addressList) {			
			
			var update = {};
			update[addressListId] = 	{
				entities: addressList.entities
			};

			removeIds.forEach(function(id) {
				update[addressListId].entities[id] = null;
			});

			go.Db.store("AddressList").set({
				update: update
			});
		});
		
	},

});
