var media_url = 'media/',
    scripts_url = media_url +'scripts/',
    styles_url = media_url +'styles/';

require(
    [
        scripts_url+'libs/jquery-1.5.js',
        scripts_url+'libs/underscore.js'

    ],
    function (jquery, script) {
        require([
            scripts_url+'libs/backbone.js',
            scripts_url+'libs/icanhaz.js'
        ], function(){
            require([scripts_url+'models.js'], function(){
                require([scripts_url+'script.js'])                
            });
        })
    }
);