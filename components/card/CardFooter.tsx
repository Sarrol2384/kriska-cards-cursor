"use client";

import Image from "next/image";
import { useAgentCard } from "@/components/card/AgentCardProvider";
import { designerLogoSrc } from "@/lib/images";

export function CardFooter() {
  const year = new Date().getFullYear();
  const { card } = useAgentCard();
  const { designer } = card;
  const designerLogo = designerLogoSrc();

  const logo = (
    <Image
      src={designerLogo}
      alt={designer.name}
      width={140}
      height={42}
      className="h-8 w-auto max-w-[6.75rem] shrink-0 object-contain opacity-90"
    />
  );

  const logoBlock = designer.url ? (
    <a
      href={designer.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 transition-opacity hover:opacity-80"
    >
      {logo}
    </a>
  ) : (
    logo
  );

  return (
    <footer className="space-y-2 border-t border-[#e5e7eb] px-4 pt-3 pb-2 text-center text-[10px] leading-snug text-[#6b7280] sm:px-5">
      <p className="text-[#374151]">
        © {year} {card.tagline}. All rights reserved.
      </p>

      <div className="flex flex-col items-center gap-2 pt-1">
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2">
          <span>Digital card by</span>
          <span className="inline-flex items-center gap-2">
            <span className="font-medium text-primary">{designer.name}</span>
            {logoBlock}
          </span>
        </p>
        {designer.phone ? (
          <p>
            Contact —{" "}
            <a
              href={`tel:${designer.phone.replace(/\s/g, "")}`}
              className="text-primary underline underline-offset-2 hover:text-[var(--brand-blue-dark)]"
            >
              {designer.phone}
            </a>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
