import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/ui/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Cards';
import { Users, Briefcase, FileText, DollarSign, Bell, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../state/auth';
import { useJobs } from '../../state/jobs';
import { useNotifications } from '../../state/notifications';
import { proposalsService } from '../../services/proposals.service';
import { contractsService } from '../../services/contracts.service';

export function Dashboard() {
  const { getAllUsers } = useAuth();
  const { jobs, fetchJobs } = useJobs();
  const { unreadCount } = useNotifications();

  const [userCount, setUserCount] = useState<number | null>(null);
  const [proposalCount, setProposalCount] = useState<number | null>(null);
  const [contractCount, setContractCount] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        // All four data sources hit the real backend
        const [users, proposals, contracts] = await Promise.all([
          getAllUsers(),
          proposalsService.listAll(),
          contractsService.listContracts(),
        ]);
        setUserCount(users.length);
        setProposalCount(proposals.length);
        setContractCount(contracts.length);
      } catch (err: any) {
        console.error('Dashboard stats failed:', err);
        setLoadError(
          err?.response?.data?.message ||
          err?.message ||
          'Failed to load some statistics.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    load();
  }, [fetchJobs, getAllUsers]);

  const stats = [
    {
      label: 'Total Users',
      value: userCount,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-900/20',
      link: '/admin/users',
    },
    {
      label: 'Active Jobs',
      value: jobs.length,
      icon: Briefcase,
      color: 'text-teal-400',
      bg: 'bg-teal-900/20',
      link: '/admin/jobs',
    },
    {
      label: 'Total Proposals',
      value: proposalCount,
      icon: FileText,
      color: 'text-purple-400',
      bg: 'bg-purple-900/20',
      link: '/admin/proposals',
    },
    {
      label: 'Contracts',
      value: contractCount,
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-900/20',
      link: '/admin',
    },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      {/* Error banner if any stat failed to load */}
      {loadError && (
        <div className="flex items-start gap-2 mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{loadError}</span>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link}>
            <Card className="hover:border-teal-500/30 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {loading ? (
                      <span className="inline-block w-8 h-7 bg-gray-700 rounded animate-pulse" />
                    ) : stat.value === null ? (
                      <span className="text-gray-600">—</span>
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              to="/admin/users"
              className="flex items-center justify-between p-3 bg-[#111827]/50 rounded-lg hover:bg-[#1f2937] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Manage Users</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
            <Link
              to="/admin/jobs"
              className="flex items-center justify-between p-3 bg-[#111827]/50 rounded-lg hover:bg-[#1f2937] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-teal-400" />
                <span className="text-gray-300">Moderate Jobs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
            <Link
              to="/admin/proposals"
              className="flex items-center justify-between p-3 bg-[#111827]/50 rounded-lg hover:bg-[#1f2937] transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">Review Proposals</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </Link>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Backend connected</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full" />
              <span className="text-gray-300">Live data — real API</span>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">{unreadCount} unread notifications</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
