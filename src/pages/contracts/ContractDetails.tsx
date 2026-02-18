import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContracts } from '../../state/contracts';
import { useAuth } from '../../state/auth';
import { Layout } from '../../components/ui/Layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Cards';
import { Button } from '../../components/ui/FormControls';
import { StatusBadge, PaymentBadge } from '../../components/ui/Badges';
import { CheckCircle, CreditCard, MessageSquare, FileText } from 'lucide-react';
import { format } from 'date-fns';
export function ContractDetails() {
  const { id } = useParams<{
    id: string;
  }>();
  const { currentContract, fetchContractById, completeContract, isLoading } =
  useContracts();
  const { user } = useAuth();
  useEffect(() => {
    if (id) {
      fetchContractById(id);
    }
  }, [id, fetchContractById]);
  if (isLoading || !currentContract) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </Layout>);

  }
  const isClient = user?.role === 'client';
  const isFreelancer = user?.role === 'freelancer';
  const handleComplete = async () => {
    if (confirm('Are you sure you want to mark this contract as completed?')) {
      await completeContract(currentContract.id);
    }
  };
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Contract Details</h1>
          <div className="flex gap-2">
            <StatusBadge status={currentContract.status} />
            <PaymentBadge status={currentContract.paymentStatus} />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agreement Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Contract ID</span>
                <span className="text-white font-mono">
                  {currentContract.id}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Agreed Price</span>
                <span className="text-teal-400 font-bold text-lg">
                  LKR {currentContract.agreedPrice.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Start Date</span>
                <span className="text-white">
                  {format(new Date(currentContract.startedAt), 'PPP')}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Completion Date</span>
                <span className="text-white">
                  {currentContract.completedAt ?
                  format(new Date(currentContract.completedAt), 'PPP') :
                  '-'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MessageSquare className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Communication
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Chat with your {isClient ? 'freelancer' : 'client'} about the
                project.
              </p>
              <Link to="/chat" className="w-full">
                <Button variant="secondary" className="w-full">
                  Open Chat
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <CreditCard className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Payment</h3>

              {currentContract.paymentStatus === 'paid' ?
              <>
                  <p className="text-green-400 text-sm mb-4">
                    Payment Completed
                  </p>
                  <Link
                  to={`/payments/result/mock-payment-id`}
                  className="w-full">

                    <Button variant="secondary" className="w-full">
                      View Receipt
                    </Button>
                  </Link>
                </> :
              isClient ?
              <>
                  <p className="text-gray-400 text-sm mb-4">
                    Payment is pending.
                  </p>
                  <Link
                  to={`/payments/checkout/${currentContract.id}`}
                  className="w-full">

                    <Button className="w-full">Pay Now</Button>
                  </Link>
                </> :

              <p className="text-gray-400 text-sm mb-4">
                  Waiting for client payment.
                </p>
              }
            </CardContent>
          </Card>
        </div>

        {currentContract.status === 'active' &&
        <Card className="border-teal-900/50 bg-teal-900/10">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Complete Contract
                </h3>
                <p className="text-gray-400 text-sm">
                  Mark the job as finished when all work is delivered.
                </p>
              </div>
              <Button onClick={handleComplete}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            </CardContent>
          </Card>
        }
      </div>
    </Layout>);

}