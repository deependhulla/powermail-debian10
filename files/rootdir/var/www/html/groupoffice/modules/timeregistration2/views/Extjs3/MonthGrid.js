/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: MonthGrid.js 22939 2018-01-12 08:01:21Z mschering $
 * @copyright Copyright Intermesh
 * @author Michael de Hart <mdhart@intermesh.nl>
 */
GO.timeregistration2.MonthGrid = Ext.extend(GO.grid.GridPanel,{

	mainPanel : false,

	initComponent : function(){
		
		var now = new Date();
		
		Ext.apply(this,{
			//title: t("Month"),
			region:'west',
			cls:'go-grid3-hide-headers tr-spangrid',
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			store: new GO.data.JsonStore({
			  url: GO.url('timeregistration2/month/store'),		
			  fields:['id', 'closed','disapproved', 'name'],
			  baseParams:{ year:now.format('Y')},
			  listeners:{
			    load: function(records, operation, success) {
					
					var month = (new Date()).getMonth()
					var index = this.store.findBy(function(record){
						return record.data.id == month+1;
					});
					this.getSelectionModel().selectRow(index, true );
					this.getView().focusRow(index);
				},
				scope: this
			  }
			}),
			viewConfig: {
				forceFit: true,
				getRowClass: function(record, rowIndex, rp, ds){ // rp = rowParams
					if(record.data.id == now.format('n') && ds.baseParams.year == now.format('Y')){
						return 'today';
					}
					return '';
				}
			},
			listeners:{
				show:function(){
					this.store.load();
				},
				scope:this
			},
			cm:new Ext.grid.ColumnModel({
				columns:[
				  { 
					  header: t("Month"), 
					  dataIndex: 'name',
					  renderer:function(v, meta, record){
						  
						if(record.get('disapproved')==true) {
							meta.css='go-icon-cross';
							return v;
						}
						  
						switch(record.get('closed')){

							case true:
								meta.css='go-icon-ok';
							break;

							default:
								meta.css='go-icon-empty';
								break;
						}

						return v;
					}
				  }
				]
			})
		});
		
		GO.timeregistration2.MonthGrid.superclass.initComponent.call(this);

		this.on('show',function() {
			if(this.mainPanel) { this.mainPanel.store = this.store; } // change mainpanel store to call reload on
		},this);
		this.on('delayedrowselect', function(sm, i, record){
			if(this.mainPanel){
				this.mainPanel.timeEntryGrid.startTime = record.get('start_time');
				this.mainPanel.timeEntryGrid.loadEntries('month', record.get('id'), this.store.baseParams.year);
				this.mainPanel.timeEntryGrid.show();
			}
		}, this);
	}
});
