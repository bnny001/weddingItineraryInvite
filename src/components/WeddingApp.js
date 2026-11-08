"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { days } from "@/data/wedding";
import { getNow, liveState } from "@/lib/time";
import Intro from "./Intro";
import Hero from "./Hero";
import DayTabs from "./DayTabs";
import Itinerary from "./Itinerary";
import Venues from "./Venues";
import Dining from "./Dining";
import BottomNav from "./BottomNav";
import ContactSheet from "./ContactSheet";
import { Petals } from "./Decor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function WeddingApp() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("itinerary");
  const [dayId, setDayId] = useState(days[0].id);
  const [live, setLive] = useState(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const main = useRef(null);

  // Live "now / next" state, refreshed every minute. Opens today's tab automatically.
  useEffect(() => {
    const tick = (first) => {
      const s = liveState(getNow());
      setLive(s);
      if (first && s.todayId) setDayId(s.todayId);
    };
    tick(true);
    const id = setInterval(() => tick(false), 60_000);
    return () => clearInterval(id);
  }, []);

  const go = (next, opts = {}) => {
    if (opts.dayId) setDayId(opts.dayId);
    if (next !== tab) setTab(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Page transition between tabs
  useGSAP(
    () => {
      if (!ready) return;
      gsap.fromTo(
        ".page",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "transform" }
      );
      ScrollTrigger.refresh();
    },
    { scope: main, dependencies: [tab, ready] }
  );

  return (
    <>
      <Intro onDone={() => setReady(true)} />
      <Petals />

      <div ref={main} className="paper relative z-10 mx-auto min-h-dvh overflow-x-clip max-w-[480px] pb-24 shadow-[0_0_60px_rgba(30,47,79,0.06)]">
        <Hero tab={tab} ready={ready} />

        {(tab === "itinerary" || tab === "dining") && (
          <DayTabs dayId={dayId} onChange={setDayId} todayId={live?.todayId} />
        )}

        <main className="page">
          {tab === "itinerary" && <Itinerary dayId={dayId} live={live} ready={ready} onMenu={(d) => go("dining", { dayId: d })} />}
          {tab === "venues" && <Venues />}
          {tab === "dining" && <Dining key={dayId} dayId={dayId} />}
        </main>

        <footer className="px-8 pb-6 pt-14 text-center">
          <p className="font-script text-[26px] leading-tight text-accent">We wish you a pleasant</p>
          <p className="font-script text-[26px] leading-tight text-accent">& memorable stay</p>
          <p className="label mt-4 text-[10px] text-primary">#YashKom</p>
        </footer>
      </div>

      <BottomNav tab={tab} onChange={(t) => go(t)} onHelp={() => setHelpOpen(true)} />
      <ContactSheet open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
