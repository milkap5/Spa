const agregarServicio = (req, res) => {
    try {
        const servicio = req.body;
        const existe = req.session.carrito.some(item => item.titulo === servicio.titulo);

        if(!existe) { req.session.carrito.push(servicio);}
        res.json({ success: true, carrito: req.session.carrito });
    } catch(error) {
        console.log('ERROR AL AGREGAR SERVICIOS AL CARRITO: ', error);
        res.status(500).json({ success: false, message: 'ERROR INTERNO DEL SERVIDOR' })
    }
}

const eliminarServicio = (req, res) => {
    try {
        const { titulo } = req.body;
    
        req.session.carrito = req.session.carrito.filter(s => s.titulo !== titulo);
        res.json({ success: true, carrito: req.session.carrito });
    } catch(error) {
        console.log('ERROR AL ELIMINAR SERVICIO: ', error);
        res.status(500).json({ success: false, message: 'ERROR INTERNO DEL SERVIDOR'});
    }
}

const confirmarCarrito = async (req, res) => {
    const carrito = req.session.carrito || [];

    // LOGICA PARA LOS TURNOS A LA BASE DE DATOS

    req.session.carrito = [];
    res.json({ success: true, mensaje: 'Turnos confirmador correctamente' });
}

const limpiarCarrito = (req, res) => {
    try {
        req.session.carrito = [];
        res.json({ success: true })
    } catch(error) {
        console.log('ERROR AL LIMPIAR CARRITO: ', error);
        res.status(500).json({ success: false, message: 'ERROR INTERNO DEL SERVIDOR'});
    }
}

module.exports = {
    agregarServicio,
    eliminarServicio,
    confirmarCarrito,
    limpiarCarrito
}