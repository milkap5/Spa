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

router.get('/formulario-turno', (req, res) => {
  if (!req.session.usuario || req.session.usuario.usuarioTipo !== 'cliente') {
    return res.redirect('/inicioSesion');
  }

  res.render('pages/users/cliente/f_solicitudTurno', {
    usuario: req.session.usuario
  });
});

module.exports = router;