const carritoItems = document.getElementById("carrito-items");
const totalPrecio = document.getElementById("total-precio");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const comprarAhoraBtn = document.getElementById("comprar-ahora"); 

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    carritoItems.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        carritoItems.innerHTML = "<tr><td colspan='6'>El carrito está vacío</td></tr>";
    } else {
        carrito.forEach((item, index) => {
            const fila = document.createElement("tr");

            const subtotal = isNaN(item.precio * item.cantidad) ? 0 : item.precio * item.cantidad;

            fila.innerHTML = `
                <td><img src="${item.imagen}" width="50"></td>
                <td>${item.nombre}</td>
                <td>
                    <button onclick="modificarCantidad(${index}, 'restar')">-</button>
                    ${item.cantidad}
                    <button onclick="modificarCantidad(${index}, 'sumar')">+</button>
                </td>
                <td>$${item.precio}</td>
                <td>$${subtotal}</td>
                <td><button onclick="eliminarProducto(${index})">🗑️</button></td>
            `;

            carritoItems.appendChild(fila);
            total += subtotal;
        });
    }

    totalPrecio.innerText = `$${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function modificarCantidad(index, accion) {
    if (accion === "sumar") {
        carrito[index].cantidad++;
    } else if (accion === "restar" && carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    }
    actualizarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

comprarAhoraBtn.addEventListener("click", () => {
    window.location.href = "../pages/checkout.html";
});

actualizarCarrito();

