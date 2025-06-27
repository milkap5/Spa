const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/users/admin/index', { usuario: req.session.usuario });
});

router.get('/administracion', (req, res) => res.render('pages/users/admin/panelAdmin'));

module.exports = router;
