var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection =  mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'tiger',
	database: 'accounts'
});

router.get("/view", function(req, res){
	console.log(req.body.username);
	connection.query('SELECT * from Users where username=\'diegosevilla\'' , function(err, rows, fields) {
	   	if (!err){
	    	console.log('The solution is: ', rows);
	    	res.send(rows);
	   	}
	   	else
	     	console.log('Error while performing Query.' + err);
	});
});

module.exports = router;
