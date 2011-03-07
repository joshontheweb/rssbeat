var http = require('http'), 
        io = require('socket.io'),
		sys = require('sys'),
server = http.createServer(function(req, res){
    // your normal server code
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<head><link rel="stylesheet" href="styles/style.css" /><script src="http://cdn.socket.io/stable/socket.io.js"></script><script>var socket = new io.Socket(); socket.connect()</script></head>');
});

server.listen(27259);

// socket.io, I choose you
var socket = io.listen(server);

socket.on('connection', function(client){
  sys.puts('\n\nConnected\n\n')
  // new client is here!
  client.on('message', function(){ sys.puts('\n\nMessage Received\n\n') });
  client.on('disconnect', function(){ '\n\nDisconnected\n\n' });
});
