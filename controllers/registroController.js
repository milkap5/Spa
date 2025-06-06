const poolConnection = require('../db/connection');

const verificarDatos = async (req, res) => {
    const { dni, celular, correo } = req.body;

    let dniExiste = false;
    let celularExiste = false;
    let correoExiste = false;

    try {
        const [resultado] = await poolConnection.query(
            'call consultarDatosPersona(?, ?, ?)',
            [dni, celular, correo]
        );

        const persona = resultado.length > 0 ? resultado[0] : false;

        if (persona) {
            if(persona.dni === dni) dniExiste = true;
            if(persona.celular === celular) dniCelular = true;
            if(persona.correo === correo) dniCorreo = true;
        }

        const exito = !(dniExiste || celularExiste || correoExiste);

        res.json({
            ok: exito,
            dniExiste,
            celularExiste,
            correoExiste
        });
    } catch(error) {
        console.log('ERROR DE VERIFICACIÓN: ', error);
        res.status(500).json({ ok: false, error: 'ERROR EN EL SERVIDOR'});
    }
};

module.exports = { verificarDatos };