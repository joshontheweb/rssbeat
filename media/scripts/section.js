(function(){
    var models = window.app.models,
        views = window.app.views,
        collections = window.app.collections,
        controllers = window.app.controllers;
        
    models.Section = app.models.Model.extend({
        initialize: function(options){
            this.$el = $(this.el);

            // this.populate();
        },

        populate: function(){
            self = this;
            var success = function(xml){
                self.parseXml(xml);
            }
            $.ajax({
                type: 'GET',
                url: this.get('feedUrl'),
                success: success
            });
        },

        defaults: {
            title: 'Default Title'
        },

        url: function(){
            return 'http://localhost:8000/api/keyval/'+ this.get('id')
        }
    });

    views.SectionView = views.View.extend({
        el: 'div',
        className: '.section',

        initialize: function(options){
            views.View.prototype.initialize.apply(this);
            _.bindAll(this, 'render');
            this.$el = $(this.el);

            //data population
            this.model.set(
                {
                    'id': this.$el.attr('id'),
                    'title': this.$('.title').text(),
                    'article_title': this.$('article header h3').text(),
                    'article': this.$('.body').text(),
                    'article_source': this.$('.source').text()
                },
                
                {'silent': true}
            )
            
            // model bindings
            this.model.bind('change', this.render);
        },

        template: 'section_template',

        events: {
            'click .source': 'sourceClick',
            'click .settings': 'settingsClick',
            'click .close': 'closeClick'
        },

        settingsClick: function(e){
            e.preventDefault();
            var self = this;
            var settingsHeight;
            var articleHeight;
            this.$el.flip({
                direction: 'lr',
                content: this.$('.stash').html(),
                color: this.$el.css('background-color'),
                onBefore: function(){
                    self.$el.height(self.$el.height())
                },
                onEnd: function(){
                    self.$('.settings-pane:visible').size() || self.$el.css('height', 'auto');
                }
            });
        },

        sourceClick: function(e){
            e.preventDefault();
            alert('You clicked source');
        },

        closeClick: function(e){
            e.preventDefault();
            this.$el.revertFlip();
        },

        loadFeed: function(){

        },

        render: function(){
            $(this.el).html(ich[this.template](this.model.toJSON()));
        }
    });

    collections.SectionCollection = app.collections.Collection.extend({
        model: models.Section,

        save: function(id){
            if (id){
                this.get(id).save();
            } else {
                this.models.forEach(function(model){
                    model.save();
                });
            }
        }
    });
})()