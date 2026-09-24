/* 
   MOBILE MENU TOGGLE
   
*/
const ul = document.querySelector('nav ul');
const menubar = document.querySelector('.hamburgur i');

if (menubar && ul) {
    menubar.addEventListener('click', () => {
        ul.classList.toggle('active');
        if (ul.classList.contains('active')) {
            menubar.classList.remove('fa-bars');
            menubar.classList.add('fa-times');
        } else {
            menubar.classList.remove('fa-times');
            menubar.classList.add('fa-bars');
        }
    });
}

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && ul) {
            ul.classList.remove('active');
            if (menubar) {
                menubar.classList.remove('fa-times');
                menubar.classList.add('fa-bars');
            }
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && ul) {
        ul.classList.remove('active');
        if (menubar) {
            menubar.classList.remove('fa-times');
            menubar.classList.add('fa-bars');
        }
    }
});

/* 
   ACTIVE NAV LINK ON SCROLL
    */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

/* 
   PROGRESS BAR ANIMATION ON SCROLL
    */
const progressFills = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth;
            observer.unobserve(fill);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

progressFills.forEach(fill => progressObserver.observe(fill));

/* 
   FADE-UP ANIMATION ON SCROLL (Only inner elements, not sections)
   This prevents whole sections from being pushed down and creating gaps.
    */
const fadeElements = document.querySelectorAll(
    '.card, .education-card, .project-card, .info-card, .left-side-home, .right-about'
);

fadeElements.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

/* 
   SMOOTH SCROLL FALLBACK
    */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* 
   PROJECT CARD SPOTLIGHT (Cursor follow glow)
    */
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