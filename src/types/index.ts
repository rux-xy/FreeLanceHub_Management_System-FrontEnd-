export type UserRole = 'admin' | 'client' | 'freelancer';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In real app, never store plain text
  avatar: string;
  role: UserRole;
  title?: string;
  bio?: string;
  skills?: string[];
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  postedBy: string; // userId
  postedByName: string;
  postedAt: string;
  skills: string[];
  status: 'open' | 'in-progress' | 'completed';
  proposalsCount: number;
  duration?: string;
  experienceLevel?: 'entry' | 'intermediate' | 'expert';
  flagged?: boolean;
}

export interface Proposal {
  id: string;
  jobId: string;
  jobTitle: string;
  freelancerId: string;
  freelancerName: string;
  coverLetter: string;
  bidAmount: number;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

export interface Contract {
  id: string;
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  freelancerId: string;
  freelancerName: string;
  amount: number;
  status: 'active' | 'completed' | 'disputed';
  startDate: string;
  progress: number; // 0-100
  nextMilestone?: string;
}