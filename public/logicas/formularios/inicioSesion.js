document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const numeroCliente = document.getElementById('cliente').value;
    const contrasenia = document.getElementById('pass').value;

    try {
        const response = await fetch('/iniciar-sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numeroCliente, contrasenia })
        });

        if(!response.ok){
            const data = await response.json();
            if(data.error === 'noPerson') { mostrarError('NO EXISTE UN USUARIO CON ESE NÚMERO DE CLIENTE')}
            else if(data.error === 'noPass') { mostrarError('CONTRASEÑA INCORRECTA')}
            return;
        }

        window.location.href = response.url;
    } catch(error) {
        console.error('ERROR AL INICIAR SESION: ', error);
        mostrarError('ERROR AL CONECATAR CON EL SERVIDOR');
    }
});

function mostrarError(mensaje) {
    const contenedor = document.getElementById('mensajeError');
    contenedor.textContent = mensaje;
    contenedor.style.display = 'block';
}