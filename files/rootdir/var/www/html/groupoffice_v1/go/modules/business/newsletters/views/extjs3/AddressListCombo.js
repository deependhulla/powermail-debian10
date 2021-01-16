/* global Ext, go, GO */

go.modules.business.newsletters.AddressListCombo = Ext.extend(go.form.ComboBox, {
	fieldLabel: t("Address list"),
	hiddenName: 'addressListId',
	anchor: '100%',
	emptyText: t("Please select..."),
	pageSize: 50,
	valueField: 'id',
	displayField: 'name',
	triggerAction: 'all',
	editable: true,
	selectOnFocus: true,
	forceSelection: true,	
	store: {
		xtype: "gostore",
		fields: ['id', 'name'],
		entityStore: "AddressList",
		baseParams: {
			filter: {
					permissionLevel: go.permissionLevels.write
			}
		}
	}
});

Ext.reg("addresslistcombo", go.modules.business.newsletters.AddressListCombo);
