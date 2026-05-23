import Image from "next/image";
import Link from "next/link";

export function HolmesHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden pb-24 pt-32 md:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/holmes/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
      </div>
      <div className="relative z-10 flex w-full max-w-[1080px] flex-col items-center gap-6 px-4 text-center md:gap-8">
        <p className="font-[family-name:var(--font-host)] text-[13px] font-normal tracking-[0.02em] text-[#858585] uppercase">
          Holmes – Autonomous Desktop
        </p>
        <h1 className="font-[family-name:var(--font-host)] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white">
          Holmes lives on your Mac.
          <br />
          Adapting to the way you work.
        </h1>
        <Link
          href="#about"
          className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-[family-name:var(--font-dm)] text-[14px] text-white backdrop-blur-sm transition-colors hover:bg-white/10"
        >
          See it in action
        </Link>
      </div>
    </section>
  );
}
