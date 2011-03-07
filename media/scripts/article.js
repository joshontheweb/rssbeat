(function(){
    var models = window.app.models,
        views = window.app.views,
        collections = window.app.collections,
        controllers = window.app.controllers;

    models.Article = models.Model.extend({
        el: 'article',
        
        defaults: {
            title: 'Default Title',
            description: 'Default Description',
            link: 'Default Link'
        }
    });
    
    views.Article = views.View.extend({
        initialize: function(){
            
            // model bindings
            this.model.bind({'change': this.render})
        },
        
        template: 'article',
        
        render: function(){
            $(this.el).html(ich.section_template(ich[this.template](this.model.toJSON())));
        }
    });
    
    collections.Article = collections.Collection.extend({});
})()