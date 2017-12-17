'use strict';
const mysql = require('mysql2');
const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);

const session = function () {

  const pool = mysql.createPool({
    connectionLimit: 5,
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'inschool',
    charset: 'utf8mb4_unicode_ci',
  });

  const sessionConfig = {
    secret: '338@laksAKj181-2-a9381653@a!',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: new MySQLStore({}, pool)
  };

  return expressSession(sessionConfig);

};

module.exports = session;
