<<<<<<< HEAD
# AURA — The Intelligent Timepiece
### Landing Page

A premium product landing page for the AURA AI-powered smartwatch.

---

## 🛠 Tech Stack

- **HTML5** — semantic structure
- **Tailwind CSS** via CDN — utility-first styling
- **Framer Motion** via CDN — animation library loaded
- **Shadcn-inspired components** — glass cards, inputs, buttons with consistent design tokens
- **Vanilla JS** — scroll reveal, mobile menu, navbar effects
- **Formspree** — functional contact/waitlist form
- **Groq API (llama3-8b-8192)** — functional AI chatbot widget

---

## 📄 Sections

1. **Navbar** — fixed, blur-on-scroll, mobile hamburger menu
2. **Hero** — animated watch SVG, stats, floating badges, orbit rings
3. **Product** — 3 product variants (Classic, Prestige, Sport)
4. **Features** — 6 feature cards with sticky heading
5. **Marquee Strip** — animated scrolling product attributes
6. **Team** — 4 team members with hover overlays
7. **Contact** — Formspree-powered waitlist form
8. **Footer** — links, social icons, brand copy

---

## 🚀 Deploy on Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Clone / place files in a folder
# 3. Run
vercel --prod
```

Or just drag-and-drop the folder to [vercel.com/new](https://vercel.com/new).

---

## 🚀 Deploy on GitHub Pages

1. Create a GitHub repo
2. Push this folder's contents to the repo root
3. Go to **Settings → Pages → Deploy from branch → main → / (root)**
4. Your site will be live at `https://yourusername.github.io/repo-name/`

---

## 🤖 Chatbot Setup (Groq API)

1. Get a free API key at [console.groq.com](https://console.groq.com)
2. In `index.html`, find:
   ```js
   const GROQ_API_KEY = 'gsk_demo';
   ```
3. Replace `'gsk_demo'` with your actual Groq API key
4. The chatbot uses **llama3-8b-8192** model and has a built-in fallback for when the key isn't set

---

## 📬 Form Setup (Formspree)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. In `index.html`, find:
   ```html
   action="https://formspree.io/f/xpwzjwao"
   ```
4. Replace with your own form endpoint

---

## 🎨 Design

- **Aesthetic**: Luxury dark / editorial — obsidian backgrounds, ember gold accents
- **Fonts**: Cormorant Garamond (display) + DM Mono (labels) + Outfit (body)
- **Colors**: Obsidian `#0a0a0f`, Ember `#c8a96e`, Gold `#e8c97e`, Champagne `#f0dfa8`
- **Animations**: Float, shimmer, scroll-reveal with stagger, marquee strip
=======
# Aura-watch-landing
>>>>>>> 4ff5fde9bb091d22104f7cbbd21cb9adcde5206b
