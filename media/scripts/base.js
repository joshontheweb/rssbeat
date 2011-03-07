(function(){
    var models = {},
        views = {},
        collections = {},
        controllers = {};
        
    models.Model = Backbone.Model.extend({
        initialize: function(){},
        
        _super: function(funcStr){
            return this.constructor.__super__[funcStr].apply(this, _.rest(arguments));
        },
    });
    
    views.View = Backbone.View.extend({
        initialize: function(){},
        
        _super: function(funcStr){
            return this.constructor.__super__[funcStr].apply(this, _.rest(arguments));
        },
    });
    
    collections.Collection = Backbone.Collection.extend({
        initialize: function(){},
        
        _super: function(funcStr){
            return this.constructor.__super__[funcStr].apply(this, _.rest(arguments));
        },
    });
    
    controllers.Controller = Backbone.Controller.extend({
        initialize: function(){},
        
        _super: function(funcStr){
            return this.constructor.__super__[funcStr].apply(this, _.rest(arguments));
        },
    });
    
    // Page
    models.Page = models.Model.extend({
        el: 'body',
    });
    
    // Page view
    views.Page = views.View.extend({});
        
    // App root object
    var AppController = controllers.Controller.extend({
        start: function(){
            this.page = new models.Page({el: $('body')});
            new views.Page({el: $('body'), model: this.page})
        },
        
        // app wide objects
        models: models,
        views: views,
        collections: collections,
        controllers: controllers,
        
        // routes: {
        //     '': 'index'
        // },
        // 
        // index: function(){
        //     console.log('Iran');
        // }
    });

    // export app
    window.app = new AppController();
})()
