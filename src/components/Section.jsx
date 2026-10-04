const Section = ({ title, children }) => (
  <section className='mt-14'>
    <h2 className='text-sm font-medium uppercase tracking-wider text-muted'>
      {title}
    </h2>
    <div className='mt-5'>{children}</div>
  </section>
);

export default Section;
