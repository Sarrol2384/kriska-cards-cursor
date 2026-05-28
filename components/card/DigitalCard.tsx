import type { AgentCardPayload } from "@/content/types";
import { AgentCardProvider } from "@/components/card/AgentCardProvider";
import { BackgroundAudio } from "@/components/card/BackgroundAudio";
import { CardBio } from "@/components/card/CardBio";
import { CardFooter } from "@/components/card/CardFooter";
import { CardHero } from "@/components/card/CardHero";
import { ContactButtons } from "@/components/card/ContactButtons";
import { SocialLinks } from "@/components/card/SocialLinks";

export function DigitalCard({ payload }: { payload: AgentCardPayload }) {
  return (
    <div className="min-h-dvh bg-[var(--brand-blue-soft)]">
      <BackgroundAudio />

      <AgentCardProvider payload={payload}>
        <main className="relative mx-auto flex w-full max-w-[430px] flex-col bg-white shadow-[0_4px_24px_-8px_rgba(29,111,212,0.25)] sm:overflow-hidden sm:rounded-xl">
          <CardHero />
          <div className="flex flex-col gap-3 px-0 pb-4">
            <CardBio />
            <ContactButtons />
            <SocialLinks />
            <CardFooter />
          </div>
        </main>
      </AgentCardProvider>
    </div>
  );
}
