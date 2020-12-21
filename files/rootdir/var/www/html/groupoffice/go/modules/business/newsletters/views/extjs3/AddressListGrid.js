go.modules.business.newsletters.AddressListGrid = Ext.extend(go.grid.GridPanel, {
	viewConfig: {
		forceFit: true,
		autoFill: true,
		scrollOffset: 0
	},
	
	entity: null,

	initComponent: function () {
	
		var	actions = this.initRowActions();

		Ext.apply(this, {			
			
			store: new go.data.Store({
				fields: ['id', 'name', 'aclId', "permissionLevel", "entity", "entities"],
				entityStore: "AddressList"
			}),
			plugins: [actions],
			columns: [ 
				{
					id: 'name',
					header: t('Name'),
					sortable: false,
					dataIndex: 'name',
					hideable: false,
					draggable: false,
					menuDisabled: true,
					renderer: function(v, meta, record) {
						var count = record.data.entities ?  Object.keys(record.data.entities).length  : 0;
						return v + "<em>" + count + "</em>";
					}
				},
				actions
			],

			stateful: true,
			stateId: 'address-list-grid'
		});

		go.modules.business.newsletters.AddressListGrid.superclass.initComponent.call(this);
	},

	initRowActions: function () {

		var actions = new Ext.ux.grid.RowActions({
			menuDisabled: true,
			hideable: false,
			draggable: false,
			fixed: true,
			header: '',
			hideMode: 'display',
			keepSelection: true,

			actions: [{
					iconCls: 'ic-more-vert'
				}]
		});

		actions.on({
			action: function (grid, record, action, row, col, e, target) {
				this.showMoreMenu(record, e);
			},
			scope: this
		});

		return actions;

	},
	
	
	showMoreMenu : function(record, e) {
		if(!this.moreMenu) {
			this.moreMenu = new Ext.menu.Menu({
				items: [
					{
						itemId: "edit",
						iconCls: 'ic-edit',
						text: t("Edit"),
						handler: function() {
							var dlg = new go.modules.business.newsletters.AddressListDialog();
							dlg.load(this.moreMenu.record.id).show();
						},
						scope: this						
					},{
						itemId: "delete",
						iconCls: 'ic-delete',
						text: t("Delete"),
						handler: function() {
							Ext.MessageBox.confirm(t("Confirm delete"), t("Are you sure you want to delete this item?"), function (btn) {
								if (btn != "yes") {
									return;
								}
								go.Db.store("AddressList").set({destroy: [this.moreMenu.record.id]});
							}, this);
						},
						scope: this						
					}
				]
			});
		}
		
		this.moreMenu.getComponent("edit").setDisabled(record.get("permissionLevel") < go.permissionLevels.manage);
		this.moreMenu.getComponent("delete").setDisabled(record.get("permissionLevel") < go.permissionLevels.manage);
		
		this.moreMenu.record = record;
		
		this.moreMenu.showAt(e.getXY());
	}
});

Ext.reg("addresslistgrid", go.modules.business.newsletters.AddressListGrid);