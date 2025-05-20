const productos = [
    { id: 1, nombre: "Adidas Samba XLG", precio: 190000 },
    { id: 2, nombre: "Nike Air Jordan 4 Retro, Oxidized Green", precio: 400000 },
    { id: 3, nombre: "Nike Dunk SB Low Lottery Green", precio: 250000 },
    { id: 4, nombre: "DC Gaveler Green", precio: 60000 },
    { id: 5, nombre: "Under Armour E-base Pacer Lam", precio: 100000 },
];

function cargarProductos() {
    document.getElementById("product-list").innerHTML = productos.map(({ id, nombre, precio }) => `
        <div class="product-item">
            <p>${nombre} - $${precio}</p>
            <button class="custom-button" onclick="agregarAlCarrito(${id})">Agregar al carrito</button>
        </div>
    `).join('');
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const modalCartItems = document.getElementById("modal-card-items");
    const cartCount = document.getElementById("card-count");

    modalCartItems.innerHTML = carrito.length
        ? carrito.map(({ id, nombre, precio, cantidad }) => `
            <li>
                ${nombre} - $${precio} x ${cantidad}
                <button class="small-btn" onclick="modificarCantidad(${id}, 1)">+</button>
                <button class="small-btn" onclick="modificarCantidad(${id}, -1)">-</button>
            </li>
        `).join('')
        : "<p>El carrito está vacío</p>";

    cartCount.textContent = carrito.reduce((sum, p) => sum + p.cantidad, 0);
    cartCount.style.display = carrito.length ? "block" : "none";
}

function agregarAlCarrito(productId) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let producto = carrito.find(p => p.id === productId);

    if (producto) {
        producto.cantidad++;
    } else {
        producto = { ...productos.find(p => p.id === productId), cantidad: 1 };
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function modificarCantidad(productId, cambio) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = carrito.find(p => p.id === productId);

    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) carrito.splice(carrito.indexOf(producto), 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

document.getElementById("carrito-logo").addEventListener("click", () => {
    const cardModal = document.getElementById("card-modal");
    cardModal.style.display = cardModal.style.display === "block" ? "none" : "block";
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.getElementById("card-modal").style.display = "none";
});

document.getElementById("finalizar-compra-btn").addEventListener("click", () => { 
    window.location.href = "metodos_pago.html"; 
});

window.addEventListener("load", () => {
    iniciarCarrusel();
});

function iniciarCarrusel() {
    const productos = document.querySelectorAll(".producto");
    let index = 0;

    function updateCarrusel() {
        productos.forEach(producto => producto.style.display = "none");
        productos[index].style.display = "block";
    }

    document.getElementById("next-btn").addEventListener("click", () => {
        index = (index + 1) % productos.length;
        updateCarrusel();
    });

    document.getElementById("prev-btn").addEventListener("click", () => {
        index = (index - 1 + productos.length) % productos.length;
        updateCarrusel();
    });

    updateCarrusel(); 
}