/* Create tables based on initial schema. */

/**************************************************/
/**************************************************/

DROP SCHEMA IF EXISTS paz;

CREATE SCHEMA paz;

-- Users and Award type cannot be dropped until award is dropped
DROP TABLE IF EXISTS award;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS award_type;

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
    recipient_id INTEGER NOT NULL REFERENCES users,
    granter_id INTEGER NOT NULL REFERENCES users,
    award_type_id INTEGER NOT NULL REFERENCES award_type,
    awarded_datetime TIMESTAMP default current_timestamp

    /* TODO - figure out what kind of cascading we want, eg.
     ON DELETE NO ACTION ON UPDATE NO ACTION */
);

CREATE TABLE account_recovery (
  id SERIAL PRIMARY KEY,
  email VARCHAR(45) NOT NULL REFERENCES users,
  token VARCHAR(60) NOT NULL,
  expiration TIMESTAMP default current_timestamp
);