'use strict';
const _ = require('lodash'); // Lodash API
const moment = require('moment');

class Core {

  constructor() { }

  async getUserClassroom({ id }) {

    const conn = await app.connection();

    const params = [ id ];
    const sql = 'select * from `user_classroom` where `user_id` = ?';
    const rows = await conn.query(sql, params);

    conn.release();
    return rows[0];

  }

  async getUserExams({ id, start, end }) {

    start = start || moment().startOf('month').subtract(10, 'day').format('YYYY-MM-DD');
    end = end || moment().endOf('month').add(10, 'day').format('YYYY-MM-DD');

    const classroomList = await this.getUserClassroom({ id });
    const classroomIds = _.map(classroomList, 'classroom_id');

    const conn = await app.connection();
    const params = [ start, end, classroomIds ];
    const sql = 'SELECT e.*, DATE_FORMAT(ce.scheduledTo, "%Y-%m-%d") AS scheduledTo FROM classroom_exam ce INNER JOIN exam e ON e.id = ce.exam_id WHERE ((scheduledTo >= ? AND scheduledTo <= ?) AND ce.classroom_id IN (?))';
    const rows = await conn.query(sql, params);

    conn.release();
    return rows[0];

  }

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
