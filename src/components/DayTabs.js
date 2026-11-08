"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { days } from "@/data/wedding";

gsap.registerPlugin(useGSAP);

export default function DayTabs({ dayId, onChange, todayId }) {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(`[data-day="${dayId}"]`, { scale: 0.92 }, { scale: 1, duration: 0.5, ease: "back.out(2.4)" });
    },
    { scope: root, dependencies: [dayId] }
  );

  return (
    <nav ref={root} className="sticky top-0 z-30 bg-white/90 px-4 pb-3 pt-3 backdrop-blur-md">
      <div className="grid grid-cols-4 gap-2.5">
        {days.map((d, i) => {
          const active = d.id === dayId;
          return (
            <button
              key={d.id}
              data-day={d.id}
              onClick={() => onChange(d.id)}
              aria-pressed={active}
              className={`relative flex flex-col items-center rounded-2xl pb-2 pt-1.5 transition-all duration-300 ${
                active
                  ? "bg-sky text-primary shadow-[0_10px_22px_-14px_rgba(74,111,165,0.8)] ring-1 ring-accent/60"
                  : "bg-white text-mauve ring-1 ring-sky-2/70"
              }`}
            >
              <span className="text-[8.5px] font-semibold uppercase tracking-[0.18em] opacity-80">
                {d.id === todayId ? "Today" : `Day ${i + 1}`}
              </span>
              <span className={`font-serif text-[26px] font-semibold leading-none ${active ? "text-primary" : "text-ink"}`}>
                {d.day}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.14em]">{d.weekday.slice(0, 3)}</span>
              {d.id === todayId && !active && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
