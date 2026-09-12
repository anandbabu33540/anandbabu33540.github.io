# Anand Babu — Portfolio

A framework-free, responsive personal portfolio built with plain **HTML, CSS, and JavaScript**.
No React, no build step, no backend — open it in a browser or deploy as static files.

All content is honest and editable: two ongoing academic programs (no invented CGPA, awards, or
completion dates), a real skill list with plain status labels instead of fake percentages, and a
single real project.

---

## File structure

```
portfolio/
│
├── index.html
├── style.css
├── script.js
├── assets/
│   └── images/        ← put a profile photo or project screenshots here
└── README.md
```

---

## 1. Running it locally

This site uses plain scripts (no ES module imports), so you can open `index.html` directly in a
browser by double-clicking it — no server required. If you'd prefer a local server (useful for
testing on other devices on your network):

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 2. Replacing social links

Open `script.js` and edit the `SOCIAL_LINKS` object near the top of the file:

```js
const SOCIAL_LINKS = {
  email: 'anandbabu00125@gmail.com',
  github: 'https://github.com/your-github-username',
  linkedin: 'https://linkedin.com/in/your-linkedin-username',
};
```

These values are applied automatically to the Contact section links.

---

## 3. Adding more projects

Still in `script.js`, add new objects to the `PROJECTS` array:

```js
const PROJECTS = [
  {
    title: 'CleanCity AI',
    description: '...',
    github: 'https://github.com/your-github-username/cleancity-ai',
    demo: '#',
  },
  {
    title: 'Your New Project',
    description: 'A short, honest description of what it actually does.',
    github: 'https://github.com/your-github-username/your-project',
    demo: 'https://your-demo-link.example.com',
  },
];
```

The Projects section re-renders automatically from this array — no HTML editing needed.

---

## 4. Adding a profile photo

1. Place your photo in `assets/images/` (e.g. `assets/images/profile.jpg`).
2. In `index.html`, add an `<img>` tag wherever you'd like it to appear — for example, inside the
   `.hero__content` block or the About section:
   ```html
   <img src="assets/images/profile.jpg" alt="Anand Babu" class="profile-photo" />
   ```
3. Optionally style it in `style.css`, e.g.:
   ```css
   .profile-photo {
     width: 160px;
     height: 160px;
     border-radius: 50%;
     object-fit: cover;
     border: 1px solid var(--line);
   }
   ```

---

## 5. Connecting the contact form

The contact form validates input in the browser but does **not** send real emails until you
connect it to a form service. Two easy, no-backend options:

### Option A — Formspree
1. Create a free form at [formspree.io](https://formspree.io/).
2. In `index.html`, update the form tag:
   ```html
   <form class="contact__form glass-card reveal" id="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
   ```
3. Formspree will handle delivery once the form posts to that endpoint. You can keep client-side
   validation as-is; just remove or adjust the `e.preventDefault()` call in `script.js` if you
   want the default redirect-based flow, or follow Formspree's AJAX docs for a single-page feel.

### Option B — EmailJS
1. Create an account at [emailjs.com](https://www.emailjs.com/) and set up an email service +
   template.
2. Add the EmailJS SDK via CDN in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```
3. In the `contactForm.addEventListener('submit', ...)` handler in `script.js`, call:
   ```js
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm, 'YOUR_PUBLIC_KEY');
   ```
   after validation passes, in place of the current placeholder note.

---

## 6. Deploying to Cloudflare Pages

1. Push this folder to a GitHub (or GitLab) repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select your repository.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or `portfolio` if it's a subfolder of the repo)
5. Click **Save and Deploy** — no build step is needed for static files.

---

## 7. Deploying to GitHub Pages

1. Push this folder to a GitHub repository (with `index.html` at the repo root, or the folder you
   configure below).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Pick your branch (e.g. `main`) and folder (`/root` or `/docs`).
5. Save — GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.

---

## Editable content reference

| What | Where |
|---|---|
| Name, headline, hero text | `index.html` → `.hero__content` |
| About paragraph | `index.html` → `.about__card` |
| Education entries | `script.js` → `EDUCATION` array |
| Skills + status labels | `script.js` → `SKILLS` array |
| Projects | `script.js` → `PROJECTS` array |
| Learning journey milestones | `script.js` → `LEARNING_JOURNEY` array |
| Currently exploring topics | `script.js` → `EXPLORING` array |
| Email / GitHub / LinkedIn | `script.js` → `SOCIAL_LINKS` object |

## Notes on honesty and content

- Both academic programs are labeled **"Currently pursuing"** with **"2026 – Present"** — nothing
  implies graduation, a CGPA, or an award that hasn't been earned.
- Skills use plain status words (**Learning / Practicing / Building**) instead of invented
  percentage scores.
- The one listed project describes only what was provided — no fabricated tech stack, dataset,
  or user numbers. GitHub/demo links are placeholders clearly marked `TODO` in `script.js` until
  replaced with real URLs.

## Accessibility & performance

- Respects `prefers-reduced-motion`: disables the particle animation loop, scroll-reveal
  transitions, and smooth scrolling for users who request it.
- All interactive elements are keyboard-focusable with visible focus rings.
- The background particle system is a lightweight `<canvas>` effect (not a 3D model or heavy
  library) and reduces its particle count on small screens.
