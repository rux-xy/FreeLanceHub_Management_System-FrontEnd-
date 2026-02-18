import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, Filter, Briefcase } from 'lucide-react';
import { api } from '../services/api';
import { Job } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.jobs.list();
        setJobs(data.filter((j) => !j.flagged && j.status === 'open'));
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);
  const filteredJobs = jobs.filter(
    (job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <div className="hidden lg:block space-y-6">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg mb-4">
          <Filter className="h-5 w-5 text-blue-600" /> Filters
        </div>

        <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Search
            </h3>
            <Input
              placeholder="Keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Job Type
            </h3>
            <div className="space-y-2">
              {['Fixed Price', 'Hourly'].map((type) =>
              <label
                key={type}
                className="flex items-center gap-2 text-slate-600 cursor-pointer hover:text-slate-900">

                  <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />

                  <span className="text-sm">{type}</span>
                </label>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Experience Level
            </h3>
            <div className="space-y-2">
              {['Entry Level', 'Intermediate', 'Expert'].map((level) =>
              <label
                key={level}
                className="flex items-center gap-2 text-slate-600 cursor-pointer hover:text-slate-900">

                  <input
                  type="checkbox"
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />

                  <span className="text-sm">{level}</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-slate-900">
            Available Opportunities
          </h1>
          <span className="text-slate-500 text-sm">
            {filteredJobs.length} jobs found
          </span>
        </div>

        {isLoading ?
        <div className="space-y-4">
            {[1, 2, 3].map((i) =>
          <div
            key={i}
            className="h-48 animate-pulse bg-slate-100 rounded-2xl" />

          )}
          </div> :

        <div className="space-y-4">
            {filteredJobs.map((job) =>
          <Link key={job.id} to={`/jobs/${job.id}`} className="block group">
                <Card hoverable className="p-6 border-l-4 border-l-blue-600">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {job.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> Posted{' '}
                          {new Date(job.postedAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="capitalize">
                          {job.experienceLevel}
                        </span>
                        <span>•</span>
                        <span>Est. Time: {job.duration}</span>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <Badge variant="violet">
                        {job.budgetType === 'hourly' ? 'Hourly' : 'Fixed Price'}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 4).map((skill) =>
                  <Badge key={skill} variant="neutral">
                          {skill}
                        </Badge>
                  )}
                      {job.skills.length > 4 &&
                  <span className="text-xs text-slate-500 self-center">
                          +{job.skills.length - 4} more
                        </span>
                  }
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5 font-medium text-slate-900">
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                        {job.budgetType === 'hourly' ?
                    `$${job.budget}/hr` :
                    `$${job.budget.toLocaleString()}`}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.proposalsCount} proposals</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
          )}

            {filteredJobs.length === 0 &&
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 text-lg">
                  No jobs found matching your criteria.
                </p>
              </div>
          }
          </div>
        }
      </div>
    </div>);

}