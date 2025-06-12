const express = require('express');
const router = express.Router();
const verificarSesion = require('../../utils/authMiddleware');

router.get('/', verificarSesion, (req, res) => {
    if (req.session.usuario.usuarioTipo !== 'admin') return res.redirect('/');
    res.render('pages/users/admin/index', { usuario: req.session.usuario });
});

router.get('/pagina_admin', (req, res) => res.render('pages/users/admin/pagina_admin'));

module.exports = router;
