# Working on Matthew Guo’s portfolio

## Scope and working approach

This repository contains Matthew Guo’s personal portfolio. The site combines an art gallery atmosphere with physical frames for different creative media.

- Preserve manual edits and existing uncommitted work.
- Read the relevant HTML and shared styles before each change.
- Keep changes local to the requested behavior.
- Use the existing HTML, CSS, and JavaScript structure.
- Do not introduce a framework, package manager, or build system for routine changes.
- Keep this guide current when the architecture or shared design rules change.
- Treat current source files and later user instructions as authoritative when this guide becomes stale.

## Runtime and page structure

The site uses static HTML pages, shared CSS, and plain browser JavaScript. There is no application server, package manifest, bundler, or compilation step.

Each public page loads `styles.css`. Most project pages also load `project-frames.css` after it. Inline `<style>` blocks define page-specific layouts and can override shared declarations.

The usual page structure contains:

1. A `.container` with an empty `#site-header` element.
2. A `.works-section` with the page content and an inner `.container`.
3. Optional modal markup and page-specific scripts.
4. A `header.js` script and a call to `initHeader(pageId)`.

`header.js` generates the header, footer, background painting, and SVG filter definitions. Shared elements therefore require JavaScript.

### Page map

| File | Purpose | Important local code |
| --- | --- | --- |
| `index.html` | Biography and selected work | Profile layout, portrait frame, showcase layout, and responsive overrides |
| `illustrator.html` | Commissioned and personal artwork | Artwork columns, image modal, and modal event listeners |
| `software-engineer.html` | Software projects | Software list layout and thumbnail variants |
| `game-developer.html` | Fan projects and original games | Game list layout and cartridge markup |
| `writer.html` | Selected Substack essays | Writing entries and local thumbnail spacing |
| `filmmaker.html` | Animation and live action | Film categories and embedded YouTube players |
| `tastemaker.html` | Books and other recommendations | Extensive local styles, book modal, and writing modal |

The header navigation contains home, illustrations, projects, games, writing, and films. `tastemaker.html` exists but has no entry in that navigation.

`_cmp.html` is a visual comparison page, not a primary portfolio route. The literal file `styles.css?v=paintings-6` is a separate file, not the active shared stylesheet.

- Edit `styles.css` for shared styles.
- Do not use the comparison page or old stylesheet copy as the source of truth.

## Shared JavaScript: `header.js`

The `roles` array defines navigation labels, destinations, and active page IDs. `pagePaintings` maps each page ID to a background image. `paintingDetails` supplies the footer credit and its external link.

`initPaintingBackground()` adds a page class and the fixed painting layers. Its page classes use the form `.page-illustrator` or `.page-game-developer`.

`initHeader()` adds the shared SVG filter once. It also adds texture overlays to acacia frames, creates the footer, and inserts the header markup.

The header order is:

1. The name, Matthew Guo.
2. Centered social links.
3. A horizontal divider.
4. Centered navigation labels.

`initFooter()` inserts only the painting credit. The footer has no social links or horizontal divider.

Font Awesome loads from a CDN through `header.js`. Google Fonts loads through the HTML head of each page.

### Adding a page

1. Reuse the shared header placeholder and content structure.
2. Choose a page ID.
3. Add its painting path to `pagePaintings`.
4. Add complete painting metadata to `paintingDetails`.
5. If the page belongs in navigation, add its entry to `roles`.
6. Call `initHeader()` after the page markup exists.
7. Check the active link, painting, and credit together.

## Style ownership and cascade

### `styles.css`

This file owns the overall visual system:

- Root colors and the shared body-text shadow value.
- Body typography, heading typography, links, and added heading weight.
- Fixed painting layers, color wash, and page-specific painting treatments.
- Shared containers and the `.works-section` surface.
- Header name, social links, divider, and navigation spacing.
- Stone surfaces, carved lettering, header shadow, and footer credit.
- Artwork columns, wooden frames, frame variants, and texture overlays.
- Shared modal presentation and close controls.
- General mobile adjustments at `768px`.

The main root values include `--forest`, `--ink`, `--ink-rule`, and `--body-text-shadow`.

### `project-frames.css`

This file owns shared previews for software, games, writing, and films:

- `--project-preview-ratio`, currently `16 / 10`.
- `.project-grid`, with two desktop columns and one mobile column.
- `.monitor-frame` for software previews.
- `.cartridge-frame`, `.cartridge-label`, and `.game-thumbnail` for games.
- `.paper-frame` for writing previews.
- `.film-frame` and its thumbnail/video variants for films, with solid black borders and transparent sprocket holes.
- Project descriptions, title weight, preview sizing, focus outlines, and image hover brightness.

Later rules normalize frame dimensions and image cropping. These rules can supersede earlier component dimensions in the same file.

Game cards stay stationary on hover. Image brightness can change, but the game entry must not rise or translate.

### Page-specific styles

Each page can contain inline styles after its shared stylesheet links. The homepage and tastemaker page contain particularly substantial local styling.

- Search all matching selectors before changing a shared rule.
- Check both stylesheet order and selector specificity.
- Update the existing owning rule instead of adding repeated overrides at the file end.
- Keep a reusable frame change in the shared stylesheet.
- Keep a layout unique to one page in that page’s existing style block.

## Core aesthetic

The intended atmosphere resembles a personal gallery with tangible materials. Paintings sit behind warm cream text. Wood, paper, film, and molded plastic distinguish the work categories.

The header and footer resemble warm stone slabs. The user refers to this surface as marble. Its current implementation uses a solid, desaturated warm gray (`#ded9cf`) without a texture image. The shared `--stone` color also fills the root canvas. `overscroll-behavior: none` on `html` and `body` disables native edge bounce so it cannot expose the fixed painting.

- Preserve the warm cream, brown, and forest-green palette.
- Keep the painting visible behind the content.
- Preserve the existing artwork, aspect ratios, and intentional image crops.
- Use material-specific frames for each medium.
- Avoid generic dashboard cards, bright gradients, pill controls, and unrelated decorative elements.
- Keep text readable without flattening the textured appearance.
- Preserve restrained hover feedback and visible keyboard focus.

### Typography

The current public pages use `Sorts Mill Goudy`, with a serif fallback. Earlier conversations mention Habibi, but that name does not describe the current production declarations.

Most body text uses regular weight. Headings gain extra thickness through `-webkit-text-stroke: 0.03em currentColor` and `paint-order: stroke fill`.

`project-frames.css` also controls project-title weights and shared description sizes. The final rules in `styles.css` keep inline body emphasis at regular weight.

- Check actual font declarations before changing a font based on an older conversation.
- Preserve body copy and heading hierarchy during typography changes.

### Two separate shadow treatments

Content over paintings uses a dark shadow down and left. `--body-text-shadow` currently defines `-2px 2px 0 rgba(4, 7, 2, 0.98)`.

Ordinary content uses `text-shadow`. Weighted headings use `filter: drop-shadow(...)` with the same variable. Their own text shadows and descendant text shadows are disabled.

This separation places the heading shadow behind the complete glyph, including its added stroke. A normal text shadow can overlap the added weight.

Stone lettering uses a different effect. The `stone-incised` SVG filter shades the inner upper edge and highlights the lower lip. Its definitions live in `header.js`.

The name, navigation, social icons, and painting credit share the dark brown `#2e2418`. Their CSS selectors live near the stone and footer rules.

- Keep the body shadow separate from the carved lettering filter.
- Do not apply both text-shadow and drop-shadow to the same weighted heading.
- Do not apply a text filter to an entire content container with images.
- Preserve the strong external shadow beneath the marble header.

### Header and footer spacing

Navigation uses equal vertical padding between the divider and the lower marble edge. The current padding is `24px` on desktop and `16px` on mobile.

The header divider is `2px` thick. The footer credit sits at the right, with `24px` vertical padding on desktop and `16px` on mobile.

- Keep the social links centered directly below the name.
- Keep navigation spacing symmetric above and below the labels.
- Preserve vertical padding above the painting credit at every viewport width.
- Do not restore the removed footer divider.

## Assets and external services

Local visual assets live under `src/assets/images/`.

| Directory | Contents |
| --- | --- |
| `backgrounds/` | Page paintings |
| `textures/` | Stone, wood, paper, and other surface assets |
| `art/` | Commissioned and personal illustrations |
| `software/` | Software previews and some shared game previews |
| `game_thumbnails/` | Game images |
| `article_thumbnails/` | Essay previews |
| `films/` | Film assets |
| `books/` | Book covers |
| `arcade/`, `vines/` | Additional decorative assets |

The site also contains portrait and frame assets directly under `images/`. Some textures have accompanying prompt files.

- Preserve asset provenance files and existing credits.
- Use exact filename case in image paths.
- Check each referenced asset before removing it.
- Do not assume that an unused-looking asset is disposable.

External services supply fonts, icons, video embeds, and linked project destinations. There is no local backend for those projects.

## Local preview and validation

A plain static HTTP server can serve the repository root. No build command is required. `dev-server.py` provides a Python standard-library preview with automatic browser refresh when HTML, CSS, JavaScript, or assets change. It injects its reload script only into local HTTP responses and disables local caching; published files are unchanged.

The existing preview often uses `http://127.0.0.1:8000/`. `.claude/launch.json` separately defines an `npx serve` preview on port `4173`.

1. Reuse the current preview server when it is available.
2. Otherwise, run `python3 dev-server.py` from the repository root for automatic refresh on port 8000.
3. Open the affected page through the local server.
4. Check a desktop viewport and a mobile viewport near `390px` wide.
5. Check the complete header and footer after shared layout changes.
6. Check one representative project from each affected frame category.
7. Check hover, keyboard focus, and relevant modal behavior after interaction changes.
8. Run `node --check header.js` after shared JavaScript changes.
9. Run `git diff --check` before delivery.

For small visual changes, browser inspection is more useful than tests that merely repeat CSS declarations. This repository has no automated test suite.

Public pages use version query strings on shared CSS and JavaScript URLs. These strings control browser caching, not filenames.

- Update shared asset versions consistently across public HTML pages after relevant changes.
- Do not create files named after versioned URLs.
- Preserve existing local changes when reviewing the final diff.

## Hosting

The observed public site uses GitHub Pages at `https://funplings.github.io/`. Local edits do not publish themselves through a build step in this repository.

- Leave unrelated workflows and local editor configuration unchanged during visual work.
- Follow the user’s deployment request and the repository’s actual hosting configuration before publishing changes.
