GO.tickets.SelectStatus = Ext.extend(GO.form.ComboBox, {	
	hiddenName:'status_id',
	valueField:'id',
	displayField:'name_clean',
	mode:'local',
	triggerAction:'all',
	editable:false,
	selectOnFocus:true,
	forceSelection:true,
	initComponent: function() {
		this.store = GO.tickets.status_per_ticket_type ? new GO.data.JsonStore({
			url:GO.url('tickets/status/store'),
			fields:['id','name_clean','type_name'],
			baseParams: {
				type_id: 0
			}
		}) : GO.tickets.statusesStore;

		this.supr().initComponent.call(this);
	}
});
