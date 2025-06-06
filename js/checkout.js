const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const formularioCheckout = document.getElementById("formulario-checkout");
const comprobante = document.getElementById("comprobante");
const comprobanteNombre = document.getElementById("comprobante-nombre");
const comprobanteEmail = document.getElementById("comprobante-email");
const comprobanteDetalles = document.getElementById("comprobante-detalles");
const comprobanteTotal = document.getElementById("comprobante-total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function cargarResumenCompra() {
    checkoutItems.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        checkoutItems.innerHTML = "<tr><td colspan='5'>No hay productos en el carrito.</td></tr>";
    } else {
        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            const subtotal = isNaN(item.precio * item.cantidad) ? 0 : item.precio * item.cantidad;

            fila.innerHTML = `
                <td><img src="${item.imagen}" width="50"></td>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td>$${subtotal}</td>
            `;

            checkoutItems.appendChild(fila);
            total += subtotal;
        });
    }

    checkoutTotal.innerText = `$${total}`;
}

cargarResumenCompra();

formularioCheckout.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    localStorage.setItem("carrito", JSON.stringify([]));

    comprobante.style.display = "block";
    comprobanteNombre.innerText = nombre;
    comprobanteEmail.innerText = email;
    comprobanteDetalles.innerHTML = carrito.map(item => `<li>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}</li>`).join("");
    comprobanteTotal.innerText = checkoutTotal.innerText;

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 5000);
});

