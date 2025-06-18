const express = require('express');
const router = express.Router();
const redirigirSiYaEstaLogueado = require('../../utils/redirigirSiYaEstaLogueado');

router.get('/', (req, res) => res.render('pages/users/noRegistrado/index'));

router.get('/registro', redirigirSiYaEstaLogueado, (req, res) => {
    res.render('pages/users/noRegistrado/f_registro');
});

router.get('/inicioSesion', redirigirSiYaEstaLogueado, (req, res) => {
    const errorLogin = req.query.error || null;
    res.render('pages/users/noRegistrado/f_inicioSesion', { errorLogin });
});

router.get('/bienvenido/:id', (req, res) => {
    const { id } = req.params;
    res.render('pages/users/noRegistrado/p_bienvenidoAlSpa', { id });
});

router.get('/confirmarCodigo', (req, res) => res.render('pages/users/noRegistrado/confirmarCodigo'));
router.get('/contraseniaActualizadaCorrectamente', (req, res) => res.render('pages/users/noRegistrado/contraseniaActualizadaCorrectamente'));
router.get('/ingreseNuevaContrasenia', (req, res) => res.render('pages/users/noRegistrado/ingreseNuevaContrasenia'));
router.get('/olvideMiContrasenia', (req, res) => res.render('pages/users/noRegistrado/olvideMiContrasenia'));

module.exports = router;