const express = require('express');
const router = express.Router();
const verificarSesion = require('../../utils/authMiddleware');

router.get('/', (req, res) => {
    res.render('pages/users/profesional/index', { usuario: req.session.usuario });
});

router.get('/pannel-turno', (req, res) => {
    res.render('pages/users/profesional/panelTurnos');
})

// Aquí puedes agregar más rutas específicas del profesional si las implementás

module.exports = router;
