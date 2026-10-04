# Portfolio Redesign — Design Spec

Date: 2026-10-04
Branch: `dev`

## Goal

Turn the site into a **professional card**: someone who already knows Benokan's
name (a colleague, a recruiter coming from LinkedIn, a collaborator) gets a
credible picture of who Benokan is and what Benokan has built in ~30 seconds,
then finds LinkedIn. Tone is calm, factual and natural — no pitch, no "let's work
together", no list of services.

### Agreed constraints

- One page, simple, professional.
- No Three.js / 3D animations.
- No email form. Contact is LinkedIn (plus GitHub).
- Light theme by default, with a dark mode toggle.
- Stay on React + Vite + Tailwind (approach A). Coolify config is unchanged:
  build `npm run build`, publish directory `/dist`.

### Success criteria

- Page renders with no 3D, no EmailJS, no router.
- Content matches the copy below.
- Theme toggle works, persists across reloads, and does not flash the wrong
  theme on load.
- Favicon loads (no `/blogo.png` 404).
- `npm ci && npm run build` succeeds; JS bundle drops from ~1.1 MB to well
  under 200 KB.
- No Browserslist "caniuse-lite is outdated" warning.
- Readable at phone width (no horizontal scroll).

## Page layout

Single centered column, max width ~680px, generous vertical spacing. One font
(Inter, from Google Fonts), neutral palette, one muted accent for links. No
gradients, glows, tilting cards or background images. No navbar — the page is
short enough to scroll.

```
┌───────────────────────────────────────────┐
│                                   [☾ / ☀] │  theme toggle, top right
│ Benokan Kafkas                            │
│ Founding engineer and team lead at        │
│ Credizen, building Zenso. Based in Rome.  │
│                                           │
│ About                                     │
│ 2–3 sentences                             │
│                                           │
│ Experience                                │
│ Credizen SRL        Nov 2024 – Present    │
│ Deep Blue           Sep 2022 – Nov 2024   │
│ The White Lion      Jul 2020 – Sep 2022   │
│                                           │
│ Selected work                             │
│ Zenso ↗                                   │
│ License plate detection ↗                 │
│ GAN music generation ↗                    │
│                                           │
│ LinkedIn · GitHub                         │
└───────────────────────────────────────────┘
```

Motion: at most a short CSS fade-in on load, disabled under
`prefers-reduced-motion`. No animation libraries.

## Copy

### Header

**Benokan Kafkas**
Founding engineer and team lead at Credizen, building Zenso. Based in Rome.

### About

I'm a software engineer with a background in AI. I studied Software
Engineering at Izmir University of Economics and earned an MSc in Artificial
Intelligence and Robotics at Sapienza University of Rome. These days I mostly
work across the full stack — product, backend and infrastructure — and I
enjoy taking a product from an empty repository to something people rely on.

### Experience

**Founding Engineer, now Team Lead** — Credizen SRL · Nov 2024 – Present
Joined as the first engineer and built the Zenso loan application end to end.
Now leading the engineering team as the product grows.

**Fullstack Developer & Data Scientist** — Deep Blue · Sep 2022 – Nov 2024
Built web and mobile applications with Next.js, Python, MongoDB and Docker,
and contributed to EU-funded data science and machine learning projects.

**Data Scientist & Web Developer** — The White Lion · Jul 2020 – Sep 2022
Built the company website, a forecasting model for market trends and a
real-time KPI dashboard, plus web crawling for marketing campaigns.

### Selected work

**Zenso** → https://zensoapp.com
An independent loan-matching platform for the Italian market. It compares
offers from partner banks and finds a suitable personal loan in minutes. I
wrote the application and lead its engineering.

**License plate detection in the wild** →
https://github.com/benokan/alpr-unconstrained-py3-updated-and-optimized
A Python 3 port and optimization of the ECCV 2018 work by Silva and Jung on
license plate detection and recognition in unconstrained scenes.

**GAN music generation** →
https://github.com/benokan/music-generation-with-gans
A generative adversarial network that composes piano music, using temporal
CNN embeddings learned from piano rolls.

The Kaggle Pokémon classification project is dropped.

### Footer

LinkedIn → https://www.linkedin.com/in/benokan/
GitHub → https://github.com/benokan

## Theme

- Default: light.
- Toggle button (sun/moon icon, accessible label) in the top-right corner.
- Choice is stored in `localStorage` (`theme` = `light` | `dark`), with every
  read and write wrapped in try/catch so a blocked storage still renders light.
- Implemented with Tailwind `darkMode: "class"` on `<html>`.
- A small inline script in `index.html` applies the stored class before React
  loads, to avoid a flash of the wrong theme.

## Code structure

```
src/
  main.jsx
  App.jsx                 composes the sections
  index.css               Tailwind + Inter + base styles
  content.js              all copy: intro, about, experience, projects, links
  components/
    ThemeToggle.jsx
    Section.jsx           heading + children wrapper
    Experience.jsx        renders experience list from content.js
    Projects.jsx          renders projects list from content.js
```

All text lives in `content.js`, so future updates (a new job, a new project)
are data edits, not markup edits.

### Removed

- Components: `Hero`, `About`, `Tech`, `Works`, `Contact`, `Navbar`, `Loader`,
  `canvas/*`, `hoc/SectionWrapper`, `utils/motion.js`, `styles.js`,
  `constants/index.js`.
- Assets no longer referenced (3D models in `public/desktop_pc`,
  `public/planet`, `public/network`; background images; tech icons; company
  logos; project images).
- Dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `maath`,
  `framer-motion`, `@emailjs/browser`, `react-router-dom`,
  `react-parallax-tilt`, `react-vertical-timeline-component`.
- Duplicate Tailwind config: keep a single `tailwind.config.js`
  (`tailwind.config.cjs` is removed).

### Housekeeping

- Move `blogo.png` to `public/` so the favicon resolves.
- Run `npx update-browserslist-db@latest` (lockfile only).
- Rename package from `3dfolio` to `portfolio-website`.
- Add a meta description to `index.html`.

## Verification

No test suite exists and adding one is out of scope for a static page.
Verification is:

1. `rm -rf node_modules && npm ci && npm run build` succeeds with no ERESOLVE
   and no Browserslist warning; record the bundle size.
2. `npm run preview` and check in the browser: content, links, theme toggle,
   persistence after reload, no theme flash, favicon, phone-width layout,
   no console errors.
