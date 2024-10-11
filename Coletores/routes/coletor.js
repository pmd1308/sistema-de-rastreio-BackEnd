const express = require('express');
const router = express.Router();
const { registrarColetor, loginColetor } = require('../controllers/coletorController');

// Rota para registrar coletor
router.post('/registrar', registrarColetor);

// Rota para login do coletor
router.post('/login', loginColetor);

module.exports = router;
