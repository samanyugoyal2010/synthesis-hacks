import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { holmesNav } from "@/data/holmes-content";

export function HolmesHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:px-6">
      <div
        className={cn(
          "flex w-full max-w-[1080px] items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 px-4 py-3 backdrop-blur-md md:px-6",
        )}
      >
        <Link href="#top" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/holmes/logo.png"
            alt="holmes"
            width={23}
            height={24}
            className="h-6 w-auto"
            priority
          />
          <span className="font-[family-name:var(--font-dm)] text-[15px] font-medium tracking-tight text-white lowercase">
            holmes
          </span>
        </Link>
        <nav className="flex max-w-[45%] items-center gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:max-w-none md:gap-8 [&::-webkit-scrollbar]:hidden">
          {holmesNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-[family-name:var(--font-dm)] shrink-0 text-[12px] text-white/90 transition-colors hover:text-white md:text-[14px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#waitlist"
          className="rounded-full bg-[rgb(219,160,160)] px-4 py-2 font-[family-name:var(--font-dm)] text-[13px] font-medium text-black transition-opacity hover:opacity-90"
        >
          Download
        </Link>
      </div>
    </header>
  );
}
