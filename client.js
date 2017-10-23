var socket = require('socket.io-client')('http://10.11.157.135:3000');
var state = 'stop';
var speed = '';
var direction = 'forward';
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

	if(state=='stop'){
		result = {status:400, message:'Controller already stopped'};
	} else{ 
		result = {status:200, message:'Stop operation successfully executed'};
		state = 'stop';
	}
	result.state = 'stop';
	fn(result);
});

socket.on('forward', function(data, fn){
	var result;
	if(direction=='forward'){
		result = {status:400, message:'Controller is already in forward direction'};
	} else if(state!='stop'){
		result = {status:400, message:'Controller is running. Please stop first'};
	} else {
		console.log(data.username + ' forwarded with ' + speed + ' speed');
		result = {status:200, message:'Forward operation successfully executed', state:'running'};
		direction = 'forward';
	}
	console.log(result);
	fn(result);
});

socket.on('reverse', function(data, fn){
	var result;
	if(direction=='reverse'){
		result = {status:400, message:'Controller is already in reverse direction'};
	} else if(state!='stop'){
		result = {status:400, message:'Controller is running. Please stop first'};
	} else{
		console.log(data.username + ' reveresed with ' + speed + ' speed');
		result = {status:200, message:'Reverse operation successfully executed', state:'running'};
		direction = 'reverse';
	}
	console.log(result);
	fn(result);
});

socket.on('low', function(data, fn){
	if(status=='stop'){
		speed = 'low';
		result = {status:200, message:'speed set to low'};
	} else {
		result = {status:400, message:'Controller is running. Please stop first'};
	}
	result.state = 'running';
	console.log(result);
	fn(result);
});

socket.on('high', function(data, fn){
	if(status=='stop'){
		speed = 'low';
		result = {status:200, message:'speed set to high'};
	} else {
		result = {status:400, message:'Controller is running. Please stop first'};
	}
	result.state = 'running';
	console.log(result);
	fn(result);
});

socket.on('med', function(data, fn){
	if(status=='stop'){
		speed = 'low';
		result = {status:200, message:'speed set to medium'};
	} else {
		result = {status:400, message:'Controller is running. Please stop first'};
	}
	result.state = 'running';
	console.log(result);
	fn(result);
});

socket.on('move_pt_five', function(data, fn){
	result = setDistance(0.5)
	console.log(result);
	fn(result);
});

socket.on('move_one', function(data, fn){
	result = setDistance(1)
	console.log(result);
	fn(result);
});

socket.on('move_one_pt_five', function(data, fn){
	result = setDistance(1.5)
	console.log(result);
	fn(result);
});

socket.on('move_two', function(data, fn){
	result = setDistance(2)
	console.log(result);
	fn(result);
});

socket.on('move_two_pt_five', function(data, fn){
	result = setDistance(2.5)
	console.log(result);
	fn(result);
});

socket.on('move_three', function(data, fn){
	result = setDistance(3)
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
		result = {status:400, message:data.username + ' is not connected to this controller'};
	else{
		result = {status:200, message:'successfully deselected this controller'}; 
		taken = false;
	}
	console.log(result);
	fn(result);
});


function setDistance(n){
	var result;
	if(direction == 'forward' && distance + n > 3){
		result = {status:400, message:'Error! Will exceed the maximum distance of 3'};
	} else if(direction == 'reverse' && distance - n < 0){
		result = {status:400, message:'Error! Will exceed the minimum distance of 0'};
	} else{
		if(direction == 'forward')
			distance += n;
		else
			distance -= n;
		result = {status:200, message:'Conveyor now running ' + distance};
	}
	result.distance = distance;
	return result;
}