const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');
const sesionController = require('../controllers/sesionController');

router.post('/verificar-registro', registroController.verificarDatos);
router.post('/registrar-usuario', registroController.registrarDatos);
router.post('/iniciar-sesion', sesionController.iniciarSesion);
router.get('/cerrar-sesion', sesionController.cerrarSesion);
module.exports = router;