import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../state/jobs';
import { useAuth } from '../../state/auth';
import { useProposals } from '../../state/proposals';
import { useAppliedSaved } from '../../state/appliedSaved';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Cards';
import { Button } from '../../components/ui/FormControls';
import { StatusBadge, CategoryBadge } from '../../components/ui/Badges';
import { ProposalModal } from '../../components/jobs/ProposalModal';
import { ProposalList } from '../../components/jobs/ProposalList';
import {
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Trash2,
  Pencil,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';

export function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { currentJob, fetchJobById, deleteJob, isLoading: jobLoading } = useJobs();
  const { user } = useAuth();
  const {
    proposals,
    fetchProposalsByJob,
    acceptProposal,
    rejectProposal,
    deleteProposal,
    isLoading: proposalsLoading,
  } = useProposals();
  const { savedJobs, saveJob, unsaveJob, appliedJobs, applyToJob, removeApplied, isApplied } =
    useAppliedSaved();

  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  // Withdraw-specific feedback states
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchJobById(id).catch(() => setFetchFailed(true));
      fetchProposalsByJob(id);
    }
  }, [id, fetchJobById, fetchProposalsByJob]);

  if (jobLoading || proposalsLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </Layout>
    );
  }

  if (!currentJob || fetchFailed) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-white mb-2">Job not found</h2>
          <p className="text-gray-400 mb-6">
            This job may have been removed or you don't have access.
          </p>
          <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
        </div>
      </Layout>
    );
  }

  const isOwner = user?.id === currentJob.createdBy;
  const isFreelancer = user?.role === 'FREELANCER';
  const isSaved = savedJobs.includes(currentJob.id);
  const hasApplied = isApplied(currentJob.id);

  const myProposal = isFreelancer
    ? proposals.find((p) => p.freelancerId === user?.id)
    : null;
  const hasExistingProposal = !!myProposal;

  const canDeleteJob = isOwner && currentJob.status === 'open';

  const handleSaveToggle = () => {
    if (isSaved) unsaveJob(currentJob.id);
    else saveJob(currentJob.id);
  };

  const handleProposalSubmit = () => {
    setIsEditingProposal(false);
    setIsProposalModalOpen(true);
  };

  const handleEditProposal = () => {
    setIsEditingProposal(true);
    setIsProposalModalOpen(true);
  };

  const handleDeleteJob = async () => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.'))
      return;
    try {
      await deleteJob(currentJob.id);
      navigate('/jobs/my');
    } catch (error) {
      console.error(error);
    }
  };

  // ─── Withdraw: calls DELETE /proposals/:id on backend ───
  const handleWithdrawProposal = async () => {
    if (!myProposal) return;
    if (
      !confirm(
        'Are you sure you want to withdraw your proposal? This action cannot be undone.',
      )
    )
      return;

    setIsWithdrawing(true);
    setWithdrawError(null);

    try {
      await deleteProposal(myProposal.id);   // → DELETE /proposals/:id
      removeApplied(currentJob.id);           // clear local applied cache
      if (id) await fetchProposalsByJob(id);  // refresh → proposal card disappears
    } catch (error: any) {
      console.error('Withdraw failed:', error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to withdraw proposal. Please try again.';
      setWithdrawError(msg);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <Layout>
      <Button
        variant="ghost"
        className="mb-6 pl-0 hover:bg-transparent hover:text-teal-400"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Main Content ── */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryBadge category={currentJob.category} />
                    <StatusBadge status={currentJob.status} />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {currentJob.title}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Posted {format(new Date(currentJob.createdAt), 'MMM d, yyyy')} by{' '}
                    {currentJob.createdByName || 'Unknown'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {canDeleteJob && (
                    <button
                      onClick={handleDeleteJob}
                      className="p-2 rounded-full text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                      title="Delete Job"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  {isFreelancer && (
                    <button
                      onClick={handleSaveToggle}
                      className={`p-2 rounded-full transition-colors ${
                        isSaved
                          ? 'text-teal-400 bg-teal-900/20'
                          : 'text-gray-500 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-6 h-6" />
                      ) : (
                        <Bookmark className="w-6 h-6" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{currentJob.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentJob.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Proposals Section ── */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Proposals ({proposals.length})
            </h2>

            {isOwner ? (
              <ProposalList
                proposals={proposals}
                onAccept={acceptProposal}
                onReject={rejectProposal}
                isOwner={true}
              />
            ) : isFreelancer && myProposal ? (
              <Card className="bg-[#1f2937]/30">
                {/* Header: title + status + action buttons */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-semibold">Your Proposal</h3>
                    <StatusBadge status={myProposal.status} />
                  </div>

                  {myProposal.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleEditProposal}
                        disabled={isWithdrawing}
                      >
                        <Pencil className="w-3 h-3 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleWithdrawProposal}
                        isLoading={isWithdrawing}
                        disabled={isWithdrawing}
                      >
                        {!isWithdrawing && <Trash2 className="w-3 h-3 mr-1" />}
                        Withdraw
                      </Button>
                    </div>
                  )}
                </div>

                {/* Error banner shown if backend DELETE fails */}
                {withdrawError && (
                  <div className="flex items-start gap-2 mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{withdrawError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#111827]/50 p-3 rounded-lg border border-gray-800">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Your Bid
                    </div>
                    <div className="text-lg font-bold text-[#f97316]">
                      LKR {myProposal.bidAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-[#111827]/50 p-3 rounded-lg border border-gray-800">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Delivery
                    </div>
                    <div className="text-lg font-bold text-white">
                      {myProposal.estimatedDays} days
                    </div>
                  </div>
                </div>

                <div className="bg-[#111827]/50 p-4 rounded-lg border border-gray-800/50">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Cover Letter
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {myProposal.coverLetter}
                  </p>
                </div>

                {myProposal.status === 'accepted' && (
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-500/20 rounded-lg text-green-400 text-sm">
                    🎉 Congratulations! Your proposal has been accepted.
                  </div>
                )}
                {myProposal.status === 'rejected' && (
                  <div className="mt-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    Your proposal was not selected for this job.
                  </div>
                )}
              </Card>
            ) : (
              <div className="bg-[#111827]/30 border border-gray-800 rounded-xl p-6 text-center text-gray-500">
                {hasApplied
                  ? 'You have submitted a proposal for this job.'
                  : 'Proposals are private and only visible to the client.'}
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Budget</span>
                <span className="text-xl font-bold text-teal-400">
                  LKR {currentJob.budget.toLocaleString()}
                </span>
              </div>

              {isFreelancer && currentJob.status === 'open' && !hasExistingProposal && (
                <Button className="w-full" size="lg" onClick={handleProposalSubmit}>
                  Apply Now
                </Button>
              )}

              {isFreelancer && hasExistingProposal && myProposal?.status === 'pending' && (
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={handleEditProposal}
                    disabled={isWithdrawing}
                  >
                    <Pencil className="w-4 h-4 mr-2" /> Edit Proposal
                  </Button>
                  <Button
                    className="w-full"
                    variant="danger"
                    onClick={handleWithdrawProposal}
                    isLoading={isWithdrawing}
                    disabled={isWithdrawing}
                  >
                    {!isWithdrawing && <Trash2 className="w-4 h-4 mr-2" />}
                    Withdraw Proposal
                  </Button>
                </div>
              )}

              {isFreelancer && hasExistingProposal && myProposal?.status !== 'pending' && (
                <Button className="w-full" variant="secondary" disabled>
                  {myProposal?.status === 'accepted'
                    ? '✓ Accepted'
                    : myProposal?.status === 'rejected'
                      ? 'Not Selected'
                      : 'Applied'}
                </Button>
              )}

              {currentJob.status !== 'open' && !isFreelancer && (
                <div className="w-full py-3 bg-gray-800 text-center text-gray-400 rounded-lg">
                  Job is in progress
                </div>
              )}

              {canDeleteJob && (
                <Button variant="danger" className="w-full" onClick={handleDeleteJob}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Job
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">About the Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                  {currentJob.createdByName?.charAt(0) || 'C'}
                </div>
                <div>
                  <div className="font-medium text-white">{currentJob.createdByName}</div>
                  <div className="text-xs text-gray-500">
                    Member since {new Date().getFullYear()}
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" /> Sri Lanka
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" /> Payment Verified
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isFreelancer && (
        <ProposalModal
          isOpen={isProposalModalOpen}
          onClose={() => {
            setIsProposalModalOpen(false);
            setIsEditingProposal(false);
          }}
          jobId={currentJob.id}
          jobTitle={currentJob.title}
          existingProposal={isEditingProposal ? myProposal : null}
        />
      )}
    </Layout>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
