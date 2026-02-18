import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AlertCircle, GraduationCap } from 'lucide-react';
import { UserRole } from '../types';
export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('freelancer');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { register, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }
    try {
      await register(name, email, password, role);
      if (role === 'client') navigate('/client-dashboard');else
      navigate('/freelancer-dashboard');
    } catch (err) {

      // Error handled by context
    }};
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20 mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Account
          </h1>
          <p className="text-slate-500">Join the UniFreelancer community</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          {(error || validationError) &&
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {error || validationError}
            </div>
          }

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@uni.edu"
              required />


            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('freelancer')}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${role === 'freelancer' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>

                  Work
                </button>
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${role === 'client' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>

                  Hire
                </button>
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required />


            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}>

              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-slate-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium">

            Sign in
          </Link>
        </p>
      </div>
    </div>);

}