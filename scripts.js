const vendidos = [
  { numero: 2, nombre: "Juan Pérez", contacto: "juan@gmail.com" },
  { numero: 17, nombre: "Ana López", contacto: "ana.lopez@gmail.com" },
  { numero: 56, nombre: "Luis García", contacto: "6623001122" },
  { numero: 99, nombre: "María Torres", contacto: "maria.torres@correo.com" }
];

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

    // Evento para mostrar el modal al hacer click
    numeroDiv.addEventListener("click", () => {
      mostrarModal(numeroDiv.innerText, numeroDiv.dataset.estado, numeroDiv.dataset.nombre);
    });

    contenedor.appendChild(numeroDiv);
  }
}

function llenarTabla() {
  const tabla = document.getElementById("lista-participantes");

  vendidos.forEach(part => {
    const fila = document.createElement("tr");

    const celdaNumero = document.createElement("td");
    celdaNumero.innerText = part.numero < 10 ? `0${part.numero}` : part.numero;

    const celdaNombre = document.createElement("td");
    celdaNombre.innerText = part.nombre;

    const celdaContacto = document.createElement("td");
    celdaContacto.innerText = ocultarContacto(part.contacto); // Aquí llamamos a una función

    fila.appendChild(celdaNumero);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaContacto);

    tabla.appendChild(fila);
  });
}

// Nueva función para proteger el contacto
function ocultarContacto(contacto) {
  // Si es número (solo dígitos y tiene 10)
  if (/^\d{10}$/.test(contacto)) {
    return "******" + contacto.slice(-4);
  }

  // Si es correo
  if (contacto.includes("@")) {
    const [usuario, dominio] = contacto.split("@");
    const primeraLetra = usuario.charAt(0);
    const oculto = "*".repeat(usuario.length - 1);
    return `${primeraLetra}${oculto}@${dominio}`;
  }

  // Otro formato (no válido), se regresa tal cual
  return contacto;
}


// Modal
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

// Cerrar el modal
document.addEventListener("DOMContentLoaded", () => {
  generarNumeros();
  llenarTabla();

  const cerrar = document.getElementById("cerrar-modal");
  const modal = document.getElementById("modal");

  cerrar.addEventListener("click", () => modal.style.display = "none");

  // También cerrar si clic fuera del modal
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});
