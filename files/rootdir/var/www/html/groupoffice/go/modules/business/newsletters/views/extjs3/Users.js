
go.modules.business.newsletters.registerEntity({
    name: "User",
    grid: go.users.UserGrid,
    add: function () {
        return new Promise(function (resolve, reject) {
            var select = new go.util.SelectDialog({
                entities: ['User'],
                mode: 'id',
                scope: this,
                selectMultiple: function (ids) {
                    this.resolved = true;
                    resolve(ids);
                },
                listeners: {
                    close: function() {
                        if(!this.resolved) {
                            reject();
                        }
                    }
                }
            });
            select.show();
        });
    }
});
