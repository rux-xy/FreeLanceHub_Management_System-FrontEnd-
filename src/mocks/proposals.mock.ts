import type { Proposal } from "../types/proposal.types";

export const proposalsMock: Proposal[] = [
  {
    id: "prop_001",
    jobId: "job_001",
    freelancerId: "user_002",
    freelancerName: "Kasun",
    coverLetter:
      "I can deliver this in a clean, maintainable way. I’ll share progress updates daily.",
    proposedBudget: 180,
    estimatedDays: 5,
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];