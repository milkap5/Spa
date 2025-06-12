const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');
const inicioSesionController = require('../controllers/inicioSesionController');

router.post('/verificar-registro', registroController.verificarDatos);
router.post('/registrar-usuario', registroController.registrarDatos);
router.post('/iniciar-sesion', inicioSesionController.iniciarSesion);

module.exports = router;