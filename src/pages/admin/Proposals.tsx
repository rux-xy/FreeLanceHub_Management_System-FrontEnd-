import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button, Input } from '../../components/ui/FormControls';
import { StatusBadge } from '../../components/ui/Badges';
import { proposalsService } from '../../services/proposals.service';
import { Proposal } from '../../types';
import { Search, Trash2, ExternalLink, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function AdminProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadProposals = async () => {
    setLoading(true);
    setError(null);
    try {
      // listAll() → GET /proposals  (admin endpoint for all proposals)
      const data = await proposalsService.listAll();
      setProposals(data);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 404 || status === 403) {
        setError(
          'The backend does not expose an admin "all proposals" endpoint yet. ' +
            'Ask your backend team to implement GET /proposals for admin users.',
        );
      } else {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            'Failed to load proposals.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  const handleDelete = async (proposalId: string) => {
    if (!confirm('Delete this proposal? This cannot be undone.')) return;
    setDeleting(proposalId);
    setError(null);
    try {
      await proposalsService.deleteProposal(proposalId);
      setProposals((prev) => prev.filter((p) => p.id !== proposalId));
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || 'Failed to delete proposal.',
      );
    } finally {
      setDeleting(null);
    }
  };

  const filtered = proposals.filter(
    (p) =>
      (p.freelancerName || '').toLowerCase().includes(search.toLowerCase()) ||
      p.coverLetter.toLowerCase().includes(search.toLowerCase()),
  );

  // Status filter counts for the summary bar
  const counts = {
    total: proposals.length,
    pending: proposals.filter((p) => p.status === 'pending').length,
    accepted: proposals.filter((p) => p.status === 'accepted').length,
    rejected: proposals.filter((p) => p.status === 'rejected').length,
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">Proposal Management</h1>

      {/* Summary bar */}
      {!loading && !error && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total', count: counts.total, color: 'text-white' },
            { label: 'Pending', count: counts.pending, color: 'text-yellow-400' },
            { label: 'Accepted', count: counts.accepted, color: 'text-green-400' },
            { label: 'Rejected', count: counts.rejected, color: 'text-red-400' },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              className="bg-[#111827]/50 border border-gray-800 rounded-xl p-4 text-center"
            >
              <div className={`text-2xl font-bold ${color}`}>{count}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="bg-[#111827]/50 border border-gray-800 p-4 rounded-xl mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Search by freelancer name or cover letter…"
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-2 mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500" />
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {[
                    'Freelancer',
                    'Bid (LKR)',
                    'Days',
                    'Status',
                    'Submitted',
                    'Cover Letter',
                    'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider p-4 last:text-right"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const isDeleting = deleting === p.id;

                  return (
                    <tr
                      key={p.id}
                      className="border-b border-gray-800/50 hover:bg-[#1f2937]/30 transition-colors"
                    >
                      {/* Freelancer */}
                      <td className="p-4 text-white font-medium">
                        {p.freelancerName || '—'}
                      </td>

                      {/* Bid */}
                      <td className="p-4 text-teal-400 font-medium">
                        {p.bidAmount.toLocaleString()}
                      </td>

                      {/* Days */}
                      <td className="p-4 text-gray-400">{p.estimatedDays}d</td>

                      {/* Status */}
                      <td className="p-4">
                        <StatusBadge status={p.status} />
                      </td>

                      {/* Submitted */}
                      <td className="p-4 text-gray-400 text-sm">
                        {formatDistanceToNow(new Date(p.submittedAt), {
                          addSuffix: true,
                        })}
                      </td>

                      {/* Cover letter snippet */}
                      <td className="p-4 text-gray-500 text-sm max-w-[200px]">
                        <span className="line-clamp-2">{p.coverLetter}</span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View the job this proposal belongs to */}
                          <Link to={`/jobs/${p.jobId}`}>
                            <Button variant="ghost" size="sm" title="View job">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>

                          {/* Delete proposal */}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(p.id)}
                            disabled={isDeleting}
                            isLoading={isDeleting}
                            title="Delete proposal"
                          >
                            {!isDeleting && <Trash2 className="w-3 h-3" />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              {search ? 'No proposals match your search.' : 'No proposals found.'}
            </div>
          )}
        </Card>
      )}
    </Layout>
  );
}
