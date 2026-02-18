import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, FileText, FileStack, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
export function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    proposals: 0,
    contracts: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, jobs, proposals, contracts] = await Promise.all([
        api.users.list(),
        api.jobs.list(),
        api.proposals.list(),
        api.contracts.list()]
        );
        setStats({
          users: users.length,
          jobs: jobs.length,
          proposals: proposals.length,
          contracts: contracts.length
        });
      } catch (error) {
        console.error('Failed to fetch admin stats', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);
  const statCards = [
  {
    label: 'Total Users',
    value: stats.users,
    icon: Users,
    color: 'cyan',
    link: '/admin/users'
  },
  {
    label: 'Total Jobs',
    value: stats.jobs,
    icon: Briefcase,
    color: 'violet',
    link: '/admin/jobs'
  },
  {
    label: 'Total Proposals',
    value: stats.proposals,
    icon: FileStack,
    color: 'amber',
    link: '/admin/proposals'
  },
  {
    label: 'Active Contracts',
    value: stats.contracts,
    icon: FileText,
    color: 'emerald',
    link: '/contracts'
  }];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-500">
          Overview of platform activity and management.
        </p>
      </div>

      {isLoading ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) =>
        <div
          key={i}
          className="h-32 rounded-2xl bg-slate-100 animate-pulse">
        </div>
        )}
        </div> :

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) =>
        <Link key={stat.label} to={stat.link}>
              <Card
            hoverable
            className="p-6 h-full flex flex-col justify-between group">

                <div className="flex justify-between items-start mb-4">
                  <div
                className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>

                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge
                variant={stat.color as any}
                className="group-hover:bg-slate-100 transition-colors">

                    View
                  </Badge>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              </Card>
            </Link>
        )}
        </div>
      }

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">New user registration</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">
                  New job posted: "React Developer"
                </p>
                <p className="text-xs text-slate-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">
                  Proposal submitted for "Logo Design"
                </p>
                <p className="text-xs text-slate-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link to="/admin/users" className="block">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-700 group-hover:text-slate-900">
                    Manage Users
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
              </div>
            </Link>
            <Link to="/admin/jobs" className="block">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-violet-600" />
                  <span className="text-slate-700 group-hover:text-slate-900">
                    Review Jobs
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
              </div>
            </Link>
            <Link to="/admin/proposals" className="block">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileStack className="h-5 w-5 text-amber-600" />
                  <span className="text-slate-700 group-hover:text-slate-900">
                    Moderate Proposals
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>);

}