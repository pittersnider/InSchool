'use strict';
const _ = require('lodash');
const express = require('express');
const router = express.Router();

// @@ Obter dados da session atual
// @@ Tambem usado para verificar se esta logado
router.get('/', function (req, res) {
  if (req.session.user) {
    return res.status(200).json(_.omit(req.session, 'cookie'));
  }

  return res.status(401).end();
});

// @@ Excluir/sair da session atual
router.delete('/', function (req, res) {
  _.unset(req.session, 'user');
  return res.status(200).end();
});

// @@ Tentar fazer login usando email e senha
router.post('/login', async function (req, res) {

  const foundUsers = await app.core.getUserPair(req.body);
  const user = _.first(foundUsers);

  if (user) {
    const cleanUser = _.omit(user, 'password');

    _.set(req.session, 'user', cleanUser);
    res.status(200).json(cleanUser);

    return cleanUser;
  }

  return res.status(401).end();

});

module.exports = router;
