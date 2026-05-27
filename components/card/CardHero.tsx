"use client";

import Image from "next/image";
import { useAgentCard } from "@/components/card/AgentCardProvider";
import { logoSrc } from "@/lib/images";

export function CardHero() {
  const { card, agentPhotoSrc } = useAgentCard();

  return (
    <header className="relative flex flex-col items-center gap-4 pt-0">
      <div className="relative inline-flex w-full max-w-[min(94vw,18.5rem)] justify-center">
        <div className="logo-plate relative w-full overflow-hidden rounded-xl px-5 py-2.5">
          <div
            className="logo-plate-inner-glow pointer-events-none absolute inset-0"
            aria-hidden
          />
          <Image
            src={logoSrc()}
            alt="Eyethu Property Group"
            width={320}
            height={108}
            className="relative z-10 mx-auto h-auto max-h-[4.25rem] w-full max-w-[16.5rem] object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/50 via-accent/30 to-primary/20 blur-md"
          aria-hidden
        />
        <div
          className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary via-[#f5e6b8] to-accent p-[3px]"
          aria-hidden
        >
          <div className="size-full rounded-full bg-[#0c0c0c]" />
        </div>
        <Image
          src={agentPhotoSrc}
          alt={card.agentName}
          width={176}
          height={176}
          className="relative size-40 rounded-full border-2 border-[#0c0c0c] object-cover shadow-2xl sm:size-44"
          priority
          unoptimized={agentPhotoSrc.startsWith("http")}
        />
      </div>

      <div className="text-center">
        <h1 className="agent-name-fx font-heading text-[1.85rem] font-bold leading-snug tracking-wide sm:text-[2rem]">
          {card.agentName}
        </h1>
        <p className="mt-2 text-sm font-bold tracking-[0.2em] text-accent uppercase sm:text-base">
          {card.role}
        </p>
        <p className="mt-2 text-base font-medium text-primary/90 sm:text-lg">
          {card.tagline}
        </p>
      </div>
    </header>
  );
}
