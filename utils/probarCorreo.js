require('dotenv').config();
const enviarCorreo = require('./enviarCorreo'); // ajustá la ruta si está en otra carpeta

(async () => {
    await enviarCorreo('elhacha_nahuel@hotmail.com', {
        asunto: '¡Correo de prueba!',
        contenido: 'Hola, este es un test desde Nodemailer usando Gmail.'
    });
})();
