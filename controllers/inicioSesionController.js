const poolConnection = require('../db/connection');

exports.iniciarSesion = async (req, res) => {
    const { numeroCliente, contrasenia } = req.body;

    try {
        const [rows] = await poolConnection.query('call iniciarSesion(?, ?)', [numeroCliente, contrasenia]);
        const resultado =rows[0][0];
console.log('resultado: ', resultado);
        if(!resultado || resultado.usuarioTipo === 'noPass' || resultado.usuarioTipo === 'noPerson') {
            return res.redirect(`/inicioSesion?error=${resultado.usuarioTipo}`);
        }

        req.session.usuario = resultado;

        if(resultado.usuarioTipo === 'admin') { return res.redirect('/admin');}
        if(resultado.usuarioTipo === 'profesional') { return res.redirect('/profesional');}
        if(resultado.usuarioTipo === 'cliente') { return res.redirect('/cliente');}
    } catch(error) {
        console.error('ERROR AL INICIAR SESIÓN: ', error);
        res.status(500).send('ERROR INTERNO DEL SERVIDOR');
    }
};