DROP DATABASE IF EXISTS maps_places;

CREATE DATABASE maps_places;

\c maps_places;

CREATE TABLE places (
  id SERIAL PRIMARY KEY,
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