let currentOpenFaq = null;

// Animazione counter per numeri della tabella
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const element = entry.target;
                const finalValue = parseFloat(element.getAttribute('data-value'));
                const format = element.getAttribute('data-format');
                const duration = 1200; // ms
                const startTime = Date.now();

                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentValue = finalValue * progress;

                    if (format === 'decimal') {
                        element.textContent = currentValue.toFixed(1);
                    } else if (format === 'number') {
                        element.textContent = Math.floor(currentValue).toLocaleString('it-IT');
                    }

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        if (format === 'decimal') {
                            element.textContent = finalValue.toFixed(1);
                        } else if (format === 'number') {
                            element.textContent = Math.floor(finalValue).toLocaleString('it-IT');
                        }
                        element.classList.add('animated');
                    }
                };

                animate();
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Animazione logo al click
const logo = document.querySelector('.app-logo');
if (logo) {
    logo.addEventListener('click', function () {
        // Rimuovi la classe se presente per riavviare l'animazione
        this.classList.remove('animate');
        // Forza un reflow per permettere al browser di riavviare l'animazione
        void this.offsetWidth;
        this.classList.add('animate');
    });
}

function updateHash() {
    let hash = location.hash;
    if (hash.indexOf('#') !== 0)
        return;
    hash = hash.substring(1);

    document.querySelectorAll('.faqs > li > a[name]').forEach(anchor => {
        const li = anchor.parentElement;
        if (anchor.getAttribute('name') === hash &&
            !li.classList.contains('active')) {
            li.classList.add('active');
            currentOpenFaq = li;
        } else {
            li.classList.remove('active');
        }
    });
}

function toggleFaq(event) {
    event.preventDefault();
    const li = event.currentTarget.parentElement;

    if (li.classList.contains('active')) {
        li.classList.remove('active');
        currentOpenFaq = null;
        history.pushState(null, null, window.location.pathname);
    } else {
        document.querySelectorAll('.faqs > li').forEach(item => {
            item.classList.remove('active');
        });
        li.classList.add('active');
        currentOpenFaq = li;
        const anchor = li.querySelector('a[name]');
        if (anchor) {
            history.pushState(null, null, '#' + anchor.getAttribute('name'));
        }
    }
}

document.querySelectorAll('.faqs > li > a[href]').forEach(link => {
    link.addEventListener('click', toggleFaq);
});

window.addEventListener('hashchange', updateHash, false);

updateHash();

// Avvia animazione counters quando il DOM è pronto
animateCounters();
