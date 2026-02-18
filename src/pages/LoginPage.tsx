import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AlertCircle, GraduationCap } from 'lucide-react';
export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'admin') navigate('/admin');else
      if (user.role === 'client') navigate('/client-dashboard');else
      navigate('/freelancer-dashboard');
    } catch (err) {

      // Error handled by context
    }};
  const handleDemoLogin = async (role: 'admin' | 'client' | 'freelancer') => {
    clearError();
    let demoEmail = '';
    if (role === 'admin') demoEmail = 'admin@uni.edu';
    if (role === 'client') demoEmail = 'sarah@uni.edu';
    if (role === 'freelancer') demoEmail = 'david@uni.edu';
    setEmail(demoEmail);
    setPassword('password123');
    try {
      const user = await login(demoEmail, 'password123');
      if (user.role === 'admin') navigate('/admin');else
      if (user.role === 'client') navigate('/client-dashboard');else
      navigate('/freelancer-dashboard');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20 mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500">Sign in to UniFreelancer</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          {error &&
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {error}
            </div>
          }

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@uni.edu"
              required />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required />


            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}>

              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-center text-sm text-slate-500 mb-4">
              Quick Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="px-2 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 transition-colors border border-slate-200">

                Admin
              </button>
              <button
                onClick={() => handleDemoLogin('client')}
                className="px-2 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 transition-colors border border-slate-200">

                Client
              </button>
              <button
                onClick={() => handleDemoLogin('freelancer')}
                className="px-2 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 transition-colors border border-slate-200">

                Freelancer
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-slate-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium">

            Register now
          </Link>
        </p>
      </div>
    </div>);

}