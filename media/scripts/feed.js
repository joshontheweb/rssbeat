(function(){
    var models = window.app.models,
        views = window.app.views,
        collections = window.app.collections,
        controllers = window.app.controllers;
        
    models.Feed = models.Model.extend({
        initialize: function(options){
            
            //
            // For some reason feedUrl isn't set when this
            // init function is called eventhough it was passed to create
            //
            
            // this.requestFeed();

        },
        
        articles: new collections.Article(),
        
        validate: function(attrs){
            var urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            if (!urlRegex.test(attrs.feedUrl)){
                return 'Invalid Url';
            }
        },
        
        parseXml: function(xml){
            var $xml = $(xml);
            var title = $xml.find('channel > title').text();
            var link = $xml.find('channel > link').text();
            var $articles = $xml.find('item');
            
            this.set({'title': title});
            this.set({'link': link});
            
            $articles.each(_.bind(this, function(el){
                var article = new models.Article({el: el});
                new views.Article({el: el, model: article});
                this.articles.add(article);
            }));
        },

        requestFeed: function(){
            var self = this,
                success,
                feedUrl = this.get('feedUrl');
                
            success = function(xml){
                self.parseXml(xml);
            } 

            if (socket.connected) {
                socket.send(JSON.stringify({action: 'requestFeed', feedUrl: feedUrl}))
            }
            
            // $.ajax({
            //     type: 'GET',
            //     url: feedUrl,
            //     success: success,
            //     
            //     error: function(data){
            //         $.get('/dropbox/newrss/media/data/techcrunch.xml', function(data){
            //             success(data);
            //         })
            //         // success($('<div>').load('/dropbox/newrss/media/data/techcrunch.xml').html());
            //     }
            //     
            // });
        },

        defaults: {
            title: 'Default Title'
        },

        // url: function(){
        //     return 'http://localhost:8000/api/keyval/'+ this.get('id')
        // }
    });

    views.Feed = views.View.extend({
        tagName: 'div',
        className: 'section feed',

        initialize: function(options){
            views.View.prototype.initialize.apply(this);
            _.bindAll(this, 'render');
            this.$el = $(this.el);

            // //data population
            // this.model.set(
            //     {
            //         'id': this.$el.attr('id'),
            //         'title': this.$('.title').text(),
            //         'article_title': this.$('article header h3').text(),
            //         'article': this.$('.body').text(),
            //         'article_source': this.$('.source').text()
            //     },
            //     
            //     {'silent': true}
            // )
            
            // model bindings
            this.model.bind('change:title', this.renderTitle);
            this.model.bind('change:feedUrl', this.renderFeedUrl);
            this.model.bind('change:title', this.renderTitle);
            this.model.bind('error', this.handleError);
        },

        template: 'feed-template',

        events: {
            'click .source': 'sourceClick',
            'click .settings': 'settingsClick',
            'click .close': 'closeClick'
        },

        handleError: function(model, error){
            console.log(model.get('title') +" "+ error);
        },
        
        renderTitle: function(title) {
            this.$('.title').text(title)
        },
        
        renderFeedUrl: function(){
            console.log('FeedUrl changed')
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
            return this
        }
    });

    collections.Feed = collections.Collection.extend({
        
        model: models.Feed,
        
        localStorage: new Store('feeds'),

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