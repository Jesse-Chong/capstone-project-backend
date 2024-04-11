\c maps_places;

INSERT INTO users (first_name, last_name, email, password_hash)
VALUES
('Natyka', 'Callwood', 'natyka@email.com', 'password123'),
('Christine', 'Marchese', 'christine@email.com', 'password456'),
('Jameel', 'Ibrahim', 'jameel@email.com', 'password789'),
('Jesse', 'Chong', 'jesse@email.com', 'password321'),
('Carlos', 'Godoy', 'carlos@email.com', 'password654');

INSERT INTO places (place_id, name, formatted_address, formatted_phone_number, rating, website, opening_hours, photo_reference,photo_url,latitude,longitude)
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

INSERT INTO favorite (is_favorite, category, name, image) VALUES 
  (true, 'DMV', 'Driver License', 'https://dmv.ny.gov/forms/id44.pdf'),
(true, 'HealthCare', 'Health Insurance', 'https://www.health.ny.gov/forms/doh-4220.pdf'),
(true, 'Food', 'Food Stamp', 'https://otda.ny.gov/programs/applications/4826.pdf'),
(true, 'Jobs', 'Resume Template - 1', 'https://app.enhancv.com/resume/new?example=template-creative&color=4C4C67,222F5C&fromLanding=true'),
(false, 'Jobs', 'Resume Template - 2', 'https://app.enhancv.com/resume/new?example=template-ivy-league&color=000000,6F7878&fromLanding=true'),
(true, 'Jobs', 'Resume Template - 3', 'https://app.enhancv.com/resume/new?example=template-junior&color=002878,FF6E01/&fromLanding=true'),
(false, 'Government Services', 'Social Security', 'https://www.ssa.gov/forms/ss-5.pdf');