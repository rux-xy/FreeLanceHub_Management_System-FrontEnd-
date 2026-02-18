import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      }
      <input
        className={`
          block w-full rounded-lg border-slate-300 bg-white text-slate-900
          shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
          placeholder:text-slate-400 transition-colors duration-200
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props} />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>);

}
interface TextAreaProps extends
  React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function TextArea({
  label,
  error,
  className = '',
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      }
      <textarea
        className={`
          block w-full rounded-lg border-slate-300 bg-white text-slate-900
          shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
          placeholder:text-slate-400 transition-colors duration-200
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props} />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>);

}