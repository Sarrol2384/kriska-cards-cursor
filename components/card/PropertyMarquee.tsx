"use client";

import type { PropertyListing } from "@/content/types";
import { SectionTitle } from "@/components/card/SectionTitle";

export function PropertyMarquee({
  title,
  listings,
  badgeLabel,
}: {
  title: string;
  listings: PropertyListing[];
  badgeLabel: string;
}) {
  if (listings.length === 0) return null;

  const items = [...listings, ...listings];

  return (
    <section className="space-y-4">
      <SectionTitle>{title}</SectionTitle>
      <div className="overflow-hidden rounded-2xl border border-primary/25 bg-[#111]/90 py-3 shadow-[inset_0_1px_0_rgba(201,162,39,0.15)]">
        <div className="sold-marquee flex w-max gap-3 px-3">
          {items.map((property, index) => (
            <article
              key={`${property.id}-${index}`}
              className="w-36 shrink-0 overflow-hidden rounded-xl border border-primary/30 bg-[#0a0a0a] shadow-lg sm:w-40"
            >
              <div className="relative aspect-[4/3] bg-muted">
                {property.imageUrl ? (
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="size-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
                    No photo
                  </div>
                )}
                <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wide text-accent-foreground uppercase shadow-md">
                  {badgeLabel}
                </span>
              </div>
              <div className="space-y-0.5 border-t border-primary/15 bg-[#121212] p-2.5">
                <p className="text-xs font-semibold leading-tight text-foreground">
                  {property.title}
                </p>
                <p className="text-[11px] text-primary/80">{property.suburb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
