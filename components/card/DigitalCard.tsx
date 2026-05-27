import type { AgentCardPayload } from "@/content/types";
import { AgentCardProvider } from "@/components/card/AgentCardProvider";
import { AvailableProperties } from "@/components/card/AvailableProperties";
import { BackgroundAudio } from "@/components/card/BackgroundAudio";
import { CardBio } from "@/components/card/CardBio";
import { CardFooter } from "@/components/card/CardFooter";
import { CardHero } from "@/components/card/CardHero";
import { ContactButtons } from "@/components/card/ContactButtons";
import { SocialLinks } from "@/components/card/SocialLinks";
import { SoldProperties } from "@/components/card/SoldProperties";

export function DigitalCard({ payload }: { payload: AgentCardPayload }) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#080808]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-8 -right-16 size-56 rounded-full bg-[#c9a227]/20 blur-[64px]" />
        <div className="absolute top-[38%] -left-24 size-64 rounded-full bg-[#b91c2c]/20 blur-[72px]" />
        <div className="absolute -bottom-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-[#c9a227]/12 blur-[90px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, #c9a227 0px, #c9a227 1px, transparent 1px, transparent 12px)",
        }}
      />

      <BackgroundAudio />

      <AgentCardProvider payload={payload}>
        <main className="card-frame relative mx-auto my-0 flex min-h-dvh w-full max-w-[430px] flex-col gap-7 overflow-hidden rounded-none border-x border-primary/25 bg-[#0c0c0c]/92 px-4 pt-4 pb-8 backdrop-blur-sm sm:my-4 sm:min-h-0 sm:rounded-[1.75rem] sm:px-6 sm:pt-5">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
            aria-hidden
          />
          <CardHero />
          <CardBio />
          <SoldProperties />
          <AvailableProperties />
          <ContactButtons />
          <SocialLinks />
          <CardFooter />
        </main>
      </AgentCardProvider>
    </div>
  );
}
