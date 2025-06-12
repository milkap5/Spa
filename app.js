require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'clave-secreta',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});

const registroRouter = require('./routes/acciones');
const viewRoutes = require('./routes/vistas');
app.use('/', registroRouter);
app.use('/', viewRoutes);

app.use((req, res) => {
    res.status(404).render('pages/errors/404');
});

app.listen(3000, () => {
    console.log('Servidor creado: http://localhost:3000');
});