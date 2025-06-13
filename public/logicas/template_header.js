document.addEventListener('DOMContentLoaded', () => {
  const opcionesUsuario = document.getElementById('opciones-usuario');

  if (opcionesUsuario) {
    opcionesUsuario.addEventListener('change', (e) => {
      const option = e.target.value;

      if (option === 'solicitar-turno') {
        window.location.href = '/formulario-turno';  // <--- Asegurate que esta ruta esté definida en tus rutas
      } else if (option === 'cerrar-sesion') {
        window.location.href = '/cerrar-session';
      }

      selector.selectedIndex = 0;
    });
  }
});
