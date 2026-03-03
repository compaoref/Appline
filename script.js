// ===== THEME MANAGEMENT =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.createThemeToggle();
    }

    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle theme');
        toggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';
        toggle.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggle);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        document.querySelector('.theme-toggle').innerHTML = 
            this.theme === 'light' ? '🌙' : '☀️';
    }
}

// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('menuToggle');
        this.navLinks = document.getElementById('navLinks');
        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.toggle.querySelectorAll('span');
        if (this.navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }

    closeMenu() {
        this.navLinks.classList.remove('active');
        const spans = this.toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.app-card, .feature-card, .testimonial-card, .faq-item').forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }
}

// ===== SMOOTH SCROLL TO TOP =====
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.toggleButton());
        this.button.addEventListener('click', () => this.scrollTop());
    }

    toggleButton() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===== FAQ ACCORDION =====
class FAQ {
    constructor() {
        this.items = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        this.items.forEach(el => el.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// ===== APP MANAGEMENT SYSTEM =====
class AppManager {
    constructor() {
        this.storageKey = 'apphub_apps';
        this.defaultApps = [
            {
                id: 1,
                name: 'Signdoc',
                icon: '✍️',
                description: 'Signez vos documents numériquement en quelques clics. Solution sécurisée et professionnelle pour authentifier vos fichiers.',
                link: 'https://compaoref.github.io/Signdoc-/',
                tags: ['Signature', 'Sécurité', 'Documents']
            },
            {
                id: 2,
                name: 'Facturation Professionnelle',
                icon: '📊',
                description: 'Créez et gérez vos factures facilement. Outil professionnel pour suivre vos revenus et gérer votre comptabilité.',
                link: 'https://compaoref.github.io/Facturation-professionnelle-/',
                tags: ['Facturation', 'Gestion', 'Professionnel']
            }
        ];
        this.init();
    }

    init() {
        // Charger les apps depuis localStorage ou utiliser les défauts
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) {
            this.apps = this.defaultApps;
            this.save();
        } else {
            this.apps = JSON.parse(saved);
        }
        
        this.render();
        this.setupListeners();
    }

    setupListeners() {
        // Admin Panel Toggle
        const adminToggle = document.getElementById('adminToggle');
        const adminPanel = document.getElementById('adminPanel');
        
        if (adminToggle) {
            adminToggle.addEventListener('click', () => {
                adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
                this.renderAdminPanel();
            });
        }

        // Add App Button
        const addAppBtn = document.getElementById('addAppBtn');
        if (addAppBtn) {
            addAppBtn.addEventListener('click', () => this.addApp());
        }

        // Export Button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportApps());
        }

        // Clear Button
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllApps());
        }
    }

    addApp() {
        const name = document.getElementById('appName').value.trim();
        const icon = document.getElementById('appEmoji').value.trim();
        const link = document.getElementById('appLink').value.trim();
        const description = document.getElementById('appDesc').value.trim();
        const tagsInput = document.getElementById('appTags').value.trim();

        if (!name || !icon || !link || !description) {
            alert('⚠️ Veuillez remplir tous les champs!');
            return;
        }

        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : ['Nouvelle'];
        
        const newApp = {
            id: Date.now(),
            name,
            icon,
            description,
            link,
            tags
        };

        this.apps.push(newApp);
        this.save();
        this.render();
        this.renderAdminPanel();

        // Clear form
        document.getElementById('appName').value = '';
        document.getElementById('appEmoji').value = '';
        document.getElementById('appLink').value = '';
        document.getElementById('appDesc').value = '';
        document.getElementById('appTags').value = '';

        alert('✅ Application ajoutée avec succès!');
    }

    deleteApp(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette application?')) {
            this.apps = this.apps.filter(app => app.id !== id);
            this.save();
            this.render();
            this.renderAdminPanel();
            alert('✅ Application supprimée!');
        }
    }

    exportApps() {
        const dataStr = JSON.stringify(this.apps, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'appline_apps_backup.json';
        link.click();
        alert('✅ Applications exportées!');
    }

    clearAllApps() {
        if (confirm('⚠️ Êtes-vous ABSOLUMENT sûr? Cela supprimera TOUTES les applications!')) {
            this.apps = [];
            this.save();
            this.render();
            this.renderAdminPanel();
            alert('✅ Toutes les applications ont été supprimées!');
        }
    }

    render() {
        const container = document.getElementById('appsContainer');
        if (!container) return;

        container.innerHTML = '';

        if (this.apps.length === 0) {
            container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #666;">Aucune application pour le moment. Ouvrez le panneau admin pour en ajouter!</p>';
            return;
        }

        this.apps.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';
            appCard.innerHTML = `
                <div class="app-icon">${app.icon}</div>
                <h3 class="app-name">${app.name}</h3>
                <p class="app-desc">${app.description}</p>
                <div class="app-tags">
                    ${app.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${app.link}" target="_blank" class="btn btn-primary btn-small">Utiliser</a>
            `;
            container.appendChild(appCard);
        });
    }

    renderAdminPanel() {
        const adminList = document.getElementById('adminAppsList');
        if (!adminList) return;

        adminList.innerHTML = '';

        if (this.apps.length === 0) {
            adminList.innerHTML = '<p style="text-align: center; padding: 20px; color: #666;">Aucune application. Ajoutez-en une ci-dessus!</p>';
            return;
        }

        this.apps.forEach(app => {
            const appItem = document.createElement('div');
            appItem.style.cssText = 'background: var(--bg-light); border: 1px solid var(--border); border-radius: 10px; padding: 15px; display: flex; justify-content: space-between; align-items: center;';
            appItem.innerHTML = `
                <div>
                    <h4 style="margin-bottom: 5px;">${app.icon} ${app.name}</h4>
                    <p style="font-size: 0.9rem; color: #666; margin: 0;">${app.link}</p>
                </div>
                <button onclick="appManager.deleteApp(${app.id})" style="background: #ef4444; color: white; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600;">🗑️ Supprimer</button>
            `;
            adminList.appendChild(appItem);
        });
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.apps));
    }
}

// Initialiser le gestionnaire d'applications
let appManager;

// ===== CONTACT FORM =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validation
        if (!this.validateForm(data)) {
            alert('Veuillez remplir tous les champs correctement');
            return;
        }

        // Show success message
        this.showSuccessMessage();
        
        // Reset form
        this.form.reset();
        
        // Log data (en production, envoyer à un serveur)
        console.log('Form data:', data);
    }

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return data.name && 
               emailRegex.test(data.email) && 
               data.subject && 
               data.message;
    }

    showSuccessMessage() {
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = '✓ Message envoyé !';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    }
}

// ===== NAVBAR SCROLL EFFECT =====
class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateNavbar());
    }

    updateNavbar() {
        if (window.scrollY > 50) {
            this.navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            this.navbar.style.boxShadow = 'none';
        }
    }
}

// ===== COUNTER ANIMATION =====
class CounterAnimation {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const text = element.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/\d+/g, '');
        
        if (isNaN(num)) return;

        let current = 0;
        const increment = num / 30; // Animation duration
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                element.textContent = num + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// ===== INTERSECTION OBSERVER FOR LAZY ANIMATIONS =====
class LazyAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el);
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
    static optimizeImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
        });
    }

    static prefetchLinks() {
        document.querySelectorAll('a[data-prefetch]').forEach(link => {
            const url = link.href;
            const prefetch = document.createElement('link');
            prefetch.rel = 'prefetch';
            prefetch.href = url;
            document.head.appendChild(prefetch);
        });
    }
}

// ===== ACCESSIBILITY FEATURES =====
class Accessibility {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.addFocusIndicators();
    }

    enhanceKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close menu
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('navLinks');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    }

    addFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== SMOOTH LINK SCROLL =====
class SmoothLinkScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
}

// ===== FORM VALIDATION =====
class FormValidation {
    constructor() {
        this.init();
    }

    init() {
        const inputs = document.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(input) {
        const value = input.value.trim();
        const type = input.type;

        if (type === 'email') {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            this.showValidation(input, isValid);
        } else if (value.length > 0) {
            this.showValidation(input, true);
        } else {
            this.showValidation(input, false);
        }
    }

    showValidation(input, isValid) {
        if (isValid) {
            input.style.borderColor = '#10b981';
        } else {
            input.style.borderColor = '#ef4444';
        }
    }
}

// ===== SERVICE WORKER REGISTRATION =====
class PWASetup {
    constructor() {
        this.init();
    }

    init() {
        // Register service worker if available
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => {
                // Service worker registration failed, but app still works
            });
        }
    }
}

// ===== ANALYTICS TRACKING (optional) =====
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        // Track page views
        this.trackPageView();
        
        // Track button clicks
        this.trackButtonClicks();
    }

    trackPageView() {
        console.log('Page viewed at:', new Date().toISOString());
    }

    trackButtonClicks() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('Button clicked:', e.target.textContent);
            });
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize app manager FIRST
    appManager = new AppManager();
    
    // Initialize all other components
    new ThemeManager();
    new MobileMenu();
    new ScrollAnimations();
    new ScrollToTop();
    new FAQ();
    new ContactForm();
    new NavbarScroll();
    new CounterAnimation();
    new LazyAnimations();
    new Accessibility();
    new SmoothLinkScroll();
    new FormValidation();
    new PWASetup();
    new Analytics();

    console.log('✓ Application initialized successfully');
    console.log('✓ App Manager loaded with ' + appManager.apps.length + ' applications');
});

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });
        observer.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (e) {
        // Performance observer not supported
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, send error to monitoring service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send error to monitoring service
});
