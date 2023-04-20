const mysql = require('mysql')
// const mysql = require("mysql2");
const dbConfig = require('../config/db.config.js')

// let config={
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// }

//   // create the pool
//   const pool = mysql.createPool(config);

//   // now get a Promise wrapped instance of that pool
//   const promisePool = pool.promise();

//   //now override the 'query' function to simply return the data
//   let db={
//     query: async (sql, params)=>{
//       [result,]=await promisePool.query(sql,params);
//       return result;
//     }
//   }

// module.exports = db;

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
})

connection.connect( error => {
  if (error) throw error
  console.log('Successfully connected to the database.')
})

module.exports = connection
