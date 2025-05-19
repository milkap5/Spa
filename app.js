// Este es el servidor y a continuación, su configuración.
const express = require('express');
const mysql = require('mysql');

// Objetos que utilizaré para todo lo demás.
const app = express();
const connexion = mysql.createConnection({
    host: "bealqultwxxflsryaa6q-mysql.services.clever-cloud.com",
    database: "bealqultwxxflsryaa6q",
    user: "ujaslinz9d1fhwr6",
    password: "wFsfOtbR8ZoU39CIQ4eD"
});

app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views');
app.use(express.static('public'));


app.get('/', (req, res) => res.render('index'));
app.get('/formulario_registro', (req, res) => res.render('formulario_registro'));
app.get('/formulario_inicioSesion', (req, res) => res.render('formulario_inicioSesion'));
app.get('/formulario_SolicitudTurno', (req, res) => res.render('formulario_SolicitudTurno'));
app.get('/formulario_bienvenidoAlSpa', (req, res) => res.render('formulario_bienvenidoAlSpa'));
app.get('/formulario_confirmarCodigo', (req, res) => res.render('formulario_confirmarCodigo'));
app.get('/formulario_confirmarTurno', (req, res) => res.render('formulario_confirmarTurno'));
app.get('/formulario_contraseniaActualizadaCorrectamente', (req, res) => res.render('formulario_contraseniaActualizadaCorrectamente'));
app.get('/formulario_ingreseNuevaContrasenia', (req, res) => res.render('formulario_ingreseNuevaContrasenia'));
app.get('/formulario_olvideMiContrasenia', (req, res) => res.render('formulario_olvideMiContrasenia'));
app.get('/formulario_turnoConfirmado', (req, res) => res.render('formulario_turnoConfirmado'));
app.get('/pagina_cliente_servicios-individuales', (req, res) => res.render('pagina_cliente_servicios-individuales'));
app.get('/pagina_cliente_servicios-grupales', (req, res) => res.render('pagina_cliente_servicios-grupales'));
app.get('/pagina_cliente_reservar', (req, res) => res.render('pagina_cliente_reservar'));
app.get('/pagina_cliente_gracias', (req, res) => res.render('pagina_cliente_gracias'));
app.get('/pagina_cliente_consulta', (req, res) => res.render('pagina_cliente_consulta'));
app.get('/pagina_cliente_registrado', (req, res) => res.render('pagina_cliente_registrado'));
app.get('/pagina_admin', (req, res) => res.render('pagina_admin'));
app.get('/footer', (req, res) => res.render('footer'));
app.get('/header', (req, res) => res.render('header'));


app.use(express.urlencoded({extended:false}));
app.use(express.json());



app.post('/validar', (req, res) => {
    const datos = req.body; // aquí se guardará todos los datos que provienen del formulario.
    
    let consultar=`call consultarDatosPersona('${datos.dni}', ${datos.celular}, '${datos.correo}')`;

    connexion.query(consultar, (error, registro) => {
        if (error) throw error;
        else {
            const reg=registro[0];
            let mensaje;

            if(reg.length > 0) {
            
                if(reg[0].dni == datos.dni) mensaje="El DNI ya ha sido registrado";
                else if(reg[0].celular == datos.celular) mensaje="El número de celular ya ha sido registrado";
                else mensaje="El correo ya ha sido registrado";

                res.render('formulario_registro', {mensaje});
            } else {
                let insertar=`call almacenarPersona('${datos.nombre}', '${datos.apellido}', '${datos.dni}', ${datos.celular}, '${datos.correo}', '${datos.contrasenia}')`;

                connexion.query(insertar, (error) => {
                    if(error) throw error;
                    res.render('formulario_registro');
                })
            }
        }
    })
});

// configuración del puerto
app.listen(3000, () => {
    console.log('Servidor creado: http://localhost:3000');
});