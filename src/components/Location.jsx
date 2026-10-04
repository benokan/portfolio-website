import { useEffect, useRef } from "react";

import { profile } from "../content";

// Inline SVG rather than the 🇮🇹 emoji, which Windows renders as plain "IT".
const ItalianFlag = () => (
  <svg viewBox='0 0 3 2' width='18' height='12' className='flag' aria-hidden='true'>
    <rect width='1' height='2' x='0' fill='#009246' />
    <rect width='1' height='2' x='1' fill='#f4f5f0' />
    <rect width='1' height='2' x='2' fill='#ce2b37' />
  </svg>
);

// Plays the "attenzione pickpocket" clip while hovered (or on tap). Browsers
// only allow audio after the visitor has clicked or tapped the page once, so
// a blocked play() is expected and silently ignored.
const Location = () => {
  const audio = useRef(null);

  const getAudio = () => {
    if (!audio.current) {
      audio.current = new Audio(profile.locationSound);
      audio.current.volume = 0.6;
    }
    return audio.current;
  };

  const play = () => {
    getAudio().play().catch(() => {});
  };

  const stop = () => {
    if (!audio.current) return;
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  // Mouse: hover plays, leaving stops, and a click starts it if the browser
  // blocked the hover attempt. Touch: there is no hover, so a tap toggles.
  // Pointer types keep a tap's emulated mouseenter from starting the clip
  // only for the tap's click to stop it again.
  const onPointerEnter = (event) => {
    if (event.pointerType === "mouse") play();
  };

  const onPointerLeave = (event) => {
    if (event.pointerType === "mouse") stop();
  };

  const onPointerUp = (event) => {
    if (event.pointerType === "mouse") play();
    else if (audio.current && !audio.current.paused) stop();
    else play();
  };

  useEffect(() => stop, []);

  return (
    <p
      className='location mt-3 inline-flex items-center gap-2 text-sm text-muted'
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
    >
      <ItalianFlag />
      {profile.location}
    </p>
  );
};

export default Location;
