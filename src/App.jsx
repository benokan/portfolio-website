import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { AiModeContext } from "./aiMode";
import AiText from "./components/AiText";
import Experience from "./components/Experience";
import Glow from "./components/Glow";
import Projects from "./components/Projects";
import Section from "./components/Section";
import Sidebar from "./components/Sidebar";
import { about } from "./content";

const AiChaos = lazy(() => import("./components/AiChaos"));

const App = () => {
  const [ai, setAi] = useState(() =>
    new URLSearchParams(window.location.search).has("ai")
  );
  const aiMode = useMemo(() => ({ ai, setAi }), [ai]);

  useEffect(() => {
    document.documentElement.classList.toggle("ai", ai);
    const title = document.title;
    if (ai) document.title = "Benokan Kafkas AI AI AI AI";
    return () => {
      document.title = title;
    };
  }, [ai]);

  return (
    <AiModeContext.Provider value={aiMode}>
      <Glow />
      {ai && (
        <Suspense fallback={null}>
          <AiChaos />
        </Suspense>
      )}
      <div className='fade-in relative z-10 mx-auto max-w-[1100px] px-6 md:px-12 lg:flex lg:justify-between lg:gap-16 lg:px-16'>
        <Sidebar />
        <main className='pb-16 lg:w-[56%] lg:py-24'>
          <Section id='about' title='About'>
            <p className='text-[17px] leading-relaxed text-soft'>
              <AiText text={about} />
            </p>
          </Section>
          <Experience />
          <Projects />
        </main>
      </div>
    </AiModeContext.Provider>
  );
};

export default App;
