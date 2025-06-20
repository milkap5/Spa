require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'clave-secreta',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});

app.use('/', require('./routes/acciones'));
app.use('/', require('./routes/datosBack'));
app.use('/', require('./routes/vistas'));

app.use((req, res) => {
    res.status(404).render('pages/errors/404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    const local = process.env.PORT ? '' : `(http://localhost:${PORT})`;
    console.log(`Servidor: ${local}`);
});