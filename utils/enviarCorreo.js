const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CORREO_USER,
        pass: process.env.CORREO_PASS
    }
});

const enviarCorreo = async (destinatario, { asunto, contenido }) => {
    if(!destinatario || !asunto || !contenido) {
        console.warn('FALTAN DATOS PARA ENVIAR EL CORREO');
        return;
    }

    const mailOptions = {
        from: `"Spa Bienestar" <${process.env.CORREO_USER}>`,
        to: destinatario,
        subject: asunto,
        text: contenido,
        html: `<p>${contenido}</p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`📧 Correo enviado a ${destinatario}: ${info.messageId}`);
    }catch(error) {
        console.error('❌ ERROR AL ENVIAR CORREO:', error);
    }
    
};

module.exports = enviarCorreo;