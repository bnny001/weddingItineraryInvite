import { days } from "@/data/wedding";

// "19:15" → { hm: "07:15", ap: "PM" }  (pure, SSR-safe)
export function fmtTime(t) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return { hm: `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")}`, ap };
}

export const eventMs = (day, ev) => Date.parse(`${day.date}T${ev.t}:00+05:30`);

// Client only. Supports ?now=2026-11-24T11:00 for previewing "live" states.
export function getNow() {
  try {
    const q = new URLSearchParams(window.location.search).get("now");
    if (q) {
      const ms = Date.parse(q.includes("+") || q.endsWith("Z") ? q : `${q}+05:30`);
      if (!Number.isNaN(ms)) return ms;
    }
  } catch {}
  return Date.now();
}

const LIVE_WINDOW = 2.5 * 60 * 60 * 1000; // an event counts as "now" for up to 2.5h

// Returns { phase, todayId, nowMs, nowItem, nextItem, daysToGo }
export function liveState(now) {
  const all = days.flatMap((d) => d.events.map((e, i) => ({ d, e, key: `${d.id}-${i}`, ms: eventMs(d, e) })));
  const first = all[0].ms;
  const lastDay = days[days.length - 1];
  const end = Date.parse(`${lastDay.date}T23:59:00+05:30`);

  const todayIso = new Date(now + 5.5 * 3600e3).toISOString().slice(0, 10);
  const today = days.find((d) => d.date === todayIso);

  if (now < Date.parse(`${days[0].date}T00:00:00+05:30`)) {
    return { phase: "before", daysToGo: Math.ceil((first - now) / 86400e3), todayId: null };
  }
  if (now > end) return { phase: "after", todayId: null };

  let nowItem = null;
  let nextItem = null;
  for (let i = 0; i < all.length; i++) {
    if (all[i].ms <= now) {
      // the latest started event at that start time (same-time events share "now")
      if (now - all[i].ms < LIVE_WINDOW) nowItem = all[i];
      else nowItem = null;
    } else {
      nextItem = all[i];
      break;
    }
  }
  return {
    phase: "during",
    todayId: today?.id ?? null,
    nowMs: nowItem?.ms ?? null,
    now,
    nowItem,
    nextItem,
  };
}
