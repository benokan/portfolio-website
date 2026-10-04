import { useState } from "react";

// A tribute to the early 2000s desktop dancers: a little character with no
// window around it, grooving along the bottom of the screen with an AI sign.
// Click it for a spin.
//
// The figure is a simple skeleton: each limb is a group nested inside its
// parent (hips > torso > upper arm > forearm), so a joint's rotation carries
// everything below it. Each group rotates around its joint, set with
// transform-origin in SVG units; the moves live in index.css.

const ink = "#1a1033";
const suit = "url(#ai-d-suit)";
const pants = "url(#ai-d-pants)";
const skin = "#f1c27d";

const joint = (x, y) => ({ transformOrigin: `${x}px ${y}px` });

const Leg = ({ side, x }) => (
  <g className={`ai-d-thigh-${side}`} style={joint(x, 142)}>
    <rect x={x - 7} y='138' width='14' height='50' rx='7' fill={pants} stroke={ink} strokeWidth='1.5' />
    <g className={`ai-d-shin-${side}`} style={joint(x, 186)}>
      <rect x={x - 6} y='182' width='12' height='47' rx='6' fill={pants} stroke={ink} strokeWidth='1.5' />
      <ellipse cx={side === "l" ? x - 3 : x + 3} cy='230' rx='11' ry='5' fill='#fff' stroke={ink} strokeWidth='1.5' />
    </g>
  </g>
);

const AiDancer = () => {
  const [spin, setSpin] = useState(false);

  return (
    <div className='ai-dancer-track' aria-hidden='true'>
      <div
        className={`ai-dancer ${spin ? "is-spinning" : ""}`}
        onClick={() => {
          if (spin) return;
          setSpin(true);
          setTimeout(() => setSpin(false), 700);
        }}
      >
        <span className='ai-dancer-note'>♪</span>
        <span className='ai-dancer-note ai-dancer-note--late'>♫</span>

        <svg viewBox='-10 -70 180 310' className='ai-dancer-svg'>
          <defs>
            <linearGradient id='ai-d-suit' x1='0' y1='0' x2='1' y2='1'>
              <stop offset='0%' stopColor='#ff3fd1' />
              <stop offset='55%' stopColor='#8c50ff' />
              <stop offset='100%' stopColor='#00d4ff' />
            </linearGradient>
            <linearGradient id='ai-d-pants' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#6d28d9' />
              <stop offset='100%' stopColor='#1e3a8a' />
            </linearGradient>
          </defs>
          <ellipse className='ai-d-shadow' cx='80' cy='234' rx='30' ry='5' fill='rgba(0,0,0,0.35)' />

          <g className='ai-d-hips'>
            <Leg side='l' x={72} />
            <Leg side='r' x={88} />
            <rect x='63' y='130' width='34' height='18' rx='7' fill={pants} stroke={ink} strokeWidth='1.5' />

            <g className='ai-d-torso' style={joint(80, 140)}>
              {/* Jacket */}
              <path
                d='M60 98 Q60 92 68 92 L92 92 Q100 92 100 98 L96 136 Q96 140 92 140 L68 140 Q64 140 64 136 Z'
                fill={suit}
                stroke={ink}
                strokeWidth='1.5'
              />
              <line x1='80' y1='93' x2='80' y2='139' stroke='#c4b5fd' strokeWidth='1.5' />
              <rect x='75' y='82' width='10' height='12' fill={skin} stroke={ink} strokeWidth='1.5' />

              <g className='ai-d-head' style={joint(80, 90)}>
                <ellipse cx='80' cy='70' rx='13' ry='15' fill={skin} stroke={ink} strokeWidth='1.5' />
                <path d='M66 70 Q65 52 80 53 Q95 52 94 70 Q90 60 80 61 Q70 60 66 70 Z' fill='#3b2314' />
                <rect x='67' y='66' width='26' height='7' rx='3' fill='#111' />
                <rect x='70' y='67' width='6' height='2' rx='1' fill='#5eead4' />
                <path d='M74 78 Q80 83 86 78' stroke={ink} strokeWidth='2' fill='none' strokeLinecap='round' />
              </g>

              {/* Free arm: grooves, then throws a fist pump. Drawn over the jacket so the
                  hand stays in front of the body when it swings across. */}
              <g className='ai-d-upper-l' style={joint(62, 100)}>
                <rect x='56' y='95' width='12' height='38' rx='6' fill={suit} stroke={ink} strokeWidth='1.5' />
                <g className='ai-d-fore-l' style={joint(62, 130)}>
                  <rect x='57' y='126' width='10' height='33' rx='5' fill={suit} stroke={ink} strokeWidth='1.5' />
                  <circle cx='62' cy='162' r='6' fill={skin} stroke={ink} strokeWidth='1.5' />
                </g>
              </g>

              {/* Sign arm: holds the AI sign up high and waves it */}
              <g className='ai-d-upper-r' style={joint(98, 100)}>
                <rect x='92' y='95' width='12' height='38' rx='6' fill={suit} stroke={ink} strokeWidth='1.5' />
                <g className='ai-d-fore-r' style={joint(98, 130)}>
                  <rect x='93' y='126' width='10' height='33' rx='5' fill={suit} stroke={ink} strokeWidth='1.5' />
                  {/* Drawn hanging down, so the sign is flipped to read upright once raised */}
                  <rect x='96.5' y='152' width='3' height='62' fill='#a16207' stroke={ink} strokeWidth='1' />
                  <g transform='rotate(180 98 232)'>
                    <rect x='62' y='210' width='72' height='44' rx='3' fill='#fff' stroke={ink} strokeWidth='2.5' />
                    <text x='98' y='245' textAnchor='middle' fontSize='34' fontWeight='900' fill='#ff1f8e' fontFamily='Impact, Arial Black, sans-serif'>
                      AI
                    </text>
                    <text x='67' y='224' fontSize='10'>✨</text>
                    <text x='120' y='250' fontSize='10'>✨</text>
                  </g>
                  <circle cx='98' cy='162' r='6' fill={skin} stroke={ink} strokeWidth='1.5' />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default AiDancer;
