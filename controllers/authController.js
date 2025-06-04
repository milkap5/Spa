const connection = require('../db/connection');

const registrarUsuario = (req, res) => {
  const datos = req.body;

  const consultar = `CALL consultarDatosPersona('${datos.dni}', ${datos.celular}, '${datos.correo}')`;

  connection.query(consultar, (error, registro) => {
    if (error) throw error;

    const reg = registro[0];
    let mensaje;

    if (reg.length > 0) {
      if (reg[0].dni == datos.dni) mensaje = "El DNI ya ha sido registrado";
      else if (reg[0].celular == datos.celular) mensaje = "El número de celular ya ha sido registrado";
      else mensaje = "El correo ya ha sido registrado";

      res.render('formulario_registro', { mensaje });
    } else {
      const insertar = `CALL almacenarPersona('${datos.nombre}', '${datos.apellido}', '${datos.dni}', ${datos.celular}, '${datos.correo}', '${datos.contrasenia}')`;

      connection.query(insertar, (error2) => {
        if (error2) throw error2;

        mensaje = `Usuario ${datos.apellido}, ${datos.nombre} registrado correctamente`;
        res.render('formulario_registro', { mensaje });
      });
    }
  });
};

module.exports = { registrarUsuario };