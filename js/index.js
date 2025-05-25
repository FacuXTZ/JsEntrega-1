const productos = [
    { id: 1, nombre: "Adidas Samba XLG", precio: 190000, imagen: "./assets/Adidas-Samba-XLG-ver-3.webp" },
    { id: 2, nombre: "Nike Air Jordan 4 Retro, Oxidized Green", precio: 400000, imagen: "./assets/J4-GREEN-3.webp" },
    { id: 3, nombre: "Nike Dunk SB Low Lottery Green", precio: 250000, imagen: "./assets/Nike-Dunk-Low-SE-Lottery.webp" },
    { id: 4, nombre: "DC Gaveler Green", precio: 60000, imagen: "./assets/DC-green-1.webp" },
    { id: 5, nombre: "Under Armour E-base Pacer Lam", precio: 100000, imagen: "./assets/UnderArmour-Green-3.webp" }
];

document.getElementById('search-button').addEventListener('click', function() {
    let query = document.getElementById('search-input').value.toLowerCase();
    
    let productos = document.querySelectorAll(".producto");
    
    productos.forEach(producto => {
        let nombre = producto.querySelector(".nombre").textContent.toLowerCase();
        
        producto.style.display = nombre.includes(query) ? "block" : "none";
    });
});

function agregarAlCarrito(productId) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productoExistente = carrito.find(p => p.id === productId);
    let productoSeleccionado = productos.find(p => p.id === productId);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarTotal();

    mostrarNotificacion(productoSeleccionado.nombre);
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const modalCartItems = document.getElementById("modal-card-items");
    const cartCount = document.getElementById("card-count");

    modalCartItems.innerHTML = carrito.length
        ? carrito.map(({ id, nombre, precio, imagen, cantidad }) => `
            <li class="cart-item">
                <img src="${imagen}" alt="${nombre}" class="cart-image">
                <div class="product-info">
                    <p>${nombre} x ${cantidad}</p>
                    <p>Precio: $${precio * cantidad}</p>
                </div>
                <button class="small-btn" onclick="modificarCantidad(${id}, 1)">+</button>
                <button class="small-btn" onclick="modificarCantidad(${id}, -1)">-</button>
            </li>
        `).join('')
        : "<p>El carrito está vacío</p>";

    cartCount.textContent = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    cartCount.style.display = carrito.length ? "block" : "none";

    actualizarTotal();
}

function actualizarTotal() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalPrice = document.getElementById("total-price");

    let total = carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    totalPrice.textContent = `Total: $${total}`;
}

function modificarCantidad(productId, cambio) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = carrito.find(p => p.id === productId);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) carrito.splice(carrito.indexOf(producto), 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
        actualizarTotal();
    }
}

function mostrarNotificacion(nombreProducto) {
    const notification = document.getElementById("notification");
    notification.textContent = `Agregaste ${nombreProducto} al carrito`;
    notification.classList.remove("hidden");
    notification.style.opacity = "1";

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 500);
    }, 3000);
}

document.querySelectorAll(".agregar-btn").forEach((boton, index) => {
    boton.addEventListener("click", () => agregarAlCarrito(index + 1));
});

document.getElementById("carrito-logo").addEventListener("click", () => {
    const cardModal = document.getElementById("card-modal");
    cardModal.style.display = cardModal.style.display === "block" ? "none" : "block";
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.getElementById("card-modal").style.display = "none";
});

document.getElementById("finalizar-compra-btn").addEventListener("click", function () {
    window.location.href = "./pages/finalizar_compra.html"; 
});