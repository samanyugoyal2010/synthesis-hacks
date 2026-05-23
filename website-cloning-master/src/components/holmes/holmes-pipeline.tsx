"use client";

import Image from "next/image";
import { useState } from "react";

import { holmesPipelineSteps } from "@/data/holmes-content";

import { cn } from "@/lib/utils";

export function HolmesPipeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1080px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121212] lg:aspect-[3/4]">
          <Image
            src="/images/holmes/observe.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-host)] mb-10 text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-[1.12] tracking-[-0.03em] text-white">
            {holmesPipelineSteps[active]?.label}
          </h2>
          <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-4">
            {holmesPipelineSteps.map((step, i) => (
              <button
                key={step.label}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-4 py-2 font-[family-name:var(--font-dm)] text-[13px] transition-colors",
                  active === i
                    ? "bg-[#e8ff9c] text-black"
                    : "bg-white/[0.06] text-white/70 hover:bg-white/10",
                )}
              >
                {step.label}
              </button>
            ))}
          </div>
          <p className="font-[family-name:var(--font-dm)] mt-6 min-h-[5rem] text-[16px] leading-relaxed text-[#b5b5b5]">
            {holmesPipelineSteps[active]?.body}
          </p>
        </div>
      </div>
    </section>
  );
}
