DROP DATABASE IF EXISTS maps_places;

CREATE DATABASE maps_places;

\c maps_places;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  preferred_language TEXT,
  documents TEXT
);

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

CREATE TABLE favorite (
  favorite_id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(user_id),
  name text,
  url text,
  category text,
  is_favorite boolean,
  resource_id integer REFERENCES places(resource_id)
);