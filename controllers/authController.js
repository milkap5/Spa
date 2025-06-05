const poolConnection = require('../db/connection');

const registrarUsuario = async (req, res) => {
    const datos = req.body;

    try {
        const [registro] = await poolConnection.query(
            `call consultarDatosPersona(?, ?, ?)`,
            [datos.dni, datos.celular, datos,correo]
        );

        let mensaje;
        if(registro.length > 0) {
            const persona = registro[0];

            if(persona.dni == datos.dni) mensaje='El DNI ya ha sido registrado';
            else if(persona.celular == datos.celular) mensaje='Este número de celular ya ha sido registrado';
            else mensaje='Este correo ya ha sido registrado';
        } else {
            await poolConnection.query(
                `call almacenarPersona(?, ?, ?, ?, ?, ?)`,
                [datos.nombre, datos.apellido, datos.dni, datos.celular, datos.correo, datos,contrasenia]
            );

            mensaje= `Usuario ${datos.apellido}, ${datos.nombre} registrado correctamente`;
        }

        res.render('formulario_registro', { mensaje });
    } catch( error ) {
        console.log('ERROR EN registrarUsuario: ', error);
        res.status(500).send('ERROR DEL SERVIDOR');
    }
}

module.exports = { registrarUsuario };