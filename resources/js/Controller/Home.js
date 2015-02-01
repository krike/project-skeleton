var ProjectSkeleton = ProjectSkeleton || {},
    Controllers = ProjectSkeleton.Controllers = ProjectSkeleton.Controllers || {};

Controllers.Home = {

    init: function() {
        var that = ProjectSkeleton.View.Home;
        that.homeView = new ProjectSkeleton.View.Home({
            el: $('body')
        });
    }

};