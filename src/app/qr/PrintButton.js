"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_20px_-10px_rgba(74,111,165,0.9)] active:scale-95"
    >
      Print / Save as PDF
    </button>
  );
}
