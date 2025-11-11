// script.js - Portfolio website JavaScript

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
  const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-item, .cert-card, .about-content');
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
    // Initialize EmailJS
    emailjs.init('Rbu8KlNbu2aAb69b-');

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
        const response = await emailjs.send(
          'service_382hiu5',
          'template_cbx78qh',
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

  /* =========================
     3D Certifications Carousel - Data-Driven
  ========================== */
  
  // ============================================
  // CERTIFICATIONS DATA - Easy to Update!
  // ============================================
  // To add a new certification/publication:
  // 1. Add a new object to the array below
  // 2. Fill in: title, organization, date, description, icon, badge, type
  // 3. Optional: Add a link if you have a certificate URL
  // ============================================
  
  const certificationsData = [
    {
      title: "Revit And BIM Online Certification Course",
      organization: "Online Certification",
      date: "June 2024 – May 2025",
      description: "Comprehensive online certification course covering Revit and Building Information Modeling (BIM) technologies and workflows.",
      icon: "fa-cube",
      badge: "Certified",
      type: "certification",
      link: "" // Add certificate URL here if available
    },
    {
      title: "Business Communication Skills",
      organization: "Internshala Training",
      date: "July 2020",
      description: "Professional training in business communication skills, enhancing professional interaction and presentation abilities.",
      icon: "fa-comments",
      badge: "Certified",
      type: "certification",
      link: "" // Add certificate URL here if available
    },
    {
      title: "Foundations of Digital Marketing & E-Commerce",
      organization: "Google",
      date: "Google Certification",
      description: "Google certification covering digital marketing fundamentals and e-commerce strategies.",
      icon: "fa-chart-line",
      badge: "Google Certified",
      type: "certification",
      link: "" // Add certificate URL here if available
    },
    {
      title: "Landscape Practices",
      organization: "Dr. Bhanuben Nanavati College of Architecture",
      date: "Architecture Course",
      description: "Specialized course in landscape architecture practices and design principles.",
      icon: "fa-leaf",
      badge: "Completed",
      type: "course",
      link: "" // Add course URL here if available
    },
    {
      title: "Vaastu Shastra",
      organization: "Designopolis",
      date: "Traditional Design",
      description: "Training in Vaastu Shastra principles and their application in modern architectural design.",
      icon: "fa-yin-yang",
      badge: "Certified",
      type: "certification",
      link: "" // Add certificate URL here if available
    },
    {
      title: "Research Paper – Heritage Walk at Chinchwad",
      organization: "COEP NOCPDM 2021",
      date: "2021",
      description: "Co-authored and published under COEP's NOCPDM 2021, focusing on heritage and cultural documentation. Explored urban heritage preservation strategies.",
      icon: "fa-book",
      badge: "Published",
      type: "publication",
      link: "" // Add publication URL/DOI here if available
    }
  ];

  // Color schemes (automatically cycles through)
  const colorSchemes = [
    { back: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", icon: "linear-gradient(135deg, #667eea, #764ba2)", org: "#667eea" },
    { back: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", icon: "linear-gradient(135deg, #f093fb, #f5576c)", org: "#f5576c" },
    { back: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", icon: "linear-gradient(135deg, #4facfe, #00f2fe)", org: "#4facfe" },
    { back: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", icon: "linear-gradient(135deg, #43e97b, #38f9d7)", org: "#43e97b" },
    { back: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", icon: "linear-gradient(135deg, #fa709a, #fee140)", org: "#fa709a" },
    { back: "linear-gradient(135deg, #4ECDC4 0%, #26A69A 100%)", icon: "linear-gradient(135deg, #4ECDC4, #26A69A)", org: "#4ECDC4" }
  ];

  // Generate certification cards dynamically
  const certCarousel = document.getElementById('certCarousel');
  const certPrev = document.getElementById('certPrev');
  const certNext = document.getElementById('certNext');
  const certDots = document.getElementById('certDots');

  if (certCarousel && certPrev && certNext && certDots) {
    // Generate cards from data
    certificationsData.forEach((cert, index) => {
      const colorIndex = index % colorSchemes.length;
      const colors = colorSchemes[colorIndex];
      
      const card = document.createElement('div');
      card.className = `cert-card cert-color-${colorIndex + 1}`;
      card.setAttribute('data-index', index);
      
      card.innerHTML = `
        <div class="cert-card-inner">
          <div class="cert-card-front">
            <div class="cert-icon">
              <i class="fas ${cert.icon}"></i>
            </div>
            <h3 class="cert-title">${cert.title}</h3>
            <p class="cert-org">${cert.organization}</p>
            <div class="cert-date">${cert.date}</div>
          </div>
          <div class="cert-card-back">
            <h4>${cert.type === 'publication' ? 'Publication Details' : 'Certification Details'}</h4>
            <p>${cert.description}</p>
            ${cert.link ? `<a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-link">View Certificate →</a>` : ''}
            <div class="cert-badge">${cert.badge}</div>
          </div>
        </div>
      `;
      
      // Apply dynamic colors via inline styles
      const cardBack = card.querySelector('.cert-card-back');
      const certIcon = card.querySelector('.cert-icon');
      const certOrg = card.querySelector('.cert-org');
      
      cardBack.style.background = colors.back;
      certIcon.style.background = colors.icon;
      certOrg.style.color = colors.org;
      
      certCarousel.appendChild(card);
    });
    
    // Initialize carousel after cards are generated
    initializeCarousel();
  }
  
  function initializeCarousel() {
    const certCarousel = document.getElementById('certCarousel');
    const certPrev = document.getElementById('certPrev');
    const certNext = document.getElementById('certNext');
    const certDots = document.getElementById('certDots');
    
    if (!certCarousel || !certPrev || !certNext || !certDots) return;
    
    const cards = certCarousel.querySelectorAll('.cert-card');
    if (cards.length === 0) return;
    
    // Clear existing dots if any
    certDots.innerHTML = '';
    
    let currentIndex = 0;
    
    // Calculate scroll amount dynamically
    function getScrollAmount() {
      if (cards.length === 0) return 352; // fallback
      const firstCard = cards[0];
      const cardWidth = firstCard.offsetWidth || 320;
      const gap = 32; // 2rem gap
      return cardWidth + gap;
    }
    
    let scrollAmount = getScrollAmount();
    
    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        scrollAmount = getScrollAmount();
        updateCarousel();
      }, 150);
    }, { passive: true });

    // Create dots
    cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to certification ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      certDots.appendChild(dot);
    });

    const dots = certDots.querySelectorAll('.carousel-dot');

    function updateCarousel() {
      const amount = getScrollAmount();
      certCarousel.scrollTo({
        left: currentIndex * amount,
        behavior: 'smooth'
      });
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      // Update nav buttons
      certPrev.disabled = currentIndex === 0;
      certNext.disabled = currentIndex === cards.length - 1;
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, cards.length - 1));
      updateCarousel();
    }

    function nextSlide() {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    }

    certNext.addEventListener('click', nextSlide);
    certPrev.addEventListener('click', prevSlide);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    certCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    certCarousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Keyboard navigation
    certCarousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Update on scroll (for snap scrolling)
    certCarousel.addEventListener('scroll', () => {
      const amount = getScrollAmount();
      const newIndex = Math.round(certCarousel.scrollLeft / amount);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
        currentIndex = newIndex;
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex);
        });
        certPrev.disabled = currentIndex === 0;
        certNext.disabled = currentIndex === cards.length - 1;
      }
    }, { passive: true });

    // Initialize
    updateCarousel();

    // Make cards focusable for keyboard navigation
    cards.forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Certification ${index + 1}`);
    });
  }

  /* =========================
     DATA-DRIVEN SECTIONS - Future Proof!
     ========================== */
  // Uncomment the function calls at the bottom to enable data-driven content
  // Edit the data arrays below to update Skills, Experience, and Projects
  // ============================================

  // Skills Data
  const skillsData = [
    {
      title: "Design Software",
      icon: "fa-drafting-compass",
      skills: [
        { name: "AutoCAD", icon: "fa-drafting-compass" },
        { name: "Revit", icon: "fa-cube" },
        { name: "Navisworks", icon: "fa-project-diagram" },
        { name: "SketchUp", icon: "fa-cube" },
        { name: "Lumion", icon: "fa-sun" },
        { name: "Enscape", icon: "fa-eye" },
        { name: "Dynamo", icon: "fa-cogs" },
        { name: "Photoshop", icon: "fa-paint-brush" },
        { name: "Twinmotion", icon: "fa-vr-cardboard" }
      ]
    },
    {
      title: "Project & Construction Management",
      icon: "fa-hard-hat",
      skills: [
        { name: "Construction Documentation", icon: "fa-file-alt" },
        { name: "Material Research", icon: "fa-search" },
        { name: "Compliance Checks", icon: "fa-check-circle" },
        { name: "Cost Optimization", icon: "fa-chart-line" },
        { name: "Team Leadership", icon: "fa-users" },
        { name: "Client Management", icon: "fa-handshake" }
      ]
    },
    {
      title: "Soft Skills",
      icon: "fa-heart",
      skills: [
        { name: "Collaboration", icon: "fa-users-cog" },
        { name: "Mentorship", icon: "fa-graduation-cap" },
        { name: "Problem-Solving", icon: "fa-lightbulb" },
        { name: "Communication", icon: "fa-comments" },
        { name: "Time Management", icon: "fa-clock" },
        { name: "Adaptability", icon: "fa-tasks" }
      ]
    },
    {
      title: "Languages",
      icon: "fa-globe",
      skills: [
        { name: "English", icon: "fa-flag-usa" },
        { name: "Hindi", icon: "fa-flag" },
        { name: "Marathi", icon: "fa-flag" },
        { name: "Kannada", icon: "fa-flag" },
        { name: "Sanskrit", icon: "fa-language" },
        { name: "Multilingual", icon: "fa-globe-americas" }
      ]
    }
  ];

  // Experience Data
  const experienceData = [
    {
      title: "Associate Design Lead",
      company: "Alive Design Studio",
      dates: "Jul 2021 – Mar 2024",
      location: "Pune, India",
      achievements: [
        "Managed full lifecycle of projects: design development, documentation, budgeting",
        "Increased profitability by 30% through workflow optimization",
        "Mentored junior designers, improving team efficiency",
        "Drove 45% client satisfaction increase via transparent communication"
      ]
    },
    {
      title: "Student Intern",
      company: "AVI Designs",
      dates: "Jun 2020 – Nov 2020",
      location: "Pune, India",
      achievements: [
        "Drafted technical details and 3D models supporting execution",
        "Conducted research on construction materials for specifications"
      ]
    },
    {
      title: "Part-time Student Intern",
      company: "Design9 Interiors",
      dates: "Dec 2019 – Mar 2020",
      location: "Pune, India",
      achievements: [
        "Assisted with design visualization and documentation",
        "Supported on-site coordination during construction phases"
      ]
    },
    {
      title: "Mentorship",
      company: "Mistry Architects, under Ar. Shahrukh Mistry",
      dates: "Dec 2019 – Mar 2020",
      location: "Pune, India",
      achievements: [
        "Learned sustainable and socially responsible design practices",
        "Observed professional approaches emphasizing sustainability and empathy"
      ]
    }
  ];

  // Projects Data
  const projectsData = {
    academic: [
      {
        title: "B.Arch Thesis – Craft Village",
        role: "Thesis Project (2021)",
        description: "Designed a sustainable craft village integrating traditional crafts and community spaces. Focused on preserving cultural heritage while creating modern, functional spaces for artisans.",
        icon: "fa-university",
        actions: [
          { text: "View Details", link: "" },
          { text: "Download PDF", link: "" }
        ]
      },
      {
        title: "Research Paper – Heritage Walk at Chinchwad",
        role: "Research Publication (2021)",
        description: "Co-authored and published under COEP's NOCPDM 2021, focusing on heritage and cultural documentation. Explored urban heritage preservation strategies.",
        icon: "fa-book",
        actions: [
          { text: "View Details", link: "" },
          { text: "Download PDF", link: "" }
        ]
      }
    ],
    professional: [
      {
        title: "Interior Design Projects",
        role: "Alive Design Studio",
        description: "Led multiple interior and landscape projects at Alive Design Studio. Managed full project lifecycle from concept to completion.",
        icon: "fa-home",
        actions: [
          { text: "View Portfolio", link: "" },
          { text: "Case Study", link: "" }
        ]
      },
      {
        title: "BIM Design Workflows",
        role: "Documentation & Workflow",
        description: "Developed and implemented BIM-based design workflows and documentation processes. Streamlined project delivery and improved team efficiency.",
        icon: "fa-cube",
        actions: [
          { text: "View Process", link: "" },
          { text: "Learn More", link: "" }
        ]
      },
      {
        title: "Sustainable Design Solutions",
        role: "Environmental Focus",
        description: "Integrated sustainable design principles into various projects, focusing on energy efficiency and environmental responsibility.",
        icon: "fa-leaf",
        actions: [
          { text: "View Details", link: "" },
          { text: "Sustainability Report", link: "" }
        ]
      },
      {
        title: "Community Design Initiatives",
        role: "Social Impact",
        description: "Participated in community-focused design projects that emphasize social responsibility and community engagement.",
        icon: "fa-users",
        actions: [
          { text: "View Impact", link: "" },
          { text: "Community Report", link: "" }
        ]
      }
    ]
  };

  // Generation Functions - Data-Driven Sections
  function generateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) {
      console.warn('Skills grid not found');
      return;
    }
    
    skillsGrid.innerHTML = '';
    skillsData.forEach(category => {
      const div = document.createElement('div');
      div.className = 'skill-category';
      div.innerHTML = `
        <div class="category-header">
          <div class="category-icon"><i class="fas ${category.icon}"></i></div>
          <h3 class="category-title">${category.title}</h3>
        </div>
        <div class="skills-list">
          ${category.skills.map(s => `
            <div class="skill-item">
              <div class="skill-icon"><i class="fas ${s.icon}"></i></div>
              <span class="skill-name">${s.name}</span>
            </div>
          `).join('')}
        </div>
      `;
      skillsGrid.appendChild(div);
    });
  }

  function generateExperience() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) {
      console.warn('Timeline not found');
      return;
    }
    
    timeline.innerHTML = '';
    experienceData.forEach(exp => {
      const div = document.createElement('div');
      div.className = 'timeline-item';
      div.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="job-card">
            <div class="job-header">
              <h3 class="job-title">${exp.title}</h3>
              <div class="job-company">${exp.company}</div>
              <div class="job-dates">${exp.dates}</div>
              <div class="job-location">${exp.location}</div>
            </div>
            <div class="job-description">
              <ul class="job-achievements">
                ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      timeline.appendChild(div);
    });
  }

  function generateProjects() {
    const academicGrid = document.querySelector('.projects-subsection:first-child .projects-grid');
    const professionalGrid = document.querySelector('.projects-subsection:last-child .projects-grid');
    
    if (academicGrid) {
      academicGrid.innerHTML = '';
      projectsData.academic.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <div class="project-image">
            <div class="project-placeholder"><i class="fas ${p.icon}"></i></div>
            <div class="project-overlay">
              <h4>${p.title}</h4>
              <p>${p.role}</p>
            </div>
          </div>
          <div class="project-content">
            <h4 class="project-title">${p.title}</h4>
            <div class="project-role">${p.role}</div>
            <p class="project-description">${p.description}</p>
            <div class="project-actions">
              ${p.actions.map(a => a.link ? 
                `<a href="${a.link}" class="btn btn-outline" target="_blank" rel="noopener">${a.text}</a>` :
                `<button class="btn btn-outline">${a.text}</button>`
              ).join('')}
            </div>
          </div>
        `;
        academicGrid.appendChild(card);
      });
    }
    
    if (professionalGrid) {
      professionalGrid.innerHTML = '';
      projectsData.professional.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <div class="project-image">
            <div class="project-placeholder"><i class="fas ${p.icon}"></i></div>
            <div class="project-overlay">
              <h4>${p.title}</h4>
              <p>${p.role}</p>
            </div>
          </div>
          <div class="project-content">
            <h4 class="project-title">${p.title}</h4>
            <div class="project-role">${p.role}</div>
            <p class="project-description">${p.description}</p>
            <div class="project-actions">
              ${p.actions.map(a => a.link ? 
                `<a href="${a.link}" class="btn btn-outline" target="_blank" rel="noopener">${a.text}</a>` :
                `<button class="btn btn-outline">${a.text}</button>`
              ).join('')}
            </div>
          </div>
        `;
        professionalGrid.appendChild(card);
      });
    }
  }

  // Initialize data-driven sections
  generateSkills();
  generateExperience();
  generateProjects();

  // Re-initialize scroll animations for dynamically generated elements
  setTimeout(() => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    animatedElements.forEach(el => {
      if (!el.classList.contains('fade-in')) {
        el.classList.add('fade-in');
        if (typeof animationObserver !== 'undefined') {
          animationObserver.observe(el);
        }
      }
    });
  }, 100);
  
});
