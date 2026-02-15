import type { Proposal } from "../types/proposal.types";

/**
 * What the page is allowed to send when submitting a proposal
 * (identity fields must come from auth, not UI).
 */
export type CreateProposalInput = {
  jobId: string;
  coverLetter: string;
  proposedBudget: number;
  estimatedDays: number;
};

export type ProposalsContextValue = {
  proposals: Proposal[];
  addProposal: (data: CreateProposalInput) => void;
  getProposalsByJobId: (jobId: string) => Proposal[];
  updateProposalStatus: (proposalId: string, status: Proposal["status"]) => void;
};

