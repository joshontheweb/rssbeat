var plate = require('plate'),
    jimi = require('jimi'),
    sys = require('sys'),
    fs = require('fs'),
    libraries = require('plate/libraries'),
    filesystem = require('plate/plugins/loaders/filesystem');

var cache = {};

// TODO: get_template
    // should support subdirectories

// var load = exports.load = function (name, callback) {
//     if (!callback) { throw 'loader.load() must be called with a callback'; }
// 
//     if (cache[name] != undefined) {
//         callback(false, cache[name]);
//     } else {
//         fs.readFile(get_path() + '/' + name, 'utf-8', function (error, s) {
//             if (error) { callback(error); }
//             // sys.puts('CONTENTS', s)
//             cache[name] = s
//             callback(false, cache[name]);
//         });
//     }
// };

jimi.respond_using_template = function (res, template_name, context) {
    
    var lib = new libraries.Library(),
        loader = new filesystem.Loader([global.options.template_path]);

    lib.register('loader', loader.getPlugin());
    loader.setTemplateCreation(function(data){
        return new plate.Template(data, {
            plugin_library: lib
        });
    });
    
    loader.lookup(template_name, function(error, template){
        if (!error){
            template.render(context, function(error, result){
                if (!error){
                    jimi.respond(res, result, 'text/html', 200)
                } else {
                    sys.puts(error)
                }
            });
            
        } else {
            sys.puts(error)
            // jimi.respond(res, error, 'text/plain', 500)
        }
         

    })
    
    
    // sys.puts('JFHDJKFHDS', template_raw);


    
    
    // load(template_name, function (error, template_raw) {
    //         if (error) {
    //             sys.puts(error);
    //         } else {
    //             // sys.puts('TEMPLATE1: ', template, '');
    //             // sys.puts('TYPE1: ', sys.inspect(template), '');
    //             var template = new plate.Template(template_raw);
    //             // sys.puts('TEMPLATE2: ', template, '');
    //             try {
    //                 if(!(context instanceof plate.Context)) {
    //                     context = new plate.Context(context);
    //                 }                
    //             } catch(err){
    //                 sys.puts('HEREIAM', err);                
    //             }
    // 
    //             template.render(context, function(error, result){
    //                 if (!error){
    //                     sys.puts(result);                    
    //                     // jimi.respond(res, result, 'text/html', 200)
    //                 } else {
    //                     sys.puts(error)
    //                 }
    //             })
    //         }
    //     })
    


    // var template = new plate.Template(load(template, function (error, template) {
    //         if (error) {
    //             sys.puts(error);
    //         } else {
    //             template.render(context, function(err, result){
    //               if (!error){
    //                     jimi.respond(res, result, 'text/html')
    //                 }
    //             })
    //         }
    //     })
    // );

        // 
        // template_loader.load_and_render(template, context, function (error, result) {
        //     if (!error) {
        //         respond(res, result, 'text/html');
        //     }
        // });
};