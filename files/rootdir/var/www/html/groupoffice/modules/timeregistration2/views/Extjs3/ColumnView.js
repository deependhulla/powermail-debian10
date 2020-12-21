Ext.define('GO.timeregistration2.ColumnView',{
	extend: Ext.Panel,

	initComponent: function() {

		// this.tbar = [{
		// 	xtype:'buttongroup',
		// 	items: [{text:'Workweek'},{text:'Week'}]
		// }, {
		// 	xtype:'buttongroup',
		// 	items: [{iconCls:'ic-keyboard-arrow-left'}, {text:'Feb 17 - Feb 23'},{iconCls:'ic-keyboard-arrow-right'}]
		// },'->',new go.modules.business.business.EmployeeCombo()
		// ];

		this.on('render', function (me) {
			var main = this;
			me.dropZone = new Ext.dd.DropZone(me.getEl(), {
				getTargetFromEvent: function(e) {
					return e.getTarget('td.open');
				},
				onNodeEnter: function(target,dd,e,data) {
					Ext.fly(target).addClass('x-dd-over');
				},
				onNodeOut: function(target,dd,e,data) {
					Ext.fly(target).removeClass('x-dd-over');
				},
				onNodeOver: function (target, dd, e, data) {
					if(e.altKey) {
						return "x-dd-drop-ok-add";
					}
					return Ext.dd.DropZone.prototype.dropAllowed;
				},
				onNodeDrop: function (target, dd, e, data) {
					var dropCmp = Ext.getCmp(target.id),
						params = Ext.apply({}, data.draggedRecord);
					if(dropCmp.date === data.draggedRecord.date) {
						if(!e.altKey) { return; }
						// dropped on the same day it was dragged, set start time to end time of current + break
						params.start = params.start + params.duration + 30; // hard coded 00:30 break
					}
					dropCmp.items.get(0).items.each(function(entryBox) { // check overlaps
						if(entryBox.entryData) {
							var itemEnd = entryBox.entryData.start+entryBox.entryData.duration,
								itemStart = entryBox.entryData.start,
								draggedEnd = params.start+params.duration,
								draggedStart = params.start;
							if((itemStart < draggedEnd && itemEnd > draggedStart) ||
								(draggedStart < itemEnd && draggedEnd > itemStart)){
								Ext.MessageBox.alert(t('Warning'),t('Time overlaps, check each start and end time on this day'));
								return false;
							}
						}
					});


					params.date = dropCmp.date;
					delete params.status_id;
					delete params.status;
					if(e.altKey) {
						delete params.id;
						if(params.customFields){
							params.customFields = JSON.stringify(params.customFields);
						}
					} else {
						delete params.customFields;
					}
					GO.request({
						url: "projects2/timeEntry/submit",
						params: params,
						success: function(options, response, result) {
							this.store.reload();
						},
						fail : function(response, options, result){
							Ext.Msg.alert(t("Error"), result.feedback);
							this.store.reload();
						},
						scope: main
					});
					// Ext.Msg.alert('Drop gesture', 'Dropped Record id ' + data.draggedRecord.id +
					// 	' on Record id ' + dropCmp.date);
					return true;
				}
			});
		}, this);

		this.exportMenu = new GO.base.ExportMenuItem({className:'GO\\Timeregistration2\\Export\\CurrentGrid'});

		this.printButton = new Ext.menu.Item({
			iconCls: 'ic-print',
			text: t("Print"),
			overflowText: t("Print"),
			scope: this
		});

		if(go.Modules.isAvailable("legacy", "leavedays")){
			this.addLeavedayButton = new Ext.Button({
				text: t("Add holiday", "leavedays"),
				iconCls: 'ic-add',
				handler: function(){
					GO.mainLayout.openModule('leavedays');
					GO.leavedays.showLeavedayDialog();
				},
				scope: this
			});
		}

		GO.timeregistration2.timerButton = new GO.timeregistration2.TimerButton({
			startTime: GO.projects2.timerStartTime,
			listeners:{
				scope:this,
				beforestoptimer:function(btn){
					return confirm(t("Are you sure you like to stop the timer?", "timeregistration2"));
				},
				aftersave: function() {
					this.store.reload();
				}
			}
		});

		this.tbar = [
			'->',
			this.weekIsClosedField = new go.toolbar.TitleItem({
				text: t("This week is closed", "timeregistration2"),
				hidden: true
			}),
			this.addLeavedayButton || '',
			GO.timeregistration2.timerButton,
			{
				iconCls: 'ic-more-vert',
				menu: [
					this.closeButton = new Ext.menu.Item({ //see setTimeSpan for handler
						text: t("Close week", "timeregistration2"),
						iconCls: 'ic-lock',
						scope: this
					}),
					this.copyWeekButton = new Ext.menu.Item({ //see setTimeSpan for handler
						text: t("Copy to next week", "timeregistration2"),
						iconCls: 'ic-redo',
						scope: this
					}),
					'-',
					this.exportMenu,
					this.printButton
				]
			}
		];

		this.store = new GO.data.JsonStore({
			url: GO.url('timeregistration2/timeEntry/store'),
			baseParams: {year:2020, week:'3'},
			sortInfo: {field: 'date', direction: "ASC"},
			fields: ['id','start', 'date', 'comments', 'project_name','project_id', 'standard_task','standard_task_id','label','task','task_id', 'status','status_id', 'customFields','travel_distance','duration'],
			remoteSort:true
		});

		this.layout = 'fit';
		this.autoScroll = true;
		this.items = [this.view = new Ext.Container({
			autoEl: 'table',
			autoWidth: true,
			autoHeight: true,
			cls: 'tt-weekview card',
			defaults: {xtype:'container'}
		})];

		this.store.on('load', function(store, records, options) {
			var startTimes = store.reader.jsonData.startTimes;

			this._weekIsClosed = store.reader.jsonData['is_closed_week'];
			this.closeButton.setDisabled(this._weekIsClosed);
			this.closeButton.setVisible(!this._weekIsClosed);
			if (this.addLeavedayButton) {
				this.addLeavedayButton.setDisabled(this._weekIsClosed);
				this.addLeavedayButton.setVisible(!this._weekIsClosed);
			}
			this.weekIsClosedField.setVisible(this._weekIsClosed);
			this.drawView(this.day, records, startTimes);
		},this);

		this.callParent();

		// todo: tooltip dialog for time entry
		// new Ext.ToolTip({
		// 	title: '<a href="#">Rich Content Tooltip</a>',
		// 	id: 'content-anchor-tip',
		// 	target: 'newTr',
		// 	anchor: 'left',
		// 	html: 'un built zooi',
		// 	width: 415,
		// 	autoHide: false,
		// 	closable: true,
		// 	//contentEl: 'content-tip', // load content from the page
		// 	listeners: {
		// 		'render': function(){
		// 			this.header.on('click', function(e){
		// 				e.stopEvent();
		// 				Ext.Msg.alert('Link', 'Link to something interesting.');
		// 				Ext.getCmp('content-anchor-tip').hide();
		// 			}, this, {delegate:'a'});
		// 		}
		// 	}
		// });
	},

	timeEntryBlock: function(time, nextEntry) {
		// todo de-duplicate these varialbes
		var HEIGH_OF_1_HOUR = 66, QUARTER = (HEIGH_OF_1_HOUR/4);

		var cls = ['time'],  ico ='';
		if(time.data.status_id == 2){
			cls.push('disapproved');
			ico = '<i class="icon">warning</i>';
		}
		if(time.data.status_id == 0){
			cls.push('open');
		}

		var maxEnd = 1440;

		if(nextEntry && nextEntry.data.date == time.data.date) {
			maxEnd = nextEntry.data.start;
		}

		return {
			xtype:'box',
			data: time.data,
			entryData: time.data,
			maxEnd: maxEnd,
			cls:cls.join(' '),
			tpl: '<p>{[values.duration >= 70 ? Ext.util.Format.nl2br(values.comments) + (values.comments ? "<br>" :"") : ""]}\
						<span>'+ico+'{project_name}</span></p><sub>{[go.util.Format.duration(values.duration)]}<em>\
						{[values.start ? go.util.Format.duration(values.start, true) + " - " + go.util.Format.duration(values.start+values.duration, true) : ""]}\
						</em></sub><dd></dd>',
			height: (Math.max(60,time.data.duration) / 60) * HEIGH_OF_1_HOUR - 7, // 66 - 7px margin bottom
			listeners: {render: function(me){
					me.getEl()
						.on('dblclick', function() {
							this.showEditDialog(me.entryData.id,{},me.entryData);
							this.editDialog.formPanel.form.findField('project_id').setRemoteText(me.entryData.project_name);

						},this)
						.on('contextmenu', function(event) {
							this.showContextMenu(event, [me.entryData.id], [me.entryData]);
						},this);

					var main = this;
					me.tracker = new Ext.dd.DragTracker({
						onBeforeStart: function(event){
							if(this._weekIsClosed || (event.browserEvent && event.browserEvent.target.tagName !== 'DD')) {
								return false; // if closed or not clicking in <dd>
							}
							me.startHeight = me.getEl().getHeight();
							return true;
						},
						onMouseUp: function(e) {
							if(!this.active) {
								main.showEditDialog(me.entryData.id,{},me.entryData);
							}
							Ext.dd.DragTracker.prototype.onMouseUp.call(this, e);
						},
						onDrag: function(e) {

							var pos = me.getEl().translatePoints(me.tracker.getXY());
							if(me.startHeight + QUARTER < pos.top && me.entryData.start+me.entryData.duration < me.maxEnd) {
								me.startHeight += QUARTER;
								me.entryData.duration += 15;
								me.getEl().setHeight(me.startHeight);
							} else if(me.startHeight - QUARTER > pos.top && me.entryData.duration > 15) {
								me.startHeight -= QUARTER;
								me.entryData.duration -= 15;
								me.getEl().setHeight(me.startHeight);
							}
							me.update(me.entryData);
							//var val = Ext.util.Format.round(pos.top, 0);
							//console.log( me.tracker.getXY(),pos, me.getEl() );
						},
						onEnd: function() {
							if(me.entryData.placeholder) {
								//remove me and open dialog
								main.showEditDialog(me.entryData.id,{},me.entryData);
							} else { // just resizing an existing one
								GO.request({
									url: "projects2/timeEntry/submit",
									params: {
										id: me.entryData.id,
										date: me.entryData.date,
										start: me.entryData.start,
										duration: me.entryData.duration
									},
									success: function(options, response, result) {
										this.store.reload();
									},
									fail : function(response, options, result){
										Ext.Msg.alert(t("Error"), result.feedback);
										this.store.reload();
									},
									scope: main
								});
							}
							me.isResizing = false;
						},
						tolerance: 3
						//autoStart: 300
					});

					me.tracker.initEl(me.getEl());

				},scope:this}
			//html: '<p>'+ (time.data.duration >= 70 ? time.data.comments+ (time.data.comments?'<br>' :'') : '')+
			//	'<span>'+ico+time.data.project_name+'</span></p><sub>'+time.data.units+'<em>'+startEnd+'</em></sub><dd></dd>'
		};
	},

	drawView: function(curr, timeEntries, startTimes) {
		this.view.removeAll();
		var now = new Date(),
			dayComponents = [], i = 0,
			headerComponents = [],
			periodTotal = 0,
			lastProject = {},
			lastEndTimes = {};

		var HEIGH_OF_1_HOUR = 66, QUARTER = (HEIGH_OF_1_HOUR/4);

		for(var d = 0 ; d < this.dayCount; d++)
		{

			var entryComponents = [],
				time = timeEntries[i];
			while(time && time.data.date < curr.format('Y-m-d')) {
				time = timeEntries[++i]; // next
			}
			if(!time && i>0) time = timeEntries[i-1];
			var totalTime = 0,
				lastEndTime = -1,
				startOfDay = startTimes[curr.add(Date.DAY, -7).format('Y-m-d')] || '08:00',
				nextStartTime = curr.format('Y-m-d')+' '+startOfDay; // default at 8:00
			if(time){
				lastProject = {id: time.data.project_id, name: time.data.project_name};
			}
			while(time && time.data.date == curr.format('Y-m-d')) {

				if(lastEndTime != -1 && time.data.start != lastEndTime) {
					entryComponents.push({
						xtype: 'button',
						iconCls: 'ic-add',
						width:'100%',
						duration: time.data.start - lastEndTime, // gap length
						startAt:Date.parseDate(nextStartTime, 'Y-m-d H:i'),
						hidden: this._weekIsClosed,
						day: (+curr) / 1000,
						text: t("Insert Time", "timeregistration2"),
						handler: function (btn) {
							this.showEditDialog(0, {}, {
								start: go.util.Format.minutes(btn.startAt.format('H:i')),
								duration:btn.duration,
								date: btn.startAt.format('Y-m-d')
							});
						},
						scope: this
					});
				}

				lastEndTime = time.data.start + time.data.duration;


				// Time Entry
				entryComponents.push(this.timeEntryBlock(time, timeEntries[i+1]));
				totalTime += time.data.duration;

				//lastEndTimes[time.data.date] = Date.parseDate(time.data.date.split(" ")[0] + " " + time.data.end_time, go.User.dateTimeFormat).format("U");
				nextStartTime = time.data.date+" "+go.util.Format.duration(time.data.start+time.data.duration, true);
				time = timeEntries[++i];

			}
			entryComponents.push({
				xtype: 'button',
				iconCls: 'ic-add',
				width:'100%',
				startAt: Date.parseDate(nextStartTime, 'Y-m-d H:i').format('U'),
				lastProject: lastProject,
				hidden: this._weekIsClosed,
				day: (+curr) / 1000,
				text: t("Add Time", "timeregistration2"),
				listeners: {
					render: function(btn) {
						btn.mon(btn.getEl(),'mousedown', function(e) {
							var start = go.util.Format.minutes((new Date(btn.startAt*1000)).format('H:i'));
							var time = {data: {
								date: (new Date(btn.day*1000)).format('Y-m-d'),
								duration: 60,
								start: start, // 8:00 seek yesterdays time or last weeks
								comments: '',
								placeholder: true,
								description: 'New entry',
								project_name: btn.lastProject.name,
								project_id: btn.lastProject.id
							}};
							var eventObj = {getXY:function(){return e.xy; } , preventDefault:Ext.emptyFn};
							var tr = new Ext.BoxComponent(this.timeEntryBlock(time));
							tr.render(btn.ownerCt.id,btn.id);
							tr.tracker.onMouseDown.call(tr.tracker, eventObj);
							btn.hide();
						},this);
					},scope:this
				},
				scope: this
			});

			var today = curr.format('Ymd') == now.format('Ymd');
			var clz = [];
			if(today) {clz.push('today')}
			if(!this._weekIsClosed) { clz.push('open'); }
			if(curr.format('N') > 5) { clz.push('weekend', 'go-head-tb');} // saturday or sunday
			dayComponents.push({
				autoEl: 'td',
				xtype:'container',
				date: curr.format('Y-m-d'),
				cls: clz.join(' '),
				items: [{
					xtype:'container',
					items:entryComponents,
					listeners: {
						destroy: function(me) {
							me.dragZone.destroy();
						},
						render: function(me) {
							me.dragZone = new Ext.dd.DragZone(me.getEl(), {
								getDragData: function(e) {
									if(e.browserEvent.target.tagName === 'DD') {
										return false;
									}
									var sourceEl = e.getTarget('div.time', 3);
									if (sourceEl) {

										d = sourceEl.cloneNode(true);
										d.id = Ext.id();
										d.classList.add('tt-weekview');
										d.style.width = Ext.fly(sourceEl).getWidth()+'px';
										var cmp = Ext.getCmp(sourceEl.id);
										return {
											ddel: d,
											sourceEl: sourceEl,
											repairXY: Ext.fly(sourceEl).getXY(),
											//sourceStore: v.store,
											draggedRecord: cmp.entryData
										}
									}
								},
								getRepairXY: function() {
									return this.dragData.repairXY;
								}
							});
						}
					}
				}]
			});

			var date = today ? '<b>'+t('Today')+'</b>' : curr.format("l");
			headerComponents.push({
				autoEl: 'th',
				xtype:'container',
				cls: clz.join(' '),
				items: [{xtype:'box',html: date + ' <span>'+curr.format("j")+'</span><br><b>'+go.util.Format.duration(totalTime)+'</b>'}]
			});
			periodTotal += totalTime;
			curr = curr.add(Date.DAY,1);
		}

		if(!this.totalDisplay) {
			this.totalDisplay = this.el.insertHtml('afterEnd', '<div class="go-grid-total"></div>', true);
			this.totalDisplay.setRight(this.scrollOffset);
			this.totalDisplay.on("click", function () {
				this.totalDisplay.hide();
			}, this);
		}
		this.totalDisplay.update(t('Total') + ' ' + go.util.Format.duration(periodTotal));
		this.totalDisplay.show();

		this.view.add([
			{autoEl: 'tr', items: headerComponents},
			{autoEl: 'tr', items: dayComponents}
		]);

		this.doLayout();
	},

	loadEntries : function(timespan, key, yearnb) {

		this.setTimeSpan(timespan);
		if(timespan === 'week') {
			this.day = new Date(yearnb, 0, (1 + (key - 1) * 7));
			var firstDay = this.day.getDate() - this.day.getDay() + go.User.firstWeekday;
			this.day.setDate(firstDay);
			this.dayCount = 7;
		} else {
			this.day = new Date(yearnb, key-1, 1);
			nextmonth = this.day.add(Date.MONTH,1);
			nextmonth.setDate(0);
			this.dayCount = nextmonth.getDate();
		}


		this.store.baseParams = {'year': yearnb};
		this.store.baseParams[timespan] = key;
		this.store.reload();
	},

	showContextMenu: function(event,ids, records) {

		var contextMenu = new Ext.menu.Menu({
			items: [{
				text: t("Approve", "timeregistration2"),
				iconCls: 'ic-thumb-up',
				hidden: !GO.settings.modules.timeregistration2.write_permission,
				handler: function() {
					GO.request({
						params:{ids: ids},
						url:"timeregistration2/timeEntry/approve",
						success: function(response, options, result){
							this.store.reload();
						},
						scope:this
					});
				},scope:this
			}, {
				text: t("Disapprove", "timeregistration2"),
				iconCls: 'ic-thumb-down',
				hidden: !GO.settings.modules.timeregistration2.write_permission,
				handler: function() {
					GO.request({
						params:{ids: ids},
						url:"timeregistration2/timeEntry/disapprove",
						success: function(response, options, result){
							this.store.reload();
						},
						scope:this
					});
				},scope:this
			},{
				xtype:'menuseparator',
				hidden: !GO.settings.modules.timeregistration2.write_permission
			},{
				text: t("Copy")+'&hellip;',
				iconCls: 'ic-content-copy',
				handler: function() {
					var firstRec = records[0];
					var date = Date.parseDate(firstRec.date, 'Y-m-d');

					var copyEntryDialog = new GO.timeregistration2.CopyEntryDialog();
					copyEntryDialog.timeEntryGridStore = this.store;
					copyEntryDialog.selectedIds = ids;
					copyEntryDialog.show();
					copyEntryDialog.datePicker.setValue(date);
				},scope:this
			},'-',this.deleteButton = new Ext.menu.Item({
				text: t('Delete'),
				iconCls: 'ic-delete',
				handler: function() {
					GO.deleteItems({
						store:this.store,
						params: {delete_keys: Ext.encode(ids) },
						count: ids.length
					});
				},scope:this
			})],
			scope: this
		});


		this.deleteButton.setDisabled(this._weekIsClosed);

		event.stopEvent();
		contextMenu.showAt(event.xy);

	},

	setTimeSpan : function(timespan) {
		if(timespan === 'week') {
			this.closeButton.setText(t("Close week", "timeregistration2"));
			this.closeButton.setHandler(function(){
				GO.request({
					params:{
						year: this.store.baseParams['year'] ,
						week : this.store.baseParams['week']
					},
					url:"timeregistration2/week/close",
					success: function(response, options, result){
						this.store.reload();
						this.mainPanel.weekGrid.store.reload();
						alert(t("All time entries in the current week are closed", "timeregistration2"));
					},
					scope:this
				});
			},this);

			this.copyWeekButton.setHandler(function(){
				GO.request({
					params:{
						year: this.store.baseParams['year'] ,
						week : this.store.baseParams['week']
					},
					url:"timeregistration2/week/copyweek",
					success: function(response, options, result){
						// this.store.reload();
						// this.mainPanel.weekGrid.store.reload();
						if(result.success) {
							Ext.Msg.alert(t("Success"), t("Week has been copied", "timeregistration2"));
						} else {
							Ext.Msg.alert(t("Failure"), t("Week could not be copied", "timeregistration2"));
						}

					},
					scope:this
				});
			},this);

			this.printButton.setHandler(function(){
				window.open(GO.url('timeregistration2/week/print', {
					week: this.store.baseParams['week'],
					year: this.store.baseParams['year']
				}));
			},this);
		} else { // timespan = month
			this.copyWeekButton.setVisible(false);
			this.closeButton.setText(t("Close month", "timeregistration2"));
			this.closeButton.setHandler(function () {
				GO.request({
					params: {
						year: this.store.baseParams['year'],
						month: this.store.baseParams['month']
					},
					url: "timeregistration2/month/close",
					success: function (response, options, result) {
						this.store.reload();
						alert(t("All time entries in the current month are closed", "timeregistration2"));
					},
					scope: this
				});
			}, this);

			this.printButton.setHandler(function () {
				window.open(GO.url('timeregistration2/month/print', {
					'month': this.store.baseParams['month'],
					'year': this.store.baseParams['year']
				}));
			}, this);
		}
	},

	showEditDialog : function(id, config, record){
		if (!this._weekIsClosed || record.data.status_id==2) {
			//if(!this.editDialog){
				this.editDialog = new GO.timeregistration2.TimeDialog();

				this.editDialog.on('close', function(){
					this.store.reload();
				}, this);
			//}
			this.editDialog.modelId = id;
			this.editDialog.show();
			if(record.start && record.duration && !record.end) {
				record.end = record.start + record.duration;
			}

			if(!go.util.empty(record.comments)) {
				record.comments = Ext.util.Format.htmlDecode(record.comments);
			}
			this.editDialog.setValues(record);
		} else {
			alert(t("This week is closed", "timeregistration2"));
		}
	}
});