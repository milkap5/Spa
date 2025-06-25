const express = require('express');
const router = express.Router();

/*
    (req, res)
        req (request): es la petición del cliente al servidor.
        res (response): es la respuesta del servidor al cliente.
*/
router.get('/', (req, res) => res.render('index'));
router.get('/registro', (req, res) => res.render('pages/forms/registro'));
router.get('/inicioSesion', (req, res) => res.render('pages/forms/inicioSesion'));
router.get('/formulario_SolicitudTurno', (req, res) => res.render('pages/forms/formulario_SolicitudTurno'));
router.get('/formulario_bienvenidoAlSpa', (req, res) => res.render('pages/forms/formulario_bienvenidoAlSpa'));
router.get('/formulario_confirmarCodigo', (req, res) => res.render('pages/forms/formulario_confirmarCodigo'));
router.get('/formulario_confirmarTurno', (req, res) => res.render('pages/forms/formulario_confirmarTurno'));
router.get('/formulario_contraseniaActualizadaCorrectamente', (req, res) => res.render('pages/forms/formulario_contraseniaActualizadaCorrectamente'));
router.get('/formulario_ingreseNuevaContrasenia', (req, res) => res.render('pages/forms/formulario_ingreseNuevaContrasenia'));
router.get('/formulario_olvideMiContrasenia', (req, res) => res.render('pages/forms/formulario_olvideMiContrasenia'));
router.get('/formulario_turnoConfirmado', (req, res) => res.render('pages/forms/formulario_turnoConfirmado'));
router.get('/pagina_cliente_servicios-individuales', (req, res) => res.render('pages/users/pagina_cliente_servicios-individuales'));
router.get('/pagina_cliente_servicios-grupales', (req, res) => res.render('pages/users/pagina_cliente_servicios-grupales'));
router.get('/pagina_cliente_reservar', (req, res) => res.render('pages/users/pagina_cliente_reservar'));
router.get('/pagina_cliente_gracias', (req, res) => res.render('pages/users/pagina_cliente_gracias'));
router.get('/pagina_cliente_consulta', (req, res) => res.render('pages/users/pagina_cliente_consulta'));
router.get('/pagina_cliente_registrado', (req, res) => res.render('pages/users/pagina_cliente_registrado'));
router.get('/pagina_admin', (req, res) => res.render('pages/users/pagina_admin'));
router.get('/profesional', (req, res) => res.render('pages/users/profesional'));
router.get('/footer', (req, res) => res.render('footer'));
router.get('/header', (req, res) => res.render('header'));

module.exports = router;