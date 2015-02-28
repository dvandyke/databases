var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('../db');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};


module.exports = {
  messages: {
    get: function (req, res) {
      // console.log('req');
      mysql.connection.connect(function(err) {
        mysql.connection.query('SELECT * from messages;', function(err, rows, fields){
          if(err){
            console.log(err);
          }
          console.log(rows);
          res.status(200).send(rows);
        });
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var body = req.body;
      var query = [body.text, body.username, 'Lobby', new Date()];

      mysql.connection.query("INSERT INTO messages VALUES (DEFAULT, ?, ('user', (SELECT id from users WHERE name=?)), ('room', (SELECT id from rooms WHERE name=?)), ?)", query, function(err, rows, fields) {
        if (err) {
          console.log(err);
        }
        console.log('success!');
        res.status(200).end();
      });
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var username = req.body.username;
      console.log(req.body);
      mysql.connection.query("INSERT INTO users VALUES (DEFAULT, ?)", [username], function(err, rows, fields){
        if(err){
          console.log(err);
        }
        res.status(200).end();
      });
    }
  }

};

