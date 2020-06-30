# NodeJs-Express application for registering users in MySQL using EJS as a template engine

This is a NodeJs built using Express for registering users to a MySQL database. It uses an embedded UI, build using [EJS](https://ejs.co/)


There are three parts of this project.

1) Registration service

    An independent service used to register users.
    
2) Login service

URL: [login service](https://github.com/monil-panchal/nodejs-express-ejs-login)

An independent service allowing registered users to login to the system.
This service generates a [JWT](https://jwt.io/) token based on the user's hashed password + login time as a secret, and stores the secret in the central database (acting as a central secret manager)

3) Dashboard service
    
URL: [dashboard service](https://github.com/monil-panchal/nodejs-express-ejs-user-dashboard)

An independent service allowing registered users to to view a list of registered online users.
This service validates the [JWT](https://jwt.io/) token based on the user's hashed password + login time as a secret which is retrieved from the central database.

 
## Installation

Import this project in any IDE

Using [npm](https://www.npmjs.com/), build the project by running following command:

```
npm install
```

#### Run the project
```
npm start
```

This will spawn an embedded web server running on port: `http://localhost:8080/.`

#### Database setup


Setup a MySQL database server and execute the following commands to setup the database and tables. Add the connection details to  `connection/db-connection.js`


```
create database csci5410A2;
use csci5410A2;

CREATE TABLE user (
user_id BIGINT NOT NULL AUTO_INCREMENT,
first_name varchar (255) NOT NULL,
last_name varchar (255) NOT NULL,
email varchar (255) NOT NULL UNIQUE,
password varchar (255) NOT NULL,

PRIMARY KEY (user_id)

);

CREATE INDEX email_index ON user (email);

CREATE TABLE user_session (

user_id BIGINT NOT NULL,
secret_key varchar (255) NOT NULL,
status varchar (255) NOT NULL,
login_time datetime,

PRIMARY KEY (user_id),

FOREIGN KEY (user_id) REFERENCES user(user_id)
);


```

## Usage

Enter the user's registration details on the webpage to register the user.