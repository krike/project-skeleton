var ProjectSkeleton = ProjectSkeleton || {},
    Utils = ProjectSkeleton.Utils = ProjectSkeleton.Utils || {};


Utils.Template = {
    templates: {},

    render: function(name, data) {
        var template = name + ".html";

        if (typeof this.templates[template] === "undefined") {
            //log.error("[Zimmo.Utils.Template] Failed to render because the template does not exist: " + name);
            throw "Failed to render because template '"+ name +"' does not exist";
        }
        return this.templates[template].render(data);
    },
    add: function(name, data) {
        if (typeof this.templates[name] === 'undefined') {
            this.templates[name] = Twig.twig({
                allowInlineIncludes: true,
                id: name,
                data: data
            });
        }
    }
}
