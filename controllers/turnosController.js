const db = require("../db/connection");
const pool = require('mysql2');

const obtenerServicios = async (req, res) => {
  const [rows] = await db.query("CALL servicios()");
  res.json(rows[0]);
};

const obtenerFechasDisponibles = async (req, res) => {
  const { servicio } = req.query;
  const [rows] = await db.query("CALL fechasDisponiblesPorServicio(?)", [servicio]);
  res.json(rows[0].map(row => row.fecha));
};

const obtenerHorasDisponibles = async (req, res) => {//  console.log("req: ", req.query)
  const { servicio, fecha } = req.query;//   console.log("SeccionID: ", fecha)
  const [rows] = await db.query("CALL horariosDisponiblesPorFecha(?, ?)", [servicio, fecha]);
  res.json(rows[0].map(row => row.hora));
};

const obtenerProfesionalesDisponibles = async (req, res) => {
  const { seccionID, fecha, hora } = req.query;
  const [rows] = await db.query("CALL profesionalesDisponibles(?, ?, ?)", [seccionID, fecha, hora]);
  res.json(rows[0]);
};

const registrarTurno = async (req, res) => {
  const { servicio, fecha, hora, empleadoID } = req.body;
  const clienteID = req.session.usuario.id;

  try {
    // Obtener la sala libre para ese servicio, fecha, hora
    const [sala] = await pool.query('CALL obtenerSalaLibre(?, ?, ?, ?)', [servicio, fecha, hora, empleadoID]);

    if (!sala[0] || !sala[0][0]) {
      return res.json({ exito: false, mensaje: 'No hay salas disponibles para ese horario.' });
    }

    const salaID = sala[0][0].salaID || sala[0][0].id; // según SP devuelva 'salaID' o 'id'

    // Registrar turno con todos los datos
    await pool.query('CALL almacenarTurno(?, ?, ?, ?, ?, ?)', [servicio, fecha, hora, empleadoID, salaID, clienteID]);

    res.json({ exito: true, mensaje: 'Turno registrado con éxito.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ exito: false, mensaje: 'Error al registrar el turno.' });
  }
};

module.exports = {
    obtenerServicios,
    obtenerFechasDisponibles,
    obtenerHorasDisponibles,
    obtenerProfesionalesDisponibles,
    registrarTurno
};