"use client";

import { createContext, useContext } from "react";
import type { AgentCardPayload } from "@/content/types";

const AgentCardContext = createContext<AgentCardPayload | null>(null);

export function AgentCardProvider({
  payload,
  children,
}: {
  payload: AgentCardPayload;
  children: React.ReactNode;
}) {
  return (
    <AgentCardContext.Provider value={payload}>{children}</AgentCardContext.Provider>
  );
}

export function useAgentCard(): AgentCardPayload {
  const ctx = useContext(AgentCardContext);
  if (!ctx) {
    throw new Error("useAgentCard must be used within AgentCardProvider");
  }
  return ctx;
}
