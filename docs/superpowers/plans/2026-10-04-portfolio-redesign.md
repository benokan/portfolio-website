# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3D portfolio with a simple, professional one-page card (light by default, dark toggle, LinkedIn/GitHub contact only).

**Architecture:** A single React page composed of small presentational components. All copy lives in `src/content.js`; components only render it. Theme is a `dark` class on `<html>` (Tailwind `darkMode: "class"`), applied by an inline script in `index.html` before React mounts and toggled by `ThemeToggle`.

**Tech Stack:** React 18, Vite 4, Tailwind CSS 3, Inter (Google Fonts). No other runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-10-04-portfolio-redesign-design.md`

## Global Constraints

- Branch: `dev`. Coolify config unchanged: build `npm run build`, publish directory `/dist`.
- Runtime dependencies after this plan: exactly `react`, `react-dom`.
- No Three.js, no EmailJS, no router, no animation libraries.
- Default theme is light, regardless of OS preference. Stored key: `localStorage.theme` = `"light"` | `"dark"`.
- Every `localStorage` access is wrapped in `try/catch`.
- Copy is understated and factual: no "let's work together", no "I built X myself / end to end / single-handedly". Use the spec's copy verbatim.
- External links open in a new tab with `rel="noopener noreferrer"`.
- Layout must work at 360px wide with no horizontal scroll.
- No test framework is added (spec: out of scope). Each task is verified by build + targeted checks listed in its steps.
- Every commit message ends with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Storage blocked or corrupted** (private mode, `localStorage.theme = "purple"`): page renders light, toggle still switches theme for the session, no console error. → Task 2, Step 4.
2. **OS set to dark mode, first visit**: page still renders light (spec says light by default). → Task 2, Step 4.
3. **Reload after choosing dark**: no white flash before React mounts. → Task 2, Step 4.
4. **Phone width (360px) with long words/URLs**: nothing overflows horizontally. → Task 1, Step 6.
5. **Reduced motion enabled**: fade-in does not play. → Task 1, Step 6.

---

### Task 1: New single-page layout, remove the old site

Old components import the dependencies being removed, so the rewrite and the removal ship together.

**Files:**
- Create: `src/content.js`, `src/components/Section.jsx`, `src/components/Experience.jsx`, `src/components/Projects.jsx`
- Modify: `src/App.jsx`, `src/index.css`, `src/main.jsx` (unchanged content, verify only), `index.html`, `tailwind.config.js`, `package.json`, `package-lock.json`
- Delete: `src/components/{About,Contact,Experience,Hero,Loader,Navbar,Tech,Works}.jsx` (old versions), `src/components/index.js`, `src/components/canvas/`, `src/hoc/`, `src/utils/`, `src/styles.js`, `src/constants/`, `tailwind.config.cjs`

**Interfaces:**
- Produces: `src/content.js` exports `profile`, `about`, `experience`, `projects`, `links` (shapes below). `Section({ title, children })`. `Experience()` and `Projects()` take no props. `App` renders a `<header className='flex items-start justify-between gap-6'>` whose only child is the name/tagline `<div>`; Task 2 appends `<ThemeToggle />` as its second child.

- [ ] **Step 1: Remove old dependencies**

```bash
npm uninstall three @react-three/fiber @react-three/drei maath framer-motion @emailjs/browser react-router-dom react-parallax-tilt react-vertical-timeline-component
```

Expected: `package.json` `dependencies` contains only `react` and `react-dom`.

- [ ] **Step 2: Delete the old components and helpers**

```bash
git rm -r -q src/components src/hoc src/utils src/styles.js src/constants tailwind.config.cjs
mkdir -p src/components
```

- [ ] **Step 3: Create `src/content.js`**

```js
export const profile = {
  name: "Benokan Kafkas",
  tagline:
    "Founding engineer and team lead at Credizen, building Zenso. Based in Rome.",
};

export const about =
  "I'm a software engineer with a background in AI. I studied Software Engineering at Izmir University of Economics and earned an MSc in Artificial Intelligence and Robotics at Sapienza University of Rome. These days I mostly work across the full stack — product, backend and infrastructure — and I enjoy taking a product from an empty repository to something people rely on.";

export const experience = [
  {
    role: "Founding Engineer, now Team Lead",
    company: "Credizen SRL",
    period: "Nov 2024 – Present",
    summary:
      "Joined as the first engineer on Zenso, a loan-matching platform for the Italian market. Now leading the engineering team as the product grows.",
  },
  {
    role: "Fullstack Developer & Data Scientist",
    company: "Deep Blue",
    period: "Sep 2022 – Nov 2024",
    summary:
      "Built web and mobile applications with Next.js, Python, MongoDB and Docker, and contributed to EU-funded data science and machine learning projects.",
  },
  {
    role: "Data Scientist & Web Developer",
    company: "The White Lion",
    period: "Jul 2020 – Sep 2022",
    summary:
      "Built the company website, a forecasting model for market trends and a real-time KPI dashboard, plus web crawling for marketing campaigns.",
  },
];

export const projects = [
  {
    name: "Zenso",
    url: "https://zensoapp.com",
    description:
      "An independent loan-matching platform for the Italian market. It compares offers from partner banks and finds a suitable personal loan in minutes.",
  },
  {
    name: "License plate detection in the wild",
    url: "https://github.com/benokan/alpr-unconstrained-py3-updated-and-optimized",
    description:
      "A Python 3 port and optimization of the ECCV 2018 work by Silva and Jung on license plate detection and recognition in unconstrained scenes.",
  },
  {
    name: "GAN music generation",
    url: "https://github.com/benokan/music-generation-with-gans",
    description:
      "A generative adversarial network that composes piano music, using temporal CNN embeddings learned from piano rolls.",
  },
];

export const links = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/benokan/" },
  { label: "GitHub", url: "https://github.com/benokan" },
];
```

- [ ] **Step 4: Create the components**

`src/components/Section.jsx`:

```jsx
const Section = ({ title, children }) => (
  <section className='mt-14'>
    <h2 className='text-sm font-medium uppercase tracking-wider text-muted'>
      {title}
    </h2>
    <div className='mt-5'>{children}</div>
  </section>
);

export default Section;
```

`src/components/Experience.jsx`:

```jsx
import { experience } from "../content";
import Section from "./Section";

const Experience = () => (
  <Section title='Experience'>
    <ul className='space-y-8'>
      {experience.map((job) => (
        <li key={job.company}>
          <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
            <h3 className='font-medium'>
              {job.role} <span className='text-muted'>· {job.company}</span>
            </h3>
            <p className='text-sm text-muted'>{job.period}</p>
          </div>
          <p className='mt-2 leading-relaxed text-soft'>{job.summary}</p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Experience;
```

`src/components/Projects.jsx`:

```jsx
import { projects } from "../content";
import Section from "./Section";

const Projects = () => (
  <Section title='Selected work'>
    <ul className='space-y-8'>
      {projects.map((project) => (
        <li key={project.name}>
          <h3 className='font-medium'>
            <a
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='link'
            >
              {project.name} <span aria-hidden='true'>↗</span>
            </a>
          </h3>
          <p className='mt-2 leading-relaxed text-soft'>
            {project.description}
          </p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Projects;
```

- [ ] **Step 5: Rewrite `App.jsx`, styles, Tailwind config and `index.html`**

`src/App.jsx`:

```jsx
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Section from "./components/Section";
import { about, links, profile } from "./content";

const App = () => (
  <div className='fade-in mx-auto max-w-[680px] px-4 py-16 sm:py-24'>
    <header className='flex items-start justify-between gap-6'>
      <div>
        <h1 className='text-3xl font-semibold tracking-tight'>
          {profile.name}
        </h1>
        <p className='mt-3 text-lg leading-relaxed text-soft'>
          {profile.tagline}
        </p>
      </div>
    </header>

    <main>
      <Section title='About'>
        <p className='leading-relaxed text-soft'>{about}</p>
      </Section>
      <Experience />
      <Projects />
    </main>

    <footer className='mt-16 flex gap-6 border-t border-line pt-8'>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target='_blank'
          rel='noopener noreferrer'
          className='link'
        >
          {link.label}
        </a>
      ))}
    </footer>
  </div>
);

export default App;
```

`tailwind.config.js` (replace whole file; the project is `"type": "module"`):

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

`src/index.css` (replace whole file). Colors are CSS variables so light/dark is one class switch:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #fafaf9;
  --text: #1c1917;
  --soft: #44403c;
  --muted: #78716c;
  --line: #e7e5e4;
  --accent: #1d4ed8;
  color-scheme: light;
}

:root.dark {
  --bg: #0c0a09;
  --text: #f5f5f4;
  --soft: #d6d3d1;
  --muted: #a8a29e;
  --line: #292524;
  --accent: #93c5fd;
  color-scheme: dark;
}

body {
  background: var(--bg);
  color: var(--text);
  overflow-wrap: anywhere;
  -webkit-font-smoothing: antialiased;
}

@layer utilities {
  .text-soft { color: var(--soft); }
  .text-muted { color: var(--muted); }
  .border-line { border-color: var(--line); }
}

.link {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 4px;
  transition: text-decoration-color 150ms;
}

.link:hover,
.link:focus-visible {
  text-decoration-color: currentColor;
}

.fade-in {
  animation: fade-in 400ms ease-out both;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .fade-in { animation: none; }
}
```

`index.html` (replace whole file; the favicon and theme script come in Tasks 2–3):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Benokan Kafkas</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

`src/main.jsx` stays as is (it imports `./App` and `./index.css`).

- [ ] **Step 6: Verify**

Run:

```bash
rm -rf node_modules && npm ci && npm run build
grep -rnE "three|framer-motion|emailjs|react-router|Tilt|VerticalTimeline" src index.html || echo "clean"
ls -la dist/assets/*.js
```

Expected: build succeeds; grep prints `clean`; the JS file is well under 200 KB.

Then `npm run preview` and open http://localhost:4173:
- All copy from the spec is present, in order: header, About, Experience, Selected work, footer.
- Every link opens the right URL in a new tab.
- DevTools device toolbar at 360px wide: no horizontal scrollbar (Review Focus 4).
- DevTools → Rendering → "Emulate prefers-reduced-motion: reduce", reload: no fade-in (Review Focus 5).
- Console has no errors.

- [ ] **Step 7: Commit**

```bash
git add -A src index.html tailwind.config.js package.json package-lock.json
git commit -m "Replace 3D portfolio with a simple one-page layout"
```

---

### Task 2: Light/dark theme toggle

**Files:**
- Create: `src/components/ThemeToggle.jsx`
- Modify: `index.html` (inline script in `<head>`), `src/App.jsx` (render toggle in header)

**Interfaces:**
- Consumes: `.dark` variables in `src/index.css` and `darkMode: "class"` from Task 1; the `<header>` flex row in `App.jsx`.
- Produces: `ThemeToggle()` (no props). Contract: `<html>` has class `dark` iff dark theme is active; `localStorage.theme` holds the last explicit choice.

- [ ] **Step 1: Add the no-flash script to `index.html`**

Insert directly after the viewport `<meta>` in `<head>`:

```html
    <script>
      try {
        if (localStorage.getItem("theme") === "dark") {
          document.documentElement.classList.add("dark");
        }
      } catch (e) {}
    </script>
```

Only the exact value `"dark"` enables dark mode; anything else (missing, corrupted, storage blocked) stays light.

- [ ] **Step 2: Create `src/components/ThemeToggle.jsx`**

```jsx
import { useState } from "react";

const SunIcon = () => (
  <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' aria-hidden='true'>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41' />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
  </svg>
);

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) {
      // Storage unavailable: theme still changes for this visit.
    }
    setDark(next);
  };

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className='shrink-0 rounded-full border border-line p-2 text-muted transition-colors hover:text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
```

- [ ] **Step 3: Render it in the header**

In `src/App.jsx`, add the import and place the toggle as the second child of `<header>`:

```jsx
import ThemeToggle from "./components/ThemeToggle";
```

```jsx
    <header className='flex items-start justify-between gap-6'>
      <div>
        {/* name + tagline unchanged */}
      </div>
      <ThemeToggle />
    </header>
```

- [ ] **Step 4: Verify**

`npm run build && npm run preview`, open http://localhost:4173:
- First visit (DevTools → Application → clear site data): light. Click toggle → dark, icon becomes a sun. Reload → still dark, **no white flash** (Review Focus 3). Toggle back → light, survives reload.
- DevTools → Rendering → "Emulate prefers-color-scheme: dark", clear site data, reload: page is **light** (Review Focus 2).
- Console: `localStorage.setItem("theme", "purple")`, reload: light, no error (Review Focus 1).
- Incognito window with third-party/site data blocked (or Console: `Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } })` then click the toggle): theme switches for the session, no uncaught error (Review Focus 1).
- Tab to the toggle with the keyboard: visible focus ring; Enter/Space toggles.
- Dark mode text is readable everywhere (header, sections, links, footer border).

- [ ] **Step 5: Commit**

```bash
git add index.html src/App.jsx src/components/ThemeToggle.jsx
git commit -m "Add light/dark theme toggle"
```

---

### Task 3: Housekeeping and asset cleanup

**Files:**
- Move: `src/assets/blogo.png` → `public/blogo.png`
- Delete: rest of `src/assets/`, `public/desktop_pc/`, `public/planet/`, `public/network/`, `public/vite.svg`
- Modify: `index.html` (favicon, meta description), `package.json` (name), `package-lock.json` (browserslist update)

**Interfaces:**
- Consumes: Task 1/2 `index.html`.
- Produces: final `index.html`.

- [ ] **Step 1: Move the favicon and remove unused assets**

```bash
git mv src/assets/blogo.png public/blogo.png
git rm -r -q src/assets public/desktop_pc public/planet public/network public/vite.svg
grep -rn "assets/" src || echo "no asset imports"
```

Expected: `no asset imports`.

- [ ] **Step 2: Add favicon and meta description to `index.html`**

After the `<title>` line:

```html
    <meta
      name="description"
      content="Benokan Kafkas — founding engineer and team lead at Credizen, building Zenso. Based in Rome."
    />
    <link rel="icon" type="image/png" href="/blogo.png" />
```

- [ ] **Step 3: Rename the package and update browserslist data**

In `package.json`, change `"name": "3dfolio"` to `"name": "portfolio-website"`, then:

```bash
npm install
npx update-browserslist-db@latest
```

- [ ] **Step 4: Verify**

```bash
rm -rf node_modules dist && npm ci && npm run build 2>&1 | tee /tmp/build.log
grep -i "browserslist" /tmp/build.log || echo "no browserslist warning"
ls dist/blogo.png
npm run dev   # check terminal output, then stop it
```

Expected: build succeeds, `no browserslist warning`, `dist/blogo.png` exists, and `npm run dev` prints no "caniuse-lite is outdated" message. In `npm run preview`, the tab shows the favicon and the Network tab has no 404s.

- [ ] **Step 5: Commit**

```bash
git add -A public src index.html package.json package-lock.json
git commit -m "Fix favicon, drop unused assets, refresh browserslist data"
```

---

### Task 4: Final check against the spec

- [ ] **Step 1: Clean build and size check**

```bash
rm -rf node_modules dist && npm ci && npm run build
du -h dist/assets/*.js
```

Expected: no ERESOLVE, no Browserslist warning, JS well under 200 KB (record the number in the PR description).

- [ ] **Step 2: Walk the spec's success criteria in `npm run preview`**

Tick each against the spec: no 3D/EmailJS/router; copy matches; toggle works, persists, no flash; favicon loads; phone width OK; no console errors.

- [ ] **Step 3: Push `dev`** (only once the user confirms)

```bash
git push origin dev
```

Coolify deploys `main`, so going live means merging `dev` → `main` via PR, as the repo already does.
