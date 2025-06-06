document.getElementById('verificarDatos').addEventListener('click', async () => {
    const inputs = document.querySelectorAll('input');

    const datos = {}
    inputs.forEach(input => {
        datos[input.name] = input.value.trim();
    });

    try {

        const respuesta = await fetch('/verificar-registro', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if(resultado.ok) {
            inputs.forEach(input => input.disabled = true);
            document.getElementById('registrar').disabled = false;
            document.getElementById('verificarDatos').style.display = 'none';
        } else {
            
        }
    } catch(error) {
        console.log('ERROR EN LA VERIFICACIÓN DEL FORMULARIO: ', error);
        alert('Ocurrió un error al verificar los datos. Intenta nuevamente más tarde.');
    }
});