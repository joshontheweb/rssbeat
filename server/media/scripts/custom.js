$(function(){
	socket = new io.Socket();
	socket.connect()

	socket.on('connect', function(){
		console.log('Connected');
		// connected
		
		socket.on('message', function(data){
			console.log(JSON.stringify(data), data);
			data = JSON.parse(data)
			
			if(data['action'] == 'close'){
				$('#mouse_'+data['id']).remove();
			} else if (data['action'] == 'move'){
				move(data);
			}
			
            // writeCoords(data);

		});
		
	});

	function move(mouse){
		if($('#mouse_'+mouse['id']).length == 0) {
			$('body').append(
				'<div class="mouse" id="mouse_'+mouse['id']+'"/>'
			);
		}

		$('#mouse_'+mouse['id']).css({
			'left' : mouse.x + 'px',
			'top' : mouse.y + 'px'
		});
	}

	function ratelimit(fn, ms) {
	  var last = (new Date()).getTime();
	  return (function() {
		var now = (new Date()).getTime();
		if (now - last > ms) {
		  last = now;
		  fn.apply(null, arguments);
		}
	  });
	}

	$(document).mousemove(
		ratelimit(function(e){
			if (socket.connected) {
				socket.send(JSON.stringify({
					'action': 'move',
					'x': e.pageX,
					'y': e.pageY,
					'w': $(window).width(),
					'h': $(window).height()
				}));
			}
		}, 40)	
	);

    // function writeCoords(data){
    //  var string = JSON.stringify(data);
    //  var $elem = $('p.coords');
    //  $elem.append('<span>'+ string +'</span>');
    //  if ($elem.children().length > 5){
    //      $elem.find('span').first().remove();
    //  }
    // }
});
