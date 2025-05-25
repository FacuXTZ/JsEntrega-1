const zapatillaSeleccionada = {
    id: 1,
    nombre: "Jordan 4 Green",
    precio: 400000,
    imagen: "./assets/J4-Green-3.webp"
};

const images = [
    "./assets/J4-Green.webp",
    "./assets/J4-GREEN-2.webp",
    "./assets/J4-GREEN-3.webp"
];
let currentIndex = 0;

function changeImage(imageSrc) {
    document.getElementById("displayed-image").src = imageSrc;
    currentIndex = images.indexOf(imageSrc);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; 
    document.getElementById("displayed-image").src = images[currentIndex];
}

document.getElementById("add-to-cart").addEventListener("click", () => agregarAlCarrito(zapatillaSeleccionada));

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productoExistente = carrito.find(p => p.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    actualizarTotal();
    
    mostrarNotificacion(producto.nombre);
}

document.getElementById("finalizar-compra-btn").addEventListener("click", function () {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    localStorage.setItem("carritoFinalizado", JSON.stringify(carrito)); 
    window.location.href = "./pages/finalizar_compra.html"; 
});

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const modalCartItems = document.getElementById("modal-card-items");
    const cartCount = document.getElementById("card-count");

    modalCartItems.innerHTML = carrito.length
        ? carrito.map(({ id, nombre, precio, imagen, cantidad }) => `
            <li class="cart-item">
                <img src="${imagen.startsWith("./") ? imagen : "./" + imagen}" alt="${nombre}" class="cart-image">
                <div class="product-info">
                    <p>${nombre} x ${cantidad}</p>
                    <p>Precio total: $${precio * cantidad}</p>
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

document.getElementById("carrito-logo").addEventListener("click", () => {
    const cardModal = document.getElementById("card-modal");
    cardModal.style.display = cardModal.style.display === "block" ? "none" : "block";
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.getElementById("card-modal").style.display = "none";
});
