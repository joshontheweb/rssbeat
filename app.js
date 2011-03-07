var jimi = require('jimi'),
	sys = require('sys'),
	json = JSON.stringify,
	log = sys.puts;
	

var app = jimi.run({
	url_conf: require('./urls'),
	template_path: __dirname + '/templates',
	public_path: __dirname + '/media',
	debug: true,
	port: 27259,
});

process.addListener('uncaughtException', function (err) {
  sys.puts('Caught exception: ' + err);
  res.writeHead(500, 'text/plain');
  res.end('error!');
});

var io = require('socket.io');
var socket = io.listen(app);
// log('\n\nTesting...\n\n');
socket.on('connection', function(client){
	log('\n\nClient Connected\n\n');
    log('id: '+client.sessionId);
	client.on('message', function(message){
        log('\n\n Message Recieved\n\n'+ message);
		
		try {
			message = JSON.parse(message);
		} catch (SyntaxError) {
			log('Invalid JSON');
			log(message);
			return false;
		}
        // if (message.action != 'close' && message.action != 'move') {
        //  log('Invalid request:');
        //  log(message);
        //  return false;
        // }
		
		switch(message.action){
		    case 'move':
                message.id = client.sessionId;
        		client.broadcast(json(message));
        		break;
		    case 'requestFeed':
		        requestFeed(message.feedUrl);
		        break;
		    case 'close':
		        function(){}

		}
		
		message.id = client.sessionId;
		client.broadcast(json(message));
        // client.send(json(message));
	});

	client.on('disconnect', function(){
		log('\n\n Disconnected \n\n');
        log('id: '+client.sessionId);
	});
	
	function getFeed(feedUrl){
	    sys.puts(feedUrl);
	}
});