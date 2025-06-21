const poolConnection = require('../db/connection');

const iniciarSesion = async (req, res) => {
    const { numeroCliente, contrasenia } = req.body;

    try {
        const [rows] = await poolConnection.query('call iniciarSesion(?, ?)', [numeroCliente, contrasenia]);
        const resultado =rows[0][0];

        if(
            resultado.usuarioTipo === 'noPass' ||
            resultado.usuarioTipo === 'noPerson' ||
            resultado.usuarioTipo === 'logueado'
        ) {
            return res.redirect(`/inicioSesion?error=${resultado.usuarioTipo}`);
        }

        req.session.usuario = resultado;
        return res.redirect(`/${resultado.usuarioTipo}`);
    } catch(error) {
        console.error('ERROR AL INICIAR SESIÓN: ', error);
        res.status(500).send('ERROR INTERNO DEL SERVIDOR');
    }
};

const cerrarSesion = async (req, res) => {
    const usuarioID = req.session?.usuario?.id;

    req.session.destroy(async error => {
        if(error) {
            console.error('ERROR AL CERRAR LA SESIÓN: ', error);
            return  res.status(500).send('OCURRIÓ UN ERROR AL CERRAR SESIÓN.')
        }

        res.clearCookie('connect.sid');

        if(usuarioID) {
            try {
                await poolConnection.query('update Personas set online = false where id = ?', [usuarioID]);
            } catch(error) {
                console.log('ERROR CERRANDO SESIÓN EN LA BASE DE DATOS', error);
            }
        }

        res.redirect('/');
    })
}

module.exports = { iniciarSesion, cerrarSesion };