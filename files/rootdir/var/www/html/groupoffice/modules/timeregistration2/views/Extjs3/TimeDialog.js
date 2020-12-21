Ext.define('GO.timeregistration2.TimeDialog', {
    extend: go.Window,
    width: 500,
    height: 430,
    layout:'fit',
    customFieldType: 'TimeEntry',
    title: t('Time entry'),
    listeners: {
        show: function(win) {
            win.items.get(0).focus();
        }
    },

    initComponent: function() {
        this._panels = [{
            xtype:'panel',
            cls:'go-form-panel',
            autoScroll:true,
            layout:'form',
            items: [
                {
                    xtype:'textarea',
                    hideLabel:true,
                    height: 120,
                    name: 'comments',
                    placeholder: t('What did you do?'),
                    width: '100%'
                },{
                    xtype:'container',
                    layout:'column',
                    defaults: {
                        layout: 'form',
                        xtype:'container',
                        labelAlign:'top'
                    },
                    items:[{columnWidth: .35,items:[{
                            xtype:'datefield',
                            fieldLabel: t("Date"),
                            name: "date",
                            allowBlank:false
                        }]},{columnWidth: .45,
                        items:[{
                            xtype: "container",
                            layout:'hbox',
                            fieldLabel: t("Time"),
                            items: [
                                {
                                    itemId:'start',
                                    xtype:'nativetimefield',
                                    inMinutes:true,
                                    listeners: {
                                        change: function(me,start) {
                                            var form = me.findParentByType('form'),
                                                endField = form.find('itemId', 'end')[0],
                                                durationField = form.find('itemId', 'duration')[0];
                                            if (durationField.getValue()) {
                                                var duration = durationField.getMinutes();
                                                endField.setMinutes(start + duration);
                                            } else if (endField.getValue()) {
                                                var end = endField.getMinutes();
                                                durationField.setMinutes(end - start);
                                            }
                                        }
                                    }
                                },
                                {html:'-', padding:0},
                                {
                                    xtype:'nativetimefield',
                                    submit:false,
                                    inMinutes:true,
                                    itemId: 'end',
                                    listeners:{
                                        change: function(me,end){
                                            var form =  me.findParentByType('form'),
                                                startField = form.find('itemId', 'start')[0],
                                                durationField = form.find('itemId', 'duration')[0];
                                            if (startField.getValue()) {
                                                var start = startField.getMinutes();
                                                durationField.setMinutes(end - start);
                                            } else if(durationField.getValue()) {
                                                var duration = durationField.getMinutes();
                                                startField.setMinutes(end - duration);
                                            }
                                        }
                                    }
                                }
                            ]
                        }]},{columnWidth: .2,items:[{
                            xtype:'nativetimefield',
                            fieldLabel: t("Duration"),
                            itemId: "duration",
                            allowBlank:false,
                            getValue: function() {
                                var v = this.getRawValue();
                                if(!v) {
                                    return v;
                                }
                                return go.util.Format.minutes(v);
                            },
                            setValue: function(minutes) {
                                this.setMinutes(minutes);
                            },
                            listeners:{
                                change: function(me,duration){
                                    var form =  me.findParentByType('form'),
                                        startField = form.find('itemId', 'start')[0],
                                        endField = form.find('itemId', 'end')[0];

                                    if(startField.getValue()) {
                                        var start = startField.getMinutes();
                                        endField.setMinutes(start + duration);
                                    } else if(endField.getValue()) {
                                        var end = endField.getMinutes();
                                        startField.setMinutes(end - duration);
                                    }
                                }
                            }
                        }]}]
                },this.activityField = new GO.form.ComboBoxReset({
                    hideLabel:true,
                    mode: 'remote',
                    anchor:'100%',
                    emptyText: t("Standard working hours", "projects2"),
                    pageSize: parseInt(GO.settings['max_rows_list']),
                    triggerAction: 'all',
                    hiddenName: 'standard_task_id',
                    store: new GO.data.JsonStore({
                        url: GO.url('projects2/standardTask/selectstore'),
                        fields: ['id', 'label','label_postfix', 'rawunits', 'is_billable'],
                        remoteSort: true
                    }),
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">'+
                        '<tpl if="!is_billable"><div class="x-combo-list-item">{label} <small style=color:gray;>('+t("Not billable", "projects2")+')</small></div></tpl>'+
                        '<tpl if="is_billable"><div class="x-combo-list-item">{label}</div></tpl>'+
                        '</tpl>'
                    ),
                    // listeners: {
                    //     select: function(combo, record, index ){
                    //         this.standardTaskDuration = Math.round(record.data.rawunits*60);
                    //         this.setEndTime();
                    //     },
                    //     scope: this
                    // },
                    valueField: 'id',
                    displayField: 'label'
                }),
                this.projectField = new GO.projects2.SelectProject({
                    anchor:'100%',
                    allowBlank:false,
                    emptyText:'',
                    store:GO.projects2.selectBookableProjectStore,
                    listeners:{
                        change:function(cmp, newVal){
                            this.taskField.setProjectId(newVal);
                            var record = GO.projects2.selectBookableProjectStore.getById(newVal);

                            if(record && !this.remoteModelId)
                                this.travelDistanceField.setValue(record.data.default_distance);

                            this.taskField.setValue("");

                        },
                        scope:this
                    }
                }),
                this.taskField = new GO.projects2.SelectTask({anchor:'100%'}),
                this.travelDistanceField = new GO.form.NumberField({
                    fieldLabel:t("Travel distance", "projects2"),
                    name:'travel_distance',
                    width:80
                }),
                this.customFieldsContainer = new Ext.Container()
            ]
        }];
        // Use function from tabbed form dialog this fill customfields container
        this.addPanel = GO.projects2.TimeEntryDialog.superclass.addPanel;
        GO.projects2.TimeEntryDialog.superclass.addCustomFields.call(this);

        this.buttons = [
            {text: t('Save'),
            handler: function() {

                var formattedParams = {
                    start: this.formPanel.find('itemId', 'start')[0].getValue(),
                    duration: this.formPanel.find('itemId', 'duration')[0].getValue(),
                };
                if(this.modelId) {
                    formattedParams.id = this.modelId;
                }

                this.formPanel.getForm().submit({
                    clientValidation: true,
                    url: GO.url('projects2/timeEntry/submit'),
                    params: formattedParams,
                    scope:this,
                    success: function(form, action) {
                        this.close();
                    },
                    failure: function(form, action) {
                        switch (action.failureType) {
                            case Ext.form.Action.CLIENT_INVALID:
                                //Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                break;
                            case Ext.form.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure', 'Communication failed');
                                break;
                            case Ext.form.Action.SERVER_INVALID:
                                Ext.Msg.alert('Failure', action.result.feedback);
                        }
                    }
                });
            },scope:this}
        ];

        this.formPanel = new Ext.form.FormPanel({
            waitMsgTarget:true,
            border: false,
            layout:'fit'
        });
        this.items = [this.formPanel];

        this.callParent();


        if(this._panels.length === 1) {
            this.formPanel.add(this._panels[0]);
        } else {
            this._panels[0].title = t('General');
            this.formPanel.add(new Ext.TabPanel({
                activeTab: 0,
                enableTabScroll:true,
                deferredRender: false,
                border: false,
                anchor: '100% 100%',
                items: this._panels
            }));
        }
    },

    setValues: function(v) {
        if(v.id) this.modelId = v.id;
        this.formPanel.form.setValues(v);
        if(v.project_name) {
            this.projectField.setRemoteText(v.project_name);
        }
        if(v.label) {
            this.activityField.setRemoteText(v.label);
        }
    }
});