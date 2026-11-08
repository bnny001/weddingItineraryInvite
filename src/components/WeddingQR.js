import QRCode from "qrcode";

// Wavy wax-seal outline, centred at (0,0) with radius ~r.
function sealPath(r) {
  let d = "";
  const n = 96;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const rr = r * (1 + 0.065 * Math.sin(t * 13) + 0.03 * Math.sin(t * 5 + 1));
    d += `${i ? "L" : "M"}${(rr * Math.cos(t)).toFixed(3)},${(rr * Math.sin(t)).toFixed(3)}`;
  }
  return d + "Z";
}

/**
 * Custom-styled QR code (server component, pure SVG):
 * - round "pearl" modules in a navy gradient
 * - rounded frame finder eyes with a solid pearl centre
 * - navy wax seal with gold "YK" in the middle (error correction H keeps it scannable)
 */
export default function WeddingQR({ url, className = "", id = "yk" }) {
  const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const data = qr.modules.data;
  const at = (x, y) => data[y * n + x] === 1;

  const m = 3; // quiet zone — scanners need clear white around the code
  const c = n / 2;
  const sealR = n * 0.135; // ~6% of modules covered — safe for level H (30%)

  const inFinder = (x, y) =>
    (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const inSeal = (x, y) => Math.hypot(x + 0.5 - c, y + 0.5 - c) < sealR + 1.1;

  const dots = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!at(x, y) || inFinder(x, y) || inSeal(x, y)) continue;
      dots.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.01} height={1.01} rx={0.3} />);
    }
  }

  const eye = (x, y) => (
    <g key={`e${x}-${y}`} transform={`translate(${x} ${y})`}>
      <rect x="0.5" y="0.5" width="6" height="6" rx="1.6" fill="none" stroke={`url(#${id}-ink)`} strokeWidth="1" />
      <rect x="2" y="2" width="3" height="3" rx="0.9" fill={`url(#${id}-ink)`} />
    </g>
  );

  return (
    <svg
      viewBox={`${-m} ${-m} ${n + m * 2} ${n + m * 2}`}
      className={className}
      role="img"
      aria-label={`QR code for ${url}`}
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id={`${id}-ink`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e2f4f" />
          <stop offset="1" stopColor="#1e2f4f" />
        </linearGradient>
        <radialGradient id={`${id}-wax`} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#4d6fa3" />
          <stop offset="0.55" stopColor="#2c4673" />
          <stop offset="1" stopColor="#1b2d4d" />
        </radialGradient>
      </defs>

      <rect x={-m} y={-m} width={n + m * 2} height={n + m * 2} fill="#ffffff" />
      <g fill={`url(#${id}-ink)`}>{dots}</g>
      {eye(0, 0)}
      {eye(n - 7, 0)}
      {eye(0, n - 7)}

      {/* centre seal */}
      <g transform={`translate(${c} ${c})`}>
        <circle r={sealR + 0.9} fill="#ffffff" />
        <path d={sealPath(sealR)} fill={`url(#${id}-wax)`} />
        <circle r={sealR * 0.74} fill="none" stroke="#d9bd86" strokeWidth={0.14} />
        <text
          y={sealR * 0.3}
          textAnchor="middle"
          fontFamily="var(--font-serif), Georgia, serif"
          fontWeight="600"
          fontSize={sealR * 0.86}
          fill="#e4c993"
          letterSpacing="0.05"
        >
          YK
        </text>
        <ellipse cx={-sealR * 0.32} cy={-sealR * 0.45} rx={sealR * 0.3} ry={sealR * 0.12} fill="#fff" opacity="0.2" transform="rotate(-30)" />
      </g>
    </svg>
  );
}
