import Image from "next/image";
import { card } from "@/content/card";
import { soldSrc } from "@/lib/images";
import { SectionTitle } from "@/components/card/SectionTitle";

export function SoldProperties() {
  const items = [...card.soldProperties, ...card.soldProperties];

  return (
    <section className="space-y-4">
      <SectionTitle>Properties sold by me</SectionTitle>
      <div className="overflow-hidden rounded-2xl border border-primary/25 bg-[#111]/90 py-3 shadow-[inset_0_1px_0_rgba(201,162,39,0.15)]">
        <div className="sold-marquee flex w-max gap-3 px-3">
          {items.map((property, index) => (
            <article
              key={`${property.suburb}-${index}`}
              className="w-36 shrink-0 overflow-hidden rounded-xl border border-primary/30 bg-[#0a0a0a] shadow-lg sm:w-40"
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={soldSrc(property.image)}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wide text-accent-foreground uppercase shadow-md">
                  Sold
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
