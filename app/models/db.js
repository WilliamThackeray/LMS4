const mysql = require('mysql')
// const mysql = require("mysql2");
const dbConfig = require('../config/db.config.js')

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
})

connection.connect(err => {
  if (err) throw err
  console.log('info: Successful database connection...\n\n')
})

module.exports = connection;
