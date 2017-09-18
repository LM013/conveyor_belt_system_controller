// be sure to import your model here
// var error = require('../public/constants/ErrorTypes');

var mysql = require('mysql');
var md5 = require('md5');
var sha1 = require('sha1');

var connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: 'conveyor'
});

module.exports= {
    login: function(req, res) {
        var queryString = "SELECT * FROM Accounts where username=?"; 
        connection.query(queryString, [req.body.username], function(err, rows,  fields){
            if(!err){
                if(rows.length == 0){
                    res.status(404).send({status: 'Username not found'});
                } else {
                    var user = rows[0];
                    if(user.password != md5(sha1(req.body.password))){
                        res.status(403).send({status: 'incorrect password'});
                    } else { 
                        delete user.password; // delete the password from the session
                        req.session.user = user;  //refresh the session value
                        console.log(req.session);
                        res.status(200).send({status:"logged in"});
                    }
                }
            } else {
                console.log(err);
                res.status(500).send({status: 'error'});
            }
        });
    },

    logout: function(req, res){
        req.session.reset();
        res.redirect('/');
    },

    whoami: function(req,res){
        var queryString = "SELECT * FROM Accounts where id=?"; 
        connection.query(queryString, [req.session.user.id], function(err, rows,  fields){
            if(!err){
                if(rows.length == 0){
                    res.status(404).send({status: 'Username not found'});
                } else {
                    var user = rows[0];
                    res.writeHead(200, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify(user));
                    res.end();
                }
            } else {
                console.log(err);
                res.status(500).send({status: 'error'});
            }
        });
    },

    signup: function(req, res){
        var queryString = "INSERT Accounts (firstName, lastName, username, password) values (?, ?, ?, MD5(SHA1(?)))"
        connection.query(queryString, [req.body.first_name, req.body.last_name, req.body.new_username, req.body.new_password], function(err, rows, fields){
            if(!err){
                var queryString = "SELECT * FROM Accounts where id=?";
                connection.query(queryString, [rows.insertId], function(err, rows){
                    if(!err){
                        var user = rows[0]; 
                        delete user.password; // delete the password from the session
                        req.session.user = user;  //refresh the session value
                        console.log(req.session);
                        res.status(200).send({status:"logged in"});
                    }
                });
            } else {
                if(err.code == 'ER_DUP_ENTRY'){
                    res.status(403).send({status: 'Username already exists'});
                } else{
                    res.status(500).send({status: 'error'});
                }
            }
        });
    }
}
