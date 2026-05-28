import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SectionTitle({ children, className = "" }: Props) {
  return (
    <h2
      className={`text-left text-[1.05rem] font-semibold tracking-tight text-[#111827] ${className}`}
    >
      {children}
    </h2>
  );
}
