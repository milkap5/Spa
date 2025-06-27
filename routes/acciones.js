const express = require('express');
const router = express.Router();
const enviarCorreo = require('../utils/enviarCorreo');
const pool = require('../db/connection');

const registroController = require('../controllers/registroController');
const sesionController = require('../controllers/sesionController');
const carritoController = require('../controllers/carritoController');

router.post('/verificar-registro', registroController.verificarDatos);
router.post('/registrar-usuario', registroController.registrarDatos);
router.post('/iniciar-sesion', sesionController.iniciarSesion);
router.get('/cerrar-session', sesionController.cerrarSesion);

router.post('/agregar-servicio', carritoController.agregarServicio);
router.post('/eliminar-servicio', carritoController.eliminarServicio);
router.post('/confirmar-carrito', carritoController.confirmarCarrito);
router.post('/limpiar-carrito', carritoController.limpiarCarrito)




router.post('/recuperar-contrasenia', async (req, res) => {
    const correo = req.body.correo;

    if(!correo) {
        return res.status(400).send('FALTA CORREO');
    }

    const codigo = Math.floor(100000 + Math.random() * 900000); // 6 dígitos
    const asunto = 'Recuperación de contraseña - Spa Bienestar';
    const contenido = `Tu código para recuperar la contraseña es: <strong>${codigo}</strong>`;

    req.session.codigoRecuperacion = codigo;
    req.session.correoRecuperacion = correo;
    await enviarCorreo(correo, { asunto, contenido });

    res.redirect('/confirmarCodigo');
});




router.post('/validar-codigo', (req, res) => {
    const { codigo } = req.body;

    if (parseInt(codigo) === req.session.codigoRecuperacion) {
        return res.redirect('/nuevaContrasenia');
    }

    // Si el código no coincide
    return res.status(401).send('Código incorrecto. Intentá de nuevo.');
});



router.post('/actualizar-contrasenia', async (req, res) => {
    const { nuevaContrasenia, confirmarContrasenia } = req.body;

    if (nuevaContrasenia !== confirmarContrasenia) {
        return res.status(400).send('Las contraseñas no coinciden.');
    }

    const correo = req.session.correoRecuperacion;
    if (!correo) {
        return res.status(403).send('Sesión expirada.');
    }

    // 🔒 Hashear contraseña (si usás bcrypt, por ejemplo)
    const hashedPassword = nuevaContrasenia; // <-- reemplazá esto con hash real si usás uno

    // Actualizá la contraseña en la base de datos
    // Supongamos que tenés un procedimiento almacenado llamado actualizarContrasenia(correo, contrasenia)
    await pool.query('CALL actualizarContrasenia(?, ?)', [correo, hashedPassword]);

    // Limpiar sesión de recuperación
    delete req.session.codigoRecuperacion;
    delete req.session.correoRecuperacion;

    res.redirect('/contrasenia-actualizada'); // o a donde quieras redirigir
});



module.exports = router;