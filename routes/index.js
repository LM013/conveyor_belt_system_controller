var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + '/../src/'} );
});

var mysql = require('mysql');

var connection =  mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'tiger',
	database: 'accounts'
});

router.get("/login", function(req, res){
	console.log(req.body.username);
	connection.query('SELECT * from Users where username='+req.body.username , function(err, rows, fields) {
	   	if (!err){
	    	console.log('The solution is: ', rows);
	    	res.send(rows);
	   	}
	   	else{
	     	console.log('Error while performing Query.' + err);
	     	res.send(err);
	   	}
	});
});

module.exports = router;
