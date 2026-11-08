"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { couple } from "@/data/wedding";
import { Petals, Posy } from "./Decor";

gsap.registerPlugin(useGSAP);

// Wavy wax-seal outline (deterministic, so server & client markup match)
const SEAL_PATH = (() => {
  let d = "";
  const n = 96;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r = 45 + 3 * Math.sin(t * 13) + 1.4 * Math.sin(t * 5 + 1);
    d += `${i ? "L" : "M"}${(50 + r * Math.cos(t)).toFixed(2)},${(50 + r * Math.sin(t)).toFixed(2)}`;
  }
  return d + "Z";
})();

const AUTO_OPEN_AFTER = 2.6; // seconds — guests can also tap the seal

export default function Intro({ onDone }) {
  const root = useRef(null);
  const s = useRef({ opened: false, tl: null, float: null, auto: null, open: null });
  const tap = () => s.current.open?.();

  useGSAP(
    (ctx, contextSafe) => {
      const open = contextSafe(() => {
        const st = s.current;
        if (st.opened) {
          st.tl?.progress(1); // second tap skips to the site
          return;
        }
        st.opened = true;
        st.auto?.kill();
        st.float?.kill();

        st.tl = gsap
          .timeline({ defaults: { ease: "power3.inOut" }, onComplete: onDone })
          .to(".e-env", { y: 0, rotate: 0, duration: 0.3 }, 0)
          .to(".e-hint", { opacity: 0, y: 8, duration: 0.3 }, 0)
          // 2. Seal breaks
          .to(".e-seal", { scale: 1.18, duration: 0.18, ease: "power2.out" }, 0)
          .to(".e-seal", { scale: 0, rotate: 140, opacity: 0, duration: 0.5, ease: "back.in(2)" })
          // 3. Flap swings open
          .to(".e-flap", { rotateX: 180, duration: 0.9 }, "-=0.15")
          .set(".e-flap", { zIndex: 1 }, "-=0.45")
          // 4. Card slides out
          .to(".e-top", { opacity: 0, y: -24, duration: 0.6, stagger: 0.05 }, "-=0.2")
          .to(".e-card", { yPercent: -72, duration: 1.05, ease: "power3.out" }, "<")
          // 5. Envelope drops away, card comes to centre
          .to(".e-body", { y: "130%", opacity: 0, duration: 0.9, ease: "power3.in" }, "+=0.2")
          .to(".e-card", { yPercent: 0, scale: 1.1, duration: 1.1, ease: "power3.inOut" }, "<")
          .to(".e-card", { boxShadow: "0 40px 80px -30px rgba(30,47,79,0.55)", duration: 1 }, "<")
          .fromTo(".e-shine", { xPercent: -130 }, { xPercent: 330, duration: 1.1, ease: "power2.inOut" }, "-=0.3")
          .to({}, { duration: 0.6 })
          // 6. Reveal the site
          .to(".e-card", { scale: 1.25, opacity: 0, duration: 0.7, ease: "power2.in" })
          .to(root.current, { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, "-=0.35");
      });
      s.current.open = open;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.8, delay: 2.4, onComplete: onDone });
        return;
      }

      // 1. Scene arrives
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".e-posy", { scale: 0.3, opacity: 0, rotate: -20, duration: 1.1, ease: "back.out(1.7)", stagger: 0.08 })
        .from(".e-top", { y: 18, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.15)
        .from(".e-env", { y: 90, opacity: 0, rotate: -5, duration: 1.1 }, 0.25)
        .from(".e-seal", { scale: 0, rotate: -120, duration: 0.8, ease: "back.out(2.2)" }, "-=0.45")
        .from(".e-hint", { y: 10, opacity: 0, duration: 0.5 }, "-=0.2");

      // gentle floating while waiting
      s.current.float = gsap.to(".e-env", { y: -7, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.4 });
      s.current.auto = gsap.delayedCall(AUTO_OPEN_AFTER, open);
    },
    { scope: root }
  );


  return (
    <div
      ref={root}
      onClick={tap}
      className="intro hero-wash fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden px-6"
      role="dialog"
      aria-label="Welcome — tap to open your invitation"
    >
      <Petals count={6} />
      <Posy className="e-posy absolute -left-10 -top-4 h-32 w-40" />
      <Posy flip className="e-posy absolute -right-10 -top-4 h-32 w-40" />
      <div className="absolute -bottom-6 -left-10 h-32 w-40 rotate-180">
        <Posy flip className="e-posy h-full w-full" />
      </div>
      <div className="absolute -bottom-6 -right-10 h-32 w-40 rotate-180">
        <Posy className="e-posy h-full w-full" />
      </div>

      {/* Heading */}
      <p className="e-top label relative text-[10px] text-mauve">A celebration of love</p>
      <h1 className="e-top relative mt-1 font-script text-[52px] leading-tight text-ink">You&apos;re Invited</h1>

      {/* Envelope (all sizes in cqw = % of envelope width) */}
      <div className="e-env relative mt-10 w-[min(84vw,340px)] [container-type:inline-size]">
        <div className="relative h-[68cqw]" style={{ perspective: "1000px" }}>
          {/* card lives between the envelope back and the front pocket */}
          <div className="e-card absolute left-[5cqw] right-[5cqw] top-[4cqw] z-[2] h-[60cqw] overflow-hidden rounded-[2.4cqw] bg-white shadow-[0_10px_30px_-18px_rgba(30,47,79,0.5)]">
            <span className="pointer-events-none absolute inset-[2cqw] rounded-[1.6cqw] border border-gold/45" />
            <span className="pointer-events-none absolute inset-[2.8cqw] rounded-[1.2cqw] border border-sky-2/70" />
            <span className="e-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/80 to-transparent mix-blend-overlay" />
            <div className="relative flex h-full flex-col items-center justify-center px-[5cqw] text-center">
              <p className="text-[2.4cqw] font-semibold uppercase tracking-[0.3em] text-mauve">Together with their families</p>
              <div className="mt-[2.2cqw] h-[17cqw] w-[17cqw] overflow-hidden rounded-full ring-1 ring-gold/50 ring-offset-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={couple.monogram} alt="" className="h-full w-full object-cover" />
              </div>
              <p className="mt-[1.6cqw] font-script text-[10cqw] leading-none text-ink">
                {couple.groom} <span className="text-accent">&</span> {couple.bride}
              </p>
              <p className="mt-[2.4cqw] text-[2.7cqw] font-semibold uppercase tracking-[0.22em] text-primary">
                {couple.dateLine}
              </p>
              <p className="mt-[0.8cqw] font-serif text-[3.6cqw] italic text-ink/75">{couple.location}</p>
            </div>
          </div>

          <div className="e-body absolute inset-0">
            {/* back of the envelope */}
            <div className="absolute inset-0 z-0 rounded-[2.4cqw] bg-gradient-to-b from-[#b9d0ec] to-[#c9dcf2] shadow-[0_30px_60px_-28px_rgba(30,47,79,0.6)]" />

            {/* front pocket */}
            <svg viewBox="0 0 100 68" preserveAspectRatio="none" className="absolute inset-0 z-[3] h-full w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="pk-side" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#d2e3f7" />
                  <stop offset="1" stopColor="#e1edfb" />
                </linearGradient>
                <linearGradient id="pk-bottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e6f0fc" />
                  <stop offset="1" stopColor="#d6e6f8" />
                </linearGradient>
              </defs>
              <path d="M2.4,0 L47,36 L2.4,68 Q0,68 0,65.6 L0,2.4 Q0,0 2.4,0Z" fill="url(#pk-side)" />
              <path d="M97.6,0 L53,36 L97.6,68 Q100,68 100,65.6 L100,2.4 Q100,0 97.6,0Z" fill="url(#pk-side)" />
              <path d="M0,65.6 L48,31 Q50,29.6 52,31 L100,65.6 Q100,68 97.6,68 L2.4,68 Q0,68 0,65.6Z" fill="url(#pk-bottom)" />
              <path d="M0,65.6 L48,31 Q50,29.6 52,31 L100,65.6" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="0.35" />
            </svg>

            {/* top flap */}
            <div className="e-flap absolute inset-x-0 top-0 z-[4] h-[40cqw] origin-top" style={{ transformStyle: "preserve-3d" }}>
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full overflow-visible drop-shadow-[0_6px_6px_rgba(30,47,79,0.18)]" aria-hidden>
                <defs>
                  <linearGradient id="flap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c6daf2" />
                    <stop offset="1" stopColor="#dcebfa" />
                  </linearGradient>
                </defs>
                <path d="M2.4,0 L97.6,0 Q100,0 98,1.6 L54,37.4 Q50,40.4 46,37.4 L2,1.6 Q0,0 2.4,0Z" fill="url(#flap)" />
                <path d="M2,1.6 L46,37.4 Q50,40.4 54,37.4 L98,1.6" fill="none" stroke="var(--color-gold)" strokeOpacity="0.55" strokeWidth="0.35" />
              </svg>
            </div>
          </div>

          {/* wax seal */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              tap();
            }}
            className="e-seal absolute left-1/2 top-[29cqw] z-[5] -ml-[9cqw] h-[18cqw] w-[18cqw]"
            aria-label="Open invitation"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/25 [animation-duration:2.2s]" />
            <svg viewBox="0 0 100 100" className="relative h-full w-full drop-shadow-[0_6px_10px_rgba(30,47,79,0.45)]" aria-hidden>
              <defs>
                <radialGradient id="wax" cx="38%" cy="32%" r="75%">
                  <stop offset="0" stopColor="#4d6fa3" />
                  <stop offset="0.55" stopColor="#2c4673" />
                  <stop offset="1" stopColor="#1b2d4d" />
                </radialGradient>
              </defs>
              <path d={SEAL_PATH} fill="url(#wax)" />
              <circle cx="50" cy="50" r="33" fill="none" stroke="#d9bd86" strokeOpacity="0.7" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="29" fill="none" stroke="#0f1d36" strokeOpacity="0.35" strokeWidth="2" />
              <text x="50" y="59" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="28" fontWeight="600" fill="#e4c993" letterSpacing="1">
                YK
              </text>
              <ellipse cx="36" cy="28" rx="12" ry="5" fill="#ffffff" opacity="0.18" transform="rotate(-30 36 28)" />
            </svg>
          </button>
        </div>
      </div>

      {/* hint */}
      <p className="e-hint relative mt-10 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[11px] font-semibold tracking-wide text-primary ring-1 ring-sky-2 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        Tap the seal to open
      </p>
    </div>
  );
}
