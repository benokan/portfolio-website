import Experience from "./components/Experience";
import Glow from "./components/Glow";
import Projects from "./components/Projects";
import Section from "./components/Section";
import Sidebar from "./components/Sidebar";
import { about } from "./content";

const App = () => (
  <>
    <Glow />
    <div className='fade-in relative z-10 mx-auto max-w-[1100px] px-6 md:px-12 lg:flex lg:justify-between lg:gap-16 lg:px-16'>
      <Sidebar />
      <main className='pb-16 lg:w-[56%] lg:py-24'>
        <Section id='about' title='About'>
          <p className='text-[17px] leading-relaxed text-soft'>{about}</p>
        </Section>
        <Experience />
        <Projects />
      </main>
    </div>
  </>
);

export default App;
