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
    var models = app.models,
        views = app.views,
        collections = app.collections;
        
    models.Page = models.Page.extend({
        initialize: function(){
            this._super('initialize');
            var sidebarModels = [];
            var mainModels = [];
            
            this.main = new collections.SectionCollection()
            this.sidebar = new collections.SectionCollection()
            
            var self = this;
            $('.section').each(function(){
                $this = $(this);
                classType = $this.attr('data-class-type');

                var model = new models[classType]();
                var view = new views[classType+'View']({el: this, model: model, tagName: this.tagName, className: this.className})
                $this.data('view', view);
                
                if ($this.is('.main div')) {
                    self.main.add(model);
                } else {
                    self.sidebar.add(model);
                }
            })
        },
    })

    window.app.start()

	$("#jquery-test").html("jQuery "+ $.fn.jquery +" is loaded");

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