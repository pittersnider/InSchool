'use strict';
const express = require('express');
const router = express.Router();

router.get('/views', function (request, response) {
  response.status(200).json(app.views);
});

//  ________  ___  ___  ___  ___       ________  ________      
// |\   ____\|\  \|\  \|\  \|\  \     |\   ___ \|\   ____\     
// \ \  \___|\ \  \\\  \ \  \ \  \    \ \  \_|\ \ \  \___|_    
//  \ \  \    \ \   __  \ \  \ \  \    \ \  \ \\ \ \_____  \   
//   \ \  \____\ \  \ \  \ \  \ \  \____\ \  \_\\ \|____|\  \  
//    \ \_______\ \__\ \__\ \__\ \_______\ \_______\____\_\  \ 
//     \|_______|\|__|\|__|\|__|\|_______|\|_______|\_________\

// @@ Controla todos os serviços de autenticação e de sessão
router.use('/session', require('./authenticate'));

module.exports = router;
