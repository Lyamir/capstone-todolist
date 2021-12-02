const mysql = require('mysql')
const config = require('../config/config.json')
const fs = require('fs')

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  multipleStatements: true
})

connection.connect(error =>{
  if(error) throw error;

  connection.query(seedQuery, err => {
    if (err)
      throw err
    else
      console.log("SQL Seed Completed")
  })
  console.log("DB Connection Successful")
})

const seedQuery = fs.readFileSync('model/seed.sql', {
  encoding: 'utf-8',
})



module.exports = connection