import React, { useEffect, useState } from 'react';
import { FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Job, Proposal, Contract } from '../types';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
export function FreelancerDashboard() {
  const { user } = useAuth();
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [myProposals, setMyProposals] = useState<Proposal[]>([]);
  const [myContracts, setMyContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user) fetchData();
  }, [user]);
  const fetchData = async () => {
    if (!user) return;
    try {
      const [jobs, proposals, contracts] = await Promise.all([
      api.jobs.list(),
      api.proposals.getByFreelancer(user.id),
      api.contracts.getByUser(user.id)]
      );
      setRecentJobs(jobs.slice(0, 4));
      setMyProposals(proposals);
      setMyContracts(contracts);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-slate-500">
          Here's what's happening with your work.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Work */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Contracts */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" /> Active
                Contracts
              </h2>
              <Link
                to="/contracts"
                className="text-sm text-blue-600 hover:text-blue-700">

                View All
              </Link>
            </div>

            {isLoading ?
            <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div> :
            myContracts.filter((c) => c.status === 'active').length ===
            0 ?
            <Card className="p-6 text-center border-dashed border-slate-200">
                <p className="text-slate-500 mb-2">No active contracts yet.</p>
                <Link to="/jobs">
                  <Button variant="outline" size="sm">
                    Find Work
                  </Button>
                </Link>
              </Card> :

            <div className="space-y-4">
                {myContracts.
              filter((c) => c.status === 'active').
              map((contract) =>
              <Card key={contract.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {contract.jobTitle}
                          </h3>
                          <p className="text-sm text-slate-500">
                            Client: {contract.clientName}
                          </p>
                        </div>
                        <Badge variant="emerald">Active</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-600">
                          <span>Progress</span>
                          <span>{contract.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${contract.progress}%`
                      }} />

                        </div>
                      </div>
                    </Card>
              )}
              </div>
            }
          </section>

          {/* Recent Proposals */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-amber-500" /> Recent Proposals
            </h2>

            {isLoading ?
            <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div> :
            myProposals.length === 0 ?
            <Card className="p-6 text-center border-dashed border-slate-200">
                <p className="text-slate-500">
                  You haven't submitted any proposals yet.
                </p>
              </Card> :

            <div className="space-y-4">
                {myProposals.slice(0, 3).map((proposal) =>
              <Card
                key={proposal.id}
                className="p-4 flex items-center justify-between">

                    <div>
                      <h3 className="font-medium text-slate-900">
                        {proposal.jobTitle}
                      </h3>
                      <p className="text-sm text-slate-500">
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
                  </Card>
              )}
              </div>
            }
          </section>
        </div>

        {/* Right Column: Find Work */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Find New Work
            </h2>
            <p className="text-blue-700 mb-6 text-sm">
              Browse the latest opportunities matching your skills.
            </p>
            <Link to="/jobs">
              <Button className="w-full">Browse All Jobs</Button>
            </Link>
          </Card>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Newest Jobs
            </h3>
            <div className="space-y-3">
              {recentJobs.map((job) =>
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="block group">

                  <Card hoverable className="p-4">
                    <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {job.title}
                    </h4>
                    <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                      <span>${job.budget}</span>
                      <span>{job.budgetType}</span>
                    </div>
                  </Card>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}