/* ============================================================
   श्री गणेश मंडळ - Main JavaScript
   Pure JS | No Libraries
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR - Scroll effect + Active link highlight
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function handleNavScroll() {
    // Add scrolled class when scrolled
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight active nav link based on scroll position
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleNavScroll);
window.addEventListener('load', handleNavScroll);

/* ============================================================
   2. HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

function toggleMenu() {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
    const isOpen = navLinksContainer.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// Close menu on window resize (desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
        document.body.style.overflow = '';
    }
});

/* ============================================================
   3. COUNTDOWN TIMER
   ============================================================ */
// Set target date: Sep 7, 2025 (adjust year automatically)
let targetDate = new Date('2025-09-07T00:00:00');

// If passed, push to next year
if (targetDate < new Date()) {
    targetDate = new Date(targetDate.getFullYear() + 1 + '-09-07T00:00:00');
}

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById('cdDays').textContent = '00';
        document.getElementById('cdHours').textContent = '00';
        document.getElementById('cdMins').textContent = '00';
        document.getElementById('cdSecs').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMins').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cdSecs').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================================
   4. SCROLL REVEAL
   ============================================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================================
   5. RIPPLE BUTTON EFFECT
   ============================================================ */
document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create ripple element
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 5px;
            height: 5px;
            background: rgba(255,255,255,0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        `;
        this.appendChild(ripple);

        // Animate
        requestAnimationFrame(() => {
            ripple.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(40)', opacity: 0 }
            ], { duration: 700, easing: 'ease-out' });
        });

        // Remove after animation
        setTimeout(() => ripple.remove(), 700);
    });
});

/* ============================================================
   6. CURSOR GLOW (Desktop only)
   ============================================================ */
const cursorGlow = document.getElementById('cursorGlow');

// Only enable on devices with hover capability
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follow animation
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.transform = `translate(${glowX - 150}px, ${glowY - 150}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

/* ============================================================
   7. PARTICLES (Hero background)
   ============================================================ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let particleCount = window.innerWidth < 768 ? 30 : 60;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleCount = window.innerWidth < 768 ? 30 : 60;
    initParticles();
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? '245, 201, 106' : '255, 140, 0'
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(drawParticles);
}

// Only run particles on hero visible area — but simple full-screen is fine
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawParticles();

/* ============================================================
   8. BOOK STORY - Open/Close animation
   ============================================================ */
const book = document.getElementById('book');

book.addEventListener('click', () => {
    book.classList.toggle('opened');
});

/* ============================================================
   9. GALLERY LIGHTBOX
   ============================================================ */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxEmoji = document.querySelector('.lightbox-emoji');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const caption = item.getAttribute('data-caption');
        lightboxCaption.textContent = caption;
        lightboxEmoji.textContent = item.querySelector('.gallery-emoji').textContent;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        if (navLinksContainer.classList.contains('open')) {
            toggleMenu();
        }
    }
});

/* ============================================================
   10. UPI DONATION BUTTON
   ============================================================ */
const upiBtn = document.getElementById('upiBtn');

upiBtn.addEventListener('click', () => {
    // UPI payment link (replace with actual UPI ID)
    const upiId = 'ganeshmandal@upi';
    const upiUrl = `upi://pay?pa=${upiId}&pn=Shree%20Ganesh%20Mandal&cu=INR`;
    window.location.href = upiUrl;
});

/* ============================================================
   11. CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !message) {
        alert('कृपया सर्व माहिती भरा.');
        return;
    }

    // Simple feedback (replace with actual backend)
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<span>✓ संदेश पाठवला!</span>';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #2E7D32)';

    contactForm.reset();
    setTimeout(() => {
        btn.innerHTML = '<span>संदेश पाठवा</span><span class="btn-icon">➤</span>';
        btn.style.background = '';
    }, 3000);
});

/* ============================================================
   12. SPONSOR AUTO-SCROLL (Pause on hover handled in CSS)
   ============================================================ */
// The infinite scroll is handled purely via CSS animation.
// Script optional: could duplicate content dynamically.
console.log('श्री गणेश मंडळ वेबसाईट लोड झाली! गणपती बाप्पा मोरया!');
