// Función para actualizar el contador del carrito en el encabezado
function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = carrito.length;
    }
}

// Función para mostrar los productos en el carrito
function showCart() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    let costDetailsContainer = document.getElementById('cost-details');
    let cartTotalElement = document.getElementById('cart-total');
    
    // Verificar si los elementos existen
    if (cartItemsContainer && costDetailsContainer && cartTotalElement) {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor
        costDetailsContainer.innerHTML = ''; // Limpiar el contenedor de detalles de costo

        if (carrito.length > 0) {
            carrito.forEach((item, index) => {
                let precioConIVA = calcularPrecioConIVA(item.precio);
                let iva = precioConIVA - item.precio; // Calcular solo el IVA

                // Mostrar el producto con su precio y IVA
                let itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <p><strong>${item.nombre}</strong></p>
                    <p>Precio base: $${item.precio}</p>
                    <p>IVA (21%): $${iva.toFixed(2)}</p>
                    <p><strong>Total con IVA: $${precioConIVA.toFixed(2)}</strong></p>
                    <button onclick="removeItem(${index})">Eliminar</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            // Mostrar los detalles del costo total
            let totalSinIVA = 0;
            let totalIVA = 0;

            carrito.forEach(item => {
                totalSinIVA += item.precio;
                totalIVA += calcularPrecioConIVA(item.precio) - item.precio;
            });

            costDetailsContainer.innerHTML = `
                <p>Precio total sin IVA: $${totalSinIVA.toFixed(2)}</p>
                <p>IVA (21%): $${totalIVA.toFixed(2)}</p>
            `;
        } else {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        }

        // Calcular el total con IVA
        calcularTotal();
    }
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('carrito');
    showCart(); // Volver a mostrar el carrito vacío
}

// Función para eliminar un item del carrito
function removeItem(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Eliminar el servicio del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
    showCart(); // Actualizar la vista del carrito
    actualizarCarrito(); // Actualizar el contador de ítems en el carrito
}

// Función para agregar un servicio al carrito
function addItem(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let nuevoServicio = { nombre, precio };
    carrito.push(nuevoServicio); // Agregar el servicio al carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
    showCart(); // Actualizar la vista del carrito
    actualizarCarrito(); // Actualizar el contador de ítems en el carrito
}

// Función para calcular el total con IVA
function calcularTotal() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    // Sumar los precios de los productos con IVA
    carrito.forEach(item => {
        const precioConIVA = item.precio * 1.21; // Asumimos IVA del 21%
        total += precioConIVA;
    });

    // Mostrar el total en la página
    let cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.innerText = total.toFixed(2);
    }
}

// Función para calcular el precio con IVA
function calcularPrecioConIVA(precio, iva = 21) {
    const precioConIVA = precio * (1 + iva / 100);
    return precioConIVA;
}

function goToPayment() {
    // Aquí puedes redirigir a una página de pago o realizar el proceso de pago
    window.location.href = "../page/pago.html"; // Redirige a la página de pago
}


// Llamar a las funciones cuando la página cargue
window.onload = function() {
    showCart();
    actualizarCarrito();
};
