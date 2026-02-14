// src/types/proposal.types.ts

export type ProposalStatus = "pending" | "accepted" | "rejected";

export type Proposal = {
  id: string;
  jobId: string;

  // who submitted
  freelancerId: string;
  freelancerName: string;

  coverLetter: string;
  proposedBudget: number;
  estimatedDays: number;

  status: ProposalStatus;
  createdAt: string; // ISO string
};
