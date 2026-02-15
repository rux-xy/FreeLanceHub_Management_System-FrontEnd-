/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Proposal } from "../types/proposal.types";
import type { ProposalsContextValue, NewProposalInput } from "./proposals.context";
import { proposalsMock } from "../mocks/proposals.mock";
import { AuthContext } from "./auth.context";

const STORAGE_KEY = "freelancehub_proposals";

export const ProposalsContext = createContext<ProposalsContextValue | undefined>(undefined);

function loadInitialProposals(): Proposal[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return proposalsMock;
  try {
    return JSON.parse(raw) as Proposal[];
  } catch {
    return proposalsMock;
  }
}

function saveProposals(proposals: Proposal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
}

function generateProposalId() {
  return `prop_${Math.random().toString(16).slice(2, 8)}_${Date.now()}`;
}

export function ProposalsProvider({ children }: { children: React.ReactNode }) {
  const [proposals, setProposals] = useState(loadInitialProposals);

  // ✅ Hard auth guard
  const auth = useContext(AuthContext);
  const currentUser = auth?.user ?? null;

  const addProposal: ProposalsContextValue["addProposal"] = (data: NewProposalInput) => {
    if (!currentUser) {
      throw new Error("You must be logged in to submit a proposal.");
    }
    if (currentUser.role !== "freelancer") {
      throw new Error("Only freelancers can submit proposals.");
    }

    // ✅ Prevent spoofing: force freelancer identity from auth
    const newProposal: Proposal = {
      id: generateProposalId(),
      jobId: data.jobId,
      freelancerId: currentUser.id,
      freelancerName: currentUser.name,
      coverLetter: data.coverLetter,
      proposedBudget: data.proposedBudget,
      estimatedDays: data.estimatedDays,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setProposals((prev) => {
      const updated = [newProposal, ...prev];
      saveProposals(updated);
      return updated;
    });
  };

  const getProposalsByJobId = (jobId: string) => proposals.filter((p) => p.jobId === jobId);

  const updateProposalStatus: ProposalsContextValue["updateProposalStatus"] = (proposalId, status) => {
    const ACCEPTED = "accepted" as Proposal["status"];
    const REJECTED = "rejected" as Proposal["status"];

    setProposals((prev) => {
      const target = prev.find((p) => p.id === proposalId);
      if (!target) return prev;

      const updated: Proposal[] = prev.map((p) => {
        if (p.id === proposalId) return { ...p, status } as Proposal;

        if (status === ACCEPTED && p.jobId === target.jobId) {
          return { ...p, status: REJECTED } as Proposal;
        }
        return p;
      });

      saveProposals(updated);
      return updated;
    });
  };

  const value: ProposalsContextValue = useMemo(
    () => ({ proposals, addProposal, getProposalsByJobId, updateProposalStatus }),
    [proposals]
  );

  return <ProposalsContext.Provider value={value}>{children}</ProposalsContext.Provider>;
}

export function useProposals() {
  const ctx = useContext(ProposalsContext);
  if (!ctx) throw new Error("useProposals must be used inside ProposalsProvider");
  return ctx;
}
