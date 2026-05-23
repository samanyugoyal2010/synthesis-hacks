"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { holmesFaq } from "@/data/holmes-content";

import { cn } from "@/lib/utils";

export function HolmesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-white/[0.06] bg-[#0f0f0f] px-4 py-20 md:py-28">
      <div className="mx-auto max-w-[720px]">
        <p className="font-[family-name:var(--font-dm)] mb-3 text-center text-[12px] font-medium uppercase tracking-widest text-[#858585]">
          FAQ
        </p>
        <h2 className="font-[family-name:var(--font-host)] mb-12 text-center text-[clamp(1.75rem,4vw,2.25rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
          Question?, we got you.
        </h2>
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {holmesFaq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="py-1">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-[family-name:var(--font-dm)] text-[15px] text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-white/50 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen ? (
                  <p className="font-[family-name:var(--font-dm)] pb-5 text-[14px] leading-relaxed text-[#858585]">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
