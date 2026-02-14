import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";
import { useAuth } from "../../hooks/useAuth";
import { useProposals } from "../../context/ProposalsContext";

export default function SubmitProposalPage() {

    const { id } = useParams(); 
    const navigate = useNavigate();
  
    const { jobs } = useJobs();
    const { user } = useAuth();
    const { addProposal } = useProposals();
  
    const job = useMemo(() => jobs.find((j) => j.id === id), [jobs, id]);
  
    const [coverLetter, setCoverLetter] = useState("");
    const [proposedBudget, setProposedBudget] = useState<number>(job?.budget ?? 0);
    const [estimatedDays, setEstimatedDays] = useState<number>(7);
    const [error, setError] = useState<string>("");

    if (!id) return <div className="p-6">Invalid job</div>;
  if (!job) return <div className="p-6">Job not found</div>;
  if (!user) return <div className="p-6">Please login to submit a proposal.</div>;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (coverLetter.trim().length < 20) {
      setError("Cover letter should be at least 20 characters.");
      return;
    }

    if (proposedBudget <= 0) {
        setError("Proposed budget must be greater than 0.");
        return;
      }
      if (estimatedDays <= 0) {
        setError("Estimated days must be greater than 0.");
        return;
      }
}
addProposal({
    jobId: job.id,
    freelancerId: user.id,
    freelancerName: user.name,
    coverLetter: coverLetter.trim(),
    proposedBudget,
    estimatedDays,
  });

  navigate(`/jobs/${job.id}`);


return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl border p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Submit Proposal</h1>
          <p className="text-sm text-gray-600 mt-1">
            Job: <span className="font-medium text-gray-900">{job.title}</span>
          </p>
        </div>

        {error ? (
          <div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Write a short message explaining why you're a good fit..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Mention your approach, timeline, and how you’ll communicate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Proposed Budget ($)</label>
              <input
                type="number"
                value={proposedBudget}
                onChange={(e) => setProposedBudget(Number(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estimated Days</label>
              <input
                type="number"
                value={estimatedDays}
                onChange={(e) => setEstimatedDays(Number(e.target.value))}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                min={1}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-black text-white hover:opacity-90"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}