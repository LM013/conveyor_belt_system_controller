var express = require('express');
var router = express.Router();

function restrict(req, res, next){
	console.log(req.session.user);
	if (req.session.user) {
    	next();
  	} else {
    	res.redirect('/');
  	}
}
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session)
		console.log("anek");
	res.sendFile('index.html', { root: __dirname + '/../src/'} );
});

router.get('/logout', restrict, function(req, res, next){
	req.session.reset();
	res.redirect('/');
})

router.get('/home', restrict, function(req, res, next){
	res.sendFile('home.html', { root: __dirname + '/../src/'} );
});

router.get('/operation', restrict, function(req, res, next){
	res.sendFile('operation.html', { root: __dirname + '/../src/'});
});

router.get('/continuous_run', restrict, function(req, res, next){
	res.sendFile('continuous_run.html', { root: __dirname + '/../src/'});
});

router.get('/jogging', restrict, function(req, res, next){
	res.sendFile('jogging.html', { root: __dirname + '/../src/'} );
})

module.exports = router;
