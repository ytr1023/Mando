document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
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
        document.querySelector(selector).classList.add("active");
    }

    // Typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    const typewriterText = typewriterElement.innerHTML.trim();
    typewriterElement.innerHTML = '';
    let i = 0;

    function typeWriter() {
        if (i < typewriterText.length) {
            if (typewriterText.charAt(i) === '<' && typewriterText.substr(i, 4) === '<br>') {
                typewriterElement.innerHTML += '<br>';
                i += 4;
            } else {
                typewriterElement.innerHTML += typewriterText.charAt(i);
                i++;
            }
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const parallax = document.querySelector('.parallax-bg');
        let scrollPosition = window.pageYOffset;
        parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
});
