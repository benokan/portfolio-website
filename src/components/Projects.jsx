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
