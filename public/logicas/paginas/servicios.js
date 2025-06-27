const boxes = document.querySelectorAll(".servicio-box");
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

window.addEventListener("scroll", () => {
    boxes.forEach(box => {
        const top = box.getBoundingClientRect().top;
        
        if(top < window.innerHeight - 100) {
            box.classList.add('visible');
        }
    });
});

const almacenarServicio = (servicio) => {
    fetch('/agregar-servicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicio)
    }).then(res => res.json())
    .then(data => {
        if(data.success) {
            const nuevoServicio = data.carrito.at(-1);
            const contenedor = document.getElementById('contenedor-servicios');
            contenedor.insertAdjacentHTML('beforeend', crearItemHTML(nuevoServicio));

            actualizarContadorCarrito(data.carrito.length);
            console.log('Servicio agregado al carrito: ', data.carrito);
        }
    })
    .catch(error => {
        console.log('ERROR AL AGREGAR SERVICIO: ', error)
    });
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(usuario === 'noRegistrado') {
            alert('Debes iniciar sesión o registrarte para Reservar algún turno.');
        } else {
            
            const servicio = {
                titulo: button.dataset.titulo,
                precio: parseInt(button.dataset.precio),
                imagen: decodeURIComponent(button.dataset.imagen)
            }

            almacenarServicio(servicio);
            button.disabled = true;
            button.innerHTML = 'Añadido';
        }
    });
});

function crearItemHTML(servicio) {
  return `
    <div class="itemContainer" data-titulo="${servicio.titulo}">
      <div class="info">
        <img src="/media/imagenes/${servicio.imagen}" alt="${servicio.titulo}" class="itemServicioImagen">
        <div class="texts">
          <p><strong>Masajes: </strong>${servicio.titulo}.</p>
          <div>
            <p><strong>Duración: </strong>50 minutos.</p>
            <p><strong>Precio: </strong>$${servicio.precio}.</p>
          </div>
        </div>
      </div>
      <i class="fa fa-times-circle" aria-hidden="true"></i>
    </div>
  `;
}

document.getElementById('limpiarCarrito').addEventListener('click', () => {
    fetch('/limpiar-carrito', {
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            document.getElementById('contenedor-servicios').innerHTML = '';
            actualizarContadorCarrito(0);
        }
    })
    .catch(error => console.error('ERROR AL LIMPIAR CARRITO: ', error))
});