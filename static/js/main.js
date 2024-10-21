// Version 1.6
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 56; // Height of the fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Add null check before calling scrollIntoView
                if (targetElement.scrollIntoView) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                console.warn(`Target element with id "${targetId}" not found.`);
            }
        });
    });

    // Add active class to navigation items on scroll
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const sections = document.querySelectorAll('section');

    function getCurrentSection() {
        const scrollPosition = window.scrollY;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (scrollPosition >= section.offsetTop - 100) {
                return section.id;
            }
        }

        return null;
    }

    function updateActiveNavLink() {
        const currentSection = getCurrentSection();

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scrolling for feature screens
    const featuresSection = document.querySelector('.features-section');
    const featureScreens = document.querySelectorAll('.feature-screen');

    featuresSection.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY;
        featuresSection.scrollBy({
            top: delta,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for feature animations
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    featureScreens.forEach(screen => {
        const featureItem = screen.querySelector('.feature-item');
        featureObserver.observe(featureItem);
    });

    // Subscribe form submission
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            // Here you would typically send the email to your server
            console.log('Subscribed email:', email);
            alert('Thank you for subscribing!');
            subscribeForm.reset();
        });
    }

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.parallax-bg');
        if (parallax) {
            let scrollPosition = window.pageYOffset;
            parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
});
