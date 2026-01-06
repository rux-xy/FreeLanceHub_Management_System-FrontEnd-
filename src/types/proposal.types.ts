
  //Proposal status in the job application process
 
export type ProposalStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';


 // Proposal submitted by a freelancer for a job
 
export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName?: string;
  freelancerAvatar?: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDays: number;
  status: ProposalStatus;
  submittedAt: string;
  updatedAt: string;
}


 //Data for creating a new proposal
 
export interface CreateProposalData {
  jobId: string;
  coverLetter: string;
  bidAmount: number;
  estimatedDays: number;
}


 // Data for updating an existing proposal
 
export interface UpdateProposalData {
  coverLetter?: string;
  bidAmount?: number;
  estimatedDays?: number;
  status?: ProposalStatus;
}

