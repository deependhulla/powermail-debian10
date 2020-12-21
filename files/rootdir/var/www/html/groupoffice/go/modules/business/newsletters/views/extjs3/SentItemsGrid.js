go.modules.business.newsletters.SentItemsGrid = Ext.extend(go.grid.GridPanel, {
  disabled: true,

  initComponent: function() {
    this.tbar = [{
      xtype: 'tbtitle',
      text: t('Sent items')
      }, '->', 
      {
        xtype:"button",
        iconCls: "ic-send",
        text: t("Compose"),
        handler: this.compose,
        scope: this
      },{
				iconCls: 'ic-settings',
				tooltip: t("Manage"),
				handler: function() {
					var win = new go.modules.business.newsletters.TemplatesWindow();
					win.show();
				}
			}
    ];


    this.store = new go.data.Store({
      fields: [
        'id', 
        'subject', 
        'numSent',
        'numTotal',
        'addressListId',
        { 
          name: 'paused', 
          type: 'bool'
        },
        {
          name: 'startedAt',
          type: 'date'
        }, {
          name: 'finishedAt',
          type: 'date'
        },
				{
					name: 'creator',
					type: 'relation'
				}
      ],
      entityStore: "Newsletter",
      sortInfo: {
        field: "startedAt",
        direction: "DESC"
      }
    });

    var	actions = this.initRowActions();

    this.plugins = [actions];

    this.columns = [
      {
        id: 'subject',
        header: t('Subject'),
        dataIndex: 'subject'
      },
      {         
        header: t('Status'),        
        dataIndex: 'paused',
        renderer: function(v, meta, record) {
          meta.style = 'cursor:pointer';
          var s = record.data.numSent + " / " + record.data.numTotal;

          if(record.data.numSent < record.data.numTotal) {
            s += record.data.paused ? ' <i class="icon">play_arrow</i>' : ' <i class="icon">pause</i>';
          }

          var errors = false;
          
          for(var id in record.json.entities) {
            if(record.json.entities[id].error) {
              errors = true;
            }
          }

          if(errors) {
            s += ' <i class="icon">error</i>'; 
          }

          return s;
        }
      },
      {
        xtype:"datecolumn",        
        header: t('Started at'),        
        dataIndex: 'startedAt',
        sortable: true
      },{
        xtype:"datecolumn",        
        header: t('Finished at'),        
        dataIndex: 'finishedAt',
        sortable: true
      },
			{
				header: t("Created by"),
				dataIndex: 'creator',
				renderer: function(user) {
					return user ? user.displayName : t("Unknown user");
				},
				sortable: true
			},
      actions
    ];

    this.viewConfig = {
      forceFit: true,
      autoFill: true
    };

    go.modules.business.newsletters.SentItemsGrid.superclass.initComponent.call(this);

    this.on("rowdblclick", function(grid, rowIndex, e) {
			var record = grid.getStore().getAt(rowIndex);
			this.edit(record.data.id);
    }, this);
    
    this.on("cellclick", function(grid,  rowIndex, columnIndex, e) {

      var record = grid.getStore().getAt(rowIndex);  // Get the Record
      var fieldName = grid.getColumnModel().getDataIndex(columnIndex); 
      if(e.target.innerHTML == 'error') {
        return this.showErrors(record); 
      }
  
      if(fieldName != 'paused' || record.data.numSent == record.data.numTotal) {
        return;
      }
      var paused = record.get(fieldName);
      var update = {};
      update[record.id] = {paused: !paused};

      go.Db.store("Newsletter").set({
        update: update
      });

    }, this);
  },

  showErrors : function(record) {    

    var errors = "";
   
    for(var id in record.json.entities){
      if(record.json.entities[id].error) {
        errors += Ext.util.Format.htmlEncode(record.json.entities[id].error) + "<br />";
      }    
    }

    Ext.MessageBox.alert(t("Errors"), errors);
    
  },

  
  compose : function() {
    var dlg = new go.modules.business.newsletters.Composer();
    dlg.setValues({
      addressListId: this.addressListId
    }).show();
  },

  setAddressListId : function(addressListId) {
    this.addressListId = addressListId;
    this.setDisabled(!addressListId);
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
							this.edit(this.moreMenu.record.id);
						},
						scope: this						
					}
				]
			});
		}
		
		this.moreMenu.getComponent("edit").setDisabled(record.get("permissionLevel") < go.permissionLevels.manage);
		
		this.moreMenu.record = record;
		
		this.moreMenu.showAt(e.getXY());
  },
  edit: function(id) {
    var dlg = new go.modules.business.newsletters.Composer();
		dlg.load(id).show();
  }
  
});
