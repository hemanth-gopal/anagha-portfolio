// script.js — consolidated & fixed

document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     NAV: smooth scroll + active link
  ========================== */
  const navLinksAll = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  navLinksAll.forEach(link => {
    link.addEventListener('click', e => {
      // only smooth-scroll for in-page hashes
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          const y = el.offsetTop - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  function updateActiveNavLink() {
    const y = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const h = section.offsetHeight;
      const id = section.id;
      if (y >= top && y < top + h) {
        navLinksAll.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // minimal active styles (keeps CSS file clean)
  const activeStyle = document.createElement('style');
  activeStyle.textContent = `
    .nav-link.active { color:#3498db; }
    .nav-link.active::after { width:100%; }
  `;
  document.head.appendChild(activeStyle);

  /* =========================
     NAVBAR style on scroll
  ========================== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScrollNav = () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
      } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = 'none';
      }
    };
    window.addEventListener('scroll', onScrollNav);
    onScrollNav();
  }

  /* =========================
     Reveal-on-scroll & skill card stagger
  ========================== */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        if (entry.target.classList.contains('skill-category')) {
          const items = entry.target.querySelectorAll('.skill-item');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, i * 100);
          });
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach(cat => {
    const items = cat.querySelectorAll('.skill-item');
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity .5s ease, transform .5s ease';
    });
    revealObserver.observe(cat);
  });

  /* =========================
     Hover/click micro-interactions
  ========================== */
  const skillItemsAll = document.querySelectorAll('.skill-item');

  skillItemsAll.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Ripple for buttons + skill items
  const interactiveEls = document.querySelectorAll('.skill-item, .btn');
  const rippleCSS = document.createElement('style');
  rippleCSS.textContent = `
    .skill-item, .btn { position:relative; overflow:hidden; }
    .ripple {
      position:absolute; border-radius:50%; background:rgba(52,152,219,.3);
      transform:scale(0); animation:ripple-key 0.6s linear; pointer-events:none;
    }
    @keyframes ripple-key { to { transform:scale(4); opacity:0; } }
  `;
  document.head.appendChild(rippleCSS);

  interactiveEls.forEach(el =>
    el.addEventListener('click', e => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const span = document.createElement('span');
      span.className = 'ripple';
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      el.appendChild(span);
      setTimeout(() => span.remove(), 600);
    })
  );

  /* =========================
     Parallax (subtle)
  ========================== */
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    skillCategories.forEach((cat, i) => {
      cat.style.transform = `translateY(${scrolled * -0.05 * (i + 1)}px)`;
    });
    const photo = document.querySelector('.photo-frame');
    if (photo) photo.style.transform = `translateY(${scrolled * -0.1}px)`;
  });

  /* =========================
     Typing effect for name
  ========================== */
  const nameEl = document.querySelector('.name');
  if (nameEl) {
    const original = nameEl.textContent;
    nameEl.textContent = '';
    let i = 0;
    const type = () => {
      if (i < original.length) {
        nameEl.textContent += original.charAt(i++);
        setTimeout(type, 100);
      }
    };
    setTimeout(type, 500);
  }

  /* =========================
     Skill level data-attributes
     (fixed parenthesis bug)
  ========================== */
  function addSkillLevels() {
    const tech = document.querySelectorAll('.skill-category.technical .skill-item');
    const mgmt = document.querySelectorAll('.skill-category.management .skill-item');
    const soft = document.querySelectorAll('.skill-category.soft .skill-item');

    tech.forEach((el, i) => {
      const level = Math.min(90, 70 + i * 5);
      el.setAttribute('data-level', String(level));
    });

    // FIX: closing parenthesis added below
    mgmt.forEach((el, i) => {
      const level = Math.min(95, 75 + i * 4); // <-- fixed
      el.setAttribute('data-level', String(level));
    });

    soft.forEach((el, i) => {
      const level = Math.min(100, 80 + i * 5);
      el.setAttribute('data-level', String(level));
    });
  }
  addSkillLevels(); // initializes data-levels

  // tooltips + a11y keyboard click
  skillItemsAll.forEach((item, idx) => {
    const label = (item.querySelector('.skill-name')?.textContent || 'skill').trim();
    item.setAttribute('title', `Click to learn more about ${label}`);
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  /* =========================
     Section reveal baseline
  ========================== */
  const sectionRevealObserver = new IntersectionObserver(
    entries => entries.forEach(en => en.isIntersecting && en.target.classList.add('revealed')),
    { threshold: 0.1 }
  );
  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(50px)';
    s.style.transition = 'opacity .8s ease, transform .8s ease';
    sectionRevealObserver.observe(s);
  });
  const revealCSS = document.createElement('style');
  revealCSS.textContent = `.revealed{opacity:1!important;transform:translateY(0)!important;}`;
  document.head.appendChild(revealCSS);

  /* =========================
     Mobile menu (burger)
  ========================== */
  const burgerMenu = document.getElementById('burgerMenu');
  const navLinksContainer = document.getElementById('navLinks');

  if (burgerMenu && navLinksContainer) {
    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });
    navLinksContainer.querySelectorAll('.nav-link').forEach(a =>
      a.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinksContainer.classList.remove('active');
      })
    );
    document.addEventListener('click', e => {
      if (!burgerMenu.contains(e.target) && !navLinksContainer.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navLinksContainer.classList.remove('active');
      }
    });
  }

  /* =========================
     Contact form validation (optional)
  ========================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const get = id => document.getElementById(id);
    const showError = (id, msg) => {
      const el = get(id);
      if (el) {
        el.textContent = msg;
        el.classList.add('show');
      }
    };
    const clearErrors = () => {
      contactForm.querySelectorAll('.error-message').forEach(e => {
        e.textContent = '';
        e.classList.remove('show');
      });
      contactForm.querySelectorAll('.form-input, .form-textarea').forEach(i => i.classList.remove('error'));
    };

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      clearErrors();
      const name = get('name')?.value.trim() || '';
      const email = get('email')?.value.trim() || '';
      const message = get('message')?.value.trim() || '';

      let ok = true;
      if (name.length < 2) {
        ok = false;
        showError('nameError', 'Name must be at least 2 characters');
        get('name')?.classList.add('error');
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        ok = false;
        showError('emailError', 'Please enter a valid email');
        get('email')?.classList.add('error');
      }
      if (message.length < 10) {
        ok = false;
        showError('messageError', 'Message should be at least 10 characters');
        get('message')?.classList.add('error');
      }

      if (ok) {
        const success = get('formSuccess');
        if (success) {
          success.textContent = 'Thanks! Your message was validated locally.';
          success.classList.add('show');
        }
        contactForm.reset();
      }
    });
  }

  /* =========================
     Particle Background System
  ========================== */
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: -9999, y: -9999 };
      this.animationId = null;
      this._onResize = this.resizeCanvas.bind(this);
      this._onMouseMove = this.onMouseMove.bind(this);
      this._onTouchMove = this.onTouchMove.bind(this);

      this.resizeCanvas();
      this.createParticles();
      this.bindEvents();
      this.animate();
    }

    resizeCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // reset any previous scaling to avoid compounding
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;
      this.ctx.scale(dpr, dpr);
    }

    createParticles() {
      const count = window.innerWidth < 768 ? 30 : 50;
      this.particles = [];
      const w = this.canvas.getBoundingClientRect().width;
      const h = this.canvas.getBoundingClientRect().height;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.7 + 0.3,
          hue: Math.random() * 60 + 200
        });
      }
    }

    updateParticles() {
      const rect = this.canvas.getBoundingClientRect();
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // bounce
        if (p.x < 0 || p.x > rect.width) p.vx *= -1;
        if (p.y < 0 || p.y > rect.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(rect.width, p.x));
        p.y = Math.max(0, Math.min(rect.height, p.y));

        // mouse interaction
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 0.01;
          p.vy += (dy / dist) * force * 0.01;
        }

        // friction
        p.vx *= 0.99;
        p.vy *= 0.99;
      });
    }

    drawParticles() {
      const rect = this.canvas.getBoundingClientRect();
      // clear
      this.ctx.clearRect(0, 0, rect.width, rect.height);

      // connections
      this.ctx.strokeStyle = 'rgba(52,152,219,0.3)';
      this.ctx.lineWidth = 1;
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }

      // particles
      this.particles.forEach(p => {
        this.ctx.save();
        this.ctx.fillStyle = `hsla(${p.hue},70%,60%,${p.opacity})`;
        this.ctx.shadowColor = this.ctx.fillStyle;
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });
    }

    animate() {
      this.updateParticles();
      this.drawParticles();
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    }

    onMouseMove(e) {
      const r = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - r.left;
      this.mouse.y = e.clientY - r.top;
    }
    onTouchMove(e) {
      if (!e.touches?.[0]) return;
      const r = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - r.left;
      this.mouse.y = e.touches[0].clientY - r.top;
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.resizeCanvas();
        this.createParticles();
      });
      document.addEventListener('mousemove', this._onMouseMove, { passive: true });
      document.addEventListener('touchmove', this._onTouchMove, { passive: true });
    }

    destroy() {
      if (this.animationId) cancelAnimationFrame(this.animationId);
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('touchmove', this._onTouchMove);
    }
  }

  /* =========================
     Init particles
  ========================== */
  let particleSystem = null;
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    particleSystem = new ParticleSystem(canvas);
  }

  // Also manage lifecycle when #home visibility changes
  const homeSection = document.getElementById('home');
  if (homeSection) {
    const psObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!particleSystem && canvas) {
              particleSystem = new ParticleSystem(canvas);
            }
          } else {
            if (particleSystem) {
              particleSystem.destroy();
              particleSystem = null;
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    psObserver.observe(homeSection);
  }
});
