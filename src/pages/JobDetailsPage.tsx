import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Shield,
  Flag,
  Heart,
  User as UserIcon,
  Check } from
'lucide-react';
import { api } from '../services/api';
import { Job, Proposal } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProposalModal } from '../components/ProposalModal';
import { useAuth } from '../context/AuthContext';
export function JobDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const data = await api.jobs.get(id);
        setJob(data);
        if (user && data && user.id === data.postedBy) {
          const props = await api.proposals.getByJob(id);
          setProposals(props);
        }
      } catch (error) {
        console.error('Failed to fetch job', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id, user]);
  const handleProposalSubmit = async (data: any) => {
    if (!user || !job) return;
    try {
      await api.proposals.create({
        jobId: job.id,
        jobTitle: job.title,
        freelancerId: user.id,
        freelancerName: user.name,
        coverLetter: data.coverLetter,
        bidAmount: data.bidAmount
      });
      const updatedJob = await api.jobs.get(job.id);
      setJob(updatedJob);
    } catch (error) {
      console.error('Failed to submit proposal', error);
    }
  };
  const handleAcceptProposal = async (proposal: Proposal) => {
    if (!user || !job) return;
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
      await api.jobs.updateStatus(job.id, 'in-progress');
      const updatedProps = await api.proposals.getByJob(job.id);
      setProposals(updatedProps);
      const updatedJob = await api.jobs.get(job.id);
      setJob(updatedJob);
    } catch (error) {
      console.error('Failed to accept proposal', error);
    }
  };
  if (isLoading)
  return (
    <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>);

  if (!job)
  return <div className="text-center py-20 text-slate-900">Job not found</div>;
  const isOwner = user?.id === job.postedBy;
  const isFreelancer = user?.role === 'freelancer';
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/jobs')}
          className="pl-0 hover:bg-transparent hover:text-blue-600">

          ← Back to Jobs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <Card className="p-8">
            <div className="border-b border-slate-100 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <Badge variant="violet">
                  {job.budgetType === 'hourly' ? 'Hourly Rate' : 'Fixed Price'}
                </Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Posted{' '}
                  {new Date(job.postedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Remote
                </span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Job Description
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) =>
                <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-6 border border-slate-100">
              <div>
                <div className="text-sm text-slate-500 mb-1">
                  Project Budget
                </div>
                <div className="text-xl font-bold text-slate-900">
                  {job.budgetType === 'hourly' ?
                  `$${job.budget}/hr` :
                  `$${job.budget.toLocaleString()}`}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">
                  Experience Level
                </div>
                <div className="text-lg font-medium text-slate-900 capitalize">
                  {job.experienceLevel || 'Intermediate'}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Est. Duration</div>
                <div className="text-lg font-medium text-slate-900">
                  {job.duration || 'Not specified'}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Proposals</div>
                <div className="text-lg font-medium text-slate-900">
                  {job.proposalsCount} received
                </div>
              </div>
            </div>
          </Card>

          {/* Proposals Section (Only for Client Owner) */}
          {isOwner &&
          <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Received Proposals
              </h2>
              {proposals.length === 0 ?
            <p className="text-slate-500">No proposals yet.</p> :

            proposals.map((proposal) =>
            <Card key={proposal.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {proposal.freelancerName}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          Bid: ${proposal.bidAmount}
                        </p>
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
                    <p className="text-slate-600 mb-4 italic">
                      "{proposal.coverLetter}"
                    </p>

                    {proposal.status === 'pending' && job.status === 'open' &&
              <div className="flex gap-3">
                        <Button
                  size="sm"
                  onClick={() => handleAcceptProposal(proposal)}
                  className="bg-emerald-600 text-white hover:bg-emerald-700">

                          <Check className="h-4 w-4 mr-2" /> Accept Proposal
                        </Button>
                      </div>
              }
                  </Card>
            )
            }
            </div>
          }
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card className="p-6 sticky top-24">
            {isFreelancer ?
            <>
                <Button
                className="w-full mb-4"
                size="lg"
                onClick={() => setIsModalOpen(true)}
                disabled={job.status !== 'open'}>

                  {job.status === 'open' ? 'Apply Now' : 'Job Closed'}
                </Button>
                <Button
                variant="outline"
                className="w-full mb-6 flex items-center justify-center gap-2">

                  <Heart className="h-4 w-4" /> Save Job
                </Button>
              </> :
            isOwner ?
            <div className="text-center p-4 bg-slate-50 rounded-xl mb-6">
                <p className="text-slate-900 font-medium">
                  You posted this job
                </p>
                <Link
                to="/client-dashboard"
                className="text-sm text-blue-600 hover:underline">

                  Manage in Dashboard
                </Link>
              </div> :

            <div className="text-center p-4 bg-slate-50 rounded-xl mb-6">
                <p className="text-slate-500 text-sm">
                  Log in as a freelancer to apply
                </p>
                <Link to="/login" className="block mt-2">
                  <Button size="sm" className="w-full">
                    Log In
                  </Button>
                </Link>
              </div>
            }

            <div className="space-y-4 text-sm text-slate-500 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span>Payment verified</span>
              </div>
              <div className="flex items-center gap-3">
                <UserIcon className="h-5 w-5 text-slate-400" />
                <span>${job.budget} total budget</span>
              </div>
              <div className="flex items-center gap-3">
                <Flag className="h-5 w-5 text-slate-400" />
                <span>Report this job</span>
              </div>
            </div>
          </Card>

          {/* Client Info */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4">
              About the Client
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <div className="font-medium text-slate-900">
                  {job.postedByName}
                </div>
                <div className="text-sm text-slate-500">
                  University Verified
                </div>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              <p className="mb-2">Member since Oct 2023</p>
              <p>15 jobs posted • 85% hire rate</p>
            </div>
          </Card>
        </div>
      </div>

      <ProposalModal
        job={job}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProposalSubmit} />

    </div>);

}