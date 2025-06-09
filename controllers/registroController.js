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

module.exports = { verificarDatos };