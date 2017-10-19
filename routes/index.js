var express = require('express');
var router = express.Router();
var socket = require('socket.io-client')('http://10.11.223.153:3000');

//restrict access to pages that requires log in
function restrict(req,res,next){
	if (req.session.user) {
    	next();
  	} else {
    	res.redirect('/');
  	}
}

router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + '/../src/'} );
});

router.get('/header', function(req, res, next) {
	res.sendFile('header.html', { root: __dirname + '/../src/'} );
});

router.get('/home', restrict, function(req, res,next){
	if(req.session.user.controller)
		res.redirect('operation')
	else
		res.sendFile('home.html', { root: __dirname + '/../src/'} );
});

router.get('/operation', restrict, function(req, res,next){
	if(req.session.user.controller)
		res.sendFile('operation.html', { root: __dirname + '/../src/'});
	else{
		res.redirect('home');
	}
});

router.get('/continuous_run', restrict, function(req, res,next){
	res.sendFile('continuous_run.html', { root: __dirname + '/../src/'});
});

router.get('/jogging', restrict, function(req, res,next){
	res.sendFile('jogging.html', { root: __dirname + '/../src/'} );
})

router.get('/change_password', restrict, function(req, res,next){
	res.sendFile('change_password.html', { root: __dirname + '/../src/'} );
})

router.post('/select',restrict, function(req, res,next){
	var body = {};
	body.id = req.body.id;
	body.username = req.session.user.username;
	
	socket.emit('select', body, function(result){
		console.log(result);
		if(result.status == 200)
			req.session.user.controller = req.body.id;
		res.json(result);
	});
});

router.post('/deselect', restrict, function(req,res,next){
	var body = {};
	body.i = req.session.user.controller;
	body.username = req.session.user.username;

	socket.emit('deselect', body, function(result){
		console.log(result);
		if(result.status == 200)
			delete req.session.user.controller;
		res.json(result);
	});
});


router.post('/send', restrict, function(req,res,next){
	var body = {};
	body.i = req.session.user.controller;
	body.username = req.session.user.username;
	body.control = req.body.control;

	console.log(body);
	socket.emit('control', body, function(result){
		console.log(result);
		res.json(result);
	});
});

router.get('/list', restrict, function(req,res, next){
	socket.emit('length', function(result){
		console.log(result);
		res.status(200).json(result);
	});
});


module.exports = router;
