// Custom cursor logic
const cursor = document.getElementById('cursor');
const colors = ['#ff6bb5', '#9b5cff', '#00d4aa', '#ffe145', '#4facff'];
let ci = 0;

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.background = colors[ci++ % colors.length];
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
    });
});

// Scroll animations using Intersection Observer
const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 90);
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 140) {
            cur = s.getAttribute('id');
        }
    });

    navLinks.forEach((a) => {
        const active = a.getAttribute('href') === '#' + cur;
        a.style.color = active ? 'var(--ink)' : '';
        a.style.fontWeight = active ? '700' : '';
    });
});