const cursor = document.getElementById('cursor');
const cursorColors = ['#ff6bb5', '#9b5cff', '#00d4aa', '#ffe145', '#4facff'];
let colorIndex = 0;

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '24px';
    cursor.style.height = '24px';
    cursor.style.background = cursorColors[colorIndex++ % cursorColors.length];
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + current;
    a.style.color      = isActive ? 'var(--ink)' : '';
    a.style.fontWeight = isActive ? '700' : '';
  });
});


function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('theme-btn');
  const isDark = html.dataset.theme === 'dark';

  if (isDark) {
    html.removeAttribute('data-theme');
    btn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    html.dataset.theme = 'dark';
    btn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

(function () {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('theme-btn');
      if (btn) btn.textContent = '☀️';
    });
  }
})();