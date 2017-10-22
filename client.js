var socket = require('socket.io-client')('http://10.11.157.135:3000');
var status = 'stop';
var speed = '';
var distance = 0;
var taken;

socket.on('connect', function(){
	console.log('connected');
	socket.emit('controller');
	taken = false;
});

socket.on('index', function(index){
	console.log('i am controller #' + index);
});

socket.on('stop', function(data, fn){
	var result;

	if(status=='stop'	){
		result = {status:400, message:'Controller already stopped'};
	} else{ 
		result = {status:200, message:'Operation successfully executed'};
		status = 'stop';
	}
	fn(result);
});

socket.on('forward', function(data, fn){
	var result;
	if(status=='forward'){
		result = {status:400, message:'Controller is already in forward direction'};
	} else if(status!='stop'){
		result = {status:400, message:'Controller is running. Please stop first'};
	} else {
		console.log(data.username + ' forwarded with ' + speed + ' speed');
		result = {status:200, message:'Operation successfully executed'};
		status = 'forward';
	}
	console.log(result);
	fn(result);
});

socket.on('reverse', function(data, fn){
	var result;
	if(status=='reverse'){
		result = {status:400, message:'Controller is already in reverse direction'};
	} else if(status!='stop'){
		result = {status:400, message:'Controller is running. Please stop first'};
	} else{
		console.log(data.username + ' reveresed with ' + speed + ' speed');
		result = {status:200, message:'Operation successfully executed'};
		status = 'reverse';
	}
	console.log(result);
	fn(result);
});

socket.on('select', function(data, fn){
	var result;

	if(taken)
		result = {status:400, message:'controller already taken'};
	else{
		result = {status:200, message:'successfully selected this controller'}; 
		taken = true;
	}
	console.log(result);
	
	fn(result);
});

socket.on('deselect', function(data, fn){
	var result;

	if(!taken)
		result = {status:400, message:'controller not taken'};
	else{
		result = {status:200, message:'successfully deselected this controller'}; 
		taken = false;
	}
	console.log(result);
	
	fn(result);
});