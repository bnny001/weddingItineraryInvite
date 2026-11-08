// Decorative SVGs: Mughal arch, pastel botanical sprigs, blossoms and petals.
// Everything is deterministic (no Math.random) so server & client markup match.

export const ARCH_PATH =
  "M0,140 L0,78 C0,52 26,44 52,38 C76,32 90,22 96,8 C97.5,4 99,1.5 100,0 C101,1.5 102.5,4 104,8 C110,22 124,32 148,38 C174,44 200,52 200,78 L200,140 Z";

export function ArchShape({ className = "", fill = "#ffffff", stroke }) {
  return (
    <svg viewBox="0 0 200 140" preserveAspectRatio="none" className={className} aria-hidden>
      <path d={ARCH_PATH} fill={fill} />
      {stroke && (
        <path
          d={ARCH_PATH.replace(/ L200,140 Z$/, "").replace(/^M0,140 L/, "M")}
          transform="translate(8 8) scale(0.92 0.95)"
          fill="none"
          stroke={stroke}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

// Leafy branch in pastel sage with sky blossoms.
export function Sprig({ className = "", flip = false, leaves = 9 }) {
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = i / (leaves - 1);
    const y = 10 + t * 180;
    const x = 30 + Math.sin(t * 3.2) * 10;
    const side = i % 2 === 0 ? 1 : -1;
    const rot = side * (40 + t * 15);
    return { x, y, side, rot, i };
  });
  return (
    <svg
      viewBox="0 0 60 200"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <path d="M30,0 C40,50 20,100 34,150 C38,170 32,190 30,200" stroke="#8fae96" strokeWidth="1.2" fill="none" />
      {items.map(({ x, y, side, rot, i }) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <ellipse cx={side * 9} cy="0" rx="10" ry="3.6" fill={i % 3 === 0 ? "#9fbea6" : "#bcd3c0"} />
          <path d={`M${side * 1},0 L${side * 17},0`} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="0.5" />
        </g>
      ))}
      {items
        .filter((_, i) => i % 3 === 1)
        .map(({ x, y, side, i }) => (
          <g key={`f${i}`} transform={`translate(${x - side * 14} ${y + 4})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-3.2" rx="2.3" ry="3.4" fill="#b9d0ee" transform={`rotate(${a})`} />
            ))}
            <circle r="1.5" fill="#d9a35f" />
          </g>
        ))}
    </svg>
  );
}

// Layered pastel accent / peony bloom.
export function Bloom({ className = "", tone = "blue" }) {
  const tones = {
    ivory: ["#ffffff", "#f3f7fd", "#dfe9f7", "#c4a06a"],
    navy: ["#c9dbf2", "#a6c2e8", "#7b9fd2", "#4a6fa5"],
    blue: ["#e8f1fc", "#cbdef4", "#a7c3e8", "#7c9ece"],
  }[tone];
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={`o${a}`} cx="0" cy="-26" rx="17" ry="24" fill={tones[0]} transform={`rotate(${a})`} />
      ))}
      {[22, 82, 142, 202, 262, 322].map((a) => (
        <ellipse key={`m${a}`} cx="0" cy="-17" rx="13" ry="17" fill={tones[1]} transform={`rotate(${a})`} />
      ))}
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={`i${a}`} cx="0" cy="-9" rx="9" ry="11" fill={tones[2]} transform={`rotate(${a})`} />
      ))}
      <circle r="6" fill={tones[3]} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={`s${a}`} cx="0" cy="-3.4" r="1.1" fill="#f3d9a4" transform={`rotate(${a})`} />
      ))}
    </svg>
  );
}

// A small cluster: two blooms + leaves, used on arch corners.
export function Posy({ className = "", flip = false }) {
  return (
    <div className={`pointer-events-none ${className}`} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <svg viewBox="0 0 120 90" className="absolute inset-0 h-full w-full">
        <ellipse cx="30" cy="62" rx="22" ry="7" fill="#b5ceb9" transform="rotate(-25 30 62)" />
        <ellipse cx="88" cy="58" rx="20" ry="6" fill="#a2c0a8" transform="rotate(28 88 58)" />
        <ellipse cx="60" cy="80" rx="16" ry="5" fill="#c4d9c7" transform="rotate(-6 60 80)" />
      </svg>
      <Bloom className="absolute left-[18%] top-[8%] h-[62%] w-[52%] drop-shadow-[0_4px_8px_rgba(74,111,165,0.18)]" />
      <Bloom tone="ivory" className="absolute right-[6%] top-[38%] h-[40%] w-[34%] drop-shadow-[0_3px_6px_rgba(74,111,165,0.2)]" />
      <Bloom tone="navy" className="absolute left-[2%] top-[48%] h-[34%] w-[28%]" />
    </div>
  );
}

export function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-accent/60" />
      <svg width="18" height="14" viewBox="0 0 18 14">
        <path d="M9 13 C2 8 0 5 2.5 2.5 C5 0 8 1.5 9 4 C10 1.5 13 0 15.5 2.5 C18 5 16 8 9 13Z" fill="var(--color-accent)" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-accent/60" />
    </div>
  );
}

export function Petals({ count = 8 }) {
  const cfg = [
    [6, 14, 0], [18, 18, 4], [31, 12, 8], [47, 20, 2],
    [59, 16, 11], [72, 13, 6], [84, 19, 9], [93, 15, 13],
  ].slice(0, count);
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden>
      {cfg.map(([left, dur, delay], i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${left}%`,
            animationDuration: `${dur}s`,
            animationDelay: `-${delay}s`,
            scale: i % 2 ? "0.75" : "1",
            opacity: i % 3 === 0 ? 0.5 : 0.75,
          }}
        />
      ))}
    </div>
  );
}
