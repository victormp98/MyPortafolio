// --- Intersection Observer for Reveal Effect ---
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealOnScroll.observe(el));

// --- Enhanced Particles Background ---
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;
const colors = ["#00f2ff", "#7000ff", "#ffffff"];
let animationId; // Variable para almacenar el ID de la animación

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];

    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.4;
        const speedY = (Math.random() - 0.5) * 0.4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.5 + 0.1;
        particlesArray.push({ x, y, size, speedX, speedY, color, opacity });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    // Guardamos el ID para poder pausarla
    animationId = requestAnimationFrame(animateParticles);
}

// Rendimiento: Pausar partículas si la pestaña no es visible
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animateParticles();
    }
});

window.addEventListener("resize", () => {
    initParticles();
});

initParticles();
animateParticles();

// --- Gallery Lightbox Logic ---
const project1Images = [
    "Auditoría de onolaciones-0.png",
    "Catálogo-0.png",
    "Catálogo-1.png",
    "Clientes VIP-0.png",
    "Configuración del negocio-0.png",
    "Corte de caja-0.png",
    "Dashboard-0.png",
    "Dashboard-1.png",
    "Gestión de categorías-0.png",
    "Gestión de envíos-0.png",
    "Gestión de usuarios-0.png",
    "Historial de mermas-0.png",
    "Menú administración-0.png",
    "Movimientos de inventario-0.png",
    "Producto del catálogo-0.png",
    "Punto de venta-0.png",
    "Rendimiento de empleados-0.png",
    "Reportes de merma-0.png",
    "Venta del día-0.png"
];

let currentImgIndex = 0;
let previousActiveElement; // Variable para restaurar el foco del teclado
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('gallery-img');
const caption = document.getElementById('gallery-caption');
const openBtn = document.getElementById('open-gallery');
const closeBtn = document.querySelector('.close-gallery');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function updateGallery() {
    const fileName = project1Images[currentImgIndex];
    // Ruta original restaurada para el JS
    modalImg.src = `Portafolio-web/img/Proyecto1/${fileName}`;
    caption.textContent = fileName.replace('-0.png', '').replace('-1.png', '');
}

if (openBtn) {
    openBtn.onclick = () => {
        previousActiveElement = document.activeElement; // Guardar qué elemento tenía el foco
        currentImgIndex = 0;
        updateGallery();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Enfocar el modal por accesibilidad
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    };
}

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Restaurar el foco al botón que abrió el modal
    if (previousActiveElement) {
        previousActiveElement.focus();
    }
};

closeBtn.onclick = closeModal;
modal.onclick = (e) => { if (e.target === modal) closeModal(); };

prevBtn.onclick = (e) => {
    e.stopPropagation();
    currentImgIndex = (currentImgIndex > 0) ? currentImgIndex - 1 : project1Images.length - 1;
    updateGallery();
};

nextBtn.onclick = (e) => {
    e.stopPropagation();
    currentImgIndex = (currentImgIndex < project1Images.length - 1) ? currentImgIndex + 1 : 0;
    updateGallery();
};

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') closeModal();
});

// --- Lógica del Menú Móvil ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}