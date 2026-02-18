import React from 'react';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  className?: string;
}
export function Card({
  children,
  className = '',
  hoverable = false,
  ...props
}: CardProps) {
  const hoverStyles = hoverable ?
  'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer' :
  '';
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm ${hoverStyles} ${className}`}
      {...props}>

      {children}
    </div>);

}