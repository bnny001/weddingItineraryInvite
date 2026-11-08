"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Icon from "./Icons";
import { days, menus, venues, mealLabels } from "@/data/wedding";

gsap.registerPlugin(useGSAP);

const mealIcon = (m) => {
  const s = m.toLowerCase();
  if (s.includes("breakfast")) return "breakfast";
  if (s.includes("lunch")) return "lunch";
  if (s.includes("tea")) return "tea";
  return "dinner";
};

export default function Dining({ dayId }) {
  const root = useRef(null);
  const day = days.find((d) => d.id === dayId);
  const list = menus[dayId] ?? [];
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".m-card", { opacity: 0, y: 30, duration: 0.65, stagger: 0.09, ease: "power3.out" });
    },
    { scope: root }
  );

  // Stagger dishes when a card opens
  const toggle = (i) => {
    const next = open === i ? null : i;
    setOpen(next);
    if (next === null) return;
    requestAnimationFrame(() => {
      const items = root.current?.querySelectorAll(`[data-menu="${i}"] .m-dish`);
      if (items?.length) gsap.fromTo(items, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.025, ease: "power2.out" });
    });
  };

  return (
    <section ref={root} className="px-4 pt-4">
      <p className="text-center font-serif text-lg italic text-accent">
        {day.weekday}, {day.day}
        <sup>{day.sup}</sup> {day.month}
      </p>

      <div className="mt-4 space-y-3">
        {list.map((m, i) => {
          const isOpen = open === i;
          const v = venues[m.venue];
          return (
            <article
              key={`${dayId}-${i}`}
              data-menu={i}
              className={`m-card overflow-hidden rounded-[26px] bg-white ring-1 transition-shadow duration-300 ${
                isOpen ? "ring-sky-2 shadow-[0_18px_40px_-24px_rgba(30,47,79,0.6)]" : "ring-sky"
              }`}
            >
              <button onClick={() => toggle(i)} className="flex w-full items-center gap-3 px-4 py-4 text-left" aria-expanded={isOpen}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky text-primary">
                  <Icon name={mealIcon(m.meal)} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[21px] font-semibold leading-tight text-ink">{m.meal}</span>
                  <span className="label block text-[9px] text-mauve">
                    {m.time} · {v.name}
                  </span>
                </span>
                <svg viewBox="0 0 12 12" className={`h-4 w-4 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>

              <div className="acc" data-open={isOpen}>
                <div>
                  <div className="border-t border-dashed border-sky-2 px-5 pb-5 pt-3">
                    {m.tags?.length > 0 && (
                      <div className="mb-3 flex gap-2">
                        {m.tags.map((t) => (
                          <span key={t} className={`label rounded-full px-2.5 py-1 text-[8px] ${t === "jain" ? "bg-sage/25 text-[#56806a]" : "bg-accent/15 text-accent"}`}>
                            
                            {mealLabels[t]}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.sections.map((s) => (
                      <div key={s.name} className="mb-3 last:mb-0">
                        <p className="label mb-1 flex items-center gap-2 text-[9.5px] text-primary">
                          {s.name}
                          <span className="h-px flex-1 bg-sky-2" />
                        </p>
                        <ul>
                          {s.items.map((it) => (
                            <li key={it} className="m-dish flex items-baseline gap-2 py-0.5 font-serif text-[17px] leading-snug text-ink/90">
                              <span className="h-1 w-1 shrink-0 translate-y-[-3px] rounded-full bg-accent" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-ink/60">
        Allergies or special dietary needs? Speak to any server or call the hospitality desk.
      </p>
    </section>
  );
}
