# Matthew Guo’s Portfolio

This repository contains the source for [Matthew Guo’s portfolio](https://funplings.github.io/).

The site presents illustration, software, games, writing, and film work in a gallery-inspired design. Each section uses frames and materials suited to its medium.

## Technology

The site uses static HTML, shared CSS, and plain browser JavaScript. It has no package manager, build command, or production application server.

GitHub Pages publishes the files from this repository.

## Local preview

1. Clone the repository.
2. Run the preview server from the repository root:

   ```sh
   python3 dev-server.py
   ```

3. Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in a browser.

The preview server reloads the browser when a site file changes.

## Main files

| File | Purpose |
| --- | --- |
| `index.html` | Biography and selected work |
| `illustrator.html` | Commissioned and personal artwork |
| `software-engineer.html` | Software projects |
| `game-developer.html` | Fan projects and original games |
| `writer.html` | Selected essays |
| `filmmaker.html` | Animation and live-action work |
| `tastemaker.html` | Book and media recommendations |
| `styles.css` | Shared site styles |
| `project-frames.css` | Shared project-preview frames |
| `header.js` | Shared header, footer, and painting backgrounds |

Images, textures, portrait files, and frame files are in `src/assets/images/`.

## Development notes

Read [`AGENTS.md`](AGENTS.md) before you change the site. It documents the page structure, style ownership, design rules, and validation process.
