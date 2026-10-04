import { useAiMode } from "../aiMode";

const AiToggle = () => {
  const { ai, setAi } = useAiMode();

  return (
    <button
      type="button"
      onClick={() => setAi(!ai)}
      aria-pressed={ai}
      title={ai ? "Turn AI mode off" : "Turn AI mode on"}
      data-umami-event={ai ? "ai-mode-off" : "ai-mode-on"}
      className="ai-toggle shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      ✨ AI it up?
    </button>
  );
};

export default AiToggle;
