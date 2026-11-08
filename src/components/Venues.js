"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { days, venues } from "@/data/wedding";
import { fmtTime } from "@/lib/time";
import Icon from "./Icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Group every event under its venue, in schedule order.
const byVenue = Object.entries(venues)
  .map(([id, v]) => ({
    id,
    ...v,
    events: days.flatMap((d) =>
      d.events.filter((e) => e.venue === id).map((e) => ({ ...e, day: d }))
    ),
  }))
  .filter((v) => v.events.length > 0);

export default function Venues() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set(".v-card", { opacity: 0, y: 40, scale: 0.97 });
      ScrollTrigger.batch(".v-card", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: "power3.out" }),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="space-y-3 px-4 pt-4">
      {byVenue.map((v, i) => (
        <article key={v.id} className="v-card overflow-hidden rounded-[20px] bg-white ring-1 ring-sky-2 shadow-[0_18px_40px_-26px_rgba(30,47,79,0.55)]">
          <div className="relative flex items-center gap-4 bg-gradient-to-br from-sky via-[#f3f8fe] to-mist/70 px-4 py-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-[0_8px_18px_-12px_rgba(74,111,165,0.8)]">
              <Icon name="pin" className="h-[18px] w-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-serif text-[19px] font-semibold leading-tight text-ink">{v.name}</h2>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-primary">{v.area}</p>
            </div>
            <span className="font-script text-[26px] leading-none text-accent/70">{i + 1}</span>
          </div>

          <ul className="divide-y divide-sky px-4 py-1">
            {v.events.map((e, j) => {
              const t = fmtTime(e.t);
              return (
                <li key={j} className="flex items-center gap-3 py-2">
                  <Icon name={e.icon} className="h-4 w-4 shrink-0 text-accent" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-[15px] font-semibold leading-tight text-ink">{e.title}</p>
                    {e.note && <p className="truncate font-serif text-[12.5px] italic text-ink/60">{e.note}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-accent">
                      {e.day.day}
                      <sup>{e.day.sup}</sup> {e.day.month.slice(0, 3)}
                    </p>
                    <p className="text-[10px] font-semibold tabular-nums text-ink/80">
                      {t.hm} {t.ap}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="px-4 pb-4 pt-1">
            <a
              href={v.map}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-[11.5px] font-semibold text-white shadow-[0_10px_20px_-12px_rgba(30,47,79,0.9)] transition active:scale-[0.97]"
            >
              <Icon name="arrow" className="h-4 w-4" strokeWidth={2} /> Open in Google Maps
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
