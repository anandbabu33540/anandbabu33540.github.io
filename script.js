/* =========================================================================
   ANAND BABU — PORTFOLIO
   script.js

   Table of contents:
   1. Editable content — social links, education, skills, projects, journey
   2. Utility helpers
   3. Animated background (canvas particles — abstract, no 3D model)
   4. DOM content population
   5. UI interactions — nav, scroll spy, reveal, back-to-top
   6. Contact form validation
   ========================================================================= */

/* ==========================================================================
   1. EDITABLE CONTENT
   Everything below is the single place to update personal details, links,
   and the content of each data-driven section.
   ========================================================================== */
const SOCIAL_LINKS = {
  email: 'anandbabu00125@gmail.com',
  github: 'https://github.com/your-github-username',   // TODO: replace with your GitHub profile
  linkedin: 'https://linkedin.com/in/your-linkedin-username', // TODO: replace with your LinkedIn profile
};

const EDUCATION = [
  {
    institute: 'University of Lucknow',
    program: 'B.Tech in Computer Science and Engineering with Artificial Intelligence',
    years: '2026 – Present',
    status: 'Currently pursuing',
  },
  {
    institute: 'Indian Institute of Technology Madras',
    program: 'BS in Data Science and Applications',
    years: '2026 – Present',
    status: 'Currently pursuing',
  },
];

const SKILLS = [
  { name: 'HTML', status: 'Practicing' },
  { name: 'CSS', status: 'Practicing' },
  { name: 'JavaScript', status: 'Learning' },
  { name: 'Python', status: 'Learning' },
];

const PROJECTS = [
  {
    title: 'CleanCity AI',
    description: 'CleanCity AI is a project focused on using technology to support cleaner and smarter cities. It explores how AI and digital tools can help address urban cleanliness-related problems and support better civic management.',
    github: 'https://github.com/your-github-username/cleancity-ai', // TODO: replace with the real repo link
    demo: '#', // TODO: replace with a live demo link, or remove the button if none exists
  },
];

const LEARNING_JOURNEY = [
  'Started learning programming fundamentals',
  'Practiced HTML and CSS',
  'Started learning JavaScript',
  'Started learning Python',
  'Built my first project, CleanCity AI',
  'Started exploring AI and data science through academic programs',
  'Currently improving coding and project-building skills',
];

const EXPLORING = [
  'JavaScript fundamentals',
  'Python programming',
  'Web development',
  'Artificial Intelligence',
  'Data Science',
  'Git and GitHub',
  'Better UI/UX design',
];

/* ==========================================================================
   2. UTILITY HELPERS
   ========================================================================== */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   3. ANIMATED BACKGROUND
   A lightweight canvas particle field with soft connecting lines — an
   abstract effect, not a substitute for a real 3D model. Particle count
   is reduced on small screens and the animation is skipped entirely for
   users who prefer reduced motion.
   ========================================================================== */
const canvas = $('#bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createParticles() {
  const count = window.innerWidth < 768 ? 45 : 90;
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.6 + 0.6,
  }));
}

function stepParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(140, 200, 255, 0.55)';
    ctx.fill();
  });

  // Connect nearby particles with faint lines for a "network / grid" feel
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(76, 201, 240, ${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  if (!prefersReducedMotion) {
    requestAnimationFrame(stepParticles);
  }
}

resizeCanvas();
createParticles();
// stepParticles() draws one frame and only re-queues itself via requestAnimationFrame
// when the user has not requested reduced motion, so this single call covers both cases.
stepParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

/* ==========================================================================
   4. DOM CONTENT POPULATION
   ========================================================================== */
function renderEducation() {
  const grid = $('#education-grid');
  grid.innerHTML = EDUCATION.map((e) => `
    <div class="education-card reveal">
      <span class="education-card__badge">
        <span class="education-card__badge-dot"></span> ${e.status}
      </span>
      <h3 class="education-card__institute">${e.institute}</h3>
      <p class="education-card__program">${e.program}</p>
      <p class="education-card__years">${e.years}</p>
    </div>
  `).join('');
}

function renderSkills() {
  const grid = $('#skills-grid');
  grid.innerHTML = SKILLS.map((s) => `
    <div class="skill-card reveal">
      <p class="skill-card__name">${s.name}</p>
      <span class="skill-card__status">${s.status}</span>
    </div>
  `).join('');
}

function renderProjects() {
  const grid = $('#projects-grid');
  grid.innerHTML = PROJECTS.map((p) => `
    <article class="project-card reveal">
      <div class="project-card__inner">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__actions">
          <a class="btn btn--outline" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
          <a class="btn btn--primary" href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>
        </div>
        <p class="project-card__hint">Links are placeholders — update them in the PROJECTS array in script.js.</p>
      </div>
    </article>
  `).join('');
}

function renderJourney() {
  const timeline = $('#journey-timeline');
  timeline.innerHTML = LEARNING_JOURNEY.map((step) => `
    <div class="timeline-item reveal">
      <p class="timeline-item__text">${step}</p>
    </div>
  `).join('');
}

function renderExploring() {
  const grid = $('#exploring-grid');
  grid.innerHTML = EXPLORING.map((item) => `
    <div class="exploring-card reveal">
      <span class="exploring-card__icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
      </span>
      <span class="exploring-card__label">${item}</span>
    </div>
  `).join('');
}

function applySocialLinks() {
  $$('.contact__links a')[0]?.setAttribute('href', SOCIAL_LINKS.github);
  $$('.contact__links a')[1]?.setAttribute('href', SOCIAL_LINKS.linkedin);
}

renderEducation();
renderSkills();
renderProjects();
renderJourney();
renderExploring();
applySocialLinks();

/* ==========================================================================
   5. UI INTERACTIONS
   ========================================================================== */

/* ---- Footer year ---- */
$('#footer-year').textContent = new Date().getFullYear();

/* ---- Mobile nav toggle ---- */
const navToggle = $('#nav-toggle');
const navLinks = $('#nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
$$('[data-nav]').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---- Hide nav on scroll down, show on scroll up ---- */
const navEl = $('#nav');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 120) {
    navEl.classList.add('nav--hidden');
  } else {
    navEl.classList.remove('nav--hidden');
  }
  lastScrollY = currentY;
}, { passive: true });

/* ---- Scroll-spy: highlight active nav link ---- */
const sections = $$('.section[id]');
const navLinkMap = new Map($$('.nav__link').map((a) => [a.getAttribute('href').slice(1), a]));

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = navLinkMap.get(entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinkMap.forEach((l) => l.classList.remove('active-link'));
      link.classList.add('active-link');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => spyObserver.observe(section));

/* ---- Scroll reveal animations ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveals() {
  $$('.reveal').forEach((el) => revealObserver.observe(el));
}
if (prefersReducedMotion) {
  $$('.reveal').forEach((el) => el.classList.add('is-visible'));
} else {
  observeReveals();
}

/* ---- Back to top button ---- */
const backToTopBtn = $('#back-to-top');
backToTopBtn.hidden = false;
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('is-visible', window.scrollY > 480);
}, { passive: true });
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

/* ==========================================================================
   6. CONTACT FORM VALIDATION
   Front-end only — see README.md for connecting this to Formspree/EmailJS.
   ========================================================================== */
const contactForm = $('#contact-form');
const contactNote = $('#contact-note');

const VALIDATORS = {
  name: (value) => (value.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'),
  email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.'),
  message: (value) => (value.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'),
};

function validateField(input) {
  const field = input.closest('.field');
  const errorEl = field.querySelector('.field__error');
  const message = VALIDATORS[input.name](input.value);
  field.classList.toggle('has-error', Boolean(message));
  errorEl.textContent = message;
  return !message;
}

['name', 'email', 'message'].forEach((fieldName) => {
  const input = contactForm.elements[fieldName];
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.closest('.field').classList.contains('has-error')) {
      validateField(input);
    }
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = ['name', 'email', 'message'].map((name) => contactForm.elements[name]);
  const allValid = fields.map(validateField).every(Boolean);
  if (!allValid) return;

  contactNote.textContent =
    'This demo form does not send messages yet. Connect it to Formspree or EmailJS ' +
    '(see README.md) so submissions actually reach your inbox.';
  contactNote.style.color = 'var(--accent-cyan)';
  contactForm.reset();
  fields.forEach((f) => f.closest('.field').classList.remove('has-error'));
});
