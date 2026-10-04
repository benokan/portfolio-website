const Section = ({ id, title, children }) => (
  <section
    id={id}
    aria-label={title}
    className='mb-20 scroll-mt-16 lg:mb-32 lg:scroll-mt-24'
  >
    <h2 className='section-heading'>{title}</h2>
    {children}
  </section>
);

export default Section;
