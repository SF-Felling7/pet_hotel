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
