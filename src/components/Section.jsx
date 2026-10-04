import { useAiMode } from "../aiMode";

const Section = ({ id, title, children }) => {
  const { ai } = useAiMode();

  return (
    <section
      id={id}
      aria-label={title}
      className='mb-20 scroll-mt-16 lg:mb-32 lg:scroll-mt-24'
    >
      <h2 className='section-heading'>{ai ? `AI ${title} AI` : title}</h2>
      {children}
    </section>
  );
};

export default Section;
