/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useContext, useState } from "react";
import type { Proposal } from "../types/proposal.types";
import type { ProposalsContextValue } from "./proposals.context";
import { proposalsMock } from "../mocks/proposals.mock";

const STORAGE_KEY = "freelancehub_proposals";

//Context instance
export const ProposalsContext =
  createContext<ProposalsContextValue | undefined>(undefined);

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
    const [proposals, setProposals] = useState<Proposal[]>(loadInitialProposals);
  
    const addProposal: ProposalsContextValue["addProposal"] = (data) => {
      const newProposal: Proposal = {
        id: generateProposalId(),
        jobId: data.jobId,
        freelancerId: data.freelancerId,
        freelancerName: data.freelancerName,
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
  
    const getProposalsByJobId = (jobId: string) => {
      return proposals.filter((p) => p.jobId === jobId);
    };
  
    
    const updateProposalStatus: ProposalsContextValue["updateProposalStatus"] = (
      proposalId,
      status
    ) => {
      setProposals((prev) => {
        const updated = prev.map((p) =>
          p.id === proposalId ? { ...p, status } : p
        );
        saveProposals(updated);
        return updated;
      });
    };
  
    
    const value: ProposalsContextValue = {
      proposals,
      addProposal,
      getProposalsByJobId,
      updateProposalStatus,
    };
  
    return (
      <ProposalsContext.Provider value={value}>
        {children}
      </ProposalsContext.Provider>
    );
  }
  

export function useProposals() {
  const ctx = useContext(ProposalsContext);
  if (!ctx) {
    throw new Error("useProposals must be used inside ProposalsProvider");
  }
  return ctx;
}
