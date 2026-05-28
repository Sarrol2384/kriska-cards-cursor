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
    <section className="space-y-4 px-5 sm:px-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-3">
        <div className="sold-marquee flex w-max gap-3 px-3">
          {items.map((property, index) => (
            <article
              key={`${property.id}-${index}`}
              className="w-36 shrink-0 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm sm:w-40"
            >
              <div className="relative aspect-[4/3] bg-[#f3f4f6]">
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
                <span className="absolute top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wide text-primary-foreground uppercase">
                  {badgeLabel}
                </span>
              </div>
              <div className="space-y-0.5 border-t border-[#e5e7eb] p-2.5">
                <p className="text-xs leading-tight font-semibold text-[#111827]">
                  {property.title}
                </p>
                <p className="text-[11px] text-[#6b7280]">{property.suburb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
