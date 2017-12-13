app = { views: {} };

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const request = require('request');
const helmet = require('helmet');
const mysql = require('mysql2/promise');
const htmlmin = require('htmlmin');
const session = require('./server/session');

function cacheViews() {
    function loadView(name) {
        const viewName = name.split('.html')[0];
        const source = fs.readFileSync('./server/views/' + name, { encoding: 'utf8' });
        app.views[viewName] = htmlmin(source);
        console.log('caching view %s', name);
    }

    fs.readdirSync('./server/views').forEach(loadView);
}

cacheViews();
setInterval(cacheViews, 5000);

app.database = mysql.createPool({
    connectionLimit: 15,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'inschool',
    charset: 'utf8mb4_unicode_ci'
});

app.connection = async (options = { isTransaction: false }) => {
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

const server = express();
api = require('./server/api');
app.server = server;

server.set('trust proxy', 1);
server.use(helmet());
server.use(session());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(passport.initialize());
server.use(passport.session());
server.use('/api/v1', require('./server/routes'));
server.use((req, res) => res.status(404).send('Essa pagina ainda nao existe :)'));
server.listen(4000, () => console.log('Listening on 127.0.0.1:80'));

module.exports = server;
