Ext.onReady(function() {
	Ext.override(go.modules.community.addressbook.ContactDialog, {
		onLoad : go.modules.community.addressbook.ContactDialog.prototype.onLoad.createSequence(function(){

			if (go.Modules.isAvailable("legacy", "tickets", go.permissionLevels.write)) {
				this.ratesGrid.setCompanyId(this.currentId);
				this.ratesGrid.setDisabled(false);
				this.ratesGrid.store.load();
			}
			if (go.Modules.isAvailable("legacy", "tickets", go.permissionLevels.write)  && go.Modules.isAvailable("community", "addressbook", go.permissionLevels.write))
			{
				this.settingsGroupsGrid.setCompanyId(this.currentId);
				this.settingsGroupsGrid.setDisabled(false);
				this.settingsGroupsGrid.store.load();
			}
		}),

		setOrganization: go.modules.community.addressbook.ContactDialog.prototype.setOrganization.createSequence(function(isOrganization){
			isOrganization ? this.tabPanel.unhideTabStripItem(this.ratesGrid) : this.tabPanel.hideTabStripItem(this.ratesGrid);
			isOrganization ? this.tabPanel.unhideTabStripItem(this.settingsGroupsGrid) : this.tabPanel.hideTabStripItem(this.settingsGroupsGrid);
		}),

		initFormItems : go.modules.community.addressbook.ContactDialog.prototype.initFormItems.createSequence(function(){

			if (go.Modules.isAvailable("legacy", "tickets", go.permissionLevels.write)) {
				this.ratesGrid = new GO.tickets.RatesGrid({
					disabled: true,
					objectType: 'company',
					title: t("Ticket","tickets") + " " + t("Rates", "tickets")
				});
				this.addPanel(this.ratesGrid);

				this.ratesGrid.store.on('beforeload',function(store,options){
					store.baseParams['company_id'] = this.ratesGrid.company_id;
				},this);
				this.ratesGrid.store.on('beforesave',function(store,data){
					store.baseParams['company_id'] = this.ratesGrid.company_id;
				},this);
				this.on('save',function(dialog,company_id){
					this.ratesGrid.company_id = company_id;
					this.ratesGrid.save();
				},this);
			}

			if (go.Modules.isAvailable("legacy", "tickets", go.permissionLevels.write)  && go.Modules.isAvailable("community", "addressbook", go.permissionLevels.write))

			{
				this.settingsGroupsGrid = new GO.tickets.SettingsGroupsGrid({
					disabled: true
				});
				this.addPanel(this.settingsGroupsGrid);
			}

		})
	});

});
