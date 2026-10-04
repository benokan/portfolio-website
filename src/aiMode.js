import { createContext, useContext } from "react";

// Parody mode that mocks the AI hype cycle. Off by default; turned on with the
// sidebar toggle or by visiting with ?ai in the URL.
export const AiModeContext = createContext({ ai: false, setAi: () => {} });

export const useAiMode = () => useContext(AiModeContext);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const pick = (list) => list[Math.floor(Math.random() * list.length)];
