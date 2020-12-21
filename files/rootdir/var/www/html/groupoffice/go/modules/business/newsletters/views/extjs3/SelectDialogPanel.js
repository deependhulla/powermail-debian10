/* global go, Ext, GO */

go.modules.business.newsletters.SelectDialogPanel = Ext.extend(go.grid.GridPanel, {

	mode: "email", // or "id" in the future "phone" or "address"	
	entityName: "Contact",
	title: t("Newsletter lists"),

	initComponent: function () {

		if(this.singleSelect) {
			this.disabled = true;
		}

		this.searchField = new go.SearchField({
			anchor: "100%",
			handler: function(field, v){
				this.search(v);
			},
			emptyText: null,
			scope: this,
			value: this.query
		});
	
		Ext.apply(this, {
	
			tbar: new Ext.Toolbar({
				layout: "fit",
				items: [{
					xtype: 'fieldset',
					layout: 'fit',
					items: [this.searchField]
				}]
					
				
			}),
			autoScroll: true,
			store: new go.data.Store({
				fields: [
					'id',
					'name'
				],
				filters: {
					"default": {
						//hideUsers:  true
					}
				},
				entityStore: "AddressList"
			}),
			columns: [
				{
					id: 'name',
					header: t('Name'),
					width: dp(200),
					sortable: true,
					dataIndex: 'name'
				}
			],
			viewConfig: {
				emptyText: '<i>description</i><p>' + t("No items to display") + '</p>',
				forceFit: true,
				autoFill: true
			},
		});

		go.modules.business.newsletters.SelectDialogPanel.superclass.initComponent.call(this);

		this.on("render", function () {
			this.search();
		}, this);

		this.on("show", function() {
			this.searchField.focus();			
		}, this);		

		this.on('rowdblclick', function(grid, rowIndex, e){
			this.dialog.addSelection(this);
    }, this);
	},

	search : function(v) {
		this.store.setFilter("search", {text: v});
		this.store.load();
		this.searchField.focus();
	},


	addAll: function () {
		// var me = this;
		// var promise = new Promise(function (resolve, reject) {

		// 	var s = go.Db.store("User");
		// 	me.getEl().mask(t("Loading..."));
		// 	s.query({
		// 		filter: me.grid.store.baseParams.filter
		// 	}, function (response) {
		// 		me.getEl().unmask();
		// 		Ext.MessageBox.confirm(t("Confirm"), t("Are you sure you want to select all {count} results?").replace('{count}', response.ids.length), function (btn) {
		// 			if (btn != 'yes') {
		// 				reject();
		// 			}
		// 			resolve(response.ids);
		// 		}, me);

		// 	}, me);
		// });

		// return promise;
	},

	addSelection: function () {
		var me = this;
		var records = this.getSelectionModel().getSelections();				
		
		var promise = new Promise(function(resolve, reject) {
		
			var s = go.Db.store("Contact");
			me.getEl().mask(t("Loading..."));
			s.query({
				filter: {
					hasEmailAddresses: true,
					addressListId: records.column('id')
				}
			}, function(response) {			
				me.getEl().unmask();
				resolve(response.ids);
				
			}, me);
		});

		return promise;
	}

});
