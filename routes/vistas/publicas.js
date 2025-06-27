const express = require('express');
const router = express.Router();
const redirigirSiYaEstaLogueado = require('../../utils/redirigirSiYaEstaLogueado');

router.get('/', (req, res) => res.render('pages/users/noRegistrado/index'));

router.get('/registro', (req, res) => {
    res.render('pages/users/noRegistrado/formularios/registro');
});

router.get('/inicioSesion', (req, res) => {
    const errorLogin = req.query.error || null;
    res.render('pages/users/noRegistrado/formularios/inicioSesion', { errorLogin });
});

router.get('/olvideMiContrasenia', (req, res) => {
    res.render('pages/users/noRegistrado/formularios/olvideMiContrasenia')
});

router.get('/confirmarCodigo', (req, res) => res.render('pages/users/noRegistrado/formularios/confirmarCodigo'));
router.get('/nuevaContrasenia', (req, res) => res.render('pages/users/noRegistrado/formularios/nuevaContrasenia'));
router.get('/contrasenia-actualizada', (req, res) => res.render('pages/users/noRegistrado/contraseniaActualizadaCorrectamente'));

router.get('/bienvenido/:id', (req, res) => {
    const { id } = req.params;
    res.render('pages/users/noRegistrado/bienvenidoAlSpa', { id });
});


module.exports = router;