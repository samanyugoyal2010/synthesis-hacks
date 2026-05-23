export function HolmesFooter() {
  return (
    <footer
      id="waitlist"
      className="border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-16"
    >
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <p className="font-[family-name:var(--font-host)] text-2xl tracking-[-0.03em] text-white">
            holmes beta.v1
          </p>
        </div>
        <a
          href="https://www.try-holmes.com/"
          className="inline-flex rounded-full bg-[#e8ff9c] px-8 py-3 font-[family-name:var(--font-dm)] text-[14px] font-medium text-black transition-opacity hover:opacity-90"
        >
          Waitlist
        </a>
      </div>
    </footer>
  );
}
