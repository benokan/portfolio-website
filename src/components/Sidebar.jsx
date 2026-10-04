import { links, profile, sections } from "../content";
import useActiveSection from "../hooks/useActiveSection";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";

const sectionIds = sections.map((section) => section.id);
const icons = { LinkedIn: LinkedInIcon, GitHub: GitHubIcon };

const Sidebar = () => {
  const active = useActiveSection(sectionIds);

  return (
    <header className='pt-16 pb-12 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-24'>
      <div>
        <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>
          {profile.name}
        </h1>
        <p className='mt-4 max-w-xs text-lg leading-snug text-soft'>
          {profile.tagline}
        </p>
        <p className='mt-3 text-sm text-muted'>{profile.location}</p>

        <nav aria-label='Sections' className='mt-16 hidden lg:block'>
          <ul>
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`nav-link ${isActive ? "is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className='nav-line' aria-hidden='true' />
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className='mt-8 flex items-center gap-5'>
        {links.map((link) => {
          const Icon = icons[link.label];
          return (
            <a
              key={link.label}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={link.label}
              title={link.label}
              className='icon-link'
            >
              <Icon />
            </a>
          );
        })}
        <span className='h-5 w-px bg-line' aria-hidden='true' />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Sidebar;
