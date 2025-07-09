// Lista de números vendidos
const vendidos = [
  { numero: 2, nombre: "Juan Pérez", contacto: "juan@gmail.com" },
  { numero: 17, nombre: "Ana López", contacto: "ana.lopez@gmail.com" },
  { numero: 56, nombre: "Luis García", contacto: "6623001122" },
  { numero: 99, nombre: "María Torres", contacto: "maria.torres@correo.com" }
];

// Generar los 100 números
function generarNumeros() {
  const contenedor = document.getElementById("numeros");

  for (let i = 1; i <= 100; i++) {
    const numeroDiv = document.createElement("div");
    numeroDiv.innerText = i < 10 ? `0${i}` : i;

    const vendido = vendidos.find(v => v.numero === i);
    if (vendido) {
      numeroDiv.classList.add("vendido");
      numeroDiv.dataset.estado = "vendido";
      numeroDiv.dataset.nombre = vendido.nombre;
    } else {
      numeroDiv.dataset.estado = "disponible";
    }

    // Al dar clic mostrar modal con info del número
    numeroDiv.addEventListener("click", () => {
      mostrarModal(numeroDiv.innerText, numeroDiv.dataset.estado, numeroDiv.dataset.nombre);
    });

    contenedor.appendChild(numeroDiv);
  }
}

// Llenar la tabla de participantes
function llenarTabla() {
  const tabla = document.getElementById("lista-participantes");

  vendidos.forEach(part => {
    const fila = document.createElement("tr");

    const celdaNumero = document.createElement("td");
    celdaNumero.innerText = part.numero < 10 ? `0${part.numero}` : part.numero;

    const celdaNombre = document.createElement("td");
    celdaNombre.innerText = part.nombre;

    const celdaContacto = document.createElement("td");
    celdaContacto.innerText = ocultarContacto(part.contacto);

    fila.appendChild(celdaNumero);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaContacto);

    tabla.appendChild(fila);
  });
}

// Ocultar parte del contacto
function ocultarContacto(contacto) {
  if (/^\d{10}$/.test(contacto)) {
    return "******" + contacto.slice(-4);
  }

  if (contacto.includes("@")) {
    const [usuario, dominio] = contacto.split("@");
    const primeraLetra = usuario.charAt(0);
    const oculto = "*".repeat(usuario.length - 1);
    return `${primeraLetra}${oculto}@${dominio}`;
  }

  return contacto;
}

// Mostrar modal del número
function mostrarModal(numero, estado, nombre = "") {
  const modal = document.getElementById("modal");
  const mensaje = document.getElementById("mensaje-modal");

  if (estado === "vendido") {
    mensaje.innerText = `🚫 El número ${numero} ya fue comprado por: ${nombre}`;
  } else {
    mensaje.innerText = `✅ El número ${numero} está disponible. ¡Cómpralo ya!`;
  }

  modal.style.display = "flex";
}

// Cerrar modal
function configurarModal() {
  const cerrar = document.getElementById("cerrar-modal");
  const modal = document.getElementById("modal");

  cerrar.addEventListener("click", () => modal.style.display = "none");

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
}

// Efecto flip de la tarjeta del premio
function configurarFlip() {
  const flipCard = document.getElementById("flip-card");
  if (flipCard) {
    flipCard.addEventListener("click", () => {
      flipCard.classList.toggle("girado");
    });
  }
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", () => {
  generarNumeros();
  llenarTabla();
  configurarModal();
  configurarFlip();
});
