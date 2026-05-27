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
      className="h-9 w-auto max-w-[6.75rem] shrink-0 object-contain opacity-90 sm:h-10 sm:max-w-[7.25rem]"
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
    <footer className="space-y-4 border-t border-primary/20 px-2 pt-6 pb-4 text-center text-[11px] leading-relaxed text-muted-foreground">
      <div className="gold-line mx-auto mb-4 w-full max-w-[12rem]" aria-hidden />
      <p className="text-foreground/90">
        © {year} Eyethu Property Group. All rights reserved.
      </p>
      <p>MJG Real Estate T/A Eyethu Property Group · Cape Town · Western Cape</p>

      <div className="flex flex-col items-center gap-2 pt-2">
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 text-muted-foreground">
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
              className="text-primary underline underline-offset-2 hover:text-accent"
            >
              {designer.phone}
            </a>
          </p>
        ) : null}
      </div>
    </footer>
  );
}
