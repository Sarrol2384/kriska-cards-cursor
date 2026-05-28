"use client";

import Image from "next/image";
import { useAgentCard } from "@/components/card/AgentCardProvider";
import { logoSrc } from "@/lib/images";
import { HeroTopWaves } from "@/components/card/HeroTopWaves";
import { WaveDivider } from "@/components/card/WaveDivider";

const heroBlueBg =
  "linear-gradient(165deg, var(--brand-blue-light) 0%, #4a9fd4 45%, var(--brand-blue) 100%)";

export function CardHero() {
  const { card, agentPhotoSrc } = useAgentCard();

  return (
    <header className="relative bg-white">
      {/* Blue hero — Hans only */}
      <div
        className="relative w-full overflow-hidden"
        style={{ background: heroBlueBg }}
      >
        <HeroTopWaves />

        <div className="relative z-10 flex justify-start px-4 pt-3 pb-0 sm:px-5 sm:pt-4">
          <Image
            src={agentPhotoSrc}
            alt={card.agentName}
            width={900}
            height={1100}
            className="mix-blend-screen -ml-5 h-[min(88vw,26rem)] w-auto max-w-none object-contain object-bottom sm:-ml-7 sm:h-[28rem]"
            priority
            unoptimized
          />
        </div>

        <WaveDivider />
      </div>

      {/* White — logo then name block */}
      <div className="relative px-4 sm:px-5">
        <div className="flex justify-center pt-4 pb-2 sm:pt-5">
          <Image
            src={logoSrc()}
            alt="KrisKa Solutions Ltd"
            width={640}
            height={240}
            className="h-[7rem] w-auto max-w-[min(92vw,18rem)] object-contain sm:h-[8rem] sm:max-w-[20rem]"
            priority
            unoptimized
          />
        </div>

        <div className="space-y-0.5 pb-1 pt-2 text-left sm:pt-3">
          <h1 className="text-[1.6rem] font-bold leading-tight tracking-tight text-[#111827] sm:text-[1.75rem]">
            {card.agentName}
          </h1>
          <p className="text-[0.9375rem] font-medium text-[#4b5563] sm:text-base">
            {card.role.replace(/\s*\|\s*/g, " | ")}
          </p>
          <p className="text-sm font-semibold text-[var(--brand-blue)]">
            {card.tagline}
          </p>
        </div>
      </div>
    </header>
  );
}
