function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ===============================
// EFECTO FADE-IN AL HACER SCROLL
// ===============================
const elementos = document.querySelectorAll("section, .proyecto");

function activarFade() {
  const gatillo = window.innerHeight * 0.85;

  elementos.forEach(el => {
    const distancia = el.getBoundingClientRect().top;
    if (distancia < gatillo) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", activarFade);
window.addEventListener("load", activarFade);

// ===============================
// EFECTO NEÓN SUAVE EN HEADER
// ===============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 0 25px rgba(0,255,204,0.5)";
    header.style.background = "rgba(0,0,0,0.85)";
  } else {
    header.style.boxShadow = "0 0 15px rgba(0,255,204,0.3)";
    header.style.background = "rgba(0,0,0,0.7)";
  }
});

// ===============================
// EFECTO BRILLO PULSANTE EN TEXTOS
// ===============================
const textosBrillantes = document.querySelectorAll("h2, h1");

textosBrillantes.forEach(t => {
  t.addEventListener("mouseenter", () => {
    t.style.textShadow = "0 0 25px #00ffcc, 0 0 50px #00b894";
  });
  t.addEventListener("mouseleave", () => {
    t.style.textShadow = "0 0 15px #00ffcc, 0 0 30px #00b894";
  });
});


// ===============================
// EFECTO DE PARTÍCULAS FLOTANTES
// ===============================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;
const colors = ["#00ffcc", "#00b894", "#00ffc8"];

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];

  for (let i = 0; i < 60; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 0.6;
    const speedY = (Math.random() - 0.5) * 0.6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push({ x, y, size, speedX, speedY, color });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = p.color;
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", initParticles);
initParticles();
animateParticles();

// ===============================
// LÓGICA DE LA VENTANA MODAL
// ===============================

// 1. Seleccionar todos los botones que abren un modal
const openModalButtons = document.querySelectorAll('[data-modal-target]');
// 2. Seleccionar todos los botones que cierran un modal
const closeModalButtons = document.querySelectorAll('[data-close-button]');
// 3. Seleccionar el fondo oscuro (overlay)
const overlay = document.getElementById('overlay');

// --- Abrir un Modal ---
function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active'); // Muestra el modal
    overlay.classList.add('active'); // Muestra el fondo
}

// --- Cerrar un Modal ---
function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active'); // Oculta el modal
    overlay.classList.remove('active'); // Oculta el fondo
}

// --- Añadir Eventos a los Botones de ABRIR ---
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Obtiene el objetivo del atributo "data-modal-target" (ej: "#modal-pos")
        const modalSelector = button.dataset.modalTarget;
        // 2. Selecciona ese modal específico
        const modal = document.querySelector(modalSelector);
        // 3. Abre el modal
        openModal(modal);
    });
});

// --- Añadir Eventos a los Botones de CERRAR (la 'X') ---
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Busca el modal "padre" más cercano
        const modal = button.closest('.modal');
        // 2. Cierra ese modal
        closeModal(modal);
    });
});

// --- Cerrar el modal al hacer clic en el fondo oscuro ---
overlay.addEventListener('click', () => {
    // 1. Busca todos los modales que estén activos
    const modals = document.querySelectorAll('.modal.active');
    // 2. Cierra cada uno de ellos
    modals.forEach(modal => {
        closeModal(modal);
    });
});