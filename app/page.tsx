import { CardBio } from "@/components/card/CardBio";
import { CardFooter } from "@/components/card/CardFooter";
import { CardHero } from "@/components/card/CardHero";
import { ContactButtons } from "@/components/card/ContactButtons";
import { SocialLinks } from "@/components/card/SocialLinks";
import { SoldProperties } from "@/components/card/SoldProperties";

export default function DigitalCardPage() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#080808]">
      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-28 -right-20 size-72 rounded-full bg-[#c9a227]/25 blur-[80px]" />
        <div className="absolute top-[38%] -left-24 size-64 rounded-full bg-[#b91c2c]/20 blur-[72px]" />
        <div className="absolute -bottom-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-[#c9a227]/12 blur-[90px]" />
      </div>

      {/* Diagonal brand stripes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, #c9a227 0px, #c9a227 1px, transparent 1px, transparent 12px)",
        }}
      />

      <main className="card-frame relative mx-auto my-0 flex min-h-dvh w-full max-w-[430px] flex-col gap-8 overflow-hidden rounded-none border-x border-primary/25 bg-[#0c0c0c]/92 px-4 py-8 backdrop-blur-sm sm:my-6 sm:min-h-0 sm:rounded-[1.75rem] sm:px-6">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
          aria-hidden
        />
        <CardHero />
        <CardBio />
        <SoldProperties />
        <ContactButtons />
        <SocialLinks />
        <CardFooter />
      </main>
    </div>
  );
}
