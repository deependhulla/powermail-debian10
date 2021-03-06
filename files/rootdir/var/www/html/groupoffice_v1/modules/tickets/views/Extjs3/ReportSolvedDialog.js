/**
 * Copyright Intermesh
 *
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 *
 * If you have questions write an e-mail to info@intermesh.nl
 *
 * @version $Id: ReportSolvedDialog.js 22937 2018-01-12 08:01:19Z mschering $
 * @copyright Copyright Intermesh
 * @author Michael de Hart <mdhart@intermesh.nl>
 */
GO.tickets.ReportSolvedDialog = Ext.extend(GO.Window, {

    initComponent: function() {

		now = new Date();

		var toolbar = [this.leftArrow = new Ext.Button({
				text: '«',
				handler : function() {
					this.store.baseParams.year--;
					this.yearPanel.body.update(this.store.baseParams.year);
					this.store.load();
				},
				scope : this
			}), this.yearPanel = new Ext.Panel({
					html : now.format('Y')+"",
					plain : true,
					border : true,
					cls : 'cal-period'
			}), this.rightArrow = new Ext.Button({
				text: '»',
				handler : function() {
					this.store.baseParams.year++;
					this.yearPanel.body.update(this.store.baseParams.year);
					this.store.load();
				},
				scope : this
			}),'-',{
				text: 'stack',
				enableToggle: true,
				handler : function(b) {
					this.chart.setYAxis(new Ext.chart.NumericAxis({
						stackingEnabled: b.pressed
					}));
				},
				scope : this
			}];
		
		

        Ext.apply(this, {
            layout: 'fit',
            title: t("Closed tickets per user", "tickets"),
			tbar: toolbar,
            width: 950,
            height: 600,
            resizable: true,
            items: [this.chart = new Ext.chart.StackedColumnChart({
				//xtype: 'stackedcolumnchart',
				store: this.store,
				xField: 'month',
				xAxis: new Ext.chart.CategoryAxis({
					labelRenderer: function(v) {
						return t("months")[v];
					}
				}),
				yAxis: this.yAxis = new Ext.chart.NumericAxis({
					stackingEnabled: false
					//labelRenderer: Ext.util.Format.usMoney
				}),
				extraStyle: {
					legend: {
						display: 'bottom',
						padding: 5,
						font: {
							family: 'Tahoma',
							size: 13
						}
					}
				},
				series: [{yField: '2', displayName: 'test'}]
			})]
        });

        GO.tickets.ReportSolvedDialog.superclass.initComponent.call(this);
    },
	show : function() {
		this.loadAgents();
		GO.tickets.ReportSolvedDialog.superclass.show.call(this);
	},
	loadAgents : function() {

		GO.request({
			url: 'tickets/report/agents',
			success: function(options, response, result) {

				var fields = ['month'];
				var series = [];
				for(var key in result.data) {
					fields.push(key);
					series.push({yField: key, displayName: result.data[key]});
				}
				this.store = new GO.data.JsonStore({
					fields: fields,
					url: GO.url('tickets/report/solved'),
					baseParams:{
						year:(new Date()).format('Y')
					}
				});
				this.chart.bindStore(this.store);
				this.chart.setSeries(series);
				this.store.load();
			},
			scope:this
		});
		
	}
});
