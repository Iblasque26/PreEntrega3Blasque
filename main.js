// Obtener referencias a los botones de agregar al carrito en tu HTML
const agregarAlCarritoBoton = document.querySelectorAll('.agregarAlCarrito');
const finalizarBoton = document.getElementById('finalizarBoton');
const borrarBoton = document.getElementById('borrarBoton');

const botonesArray = Array.from(agregarAlCarritoBoton);

if (!localStorage.getItem('carrito')) {
    localStorage.setItem('carrito', JSON.stringify([]));
}

botonesArray.forEach(boton => {
    boton.addEventListener('click', () => {
        const tipo = boton.dataset.tipo;
        const precio = parseInt(boton.dataset.precio);
        agregarAlCarrito(tipo, precio);
        mostrarCarrito();
    });
});

finalizarBoton.addEventListener('click', () => {
    alert('Gracias por asegurarte con nosotros.');
    localStorage.setItem('carrito', JSON.stringify([])); // Vaciar el carrito después de mostrar la alerta
    mostrarCarrito(); // Mostrar el carrito vacío
});

borrarBoton.addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify([])); // Vaciar el carrito
    mostrarCarrito(); // Mostrar el carrito vacío
});

function agregarAlCarrito(tipo, precio) {
    const seguro = { tipo, precio };
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.push(seguro);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartElement = document.getElementById('carrito');

    if (carrito.length === 0) {
        cartElement.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        let totalPrice = 0;
        let carritoHTML = '<ul>';
        carrito.forEach(seguro => {
            carritoHTML += `<li>${seguro.tipo} - $${seguro.precio}</li>`;
            totalPrice += seguro.precio;
        });
        carritoHTML += `</ul><p><strong>Total: $${totalPrice}</strong></p>`;
        cartElement.innerHTML = carritoHTML;
    }
}

mostrarCarrito();


