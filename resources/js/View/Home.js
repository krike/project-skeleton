var ProjectSkeleton = ProjectSkeleton || {},
    View = ProjectSkeleton.View = ProjectSkeleton.View || {};

View.Home = Backbone.View.extend({

    initialize: function(options){
        _.extend(this, options);
        _.bindAll(this, 'openTestDialog');

        this.control = {
            testDialog: new ProjectSkeleton.Dialog.TestDialog()
        };
    },

    events: {
        'click .openTestDialog': 'openTestDialog'
    },

    openTestDialog: function() {

    }


});