import { Proposal, CreateProposalInput, ProposalStatus } from '../types';
import { api } from '../lib/axios';

export const proposalsService = {
  async listByJob(jobId: string): Promise<Proposal[]> {
    const res = await api.get(`/proposals/job/${jobId}`);
    return res.data as Proposal[];
  },

  // Returns only the authenticated user's own proposals
  async listMyProposals(): Promise<Proposal[]> {
    const res = await api.get('/proposals/my-proposals');
    return res.data as Proposal[];
  },

  // Alias kept for backward compat with state/proposals.tsx fetchByFreelancer
  async listByFreelancer(_freelancerId: string): Promise<Proposal[]> {
    return this.listMyProposals();
  },

  /**
   * Admin: fetch ALL proposals on the platform.
   * Tries GET /proposals first (standard admin endpoint).
   * Falls back to GET /proposals/all if backend uses that route.
   * If your backend uses a different path, update here.
   */
  async listAll(): Promise<Proposal[]> {
    try {
      const res = await api.get('/proposals');
      return res.data as Proposal[];
    } catch (err: any) {
      if (err?.response?.status === 404 || err?.response?.status === 405) {
        // Fallback route
        const res = await api.get('/proposals/all');
        return res.data as Proposal[];
      }
      throw err;
    }
  },

  async createProposal(
    input: CreateProposalInput,
    _freelancerId: string,
    _freelancerName: string,
  ): Promise<Proposal> {
    const res = await api.post('/proposals', input);
    return res.data as Proposal;
  },

  async updateStatus(proposalId: string, status: ProposalStatus): Promise<Proposal> {
    const res = await api.put(
      `/proposals/${proposalId}/status?status=${encodeURIComponent(status)}`,
    );
    return res.data as Proposal;
  },

  /**
   * Edit a pending proposal's content (bid, days, cover letter).
   * Tries PATCH first (standard partial-update), falls back to PUT.
   * If your backend uses a different route, update the paths here.
   */
  async updateProposal(
    proposalId: string,
    updates: { coverLetter: string; bidAmount: number; estimatedDays: number },
  ): Promise<Proposal> {
    try {
      const res = await api.patch(`/proposals/${proposalId}`, updates);
      return res.data as Proposal;
    } catch (patchErr: any) {
      const status = patchErr?.response?.status;
      if (status !== 404 && status !== 405) throw patchErr;
      const res = await api.put(`/proposals/${proposalId}`, updates);
      return res.data as Proposal;
    }
  },

  async acceptProposal(proposalId: string): Promise<any> {
    // Backend creates the contract automatically and returns it
    const res = await api.post(`/proposals/${proposalId}/accept`);
    return res.data;
  },

  async rejectProposal(proposalId: string): Promise<Proposal> {
    const res = await api.put(`/proposals/${proposalId}/status?status=rejected`);
    return res.data as Proposal;
  },

  async deleteProposal(proposalId: string): Promise<void> {
    await api.delete(`/proposals/${proposalId}`);
  },
};
