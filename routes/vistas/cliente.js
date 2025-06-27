const express = require('express');
const router = express.Router();
const verificarSesion = require('../../utils/authMiddleware');

router.get('/', (req, res) => { res.render('pages/users/cliente/index');});

router.get('/solicitudTurno', verificarSesion, (req, res) => {
    res.render('pages/users/cliente/solicitudTurno');
});

router.get('/turnoConfirmado', verificarSesion, (req, res) => {
    res.render('pages/users/cliente/turnoConfirmado');
});



router.get('/formulario-turno', (req, res) => {
  if (!req.session.usuario || req.session.usuario.usuarioTipo !== 'cliente') {
    return res.redirect('/inicioSesion');
  }

  res.render('pages/users/cliente/f_solicitudTurno', {
    usuario: req.session.usuario
  });
});

module.exports = router;
