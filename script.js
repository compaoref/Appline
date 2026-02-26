/* ===== ROOT VARIABLES ===== */
:root {
    /* Couleurs principales */
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --secondary: #a855f7;
    --accent: #ec4899;
    
    /* Dégradé principal */
    --gradient-primary: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    --gradient-dark: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
    
    /* Neutres */
    --text-dark: #0f172a;
    --text-light: #f8fafc;
    --bg-light: #f8fafc;
    --bg-dark: #0f172a;
    --border: #e2e8f0;
    --border-dark: #1e293b;
    
    /* Espacements */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --spacing-2xl: 4rem;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-base: 0.3s ease;
    --transition-smooth: 0.5s ease;
    
    /* Ombres */
    --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
    --shadow-md: 0 4px 6px rgba(15, 23, 42, 0.1);
    --shadow-lg: 0 10px 15px rgba(15, 23, 42, 0.15);
    --shadow-xl: 0 20px 25px rgba(15, 23, 42, 0.2);
    
    /* Mode clair par défaut */
    --mode: light;
}

/* Mode sombre */
[data-theme="dark"] {
    --text-dark: #f8fafc;
    --text-light: #0f172a;
    --bg-light: #0f172a;
    --bg-dark: #1e293b;
    --border: #1e293b;
    --border-dark: #0f172a;
    --mode: dark;
}

/* ===== RESET & BASE ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--text-dark);
    background-color: var(--bg-light);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color var(--transition-smooth), color var(--transition-smooth);
}

/* ===== CONTAINER ===== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}

/* ===== NAVBAR ===== */
.navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(248, 250, 252, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    transition: all var(--transition-base);
}

[data-theme="dark"] .navbar {
    background: rgba(15, 23, 42, 0.8);
    border-bottom-color: var(--border-dark);
}

.navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.5rem;
    font-weight: 700;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    transition: transform var(--transition-base);
}

.logo:hover {
    transform: scale(1.05);
}

.logo-icon {
    font-size: 1.8rem;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: var(--spacing-xl);
    align-items: center;
}

.nav-link {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    transition: all var(--transition-base);
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width var(--transition-base);
}

.nav-link:hover::after {
    width: 100%;
}

.contact-btn {
    background: var(--gradient-primary);
    color: white !important;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 8px;
    transition: all var(--transition-base);
}

.contact-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.menu-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    gap: 5px;
}

.menu-toggle span {
    width: 25px;
    height: 3px;
    background: var(--primary);
    border-radius: 2px;
    transition: all var(--transition-base);
}

/* ===== HERO SECTION ===== */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: var(--spacing-2xl) 0;
    background: var(--bg-light);
}

.hero-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
}

.gradient-sphere {
    position: absolute;
    border-radius: 50%;
    opacity: 0.3;
    filter: blur(80px);
    animation: float 8s ease-in-out infinite;
}

.sphere-1 {
    width: 400px;
    height: 400px;
    background: var(--primary);
    top: -100px;
    left: -100px;
    animation-delay: 0s;
}

.sphere-2 {
    width: 400px;
    height: 400px;
    background: var(--secondary);
    bottom: -100px;
    right: -100px;
    animation-delay: 2s;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, 20px); }
}

.hero-content {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    animation: fadeInUp 1s ease;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: var(--spacing-md);
}

.title-line {
    display: block;
    color: var(--text-dark);
}

.title-highlight {
    display: block;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: var(--text-dark);
    opacity: 0.8;
    margin-bottom: var(--spacing-2xl);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-buttons {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--spacing-2xl);
}

/* ===== BUTTONS ===== */
.btn {
    padding: var(--spacing-md) var(--spacing-lg);
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all var(--transition-base);
    text-align: center;
    white-space: nowrap;
}

.btn-primary {
    background: var(--gradient-primary);
    color: white;
    box-shadow: var(--shadow-lg);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 30px rgba(99, 102, 241, 0.3);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-secondary {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
}

.btn-secondary:hover {
    background: var(--primary);
    color: white;
}

.btn-small {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.9rem;
}

/* ===== HERO STATS ===== */
.hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
    margin-top: var(--spacing-2xl);
    padding-top: var(--spacing-2xl);
    border-top: 1px solid var(--border);
}

.stat {
    text-align: center;
    animation: fadeInUp 1s ease;
    animation-fill-mode: both;
}

.stat:nth-child(2) { animation-delay: 0.1s; }
.stat:nth-child(3) { animation-delay: 0.2s; }

.stat-number {
    font-size: 2rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-dark);
    opacity: 0.7;
    margin-top: var(--spacing-xs);
}

/* ===== SECTION STYLES ===== */
section {
    padding: var(--spacing-2xl) 0;
}

.section-header {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
}

.section-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: var(--spacing-md);
    position: relative;
    display: inline-block;
    width: 100%;
}

.section-subtitle {
    font-size: 1.1rem;
    color: var(--text-dark);
    opacity: 0.7;
    margin-bottom: var(--spacing-md);
}

.title-underline {
    width: 80px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 2px;
    margin: var(--spacing-md) auto 0;
}

/* ===== ABOUT SECTION ===== */
.about {
    background: var(--bg-light);
}

.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-2xl);
    align-items: center;
}

.about-subtitle {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: var(--spacing-md);
}

.about-content p {
    color: var(--text-dark);
    opacity: 0.8;
    margin-bottom: var(--spacing-lg);
    line-height: 1.8;
}

.values {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
}

.value-item {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(99, 102, 241, 0.05);
    border-radius: 10px;
    border-left: 4px solid var(--primary);
    transition: all var(--transition-base);
}

.value-item:hover {
    transform: translateX(10px);
    background: rgba(99, 102, 241, 0.1);
}

.value-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.value-text h4 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-xs);
}

.value-text p {
    font-size: 0.9rem;
    opacity: 0.7;
    margin: 0;
}

.image-placeholder {
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(99, 102, 241, 0.1);
    border-radius: 20px;
    overflow: hidden;
}

.image-placeholder svg {
    width: 80%;
    height: 80%;
    animation: float 8s ease-in-out infinite;
}

/* ===== APPLICATIONS SECTION ===== */
.applications {
    background: var(--bg-light);
}

.apps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.app-card {
    background: var(--bg-light);
    border: 1px solid var(--border);
    border-radius: 15px;
    padding: var(--spacing-lg);
    transition: all var(--transition-smooth);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.app-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-smooth);
}

.app-card:hover {
    border-color: var(--primary);
    transform: translateY(-10px);
    box-shadow: var(--shadow-xl);
}

.app-card:hover::before {
    transform: scaleX(1);
}

.app-icon {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
    transition: transform var(--transition-base);
}

.app-card:hover .app-icon {
    transform: scale(1.2) rotate(10deg);
}

.app-name {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
}

.app-desc {
    color: var(--text-dark);
    opacity: 0.7;
    margin-bottom: var(--spacing-md);
    flex-grow: 1;
}

.app-tags {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
}

.tag {
    background: rgba(99, 102, 241, 0.1);
    color: var(--primary);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
}

/* ===== FEATURES SECTION ===== */
.features {
    background: var(--bg-light);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
}

.feature-card {
    background: rgba(99, 102, 241, 0.05);
    border: 1px solid var(--border);
    border-radius: 15px;
    padding: var(--spacing-lg);
    text-align: center;
    transition: all var(--transition-smooth);
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    background: rgba(99, 102, 241, 0.1);
    box-shadow: var(--shadow-lg);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
}

.feature-card h3 {
    font-size: 1.2rem;
    margin-bottom: var(--spacing-sm);
}

.feature-card p {
    color: var(--text-dark);
    opacity: 0.7;
    font-size: 0.95rem;
}

/* ===== TESTIMONIALS SECTION ===== */
.testimonials {
    background: var(--bg-light);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
}

.testimonial-card {
    background: var(--bg-light);
    border: 1px solid var(--border);
    border-radius: 15px;
    padding: var(--spacing-lg);
    transition: all var(--transition-smooth);
}

.testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
}

.stars {
    margin-bottom: var(--spacing-md);
    font-size: 1.2rem;
}

.testimonial-card p {
    color: var(--text-dark);
    opacity: 0.8;
    font-style: italic;
    margin-bottom: var(--spacing-md);
}

.testimonial-author {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
}

.author-name {
    font-weight: 600;
    margin: 0;
    color: var(--text-dark);
}

.author-role {
    font-size: 0.85rem;
    color: var(--text-dark);
    opacity: 0.7;
    margin: 0;
}

/* ===== FAQ SECTION ===== */
.faq {
    background: var(--bg-light);
}

.faq-container {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    margin-bottom: var(--spacing-lg);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    transition: all var(--transition-base);
}

.faq-item:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-md);
}

.faq-question {
    width: 100%;
    padding: var(--spacing-lg);
    background: var(--bg-light);
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-dark);
    transition: all var(--transition-base);
}

.faq-question:hover {
    background: rgba(99, 102, 241, 0.05);
}

.faq-icon {
    font-size: 1.5rem;
    transition: transform var(--transition-base);
}

.faq-item.active .faq-icon {
    transform: rotate(45deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-smooth);
    background: rgba(99, 102, 241, 0.05);
}

.faq-item.active .faq-answer {
    max-height: 500px;
}

.faq-answer p {
    padding: var(--spacing-lg);
    color: var(--text-dark);
    opacity: 0.8;
    line-height: 1.8;
    margin: 0;
}

/* ===== CONTACT SECTION ===== */
.contact {
    background: var(--bg-light);
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-2xl);
    align-items: start;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.form-group label {
    font-weight: 600;
    color: var(--text-dark);
}

.form-group input,
.form-group textarea {
    padding: var(--spacing-md);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-family: inherit;
    font-size: 1rem;
    color: var(--text-dark);
    background: var(--bg-light);
    transition: all var(--transition-base);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.contact-item {
    padding: var(--spacing-lg);
    background: rgba(99, 102, 241, 0.05);
    border-radius: 15px;
    border: 1px solid var(--border);
    transition: all var(--transition-base);
}

.contact-item:hover {
    transform: translateX(5px);
    border-color: var(--primary);
}

.contact-icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-md);
}

.contact-item h3 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-sm);
}

.contact-item p {
    color: var(--text-dark);
    opacity: 0.7;
    margin: 0;
}

.contact-item a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-base);
}

.contact-item a:hover {
    text-decoration: underline;
}

.social-links {
    display: flex;
    gap: var(--spacing-md);
    margin-top: var(--spacing-md);
}

.social-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    transition: all var(--transition-base);
}

.social-links a:hover {
    transform: scale(1.1) rotate(5deg);
}

/* ===== FOOTER ===== */
.footer {
    background: var(--bg-dark);
    color: var(--text-light);
    padding: var(--spacing-2xl) 0 var(--spacing-lg);
    margin-top: var(--spacing-2xl);
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
}

.footer-section h3,
.footer-section h4 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-md);
}

.footer-section p {
    opacity: 0.8;
    line-height: 1.8;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: var(--spacing-sm);
}

.footer-section a {
    color: var(--text-light);
    text-decoration: none;
    opacity: 0.8;
    transition: all var(--transition-base);
}

.footer-section a:hover {
    color: var(--primary-light);
    opacity: 1;
}

.footer-bottom {
    border-top: 1px solid var(--border-dark);
    padding-top: var(--spacing-lg);
    text-align: center;
    opacity: 0.7;
}

/* ===== SCROLL TO TOP BUTTON ===== */
.scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    z-index: 99;
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    transform: translateY(-5px);
}

/* ===== THEME TOGGLE ===== */
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 101;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-lg);
}

.theme-toggle:hover {
    transform: scale(1.1) rotate(20deg);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .nav-links {
        display: none;
    }

    .menu-toggle {
        display: flex;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }

    .hero-stats {
        grid-template-columns: 1fr;
        gap: var(--spacing-md);
        margin-top: var(--spacing-lg);
    }

    .about-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-lg);
    }

    .contact-grid {
        grid-template-columns: 1fr;
    }

    .section-title {
        font-size: 2rem;
    }

    .apps-grid {
        grid-template-columns: 1fr;
    }

    .features-grid {
        grid-template-columns: 1fr;
    }

    .testimo
