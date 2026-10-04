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
