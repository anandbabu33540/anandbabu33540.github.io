// Dynamic Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = themeBtn.querySelector('i');

// Check Local Storage for Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const menuIcon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// Typing Effect
const textArray = ["AI/ML Engineer", "Data Scientist", "AI Enthusiast"];
const typingText = document.querySelector('.typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}
// Start typing effect on load
document.addEventListener('DOMContentLoaded', type);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function reveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100; // pixels before revealing

    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// 3D Tilt Effect for Glass Panels
const tiltElements = document.querySelectorAll('.tilt');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// AI Network Background Animation (Canvas)
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = html.getAttribute('data-theme') === 'light' ? 'rgba(0, 123, 255, 0.3)' : 'rgba(0, 240, 255, 0.3)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                // Change line color based on theme
                const isLight = html.getAttribute('data-theme') === 'light';
                const opacity = 1 - (distance / 150);
                ctx.strokeStyle = isLight ? `rgba(0, 123, 255, ${opacity * 0.2})` : `rgba(0, 240, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Re-init particles on theme change so colors update
themeBtn.addEventListener('click', () => {
    setTimeout(initParticles, 100);
});
// ================================
// 3D MODEL MODAL
// ================================

const modelModal = document.getElementById("modelModal");
const openModel = document.getElementById("openModel");
const closeModel = document.getElementById("closeModel");
const closeModelBtn = document.getElementById("closeModelBtn");
const closeModelBottom = document.getElementById("closeModelBottom");

function openModal() {
  modelModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modelModal.classList.remove("active");
  document.body.style.overflow = "";
}

openModel.addEventListener("click", openModal);
closeModel.addEventListener("click", closeModal);
closeModelBtn.addEventListener("click", closeModal);
closeModelBottom.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
