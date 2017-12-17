app = { views: {}, };

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const request = require('request');
const helmet = require('helmet');
const mysql = require('mysql2/promise');
const htmlmin = require('htmlmin');
const session = require('./middleware/session');

function cacheViews() {
  function loadView(name) {
    const viewName = name.split('.html')[0];
    const source = fs.readFileSync(__dirname + '/views/' + name, { encoding: 'utf8', });
    app.views[viewName] = htmlmin(source);
  }

  fs.readdirSync(__dirname + '/views').forEach(loadView);
}

cacheViews();
setInterval(cacheViews, 5000);

app.database = mysql.createPool({
  connectionLimit: 15,
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'inschool',
  charset: 'utf8mb4_unicode_ci',
});

app.connection = async (options = { isTransaction: false, }) => {
  try {

    const conn = await app.database.getConnection();
    if (options.isTransaction) {
      await conn.beginTransaction();
    }

    return conn;

  } catch (ex) {
    throw ex;
  }
};

const port = 4000 + +process.env.NODE_APP_INSTANCE;

const server = express();
app.core = require('./core');
app.server = server;

server.set('trust proxy', 1);
server.use(helmet());
server.use(session());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false, }));
server.use(passport.initialize());
server.use(passport.session());
server.use('/api/v1', require('./services/routes'));
server.use((req, res) => res.status(404).send(app.views['404']));
server.listen(port);
module.exports = server;
