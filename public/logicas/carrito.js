document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const floatingCartButton = document.getElementById('floatingCartButton');
    const cartCountSpan = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const closeCartModalButton = document.getElementById('closeCartModal');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const clearCartButton = document.getElementById('clearCartButton');
    const checkoutButton = document.getElementById('checkoutButton');
    const cartTotalInfo = document.getElementById('cartTotalInfo');
    const cartErrorMessage = document.getElementById('cartErrorMessage');

    // --- Estado del Carrito ---
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar carrito de localStorage

    // --- Funciones del Carrito ---

    // Calcula la fecha mínima para reservar (Hoy + 48 horas)
    const getMinReservationDateTime = () => {
        const now = new Date();
        // Agregamos 48 horas en milisegundos
        return new Date(now.getTime() + (48 * 60 * 60 * 1000));
    };

    const updateCartCount = () => {
        cartCountSpan.textContent = cart.length;
        if (cart.length > 0) {
            floatingCartButton.classList.add('active'); // Opcional: para dar un estilo si hay ítems
        } else {
            floatingCartButton.classList.remove('active');
        }
    };

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar
        cartTotalInfo.innerHTML = '';
        cartErrorMessage.textContent = ''; // Limpiar mensajes de error

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutButton.disabled = true;
            clearCartButton.disabled = true;
            return;
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.disabled = false;
            clearCartButton.disabled = false;
        }

        // Agrupar servicios por fecha para calcular totales por día
        const totalsByDay = {};
        const minDate = getMinReservationDateTime(); // Calcular la fecha mínima una vez

        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.nombre}</h4>
                    <p>Duración: ${item.duracion} minutos</p>
                    <p>Precio: $${item.precio.toLocaleString('es-AR')}</p>
                </div>
                <div class="cart-item-actions">
                    <input type="date" class="item-date-input" data-index="${index}" value="${item.fecha || ''}">
                    <input type="time" class="item-time-input" data-index="${index}" value="${item.hora || ''}">
                    <button class="remove-item-btn" data-id="${item.id}" data-index="${index}">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);

            const dateInput = cartItemDiv.querySelector('.item-date-input');
            const timeInput = cartItemDiv.querySelector('.item-time-input');

            // Configurar Flatpickr para cada input de fecha y hora
            flatpickr(dateInput, {
                locale: 'es',
                minDate: minDate, // Asegura la anticipación de 48 horas
                dateFormat: "Y-m-d",
                onChange: function(selectedDates, dateStr, instance) {
                    if (selectedDates[0]) {
                        item.fecha = dateStr;
                        validateAndRecalculateCart();
                    }
                }
            });

            flatpickr(timeInput, {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
                minuteIncrement: 15, // Los turnos pueden ser cada 15 minutos
                onChange: function(selectedDates, dateStr, instance) {
                    if (selectedDates[0]) {
                        item.hora = dateStr;
                        validateAndRecalculateCart();
                    }
                }
            });

            // Si ambos fecha y hora están seleccionados y son válidos
            if (item.fecha && item.hora) {
                const itemDateTime = new Date(`${item.fecha}T${item.hora}:00`);
                if (itemDateTime >= minDate) {
                     const dateKey = item.fecha; // Usar la fecha como clave
                     if (!totalsByDay[dateKey]) {
                         totalsByDay[dateKey] = {
                             total: 0,
                             duration: 0,
                             items: []
                         };
                     }
                     totalsByDay[dateKey].total += item.precio;
                     totalsByDay[dateKey].duration += item.duracion;
                     totalsByDay[dateKey].items.push(item);
                }
            }
        });

        // Mostrar totales por día
        let overallTotal = 0;
        for (const dateKey in totalsByDay) {
            const dayInfo = totalsByDay[dateKey];
            const dateObj = new Date(dateKey + 'T00:00:00'); // Solo para formatear la fecha
            const formattedDate = dateObj.toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            const dayTotalDiv = document.createElement('div');
            dayTotalDiv.className = 'day-total-summary';
            dayTotalDiv.innerHTML = `
                <p><strong>Total para el ${formattedDate}:</strong> $${dayInfo.total.toLocaleString('es-AR')} (${dayInfo.duration} minutos)</p>
            `;
            cartTotalInfo.appendChild(dayTotalDiv);
            overallTotal += dayInfo.total;
        }

        // Mostrar el total general (suma de todos los días)
        if (Object.keys(totalsByDay).length > 1) {
            const overallTotalDiv = document.createElement('div');
            overallTotalDiv.innerHTML = `<p><strong>Total General a Pagar:</strong> $${overallTotal.toLocaleString('es-AR')}</p>`;
            cartTotalInfo.appendChild(overallTotalDiv);
        } else if (Object.keys(totalsByDay).length === 1) {
             // Si solo hay un día, el total ya se mostró
             cartTotalInfo.innerHTML += `<p><strong>Total a Pagar:</strong> $${overallTotal.toLocaleString('es-AR')}</p>`;
        }
        
        saveCart(); // Guardar cambios después de renderizar (ej. si se asigna null a fecha/hora)
    };

    const validateAndRecalculateCart = () => {
        cartErrorMessage.textContent = '';
        let hasError = false;
        const minDate = getMinReservationDateTime();

        cart.forEach(item => {
            if (item.fecha && item.hora) {
                const itemDateTime = new Date(`${item.fecha}T${item.hora}:00`);
                if (itemDateTime < minDate) {
                    cartErrorMessage.textContent = `Error: El servicio "${item.nombre}" debe reservarse con al menos 48 horas de anticipación.`;
                    hasError = true;
                }
                // Aquí podrías añadir más validaciones: por ejemplo, si la hora está en el futuro
            } else if (!item.fecha || !item.hora) {
                cartErrorMessage.textContent = 'Error: Por favor, selecciona fecha y hora para todos los servicios.';
                hasError = true;
            }
        });

        checkoutButton.disabled = hasError || cart.length === 0;
        renderCart(); // Re-renderizar para actualizar totales y mensajes
    };


    // --- Manejadores de Eventos ---

    // Añadir servicio al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const nombre = e.target.dataset.nombre;
            const duracion = parseInt(e.target.dataset.duracion);
            const precio = parseFloat(e.target.dataset.precio);

            // Evitar duplicados simples (si un cliente pide 2 veces el mismo masaje, que se añada otra instancia)
            // Si quisieras evitar que se añada el mismo servicio DOS veces, podrías chequear:
            // if (cart.some(item => item.id === id)) {
            //     alert('Este servicio ya está en tu carrito.');
            //     return;
            // }

            cart.push({ id, nombre, duracion, precio, fecha: null, hora: null }); // Inicializa fecha/hora a null
            saveCart();
            renderCart();
            cartModal.style.display = 'flex'; // Abrir modal al añadir
        });
    });

    // Abrir modal del carrito
    floatingCartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCart();
    });

    // Cerrar modal del carrito
    closeCartModalButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Cerrar modal haciendo clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Eliminar ítem del carrito
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const indexToRemove = parseInt(e.target.dataset.index);
            cart.splice(indexToRemove, 1); // Eliminar por índice
            saveCart();
            renderCart();
        }
    });

    // Limpiar todo el carrito
    clearCartButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            cart = [];
            saveCart();
            renderCart();
        }
    });

    // Finalizar Reserva (Checkout)
    checkoutButton.addEventListener('click', async () => {
        cartErrorMessage.textContent = ''; // Limpiar errores previos

        // Validación final antes de enviar al backend
        let allServicesValid = true;
        const minDate = getMinReservationDateTime();

        for (const item of cart) {
            if (!item.fecha || !item.hora) {
                cartErrorMessage.textContent = 'Por favor, selecciona fecha y hora para todos los servicios.';
                allServicesValid = false;
                break;
            }
            const itemDateTime = new Date(`${item.fecha}T${item.hora}:00`);
            if (itemDateTime < minDate) {
                cartErrorMessage.textContent = `Error: El servicio "${item.nombre}" debe reservarse con al menos 48 horas de anticipación.`;
                allServicesValid = false;
                break;
            }
        }  

        if (!allServicesValid) {
            return; // Detener si hay errores en el frontend
        }

        // Si todas las validaciones de frontend pasan, enviar al backend
        try {
            const response = await fetch('/api/crear-turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: cart })
            });

            const result = await response.json();

            if (result.ok) {
                alert('¡Turnos reservados con éxito!\n' + result.mensaje + '\nTotal a Pagar: $' + result.totalPagar.toLocaleString('es-AR'));
                cart = []; // Vaciar carrito
                saveCart();
                renderCart();
                cartModal.style.display = 'none'; // Cerrar modal
                window.location.href = '/pagina_pago?total=' + result.totalPagar + '&details=' + encodeURIComponent(JSON.stringify(result.detallesPago)); // Redirigir a una página de pago
            } else {
                cartErrorMessage.textContent = result.error || 'Ocurrió un error al procesar la reserva.';
            }
        } catch (error) {
            console.error('Error al enviar la reserva:', error);
            cartErrorMessage.textContent = 'No se pudo conectar con el servidor para finalizar la reserva. Intente de nuevo.';
        }
    });

    // Inicializar el contador al cargar la página
    updateCartCount();
});