const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
   user: 'scottreynolds',
   host: 'localhost',
   database: 'employees_db',
   password: 'Terps4114',
   port: '5432'
   },
   console.log('Connected to the employees_db database!'));

   client.connect();

module.exports = client;