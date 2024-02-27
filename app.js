const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const client = new Client({
  user: 'root',
  host: 'postgres',
  database: 'root',
  password: 'root',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database', err));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
  const formData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    address: req.body.address,
    roll_num: req.body.roll_num,
    age: req.body.age,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
  };

//   CREATE TABLE data
// (
//   roll_num SERIAL,
//   first_name VARCHAR(255),
//   last_name VARCHAR(255),
//   phone_number VARCHAR(255),
//   address VARCHAR(255),
//   age INT,
//   date_of_birth VARCHAR(255),
//   gender VARCHAR(255),
//   CONSTRAINT data_pkey PRIMARY KEY(roll_num)
// );

  const query = `
    INSERT INTO data (roll_num, first_name, last_name, phone_number, address, age, date_of_birth, gender)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  try {
    const result = await client.query(query, [
      formData.roll_num,
      formData.first_name,
      formData.last_name,
      formData.phone_number,
      formData.address,
      formData.age,
      formData.date_of_birth,
      formData.gender,
    ]);

    console.log('Data inserted into PostgreSQL:', result.rows[0]);

    res.send('Form submitted successfully!');
  } catch (error) {
    console.error('Error inserting data into PostgreSQL:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
