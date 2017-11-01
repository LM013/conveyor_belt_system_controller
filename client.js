var socket = require('socket.io-client')('http://192.168.8.108:3000');
var controller = {};
var taken;

controller.state = 'stop';
controller.speed = '';
controller.direction = 'forward';
controller.distance = 0;

socket.on('connect', function(){
	console.log('connected');
	socket.emit('controller');
	taken = false;
});

socket.on('index', function(index){
	console.log('i am controller #' + index);
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
	var fh = fopen("logs.txt", 3); // Open the file for writing

    if(fh!=-1) // If the file has been successfully opened
    {
        var str = "Some text goes here...";
        fwrite(fh, str); // Write the string to a file
        fclose(fh); // Close the file
    }
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

socket.on('status', function(fn){
	fn(controller);			
});

socket.on('stop', function(data, fn){
	if(controller.state == 'stop'){
		controller.status = 400;
		controller.message = 'Controller already stopped';
	} else{ 
		controller.status = 200;
		controller.message = 'Stop operation successfully executed';
		controller.state = 'stop';
	}
	fn(controller);
});

socket.on('forward', function(data, fn){
	if(controller.direction == 'forward'){
		controller.status = 400;
		controller.message = 'Controller is already in forward direction';
	} else if(controller.state != 'stop'){
		controller.status = 400;
		controller.message = 'Controller is running. Please stop first';
	} else {
		controller.status = 200;
		controller.message = 'Forward operation successfully executed';
		controller.direction = 'forward';
	}
	console.log(controller);
	fn(controller);
});

socket.on('reverse', function(data, fn){ 
	if(controller.direction == 'reverse'){
		controller.status = 400;
		controller.message = 'Controller is already in reverse direction';
	} else if(controller.state != 'stop'){
		controller.status = 400;
		controller.message = 'Controller is running. Please stop first';
	} else{
		controller.status = 200;
		controller.message = 'Reverse operation successfully executed';
		controller.direction = 'reverse';
	}
	console.log(controller);
	fn(controller);
});

socket.on('low', function(data, fn){
	if(controller.state == 'stop'){
		controller.speed = 'low';
		controller.status = 200;
		controller.message = 'speed set to low';
		controller.state = 'running';
	} else {
		controller.status = 400;
		controller.message = 'Controller is running. Please stop first';
	}
	console.log(controller);
	fn(controller);
});

socket.on('med', function(data, fn){
	if(controller.state == 'stop'){
		controller.speed = 'med';
		controller.status = 200;
		controller.message = 'speed set to medium';
		controller.state = 'running';
	} else {
		controller.status = 400;
		controller.message = 'Controller is running. Please stop first';
	}
	console.log(controller);
	fn(controller);
});

socket.on('high', function(data, fn){
	if(controller.state == 'stop'){
		controller.speed = 'high';
		controller.status = 200;
		controller.message = 'speed set to high';
		controller.state = 'running';
	} else {
		controller.status = 400;
		controller.message = 'Controller is running. Please stop first';
	}
	console.log(controller);
	fn(controller);
});

socket.on('move_pt_five', function(data, fn){
	setDistance(0.5)
	console.log(controller);
	fn(controller);
});

socket.on('move_one', function(data, fn){
	setDistance(1)
	console.log(controller);
	fn(controller);
});

socket.on('move_one_pt_five', function(data, fn){
	setDistance(1.5)
	console.log(controller);
	fn(controller);
});

socket.on('move_two', function(data, fn){
	setDistance(2)
	console.log(controller);
	fn(controller);
});

socket.on('move_two_pt_five', function(data, fn){
	setDistance(2.5)
	console.log(controller);
	fn(controller);
});

socket.on('move_three', function(data, fn){
	setDistance(3)
	console.log(controller);
	fn(controller);
});

function setDistance(n){
	if(controller.direction == 'forward' && controller.distance + n > 3){
		controller.status = 400;
		controller.message = 'Error! Will exceed the maximum distance of 3';
	} else if(controller.direction == 'reverse' && controller.distance - n < 0){
		controller.status = 400;
		controller.message = 'Error! Will exceed the minimum distance of 0';
	} else{
		if(controller.direction == 'forward')
			controller.distance += n;
		else
			controller.distance -= n;
		controller.status = 200
		controller.message = 'Conveyor now running ' + controller.distance;
	}
	return;
}