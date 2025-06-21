const express = require('express');
const router = express.Router();
const verificarSesion = require('../../utils/authMiddleware');

router.get('/', (req, res) => { res.render('pages/users/cliente/index');});
router.get('/servicios-individuales', (req, res) => res.render('pages/users/cliente/servicios-individuales'));
router.get('/servicios-grupales', (req, res) => res.render('pages/users/cliente/servicios-grupales'));

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

// Otras páginas cliente
router.get('/pagina_cliente_reservar', (req, res) => res.render('pages/users/cliente/pagina_cliente_reservar'));
router.get('/pagina_cliente_gracias', (req, res) => res.render('pages/users/cliente/pagina_cliente_gracias'));
router.get('/pagina_cliente_consulta', (req, res) => res.render('pages/users/cliente/pagina_cliente_consulta'));
router.get('/pagina_cliente_registrado', (req, res) => res.render('pages/users/cliente/pagina_cliente_registrado'));

module.exports = router;
