// $.fn.scrollLoad = function(){
//     return this.each(function(){
//         $this = $(this);
//         $items = $this.children();
//         $this.bind('scroll', function(){
//             var windowPos = $(window).scrollTop() + $(window).height();
//             var elPos = $this.offset().top;
//             if (windowPos > elPos){
//                 //pass
//             }
//             
//             
//         })
//     });
// }

// $.fn.instantiate = function(models, views, collection) {
//     return this.each(function() {
//         $this = $(this);
//         classType = $this.attr('data-class-type');
// 
//         var section = new models[classType]();
//         var view = new views.SectionView({el: this, model: section, tagName: this.tagName, className: this.className})
//         $this.data('view', view);
//         if (collection) { collection.add(section) }
//     });
// }

$(function(){
    var models = window.app.models,
        views = window.app.views,
        collections = window.app.collections;
    
    models.Page = models.Page.extend({
        initialize: function(){

        },
        
        feeds: new collections.Feed(),
    });
    
    views.Page = views.Page.extend({
        el: $('body'),
        
        initialize: function(){
            this.$el = $(this.el);
            
            this.$('.section').sortable({
                handle: '.grip'
            });
            
            
            _.bindAll(this, 'addOne', 'addAll');
            
            
            this.model.feeds.bind('add', this.addOne);
            this.model.feeds.bind('refresh', this.addAll);
            this.model.feeds.bind('all', this.render);

            this.model.feeds.fetch();
        },
        
        events: {
            'click .new-feed-submit': 'newFeed'
        },
        
        newFeed: function(e){
            e.preventDefault();
            var $form = this.$('#new-feed-form');
            var feedUrl = $form.find('.new-feed-input').val();
            console.log(this.model.feeds.create({'feedUrl': feedUrl}));
        },
        
        addOne: function(feed){
            var view = new views.Feed({model: feed});
            feed.requestFeed();
            this.$('#main').append(view.render().el);
        },
        
        addAll: function(feeds){
            var self = this;
            feeds.each(self.addOne)
            console.log('Adding all Feeds');
        },
        
        render: function(){
            console.log('Rendering Page');
        }
        
        
    });

    window.app.start()

	$("#jquery-test").html("jQuery "+ $.fn.jquery +" is loaded");
	
	
	// mouse cursor tracking
	$(document).mousemove(function(e){
	    mouseMove(e)
	});

    // 
    // $.fn.instantiate = function(){
    //     return this.each(function(){
    //         $this = $(this);
    //         var classType = $this.attr('data-class-type');
    //         var model = new RssFeed({that: 'this'});
    // 
    //         $this.data('view', new RssFeedView({el: this, model: model}) )
    // 
    //         console.log($this)
    //     });
    // }
});

// Trim
if (typeof String.prototype.trim  !==  'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/,  "$1");
    };
}


// Supplant method on String (Simple Templating) 
// eg. '<h1>{ title }</h1>'.supplant({title: 'Some Title'});
//     renders '<h1>Some Title</h1>'
if  (typeof String.prototype.supplant  !==  'function') {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g, function (a, b) {
            var r = o[b];
            return typeof r === 'string' ?
                r : a;
        });
    };
}