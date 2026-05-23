import Image from "next/image";

import { holmesMacRows } from "@/data/holmes-content";

import { cn } from "@/lib/utils";

export function HolmesMacSection() {
  return (
    <section
      id="about"
      className="relative z-10 border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1080px]">
        <h2 className="font-[family-name:var(--font-host)] mb-16 text-center text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white md:mb-24">
          Holmes lives on your Mac.
          <br />
          Adapting to the way you work.
        </h2>
        <div className="flex flex-col gap-20 md:gap-28">
          {holmesMacRows.map((row) => (
            <div
              key={row.kicker}
              className={cn(
                "flex flex-col gap-8 md:gap-12",
                row.imageSide === "right"
                  ? "md:flex-row md:items-center"
                  : "md:flex-row-reverse md:items-center",
              )}
            >
              <div className="flex-1 space-y-4">
                <p className="font-[family-name:var(--font-dm)] text-[13px] font-medium tracking-wide text-[#e8ff9c]">
                  {row.kicker}
                </p>
                <p className="font-[family-name:var(--font-dm)] text-[17px] leading-relaxed text-white/90 md:text-[18px]">
                  {row.title}
                </p>
              </div>
              <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121212] md:aspect-[16/10]">
                <Image
                  src={row.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
