import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'cyan' | 'violet' | 'emerald' | 'amber' | 'red' | 'blue';
  className?: string;
}
export function Badge({
  children,
  variant = 'neutral',
  className = ''
}: BadgeProps) {
  const variants = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    violet: 'bg-violet-50 text-violet-700 border-violet-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200'
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>

      {children}
    </span>);

}