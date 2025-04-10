<?php
// Configuración
$host = 'localhost';
$db = 'spa';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// Conexión
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
  die("Error de conexión: " . $e->getMessage());
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$servicio = $_POST['servicio'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$email = $_POST['email'];

// Guardar en base de datos
$stmt = $pdo->prepare("INSERT INTO reservas (nombre, servicio, fecha, hora, email) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$nombre, $servicio, $fecha, $hora, $email]);

// Enviar email
$asunto = "Confirmación de tu reserva en Spa Sentirse Bien";
$mensaje = "Hola $nombre,\n\nGracias por tu reserva.\n\nServicio: $servicio\nFecha: $fecha\nHora: $hora\n\n¡Te esperamos!\n\nSpa Sentirse Bien";
$headers = "From: reservas@sentirsebien.com";

mail($email, $asunto, $mensaje, $headers);

// Redirigir con mensaje de éxito
header("Location: gracias.html");
exit;
?>
