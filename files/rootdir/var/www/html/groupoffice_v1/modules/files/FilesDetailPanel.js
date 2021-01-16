Ext.namespace('go.modules.files');

go.modules.files.FilesDetailPanel = Ext.extend(Ext.Panel, {
	title: t("Files", "files") + "<span class='badge'>0</span>",
	collapsible: true,
	titleCollapse: true,
	stateId: "files-detail",
	initComponent: function () {

		this.store = new GO.data.JsonStore({
			url: GO.url('files/folder/list'),
			suppressError: true,
			fields: ['id', 'name', 'mtime', 'extension', "handler"],
			remoteSort: true
		});
		
		this.store.on("load", this.onStoreLoad, this);
		this.store.on('exception',function(store, type, action, options, response) {
			var data = Ext.decode(response.responseText);
			if(data && data.feedback) {
				this.expand();
				this.items.get(0).getTemplateTarget().update('<div class="pad danger">' + data.feedback + '</div>');

				this.browseBtn.setText(t("Create folder", "files"));
			}
		},this);



		var tpl = new Ext.XTemplate('<div class="icons"><tpl for="."><a>\
			<i class="icon label filetype filetype-{extension}"></i>\
			<span>{name}</span>\
			<label>{user_name} at {mtime}</label>\
		</a></tpl></div>');



		this.items = [this.dataView = new Ext.DataView({
			store: this.store,
			tpl: tpl,
			autoHeight: true,
			multiSelect: true,
			emptyText: '<div class="go-dropzone">'+t('Drop files here')+'</div>',
			itemSelector: 'a',
			listeners: {
				afterrender:function(me) {
					GO.files.DnDFileUpload(this.uploadComplete.bind(this), me.container)();

				},
				click: this.onClick,
				scope: this
			}
		})];
		
		this.bbar = [
			this.browseBtn = new GO.files.DetailFileBrowserButton({iconCls: ""}),
			this.uploadBtn = new Ext.Button({
				text: t('Upload'),
				handler: function() {

					go.util.openFileDialog({
						multiple: true,
						autoUpload: true,
						listeners: {
							uploadComplete: this.uploadComplete,
							scope: this
						}
					});
				},
				scope:this
			})
		];
		
		// this.browseBtn.on('closefilebrowser', function(btn, folderId) {
		// 	this.folderId = folderId;
		// 	this.store.load({
		// 		params: {
		// 			limit: 10,
		// 			folder_id: this.folderId
		// 		}
		// 	});
		// }, this);


		go.modules.files.FilesDetailPanel.superclass.initComponent.call(this);

	},

	uploadComplete: function(blobs) {

		var	options = {
				upload: true,
				destination_folder_id: this.folderId,
				blobs: Ext.encode(blobs),
				cb: function() {
					this.store.load({
						params: {
							limit: 10,
							folder_id: this.folderId
						}
					});
				}.bind(this)
			};
		if(this.folderId) {
			this.sendOverwrite(options);
		} else { // create folder first
			this.createFolderWhenNoneExist(function() {
				options.destination_folder_id = this.folderId;
				this.sendOverwrite(options);
			}.bind(this))
		}
	},


	sendOverwrite : function(params) {

		if(!params.command)
			params.command='ask';

		if(!params.destination_folder_id)
			params.destination_folder_id=this.folder_id;

		this.overwriteParams = params;
		this.getEl() && this.getEl().mask(t("Saving..."));

		var url = params.upload ? GO.url('files/folder/processUploadQueue') : GO.url('files/folder/paste');

		Ext.Ajax.request({
			url: url,
			params:this.overwriteParams,
			callback: function(options, success, response){

				this.getEl() && this.getEl().unmask();

				var pasteSources = Ext.decode(this.overwriteParams.ids);
				var pasteDestination = this.overwriteParams.destination_folder_id;


				//delete params.paste_sources;
				//delete params.paste_destination;

				if(!success)
				{
					Ext.MessageBox.alert(t("Error"), t("Could not connect to the server. Please check your internet connection."));
				}else
				{

					var responseParams = Ext.decode(response.responseText);

					if(!responseParams.success && !responseParams.fileExists)
					{
						if(this.overwriteDialog)
						{
							this.overwriteDialog.hide();
						}
						Ext.MessageBox.alert(t("Error"), responseParams.feedback);
					}else
					{
						if(responseParams.fileExists)
						{
							if(!this.overwriteDialog)
							{

								this.overwriteDialog = new Ext.Window({
									width:500,
									autoHeight:true,
									closeable:false,
									closeAction:'hide',
									plain:true,
									border: false,
									title:t("File exists"),
									modal:false,
									buttons: [
										{
											text: t("Yes"),
											handler: function(){
												this.overwriteParams.overwrite='yes';
												this.sendOverwrite(this.overwriteParams);
											},
											scope: this
										},{
											text: t("Yes to all"),
											handler: function(){
												this.overwriteParams.overwrite='yestoall';
												this.sendOverwrite(this.overwriteParams);
											},
											scope: this
										},{
											text: t("No"),
											handler: function(){
												this.overwriteParams.overwrite='no';
												this.sendOverwrite(this.overwriteParams);
											},
											scope: this
										},{
											text: t("No to all"),
											handler: function(){
												this.overwriteParams.overwrite='notoall';
												this.sendOverwrite(this.overwriteParams);
											},
											scope: this
										},{
											text: t("Cancel"),
											handler: function(){
												this.getActiveGridStore().reload();
												this.overwriteDialog.hide();
											},
											scope: this
										}]

								});
								this.overwriteDialog.render(Ext.getBody());
							}

							var tpl = new Ext.Template(t("Do you wish to overwrite the file '{file}'?"));
							tpl.overwrite(this.overwriteDialog.body, {
								file: responseParams.fileExists
							});
							this.overwriteDialog.show();
						}else
						{
							if(this.overwriteDialog)
								this.overwriteDialog.hide();
							if(params.cb) {
								params.cb(); // run this callback after files are processed in FileDetailPanel
							}
						}
					}
				}
			},
			scope: this
		});

	},



	createFolderWhenNoneExist: function(cb) {
		var dv = this.findParentByType("detailview"), entityId, entity;
		if(!dv) {
			dv = this.findParentByType("displaypanel") || this.findParentByType("tmpdetailview"); //for legacy modules
		}
		var modelName = dv.model_name || dv.entity || dv.entityStore.entity.name;
		GO.request({
			url: 'files/folder/checkModelFolder',
			maskEl: dv.getEl(),
			jsonData: {},
			params: {
				mustExist: true,
				model: modelName,
				id: dv.data.id
			},
			success: function (response, options, result) {
				this.folderId = result.files_folder_id;

				//hack to update entity store, detailview and legacy DisplayPanel
				var store = go.Db.store(modelName);
				if (store) {
					store.data[dv.data.id].filesFolderId = dv.data.filesFolderId = dv.data.files_folder_id = result.files_folder_id;
				}

				cb();
			},
			scope: this

		});
	},
	
	onClick: function (dataview, index, node, e) {

		var record = this.store.getAt(index);

		if (record.data.extension == 'folder')
		{
			GO.files.openFolder(this.folderId, record.id);
		} else
		{
			if (go.Modules.isAvailable("legacy", "files")) {
				//GO.files.openFile({id:file.id});
				record.data.handler.call(this);
			} else
			{
				window.open(GO.url("files/file/download", {id: record.data.id}));
			}
		}
	},

	load : function(folderId) {
		this.folderId = folderId;

		if (this.folderId) {
			this.browseBtn.setDisabled(false);
			this.store.load({
				params: {
					limit: 10,
					folder_id: this.folderId
				}
			});
		} else {
			this.store.removeAll();
			this.store.totalLength = 0;
			this.onStoreLoad();
			this.browseBtn.setDisabled(this.detailView.data.permissionLevel < go.permissionLevels.write);
		}
	},

	onStoreLoad : function() {

		var count = this.store.getTotalCount();
		var badge = "<span class='badge'>" + count + '</span>';
		this.setTitle(t("Files", "files") + badge);
		if(count) {
			this.browseBtn.setText(t("Browse {total} files", "files").replace("{total}", count));
		} else
		{
			this.browseBtn.setText(t("Browse files", "files"));
			this.setTitle(t("Files", "files"));
		}
	},

	onLoad: function (dv) {

		this.detailView = dv;

		this.uploadBtn.setDisabled(dv.data.permissionLevel < go.permissionLevels.write);
		if(dv.data.permissionLevel < go.permissionLevels.write) {
			this.dataView.emptyText = "<p class='pad'>" + t("No items found") + '</p>';
		} else
		{
			this.dataView.emptyText = '<div class="go-dropzone">'+t('Drop files here')+'</div>';
		}

		this.load(dv.data.files_folder_id == undefined ? dv.data.filesFolderId : dv.data.files_folder_id);
	}

});

Ext.reg("filesdetailpanel", go.modules.files.FilesDetailPanel);