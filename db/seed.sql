\c maps_places;

INSERT INTO users (user_id, first_name, last_name, user_name, email, password_hash, preferred_language, documents)
VALUES
('Natyka', 'Callwood', 'Natty', 'natyka@email.com', 'password123', 'english'),
('Christine', 'Marchese', 'Catwoman', 'christine@email.com', 'password456', 'english'),
('Jameel', 'Ibrahim', 'Jameel', 'jameel@email.com', 'password789', 'english'),
('Jesse', 'Chong', 'J-Steezy', 'jesse@email.com', 'password321', 'english'),
('Carlos', 'Godoy', 'Superman', 'carlos@email.com', 'password654', 'english');

INSERT INTO places (resource_id, place_id, name, formatted_address, formatted_phone_number, rating, website, opening_hours, photo_reference, photo_url, latitude, longitude)
  VALUES
(
  'ChIJTdDmyzpZwokRTpyw5FZIq_U',
  'Borden Avenue Veterans Residence', 
  '21-10 Borden Ave, Long Island City, NY 11101, USA',
  '(718) 784-5690',
  3.3,
  'https://www.nyc.gov/site/dhs/shelter/singleadults/veterans-shelter.page',
  '{"weekday_text": ["Monday: Open 24 hours", "Tuesday: Open 24 hours", "Wednesday: Open 24 hours", "Thursday: Open 24 hours", "Friday: Open 24 hours", "Saturday: Open 24 hours", "Sunday: Open 24 hours"]}',
  'ATplDJbUP4RxJcEDCWzIp-4GgwaajfVvmY1P-u_gKs32GDhWnu961ac0QF9n6elAD-w7ks8Av1i0ptQ9Ah9FRvdJEOrC8YJBR2vcFsCrWyc3nBFTDYbJniPVoCyhy21TDBEj-EzEk1pTr98t0J0OGAxSuo5zY4Dxu2PXvy67DRw0czoFSKU0',
  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=ATplDJbUP4RxJcEDCWzIp-4GgwaajfVvmY1P-u_gKs32GDhWnu961ac0QF9n6elAD-w7ks8Av1i0ptQ9Ah9FRvdJEOrC8YJBR2vcFsCrWyc3nBFTDYbJniPVoCyhy21TDBEj-EzEk1pTr98t0J0OGAxSuo5zY4Dxu2PXvy67DRw0czoFSKU0&key=df23er23erdewd3dwqed3fe',
  40.7401792, 
  -73.9493851
);

INSERT INTO favorite(user_id, name, url, category, is_favorite, resource_id) VALUES
 ('1', 'Borden Avenue Veterans Residence', 'https://www.nyc.gov/site/dhs/shelter/singleadults/veterans-shelter.page', 'pending', 'true', '1');

 



