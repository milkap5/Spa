const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

router.post('/verificar-registro', registroController.verificarDatos);
router.post('/registro', registroController.registrarDatos);

module.exports = router;