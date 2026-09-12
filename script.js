// Dynamic Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = themeBtn.querySelector('i');

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
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
function reveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
reveal();

// 3D Tilt Effect for Glass Panels
const tiltElements = document.querySelectorAll('.tilt');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// UPGRADED: 3D Interactive Canvas Animation
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

// Track mouse for interactive particles
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

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
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
    }
    update() {
        // Mouse Repulsion Effect
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Updated color to match the new Cyan/Blue theme
        ctx.fillStyle = html.getAttribute('data-theme') === 'light' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
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
                const isLight = html.getAttribute('data-theme') === 'light';
                const opacity = 1 - (distance / 150);
                // Lines matched to new theme
                ctx.strokeStyle = isLight ? `rgba(15, 23, 42, ${opacity * 0.25})` : `rgba(56, 189, 248, ${opacity * 0.25})`;
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

themeBtn.addEventListener('click', () => {
    setTimeout(initParticles, 100);
});
