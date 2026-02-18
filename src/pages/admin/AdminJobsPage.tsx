import React, { useEffect, useState } from 'react';
import { Search, Flag, Eye, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Job } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
export function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    try {
      const data = await api.jobs.list();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleToggleFlag = async (id: string) => {
    try {
      await api.jobs.toggleFlag(id);
      setJobs(
        jobs.map((j) =>
        j.id === id ?
        {
          ...j,
          flagged: !j.flagged
        } :
        j
        )
      );
    } catch (error) {
      console.error('Failed to toggle flag', error);
    }
  };
  const filteredJobs = jobs.filter(
    (job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Jobs</h1>
          <p className="text-slate-400">Review and moderate job postings.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search jobs..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

        </div>
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
          {filteredJobs.map((job) =>
        <Card
          key={job.id}
          className={`p-4 ${job.flagged ? 'border-red-500/30 bg-red-500/5' : ''}`}>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">
                      {job.title}
                    </h3>
                    {job.flagged &&
                <Badge variant="red" className="flex items-center gap-1">
                        <Flag className="h-3 w-3" /> Flagged
                      </Badge>
                }
                    <Badge
                  variant={job.status === 'open' ? 'emerald' : 'neutral'}>

                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2 line-clamp-1">
                    {job.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Posted by: {job.postedByName}</span>
                    <span>
                      Budget: ${job.budget} ({job.budgetType})
                    </span>
                    <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" /> View
                    </Button>
                  </Link>
                  <Button
                variant={job.flagged ? 'primary' : 'danger'}
                size="sm"
                onClick={() => handleToggleFlag(job.id)}>

                    {job.flagged ? 'Unflag' : 'Flag'}
                  </Button>
                </div>
              </div>
            </Card>
        )}

          {filteredJobs.length === 0 &&
        <div className="text-center py-12 text-slate-500">
              No jobs found matching your search.
            </div>
        }
        </div>
      }
    </div>);

}