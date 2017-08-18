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
        connection.query("SELECT * FROM Accounts where username=?", [req.body.username], function(err, rows, fields){
            if(!err){
                if(rows.length == 0){
                    res.status(404).send({status: 'Username not found'});
                } else {
                    var user = rows[0];
                    if(user.password != md5(sha1(req.body.password))){
                        res.status(403).send({status: 'incorrect password'});
                    } else {
                        res.status(200).send("logged in");
                    }
                }
            } else {
                console.log(err);
                res.status(500).send({status: 'error'});
            }
        });
    },

    logout: function(req, res){
        if (req.session.key) {
            req.session.destroy();
            res.status(200).send({status:'logged out'});
        } else {
            res.status(404).send({status: 'not good'});
        }
    },

    signup: function(req, res){
        console.log(req);
        connection.query("INSERT Accounts (firstName, lastName, username, password) values (?, ?, ?, MD5(SHA1(?)))", [req.body.first_name, req.body.last_name, req.body.new_username, req.body.new_password], function(err, rows, fields){
            if(!err){
                /*if(rows.length != 0){
                    res.status(403).send({status: 'User already exists'});
                }*/
                res.status(200).send("signed up");
            } else {
                console.log(err);
                res.status(500).send({status: 'error'});
            }
        });
    }
}
