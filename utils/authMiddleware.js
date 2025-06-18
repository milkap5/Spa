function verificarSesion(req, res, next) {
    if(req.session.usuario) {
        
        res.redirect('/views/pages/users/admin/pagina_admin');
        return next();
    }
    res.redirect('/inicioSesion');
}

module.exports = verificarSesion;