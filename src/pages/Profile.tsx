import React from 'react';
import { useAuth } from '../state/auth';
import { Layout } from '../components/ui/Layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../components/ui/Cards';
import { RoleBadge } from '../components/ui/Badges';
import { User, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { PerformanceOverview } from '../components/profile/PerformanceOverview';
import { ClientReviews } from '../components/profile/ClientReviews';
import { FreelancerRating } from '../components/profile/FreelancerRating';
export function Profile() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-24 h-24 bg-teal-900/30 rounded-full flex items-center justify-center text-teal-400 border-2 border-teal-500/30 shadow-lg shadow-teal-500/10">
                <User className="w-12 h-12" />
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                      {user.name}
                    </h2>
                    <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                      <RoleBadge role={user.role} />
                      {user.role === 'freelancer' &&
                      <FreelancerRating user={user} />
                      }
                    </div>
                  </div>

                  {user.role === 'freelancer' &&
                  <div className="hidden md:block text-right">
                      <div className="text-sm text-[#888888] mb-1">
                        Completion Rate
                      </div>
                      <div className="text-2xl font-bold text-[#f97316]">
                        {user.completionRate || 0}%
                      </div>
                    </div>
                  }
                </div>

                {user.bio &&
                <p className="mt-4 text-gray-300 max-w-2xl leading-relaxed">
                    {user.bio}
                  </p>
                }
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 mt-6 border-t border-[#222222] pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center p-4 bg-[#111827]/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="w-10 h-10 bg-[#1f2937] rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Email Address
                  </p>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-[#111827]/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="w-10 h-10 bg-[#1f2937] rounded-full flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Member Since
                  </p>
                  <p className="text-white font-medium">
                    {format(new Date(user.createdAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {user.role === 'freelancer' &&
        <>
            <PerformanceOverview user={user} />
            <ClientReviews freelancerId={user.id} />
          </>
        }
      </div>
    </Layout>);

}