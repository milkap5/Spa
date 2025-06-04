const express = require('espress');
const router = express.Router();
const { registrarUsuario } = require('../controllers/authController');

router.post('/validar', registrarUsuario);

module.exports = router;