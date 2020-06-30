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
