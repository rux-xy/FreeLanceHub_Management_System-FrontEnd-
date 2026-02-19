import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Cards';
import { Button, Input } from '../../components/ui/FormControls';
import { StatusBadge, CategoryBadge } from '../../components/ui/Badges';
import { useJobs } from '../../state/jobs';
import { Search, Flag, FlagOff, Trash2, ExternalLink, AlertCircle } from 'lucide-react';

export function AdminJobs() {
  const { jobs, fetchJobs, toggleFlag, deleteJob, isLoading } = useJobs();

  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [flagging, setFlagging] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleToggleFlag = async (jobId: string) => {
    setFlagging(jobId);
    setError(null);
    try {
      await toggleFlag(jobId);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || 'Failed to update flag.',
      );
    } finally {
      setFlagging(null);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Delete this job? This cannot be undone.')) return;
    setDeleting(jobId);
    setError(null);
    try {
      await deleteJob(jobId);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || 'Failed to delete job.',
      );
    } finally {
      setDeleting(null);
    }
  };

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      (j.createdByName || '').toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">Job Management</h1>

      {/* Search */}
      <div className="bg-[#111827]/50 border border-gray-800 p-4 rounded-xl mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Search by title or creator…"
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

      {isLoading ? (
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
                    'Title',
                    'Category',
                    'Status',
                    'Created By',
                    'Budget',
                    'Flagged',
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
                {filtered.map((job) => {
                  const isFlagging = flagging === job.id;
                  const isDeleting = deleting === job.id;

                  return (
                    <tr
                      key={job.id}
                      className={`border-b border-gray-800/50 hover:bg-[#1f2937]/30 transition-colors ${
                        job.flagged ? 'bg-red-900/10' : ''
                      }`}
                    >
                      {/* Title */}
                      <td className="p-4">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-white font-medium hover:text-teal-400 transition-colors"
                        >
                          {job.title}
                        </Link>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <CategoryBadge category={job.category} />
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <StatusBadge status={job.status} />
                      </td>

                      {/* Creator */}
                      <td className="p-4 text-gray-400 text-sm">
                        {job.createdByName || 'Unknown'}
                      </td>

                      {/* Budget */}
                      <td className="p-4 text-teal-400 font-medium">
                        LKR {job.budget.toLocaleString()}
                      </td>

                      {/* Flagged indicator */}
                      <td className="p-4">
                        {job.flagged ? (
                          <span className="flex items-center gap-1 text-xs text-red-400">
                            <Flag className="w-3 h-3" /> Flagged
                          </span>
                        ) : (
                          <span className="text-xs text-gray-600">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Flag / Unflag */}
                          <Button
                            variant={job.flagged ? 'danger' : 'ghost'}
                            size="sm"
                            onClick={() => handleToggleFlag(job.id)}
                            disabled={isFlagging}
                            isLoading={isFlagging}
                            title={job.flagged ? 'Unflag' : 'Flag'}
                          >
                            {!isFlagging &&
                              (job.flagged ? (
                                <FlagOff className="w-3 h-3" />
                              ) : (
                                <Flag className="w-3 h-3" />
                              ))}
                          </Button>

                          {/* View */}
                          <Link to={`/jobs/${job.id}`}>
                            <Button variant="ghost" size="sm" title="View job">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>

                          {/* Delete */}
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(job.id)}
                            disabled={isDeleting}
                            isLoading={isDeleting}
                            title="Delete job"
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

          {filtered.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              {search ? 'No jobs match your search.' : 'No jobs found.'}
            </div>
          )}
        </Card>
      )}
    </Layout>
  );
}
