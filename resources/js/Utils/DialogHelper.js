var ProjectSkeleton = ProjectSkeleton || {},
    Dialog = ProjectSkeleton.Dialog = ProjectSkeleton.Dialog || {};

Dialog.Helper = Backbone.View.extend({
    className: 'modal fade',

    initialize: function(options){
        _.extend(this, options);
        if (typeof this.model === 'undefined') {
            alert('model is missing');
            return false;
        }
        if (typeof this.template === 'undefined') {
            alert('template is missing');
            return false;
        }
        if (typeof this.editAction === 'undefined') {
            alert('Edit action is missing');
            return false;
        }
        if (typeof this.addAction === 'undefined') {
            alert('Add action is missing');
            return false;
        }
        if (typeof this.getAction === 'undefined') {
            alert('Get action is missing');
            return false;
        }
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
            dialog = ProjectSkeleton.Utils.Template.render(this.template, data);
        this.$el.html(dialog);
    },

    open: function(id) {
        if(typeof id !== 'undefined' && id != '') {
            this.getData(id);
            this.model.set({
                'id' : id
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
            var ajaxAction = this.editAction;
        } else {
            var ajaxAction = this.addAction;
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

    getData: function(id) {
        var that = this,
            jqxhr = $.ajax({
                type: "POST",
                url: base_url + this.getAction,
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                data: JSON.stringify({id: id})
            }).done(function(data) {
                if(data.success) {
                    console.log(data.data);
                }
            }).fail(function(data) {
                console.dir(data);
            });
    }


});