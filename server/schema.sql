CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT AUTO_INCREMENT, name varchar(20), PRIMARY KEY(id), UNIQUE (name)
);
/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id INT AUTO_INCREMENT, name varchar(20), PRIMARY KEY(id), UNIQUE (name)
);

CREATE TABLE messages (
  messageID INT AUTO_INCREMENT,
  messageText varchar(140),
  userID int,
  roomID int,
  createAt DATETIME,
  PRIMARY KEY (messageID),
  FOREIGN KEY (userID)
    REFERENCES users(id),
  FOREIGN KEY (roomID)
    REFERENCES rooms(id)
  /* Describe your table here.*/
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

