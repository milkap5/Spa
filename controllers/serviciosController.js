const poolConnection = require("../db/connection");

const serviciosIndividuales = async (req, res) => {
    try {
        const [table] = await poolConnection.query('call serviciosIndividuales()');
        const resultados = table[0];
        const tratamientos = [...new Set(resultados.map(res => res.tratamiento))];
        
        const usuario = req.session.usuario;
        res.render(`pages/users/${usuario ? usuario.usuarioTipo : 'noRegistrado'}/servicios-individuales`,
            { resultados, tratamientos });
    } catch(error) {
        console.log('ERROR AL OBTENER LOS SERVICIOS INDIVIDUALES: ', error);
        res.status(500).send('ERROR INTERNO DEL SERVIDOR');
    }
}

const serviciosGrupales = async (req, res) => {
    try {
        const [table] = await poolConnection.query('call serviciosGrupales()');
        
        const usuario = req.session.usuario;
        res.render(`pages/users/${usuario ? usuario.usuarioTipo : 'noRegistrado'}/servicios-grupales`, {
            resultados: table[0]
        });
    } catch(error) {
        console.log('ERROR AL OBTENER LOS SERVICIOS GRUPALES: ', error);
        res.status(500).send('ERROR INTERNO DEL SERVIDOR');
    }
}

module.exports = { serviciosIndividuales, serviciosGrupales }