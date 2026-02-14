import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: Props) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/70 backdrop-blur-xl",
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: Props) {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: Props) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
