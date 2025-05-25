const carrito = JSON.parse(localStorage.getItem("carritoFinalizado")) || [];
const listaProductos = document.getElementById("lista-productos");
const totalCompra = document.getElementById("total-compra");
const imagenProducto = document.getElementById("producto-imagen");

let total = 0;

if (carrito.length > 0) {
    const productoSeleccionado = carrito.find(p => p.id === 1); // Tomamos el producto específico

    if (productoSeleccionado) {
        imagenProducto.src = productoSeleccionado.imagen;
        imagenProducto.alt = productoSeleccionado.nombre;

        listaProductos.innerHTML = `
            <div class="producto-carrito">
                <p>${productoSeleccionado.nombre} x ${productoSeleccionado.cantidad}</p>
                <p>Precio total: $${productoSeleccionado.precio * productoSeleccionado.cantidad}</p>
            </div>
        `;

        total = productoSeleccionado.precio * productoSeleccionado.cantidad;
    } else {
        listaProductos.innerHTML = "<p>Tu carrito está vacío</p>";
        imagenProducto.style.display = "none";
    }
} else {
    listaProductos.innerHTML = "<p>Tu carrito está vacío</p>";
    imagenProducto.style.display = "none";
}

totalCompra.textContent = `$${total}`;

document.querySelectorAll('input[name="pago"]').forEach((input) => {
    input.addEventListener("change", function () {
        actualizarPrecio(total);
    });
});

function actualizarPrecio(precioBase) {
    let metodoSeleccionado = document.querySelector('input[name="pago"]:checked').value;
    let precioFinal = precioBase;

    if (metodoSeleccionado === "tarjeta") {
        let cuota3 = (precioBase / 3).toFixed(2);
        totalCompra.innerHTML = `Total: $${precioBase} <br> 3 cuotas de $${cuota3}`;
    } else if (metodoSeleccionado === "paypal") {
        let precioDolares = (precioBase / 1000).toFixed(2); 
        totalCompra.innerHTML = `Total: $${precioBase} (USD ${precioDolares})`;
    } else {
        totalCompra.innerHTML = `Total: $${precioBase}`;
    }
}

document.getElementById("confirmar-compra").addEventListener("click", function () {
    localStorage.removeItem("carrito"); 
    mostrarNotificacion();
});

function mostrarNotificacion() {
    const notificacion = document.getElementById("compra-notificacion");
    notificacion.classList.remove("hidden");
    notificacion.style.opacity = "1";

    setTimeout(() => {
        notificacion.style.opacity = "0";
        setTimeout(() => {
            notificacion.classList.add("hidden");
            window.location.href = "./index.html"; 
        }, 500);
    }, 3000);
}