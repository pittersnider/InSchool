const express = require('express');
const router = express.Router();

router.get('/views', function (request, response) {
    response.status(200).json(app.views);
});

app.validator = require('./validator');
validator = (name) => app.validator[name];

router.use('/session', require('./authentication'));

module.exports = router;