/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: MainPanel.js 23430 2018-02-13 14:47:33Z mschering $
 * @copyright Copyright Intermesh
 * @author Michael de Hart <mdhart@intermesh.nl>
 */
GO.timeregistration2.MainPanel = Ext.extend(Ext.Panel, {

	startTime: null,
	date: new Date(),
	key: null,
	year: null,

	initComponent: function() {
		var now = new Date();
		this.timeEntryGrid = new GO.timeregistration2.ColumnView({mainPanel: this, region: "center"});
//		this.yearOverview = new GO.timeregistration2.YearOverviewGrid();

		this.timeEntryGrid.getTopToolbar().insert(0, {
			cls: 'go-narrow', //Shows on mobile only
			iconCls: "ic-menu",
			handler: function () {
				this.sidePanel.show();
			},
			scope: this
		},this.selectUser = new GO.projects2.SelectEmployee({
			width: dp(216),
			listWidth: dp(336),
			includeInactive:true,
			hidden: !GO.settings.modules.timeregistration2.write_permission,
			store:new GO.data.JsonStore({
				url:GO.url('projects2/employee/store'),
				fields:['user_id','name'],
				id:'user_id'
			}),
			valueField: 'user_id',
			listeners:{
				select:function(cb, r){
					GO.request({
						url: 'timeregistration2/settings/changeUser',
						params: {
							user_id: r.data.user_id
						},
						success: function(options, response, result) {
							if(this.timeEntryGrid.isVisible())
								this.timeEntryGrid.store.reload();

							if(go.Modules.isAvailable("legacy", "leavedays")){
								GO.leavedays.activeUserId=r.data.user_id;
							}

							this.store.reload();

							GO.projects2.selectBookableProjectStore.load();

						},
						scope: this
					});
				},
				scope: this
			}
		}),{
			xtype:'buttongroup',
			defaults: {
				toggleGroup: 'tr-view-toggle',
				enableToggle: true,
				toggleHandler:this.toggleView,
				scope:this
			},
			items: [
				{text: t('Week'), iconCls: 'ic-view-week', itemId: 'week', pressed:true},
				{text: t('Month'), iconCls: 'ic-view-column', itemId: 'month'}
			]
		});

		this.backToList = new Ext.Button({
			cls: 'go-narrow',
			iconCls: "ic-arrow-forward",
			tooltip: t("Time entries"),
			handler: function () {
				this.timeEntryGrid.show();
			},
			scope: this
		});

		Ext.apply(this, {
			layout : 'responsive',
			collapsable: false,
			listeners:{
				scope:this,
				render:function(){
					this.weekGrid.store.load();
				}
			},
			items : [
			this.timeEntryGrid,
			this.sidePanel = new Ext.Panel({
				layout:'card',
				region:'west',
				width: dp(200),
				tbar: [' ',{
						xtype:'buttongroup',
						items: [this.leftArrow = new Ext.Button({
							iconCls : 'ic-keyboard-arrow-left',
							handler : function() {
								this.store.baseParams.year--;
								this.yearPanel.update(this.store.baseParams.year);
								this.store.load();
							},
							scope : this
						}), this.yearPanel = new Ext.BoxComponent({
							html : now.format('Y')+"",
							plain : true,
							cls : 'cal-period'
						}), this.rightArrow = new Ext.Button({
							iconCls : 'ic-keyboard-arrow-right',
							handler : function() {
								this.store.baseParams.year++;
								this.yearPanel.update(this.store.baseParams.year);
								this.store.load();
							},
							scope : this
						})]
					}, '->', this.backToList],
				border:false,
				activeItem: 0,
				split:true,
				collapsible:false,
				cls: 'go-sidenav',
				items:[
					this.weekGrid = new GO.timeregistration2.WeekGrid({mainPanel: this}),
					this.monthGrid = new GO.timeregistration2.MonthGrid({mainPanel: this})
//					,new GO.timeregistration2.YearGrid({mainPanel: this})
				]
			})
			
			]
		});

		GO.timeregistration2.MainPanel.superclass.initComponent.call(this);
	},

	toggleView: function(btn) {
		var format = btn.itemId == 'week' ? 'W' : 'n';
		this.sidePanel.layout.setActiveItem(btn.itemId == 'week'? 0: 1);
		this.timeEntryGrid.loadEntries(btn.itemId, this.date.format(format), this.date.getFullYear());
		this.timeEntryGrid.show();
	},

  
});

// This will add the module to the main tabpanel filled with all the modules
GO.moduleManager.addModule('timeregistration2', GO.timeregistration2.MainPanel, {
	title : t("Time tracking", "timeregistration2"),  //Module name in startmenu
	iconCls : 'go-tab-icon-timeregistration2' //The css class with icon for startmenu
});
