const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "bealqultwxxflsryaa6q-mysql.services.clever-cloud.com",
    database: "bealqultwxxflsryaa6q",
    user: "ujaslinz9d1fhwr6",
    password: "wFsfOtbR8ZoU39CIQ4eD"
});

connection.connect(error => {
    if(error) console.log('Hubo un error al intentar conectar con la Base de Datos: ', error.message);
    else console.log('CONEXIÓN ESTABLECIDA CON ÉXITO');
});

module.exports = connection;