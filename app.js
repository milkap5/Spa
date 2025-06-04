const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

// para que trate también con las subcarpetas dentro de vistas.
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// importación de las rutas
const viewRoutes = require('./routes/vistas');
// indica a Express que las rutas definidas en './routes/vistas' están disponibles desde '/'.
app.use('/', viewRoutes);


const authRouter = require('./routes/auth');
app.use('/auth', authRouter)

// configuración del puerto
app.listen(3000, () => {
    console.log('Servidor creado: http://localhost:3000');
});