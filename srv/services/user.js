'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/:id/calendar', async function (req, res) {
  const { params, query } = req;
  const exams = await app.core.getUserExams(_.merge(params, query));

  const calendar = exams.map((exam) => {
    return {
      'id': exam.id,
      'color': '#e74c3c',
      'start': exam.scheduledTo,
      'title': `${exam.name} (${exam.worth})`,
      'url': `/exam/${exam.id}`,
      'editable': false,
      'eventDurationEditable': false,
      'allDay': true,
      'payload': exam
    };
  });

  return res.status(200).json(calendar);
});

module.exports = router;
