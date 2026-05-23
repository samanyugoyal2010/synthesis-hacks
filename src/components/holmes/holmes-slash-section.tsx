import Image from "next/image";

import { holmesSlashCommands } from "@/data/holmes-content";

export function HolmesSlashSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Image
          src="/images/holmes/slash-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1080px]">
        <p className="font-[family-name:var(--font-dm)] mb-3 text-center text-[12px] font-medium uppercase tracking-widest text-[#858585]">
          Slash Commands
        </p>
        <h2 className="font-[family-name:var(--font-host)] mb-12 text-center text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white md:mb-16">
          Tell Holmes Exactly What to do.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {holmesSlashCommands.map((item) => (
            <div
              key={item.cmd}
              className="rounded-2xl border border-white/[0.1] bg-black/40 p-6 backdrop-blur-md"
            >
              <code className="font-[family-name:var(--font-dm)] text-[15px] font-semibold text-[#e8ff9c]">
                {item.cmd}
              </code>
              <p className="font-[family-name:var(--font-dm)] mt-3 text-[14px] leading-relaxed text-[#b5b5b5]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
