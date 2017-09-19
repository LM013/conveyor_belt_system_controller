var express = require('express');
var router = express.Router();

//restrict access to pages that requires log in
function restrict(req, res, next){
	console.log(req.session.user);
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

router.get('/home', restrict, function(req, res, next){
	if(req.session.user.controller)
		res.redirect('operation')
	else
		res.sendFile('home.html', { root: __dirname + '/../src/'} );
});

router.get('/operation', restrict, function(req, res, next){
	console.log(req.session);
	res.sendFile('operation.html', { root: __dirname + '/../src/'});
});

router.get('/continuous_run', restrict, function(req, res, next){
	res.sendFile('continuous_run.html', { root: __dirname + '/../src/'});
});

router.get('/jogging', restrict, function(req, res, next){
	res.sendFile('jogging.html', { root: __dirname + '/../src/'} );
})

router.get('/change_password', function(req, res, next){
	res.sendFile('change_password.html', { root: __dirname + '/../src/'} );
})

router.get('/connect',restrict, function(req, res, next){
	req.session.user.controller = req.query.ip;
	res.status(200).send({status: '200'});
});

router.get('/disconnect', restrict, function(req,res, next){
	delete req.session.user.controller;
	res.redirect('/home');
});

module.exports = router;
