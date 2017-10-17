var socket = require('socket.io-client')('http://10.11.223.153:3000');

socket.on('connect', function(){
	console.log('connected');
	socket.emit('controller');
});

socket.on('index', function(index){
	console.log('i am controller #' + index);
});

socket.on('message', function(data){
	console.log(data.message);
	socket.emit('reply', data.interface);
});

socket.on('select', function(data){
	console.log('selected by ' + data.username);
	socket.emit('selected');
});

socket.on('deselect', function(data){
	console.log('deselected by ' + data.username);
	socket.emit('deselected');
});