import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Cards';
import { User } from '../../types';
interface PerformanceOverviewProps {
  user: User;
}
export function PerformanceOverview({ user }: PerformanceOverviewProps) {
  const stats = [
  {
    label: 'Total Proposals',
    value: user.totalProposals || 0,
    subtext: 'Submitted job applications'
  },
  {
    label: 'Completed Projects',
    value: user.totalCompletedProjects || 0,
    subtext: 'Successfully delivered'
  },
  {
    label: 'Completion Rate',
    value: `${user.completionRate || 0}%`,
    subtext: 'Projects completed vs accepted'
  },
  {
    label: 'Active Contracts',
    value: user.activeContracts || 0,
    subtext: 'Currently ongoing work'
  }];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) =>
          <div
            key={index}
            className="bg-[#111827]/50 rounded-lg border border-gray-800 p-5 flex flex-col items-center text-center hover:border-gray-700 transition-colors">

              <span className="text-3xl font-bold text-[#f97316] mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-white mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-[#666666]">{stat.subtext}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>);

}