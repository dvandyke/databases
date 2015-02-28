CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INT AUTO_INCREMENT, messageText varchar(140), userID int, roomID int, createAt DATETIME, PRIMARY KEY (id)
  /* Describe your table here.*/
);

CREATE TABLE users (
  id INT AUTO_INCREMENT, name varchar(20), PRIMARY KEY(id)
);
/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id INT AUTO_INCREMENT, name varchar(20), PRIMARY KEY(id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

