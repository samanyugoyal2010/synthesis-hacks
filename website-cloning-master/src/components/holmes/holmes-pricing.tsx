"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

export function HolmesPricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a] px-4 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1080px]">
        <p className="font-[family-name:var(--font-dm)] mb-3 text-center text-[12px] font-medium uppercase tracking-widest text-[#858585]">
          Pricing
        </p>
        <h2 className="font-[family-name:var(--font-host)] mb-4 text-center text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.03em] text-white">
          Choose Holmes Beta v1. Releasing Soon
        </h2>
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-5 py-2 font-[family-name:var(--font-dm)] text-[13px] transition-colors",
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={cn(
                "rounded-full px-5 py-2 font-[family-name:var(--font-dm)] text-[13px] transition-colors",
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white",
              )}
            >
              Yearly
            </button>
          </div>
        </div>
        <p className="mb-2 text-center font-[family-name:var(--font-dm)] text-[12px] text-[#858585]">
          {billing === "monthly" ? "Monthly billing" : "Yearly billing"}
        </p>
        <p className="mb-10 text-center font-[family-name:var(--font-dm)] text-[13px] text-[#e8ff9c]">
          beta pricing!
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-white/[0.1] bg-[#121212] p-6">
            <h3 className="font-[family-name:var(--font-host)] text-xl text-white">Pro</h3>
            <p className="font-[family-name:var(--font-host)] mt-4 text-4xl tracking-tight text-white">
              $15
            </p>
            <p className="font-[family-name:var(--font-dm)] text-[14px] text-[#858585]">
              /month
            </p>
            <p className="font-[family-name:var(--font-dm)] mt-2 text-[13px] text-[#858585]">
              Coming Soon!
            </p>
            <ul className="font-[family-name:var(--font-dm)] mt-6 flex-1 space-y-2 text-[14px] text-[#b5b5b5]">
              <li>Features</li>
              <li>Everything in beta</li>
              <li>x5 usage</li>
              <li>early access to new features</li>
            </ul>
            <span className="mt-6 inline-block rounded-full border border-white/15 px-4 py-2 text-center font-[family-name:var(--font-dm)] text-[13px] text-white/50">
              Pro
            </span>
          </article>
          <article className="relative flex flex-col rounded-2xl border border-[#e8ff9c]/40 bg-[#141414] p-6 shadow-[0_0_40px_rgba(232,255,156,0.08)]">
            <h3 className="font-[family-name:var(--font-host)] text-xl text-white">Free</h3>
            <p className="font-[family-name:var(--font-host)] mt-4 text-4xl tracking-tight text-white">
              $0
            </p>
            <p className="font-[family-name:var(--font-dm)] text-[14px] text-[#858585]">
              $0 /month(beta pricing)
            </p>
            <ul className="font-[family-name:var(--font-dm)] mt-6 flex-1 space-y-2 text-[14px] text-[#b5b5b5]">
              <li>Full access while we refine and improve holmes together.</li>
              <li>Features</li>
              <li>free beta!</li>
              <li>full access to holmes</li>
              <li>limited time!</li>
            </ul>
            <span className="mt-6 inline-block rounded-full bg-[#e8ff9c] px-4 py-2 text-center font-[family-name:var(--font-dm)] text-[13px] font-medium text-black">
              Free
            </span>
          </article>
          <article className="flex flex-col rounded-2xl border border-white/[0.1] bg-[#121212] p-6">
            <h3 className="font-[family-name:var(--font-host)] text-xl text-white">Max</h3>
            <p className="font-[family-name:var(--font-host)] mt-4 text-4xl tracking-tight text-white">
              $50
            </p>
            <p className="font-[family-name:var(--font-dm)] mt-2 text-[13px] text-[#858585]">
              Coming Soon!
            </p>
            <ul className="font-[family-name:var(--font-dm)] mt-6 flex-1 space-y-2 text-[14px] text-[#b5b5b5]">
              <li>Features</li>
              <li>x20 More Usage</li>
              <li>Advanced model tuning</li>
            </ul>
            <span className="mt-6 inline-block rounded-full border border-white/15 px-4 py-2 text-center font-[family-name:var(--font-dm)] text-[13px] text-white/50">
              Max
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
