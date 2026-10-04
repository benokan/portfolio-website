import { projects } from "../content";
import Section from "./Section";

const Projects = () => (
  <Section id='work' title='Selected work'>
    <ul className='rows space-y-12'>
      {projects.map((project) => (
        <li key={project.name} className='row sm:grid sm:grid-cols-[9.5rem_1fr] sm:gap-6'>
          <p className='mt-1 text-xs font-medium uppercase tracking-wide text-muted sm:whitespace-nowrap'>
            {project.kind}
          </p>
          <div className='mt-2 sm:mt-0'>
            <h3 className='font-medium'>
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='row-link row-title'
              >
                {project.name}{" "}
                <span className='arrow' aria-hidden='true'>
                  ↗
                </span>
              </a>
            </h3>
            <p className='mt-2 text-[15px] leading-relaxed text-soft'>
              {project.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </Section>
);

export default Projects;
