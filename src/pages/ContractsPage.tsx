import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import { api } from '../services/api';
import { Contract } from '../types';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
export function ContractsPage() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchContracts = async () => {
      if (!user) return;
      try {
        const data = await api.contracts.getByUser(user.id);
        setContracts(data);
      } catch (error) {
        console.error('Failed to fetch contracts', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, [user]);
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Contracts</h1>

      {isLoading ?
      <div className="space-y-4">
          {[1, 2].map((i) =>
        <div
          key={i}
          className="h-40 animate-pulse bg-slate-100 rounded-2xl" />

        )}
        </div> :

      <div className="space-y-6">
          {contracts.map((contract) =>
        <Card key={contract.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">
                      {contract.jobTitle}
                    </h2>
                    <Badge
                  variant={
                  contract.status === 'active' ? 'emerald' : 'neutral'
                  }>

                      {contract.status === 'active' ? 'Active' : 'Completed'}
                    </Badge>
                  </div>
                  <p className="text-slate-500 mb-4">
                    {user?.role === 'client' ? 'Freelancer' : 'Client'}:{' '}
                    <span className="text-slate-900 font-medium">
                      {user?.role === 'client' ?
                  contract.freelancerName :
                  contract.clientName}
                    </span>{' '}
                    • Started{' '}
                    {new Date(contract.startDate).toLocaleDateString()}
                  </p>

                  {contract.status === 'active' &&
              <div className="max-w-md">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-slate-900 font-medium">
                          {contract.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${contract.progress}%`
                    }} />

                      </div>
                      {contract.nextMilestone &&
                <p className="text-xs text-slate-500 mt-2">
                          Next milestone: {contract.nextMilestone}
                        </p>
                }
                    </div>
              }
                </div>

                <div className="flex flex-col items-end gap-4 min-w-[200px]">
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Total Amount</div>
                    <div className="text-2xl font-bold text-slate-900">
                      ${contract.amount.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 md:flex-none">

                      Messages
                    </Button>
                    <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 md:flex-none">

                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
        )}

          {contracts.length === 0 &&
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
              <div className="mx-auto h-12 w-12 text-slate-400 mb-4">
                <FileText className="h-full w-full" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">
                No active contracts
              </h3>
              <p className="text-slate-500 mt-1">
                {user?.role === 'client' ?
            "You haven't hired anyone yet." :
            'Start applying to jobs to get your first contract!'}
              </p>
            </div>
        }
        </div>
      }
    </div>);

}