/* Create tables based on initial schema. */

/**************************************************/
/**************************************************/

DROP SCHEMA IF EXISTS paz;

CREATE SCHEMA paz;

-- Users and Award type cannot be dropped until award is dropped
DROP TABLE IF EXISTS award;
DROP TABLE IF EXISTS award_type;
DROP TABLE IF EXISTS account_recovery;

DROP TABLE IF EXISTS users;

-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password varchar(60) NOT NULL,
    signature bytea,
    is_admin BOOLEAN
);

-- Award Type
CREATE TABLE award_type (
    id SERIAL PRIMARY KEY,
    name varchar(45) NOT NULL UNIQUE
);

-- Award
CREATE TABLE award (
    id SERIAL PRIMARY KEY,
    recipient_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    granter_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    award_type_id INTEGER NOT NULL REFERENCES award_type ON DELETE CASCADE,
    awarded_datetime TIMESTAMP default current_timestamp
);

CREATE TABLE account_recovery (
  id SERIAL PRIMARY KEY,
  email VARCHAR(45) NOT NULL REFERENCES users (email),
  token VARCHAR(60) NOT NULL,
  expiration TIMESTAMP default current_timestamp
);