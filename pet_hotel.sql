--ORIGINAL PET HOTEL CREATE
CREATE  TABLE pets (
  id SERIAL PRIMARY KEY NOT NULL,
  ownerfirstname VARCHAR(20),
  ownerlastname VARCHAR(20),
  petname VARCHAR(20),
  breed VARCHAR(20),
  color VARCHAR(15),
  check_indate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  check_outdate TIMESTAMP
)

--PET HOTEL 2 SQL COMMANDS
-- Create tables
CREATE TABLE pets (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40),
	breed VARCHAR(40),
	color VARCHAR(40)
);

CREATE TABLE visits (
	id SERIAL PRIMARY KEY,
	check_in TIMESTAMP,
	check_out TIMESTAMP,
	pet_id INT REFERENCES pets(id)
);

CREATE TABLE owners (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	phone_number VARCHAR(20)
);

CREATE TABLE pet_owner (
	pet_id INT REFERENCES pets(id) ON DELETE CASCADE,
	owner_id INT REFERENCES owners(id) ON DELETE CASCADE
);
