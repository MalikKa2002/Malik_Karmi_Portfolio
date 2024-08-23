// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        
        // Ensure href is not just '#'
        if (href.length > 1) {
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Invalid selector: ${href}`);
            }
        }
    });
});

// Trigger animations when elements are in view
const animatedElements = document.querySelectorAll('.about, .projects, .project-item');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => {
    observer.observe(element);
});

// Scroll to the top of the page on load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
