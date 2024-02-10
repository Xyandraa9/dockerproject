const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const client = new Client({
  user: 'nitt',
  host: 'localhost',
  database: 'form_data',
  password: 'admin',
  port: 8002,
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
    school_name: req.body.school_name,
    age: req.body.age,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
  };

  const query = `
    INSERT INTO user_data (first_name, last_name, phone_number, address, school_name, age, date_of_birth, gender)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  try {
    const result = await client.query(query, [
      formData.first_name,
      formData.last_name,
      formData.phone_number,
      formData.address,
      formData.school_name,
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
