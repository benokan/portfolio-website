import { useCallback, useEffect, useRef, useState } from "react";
import { pick, prefersReducedMotion, useAiMode } from "../aiMode";
import AiDancer from "./AiDancer";

// Fewer popups on smaller screens so they stay readable. Checked on every
// spawn, so it follows window resizes.
const maxBanners = () => {
  if (window.matchMedia("(max-width: 639px)").matches) return 3;
  if (window.matchMedia("(max-width: 1023px)").matches) return 4;
  return 7;
};

const messages = [
  ["🚨 BREAKING", "This portfolio is now AI-native."],
  [
    "Upgrade to Pro",
    "Only $500 per month, since governments do not tax you enough!",
  ],
  ["💸 Billing alert", "Rug pulled on token usage?"],
  ["Funding news", "Local potato farmer raises $40M to put an LLM inside every potato."],
  ["Heads up", "We noticed you are not using AI. Is everything okay?"],
  ["🍪 AI Cookies", "We use AI to decide which cookies you accepted."],
  ["Status", "Hallucinating your work experience... done."],
  [
    "Model update",
    "Now powered by GPT-TerraLuna-oO0.uWu-7.5-turbo-preview-banned.",
  ],
  [
    "Rate limited",
    "You have used 3 of your 3 messages this week. Come back Tuesday.",
  ],
  ["Silent update", "We quietly made the model dumber. You are imagining it."],
  [
    "Deprecation notice",
    "The model your whole startup depends on retires tomorrow <3",
  ],
  ["Incident report", "Degraded performance. Root cause: vibes."],
  [
    "Agentic",
    "An agent has been dispatched to read this for you. It deleted prod.",
  ],
  [
    "🧠 Brain offload",
    "Why think when a model can think for you? Thinking is deprecated.",
  ],
  [
    "Tip of the day",
    "Don't remember things. Just ask again. And again. And again.",
  ],
  [
    "Productivity",
    "You have not had an original thought in 47 days. Great job!",
  ],
  [
    "Wellness check",
    "Feeling forgetful? Our AI forgot what you asked too. Perfect match!",
  ],
  ["Context window", "100% full. Of AI."],
  ["Investor update", "We pivoted. We are now an AI company."],
  [
    "You are completely right!",
    "Executing 'rm rf *' was a bad decision. My bad <3",
  ],
];

const ctas = [
  "Accept AI",
  "Yes, more AI",
  "I love AI",
  "Enable AI",
  "Accept all AI",
];
const declines = ["No thanks", "Less AI please", "Remind me never"];
const variants = ["gradient", "terminal", "warning", "retro", "glass"];

const ticker =
  "AI AI AI ▲ NVDA +∞% ◆ AI AI AI ◆ AGI SOON ◆ AI AI ◆ YOUR JOB: AI ◆ THINKING: DEPRECATED ◆ BRAIN: OPTIONAL ◆ AI AI AI AI ◆ SERIES AI ◆ AI ◆ ";

let nextId = 0;

// Tries a few random spots and keeps the one farthest from the popups already
// on screen, so they overlap less and stay readable.
const freeSpot = (existing) => {
  let best = { x: Math.random(), y: Math.random() };
  let bestGap = -1;
  for (let i = 0; i < 12; i++) {
    const x = Math.random();
    const y = Math.random();
    const gap = Math.min(
      Infinity,
      ...existing.map((b) => Math.hypot(b.x - x, (b.y - y) * 1.5)),
    );
    if (gap > bestGap) {
      best = { x, y };
      bestGap = gap;
    }
  }
  return best;
};

const makeBanner = (existing) => {
  const [title, body] = pick(messages);
  return {
    id: nextId++,
    title,
    body,
    cta: pick(ctas),
    decline: pick(declines),
    variant: pick(variants),
    ...freeSpot(existing),
    rot: (Math.random() - 0.5) * 6,
  };
};

const Banner = ({ banner, onClose, onDecline, onHold }) => (
  <div
    role="alert"
    onPointerEnter={() => onHold(banner.id, true)}
    onPointerLeave={() => onHold(banner.id, false)}
    onFocus={() => onHold(banner.id, true)}
    onBlur={() => onHold(banner.id, false)}
    className={`ai-banner ai-banner--${banner.variant}`}
    style={{
      left: `calc((100% - min(340px, 88vw)) * ${banner.x})`,
      top: `calc((100% - 230px) * ${banner.y} + 48px)`,
      "--rot": `${banner.rot}deg`,
    }}
  >
    <button
      type="button"
      className="ai-banner-close"
      aria-label="Close"
      onClick={onClose}
    >
      ✕
    </button>
    <p className="ai-banner-title">{banner.title}</p>
    <p className="ai-banner-body">{banner.body}</p>
    <div className="ai-banner-actions">
      <button type="button" className="ai-banner-cta" onClick={onClose}>
        {banner.cta}
      </button>
      <button type="button" className="ai-banner-decline" onClick={onDecline}>
        {banner.decline}
      </button>
    </div>
  </div>
);

// Everything loud about AI mode: the ticker, the popups that keep coming back,
// the cursor trail and the occasional AGI announcement.
const AiChaos = () => {
  const { setAi } = useAiMode();
  const [banners, setBanners] = useState([]);
  const [agi, setAgi] = useState(false);
  const trailRef = useRef(null);
  // Popup being read (hovered or focused). While set, nothing new spawns and
  // that popup is never pushed out.
  const heldRef = useRef(null);

  const spawn = useCallback((count = 1) => {
    setBanners((list) => {
      let next = list;
      for (let i = 0; i < count; i++) next = [...next, makeBanner(next)];
      const max = maxBanners();
      while (next.length > max) {
        const oldest = next.findIndex((b) => b.id !== heldRef.current);
        next = next.filter((_, i) => i !== oldest);
      }
      return next;
    });
  }, []);

  const hold = (id, on) => {
    if (on) heldRef.current = id;
    else if (heldRef.current === id) heldRef.current = null;
  };

  const close = (id) => {
    hold(id, false);
    setBanners((list) => list.filter((b) => b.id !== id));
  };

  // Declining is not an option: closing one spawns two more.
  const decline = (id) => {
    close(id);
    spawn(2);
  };

  // Popups on a random schedule.
  useEffect(() => {
    let timer;
    const loop = () => {
      if (heldRef.current === null) spawn();
      timer = setTimeout(loop, 1200 + Math.random() * 2200);
    };
    timer = setTimeout(loop, 600);
    return () => clearTimeout(timer);
  }, [spawn]);

  // AGI gets "achieved" every 15 to 30 seconds.
  useEffect(() => {
    let timer;
    let hide;
    const loop = () => {
      setAgi(true);
      hide = setTimeout(() => setAgi(false), 1600);
      timer = setTimeout(loop, 15000 + Math.random() * 15000);
    };
    timer = setTimeout(loop, 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hide);
    };
  }, []);

  // Cursor trail of little AIs. Plain DOM nodes to keep React out of the hot path.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const layer = trailRef.current;
    let last = 0;

    const onMove = (event) => {
      const now = performance.now();
      if (now - last < 45 || layer.childElementCount > 40) return;
      last = now;
      const dot = document.createElement("span");
      dot.className = "ai-trail";
      dot.textContent = Math.random() < 0.15 ? "✨" : "AI";
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      dot.style.setProperty("--hue", `${Math.floor(Math.random() * 360)}`);
      dot.addEventListener("animationend", () => dot.remove());
      layer.appendChild(dot);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      layer.replaceChildren();
    };
  }, []);

  // Escape always gets you out.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setAi(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setAi]);

  return (
    <>
      <div className="ai-ticker" aria-hidden="true">
        <div className="ai-ticker-track">
          <span>{ticker.repeat(4)}</span>
          <span>{ticker.repeat(4)}</span>
        </div>
      </div>

      <div ref={trailRef} className="ai-trail-layer" aria-hidden="true" />

      <div className="ai-banner-layer">
        {banners.map((banner) => (
          <Banner
            key={banner.id}
            banner={banner}
            onClose={() => close(banner.id)}
            onDecline={() => decline(banner.id)}
            onHold={hold}
          />
        ))}
      </div>

      {agi && (
        <div className="ai-agi" aria-hidden="true">
          <p>AGI ACHIEVED</p>
          <p className="ai-agi-sub">(internally)</p>
        </div>
      )}

      <AiDancer />

      <button
        type="button"
        className="ai-exit"
        onClick={() => setAi(false)}
        data-umami-event="ai-mode-exit"
      >
        Make it stop (Esc)
      </button>
    </>
  );
};

export default AiChaos;
