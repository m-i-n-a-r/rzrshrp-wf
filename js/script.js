function updateHash() {
    let hash = location.hash;
    if (hash.indexOf('#') !== 0)
        return;
    hash = hash.substring(1);

    // Find anchor tag TODO close on second click
    document.querySelectorAll('.faqs > li > a[name]').forEach(anchor => {
        if (anchor.getAttribute('name') === hash &&
            !anchor.parentElement.classList.contains('active'))
            anchor.parentElement.classList.add('active');
        else
            anchor.parentElement.classList.remove('active');
    });
}

window.addEventListener('hashchange', updateHash, false);

updateHash();
