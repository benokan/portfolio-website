import { useEffect, useRef } from "react";

// A faint light that follows the mouse. Only runs with a fine pointer and
// when the visitor has not asked for reduced motion; CSS hides it otherwise.
const Glow = () => {
  const ref = useRef(null);

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!query.matches) return undefined;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      ref.current?.style.setProperty("--x", `${x}px`);
      ref.current?.style.setProperty("--y", `${y}px`);
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={ref} className='glow' aria-hidden='true' />;
};

export default Glow;
