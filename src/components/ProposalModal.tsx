import React, { useState } from 'react';
import { X, CheckCircle, DollarSign, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { Input, TextArea } from './ui/Input';
import { Job } from '../types';
interface ProposalModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}
export function ProposalModal({
  job,
  isOpen,
  onClose,
  onSubmit
}: ProposalModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [coverLetter, setCoverLetter] = useState('');
  const [bidAmount, setBidAmount] = useState(job.budget.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSubmit({
      coverLetter,
      bidAmount: Number(bidAmount)
    });
    setIsSubmitting(false);
    setStep(3);
  };
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">

      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={onClose}>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">

          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          {step !== 3 &&
          <div className="absolute top-4 right-4">
              <button
              onClick={onClose}
              className="rounded-full p-1 text-slate-400 hover:text-slate-600 focus:outline-none">

                <X className="h-6 w-6" />
              </button>
            </div>
          }

          {step === 1 &&
          <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Cover Letter
                  </h3>
                  <p className="text-sm text-slate-500">Step 1 of 2</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Introduce yourself to the client and explain why you're a
                  great fit for{' '}
                  <strong className="text-slate-900">{job.title}</strong>.
                </p>
                <TextArea
                rows={6}
                placeholder="Hi there, I'd love to help with your project..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                autoFocus />

              </div>

              <div className="mt-8 flex justify-end">
                <Button
                onClick={() => setStep(2)}
                disabled={!coverLetter.trim()}>

                  Next: Bid Details
                </Button>
              </div>
            </div>
          }

          {step === 2 &&
          <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Your Bid</h3>
                  <p className="text-sm text-slate-500">Step 2 of 2</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Total Bid Amount ($)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">$</span>
                    </div>
                    <input
                    type="number"
                    className="block w-full rounded-lg border-slate-300 pl-7 pr-12 py-3 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="0.00"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)} />

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Client's budget: ${job.budget} ({job.budgetType})
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 space-y-2 border border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service Fee (10%)</span>
                    <span className="text-slate-900">
                      -${(Number(bidAmount) * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-2 border-t border-slate-200">
                    <span className="text-slate-900">You'll Receive</span>
                    <span className="text-blue-600">
                      ${(Number(bidAmount) * 0.9).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                onClick={handleSubmit}
                isLoading={isSubmitting}
                disabled={!bidAmount}>

                  Submit Proposal
                </Button>
              </div>
            </div>
          }

          {step === 3 &&
          <div className="p-6 sm:p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-6">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Proposal Sent!
              </h3>
              <p className="text-slate-500 mb-8">
                Your proposal for <strong>{job.title}</strong> has been sent to
                the client. Good luck!
              </p>
              <Button onClick={onClose} className="w-full">
                Back to Jobs
              </Button>
            </div>
          }
        </div>
      </div>
    </div>);

}