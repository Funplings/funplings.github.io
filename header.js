// Inject Font Awesome
const fa = document.createElement('link');
fa.rel = 'stylesheet';
fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
document.head.appendChild(fa);

const roles = [
    { id: 'illustrator',     label: 'illustrator',      href: 'illustrator.html' },
    { id: 'game-developer',  label: 'game developer',  href: 'game-developer.html' },
    { id: 'writer',          label: 'writer',           href: 'writer.html' },
    { id: 'filmmaker',       label: 'filmmaker',        href: 'filmmaker.html' },
];

function initFooter() {
    const footer = document.createElement('footer');
    document.body.appendChild(footer);
}

function initHeader(activePage) {
    const rolesHTML = roles.map((role, i) => {
        const active = role.id === activePage ? ' class="active"' : '';
        const sep = i < roles.length - 1 ? '<span class="sep">/</span>' : '';
        return `<a href="${role.href}"${active}>${role.label}</a>${sep}`;
    }).join('');

    initFooter();
    document.getElementById('site-header').innerHTML = `
        <div class="social-links">
            <a href="https://twitter.com/funplings" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="https://instagram.com/funplings" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://youtube.com/@funplings" target="_blank"><i class="fa-brands fa-youtube"></i></a>
        </div>
        <h1><a href="index.html">MATTHEW GUO</a></h1>
        <p class="roles">${rolesHTML}</p>
    `;
}
