// Combined script for smooth scrolling and interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add active class styling
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #3498db;
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call

    // Add navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('skill-category')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe skill categories for animations
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        // Initially hide skill items
        const skillItems = category.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        observer.observe(category);
    });

    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }, 150);
        });
    });

    // Add ripple effect to skill items and buttons
    const interactiveElements = document.querySelectorAll('.skill-item, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .skill-item, .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(52, 152, 219, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Add parallax effect to sections on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Parallax for skill categories
        skillCategories.forEach((category, index) => {
            const rate = scrolled * -0.05 * (index + 1);
            category.style.transform = `translateY(${rate}px)`;
        });
        
        // Parallax for photo
        const photoFrame = document.querySelector('.photo-frame');
        if (photoFrame) {
            const rate = scrolled * -0.1;
            photoFrame.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add skill level indicators (optional enhancement)
    const addSkillLevels = () => {
        const technicalSkills = document.querySelectorAll('.skill-category.technical .skill-item');
        const managementSkills = document.querySelectorAll('.skill-category.management .skill-item');
        const softSkills = document.querySelectorAll('.skill-category.soft .skill-item');
        
        // Add proficiency indicators
        technicalSkills.forEach((skill, index) => {
            const level = Math.min(90, 70 + (index * 5)); // Varying skill levels
            skill.setAttribute('data-level', level);
        });
        
        managementSkills.forEach((skill, index) => {
            const level = Math.min(95, 75 + (index * 4);
            skill.setAttribute('data-level', level);
        });
        
        softSkills.forEach((skill, index) => {
            const level = Math.min(100, 80 + (index * 5));
            skill.setAttribute('data-level', level);
        });
    };

    // Initialize skill levels
    addSkillLevels();

    // Add tooltip functionality
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name').textContent;
        item.setAttribute('title', `Click to learn more about ${skillName}`);
    });

    // Add keyboard navigation
    skillItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add smooth reveal animations for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Add revealed class styling
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);

    // Add mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const navContent = document.querySelector('.nav-content');
        const mobileToggle = document.createElement('button');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.className = 'mobile-toggle';
        mobileToggle.style.display = 'none';
        
        navContent.appendChild(mobileToggle);
        
        // Mobile menu styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-toggle {
                    display: block !important;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #2c3e50;
                    cursor: pointer;
                }
                
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
                
                .nav-links.active {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
        
        mobileToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    };

    // Initialize mobile menu
    createMobileMenu();

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
                // Reset form
                contactForm.reset();
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
    
    // Resume download functionality
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function() {
            // Create a placeholder PDF download
            const link = document.createElement('a');
            link.href = '#'; // Placeholder - replace with actual PDF path
            link.download = 'Anagha_Shamsundar_Namasevi_Resume.pdf';
            link.click();
            
            // Show download message
            showDownloadMessage();
        });
    }
    
    // Helper functions for form validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorId = fieldName + 'Error';
        
        clearFieldError(field);
        
        if (fieldName === 'name') {
            if (value === '') {
                showError(errorId, 'Name is required');
            } else if (value.length < 2) {
                showError(errorId, 'Name must be at least 2 characters');
            }
        } else if (fieldName === 'email') {
            if (value === '') {
                showError(errorId, 'Email is required');
            } else if (!isValidEmail(value)) {
                showError(errorId, 'Please enter a valid email address');
            }
        } else if (fieldName === 'message') {
            if (value === '') {
                showError(errorId, 'Message is required');
            } else if (value.length < 10) {
                showError(errorId, 'Message must be at least 10 characters');
            }
        }
    }
    
    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        const field = document.getElementById(errorId.replace('Error', ''));
        if (field) {
            field.classList.add('error');
        }
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorId = field.name + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            error.classList.remove('show');
        });
        
        const fields = document.querySelectorAll('.form-input, .form-textarea');
        fields.forEach(field => {
            field.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message show';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
        
        // Insert after form
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    function showDownloadMessage() {
        // Create download message
        const downloadMessage = document.createElement('div');
        downloadMessage.className = 'success-message show';
        downloadMessage.innerHTML = '<i class="fas fa-download"></i> Resume download started!';
        downloadMessage.style.position = 'fixed';
        downloadMessage.style.top = '20px';
        downloadMessage.style.right = '20px';
        downloadMessage.style.zIndex = '1000';
        
        document.body.appendChild(downloadMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            downloadMessage.remove();
        }, 3000);
    }
});
