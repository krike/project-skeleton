var ProjectSkeleton = ProjectSkeleton || {},
    View = ProjectSkeleton.View = ProjectSkeleton.View || {};

View.Home = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, options);
        _.bindAll(this, 'openTestDialog');

        this.control = { //''
            testDialog: new ProjectSkeleton.Dialog.Helper({
                model: new ProjectSkeleton.Model.Test(),
                template: 'test_dialog',
                editAction: '/test/edit',
                addAction: '/test/add',
                getAction: '/test/gettest'
            })
        };
    },

    events: {
        'click .openTestDialog': 'openTestDialog'
    },

    openTestDialog: function() {

    }


});