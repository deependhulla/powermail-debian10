go.customfields.DetailPanel = Ext.extend(Ext.Panel, {

  bodyCssClass: 'icons',
  collapsible: true,
  fieldSet: null,
  hidden: true,
  layout: "column",

  initComponent: function() {

    if(GO.util.isMobileOrTablet()) {
      this.fieldSet.columns = 1;
    }

    this.stateId = "cf-detail-field-set-" + this.fieldSet.id;
    // this.fieldSetId = this.fieldSet.id;
    this.title = this.fieldSet.name;

    this.items = [];

    var me =  this;
    var fields = go.customfields.CustomFields.getFields(this.fieldSet.id);

    var c = fields.length;
    var fieldsPerColumn = Math.floor(c / this.fieldSet.columns);
    var fieldsInFirstColumn = fieldsPerColumn + (c % this.fieldSet.columns);

    this.defaults = {
      xtype: "container",
      columnWidth: 1 / this.fieldSet.columns
    };

    var currentCol = {items: []};
    var colItemCount = 0;

    this.fieldMap = {};

    var max = fieldsInFirstColumn;

    fields.forEach(function (field) {
      var type = go.customfields.CustomFields.getType(field.type);
      if(!type) {
        console.error("Custom field type " + field.type + " not found");
        return;
      }
      var cmp = type.getDetailField(field);
      cmp.field = field;
      currentCol.items.push(cmp);

      me.fieldMap[field.databaseName] = cmp;

      colItemCount++;
      if(colItemCount == max) {
        me.items.push(currentCol);
        currentCol = {items: []};
        colItemCount = 0;
        max = fieldsPerColumn;
      }
    });

    me.items.push(currentCol);

    this.supr().initComponent.call(this);
  },

  onLoad: function(dv) {

    if(!this.isVisibleByFilter(dv.data)) {
     this.setVisible(false);
     return''
    }

    var vis = false, panel = this;
    go.customfields.CustomFields.getFields(this.fieldSet.id).forEach(function (field) {

      var cmp = panel.fieldMap[field.databaseName], type = go.customfields.CustomFields.getType(field.type);
      if(cmp && cmp.setValue) {
        var v = type.renderDetailView(dv.data.customFields[field.databaseName], dv.data, field, cmp);
        if(typeof(v) !== "undefined") {
          cmp.setVisible(!!v);
          cmp.setValue(v);
          if(!!v) {
            vis = true;
          }
        } else if(!vis && (field.type === 'Contact' || field.type === 'User')) {
          // Hack: relation CFs are dependent on promises and will never return anything. They should be displayed though
          vis = true;
        }
      }
    });

    this.setVisible(vis);
  },

  /**
   * Show this fieldset by filtering the entity values.
   *
   * @param {object} entity
   * @returns {boolean}
   */
  isVisibleByFilter: function (entity) {
    for (var name in this.fieldSet.filter) {
      var v = this.fieldSet.filter[name];

      if (Ext.isArray(v)) {
        if (v.indexOfLoose(entity[name]) === -1) {
          return false;
        }
      } else
      {
        if (v != entity[name]) {
          return false;
        }
      }
    }
    return true;
  }

});

Ext.reg('gocustomfieldsdetailpanel', go.customfields.DetailPanel);