import Image from "next/image";

import { holmesCapabilities } from "@/data/holmes-content";

export function HolmesCapabilities() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0f0f0f] px-4 py-20 md:py-28">
      <div className="mx-auto max-w-[1080px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] lg:sticky lg:top-28">
            <Image
              src="/images/holmes/capabilities.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm)] mb-3 text-[12px] font-medium uppercase tracking-widest text-[#858585]">
              Capabilities
            </p>
            <h2 className="font-[family-name:var(--font-host)] mb-10 text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <ul className="space-y-8">
              {holmesCapabilities.map((cap) => (
                <li key={cap.title} className="border-b border-white/[0.06] pb-8 last:border-0">
                  <h3 className="font-[family-name:var(--font-host)] mb-2 text-lg text-white">
                    {cap.title}
                  </h3>
                  <p className="font-[family-name:var(--font-dm)] text-[15px] leading-relaxed text-[#858585]">
                    {cap.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
