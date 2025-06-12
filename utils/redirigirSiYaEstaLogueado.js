function redirigirSiYaEstaLogueado(req, res, next) {
    if(req.session.usuario) {
        const tipo = req.session.usuario.usuarioTipo;

        if( tipo === 'cliente' ) return res.redirect('/cliente');
        if( tipo === 'profesional' ) return res.redirect('/profesional');
        if( tipo === 'admin' ) return res.redirect('/admin');
    }

    next();
}

module.exports = redirigirSiYaEstaLogueado;