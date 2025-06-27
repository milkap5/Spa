const contenedor = document.getElementById('contenedor-servicios');

contenedor.addEventListener('mouseenter', e => {
    if(e.target.classList.contains('fa-times-circle')) {
        const item = e.target.closest('.itemContainer');
        if (item) item.classList.add('warning');
    }
}, true);

contenedor.addEventListener('mouseleave', e => {
    if (e.target.classList.contains('fa-times-circle')) {
        const item = e.target.closest('.itemContainer');
        if (item) item.classList.remove('warning');
    }
}, true);

contenedor.addEventListener('click', e => {
    if(e.target.classList.contains('fa-times-circle')) {
        const item = e.target.closest('.itemContainer');
        if(!item) return;

        const titulo = item.dataset.titulo;
        fetch('/eliminar-servicio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                item.remove();
                actualizarContadorCarrito(data.carrito.length);
            }
            else { console.log('NO SE PUDO ELIMINAR EL SERVICIO DEL BACK-END');}
        })
        .catch(error => console.error('ERROR AL ELIMINAR SERVICIO: ', error));
    }
});