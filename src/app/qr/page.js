import { couple, siteUrl } from "@/data/wedding";
import WeddingQR from "@/components/WeddingQR";
import { ArchShape, Posy } from "@/components/Decor";
import Icon from "@/components/Icons";
import PrintButton from "./PrintButton";

export const metadata = {
  title: "Room QR sticker · Yash & Komal",
  robots: { index: false, follow: false },
};

// Sticker size for the printer: 80 × 120 mm.
// Open /qr → "Print / Save as PDF" → the PDF page is exactly sticker-sized (vector, print-perfect).
export default function QrSticker() {
  return (
    <div className="qr-screen flex min-h-dvh flex-col items-center gap-6 bg-[#eef3f9] px-4 py-8">
      <div className="qr-noprint max-w-[420px] text-center text-[13px] leading-relaxed text-mauve">
        <p className="font-serif text-[22px] font-semibold text-ink">Room QR sticker</p>
        <p className="mt-1">
          Prints at <b>80 × 120 mm</b>. Use &ldquo;Save as PDF&rdquo; with margins set to <b>None</b> and
          background graphics <b>on</b>, then send the PDF to the printer.
        </p>
        <p className="mt-1">
          Links to: <b className="text-primary">{siteUrl}</b>
        </p>
        <div className="mt-4">
          <PrintButton />
        </div>
      </div>

      <article className="sticker relative overflow-hidden bg-white text-center">
        {/* soft background */}
        <div className="hero-wash absolute inset-0" aria-hidden />
        {/* double frame */}
        <span className="absolute inset-[3mm] rounded-[4mm] border-[0.3mm] border-gold/60" aria-hidden />
        <span className="absolute inset-[4.2mm] rounded-[3.2mm] border-[0.25mm] border-sky-2" aria-hidden />

        <Posy className="absolute -left-[7mm] -top-[3mm] h-[22mm] w-[29mm]" />
        <Posy flip className="absolute -right-[7mm] -top-[3mm] h-[22mm] w-[29mm]" />
        <div className="absolute -bottom-[3mm] -left-[7mm] h-[18mm] w-[24mm] rotate-180" aria-hidden>
          <Posy flip className="h-full w-full" />
        </div>
        <div className="absolute -bottom-[3mm] -right-[7mm] h-[18mm] w-[24mm] rotate-180" aria-hidden>
          <Posy className="h-full w-full" />
        </div>

        <div className="relative flex h-full flex-col items-center px-[9mm] pt-[11mm]">
          <p className="text-[5.5pt] font-semibold uppercase tracking-[0.32em] text-mauve">Welcome to the wedding of</p>
          <h1 className="mt-[1.5mm] font-script text-[25pt] leading-none text-ink">
            {couple.groom} <span className="font-serif text-[14pt] italic text-accent">&</span> {couple.bride}
          </h1>
          <p className="mt-[2mm] text-[6pt] font-semibold uppercase tracking-[0.24em] text-primary">{couple.dateLine}</p>

          {/* arch-topped QR panel */}
          <div className="relative mt-[6mm] w-[50mm]">
            <ArchShape className="absolute inset-x-0 bottom-full -mb-px h-[9mm] w-full" />
            <svg viewBox="0 0 200 140" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-full -mb-px h-[9mm] w-full overflow-visible" aria-hidden>
              <path
                d="M0,140 L0,78 C0,52 26,44 52,38 C76,32 90,22 96,8 C97.5,4 99,1.5 100,0 C101,1.5 102.5,4 104,8 C110,22 124,32 148,38 C174,44 200,52 200,78 L200,140"
                fill="none"
                stroke="var(--color-gold)"
                strokeOpacity="0.7"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div className="rounded-b-[3mm] border-x-[0.3mm] border-b-[0.3mm] border-gold/70 bg-white px-[3mm] pb-[3mm] pt-[1mm] shadow-[0_3mm_6mm_-4mm_rgba(30,47,79,0.45)]">
              <WeddingQR url={siteUrl} className="block h-auto w-full" />
            </div>
          </div>

          <p className="mt-[4mm] font-serif text-[10pt] italic leading-tight text-ink">Scan for your schedule</p>
          <div className="mt-[2mm] flex items-center gap-[4mm] text-[5.5pt] font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="flex items-center gap-[1mm]"><Icon name="heart" className="h-[3mm] w-[3mm]" strokeWidth={2} />Itinerary</span>
            <span className="flex items-center gap-[1mm]"><Icon name="pin" className="h-[3mm] w-[3mm]" strokeWidth={2} />Venues</span>
            <span className="flex items-center gap-[1mm]"><Icon name="menu" className="h-[3mm] w-[3mm]" strokeWidth={2} />Menus</span>
          </div>

          <p className="mt-auto pb-[8mm] text-[5.5pt] font-semibold uppercase tracking-[0.3em] text-accent">{couple.hashtag}</p>
        </div>
      </article>
    </div>
  );
}
