'use strict';
const express = require('express');
const router = express.Router();

/**
 * Retrieves the stored information about the current session.
 */
router.get('/', function (req, res) {

      return res.status(200).json(req.session.data);

});

/**
 * Attemps to sign in and create a new session.
 */
router.get('/signin', validator('login'), async function (req, res) {

      const { email, password } = req.body;
      await api.tryLogin();
      return res.status(201).end();

});

/**
 * Logout from the current session.
 */
router.delete('/', function (req, res) {
      delete req.session.data;
});

module.exports = router;