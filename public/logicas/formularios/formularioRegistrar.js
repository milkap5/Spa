const inputs=document.querySelectorAll('input');
const grupos=document.querySelectorAll('.grupoFormulario');

const reset=document.getElementById('reset');
const verificarDatos=document.getElementById('verificarDatos');
const registrar=document.getElementById('registrar');

const regExpresion = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,25}$/i,
    apellido: /^[a-zA-ZÀ-ÿ\s]{3,25}$/i,
    dni: /^\d{8}$/,
    celular: /^\d{10}$/,
    correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    contrasenia: /^.{8,20}$/
}

const estadoInputs = {
    nombre: false,
    apellido: false,
    dni: false,
    celular: false,
    correo: false,
    contrasenia: false
}

const regularExpresion = (elemento, expresionReg, grupo) => {
    if(expresionReg.test(elemento.value)) {
        document.getElementById(`grupo${grupo}`).classList.remove('incorrecto');
        document.getElementById(`grupo${grupo}`).classList.add('correcto');
        estadoInputs[grupo.toLowerCase()] = true;
    } else {
        document.getElementById(`grupo${grupo}`).classList.remove('correcto');
        document.getElementById(`grupo${grupo}`).classList.add('incorrecto');
        estadoInputs[grupo.toLowerCase()] = false;
    }
};

const verificarContrasenias = () => {
    const pass = document.getElementById('contrasenia');
    const pass2 = document.getElementById('contrasenia2');
    
    if(pass.value !== pass2.value) {
        document.getElementById('grupoContrasenia2').classList.remove('correcto');
        document.getElementById('grupoContrasenia2').classList.add('incorrecto');
        estadoInputs.contrasenia = false;
    } else {
        document.getElementById('grupoContrasenia2').classList.remove('incorrecto');
        document.getElementById('grupoContrasenia2').classList.add('correcto');
        estadoInputs.contrasenia = true;
    }
};

const verificarEntrada = (e) => {
    switch(e.target.id) {
        case 'nombre': regularExpresion(e.target, regExpresion.nombre, 'Nombre'); break;
        case 'apellido': regularExpresion(e.target, regExpresion.apellido, 'Apellido'); break;
        case 'dni': regularExpresion(e.target, regExpresion.dni, 'Dni'); break;
        case 'celular': regularExpresion(e.target, regExpresion.celular, 'Celular'); break;
        case 'correo': regularExpresion(e.target, regExpresion.correo, 'Correo'); break;
        case 'contrasenia':
            regularExpresion(e.target, regExpresion.contrasenia, 'Contrasenia');
            verificarContrasenias();
        break;
        case 'contrasenia2': verificarContrasenias();
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', verificarEntrada);
    input.addEventListener('blur', verificarEntrada);
});

reset.addEventListener('click', () => {
    
    grupos.forEach(grupo => {
        grupo.classList.remove('correcto');
        grupo.classList.remove('incorrecto');
    });
    estadoInputs.forEach(state => { state=false;});
});

verificarDatos.addEventListener('click', async () => {
    const errores = Object.values(estadoInputs).some(valor => !valor);
    
    if(errores) {
        alert('Complete todos los campos del formulario con datos correctos, por favor!');
        return;
    }

    const datosCorrectos= {}
    inputs.forEach(input => {
        datosCorrectos[input.name] = input.value.trim();
    });

    try {
        const anserFromDB = await fetch('/verificar-registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(datosCorrectos)
        });

        const resultado = await anserFromDB.json();
    } catch(error) {
        console.log('ERROR EN LA VERIFICACIÓN DEL FORMULARIO: ', error);
        alert('Ocurrió un error al verificar los datos. Intenta nuevamente más tarde.');
    }
});