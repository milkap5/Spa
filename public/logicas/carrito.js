// 🛒 Leer carrito desde localStorage
const servicios = JSON.parse(localStorage.getItem("carritoServicios")) || [];

const contenedor = document.getElementById("carrito-contenido");
const plantilla = document.getElementById("grupo-fecha-template");

function agruparPorFecha(servicios) {
  const grupos = {};
  for (const s of servicios) {
    if (!grupos[s.fecha]) grupos[s.fecha] = [];
    grupos[s.fecha].push(s);
  }
  return grupos;
}

function calcularTotal(servicios, metodoPago) {
  let total = servicios.reduce((sum, s) => sum + s.precio, 0);
  if (metodoPago === "tarjeta") {
    total *= 0.85;
  }
  return Math.round(total);
}

function validar48Horas(fechaStr) {
  const ahora = new Date();
  const fechaServicio = new Date(fechaStr);
  const diferenciaHoras = (fechaServicio - ahora) / 1000 / 60 / 60;
  return diferenciaHoras >= 48;
}

function renderCarrito() {
  contenedor.innerHTML = "";
  const grupos = agruparPorFecha(servicios);

  Object.keys(grupos).forEach((fecha) => {
    const clone = plantilla.content.cloneNode(true);
    clone.querySelector(".fecha-texto").textContent = fecha;

    const lista = clone.querySelector(".servicios-lista");
    grupos[fecha].forEach(s => {
      const item = document.createElement("div");
      item.className = "servicio-item";
      item.innerHTML = `<p><strong>${s.nombre}</strong> - $${s.precio} a las ${s.hora}</p>`;
      lista.appendChild(item);
    });

    const select = clone.querySelector(".metodo-pago");
    const tarjetaForm = clone.querySelector(".pago-tarjeta");
    const totalSpan = clone.querySelector(".total-monto span");
    const confirmarBtn = clone.querySelector(".confirmar-pago");

    function actualizarTotal() {
      const metodo = select.value;
      totalSpan.textContent = calcularTotal(grupos[fecha], metodo);
      tarjetaForm.hidden = metodo !== "tarjeta";
    }

    select.addEventListener("change", actualizarTotal);
    actualizarTotal();

    confirmarBtn.addEventListener("click", () => {
      if (!validar48Horas(fecha)) {
        alert("El servicio debe reservarse con al menos 48 horas de anticipación.");
        return;
      }

      const metodo = select.value;
      if (metodo === "tarjeta") {
        const inputs = tarjetaForm.querySelectorAll("input");
        for (const input of inputs) {
          if (!input.value.trim()) {
            alert("Por favor completá todos los datos de la tarjeta.");
            return;
          }
        }
      }

      alert(`✅ Reserva confirmada para el ${fecha}. Se enviará un email con los detalles.`);
      // Acá iría la llamada a backend + envío de mail simulado
      // Remover solo los servicios de esa fecha:
      const restantes = servicios.filter(s => s.fecha !== fecha);
      localStorage.setItem("carritoServicios", JSON.stringify(restantes));
      location.reload();
    });

    contenedor.appendChild(clone);
  });

  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const count = servicios.length;
  const contador = document.getElementById("cartCount");
  if (contador) contador.textContent = count;
}

// Render automático al cargar
renderCarrito();
