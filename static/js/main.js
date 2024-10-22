// Version 3.8
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 56;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
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

    // Intersection Observer for feature animations
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.feature-item').forEach(item => {
        featureObserver.observe(item);
    });

    // Subscribe form submission
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('emailInput').value;
            
            fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email})
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // 创建并显示成功消息
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success mt-3';
                    alertDiv.textContent = data.message;
                    subscribeForm.insertAdjacentElement('afterend', alertDiv);

                    // 重置表单
                    subscribeForm.reset();

                    // 5秒后自动移除提示
                    setTimeout(() => {
                        alertDiv.remove();
                    }, 5000);
                } else {
                    // 创建并显示错误消息
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-danger mt-3';
                    alertDiv.textContent = 'Subscription failed, please try again later.';
                    subscribeForm.insertAdjacentElement('afterend', alertDiv);

                    // 5秒后自动移除提示
                    setTimeout(() => {
                        alertDiv.remove();
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // 创建并显示错误消息
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-danger mt-3';
                alertDiv.textContent = 'An error has occurred, please try again later.';
                subscribeForm.insertAdjacentElement('afterend', alertDiv);

                // 5秒后自动移除提示
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            });
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

    var carousels = document.querySelectorAll('.feature-image-carousel .carousel');
    carousels.forEach(function(carousel, index) {
        var descriptionElement = document.getElementById('featureDescription' + (index + 1));
        
        if (!descriptionElement) {
            console.warn('Description element not found for carousel', index + 1);
            return;
        }

        new bootstrap.Carousel(carousel, {
            interval: 5000, // 5秒切换一次
            pause: 'hover'
        });

        carousel.addEventListener('slide.bs.carousel', function (event) {
            var nextDescription = event.relatedTarget.dataset.description;
            if (nextDescription) {
                descriptionElement.classList.add('fade-out');
                setTimeout(function() {
                    descriptionElement.textContent = nextDescription;
                    descriptionElement.classList.remove('fade-out');
                }, 250); // 半个过渡时间后更新文本
            } else {
                console.warn('No description found for slide in carousel', index + 1);
            }
        });
    });

    // 处理联系表单提交
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch('/submit_contact', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // 创建并显示成功消息
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success alert-dismissible fade show';
                    alertDiv.role = 'alert';
                    alertDiv.innerHTML = `
                        ${data.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `;
                    contactForm.insertAdjacentElement('beforebegin', alertDiv);

                    // 重置表单
                    contactForm.reset();

                    // 5秒后自动移除提示
                    setTimeout(() => {
                        alertDiv.remove();
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
