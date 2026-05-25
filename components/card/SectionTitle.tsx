import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SectionTitle({ children, className = "" }: Props) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <h2 className="text-center font-sans text-[1.05rem] font-semibold tracking-wide text-[#e8d48b]">
        {children}
      </h2>
      <div className="gold-line mx-auto w-20" aria-hidden />
    </div>
  );
}
