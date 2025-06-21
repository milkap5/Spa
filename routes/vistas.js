const express = require('express');
const router = express.Router();

const rutasAdmin = require('./vistas/admin');
const rutasCliente = require('./vistas/cliente');
const rutasProfesional = require('./vistas/profesional');
const rutasPublicas = require('./vistas/publicas');

router.use('/', rutasPublicas);
router.use('/admin', rutasAdmin);
router.use('/cliente', rutasCliente);
router.use('/profesional', rutasProfesional);

module.exports = router;