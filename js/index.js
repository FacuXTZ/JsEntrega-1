const productos = [
    { id: 1, nombre: "Adidas Samba XLG", precio: 190000 },
    { id: 2, nombre: "Nike Air Jordan 4 Retro, Oxidized Green", precio: 400000 },
    { id: 3, nombre: "Nike Dunk SB Low Lottery Green", precio: 250000 },
    { id: 4, nombre: "DC Graveler Green", precio: 60000 },
    { id: 5, nombre: "Under Armour E-base Pacer Lam", precio: 100000 },
];

function cargarProductos() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    productos.forEach(producto => {
        const item = document.createElement("div");
        item.className = "product-item";
        
        const productoTexto = document.createElement("p");
        productoTexto.textContent = `${producto.nombre} - $${producto.precio}`;
        
        const botonAgregar = document.createElement("button");
        botonAgregar.className = "custom-button";
        botonAgregar.textContent = "Agregar al carrito";

        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id));

        item.appendChild(productoTexto);
        item.appendChild(botonAgregar);
        productList.appendChild(item);
    });
}

function actualizarCarrito() {
    const cartItems = document.getElementById("card-items");
    const carritoSection = document.getElementById("card");
    cartItems.innerHTML = "";
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.forEach(producto => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        cartItems.appendChild(item);
    });
    carritoSection.style.display = carrito.length > 0 ? "block" : "none"; 
}

function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    if (producto) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        const cartCount = document.getElementById("card-count");
        cartCount.textContent = carrito.length;
        cartCount.style.display = carrito.length > 0 ? "block" : "none";

        actualizarCarrito(); 
    }
}

document.getElementById("carrito-logo").addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const modalCartItems = document.getElementById("modal-card-items");
    modalCartItems.innerHTML = ""; 

    carrito.forEach(producto => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        modalCartItems.appendChild(item);
    });

    const cartModal = document.getElementById("card-modal");
    cartModal.style.display = "block"; 
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
    const cartModal = document.getElementById("card-modal");
    cartModal.style.display = "none";
});

document.getElementById("clear-card-btn").addEventListener("click", () => {
    localStorage.removeItem("carrito"); 
    actualizarCarrito(); 
    const cartCount = document.getElementById("card-count");
    cartCount.textContent = "0"; 
    cartCount.style.display = "none";
    const modalCartItems = document.getElementById("modal-card-items");
    modalCartItems.innerHTML = ""; 
});

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarCarrito();
});