CREATE DATABASE weatherapp;

CREATE TABLE weatheruser(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    favorite_city VARCHAR(255)
);


INSERT INTO weatheruser (first_name, last_name, favorite_city) VALUES('Lex', 'Llanes', 'Seattle');