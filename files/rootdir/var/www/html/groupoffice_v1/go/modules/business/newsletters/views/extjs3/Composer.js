/* global go */

go.modules.business.newsletters.Composer = Ext.extend(go.form.Dialog, {
	title: t('Compose'),
	entityStore: "Newsletter",
	width: dp(1000),
	height: dp(800),
	formPanelLayout: "fit",
	resizable: true,
	maximizable: true,
	collapsible: true,
	modal: false,
	initButtons : function() {},
	initComponent: function() {
		
		this.tbar = [{
			tooltip: t("Send"),
			iconCls: 'ic-send',
			scope: this,
			handler: function() {
				this.submit();
			}
		},'->', 
		{
			tooltip: t("Send a test message to the selected outgoing account e-mail. The first recipient will be used for the template."),
			iconCls: 'ic-pageview',
			scope: this,
			handler: function() {
				this.getEl().mask(t("Sending..."));
				var me = this;
				go.Jmap.request({
					method: 'Newsletter/test',
					params: this.getValues()
				}).then(function() {
					Ext.MessageBox.alert(t("Sent"), t("A test message was sent"));
				}).catch(function(result) {

					GO.errorDialog.show(Ext.util.Format.nl2br(Ext.util.Format.htmlEncode(result.message)));

				}).finally(function() {
					me.getEl().unmask();
				})
			}
		},		
		{
			listeners: {
				scope: this,
				render: function(menu) {
					
					this.templatesMenu.store.load({
						scope: this,
						callback: function() {

							if(this.currentId) {
								return;
							}

							var first = this.templatesMenu.store.getAt(0);
							if(first) {
								this.setValues({
									subject: first.data.subject,
									attachments: first.data.attachments,
									body: first.data.body
								});
							}
						}
					});
				}
			},
			tooltip: t("Select a template"),
			iconCls: 'ic-style',			
			menu: this.templatesMenu = new go.menu.StoreMenu({
				// cls: "x-menu-no-icons",
				displayField: "name",
				store: new go.data.Store({
					fields: ['name', 'body', 'subject', 'attachments'],
					entityStore: "EmailTemplate",
					filter: {
						module: {module: {name: 'newsletters', package: 'business'}}
					}
				}),
				listeners: {
					scope: this,
					// load: function(menu) {
					// 	menu.add('-');
					// 	menu.add({
					// 		iconCls: 'ic-settings',
					// 		text: t("Manage"),
					// 		handler: function() {
					// 			var win = new go.modules.business.newsletters.TemplatesWindow();
					// 			win.show();
					// 		}
					// 	});
					// },
					createitem: function(item, record, index) {
						item.group = "template";
						item.checked = index === 0;				

						item.listeners = {
							checkchange: function(item, checked) {
								this.setValues({
									subject: item.record.data.subject,
									attachments: item.record.data.attachments,
									body: item.record.data.body
								});
							},			

							scope: this
						};
					}
				
					// itemclick: function(item, e) {
					// 	this.setValues({
					// 		subject: item.record.data.subject,
					// 		attachments: item.record.data.attachments,
					// 		body: item.record.data.body
					// 	});
					// }
				}
			})
		}];


		go.modules.business.newsletters.Composer.superclass.initComponent.call(this);
	},

	initFormItems: function () {

		var me = this;

		return [{
			xtype: 'fieldset',
			layout: "border",
			items: [{
				region: "center",
				xtype: "panel",
				layout: "form",
				defaults: {
					anchor: '100%'
				},
				items: [{
					xtype: "smtpaccountcombo",
					allowBlank: false,
					listeners: {
						scope: this,
						render: function(combo) {
							combo.store.load().then(function(records) {
									if(records.length) {
										combo.setValue(records[0].id);
									} else {
										
										Ext.MessageBox.alert(t("No account"), t("Please setup an outgoing e-mail account first"), function() {
											me.close();
											go.Router.goto("systemsettings/newsletters");
										});

									}
								}
							);
						}
					}
				},
				{
					xtype: 'textfield',
					name: 'subject',
					fieldLabel: t("Subject")
				}, {
					anchor: "100% -" + dp(96),
					xtype: 'xhtmleditor',
					plugins: [new GO.plugins.HtmlEditorImageInsert()],
					name: 'body',
					hideLabel: true,
					listeners: {
						attach: this.onAttach,
						scope: this
					}
				}
				]
			},

			this.attachments = new go.form.AttachmentsField({
				region: "south",
				name: "attachments"
			})
			]
		}
		];
	},

	onAttach: function (htmleditor, blob, file, imgEl) {

		//Inline images are parsed form the body and should not be sent as attachment
		if (imgEl) {
			return;
		}

		this.attachments.addAttachment({
			blobId: blob.blobId,
			name: file.name,
			attachment: true
		});
	}
});


