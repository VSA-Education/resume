document.addEventListener('DOMContentLoaded', () => {
    // 1. Анимация появления элементов при скролле (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимация проигрывается только один раз
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Легкий параллакс-эффект для фоновых сфер при движении мыши
    const orbs = document.querySelectorAll('.bg-orb');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Плавное следование за мышью с задержкой (lerp)
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // от -1 до 1
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateOrbs() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 15; // Разная скорость для глубины
            const x = currentX * speed;
            const y = currentY * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animateOrbs);
    }

    // Запускаем анимацию только на устройствах с мышью (не тачскрин)
    if (window.matchMedia('(pointer: fine)').matches) {
        animateOrbs();
    }

    // 3. Плавный скролл для якорных ссылок (если будут добавлены)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});