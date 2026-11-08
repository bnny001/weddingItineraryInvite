"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { couple } from "@/data/wedding";
import { Divider, Posy } from "./Decor";
import Icon from "./Icons";

gsap.registerPlugin(useGSAP);

const titles = {
  venues: { title: "Venues", sub: "Tap any venue for directions" },
  dining: { title: "Dining", sub: "Menus for every meal, every day" },
};

export default function Hero({ tab, ready }) {
  const root = useRef(null);
  const full = tab === "itinerary";

  useGSAP(
    () => {
      if (!ready) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-posy", { scale: 0.3, opacity: 0, rotate: -20, duration: 1.1, ease: "back.out(1.7)", stagger: 0.1 })
        .from(".h-ring", { scale: 0.85, opacity: 0, duration: 1 }, 0.1)
        .from(".h-item", { y: 18, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.2);
      // gentle float on the florals
      gsap.to(".h-posy", { y: 5, rotate: 2, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.6, delay: 1.2 });
    },
    { scope: root, dependencies: [ready, full] }
  );

  return (
    <header ref={root} className="relative overflow-hidden pt-[env(safe-area-inset-top)]">
      {/* sky wash */}
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />

      <Posy className="h-posy absolute -left-10 -top-6 h-20 w-28" />
      <Posy flip className="h-posy absolute -right-10 -top-6 h-20 w-28" />

      {full ? (
        <div className="relative px-6 pb-5 pt-10 text-center">
          <p className="h-item label text-[9px] text-mauve">Together with their families</p>

          <div className="h-ring relative mx-auto mt-3 h-[104px] w-[104px]">
            <span className="absolute inset-0 rounded-full border border-gold/50" />
            <span className="absolute inset-[5px] overflow-hidden rounded-full bg-white shadow-[0_18px_40px_-18px_rgba(30,47,79,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={couple.monogram} alt="Yash & Komal monogram" className="h-full w-full object-cover" />
            </span>
          </div>

          <h1 className="h-item mt-3 font-script text-[42px] leading-[0.95] text-ink">
            {couple.groom}
            <span className="mx-1.5 inline-block align-middle font-serif text-[22px] italic text-accent">&</span>
            {couple.bride}
          </h1>

          <div className="h-item mx-auto mt-3 flex w-fit items-center gap-2.5 font-serif text-[24px] font-medium leading-none text-ink">
            <span>23<sup className="text-[11px]">rd</sup></span>
            <span className="h-5 w-px bg-accent/50" />
            <span>24<sup className="text-[11px]">th</sup></span>
            <span className="h-5 w-px bg-accent/50" />
            <span>25<sup className="text-[11px]">th</sup></span>
          </div>
          <p className="h-item label mt-1.5 text-[9.5px] text-mauve">November 2026</p>

          <p className="h-item mt-2 inline-flex items-center gap-1.5 font-serif text-[16px] italic text-ink/80">
            <Icon name="pin" className="h-4 w-4 text-accent" strokeWidth={1.6} />
            {couple.location}
          </p>
          <div className="h-item mt-3">
            <span className="label rounded-full bg-white/80 px-3.5 py-1 text-[9px] text-primary ring-1 ring-sky-2">
              {couple.hashtag}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative px-6 pb-6 pt-14 text-center">
          <p className="h-item font-script text-[26px] leading-none text-accent">
            {couple.groom} & {couple.bride}
          </p>
          <h1 className="h-item mt-2 font-serif text-[44px] font-semibold leading-none text-ink">{titles[tab].title}</h1>
          <p className="h-item mt-2 font-serif text-[17px] italic text-mauve">{titles[tab].sub}</p>
          <Divider className="h-item mt-4" />
        </div>
      )}

      {/* scalloped edge into the white page */}
      <svg className="relative block h-4 w-full text-white" viewBox="0 0 120 8" preserveAspectRatio="none" aria-hidden>
        <path
          fill="currentColor"
          d={"M0 8 V4 " + Array.from({ length: 12 }, (_, i) => `Q${i * 10 + 5} -2 ${i * 10 + 10} 4`).join(" ") + " V8 Z"}
        />
      </svg>
    </header>
  );
}
