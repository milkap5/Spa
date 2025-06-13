const opcionesUsuario = document.getElementById('opciones-usuario');

opcionesUsuario.addEventListener('change', (e) => {
    const option = e.target.value;

    if(option === 'cerrar-sesion') {
        window.location.href = '/cerrar-sesion';
    }

    if(option === 'sacar-turno') {
        /// widow.location.href = '/solicitar-turno';
    }
});