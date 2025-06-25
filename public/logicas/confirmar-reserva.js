document.addEventListener("DOMContentLoaded", () => {
  const servicios = JSON.parse(localStorage.getItem("carritoServicios")) || [];
  const contenedor = document.getElementById("contenedor-reservas");
  const template = document.getElementById("template-fecha");

  if (servicios.length === 0) {
    contenedor.innerHTML = "<p>No hay servicios en el carrito.</p>";
    return;
  }

  const grupos = agruparPorFecha(servicios);

  Object.entries(grupos).forEach(([fecha, serviciosDelDia]) => {
    const clone = template.content.cloneNode(true);
    const grupoDiv = clone.querySelector(".grupo-reserva");
    clone.querySelector(".fecha").textContent = fecha;

    const lista = clone.querySelector(".lista-servicios");
    serviciosDelDia.forEach(s => {
      const p = document.createElement("p");
      p.textContent = `${s.nombre} - ${s.hora} - $${s.precio}`;
      lista.appendChild(p);
    });

    const selectMetodo = clone.querySelector(".metodo-pago");
    const formTarjeta = clone.querySelector(".form-tarjeta");
    const totalSpan = clone.querySelector(".total span");
    const btnConfirmar = clone.querySelector(".btn-confirmar");

    const inputNumero = clone.querySelector(".input-numero");
    const inputNombre = clone.querySelector(".input-nombre");
    const inputVenc = clone.querySelector(".input-vencimiento");

    const previewNumero = clone.querySelector("#preview-numero");
    const previewNombre = clone.querySelector("#preview-nombre");
    const previewVenc = clone.querySelector("#preview-vencimiento");

    // actualizar valores de la tarjeta mientras se escribe
    inputNumero.addEventListener("input", () => {
      const clean = inputNumero.value.replace(/\D/g, "").substring(0, 16);
      inputNumero.value = clean.replace(/(.{4})/g, "$1 ").trim();
      previewNumero.textContent = inputNumero.value.padEnd(19, "#");
    });

    inputNombre.addEventListener("input", () => {
      previewNombre.textContent = inputNombre.value.toUpperCase() || "NOMBRE COMPLETO";
    });

    inputVenc.addEventListener("input", () => {
      previewVenc.textContent = inputVenc.value || "MM/AA";
    });

    function actualizarTotal() {
      let total = serviciosDelDia.reduce((acc, s) => acc + s.precio, 0);
      if (selectMetodo.value === "tarjeta") {
        total *= 0.85;
        formTarjeta.hidden = false;
      } else {
        formTarjeta.hidden = true;
      }
      totalSpan.textContent = total.toFixed(2);
    }

    selectMetodo.addEventListener("change", actualizarTotal);
    actualizarTotal();

    btnConfirmar.addEventListener("click", () => {
      if (selectMetodo.value === "tarjeta") {
        const num = inputNumero.value.trim();
        const nom = inputNombre.value.trim();
        const venc = inputVenc.value.trim();
        const cvv = clone.querySelector(".input-cvv").value.trim();

        if (!num || !nom || !venc || !cvv) {
          alert("Por favor, completá todos los campos de la tarjeta.");
          return;
        }
      }

      alert(`✅ Tu reserva para el ${fecha} ha sido confirmada. Pronto recibirás un correo.`);
      const restantes = servicios.filter(s => s.fecha !== fecha);
      localStorage.setItem("carritoServicios", JSON.stringify(restantes));
      location.reload();
    });

    contenedor.appendChild(clone);
  });
});

function agruparPorFecha(servicios) {
  const grupos = {};
  for (const s of servicios) {
    if (!grupos[s.fecha]) grupos[s.fecha] = [];
    grupos[s.fecha].push(s);
  }
  return grupos;
}
