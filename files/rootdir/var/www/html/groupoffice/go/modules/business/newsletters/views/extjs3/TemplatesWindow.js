go.modules.business.newsletters.TemplatesWindow = Ext.extend(go.Window, {
  title: t("E-mail templates"),
  width: dp(600),
  height: dp(400),
  layout:"fit",
  initComponent: function() {
    this.templateGrid = new go.emailtemplate.GridPanel({
      module: {package: "business", name: "newsletters"}
    });

    this.items = [this.templateGrid];
    go.modules.business.newsletters.TemplatesWindow.superclass.initComponent.call(this);
  }
});