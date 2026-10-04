import { experience } from "../content";
import AiText from "./AiText";
import Section from "./Section";

const Experience = () => (
  <Section id='experience' title='Experience'>
    <ol className='rows space-y-12'>
      {experience.map((job) => (
        <li key={job.company} className='row sm:grid sm:grid-cols-[9.5rem_1fr] sm:gap-6'>
          <p className='mt-1 text-xs font-medium uppercase tracking-wide text-muted sm:whitespace-nowrap'>
            {job.period}
          </p>
          <div className='mt-2 sm:mt-0'>
            <h3 className='row-title font-medium'>
              <AiText text={job.role} density={0.3} /> <span className='text-muted'>· {job.company}</span>
            </h3>
            <p className='mt-2 text-[15px] leading-relaxed text-soft'>
              <AiText text={job.summary} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;
