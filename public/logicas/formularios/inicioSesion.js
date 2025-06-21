document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const numeroCliente = document.getElementById('cliente').value;
    const contrasenia = document.getElementById('pass').value;

    try {
        const response = await fetch('/iniciar-sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numeroCliente, contrasenia })
        }); console.log('Esto tiene response: ', response)

        if(!response.ok){
            const data = await response.json();
            return;
        }

        window.location.href = response.url;
    } catch(error) {
        console.error('ERROR AL INICIAR SESION: ', error);
    }
});