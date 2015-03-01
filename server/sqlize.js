var Sequelize = require('sequelize');
var sqlize = new Sequelize('chat', 'root', '');

var User = sqlize.define('User', {
  username: Sequelize.STRING
});


var Message = sqlize.define('Message', {
  messageText: Sequelize.STRING(140),
  roomname: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;
