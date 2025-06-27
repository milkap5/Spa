document.getElementById('floatingCartButton').addEventListener('click', () => {
    document.getElementById('modal').showModal();
});

function actualizarContadorCarrito(cantidad) {
    const contador = document.getElementById('cartCount');
    if(contador) {
        contador.textContent = cantidad;
    }
}