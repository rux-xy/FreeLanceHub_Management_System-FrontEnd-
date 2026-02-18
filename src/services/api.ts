import { Job, User, Contract, Proposal, UserRole } from '../types';
import {
  MOCK_JOBS,
  MOCK_USERS,
  MOCK_CONTRACTS,
  MOCK_PROPOSALS } from
'../lib/mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await delay(800);
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) throw new Error('Invalid credentials');
      return user;
    },
    register: async (
    data: Omit<User, 'id' | 'createdAt' | 'avatar'>)
    : Promise<User> => {
      await delay(800);
      const exists = MOCK_USERS.find((u) => u.email === data.email);
      if (exists) throw new Error('Email already exists');

      const newUser: User = {
        ...data,
        id: `u${Date.now()}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0D8ABC&color=fff`,
        createdAt: new Date().toISOString()
      };
      MOCK_USERS.push(newUser);
      return newUser;
    },
    getCurrentUser: async (): Promise<User | null> => {
      await delay(200);
      const stored = localStorage.getItem('freelancehub_user');
      return stored ? JSON.parse(stored) : null;
    }
  },

  jobs: {
    list: async (): Promise<Job[]> => {
      await delay(600);
      return [...MOCK_JOBS];
    },
    get: async (id: string): Promise<Job | undefined> => {
      await delay(400);
      return MOCK_JOBS.find((j) => j.id === id);
    },
    create: async (
    job: Omit<
      Job,
      'id' | 'postedAt' | 'proposalsCount' | 'status' | 'flagged'>)

    : Promise<Job> => {
      await delay(800);
      const newJob: Job = {
        ...job,
        id: `j${Date.now()}`,
        postedAt: new Date().toISOString(),
        status: 'open',
        proposalsCount: 0,
        flagged: false
      };
      MOCK_JOBS.unshift(newJob);
      return newJob;
    },
    getByUser: async (userId: string): Promise<Job[]> => {
      await delay(500);
      return MOCK_JOBS.filter((j) => j.postedBy === userId);
    },
    updateStatus: async (id: string, status: Job['status']): Promise<void> => {
      await delay(400);
      const job = MOCK_JOBS.find((j) => j.id === id);
      if (job) job.status = status;
    },
    toggleFlag: async (id: string): Promise<void> => {
      await delay(300);
      const job = MOCK_JOBS.find((j) => j.id === id);
      if (job) job.flagged = !job.flagged;
    }
  },

  proposals: {
    list: async (): Promise<Proposal[]> => {
      await delay(500);
      return [...MOCK_PROPOSALS];
    },
    getByJob: async (jobId: string): Promise<Proposal[]> => {
      await delay(400);
      return MOCK_PROPOSALS.filter((p) => p.jobId === jobId);
    },
    getByFreelancer: async (freelancerId: string): Promise<Proposal[]> => {
      await delay(400);
      return MOCK_PROPOSALS.filter((p) => p.freelancerId === freelancerId);
    },
    create: async (
    proposal: Omit<Proposal, 'id' | 'submittedAt' | 'status'>)
    : Promise<Proposal> => {
      await delay(600);
      const newProposal: Proposal = {
        ...proposal,
        id: `p${Date.now()}`,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      MOCK_PROPOSALS.push(newProposal);

      // Update job proposal count
      const job = MOCK_JOBS.find((j) => j.id === proposal.jobId);
      if (job) job.proposalsCount++;

      return newProposal;
    },
    updateStatus: async (
    id: string,
    status: Proposal['status'])
    : Promise<void> => {
      await delay(400);
      const proposal = MOCK_PROPOSALS.find((p) => p.id === id);
      if (proposal) proposal.status = status;
    },
    delete: async (id: string): Promise<void> => {
      await delay(400);
      const index = MOCK_PROPOSALS.findIndex((p) => p.id === id);
      if (index !== -1) {
        const proposal = MOCK_PROPOSALS[index];
        MOCK_PROPOSALS.splice(index, 1);
        // Decrease count
        const job = MOCK_JOBS.find((j) => j.id === proposal.jobId);
        if (job && job.proposalsCount > 0) job.proposalsCount--;
      }
    }
  },

  contracts: {
    list: async (): Promise<Contract[]> => {
      await delay(500);
      return [...MOCK_CONTRACTS];
    },
    getByUser: async (userId: string): Promise<Contract[]> => {
      await delay(400);
      return MOCK_CONTRACTS.filter(
        (c) => c.clientId === userId || c.freelancerId === userId
      );
    },
    get: async (id: string): Promise<Contract | undefined> => {
      await delay(300);
      return MOCK_CONTRACTS.find((c) => c.id === id);
    },
    create: async (
    contract: Omit<Contract, 'id' | 'startDate' | 'progress' | 'status'>)
    : Promise<Contract> => {
      await delay(600);
      const newContract: Contract = {
        ...contract,
        id: `c${Date.now()}`,
        status: 'active',
        startDate: new Date().toISOString(),
        progress: 0
      };
      MOCK_CONTRACTS.unshift(newContract);
      return newContract;
    }
  },

  users: {
    list: async (): Promise<User[]> => {
      await delay(500);
      return [...MOCK_USERS];
    },
    delete: async (id: string): Promise<void> => {
      await delay(400);
      const index = MOCK_USERS.findIndex((u) => u.id === id);
      if (index !== -1) MOCK_USERS.splice(index, 1);
    },
    updateRole: async (id: string, role: UserRole): Promise<void> => {
      await delay(300);
      const user = MOCK_USERS.find((u) => u.id === id);
      if (user) user.role = role;
    }
  }
};