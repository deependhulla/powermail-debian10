GO.projects2.ProjectPanel = Ext.extend(GO.DisplayPanel, {

	model_name: "GO\\Projects2\\Model\\Project",
	stateId: 'pm-project-panel',
	editGoDialogId: 'project',

	template: '<h4 style="text-transform:uppercase; float:right; padding:12px 8px 0 0;">{status_name}</h4>'+
		'<h3 class="title s8"><small>#{id}</small> {template_name}: {name}<br>'+
		'<tpl if="!GO.util.empty(parent_project_path)"><sub><a target="_self" style="clear:both" class="pm-subproject-link" href="#project/{parent_project_id}">{parent_project_path}</a></sub></tpl>'+
		'</h3><br style="clear:both">'+

		'<p class="s4 pad">\
			<label>'+t("Start time", "projects2")+'</label>\
			<span>{[!GO.util.empty(values.start_time) ? values.start_time : "-"]}</span><br><br>\
			<label>'+t("Due at", "projects2")+'</label>\
			<span class="{[this.getClass(values)]}">{[!GO.util.empty(values.due_time) ? values.due_time : "-"]}</span>\
		</p>'+
		'<p class="s4">\
			<tpl if="!GO.util.empty(responsible_user_name)">\
			<label>'+t("Manager", "projects2") +'</label>\
			<span>{responsible_user_name}</span><br><br></tpl>\
			<label>'+t("Permission type", "projects2")+'</label>\
			<span>{type_name}</span>\
		</p>\
		<p class="s4">\
			<tpl if="!GO.util.empty(customer)">\
			<label>'+t("Customer")+'</label>\
			<span>{customer}</span><br></tpl>\
			<tpl if="!GO.util.empty(contact)"><br>\
			<label>'+t("Contact", "projects2")+'</label>\
			<span>{contact}</span><br></tpl>\
			<tpl if="!GO.util.empty(use_reference_no) && !GO.util.empty(reference_no)"><br>\
			<label>'+t("Reference no.", "projects2")+'</label>\
			<span>{reference_no}</span></tpl>\
		</p>'+
		'<br style="clear:both">'+
		'<tpl if="!GO.util.empty(description)"><p class="pad">{description}</p></tpl>',

	financialTemplate: '<table class="display-panel labels" cellspacing="0" id="pm-financial-{panelId}">' +
		'<tpl if="!GO.util.empty(is_income_enabled)">' +

		'<tpl if="!GO.util.empty(budget_sum)">' +
		'<tr class="x-grid3-hd-row x-grid3-header x-grid3-hd-inner"><th></th><th class="line" style="text-align:right">\n\\n\
  			<div style="width:15%;float:left;">' + t("Income", "projects2") + '</div>\n\
			<div style="width:20%;float:left;">' + t("Internal fees", "projects2") + '</div>\n\
			<div style="width:15%;float:left;">' + t("Expenses", "projects2") + '</div>\n\
			<div style="width:15%;float:left;">' + t("Travel costs", "projects2") + '</div>\n\
			<div style="width:20%;float:left;">' + t("Total Percentage", "projects2") + '</div>\n\
			<div style="width:15%;float:left;font-weight:600;">' + t("Total", "projects2") + '</div>\n\
		</th></tr>' +
		'<tr>' +
		'<td>' + t("Budget", "projects2") + ':</td>' +
		'<td style="text-align:right;">\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.budget_sum.budget)]}</div>\n\
      <div style="width:20%;float:left;">{[GO.util.format.valuta(values.budget_sum.internalFee)]}</div>\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.budget_sum.expenses)]}</div>\n\
      <div style="width:15%;float:left">-</div>\n\
      <div style="width:20%;float:left;">&nbsp;</div>\n\
      <div style="width:15%;float:left;font-weight:600;color:{[values.budget_sum.sum<0?"red":"green"]}">{[GO.util.format.valuta(values.budget_sum.sum)]}</div>\n\
    </td>' +
		'</tr>' +
		'<tr>' +
		'<td>' + t("Realization", "projects2") + ':</td>' +
		'<td style="text-align:right;">\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.real_sum.budget)]}</div>\n\
      <div style="width:20%;float:left">{[GO.util.format.valuta(values.real_sum.internalFee)]}</div>\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.real_sum.expenses)]}</div>\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.real_sum.mileage)]}</div>\n\
      <div style="width:20%;float:left;color:{[values.real_sum.sum<values.budget_sum.sum?"red":"green"]}">{[values.budget_sum.sum > 0 ? GO.util.format.number((values.real_sum.sum / values.budget_sum.sum) * 100, 0) + "%" : "-"]}</div>\
      <div style="width:15%;float:left;font-weight:600;color:{[values.real_sum.sum<0?"red":"green"]}">{[GO.util.format.valuta(values.real_sum.sum)]}</div>\n\
    </td>' +
		'</tr>' +

		'<tpl if="income_type!=3">' +
		'<tr>' +
		'<td>' + t("Billing progress", "projects2") + ':</td><td>' +
		'<div class="pm-progressbar"><div class="pm-progress-indicator" style="width:{[Math.round((100/values.invoicable_amount)*values.invoiced_amount)]}%"></div></div>' +
		//'{[GO.util.format.valuta(values.budget_sum - values.income_total)]}'+
		'</td>' +
		'</tr>' +
		'</tpl>' +

		'</tpl>' +
		'</tpl>' + // is_income_enabled

		'<tpl if="!GO.util.empty(show_subproject_totals)">' +
		//				'<td>'+t("Subprojects budget", "projects2")+':</td><td>'+
		//				'{subprojects_budget_sum}'+

		'<tpl if="!GO.util.empty(subprojects_budget_sum)">' +
		'<tr><td></td><th class="line" style="text-align:right;">\n\\n\
  		<div style="width:15%;float:left;">' + t("Income", "projects2") + '</div>\n\
		<div style="width:20%;float:left;">' + t("Internal fees", "projects2") + '</div>\n\
		<div style="width:15%;float:left;">' + t("Expenses", "projects2") + '</div>\n\
		<div style="width:15%;float:left;">' + t("Travel costs", "projects2") + '</div>\n\
		<div style="width:20%;float:left;">' + t("Total Percentage", "projects2") + '</div>\n\
		<div style="width:15%;float:left;font-weight:600;">' + t("Total", "projects2") + '</div>\n\
		</th></tr>' +
		'<tr>' +
		'<td>' + t("Subprojects budget", "projects2") + ':</td>' +
		'<td style="text-align:right;">\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.subprojects_budget_sum.budget)]}</div>\n\
      <div style="width:20%;float:left;">{[GO.util.format.valuta(values.subprojects_budget_sum.internalFee)]}</div>\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.subprojects_budget_sum.expenses)]}</div>\n\
      <div style="width:15%;float:left">-</div>\n\
      <div style="width:20%;float:left">&nbsp;</div>\n\
      <div style="width:15%;float:left;font-weight:600;color:{[values.subprojects_budget_sum.sum<0?"red":"green"]}">{[GO.util.format.valuta(values.subprojects_budget_sum.sum)]}</div>\n\
    </td>' +
		'</tr>' +
		'<tr>' +
		'<td>' + t("Subprojects realization", "projects2") + ':</td>' +
		'<td style="text-align:right;">\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.subprojects_real_sum.budget)]}</div>\n\
      <div style="width:20%;float:left">{[GO.util.format.valuta(values.subprojects_real_sum.internalFee)]}</div>\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.subprojects_real_sum.expenses)]}</div>\n\
      <div style="width:15%;float:left">{[GO.util.format.valuta(values.subprojects_real_sum.mileage)]}</div>\n\
\n\					<div style="width:20%;float:left;color:{[values.subprojects_real_sum.sum<values.subprojects_budget_sum.sum?"red":"green"]}">{[GO.util.format.number((values.subprojects_real_sum.sum / values.subprojects_budget_sum.sum) * 100, 0)]}%</div>\n\
      <div style="width:15%;float:left;font-weight:600;color:{[values.subprojects_real_sum.sum<0?"red":"green"]}">{[GO.util.format.valuta(values.subprojects_real_sum.sum)]}</div>\n\
    </td>' +
		'</tr>' +
		'</tpl>' +

		'</td>' +
		'</tr>' +
		'<tr>' +
		'<td>' + t("Number of subprojects", "projects2") + ':</td><td>' +
		'{n_subprojects}' +
		'</td>' +
		'</tr>' +
		'</tpl>' +
		'</table>',
					

	timeEntriesTemplate: '<tpl if="values.timeentries">' +
		'<table class="display-panel" cellspacing="0" id="pm-timeentries-{panelId}">' +
		'<tr class="x-grid3-hd-row x-grid3-header x-grid3-hd-inner">' +
			'<td>' + t("Username") + '</td>' +
			'<td style="text-align:right" width="15%">' + t("Booked", "projects2") + '</td>' +
			'<td style="text-align:right" width="11%">' + t("Billed", "projects2") + '</td>' +
			'<td style="text-align:right" width="13%">' + t("Billable", "projects2") + '</td>' +
			'<td style="text-align:right" width="13%">' + t("Budgeted units", "projects2") + '</td>' +
			'<td style="text-align:right" width="10%">' + t("% Total", "projects2") + '</td>' +
			'<td style="text-align:right" width="25%">' + t("Modified at") + '</td>' +
		'</tr>' +
		'<tpl for="timeentries">' +
		'<tr class="go-grid-row {[this.getBudgetClass(values.status)]}">' +
			'<td style="vertical-align:top">{user_name}</td>' +
			'<td class="r">{units}</td>' +
			'<td class="r">{invoiced_units}</td>' +
			'<td class="r">{billable_units}</td>' +
			'<td class="r">{budgeted_units}</td>' +
			'<td class="r">{percentage_total}</td>' +
			'<td class="r">{mtime}</td>' +
		'</tr>' +
		'</tpl>' +
		'<tpl if="timeentries_totals">' +
		'<tr class="go-grid-row {[this.getBudgetClass(values.timeentries_totals.status)]}">' +
			'<td>' + t("Totals", "projects2") + '</td>' +
			'<td class="r">{values.timeentries_totals.units}</td>' +
			'<td class="r">{values.timeentries_totals.invoiced_units}</td>' +
			'<td class="r">{values.timeentries_totals.billable_units}</td>' +
			'<td class="r">{values.timeentries_totals.budgeted_units}</td>' +
			'<td class="r">{values.timeentries_totals.percentage_total}</td>' +
			'<td class="r">{values.timeentries_totals.mtime}</td>' +
		'</tr>' +
		'</tpl>' +
		'<tpl if="!timeentries.length">' +
			'<tr><td colspan="4">' + t("No items to display") + '</td></tr>' +
		'</tpl>' +
		'</table>' +
	'</tpl>',

	expensesTemplate:
		'<tpl if="values.expenseBudgets">' +
		'<table class="display-panel" id="pm-expenses-{panelId}">' +
		'<tr class="x-grid3-header x-grid3-hd-row  x-grid3-hd-inner">' +
			'<td>' + t("Expense budget", "projects2") + '</td>' +
			'<td class="r" style="width="15%">' + t("Budgeted", "projects2") + '</td>' +
			'<td class="r" style="width="15%">' + t("Actual", "projects2") + '</td>' +
			'<td class="r" style="width="15%">' + t("% Total", "projects2") + '</td>' +
			'<td class="r" style="width="15%">' + t("Modified at") + '</td>' +
		'</tr>' +
		'<tpl for="expenseBudgets">' +
		'<tr class="{[this.getBudgetClass(values.status)]}">' +
			'<td>{description}</td>' +
			'<td class="r" width="15%">{nett_budget}</td>' +
			'<td class="r" width="15%">{nett_spent}</td>' +
			'<td class="r" width="15%">{percentage_total}</td>' +
			'<td class="r" width="15%">{mtime}</td>' +
		'</tr>' +
		'</tpl>' +
		'<tpl if="expenseBudgets_totals">' +
		'<tr class="{[this.getBudgetClass(values.expenseBudgets_totals.status)]} line">' +
			'<td>' + t("Totals", "projects2") + '</td>' +
			'<td class="r" style="width="15%">{values.expenseBudgets_totals.nett_budget}</td>' +
			'<td class="r" style="width="15%">{values.expenseBudgets_totals.nett_spent}</td>' +
			'<td class="r" style="width="15%">{values.expenseBudgets_totals.percentage_total}</td>' +
			'<td class="r" style="width="15%">{values.expenseBudgets_totals.mtime}</td>' +
		'</tr>' +
		'</tpl>' +
		'<tpl if="!expenseBudgets.length">' +
		'<tr><td colspan="4">' + t("No items to display") + '</td></tr>' +
		'</tpl>' +
		'</table>' +
	'</tpl>',

	incomesTemplate:
		'<tpl if="values.incomes">' +
		'<table class="display-panel" cellspacing="0" id="pm-incomes-{panelId}">' +
		'<tr class="x-grid3-header x-grid3-hd-row x-grid3-hd-inner">' +
			'<td>' + t("Income", "projects2") + '</td>' +
			'<td class="r" style="width="15%">' + t("Budgeted", "projects2") + '</td>' +
			'<td class="r" style="width="15%">' + t("Invoice at", "projects2") + '</td>' +
			'<tpl if="values.incomes[0].open_fee">' +
				'<td class="r" style="width="15%">' + t("Open fee", "projects2") + '</td>' +
			'</tpl>' +
			'<td class="r" style="width="15%">' + t("Paid at", "projects2") + '</td>' +
			'<td style="width="15%">' + t("Invoice No.", "projects2") + '</td>' +
			'<td style="width="15%">' + t("Reference no.", "projects2") + '</td>' +
			'<td style="width="15%">' + t("Invoiced", "projects2") + '</td>' +
			'<tpl if="values.incomes[0].add_to_exact">' +
			'<td class="r" style="width="15%">' + 'Exact' + '</td>' +
			'</tpl>' +
		'</tr>' +
		'<tpl for="incomes">' +
			'<tr class="go-grid-row">' +
				'<td>{description}</td>' +
				'<td class="r">{amount}</td>' +
				'<td class="r">{invoice_at}</td>' +
				'<tpl if="values.open_fee">' +
				'<td class="r">{open_fee}</td>' +
				'</tpl>' +
				'<td class="r">{paid_at}</td>' +
				'<td>{invoice_number}</td>' +
				'<td>{reference_no}</td>' +
				'<td>{is_invoiced}</td>' +
				'<tpl if="values.add_to_exact">' +
				'<td class="r">{add_to_exact}</td>' +
				'</tpl>' +
			'</tr>' +
		'</tpl>' +
		'<tpl if="values.income_total">' +
			'<tr class="go-grid-row">' +
				'<td style="white-space:nowrap">' + t("Totals", "projects2") + '</td>' +
				'<td class="r">{values.income_total}</td>' +
				'<td colspan="5"></td>' +
			'</tr>' +
		'</tpl>' +
		'</table>' +
		'</tpl>',

	editHandler: function () {
		GO.projects2.showProjectDialog({
			project_id: this.link_id
		});
	},

	initComponent: function () {

		this.templateConfig = Ext.apply(this.templateConfig,{
			getBudgetClass: function (status) {
				switch (status) {
					case 2: return 'pm-over-budget';
					case 1: return 'pm-budget-warning';
				}
				return "";
			},
			getClass: function (values) {
				var cls = '', now = new Date(), date = Date.parseDate(values.due_time, GO.settings.date_format);
				if (date < now) {
					cls = 'projects-late ';
				}
				if (values.completed == '1') {
					cls += 'projects-completed';
				}
				return cls;
			},
			getUnitsClass: function (values) {
				var cls = '';
				if (values.units_budget > 0 && values.units_booked >= values.units_budget) {
					cls = 'projects-late ';
				}
				return cls;
			}
		});

		this.loadUrl = ('projects2/project/display');

		GO.projects2.ProjectPanel.superclass.initComponent.call(this);

		this.subProjectsGrid = new GO.projects2.SubProjectsGrid({
			title: t("Sub projects", "projects2"),
			stateId: "pr2-sub-projects-main",
			collapsible: true,
			autoHeight: true,
			tbar:[ '->',{
				tooltip: t("Add"),
				iconCls: 'ic-add',
				handler: function(){
					if(GO.projects2.max_projects>0 && this.store.totalLength>=GO.projects2.max_projects)
					{
						Ext.Msg.alert(t("Error"), t("The maximum number of projects has been reached. Contact your hosting provider to activate unlimited usage of the projects module.", "projects2"));
						return;
					}
					GO.projects2.showProjectDialog({
						parent_project_id: this.data.id,
						values:{
							type_id:this.data.type_id
						}
					});
					GO.projects2.projectDialog.addListenerTillHide('save', function(){
						this.reload();
					}, this);

				},
				scope: this
			}]
		});
		this.subProjectsGrid.on('rowclick', function (grid, rowIndex, event) {

			var record = grid.store.getAt(rowIndex);
			GO.mainLayout.getModulePanel('projects2')._switchProject(record.data.id);

		}, this);

		this.insert(1, this.subProjectsGrid);

		this.insert(2, this.financialPanel = new Ext.Panel({
			collapsible: true,
			title: t("Financial", "projects2"),
			tpl: new Ext.XTemplate(this.financialTemplate, this.templateConfig)
		}));

		this.insert(3, this.timeEntriesPanel = new Ext.Panel({
			collapsible: true,
			title: t("Time entries", "projects2"),
			tpl: new Ext.XTemplate(this.timeEntriesTemplate, this.templateConfig)
		}));
		this.insert(4, this.expensesPanel = new Ext.Panel({
			collapsible: true,
			title: t("Expenses", "projects2"),
			tpl: new Ext.XTemplate(this.expensesTemplate, this.templateConfig)
		}));
		this.insert(5, this.incomesPanel = new Ext.Panel({
			collapsible: true,
			title: t("Income", "projects2"),
			tpl: new Ext.XTemplate(this.incomesTemplate, this.templateConfig)
		}));

		var panels = go.customfields.CustomFields.getDetailPanels("Project").reverse();
		panels.forEach(function(p) {
			this.insert(2, p);
		}, this);

		this.add(new go.detail.CreateModifyPanel());

		this._addNewMenuButtons();
	},

	showAndHidePanels : function(data) {
		this.financialPanel.setVisible(!!data.is_income_enabled);
		if(data.is_income_enabled) {
			this.financialPanel.setTitle(t("Financial", "projects2")+ ' <span class="badge">'+data.income_type_name+'</span>');
		}
		this.timeEntriesPanel.setVisible(!!data.timeentries);
		this.expensesPanel.setVisible(!! data.expenses);
		this.incomesPanel.setVisible(!!data.incomes);
		if(!!data.incomes) {
			this.incomesPanel.setTitle(t("Income", "projects2") + ' <span class="badge">'+data.income_total+'</span>');
		}
		var subProjectCount = this.subProjectsGrid.store.getCount();
		this.subProjectsGrid.setVisible(subProjectCount > 0);
		if(subProjectCount > 0){
			this.subProjectsGrid.setTitle(t("Sub projects", "projects2")+ ' <span class="badge">'+subProjectCount+'</span>');
		}
	},

	_addNewMenuButtons: function () {

		this.moreButton.menu.add("-");

		this.moreButton.menu.add(this.duplicateBtn = new Ext.menu.Item({
			iconCls: 'ic-content-copy',
			text: t("Duplicate", "projects2"),
			handler: function () {
				if (GO.projects2.max_projects > 0 && this.treePanel.store.totalLength >= GO.projects2.max_projects)
				{
					Ext.Msg.alert(t("Error"), t("The maximum number of projects has been reached. Contact your hosting provider to activate unlimited usage of the projects module.", "projects2"));
				} else
				{

					if (!this.duplicateProjectDialog) {
						this.duplicateProjectDialo = new GO.projects2.DuplicateProjectDialog({})

					}

					this.duplicateProjectDialo.show({
						project_id: this.link_id,
						duplicate_id: this.link_id
					});
				}
			},
			scope: this
		}));

		this.moreButton.menu.add(this.manrgeBtn = new Ext.menu.Item({
			iconCls: 'ic-merge-type',
			text: t("Merge"),
			handler: function () {
				var curentProjectId = this.data.id;

				if (!this.projectMergeDialog) {
					this.projectMergeDialog = new GO.projects2.MergeDialog({});
					this.projectMergeDialog.on("hide", function () {

						this.fireEvent("fullReload", this);
//						this.reload();
					}, this);

				}

//				this.projectMergeDialog.toProjectId = curentProjectId;

				this.projectMergeDialog.show(curentProjectId);
			},
			scope: this
		}));

		this.moreButton.menu.add( "-");

		this.moreButton.menu.add(this.addExpenseBtn = new Ext.menu.Item({
			iconCls: 'ic-credit-card',
			text: t("Expense", "projects2"),
			handler: function () {
				if (!this.expenseDialog) {
					this.expenseDialog = new GO.projects2.ExpenseDialog();
				}
				this.expenseDialog.show(0, {
					values: {
						project_id: this.data.id
					}
				});
			},
			scope: this
		}));

		if (go.Modules.isAvailable("legacy", "timeregistration2")) {
			this.moreButton.menu.insert(0, this.addTimeEntryBtn = new Ext.menu.Item({
				iconCls: 'ic-schedule',
				text: t("Time entry", "projects2"),
				handler: function () {
					if (!this.timeEntryDialog)
						this.timeEntryDialog = new GO.projects2.TimeEntryDialog({
							id: 'pm-timeentry-dialog'
						});

					this.timeEntryDialog.show(0, {
						loadParams: {
							project_id: this.data.id
						}
					});
				},
				scope: this
			}));
		}

		this.moreButton.menu.add({
			iconCls: 'ic-euro-symbol',
			text: t('Invoice'),
			handler: function() {
				var dlg = new GO.projects2.InvoiceProjectDialog();
				dlg.show({projectId: this.data.id});
			},
			scope:this
		});

		this.moreButton.menu.add('-');
		

		this.moreButton.menu.add(this.reportBtn = new Ext.menu.Item({
			iconCls: 'ic-assessment',
			text: t("Report", "projects2"),
			handler: function () {
				if (!this.reportDialog) {
					this.reportDialog = new GO.projects2.ReportDialog();
				}
				this.reportDialog.show(this.data.id);
			},
			scope: this
		}));
	},

	setData: function (data)
	{
		GO.projects2.ProjectPanel.superclass.setData.call(this, data);



		if (data.write_permission && this.scheduleCallItem) {
			this.scheduleCallItem.setLinkConfig({
				name: this.data.contact,
				model_id: this.data.contact_id,
				model_name: "GO\\Addressbook\\Model\\Contact",
				callback: this.reload,
				scope: this
			});
		}

		if (this.addTimeEntryBtn) {
			this.addTimeEntryBtn.setDisabled(data.enabled_fields.indexOf('budget_fees') == -1);
		}

		if (this.addExpenseBtn) {
			this.addExpenseBtn.setDisabled(data.enabled_fields.indexOf('expenses') == -1);
		}
		//this.reportBtn.setDisabled(data.project_type==0);//not for container type

		// Disable the duplicate button if parent is not writable
		this.duplicateBtn.setDisabled(!data.parent_project_write_permission);
		this.subProjectsGrid.store.baseParams.parent_project_id = this.data.id;
		this.subProjectsGrid.store.load({
			callback: function() {
				this.showAndHidePanels(data);
			},scope: this
		});

		this.reportBtn.setDisabled(data.permission_level < GO.projects2.permissionLevelFinance);

	}
});

Ext.reg('projectpanel', GO.projects2.ProjectPanel);