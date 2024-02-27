CREATE TABLE data
(
  roll_num SERIAL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  phone_number VARCHAR(255),
  address VARCHAR(255),
  age INT,
  date_of_birth VARCHAR(255),
  gender VARCHAR(255),
  CONSTRAINT data_pkey PRIMARY KEY(roll_num)
);