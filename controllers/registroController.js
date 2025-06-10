const poolConnection = require('../db/connection');

const verificarDatos = async (req, res) => {

    const userDates=req.body;

    const existe = {
        dni: false,
        celular: false,
        correo: false
    }

    try {
        const [resultado] = await poolConnection.query(
            'call consultarDatosPersona(?, ?, ?)',
            [userDates.dni, userDates.celular, userDates.correo]
        );

        if (resultado[0].length > 0) {
            if(resultado[0][0].dni === userDates.dni) existe.dni = true;
            if(resultado[0][0].celular === userDates.celular) existe.celular = true;
            if(resultado[0][0].correo === userDates.correo) existe.correo = true;
        }

        const exito = !(existe.dni || existe.celular || existe.correo);
        
        res.json({
            ok: exito,
            existe
        });
    } catch(error) {
        console.log('ERROR DE VERIFICACIÓN: ', error);
        res.status(500).json({ ok: false, error: 'ERROR EN EL SERVIDOR'});
    }
};

const enviarCorreo = require('../utils/enviarCorreo');
const registrarDatos = async (req, res) => {
    const datos = req.body;

    try {
        const [result] = await poolConnection.query('call almacenarPersona(?, ?, ?, ?, ?, ?)', [
            datos.nombre,
            datos.apellido,
            datos.dni,
            datos.celular,
            datos.correo,
            datos.contrasenia
        ]);

        const id = result[0][0].id;
        res.setHeader('Content-Type', 'application/json');
        res.json({ ok: true, id });

        enviarCorreo(datos.correo, {
            asunto: '¡Bienvenido al SPA!',
            contenido: `Hola ${datos.nombre}, gracias por registrarte y bienvenido al Spa - Sentirse Bien. Tu número de cliente es ${id}. Con el, podrás: Iniciar Sesión, Sacar/Consultar/Modificar/Cancelar turnos.`
        }).then(() => {
            console.log('CORREO ENVIADO');
        }).catch((error) => {
            console.error('ERROR ENVIANDO CORREO: ', error);
        });
    } catch(error) {
        console.error('ERROR AL REGISTRAR USUARIO: ', error);
        res.status(500).json({ ok: false, message: `ERROR INTERNO AL REGISTRAR A ${datos.nombre}.` });
    }
}

module.exports = { verificarDatos, registrarDatos };