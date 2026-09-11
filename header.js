// Inject Font Awesome
const fa = document.createElement('link');
fa.rel = 'stylesheet';
fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
document.head.appendChild(fa);

const roles = [
    { id: 'home', label: 'home', href: 'index.html' },
    { id: 'illustrator', label: 'illustrations', href: 'illustrator.html' },
    { id: 'software-engineer', label: 'projects', href: 'software-engineer.html' },
    { id: 'game-developer', label: 'games', href: 'game-developer.html' },
    { id: 'writer', label: 'writing', href: 'writer.html' },
    { id: 'filmmaker', label: 'films', href: 'filmmaker.html' },
];

const pagePaintings = {
    home: 'src/assets/images/backgrounds/impression-sunrise.jpg',
    filmmaker: 'src/assets/images/backgrounds/new-york-movie.jpg',
    illustrator: 'src/assets/images/backgrounds/triple-self-portrait.jpg',
    'software-engineer': 'src/assets/images/backgrounds/the-city-rises.jpg',
    writer: 'src/assets/images/backgrounds/death-of-marat.jpg',
    'game-developer': 'src/assets/images/backgrounds/childrens-games.jpg',
    tastemaker: 'src/assets/images/backgrounds/haystacks.jpg',
};

const paintingDetails = {
    home: {
        title: 'Impression, Sunrise',
        year: '1872',
        artist: 'Claude Monet',
        medium: 'Oil on canvas',
        href: 'https://en.wikipedia.org/wiki/Impression%2C_Sunrise',
    },
    filmmaker: {
        title: 'New York Movie',
        year: '1939',
        artist: 'Edward Hopper',
        medium: 'Oil on canvas',
        href: 'https://en.wikipedia.org/wiki/New_York_Movie',
    },
    illustrator: {
        title: 'Triple Self-Portrait',
        year: '1960',
        artist: 'Norman Rockwell',
        medium: 'Oil on canvas',
        href: 'https://en.wikipedia.org/wiki/Triple_Self-Portrait',
    },
    'software-engineer': {
        title: 'The City Rises',
        year: '1910',
        artist: 'Umberto Boccioni',
        medium: 'Oil on canvas',
        href: 'https://en.wikipedia.org/wiki/The_City_Rises',
    },
    writer: {
        title: 'The Death of Marat',
        year: '1793',
        artist: 'Jacques-Louis David',
        medium: 'Oil on canvas',
        href: 'https://en.wikipedia.org/wiki/The_Death_of_Marat',
    },
    'game-developer': {
        title: "Children's Games",
        year: '1560',
        artist: 'Pieter Bruegel the Elder',
        medium: 'Oil on panel',
        href: "https://en.wikipedia.org/wiki/Children%27s_Games_(Bruegel)",
    },
    tastemaker: {
        title: 'Stacks of Wheat (End of Summer)',
        year: '1890–1891',
        artist: 'Claude Monet',
        medium: 'Oil on canvas',
        href: 'https://en.wikipedia.org/wiki/Haystacks_(Monet_series)',
    },
};

function initPaintingBackground(activePage) {
    if (document.querySelector('.painting-background')) {
        return;
    }

    const page = activePage || 'home';
    const painting = pagePaintings[page];
    document.body.classList.add(`page-${page}`);
    const background = document.createElement('div');
    background.className = 'painting-background';
    background.setAttribute('aria-hidden', 'true');
    background.innerHTML = `
        <div class="painting-background__image"></div>
        <div class="painting-background__wash"></div>
    `;
    document.body.prepend(background);

    background.querySelector('.painting-background__image').style.backgroundImage = `url("${painting}")`;
}

function initFooter(activePage) {
    const painting = paintingDetails[activePage || 'home'];
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="social-links">
            <a href="https://twitter.com/funplings" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="https://instagram.com/funplings" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://youtube.com/@funplings" target="_blank"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://letterboxd.com/glasshalftrue/" target="_blank"><i class="fa-brands fa-letterboxd"></i></a>
            <a href="mailto:matthew.guo@gmail.com"><i class="fa-regular fa-envelope"></i></a>
        </div>
        <a class="painting-credit" href="${painting.href}" target="_blank" rel="noopener">
            <span class="painting-credit__title"><i>${painting.title}</i>, ${painting.year}</span>
            <span>${painting.artist}</span>
            <span>${painting.medium}</span>
        </a>
    `;
    document.body.appendChild(footer);
}

function initHeader(activePage) {
    activePage = activePage || 'home';
    initPaintingBackground(activePage);

    document.querySelectorAll('.project-frame--acacia, .showcase-frame.project-frame--acacia').forEach(frame => {
        if (!frame.querySelector(':scope > .frame-texture-overlay')) {
            frame.insertAdjacentHTML('afterbegin', '<span class="frame-texture-overlay" aria-hidden="true"></span>');
        }
    });

    const rolesHTML = roles.map(role => {
        const active = role.id === activePage ? ' class="active" aria-current="page"' : '';
        return `<a href="${role.href}"${active}>${role.label}</a>`;
    }).join('');

    initFooter(activePage);
    document.getElementById('site-header').innerHTML = `
        <h1>Matthew Guo</h1>
        <p class="roles">${rolesHTML}</p>
    `;
}
