// Importación de módulos de Node.js
const express = require('express'); // Framework para manejar rutas, middleware, etc.
const path = require('path'); // Este es para construir rutas a archivos seguras y compatibles con varios SO's.

// Creación de una instancia de Express. Con ella operaremos en adelante.
const app = express(); 

app.set('view engine', 'ejs'); // se le indica a Express que utilizaremos EJS como motor de vistas.
app.set('views', path.join(__dirname, 'views')); // aquí le indicamos que los archivos .ejs están en 'views'. Allí, 'res.render' buscará las vistas.

app.use(express.static('public')); // aquí le decimos que sirva archivos estáticos desde la carpeta 'public'. '/logo.png' equivale a 'public/logo.png'.
app.use(express.urlencoded({extended:false})); // Middleware para procesar formularios HTML. 'extended:false' después profundizaremos.
app.use(express.json()); // Middleware para interpretar JSON, recibidos mediante 'POST' o 'PUT' desde 'fetch' o 'axios'

const viewRoutes = require('./routes/vistas'); // Importación del módulo que define las rutas a la vista.
// indica a Express que las rutas definidas en './routes/vistas' están disponibles desde '/'.
app.use('/', viewRoutes); // indicamos a Express que el contenido de 'viewRoutes' se montarán desde '/'.

const authRouter = require('./routes/auth'); // importamos el módulo relacionado con la autenticación.
app.use('/auth', authRouter) // monta el contenido de 'authRouter' en '/auth'.

const registroRouter = require('./routes/registros');
app.use('/', registroRouter);

// configuración del puerto
app.listen(3000, () => {
    console.log('Servidor creado: http://localhost:3000');
});