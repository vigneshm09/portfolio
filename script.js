document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a nav link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let index = sections.length;
        
        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinkItems.forEach(link => link.classList.remove('active'));
        navLinkItems[index]?.classList.add('active');
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate Skills on Scroll
    const skills = document.querySelectorAll('.skill');
    
    function checkSkills() {
        skills.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (skillPosition < screenPosition) {
                skill.classList.add('in-view');
            }
        });
    }
    
    window.addEventListener('scroll', checkSkills);
    checkSkills(); // Check on initial load

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add animation class to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 0.5) / 100;
            const y = (window.innerHeight - e.pageY * 0.5) / 100;
            
            hero.style.backgroundPosition = `${x}px ${y}px`;
        });
    }

    // Add animation to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
    });

    // Add animation to project cards on scroll
    const animateProjectCards = () => {
        projectCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.animationDelay = `${index * 0.2}s`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateProjectCards);
    animateProjectCards(); // Run once on page load

    // Add animation to contact form on scroll
    const contactFormElement = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    
    function animateContactSection() {
        if (!contactFormElement || !contactInfo) return;
        
        const formPosition = contactFormElement.getBoundingClientRect().top;
        const infoPosition = contactInfo.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (formPosition < screenPosition) {
            contactFormElement.style.opacity = '1';
            contactFormElement.style.transform = 'translateY(0)';
        }
        
        if (infoPosition < screenPosition) {
            contactInfo.querySelectorAll('*').forEach((el, index) => {
                if (el.style.animation) return;
                
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }
    
    window.addEventListener('scroll', animateContactSection);
    animateContactSection(); // Run once on page load
});
