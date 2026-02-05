// ===== CAMBIO DE SECCIONES =====
function mostrarSeccion(id) {
    document.querySelectorAll(".contenido").forEach(sec => {
        sec.classList.add("oculto");
    });
    document.getElementById(id).classList.remove("oculto");
}

// ===== MENSAJE =====
function mensajeBacanora() {
    alert("En cada trago de REBORN 77 Cacao vive la tradición sonorense.");
}

// ===== CARRITO =====
let carrito = [];
let total = 0;

function agregarCarrito(e, nombre, precio) {
    e.stopPropagation();
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - $${item.precio}
            <button onclick="eliminarProducto(${index})">❌</button>
        `;
        lista.appendChild(li);
    });

    totalSpan.textContent = total;
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function pagar() {
    const metodo = document.getElementById("pago").value;

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    if (metodo === "") {
        alert("Selecciona una forma de pago.");
        return;
    }

    generarTicket(metodo);
    vaciarCarrito();
}

function generarTicket(metodo) {
    document.getElementById("ticket").classList.remove("oculto");

    const fecha = new Date().toLocaleString();
    document.getElementById("fecha").textContent = `Fecha: ${fecha}`;

    const lista = document.getElementById("ticketProductos");
    lista.innerHTML = "";

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        lista.appendChild(li);
    });
    document.getElementById("ticketTotal").textContent = total;
    document.getElementById("ticketPago").textContent = metodo;

    // 👉 Mostrar u ocultar datos de transferencia
    const datos = document.getElementById("datosTransferencia");

    if (metodo === "Transferencia") {
        datos.classList.remove("oculto");
    } else {
        datos.classList.add("oculto");
    }
}
function cerrarTicket() {
    document.getElementById("ticket").classList.add("oculto");
}

// ===== CARRUSEL GALERÍA =====
let posicionCarrusel = 0;

function moverCarrusel(direccion) {
    const carrusel = document.getElementById("carrusel");
    const itemWidth = 340; // 320 + margen
    const totalItems = carrusel.children.length;

    posicionCarrusel += direccion;

    if (posicionCarrusel < 0) {
        posicionCarrusel = 0;
    }

    if (posicionCarrusel > totalItems - 1) {
        posicionCarrusel = totalItems - 1;
    }

    carrusel.style.transform =
        `translateX(-${posicionCarrusel * itemWidth}px)`;
}
function enviarContacto(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !email || !mensaje) {
        alert("Por favor completa todos los campos.");
        return;
    }

    alert(
        "Gracias por contactarnos, " + nombre + 
        ".\nHemos recibido tu mensaje y te responderemos pronto."
    );

    event.target.reset();
}

