"use client";

import { useEffect } from "react";
import { contacts } from "@/data/wedding";
import Icon from "./Icons";

export default function ContactSheet({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} inert={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        role="dialog"
        aria-label="Contacts"
        className={`paper absolute inset-x-0 bottom-0 mx-auto max-w-[480px] rounded-t-[32px] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-20px_50px_-20px_rgba(30,47,79,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gold/40" />
        <h2 className="text-center font-serif text-[23px] font-semibold text-ink">For your convenience</h2>
        <p className="mb-3 text-center font-serif text-[14px] italic text-accent">We&apos;re here for anything you need</p>

        <ul className="space-y-2">
          {contacts.map((c) => (
            <li key={c.label}>
              <Row
                href={c.short ? undefined : `tel:${c.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-sky-2 transition active:scale-[0.98]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky text-primary">
                  <Icon name="phone" className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[15.5px] font-semibold leading-tight text-ink">{c.label}</span>
                  <span className="block text-[10.5px] text-mauve">{c.sub}</span>
                </span>
                <span className="text-right text-[11.5px] font-semibold tabular-nums text-mauve">
                  {c.short ? `Dial ${c.phone}` : c.phone}
                </span>
              </Row>
            </li>
          ))}
        </ul>

        <button onClick={onClose} className="label mt-4 w-full rounded-full py-3 text-[10px] text-ink ring-1 ring-primary/25 active:scale-[0.98]">
          Close
        </button>
      </div>
    </div>
  );
}

// Room-phone extensions aren't callable from a mobile, so they render as plain rows.
function Row({ href, children, className }) {
  return href ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <div className={className}>{children}</div>
  );
}
