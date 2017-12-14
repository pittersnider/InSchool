'use strict';

class Core {

  constructor() { }

  async getUserPair({ email, password }) {

    const conn = await app.connection();

    const params = [ email, password ];
    const sql = 'select * from `user` where `email` = ? and `password` = sha2(?, 512) limit 1';
    const rows = await conn.query(sql, params);

    conn.release();
    return rows[0];

  }

}

const core = new Core();
module.exports = core;
