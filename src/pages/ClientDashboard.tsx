import React, { useEffect, useState } from 'react';
import { Plus, Briefcase, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '../services/api';
import { Job, Proposal } from '../types';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
export function ClientDashboard() {
  const { user } = useAuth();
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [jobProposals, setJobProposals] = useState<Record<string, Proposal[]>>(
    {}
  );
  const [loadingProposals, setLoadingProposals] = useState<string | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    budget: '',
    budgetType: 'fixed' as 'fixed' | 'hourly',
    skills: '',
    duration: '',
    experienceLevel: 'intermediate' as 'entry' | 'intermediate' | 'expert'
  });
  useEffect(() => {
    if (user) fetchMyJobs();
  }, [user]);
  const fetchMyJobs = async () => {
    if (!user) return;
    try {
      const jobs = await api.jobs.getByUser(user.id);
      setMyJobs(jobs);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await api.jobs.create({
        title: newJob.title,
        description: newJob.description,
        budget: Number(newJob.budget),
        budgetType: newJob.budgetType,
        skills: newJob.skills.split(',').map((s) => s.trim()),
        duration: newJob.duration,
        experienceLevel: newJob.experienceLevel,
        postedBy: user.id,
        postedByName: user.name
      });
      setIsCreatingJob(false);
      setNewJob({
        title: '',
        description: '',
        budget: '',
        budgetType: 'fixed',
        skills: '',
        duration: '',
        experienceLevel: 'intermediate'
      });
      fetchMyJobs();
    } catch (error) {
      console.error('Failed to create job', error);
    }
  };
  const toggleJobExpand = async (jobId: string) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
      return;
    }
    setExpandedJobId(jobId);
    if (!jobProposals[jobId]) {
      setLoadingProposals(jobId);
      try {
        const proposals = await api.proposals.getByJob(jobId);
        setJobProposals((prev) => ({
          ...prev,
          [jobId]: proposals
        }));
      } catch (error) {
        console.error('Failed to fetch proposals', error);
      } finally {
        setLoadingProposals(null);
      }
    }
  };
  const handleAcceptProposal = async (proposal: Proposal) => {
    if (!user) return;
    try {
      await api.contracts.create({
        jobId: proposal.jobId,
        jobTitle: proposal.jobTitle,
        clientId: user.id,
        clientName: user.name,
        freelancerId: proposal.freelancerId,
        freelancerName: proposal.freelancerName,
        amount: proposal.bidAmount
      });
      await api.proposals.updateStatus(proposal.id, 'accepted');
      await api.jobs.updateStatus(proposal.jobId, 'in-progress');
      const otherProposals = jobProposals[proposal.jobId].filter(
        (p) => p.id !== proposal.id
      );
      for (const p of otherProposals) {
        await api.proposals.updateStatus(p.id, 'rejected');
      }
      fetchMyJobs();
      const updatedProposals = await api.proposals.getByJob(proposal.jobId);
      setJobProposals((prev) => ({
        ...prev,
        [proposal.jobId]: updatedProposals
      }));
    } catch (error) {
      console.error('Failed to accept proposal', error);
    }
  };
  const handleRejectProposal = async (proposalId: string, jobId: string) => {
    try {
      await api.proposals.updateStatus(proposalId, 'rejected');
      const updatedProposals = await api.proposals.getByJob(jobId);
      setJobProposals((prev) => ({
        ...prev,
        [jobId]: updatedProposals
      }));
    } catch (error) {
      console.error('Failed to reject proposal', error);
    }
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome, {user?.name}
          </h1>
          <p className="text-slate-500">
            Manage your job postings and contracts.
          </p>
        </div>
        <Button onClick={() => setIsCreatingJob(!isCreatingJob)}>
          {isCreatingJob ?
          'Cancel' :

          <>
              <Plus className="h-4 w-4 mr-2" /> Post New Job
            </>
          }
        </Button>
      </div>

      {isCreatingJob &&
      <Card className="p-6 border-blue-200 shadow-md">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Create New Job Posting
          </h2>
          <form onSubmit={handleCreateJob} className="space-y-6">
            <Input
            label="Job Title"
            value={newJob.title}
            onChange={(e) =>
            setNewJob({
              ...newJob,
              title: e.target.value
            })
            }
            required />

            <TextArea
            label="Description"
            value={newJob.description}
            onChange={(e) =>
            setNewJob({
              ...newJob,
              description: e.target.value
            })
            }
            required
            rows={4} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
              label="Budget ($)"
              type="number"
              value={newJob.budget}
              onChange={(e) =>
              setNewJob({
                ...newJob,
                budget: e.target.value
              })
              }
              required />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Budget Type
                </label>
                <select
                className="block w-full rounded-lg border-slate-300 bg-white text-slate-900 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={newJob.budgetType}
                onChange={(e) =>
                setNewJob({
                  ...newJob,
                  budgetType: e.target.value as any
                })
                }>

                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
              label="Duration (e.g. '2 weeks')"
              value={newJob.duration}
              onChange={(e) =>
              setNewJob({
                ...newJob,
                duration: e.target.value
              })
              } />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Experience Level
                </label>
                <select
                className="block w-full rounded-lg border-slate-300 bg-white text-slate-900 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                value={newJob.experienceLevel}
                onChange={(e) =>
                setNewJob({
                  ...newJob,
                  experienceLevel: e.target.value as any
                })
                }>

                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
            <Input
            label="Skills (comma separated)"
            value={newJob.skills}
            onChange={(e) =>
            setNewJob({
              ...newJob,
              skills: e.target.value
            })
            }
            placeholder="React, Design, Writing..."
            required />

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg">
                Publish Job
              </Button>
            </div>
          </form>
        </Card>
      }

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" /> My Posted Jobs
        </h2>

        {isLoading ?
        <div className="space-y-4">
            {[1, 2].map((i) =>
          <div
            key={i}
            className="h-32 bg-slate-100 rounded-xl animate-pulse">
          </div>
          )}
          </div> :
        myJobs.length === 0 ?
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 mb-4">
              You haven't posted any jobs yet.
            </p>
            <Button onClick={() => setIsCreatingJob(true)}>
              Post Your First Job
            </Button>
          </div> :

        <div className="space-y-4">
            {myJobs.map((job) =>
          <Card key={job.id} className="overflow-hidden">
                <div
              className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => toggleJobExpand(job.id)}>

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {job.title}
                        </h3>
                        <Badge
                      variant={
                      job.status === 'open' ? 'emerald' : 'neutral'
                      }>

                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>
                          Posted {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                        <span>
                          ${job.budget} ({job.budgetType})
                        </span>
                        <span>{job.proposalsCount} Proposals</span>
                      </div>
                    </div>
                    <div className="text-slate-400">
                      {expandedJobId === job.id ?
                  <ChevronUp /> :

                  <ChevronDown />
                  }
                    </div>
                  </div>
                </div>

                {expandedJobId === job.id &&
            <div className="border-t border-slate-100 bg-slate-50 p-6">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                      Proposals ({job.proposalsCount})
                    </h4>

                    {loadingProposals === job.id ?
              <div className="text-center py-4 text-slate-500">
                        Loading proposals...
                      </div> :
              jobProposals[job.id]?.length > 0 ?
              <div className="space-y-4">
                        {jobProposals[job.id].map((proposal) =>
                <div
                  key={proposal.id}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">

                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <div className="font-bold text-slate-900">
                                  {proposal.freelancerName}
                                </div>
                                <div className="text-sm text-blue-600 font-medium">
                                  Bid: ${proposal.bidAmount}
                                </div>
                              </div>
                              <Badge
                      variant={
                      proposal.status === 'accepted' ?
                      'emerald' :
                      proposal.status === 'rejected' ?
                      'red' :
                      'neutral'
                      }>

                                {proposal.status}
                              </Badge>
                            </div>
                            <p className="text-slate-600 text-sm mb-4 italic">
                              "{proposal.coverLetter}"
                            </p>

                            {proposal.status === 'pending' &&
                  job.status === 'open' &&
                  <div className="flex gap-2">
                                  <Button
                      size="sm"
                      onClick={() =>
                      handleAcceptProposal(proposal)
                      }
                      className="bg-emerald-600 text-white hover:bg-emerald-700">

                                    <Check className="h-4 w-4 mr-1" /> Accept
                                  </Button>
                                  <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                      handleRejectProposal(proposal.id, job.id)
                      }>

                                    <X className="h-4 w-4 mr-1" /> Reject
                                  </Button>
                                </div>
                  }
                          </div>
                )}
                      </div> :

              <div className="text-slate-500 italic">
                        No proposals yet.
                      </div>
              }
                  </div>
            }
              </Card>
          )}
          </div>
        }
      </div>
    </div>);

}