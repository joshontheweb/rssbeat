(function(){
    var models = app.models,
        views = app.views,
        collections = app.collections;
        
    models.SubSection = models.Section.extend({})
    
    views.SubSectionView = views.SectionView.extend({
        initialize: function(){
            views.SectionView.prototype.initialize.apply(this);
            
            // data population
            this.model.set({
                    'img': this.$('img').attr('src')
                },
            
                {silent: true}
            );
        },
        
        events: _.extend(views.SectionView.prototype.events, {
            'click img': 'imgClick'
        }),

        imgClick: function(e){
            alert('You clicked an image');
        },
        
        template: 'sub_section_template',
        
    })
})()