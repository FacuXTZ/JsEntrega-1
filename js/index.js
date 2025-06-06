if (window.location.search.includes("reload=true")) {
    localStorage.removeItem("carrito"); 
    window.location.href = "../index.html"; 
}

fetch("./data/productos.json")
    .then(response => response.json())
    .then(data => console.log("Productos cargados:", data))
    .catch(error => console.error("Error al cargar JSON:", error));


actualizarNumeroCarrito();

function mostrarProductos(productos) {
    const contenedor = document.querySelector(".productos");
    if (!contenedor) {
        console.error("No se encontró el contenedor de productos.");
        return;
    }

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("producto");

        const precioNumero = parseInt(producto.precio);

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${precioNumero}</p>
            <button class="agregar-carrito">Agregar al carrito</button>
        `;

        contenedor.appendChild(tarjeta);
        tarjeta.querySelector(".agregar-carrito").addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ 
            nombre: producto.nombre, 
            precio: parseInt(producto.precio), 
            cantidad: 1, 
            imagen: producto.imagen 
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarNumeroCarrito();
    window.location.href = "../pages/carrito.html";
}

function actualizarNumeroCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById("carrito-numero").innerText = carritoCantidad;
}

const carritoIcono = document.getElementById("carrito-icono");
if (carritoIcono) {
    carritoIcono.addEventListener("click", () => {
        window.location.href = "../pages/carrito.html";
    });
} else {
    console.error("El ícono del carrito no se encuentra en el DOM.");
}


function eliminarProducto(nombre) {
    carrito = carrito.filter((item) => item.nombre !== nombre);
    actualizarCarrito();
}


function modificarCantidad(nombre, accion) {
    const producto = carrito.find((item) => item.nombre === nombre);
    if (producto) {
        if (accion === "sumar") {
            producto.cantidad++;
        } else if (accion === "restar" && producto.cantidad > 1) {
            producto.cantidad--;
        }
    }
    actualizarCarrito();
}

const carritoItems = document.getElementById("carrito-items");
const totalPrecio = document.getElementById("total-precio");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    carritoItems.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        carritoItems.innerHTML = "<tr><td colspan='6'>El carrito está vacío</td></tr>";
    } else {
        carrito.forEach((item, index) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td><img src="${item.imagen}" width="50"></td>
                <td>${item.nombre}</td>
                <td>
                    <button onclick="modificarCantidad(${index}, 'restar')">-</button>
                    ${item.cantidad}
                    <button onclick="modificarCantidad(${index}, 'sumar')">+</button>
                </td>
                <td>$${item.precio}</td>
                <td>$${item.precio * item.cantidad}</td>
                <td><button onclick="eliminarProducto(${index})">🗑️</button></td>
            `;

            carritoItems.appendChild(fila);
            total += item.precio * item.cantidad;
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

actualizarCarrito();

