document.addEventListener("DOMContentLoaded", function() {
    const burger = document.querySelector('.burger');
    const overlay = document.querySelector('.menu-overlay');
    const overlayLinks = overlay.querySelectorAll('a');

    function closeMenu() {
        burger.classList.remove('active');
        overlay.classList.remove('active');
        burger.setAttribute('aria-expanded', false);
    }

    burger.addEventListener('click', () => {
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !expanded);
        burger.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Плавное закрытие + переход
    overlayLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // отменяем мгновенный переход
            const href = link.getAttribute('href');

            // Запускаем анимацию закрытия
            overlay.classList.add('closing');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', false);

            // Ждём окончания анимации (300мс) и переходим
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (!overlay.contains(e.target) && !burger.contains(e.target) && overlay.classList.contains('active')) {
            closeMenu();
        }
    });
});
