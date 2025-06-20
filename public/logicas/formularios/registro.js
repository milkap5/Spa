const inputs = document.querySelectorAll('input');
const grupos = document.querySelectorAll('.grupoFormulario');

const resetBoton = document.getElementById('reset'); // Renombrado para evitar conflicto con palabra reservada
const verificarDatosBoton = document.getElementById('verificarDatos'); // Renombrado
const registrarBoton = document.getElementById('registrar'); // Renombrado

const regExpresion = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,25}$/i,
    apellido: /^[a-zA-ZÀ-ÿ\s]{3,25}$/i,
    dni: /^\d{8}$/,
    celular: /^\d{10}$/,
    correo: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    contrasenia: /^.{8,20}$/
}

// Objeto para mantener el estado de validación de cada campo (true si es válido, false si no)
const estadoInputs = {
    nombre: false,
    apellido: false,
    dni: false,
    celular: false,
    correo: false,
    contrasenia: false,
    contrasenia2: false // Añadido para la confirmación de contraseña
}


// Función para establecer el estado visual de un grupo de formulario
const establecerEstadoCampo = (grupoElement, isValid, mensajeError = '') => {
    const iconoTimes = grupoElement.querySelector('.fa-times-circle');
    const iconoCheck = grupoElement.querySelector('.fa-check-circle');
    const parrafoError = grupoElement.querySelector('.mensaje-error');

    if (isValid) {
        grupoElement.classList.remove('incorrecto');
        grupoElement.classList.add('correcto');
        if (iconoTimes) iconoTimes.style.display = 'none';
        if (iconoCheck) iconoCheck.style.display = 'inline-block';
        if (parrafoError) parrafoError.style.display = 'none'; // Oculta el mensaje de error de formato
    } else {
        grupoElement.classList.remove('correcto');
        grupoElement.classList.add('incorrecto');
        if (iconoTimes) iconoTimes.style.display = 'inline-block';
        if (iconoCheck) iconoCheck.style.display = 'none';
        if (parrafoError) {
            parrafoError.textContent = mensajeError;
            parrafoError.style.display = 'block'; // Muestra el mensaje de error de formato
        }
    }
};

// Función para mostrar/ocultar los mensajes de advertencia de "ya registrado"
const mostrarAdvertenciaConflicto = (campoId, mostrar) => {
    const advertenciaElement = document.getElementById(`${campoId}Advertencia`);
    if (advertenciaElement) {
        // Asumiendo que 'conflictoEnDatos' hace visible el mensaje
        if (mostrar) {
            advertenciaElement.classList.remove('conflictoEnDatos'); // Quita la clase para hacerlo visible si tu CSS la usa así
            // O si la clase lo oculta, la añadirías aquí. Verifica tu CSS.
            // Más comúnmente, tendrías una clase como 'hidden' o 'active'
            advertenciaElement.style.display = 'flex'; // Asegura que se muestre
        } else {
            advertenciaElement.classList.add('conflictoEnDatos'); // Vuelve a agregar la clase para ocultarlo
            // O si la clase lo oculta, la removerías aquí.
            advertenciaElement.style.display = 'none'; // Asegura que se oculte
        }
    }
};

// Función principal de validación de expresiones regulares y campos vacíos
const validarCampoFormato = (elementoInput) => {
    const nombreCampo = elementoInput.id;
    const valor = elementoInput.value.trim();
    const grupo = document.getElementById(`grupo${nombreCampo.charAt(0).toUpperCase() + nombreCampo.slice(1)}`);
    const expresionReg = regExpresion[nombreCampo];
    const parrafoError = grupo.querySelector('.mensaje-error');

    // Ocultar cualquier advertencia de conflicto existente al empezar a validar
    mostrarAdvertenciaConflicto(nombreCampo, false);

    // 1. Validar si está vacío
    if (valor === '') {
        establecerEstadoCampo(grupo, false, parrafoError.getAttribute('hidden')); // Usar el texto oculto como mensaje inicial
        estadoInputs[nombreCampo] = false;
        return; // No continuar con la RegEx si está vacío
    }

    // 2. Validar con expresión regular
    if (expresionReg && !expresionReg.test(valor)) {
        establecerEstadoCampo(grupo, false, parrafoError.getAttribute('hidden')); // Usar el texto oculto
        estadoInputs[nombreCampo] = false;
        return;
    }

    // Si pasa la validación de formato, marcar como correcto provisionalmente
    // y luego hacer la verificación de existencia para DNI, Celular, Correo
    establecerEstadoCampo(grupo, true);
    estadoInputs[nombreCampo] = true;

    // Si es DNI, Celular o Correo, también verificar existencia en el backend
    if (['dni', 'celular', 'correo'].includes(nombreCampo)) {
        verificarExistenciaEnBackend(elementoInput);
    }
};

// Función para verificar la coincidencia de contraseñas
const verificarContrasenias = () => {
    const pass = document.getElementById('contrasenia');
    const pass2 = document.getElementById('contrasenia2');
    const grupoContrasenia2 = document.getElementById('grupoContrasenia2');
    const parrafoErrorContrasenia2 = grupoContrasenia2.querySelector('.mensaje-error');

    const contraseniaValidaFormato = estadoInputs.contrasenia; // Estado de la primera contraseña por regex

    if (pass.value.trim() === '' || pass2.value.trim() === '') {
        // Si una de las contraseñas está vacía, no se pueden comparar, así que se considera no válida para comparación.
        establecerEstadoCampo(grupoContrasenia2, false, parrafoErrorContrasenia2.getAttribute('hidden'));
        estadoInputs.contrasenia2 = false;
        return;
    }

    if (!contraseniaValidaFormato) {
        // Si la primera contraseña no cumple el formato, la segunda tampoco puede ser "correcta"
        // en cuanto a coincidencia.
        establecerEstadoCampo(grupoContrasenia2, false, parrafoErrorContrasenia2.getAttribute('hidden'));
        estadoInputs.contrasenia2 = false;
        return;
    }

    if (pass.value === pass2.value) {
        establecerEstadoCampo(grupoContrasenia2, true);
        estadoInputs.contrasenia2 = true;
    } else {
        establecerEstadoCampo(grupoContrasenia2, false, parrafoErrorContrasenia2.getAttribute('hidden'));
        estadoInputs.contrasenia2 = false;
    }

    // También re-evaluar el estado de la primera contraseña si es necesario
    validarCampoFormato(pass);
};

// Función para manejar la verificación de existencia en el backend
const verificarExistenciaEnBackend = async (elementoInput) => {
    const nombreCampo = elementoInput.id;
    const valor = elementoInput.value.trim();

    // Solo si el formato es correcto, procedemos a verificar la existencia
    if (!estadoInputs[nombreCampo]) {
        return; // Si el formato no es válido, no verificar existencia
    }

    try {
        const response = await fetch(`/verificar-existencia?campo=${nombreCampo}&valor=${valor}`);
        const data = await response.json();

        if (data.existe) { // Asumiendo que tu backend devuelve { existe: true } si el valor ya está en uso
            mostrarAdvertenciaConflicto(nombreCampo, true); // Muestra el mensaje de "ya registrado"
            const grupo = document.getElementById(`grupo${nombreCampo.charAt(0).toUpperCase() + nombreCampo.slice(1)}`);
            establecerEstadoCampo(grupo, false, ''); // Marcar el campo como incorrecto (sin mensaje de formato)
            estadoInputs[nombreCampo] = false; // Actualizar el estado a false
        } else {
            mostrarAdvertenciaConflicto(nombreCampo, false); // Oculta el mensaje
            // El campo ya está en estado "correcto" por validarCampoFormato si llegó hasta aquí.
            estadoInputs[nombreCampo] = true; // Asegurar que el estado sea true
        }
    } catch (error) {
        console.error(`Error al verificar existencia de ${nombreCampo}:`, error);
        // Podrías mostrar un mensaje de error genérico al usuario si la API falla
    } finally {
        actualizarBotonRegistrar(); // Siempre re-evaluar si el botón debe estar habilitado
    }
};

// Función para habilitar/deshabilitar el botón de registrar
const actualizarBotonRegistrar = () => {establecerEstadoCampo(grupo, false, '');
    const todosCamposValidos = Object.values(estadoInputs).every(estado => estado === true);
    registrarBoton.disabled = !todosCamposValidos;
};


// -------------------- EVENT LISTENERS --------------------

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        if (e.target.id === 'contrasenia' || e.target.id === 'contrasenia2') {
            validarCampoFormato(e.target); // Valida formato de contraseña
            verificarContrasenias(); // Verifica coincidencia
        } else {
            validarCampoFormato(e.target);
        }
        actualizarBotonRegistrar(); // Actualiza el botón después de cada interacción
    });

    input.addEventListener('blur', (e) => {
        // Dispara la validación al perder el foco
        if (e.target.id === 'contrasenia' || e.target.id === 'contrasenia2') {
            validarCampoFormato(e.target);
            verificarContrasenias();
        } else {
            validarCampoFormato(e.target);
        }
        actualizarBotonRegistrar();
    });

    // Al cargar la página, limpia el estado visual inicial
    // Solo si el campo no tiene un valor por defecto (ej. al recargar con datos en el navegador)
    if (input.value.trim() === '') {
        const grupo = document.getElementById(`grupo${input.id.charAt(0).toUpperCase() + input.id.slice(1)}`);
        if (grupo) {
            grupo.classList.remove('correcto', 'incorrecto');
            const iconoTimes = grupo.querySelector('.fa-times-circle');
            const iconoCheck = grupo.querySelector('.fa-check-circle');
            const parrafoError = grupo.querySelector('.mensaje-error');
            if (iconoTimes) iconoTimes.style.display = 'none';
            if (iconoCheck) iconoCheck.style.display = 'none';
            if (parrafoError) parrafoError.style.display = 'none';
        }
        // También ocultar las advertencias de conflicto si están visibles al inicio
        mostrarAdvertenciaConflicto(input.id, false);
    } else {
        // Si hay valor (ej. autocompletado), validar al cargar para reflejar el estado
        validarCampoFormato(input);
    }
});


// Listener para el botón "Limpiar Datos"
resetBoton.addEventListener('click', () => {
    grupos.forEach(grupo => {
        grupo.classList.remove('correcto', 'incorrecto');
        const iconoTimes = grupo.querySelector('.fa-times-circle');
        const iconoCheck = grupo.querySelector('.fa-check-circle');
        const parrafoError = grupo.querySelector('.mensaje-error');
        if (iconoTimes) iconoTimes.style.display = 'none';
        if (iconoCheck) iconoCheck.style.display = 'none';
        if (parrafoError) parrafoError.style.display = 'none';
    });

    // Resetear todos los estados a false
    for (const key in estadoInputs) {
        estadoInputs[key] = false;
    }

    // Ocultar todas las advertencias de conflicto
    mostrarAdvertenciaConflicto('dni', false);
    mostrarAdvertenciaConflicto('celular', false);
    mostrarAdvertenciaConflicto('correo', false);
    document.getElementById('grupoAdvertenciaContrasenias').style.display = 'none'; // Ocultar mensaje de contraseñas no coinciden

    actualizarBotonRegistrar(); // Deshabilitar el botón al limpiar
    inputs.forEach(input => input.disabled = false); // Habilitar campos si estaban deshabilitados
    verificarDatosBoton.style.display = 'inline-block'; // Mostrar botón de verificar
    resetBoton.style.display = 'inline-block'; // Mostrar botón de reset
});

// Listener para el botón "Verificar Datos"
verificarDatosBoton.addEventListener('click', async () => {
    // Forzar la validación de todos los campos al hacer clic en "Verificar Datos"
    inputs.forEach(input => {
        if (input.id === 'contrasenia' || input.id === 'contrasenia2') {
            validarCampoFormato(input);
            verificarContrasenias();
        } else {
            validarCampoFormato(input);
        }
    });

    const todosCamposValidos = Object.values(estadoInputs).every(estado => estado === true);

    if (!todosCamposValidos) {
        alert('Por favor, complete todos los campos del formulario con datos correctos.');
        // Mostrar la advertencia de contraseñas no coinciden si aplica
        if (!estadoInputs.contrasenia2 && document.getElementById('contrasenia').value.trim() !== '' && document.getElementById('contrasenia2').value.trim() !== '' && document.getElementById('contrasenia').value !== document.getElementById('contrasenia2').value) {
            document.getElementById('grupoAdvertenciaContrasenias').style.display = 'flex';
        } else {
            document.getElementById('grupoAdvertenciaContrasenias').style.display = 'none';
        }
        return;
    } else {
        document.getElementById('grupoAdvertenciaContrasenias').style.display = 'none';
    }

    const datosParaVerificar = {};
    inputs.forEach(input => {
        datosParaVerificar[input.name] = input.value.trim();
    });

    try {
        const responseFromDB = await fetch('/verificar-registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosParaVerificar)
        });

        const resultado = await responseFromDB.json();

        if (resultado.ok) { // Si el backend indica que no hay conflictos de existencia
            inputs.forEach(input => input.disabled = true); // Deshabilita los campos
            verificarDatosBoton.style.display = 'none'; // Oculta el botón "Verificar Datos"
            resetBoton.style.display = 'none'; // Oculta el botón "Limpiar Datos"
            registrarBoton.disabled = false; // Habilita el botón "Registrarme"
            alert('¡Datos verificados correctamente! Ya puedes registrarte.'); // Notificación al usuario
        } else {
            // El backend encontró conflictos de existencia
            if (resultado.existe) { // Asegúrate de que 'resultado.existe' es un objeto con las propiedades
                if (resultado.existe.dni) mostrarAdvertenciaConflicto('dni', true);
                if (resultado.existe.celular) mostrarAdvertenciaConflicto('celular', true);
                if (resultado.existe.correo) mostrarAdvertenciaConflicto('correo', true);
            }
            alert('Algunos datos ya están registrados. Por favor, revisa los campos.');
            actualizarBotonRegistrar(); // Asegura que el botón de registro esté deshabilitado si hay errores
        }
    } catch (error) {
        console.error('ERROR EN LA VERIFICACIÓN DEL FORMULARIO con el backend: ', error);
        alert('Ocurrió un error al verificar los datos. Intenta nuevamente más tarde.');
        actualizarBotonRegistrar(); // Asegura el estado del botón en caso de error
    }
});

// Listener para el botón "Registrarme"
registrarBoton.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    // Re-checar que todos los estados sean válidos antes de enviar
    const todosCamposValidos = Object.values(estadoInputs).every(estado => estado === true);
    if (!todosCamposValidos) {
        alert('Hay errores en el formulario. Por favor, corrige los campos antes de registrarte.');
        // Forzar validación visual de todos los campos nuevamente
        inputs.forEach(input => {
            if (input.id === 'contrasenia' || input.id === 'contrasenia2') {
                validarCampoFormato(input);
                verificarContrasenias();
            } else {
                validarCampoFormato(input);
            }
        });
        return;
    }

    const datosParaRegistro = {};
    inputs.forEach(input => {
        datosParaRegistro[input.name] = input.value.trim();
    });

    try {
        const responseFromDB = await fetch('/validar', { // Usar el action del formulario para el submit final
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosParaRegistro)
        });

        const resultado = await responseFromDB.json();

        if (resultado.ok) {
            alert('¡Registro de usuario exitoso!');
            // Opcional: Redirigir al usuario o limpiar el formulario
            // window.location.href = '/pagina-de-exito';
            document.getElementById('formularioRegistro').reset(); // Limpia el formulario
            resetBoton.click(); // Reestablece los estilos y estados
        } else {
            // Esto debería manejarse si el backend puede devolver errores de validación final
            alert('Hubo un problema al registrar el usuario. Por favor, intenta de nuevo.');
            // Si el backend devuelve errores específicos, podrías mostrarlos aquí
        }
    } catch (error) {
        console.error('ERROR AL ENVIAR FORMULARIO DE REGISTRO: ', error);
        alert('Ocurrió un error al intentar registrarte. Intenta nuevamente más tarde.');
    }
});

// Llamar a actualizarBotonRegistrar al cargar para asegurar el estado inicial
actualizarBotonRegistrar();