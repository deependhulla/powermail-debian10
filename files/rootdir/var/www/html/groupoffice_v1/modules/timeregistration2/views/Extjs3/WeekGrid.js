/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: WeekGrid.js 22939 2018-01-12 08:01:21Z mschering $
 * @copyright Copyright Intermesh
 * @author Michael de Hart <mdhart@intermesh.nl>
 */
GO.timeregistration2.WeekGrid = Ext.extend(GO.grid.GridPanel,{

	mainPanel : false, //thestore to reload when a week is selected
	
	
	getYear : function(){
		return this.store.baseParams.year;
	},

	initComponent : function(){
		
		var now = new Date();

		Ext.applyIf(this,{
			//title: t("Week"),
			region:'west',
			cls:'go-grid3-hide-headers tr-spangrid',
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			store: new GO.data.JsonStore({
				url: GO.url('timeregistration2/week/store'),		
				fields:['weeknb', 'closed', 'disapproved', 'name', 'start_time'],
				baseParams:{ year:now.format('Y')},
				scope: this
			}),
			viewConfig: {
				forceFit: true,
				getRowClass: function(record, rowIndex, rp, ds){ // rp = rowParams
					if(record.data.weeknb == now.format('W') && ds.baseParams.year == now.format('Y')){
						return 'today';
					}
					return '';
				}
			},
			
			cm:new Ext.grid.ColumnModel({
				columns:[
				  { 
					  header: t("Week"), 
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


		this.weeknb  = (new Date()).getWeekOfYear();

		this.store.on('load', function() {
			var weeknb = this.weeknb;
			var index = this.store.findBy(function(record){
				return record.data.weeknb == weeknb;
			});

			if(index == -1) {
				index = 0;
			}

			if(this.getView().getRow(index) && !this.getSelectionModel().getSelected()) {
				this.getSelectionModel().selectRow(index);
				this.getView().getRow(index).scrollIntoView();
				this.getView().focusRow(index);
			}

		}, this);
		
		GO.timeregistration2.WeekGrid.superclass.initComponent.call(this);	
		this.on('show',function() {
			if(this.mainPanel) { this.mainPanel.store = this.store; } // change mainpanel store to call reload on
		},this);
		this.on('delayedrowselect', function(sm, i, record){

			this.weeknb = record.get('weeknb');

		  	if(this.mainPanel){
				this.mainPanel.timeEntryGrid.startTime = record.get('start_time');
			 	this.mainPanel.timeEntryGrid.loadEntries('week', record.get('weeknb'), this.store.baseParams.year);
				this.mainPanel.timeEntryGrid.show();
		  	}
		}, this);
	}
});
