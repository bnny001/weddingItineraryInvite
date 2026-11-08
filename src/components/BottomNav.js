"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Icon from "./Icons";

gsap.registerPlugin(useGSAP);

const items = [
  { id: "itinerary", label: "Itinerary", icon: "heart" },
  { id: "venues", label: "Venues", icon: "pin" },
  { id: "dining", label: "Dining", icon: "menu" },
  { id: "help", label: "Help", icon: "phone" },
];

export default function BottomNav({ tab, onChange, onHelp }) {
  const root = useRef(null);

  // Little heartbeat pop on the active icon
  useGSAP(
    () => {
      gsap.fromTo(
        `[data-nav="${tab}"] .nav-icon`,
        { scale: 0.6 },
        { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.45)" }
      );
      gsap.fromTo(`[data-nav="${tab}"] .nav-label`, { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" });
    },
    { scope: root, dependencies: [tab] }
  );

  return (
    <nav
      ref={root}
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px] rounded-t-[22px] bg-white/95 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-6px_24px_-8px_rgba(30,47,79,0.22)] backdrop-blur-xl"
    >
      <ul className="flex items-end justify-around">
        {items.map(({ id, label, icon }) => {
          const active = tab === id;
          return (
            <li key={id} className="flex-1">
              <button
                data-nav={id}
                onClick={() => (id === "help" ? onHelp() : onChange(id))}
                aria-current={active ? "page" : undefined}
                aria-label={label}
                className="flex h-[52px] w-full flex-col items-center justify-center gap-0.5"
              >
                <span className={`nav-icon transition-colors duration-300 ${active ? "text-primary" : "text-[#8f9bb0]"}`}>
                  <Icon name={icon} className={active ? "h-7 w-7" : "h-6 w-6"} strokeWidth={active ? 1.7 : 1.5} />
                </span>
                {active && <span className="nav-label text-[10.5px] font-semibold text-primary">{label}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
