Ext.onReady(function () {


  go.Modules.getConfig('community', 'addressbook').entities[0].filters.push({
    name: "addressListId",
    title: t("Address list"),
    type: go.modules.business.newsletters.AddressListCombo
  });

  Ext.override(go.modules.community.addressbook.ContactDialog, {
    initComponent: go.modules.community.addressbook.ContactDialog.prototype.initComponent.createSequence(function () {

      if(!go.Modules.isAvailable('business', 'newsletters')) {
        return;
      }

      this.mainPanel.add(
        {
          xtype: "fieldset",
          title: t("Address lists"),
          
          items: [
            this.addressListsField = new go.form.Chips({
              xtype: "chips",
              anchor: "-20",
              entityStore: "AddressList",
              displayField: "name",
              map: true,
              valueField: 'id',
              allowNew: {
                entity: "Contact"
              },
              name: "addressLists",
              hideLabel: true,
              comboStoreConfig: {
                filters: {
                  defaults: {
                    permissionLevel: go.permissionLevels.write
                  }
                }
              }
            })
          ]
        });
    })
  });
});