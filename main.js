// ════════════════════════════════════════
//  AURA — main.js  (fixed & improved)
// ════════════════════════════════════════

// ── Theme toggle ──────────────────────
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('aura-theme', isLight ? 'light' : 'dark');
  syncAllKnobs();
}

function syncAllKnobs() {
  const isLight = document.documentElement.classList.contains('light');
  document.querySelectorAll('.theme-knob-sync').forEach(el => {
    el.style.transform = isLight ? 'translateX(20px)' : '';
  });
}

(function () {
  const saved = localStorage.getItem('aura-theme');
  if (saved === 'light') document.documentElement.classList.add('light');
  syncAllKnobs();
})();

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// ── Navbar scroll glass ───────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar')
    .classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile menu ───────────────────────
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.getElementById('bar2').style.opacity  = menuOpen ? '0' : '1';
  document.getElementById('bar1').style.transform = menuOpen ? 'rotate(45deg) translate(4px,4px)' : '';
  document.getElementById('bar3').style.transform = menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : '';
});

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  document.getElementById('bar2').style.opacity  = '1';
  document.getElementById('bar1').style.transform = '';
  document.getElementById('bar3').style.transform = '';
}

// ── Scroll Reveal ─────────────────────
// FIX: immediately show elements already in viewport;
//      only use IntersectionObserver for below-fold elements.
function revealNow(el) { el.classList.add('visible'); }

function initReveal() {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        revealNow(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    // If already visible in viewport → show immediately
    if (rect.top < window.innerHeight - 10) {
      // Small timeout so CSS transition has time to register
      setTimeout(() => revealNow(el), 50);
    } else {
      observer.observe(el);
    }
  });
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}

// ── Smooth anchor scroll ──────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ── Form submission ───────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const btn  = form.querySelector('button[type="submit"]');
  btn.innerHTML = '<span>Sending…</span>';
  btn.disabled  = true;

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
  .then(res => {
    if (res.ok) {
      form.classList.add('hidden');
      document.getElementById('form-success').classList.remove('hidden');
    } else {
      btn.innerHTML = '<span>Reserve My AURA →</span>';
      btn.disabled  = false;
    }
  })
  .catch(() => {
    btn.innerHTML = '<span>Reserve My AURA →</span>';
    btn.disabled  = false;
  });
}

// ── Chatbot ───────────────────────────
let chatOpen    = false;
let chatHistory = [];

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-window').classList.toggle('open', chatOpen);
}

const systemPrompt = `You are the AURA smartwatch assistant — warm, concise, elegant.
Models: Classic $299 (titanium/sapphire), Prestige $499 (gold ceramic/leather) — bestseller, Sport $349 (polymer/IP68).
Features: 18-day battery, ECG+SpO₂, AMOLED, AI health engine, 50m water-resistance, sleep tracking.
Team: Layla Harmon CEO (ex-Apple), Marcus Veil CTO (ex-DeepMind), Priya Nair (cardiologist), Julien Morel (ex-Cartier).
Help users pick a model and encourage the waitlist.`;

async function sendChat() {
  const input = document.getElementById('chat-input');
  const msg   = input.value.trim();
  if (!msg) return;

  input.value = '';
  appendMessage(msg, 'user');
  chatHistory.push({ role: 'user', content: msg });

  document.getElementById('typing-indicator').classList.remove('hidden');
  scrollChat();

  try {
    const res  = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer gsk_demo' },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt }, ...chatHistory],
        max_tokens: 300,
        temperature: 0.7
      })
    });
    const data = await res.json();
    document.getElementById('typing-indicator').classList.add('hidden');

    if (data.choices?.[0]) {
      const reply = data.choices[0].message.content;
      chatHistory.push({ role: 'assistant', content: reply });
      appendMessage(reply, 'bot');
    } else throw new Error('no reply');

  } catch {
    document.getElementById('typing-indicator').classList.add('hidden');
    const fallbacks = {
      battery: 'AURA runs up to 18 days on a single charge! ⚡',
      price:   'Starts at $299 (Classic), $349 (Sport), $499 (Prestige). Early orders get free engraving! ✦',
      water:   'All models are IP68 rated. Sport goes 50m deep — perfect for swimming. 🌊',
      health:  'AURA monitors ECG, SpO₂, HRV, stress & full sleep architecture — 2,400 data points/hr. 🫀',
      order:   'Scroll up to the waitlist form! First 500 orders get free engraving + leather strap. ✨',
    };
    const lower = msg.toLowerCase();
    let reply   = "Ask me about features, pricing, battery, or how to order — I'm here to help!";
    for (const [key, val] of Object.entries(fallbacks)) {
      if (lower.includes(key)) { reply = val; break; }
    }
    chatHistory.push({ role: 'assistant', content: reply });
    appendMessage(reply, 'bot');
  }
}

function appendMessage(text, role) {
  const c   = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className   = `chat-msg ${role}`;
  div.textContent = text;
  c.appendChild(div);
  scrollChat();
}

function scrollChat() {
  const c = document.getElementById('chat-messages');
  setTimeout(() => { c.scrollTop = c.scrollHeight; }, 50);
}
