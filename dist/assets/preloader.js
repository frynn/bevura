const MIN_PRELOADER_TIME = 800;
const startTime = Date.now();

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 400); // синхронизировано с CSS transition
    }
}

window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, MIN_PRELOADER_TIME - elapsed);

    setTimeout(hidePreloader, delay);
});

// fallback: если load не сработал
setTimeout(hidePreloader, 5000);
