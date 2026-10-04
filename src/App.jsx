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
