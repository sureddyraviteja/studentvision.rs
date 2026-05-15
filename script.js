// Smooth Scroll with offset for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100; // Adjusted for a larger header
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #6c5ce7,rgb(30, 0, 255));
    z-index: 9999;
    transition: width 0.3s ease;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Dynamic Card Hover Effects
document.querySelectorAll('.content').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height / 2) / 10}deg)
            rotateY(${-(x - rect.width / 2) / 10}deg)
            scale(1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Enhanced Form Submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate successful submission
    Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. I will respond within 24 hours.',
        confirmButtonColor: '#6c5ce7',
        background: '#ffffff',
        iconColor: '#4b3ac9'
    });

    // Clear form fields
    e.target.reset();
});

// Dynamic Copyright Year
document.querySelector('footer p').innerHTML = `© ${new Date().getFullYear()} Ravi Teja | Follow me on <a href="http://www.youtube.com/@StudentvisionRs">YouTube</a> & <a href="https://www.instagram.com/studentvision.rs?igsh=MThxemMzbzh3aWRheg==">Instagram</a>`;

// Back to Top Button
const topButton = document.createElement('button');
topButton.innerHTML = '↑';
topButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6c5ce7, #4b3ac9);
    color: white;
    font-size: 28px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
`;
document.body.appendChild(topButton);

window.addEventListener('scroll', () => {
    topButton.style.opacity = (window.scrollY > 500) ? '1' : '0';
});

topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = `${scrolled * 0.3}px`; 
});