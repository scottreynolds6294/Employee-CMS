const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
    host: 'localhost',
    dialect: 'postgres'
   }
);

sequelize.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

module.exports = sequelize;