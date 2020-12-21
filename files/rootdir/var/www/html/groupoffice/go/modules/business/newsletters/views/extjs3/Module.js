go.Modules.register("business", "newsletters", {
	mainPanel: "go.modules.business.newsletters.MainPanel",
	title: t("Newsletters"),
	entities: [{
			name: "Newsletter",
			relations: {
				creator: {store: "User", fk: "createdBy"}
			}
	},{
			name: "AddressList"
	}],
	initModule: function () {},
	systemSettingsPanels: ["go.modules.business.newsletters.SystemSettingsPanel"],

	selectDialogPanels: [
		"go.modules.business.newsletters.SelectDialogPanel",
	]
});

go.modules.business.newsletters.entities = [];
go.modules.business.newsletters.registerEntity = function(config) {
	go.modules.business.newsletters.entities.push(config);
};

go.Router.add(/newsletters\/unsubscribe\/([0-9]+)\/([a-z0-9]+)/i, function(entityId, token) {

	go.Jmap.request({
		method: 'business/newsletters/Subscription/get',
		params: {
			entityId: entityId,
			token: token
		}
	}).then(function(addressList) {
		Ext.MessageBox.confirm(t("Confirm"), t("Are you sure you want to unsubscribe from '{addressList}'?").replace('{addressList}', addressList.name), function(btn) {
			if(btn != 'yes') {
				return;
			}

			go.Jmap.request({
				method: 'business/newsletters/Subscription/delete',
				params: {
					entityId: entityId,
					token: token
				}
			}).then(function(addressList) {
				Ext.MessageBox.alert(t("Unsubscribed"), t("You have been unsubscribed from '{addressList}'. You can close this window.").replace('{addressList}', addressList.name));
			});
		});
	}).catch(function() {
		Ext.MessageBox.alert(t("Error"), t("This URL is invalid."));
	});

	
}, false);