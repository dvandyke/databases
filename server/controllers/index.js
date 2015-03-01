var models = require('../models');
var bluebird = require('bluebird');
var db = require('../sqlize');

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
      db.Message.findAll({include: [db.User]})
        .complete(function(err, results){
          res.status(200).send(results);
        })
      // mysql.connection.connect(function(err) {
      //   mysql.connection.query('SELECT messageID, messageText, name, createAt from messages join users', function(err, rows, fields){
      //     if(err){
      //       console.log(err);
      //     }
      //     res.status(200).send({results: rows});
      //   });
      // });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        .complete(function(err, results) {
          if (err) console.log('ERROROROROROROR:', err);
          console.log(results);
          db.Message.create({
            messageText: req.body.text,
            userID: results[0].dataValues.id,
            roomname: 'Lobby'
          })
            .complete(function(err, results) {
              res.status(201).send(results);
            })
        })
      // var body = req.body;
      // var roomname = req.body.roomname || 'Lobby'
      // var query = [body.text, body.username, roomname, new Date()];

      // mysql.connection.query("INSERT INTO messages VALUES (DEFAULT, ?, (SELECT id from users WHERE name=?), (SELECT id from rooms WHERE name=?), ?)", query, function(err, rows, fields) {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log('success!');
      //   res.status(200).end();
      // });
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {
      db.User.findAll()
        .complete(function(err, results) {
          res.status(200).send(results);
        });
      // mysql.connection.connect(function(err) {
      //   mysql.connection.query('SELECT name from users', function(err, rows, fields){
      //     if(err){
      //       console.log(err);
      //     }
      //     res.status(200).send({results: rows});
      //   });
      // });
    },
    post: function (req, res) {
      db.User.create({username: req.body.username})
        .complete(function(err, results) {
          res.status(201).send(results);
        });
      // var username = req.body.username;
      // mysql.connection.query("INSERT INTO users VALUES (DEFAULT, ?)", [username], function(err, rows, fields){
      //   if(err){
      //     console.log(err);
      //   }
      //   res.status(200).end();
      // });
    }
  }

};

