INSERT INTO manufacturer (name) VALUES ('voltaic');
INSERT INTO manufacturer (name) VALUES ('4i Systems');
INSERT INTO city (name) VALUES ('Bobbyton');
INSERT INTO state (name) VALUES ('Cheese County');
INSERT INTO country (name) VALUES ('Cheeseland');
INSERT INTO products (name, barcode, idman) VALUES ('Your mum', 123456789, 1);
INSERT INTO address (street, city, state, country, zip) VALUES ('Manly St', 1, 1, 1, '1090');
INSERT INTO factory (name) VALUES ('Bobbytory');
INSERT INTO manufacturer_factory (idfactory, idmanufacturer) VALUES (1, 1);
INSERT INTO address (street, city, state, country, zip) VALUES ('Manly Rd', 1, 1, 1, '1090');
INSERT INTO factory_address (idfactory, idaddress) VALUES (1,2);