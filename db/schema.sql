DROP DATABASE IF EXISTS maps_places;

CREATE DATABASE maps_places;

\c maps_places;

DROP TABLE users;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  preferred_language TEXT
);

DROP TABLE places;
CREATE TABLE places (
  resource_id SERIAL PRIMARY KEY,
  place_id VARCHAR(1000),
  name VARCHAR(255),
  formatted_address VARCHAR(1000),
  formatted_phone_number VARCHAR(20),
  rating FLOAT,
  website VARCHAR(255),
  opening_hours JSONB,
  photo_reference VARCHAR(1000),
  photo_url VARCHAR(1000),
  latitude FLOAT,
  longitude FLOAT
);

DROP TABLE favorite;
CREATE TABLE favorite (
  favorite_id SERIAL PRIMARY KEY,
  is_favorite BOOLEAN,
  category TEXT,
  name TEXT,
  image TEXT
);

DROP TABLE users_favorite;
CREATE TABLE users_favorite (
  user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  favorite_id INTEGER REFERENCES favorite(favorite_id) ON DELETE CASCADE
);