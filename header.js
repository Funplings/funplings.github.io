// Inject Font Awesome
const fa = document.createElement('link');
fa.rel = 'stylesheet';
fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
document.head.appendChild(fa);

const roles = [
    { id: 'illustrator',     label: 'illustrator',      href: 'illustrator.html' },
    { id: 'software-engineer', label: 'software engineer', href: 'software-engineer.html' },
    { id: 'game-developer',  label: 'game developer',  href: 'game-developer.html' },
    { id: 'writer',          label: 'writer',           href: 'writer.html' },
    { id: 'filmmaker',       label: 'filmmaker',        href: 'filmmaker.html' },
    { id: 'tastemaker',      label: 'tastemaker',       href: 'tastemaker.html' },
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

const frameVariants = [
    '',
    'project-frame--black',
    'project-frame--white',
    'project-frame--acacia',
];

function assignFrameVariants() {
    const frames = [...document.querySelectorAll('.project-frame, .showcase-frame')];

    const hashString = value => {
        let hash = 2166136261;
        for (let index = 0; index < value.length; index++) {
            hash ^= value.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    };

    const seededRandom = seed => {
        let value = seed;
        return () => {
            value += 0x6d2b79f5;
            let result = value;
            result = Math.imul(result ^ (result >>> 15), result | 1);
            result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
            return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
        };
    };

    const variants = frames.map((_, index) => frameVariants[index % frameVariants.length]);
    const pageSeed = hashString(`${window.location.pathname}:${frames.map(frame => frame.querySelector('img')?.getAttribute('src') || '').join('|')}`);
    const random = seededRandom(pageSeed);

    for (let index = variants.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(random() * (index + 1));
        [variants[index], variants[swapIndex]] = [variants[swapIndex], variants[index]];
    }

    frames.forEach((frame, index) => {
        frame.classList.remove(...frameVariants.filter(Boolean));
        if (variants[index]) {
            frame.classList.add(variants[index]);
        }
    });
}

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
        <a class="painting-credit" href="${painting.href}" target="_blank" rel="noopener">
            <span class="painting-credit__title"><i>${painting.title}</i>, ${painting.year}</span>
            <span>${painting.artist}</span>
            <span>${painting.medium}</span>
        </a>
    `;
    document.body.appendChild(footer);
}

function initHeader(activePage) {
    initPaintingBackground(activePage);
    assignFrameVariants();

    const rolesHTML = roles.map((role, i) => {
        const active = role.id === activePage ? ' class="active"' : '';
        const sep = i < roles.length - 1 ? '<span class="sep">/</span>' : '';
        return `<a href="${role.href}"${active}>${role.label}</a>${sep}`;
    }).join('');

    initFooter(activePage);
    document.getElementById('site-header').innerHTML = `
        <div class="social-links">
            <a href="https://twitter.com/funplings" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="https://instagram.com/funplings" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://youtube.com/@funplings" target="_blank"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://letterboxd.com/glasshalftrue/" target="_blank"><i class="fa-brands fa-letterboxd"></i></a>
            <a href="mailto:matthew.guo@gmail.com"><i class="fa-regular fa-envelope"></i></a>
        </div>
        <h1><a href="index.html">MATTHEW GUO</a></h1>
        <p class="roles">${rolesHTML}</p>
    `;
}
