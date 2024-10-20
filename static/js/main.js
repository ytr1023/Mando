document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Target element with id "${targetId}" not found.`);
            }
        });
    });

    // Add active class to navigation items on scroll
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            if (scrollPosition >= section.offsetTop - 100 && scrollPosition < (section.offsetTop + section.offsetHeight - 100)) {
                let currentId = section.attributes.id.value;
                removeAllActiveClasses();
                addActiveClass(currentId);
            }
        });
    });

    function removeAllActiveClasses() {
        document.querySelectorAll(".navbar-nav a").forEach(el => {
            el.classList.remove("active");
        });
    }

    function addActiveClass(id) {
        let selector = `.navbar-nav a[href="#${id}"]`;
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add("active");
        }
    }

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
