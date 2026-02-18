import React, { useEffect, useState } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Proposal } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
export function AdminProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchProposals();
  }, []);
  const fetchProposals = async () => {
    try {
      const data = await api.proposals.list();
      setProposals(data);
    } catch (error) {
      console.error('Failed to fetch proposals', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      try {
        await api.proposals.delete(id);
        setProposals(proposals.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Failed to delete proposal', error);
      }
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manage Proposals</h1>
        <p className="text-slate-400">
          Review and moderate submitted proposals.
        </p>
      </div>

      {isLoading ?
      <div className="space-y-4">
          {[1, 2, 3].map((i) =>
        <div
          key={i}
          className="h-24 bg-white/5 rounded-xl animate-pulse">
        </div>
        )}
        </div> :

      <div className="grid gap-4">
          {proposals.map((proposal) =>
        <Card key={proposal.id} className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">
                      Bid: ${proposal.bidAmount}
                    </h3>
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
                  <p className="text-sm text-slate-300 mb-1">
                    For Job:{' '}
                    <Link
                  to={`/jobs/${proposal.jobId}`}
                  className="text-cyan-400 hover:underline">

                      {proposal.jobTitle}
                    </Link>
                  </p>
                  <p className="text-sm text-slate-400 mb-2">
                    By Freelancer: {proposal.freelancerName}
                  </p>
                  <p className="text-sm text-slate-500 italic line-clamp-2">
                    "{proposal.coverLetter}"
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(proposal.id)}>

                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </Card>
        )}

          {proposals.length === 0 &&
        <div className="text-center py-12 text-slate-500">
              No proposals found.
            </div>
        }
        </div>
      }
    </div>);

}