var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + '/../src/'} );
});

router.get('/home', function(req, res, next){
	res.sendFile('home.html', { root: __dirname + '/../src/'});
});

router.get('/operation', function(req, res, next){
	res.sendFile('operation.html', { root: __dirname + '/../src/'});
});

module.exports = router;
