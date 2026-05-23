"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { holmesIntelligenceCards } from "@/data/holmes-content";

import { cn } from "@/lib/utils";

export function HolmesIntelligence() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const delta = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  }

  return (
    <section
      id="features"
      className="relative border-t border-white/[0.06] bg-[#0f0f0f] px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1184px]">
        <div className="mb-4 text-center">
          <p className="font-[family-name:var(--font-dm)] text-[12px] font-medium uppercase tracking-widest text-[#858585]">
            How it works
          </p>
        </div>
        <h2 className="font-[family-name:var(--font-host)] mb-12 text-center text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white md:mb-16">
          Intelligence that acts, not just answers
        </h2>
        <div className="relative">
          <div
            ref={scrollerRef}
            className={cn(
              "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {holmesIntelligenceCards.map((card) => (
              <article
                key={card.title}
                data-card
                className="w-[min(100%,320px)] shrink-0 snap-start md:w-[300px]"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121212]">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-[family-name:var(--font-host)] text-lg font-normal text-white">
                      {card.title}
                    </h3>
                    <p className="font-[family-name:var(--font-dm)] text-[14px] leading-relaxed text-[#858585]">
                      {card.body}
                    </p>
                    <button
                      type="button"
                      className="mt-auto w-fit rounded-full border border-white/15 px-4 py-2 font-[family-name:var(--font-dm)] text-[13px] text-white transition-colors hover:bg-white/5"
                    >
                      Get started
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2 md:justify-end">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByDir(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByDir(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
