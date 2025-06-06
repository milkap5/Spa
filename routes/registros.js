const express = require('express');
const router = express.Router();
const { verificarDatos } = require('../controllers/registroController');

router.post('/verificar-registro', verificarDatos);

module.exports = router;