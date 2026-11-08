"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { days, venues } from "@/data/wedding";
import { eventMs, fmtTime } from "@/lib/time";
import Icon from "./Icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Itinerary({ dayId, live, ready, onMenu }) {
  const root = useRef(null);
  const dayIndex = days.findIndex((d) => d.id === dayId);
  const day = days[dayIndex];
  const [open, setOpen] = useState(null);

  useGSAP(
    () => {
      if (!ready) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".d-head", { y: 20, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" });

      // Rail draws as you scroll
      gsap.fromTo(
        ".t-progress",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".t-list", start: "top 70%", end: "bottom 60%", scrub: 0.6 } }
      );

      // Cards glide in from the right as they enter
      gsap.set(".t-card", { opacity: 0, x: 40 });
      gsap.set(".t-dot", { scale: 0 });
      ScrollTrigger.batch(".t-item", {
        start: "top 92%",
        once: true,
        onEnter: (els) => {
          gsap.to(els.map((el) => el.querySelector(".t-card")), {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          });
          gsap.to(els.map((el) => el.querySelector(".t-dot")), {
            scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(3)",
          });
        },
      });
    },
    { scope: root, dependencies: [dayId, ready], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="px-4">
      <LiveBanner live={live} />

      {/* Day heading */}
      <div className="mt-8 text-center">
        <p className="d-head flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
          <span className="h-px w-8 bg-accent/40" />
          Day {String(dayIndex + 1).padStart(2, "0")} · {day.day} {day.month.slice(0, 3)}
          <span className="h-px w-8 bg-accent/40" />
        </p>
        <h2 className="d-head mt-2 font-serif text-[34px] font-semibold leading-tight text-ink">{day.title}</h2>
        <p className="d-head mx-auto mt-3 inline-flex max-w-[330px] items-start gap-2 rounded-2xl bg-mist/70 px-4 py-2 text-left text-[12px] leading-snug text-ink/80">
          <Icon name="hanger" className="mt-px h-4 w-4 shrink-0 text-primary" />
          <span>
            <b className="font-semibold text-primary">Dress theme · </b>
            {day.theme}
          </span>
        </p>
      </div>

      {/* Timeline */}
      <ol className="t-list relative mt-8 pl-7">
        <span className="absolute bottom-8 left-[9px] top-8 w-[1.5px] rounded bg-sky-2/70" aria-hidden />
        <span className="t-progress absolute bottom-8 left-[9px] top-8 w-[1.5px] origin-top rounded bg-gradient-to-b from-accent via-primary to-accent" aria-hidden />

        {day.events.map((ev, i) => {
          const key = `${day.id}-${i}`;
          const ms = eventMs(day, ev);
          const isLive = live?.nowMs != null && ms === live.nowMs;
          const isNext = !isLive && live?.nextItem?.ms === ms;
          const isPast = live?.now != null && ms < live.now && !isLive;
          const time = fmtTime(ev.t);
          const v = venues[ev.venue];
          const isOpen = open === key;
          const toggle = () => setOpen(isOpen ? null : key);

          return (
            <li key={key} className="t-item relative pb-4">
              {/* rail dot */}
              <span
                className={`t-dot absolute -left-7 top-7 z-10 grid h-[19px] w-[19px] place-items-center rounded-full ${
                  isLive ? "live-ring bg-primary" : isPast ? "bg-sky-2" : "bg-white ring-[1.5px] ring-accent"
                }`}
                aria-hidden
              >
                {isLive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>

              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={toggle}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())}
                className={`t-card cursor-pointer rounded-[26px] bg-white p-4 transition-shadow duration-300 active:scale-[0.985] ${
                  isLive
                    ? "shadow-[0_18px_40px_-20px_rgba(74,111,165,0.6)] ring-[1.5px] ring-accent/70"
                    : isOpen
                      ? "shadow-[0_16px_36px_-22px_rgba(30,47,79,0.5)] ring-1 ring-sky-2"
                      : "shadow-[0_10px_26px_-22px_rgba(30,47,79,0.55)] ring-1 ring-sky/90"
                } ${isPast ? "opacity-60" : ""}`}
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
                      isLive ? "bg-primary text-white" : "bg-sky text-primary"
                    }`}
                  >
                    <Icon name={ev.icon} className="h-6 w-6" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-semibold tabular-nums tracking-wide text-primary">
                        {time.hm} {time.ap}
                        {ev.onwards && <span className="font-medium text-mauve"> · onwards</span>}
                      </span>
                      {(isLive || isNext) && (
                        <span
                          className={`rounded-full px-2 py-[2px] text-[8.5px] font-semibold uppercase tracking-[0.14em] ${
                            isLive ? "bg-primary text-white" : "bg-mist text-ink/70"
                          }`}
                        >
                          {isLive ? "Now" : "Up next"}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-0.5 font-serif text-[21px] font-semibold leading-[1.15] text-ink">{ev.title}</h3>
                    {ev.note && <p className="font-serif text-[15px] italic leading-snug text-mauve">{ev.note}</p>}
                    <p className="mt-1.5 flex items-center gap-1 text-[11.5px] text-ink/70">
                      <Icon name="pin" className="h-3.5 w-3.5 text-accent" />
                      {v.name}
                    </p>
                  </div>

                  <Icon
                    name="chevron"
                    className={`mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <div className="acc" data-open={isOpen}>
                  <div>
                    <div className="mt-4 space-y-3 border-t border-dashed border-sky-2 pt-4">
                      {ev.dress && (
                        <p className="flex items-start gap-2 text-[12.5px] leading-snug text-ink/80">
                          <Icon name="hanger" className="h-4 w-4 shrink-0 text-primary" />
                          <span>
                            <b className="font-semibold text-ink">Dress code: </b>
                            {ev.dress}
                          </span>
                        </p>
                      )}
                      <p className="flex items-start gap-2 text-[12.5px] leading-snug text-ink/80">
                        <Icon name="pin" className="h-4 w-4 shrink-0 text-primary" />
                        <span>
                          <b className="font-semibold text-ink">Venue: </b>
                          {v.name}, {v.area}
                        </span>
                      </p>
                      <div className="flex gap-2 pt-1">
                        <a
                          href={v.map}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-[12px] font-semibold text-white shadow-[0_8px_18px_-10px_rgba(74,111,165,0.9)] active:scale-95"
                        >
                          <Icon name="arrow" className="h-3.5 w-3.5" strokeWidth={2} /> Directions
                        </a>
                        {ev.meal && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMenu(day.id);
                            }}
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-sky px-4 py-2.5 text-[12px] font-semibold text-primary active:scale-95"
                          >
                            <Icon name="menu" className="h-3.5 w-3.5" strokeWidth={2} /> View menu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function LiveBanner({ live }) {
  if (!live) return <div className="mt-2 h-[84px]" />;
  let top, main, sub, icon = "heart", pulse = false;
  if (live.phase === "before") {
    top = "The celebrations begin in";
    main = `${live.daysToGo} ${live.daysToGo === 1 ? "day" : "days"}`;
    sub = "We can't wait to celebrate with you";
  } else if (live.phase === "after") {
    top = "Thank you";
    main = "for being part of our story";
    sub = "With love, Yash & Komal";
  } else if (live.nowItem) {
    const n = live.nextItem && fmtTime(live.nextItem.e.t);
    top = "Happening now";
    main = live.nowItem.e.title;
    sub = venues[live.nowItem.e.venue].name + (n ? ` · Next at ${n.hm} ${n.ap}` : "");
    icon = live.nowItem.e.icon;
    pulse = true;
  } else if (live.nextItem) {
    const t = fmtTime(live.nextItem.e.t);
    top = `Up next · ${t.hm} ${t.ap}`;
    main = live.nextItem.e.title;
    sub = venues[live.nextItem.e.venue].name;
    icon = live.nextItem.e.icon;
  } else {
    top = "That's all for today";
    main = "Rest well";
    sub = "See you tomorrow";
  }
  return (
    <div className="relative mt-2 flex items-center gap-4 overflow-hidden rounded-[26px] bg-white p-4 shadow-[0_16px_36px_-22px_rgba(74,111,165,0.7)] ring-1 ring-sky-2">
      <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-sky blur-2xl" aria-hidden />
      <span className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-primary text-white ${pulse ? "live-ring" : ""}`}>
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <div className="relative min-w-0">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          {pulse && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />}
          {top}
        </p>
        <p className="truncate font-serif text-[24px] font-semibold leading-tight text-ink">{main}</p>
        <p className="truncate text-[11.5px] text-mauve">{sub}</p>
      </div>
    </div>
  );
}
