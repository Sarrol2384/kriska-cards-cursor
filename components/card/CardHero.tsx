import Image from "next/image";
import { card } from "@/content/card";
import { agentSrc, logoSrc } from "@/lib/images";

export function CardHero() {
  return (
    <header className="relative flex flex-col items-center gap-5 pt-2">
      <div className="relative inline-flex max-w-[min(85vw,13.5rem)]">
        <div
          className="absolute -inset-0.5 rounded-xl bg-primary/25 blur-md"
          aria-hidden
        />
        <div className="relative rounded-xl bg-gradient-to-b from-[#fffdf7] to-[#f0e6c8] px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.35),0_0_0_1px_rgba(201,162,39,0.45)]">
          <Image
            src={logoSrc()}
            alt="Eyethu Property Group"
            width={220}
            height={88}
            className="h-auto max-h-[3.25rem] w-auto object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/50 via-accent/30 to-primary/20 blur-md"
          aria-hidden
        />
        <div
          className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary via-[#f5e6b8] to-accent p-[3px]"
          aria-hidden
        >
          <div className="size-full rounded-full bg-[#0c0c0c]" />
        </div>
        <Image
          src={agentSrc()}
          alt={card.agentName}
          width={140}
          height={140}
          className="relative size-32 rounded-full border-2 border-[#0c0c0c] object-cover shadow-2xl sm:size-36"
          priority
        />
      </div>

      <div className="text-center">
        <h1 className="font-heading text-[1.75rem] font-semibold leading-snug tracking-normal text-[#f5f0e6] sm:text-[1.9rem]">
          {card.agentName}
        </h1>
        <p className="mt-2 text-xs font-bold tracking-[0.22em] text-accent uppercase">
          {card.role}
        </p>
        <p className="mt-2 text-sm font-medium text-primary/90">{card.tagline}</p>
      </div>
    </header>
  );
}
