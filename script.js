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
     Scroll Animations
  ========================== */
  const animationObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-item, .about-content');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    animationObserver.observe(el);
  });

  // Add slide animations to about section
  const aboutImage = document.querySelector('.about-image');
  const aboutText = document.querySelector('.about-text');
  if (aboutImage) {
    aboutImage.classList.add('slide-in-left');
    animationObserver.observe(aboutImage);
  }
  if (aboutText) {
    aboutText.classList.add('slide-in-right');
    animationObserver.observe(aboutText);
  }

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
     Parallax (subtle) - Optimized with requestAnimationFrame
  ========================== */
  let ticking = false;
  const skillCategories = document.querySelectorAll('.skill-category');
  const photo = document.querySelector('.photo-frame');
  
  function updateParallax() {
    // Disable parallax on mobile devices and for skill categories to prevent overlap
    if (window.innerWidth <= 768) {
      ticking = false;
      return;
    }
    
    const scrolled = window.pageYOffset;
    
    // Disable parallax for skill categories to prevent overlap issues
    // Only animate photo if it exists
    if (photo) {
      const rect = photo.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        photo.style.transform = `translateY(${scrolled * -0.1}px)`;
      }
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

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
      const isExpanded = burgerMenu.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
      // Update aria-expanded for accessibility
      burgerMenu.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
    navLinksContainer.querySelectorAll('.nav-link').forEach(a =>
      a.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinksContainer.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
      })
    );
    document.addEventListener('click', e => {
      if (!burgerMenu.contains(e.target) && !navLinksContainer.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navLinksContainer.classList.remove('active');
        burgerMenu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =========================
     Update Footer Year Dynamically
  ========================== */
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  /* =========================
     Back to Top Button
  ========================== */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop(); // Check initial state

    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* =========================
     Contact form with EmailJS integration
  ========================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Initialize EmailJS (replace with your public key)
    // Get your public key from: https://dashboard.emailjs.com/admin/integration
    emailjs.init('Rbu8KlNbu2aAb69b-'); // TODO: Replace with your EmailJS public key

    const get = id => document.getElementById(id);
    const submitBtn = get('submitBtn');
    
    const showError = (id, msg) => {
      const el = get(id);
      if (el) {
        el.textContent = msg;
        el.classList.add('show');
      }
    };
    
    const showSuccess = (msg) => {
      const success = get('formSuccess');
      if (success) {
        success.textContent = msg;
        success.classList.add('show');
        setTimeout(() => {
          success.classList.remove('show');
        }, 5000);
      }
    };
    
    const clearErrors = () => {
      contactForm.querySelectorAll('.error-message').forEach(e => {
        e.textContent = '';
        e.classList.remove('show');
      });
      contactForm.querySelectorAll('.form-input, .form-textarea').forEach(i => i.classList.remove('error'));
    };

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      clearErrors();
      
      const name = get('name')?.value.trim() || '';
      const email = get('email')?.value.trim() || '';
      const message = get('message')?.value.trim() || '';

      // Validation
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

      if (!ok) return;

      // Disable submit button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      }

      try {
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS service and template IDs
        // Get these from: https://dashboard.emailjs.com/admin
        const response = await emailjs.send(
          'service_382hiu5',  // TODO: Replace with your EmailJS service ID
          'template_cbx78qh', // TODO: Replace with your EmailJS template ID
          {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Anagha Namasevi'
          }
        );

        if (response.status === 200) {
          showSuccess('Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
          contactForm.reset();
        }
      } catch (error) {
        console.error('EmailJS Error:', error);
        showError('messageError', 'Sorry, there was an error sending your message. Please try again or email me directly at namasevi.anagha@gmail.com');
      } finally {
        // Re-enable submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      }
    });
  }

  /* =========================
     Enhanced Particle Background System
  ========================== */
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: -9999, y: -9999 };
      this.animationId = null;
      this.time = 0;
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
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;
      this.ctx.scale(dpr, dpr);
    }

    createParticles() {
      const count = window.innerWidth < 768 ? 50 : 100;
      this.particles = [];
      const w = this.canvas.getBoundingClientRect().width;
      const h = this.canvas.getBoundingClientRect().height;
      
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.3,
          hue: Math.random() * 60 + 200,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          amplitude: Math.random() * 80 + 30,
          frequency: Math.random() * 0.03 + 0.02,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01
        });
      }
    }

    updateParticles() {
      this.time += 0.02;
      const rect = this.canvas.getBoundingClientRect();
      
      this.particles.forEach((p, index) => {
        // Continuous movement with velocity
        p.x += p.vx;
        p.y += p.vy;
        
        // Add floating motion
        p.x += Math.sin(this.time * p.frequency + index) * 0.5;
        p.y += Math.cos(this.time * p.frequency + index) * 0.5;
        
        // Keep particles in bounds with wrap-around
        if (p.x < -50) p.x = rect.width + 50;
        if (p.x > rect.width + 50) p.x = -50;
        if (p.y < -50) p.y = rect.height + 50;
        if (p.y > rect.height + 50) p.y = -50;

        // Mouse interaction with enhanced effect
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.1;
          p.vy += Math.sin(angle) * force * 0.1;
        }

        // Add some randomness to movement
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
        
        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Pulsing opacity and size
        p.opacity = 0.2 + Math.sin(this.time * 3 + index) * 0.4;
        p.size = 1 + Math.sin(this.time * 2 + index) * 0.5;
      });
    }

    drawParticles() {
      const rect = this.canvas.getBoundingClientRect();
      this.ctx.clearRect(0, 0, rect.width, rect.height);

      // Enhanced connections with gradient
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const d = Math.hypot(dx, dy);
          
          if (d < 120) {
            const opacity = (120 - d) / 120 * 0.2;
            this.ctx.strokeStyle = `rgba(26, 26, 46, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
            this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
            this.ctx.stroke();
          }
        }
      }

      // Enhanced particles with modern architect vibe
      this.particles.forEach(p => {
        this.ctx.save();
        
        // Outer glow with navy color
        this.ctx.shadowColor = `rgba(26, 26, 46, ${p.opacity * 0.3})`;
        this.ctx.shadowBlur = 8;
        this.ctx.fillStyle = `rgba(26, 26, 46, ${p.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner particle with gold accent
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = `rgba(201, 162, 39, ${p.opacity * 0.8})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
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
     Init Enhanced Particles
  ========================== */
  let particleSystem = null;
  const canvas = document.getElementById('particlesCanvas');
  
  if (canvas) {
    // Initialize particles immediately for hero section
    particleSystem = new ParticleSystem(canvas);
  }

  // Manage particle lifecycle based on hero section visibility
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
