var jimi = require('jimi'),
    plate = require('plate'),
    sys = require('sys'),
    template_path = global.options.template_path;
    overrides = require('./overrides');


exports.home = function(req, res){
	jimi.respond_using_template(res, 'home.html', {'MEDIA_URL': '/media/'});
}

exports.about = function(req, res){
	jimi.respond_using_template(res, 'about.html', {'MEDIA_URL': '/media/'});
}

exports.contact = function(req, res){
	jimi.respond_using_template(res, 'contact.html', {'MEDIA_URL': '/media/'});
}

exports.portfolio = function(req, res){
	jimi.respond_using_template(res, 'portfolio.html', {'MEDIA_URL': '/media/'});
}

exports.blog = function(req, res){
	jimi.respond_using_template(res, 'blog.html', {'MEDIA_URL': '/media/'});
}

exports.delayed = function(req, res, how_long){
	setTimeout(function(){
		jimi.respond(res, 'I was delayed by '+ how_long +' milliseconds.');
	}, parseInt(how_long, 10));
}

exports.feedApi = function(req, res){
    // returns a single specified feed
    // eg. http://techcrunch.com/rss
    // 'feedUrl' POST key required
    
    
}

exports.feedsApi = function(req, res, username){
    // returns a users feeds

}
