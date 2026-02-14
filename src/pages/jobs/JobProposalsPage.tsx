import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";
import { useProposals } from "../../context/ProposalsContext";

export default function JobProposalsPage() {

    const { jobId } = useParams();
    const navigate = useNavigate();
  
    const { user } = useAuth();
    const { jobs } = useJobs();
    const { getProposalsByJobId } = useProposals();
  
    const job = useMemo(() => jobs.find((j) => j.id === jobId), [jobs, jobId]);
  
    const proposals = useMemo(() => {
      if (!jobId) return [];
      return getProposalsByJobId(jobId);
    }, [jobId, getProposalsByJobId]);

    if (!jobId) return <div className="p-6">Invalid job</div>;
    if (!job) return <div className="p-6">Job not found</div>;

    if (!user) {
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white border rounded-xl p-6 space-y-4">
              <h1 className="text-xl font-bold">View Proposals</h1>
              <p className="text-gray-600">Please login to view proposals.</p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 rounded-lg bg-black text-white hover:opacity-90"
              >
                Go to Login
              </button>
            </div>
          </div>
        );
      }

      return ()
}