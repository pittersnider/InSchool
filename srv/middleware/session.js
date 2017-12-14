'use strict';
const expressSession = require('express-session');

const session = function () {

  const sessionConfig = {
    secret: '338@laksAKj181-2-a9381653@a!',
    resave: true,
    rolling: true,
    saveUninitialized: true
  };

  return expressSession(sessionConfig);

};

module.exports = session;
