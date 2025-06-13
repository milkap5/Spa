document.addEventListener('DOMContentLoaded', async () => {
  const servicioSelect = document.getElementById('servicio');
  const fechaSelect = document.getElementById('fecha');
  const horaSelect = document.getElementById('hora');
  const empleadoSelect = document.getElementById('empleado');
  const form = document.getElementById('form-turno');

  // 1. Cargar servicios disponibles
  const servicios = await (await fetch('/servicios')).json();
  servicios.forEach(s => {
    const option = document.createElement('option');
    option.value = s.tratamiento;
    option.textContent = s.grupo+ " "+ s.tratamiento+ " "+ s.titulo+ ": $ "+ s.precio;
    servicioSelect.appendChild(option);
  });

  // 2. Al seleccionar servicio, cargar fechas disponibles
  servicioSelect.addEventListener('change', async () => {
    const servicio = servicioSelect.value;
    fechaSelect.innerHTML = '<option disabled selected>Seleccione</option>';
    horaSelect.innerHTML = '';
    empleadoSelect.innerHTML = '';

    if (servicio) {
      const fechas = await (await fetch(`/horarios-disponibles?servicio=${servicio}`)).json();
      fechas.forEach(f => {
        const option = document.createElement('option');
        option.value = f.split('T')[0];
        option.textContent = f.split('T')[0];
        fechaSelect.appendChild(option);
      });
    }
  });

  // 3. Al seleccionar fecha, cargar horas disponibles
  fechaSelect.addEventListener('change', async () => {
    const servicio = servicioSelect.value;
    const fecha = fechaSelect.value;
    horaSelect.innerHTML = '<option disabled selected>Seleccione</option>';
    empleadoSelect.innerHTML = '';

    if (servicio && fecha) { console.log('NO SE, AQUÍ ESTAMOS. SERV: ', servicio, "|||||| fecha: ", fecha)
      const horas = await (await fetch(`/horas-disponibles?servicio=${servicio}&fecha=${fecha}`)).json();
      horas.forEach(h => {console.log('HORAS     0: ', h)
        const option = document.createElement('option');
        option.value = h.hora;
        option.textContent = h.hora;
        horaSelect.appendChild(option);
      });
    }
  });

  // 4. Al seleccionar hora, cargar empleados disponibles
  horaSelect.addEventListener('change', async () => {
    const servicio = servicioSelect.value;
    const fecha = fechaSelect.value;
    const hora = horaSelect.value;
    empleadoSelect.innerHTML = '<option disabled selected>Seleccione</option>';

    if (servicio && fecha && hora) {
      const empleados = await (await fetch(`/profesionales-disponibles?servicio=${servicio}&fecha=${fecha}&hora=${hora}`)).json();
      empleados.forEach(e => {
        const option = document.createElement('option');
        option.value = e.id;
        option.textContent = e.nombreCompleto;
        empleadoSelect.appendChild(option);
      });
    }
  });

  // 5. Al enviar, llamar a /registrar-turno
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const servicio = servicioSelect.value;
    const fecha = fechaSelect.value;
    const hora = horaSelect.value;
    const empleadoID = empleadoSelect.value;

    const response = await fetch('/registrar-turno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ servicio, fecha, hora, empleadoID })
    });

    const data = await response.json();
    alert(data.mensaje);
    if (data.exito) window.location.href = '/cliente/inicio';
  });
});
