function verificarSesion(req, res, next) {
    if(req.session.usuario) { return next();}
    res.redirect('/inicioSesion');
}

module.exports = verificarSesion;