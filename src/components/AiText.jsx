import { useEffect, useMemo, useState } from "react";
import { pick, prefersReducedMotion, useAiMode } from "../aiMode";

const tokens = [
  "AI",
  "AI",
  "AI",
  "AI AI",
  "AI AI AI",
  "AI™",
  "✨AI✨",
  "(AI)",
  "AI-powered",
  "agentic",
  "GenAI",
  "AI-native",
  "LLM",
  "AI AI AI AI AI",
];

// Renders text as-is normally. In AI mode it keeps the original words but
// jams AI tokens between them, and reshuffles them every so often.
const AiText = ({ text, density = 0.35 }) => {
  const { ai } = useAiMode();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!ai || prefersReducedMotion()) return undefined;
    const id = setInterval(
      () => setTick((t) => t + 1),
      900 + Math.random() * 1200
    );
    return () => clearInterval(id);
  }, [ai]);

  const parts = useMemo(() => {
    if (!ai) return null;
    const out = [];
    text.split(" ").forEach((word, i) => {
      if (i > 0) out.push(" ");
      out.push(word);
      if (Math.random() < density) {
        out.push(" ");
        out.push(
          <span key={`ai-${i}`} className='ai-token'>
            {pick(tokens)}
          </span>
        );
      }
    });
    return out;
    // tick is a dependency so the tokens move around while the page is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai, text, density, tick]);

  return ai ? <>{parts}</> : text;
};

export default AiText;
