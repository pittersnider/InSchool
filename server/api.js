'use strict';

const api = {

      'tryLogin': async function ({ email, password }) {

            const params = [];
            const sql = 'SELECT (1+1 > 3 ) AS result;';
            const rows = await app.connection.query(sql, params);
            console.log(rows);
            return rows.length > 0;

      }

};

module.exports = api;