var ProjectSkeleton = ProjectSkeleton || {},
    Dialog = ProjectSkeleton.Dialog = ProjectSkeleton.Dialog || {};

Dialog.TestDialog = Backbone.View.extend({
    className: 'modal fade',
    id: 'test-modal',

    initialize: function(options){
        _.extend(this, options);
        this.model = new ProjectSkeleton.Model.Test();
        this.render();
    },

    events: {
        'click .add': 'save',
        'click .edit': 'save'
    },

    bindings: {
        '#name': 'name'
    },

    render: function() {
        var data = {},
            dialog = ProjectSkeleton.Utils.Template.render("test_dialog", data);
        this.$el.html(dialog);
    },

    open: function(issueId) {
        if(typeof issueId !== 'undefined' && issueId != '') {
            this.getIssue(issueId);
            this.model.set({
                'issueId' : issueId
            });
            this.$el.find('.add')
                .removeClass('add')
                .addClass('edit')
                .text('Edit');
        }
        this.$el.appendTo($body);
        this.$el.modal("show");
        this.stickit();
        this.$el.find('input, select').trigger('change');
    },

    save: function() {
        var that = this;

        if (typeof this.model.get('id') !== 'undefined' && this.model.get('id') != 0) {
            var ajaxAction = '/test/edit';
        } else {
            var ajaxAction = '/test/add';
        }

        var jqxhr = $.ajax({
            type: "POST",
            url: base_url + ajaxAction,
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            data: JSON.stringify(this.model)
        }).done(function(data) {
            if(!data.success) {
                alert(data.message);
            } else {
                location.reload();
            }
        }).fail(function(data) {
            alert(data.message);
        });
    },

    getIssue: function(issueId) {
        var that = this,
            jqxhr = $.ajax({
                type: "POST",
                url: base_url + '/test/gettest',
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                data: JSON.stringify({id: issueId})
            }).done(function(data) {
                if(data.success) {
                    console.log(data.data);
                }
            }).fail(function(data) {
                console.dir(data);
            });
    }


});