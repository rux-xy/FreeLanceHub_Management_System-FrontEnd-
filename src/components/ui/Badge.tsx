import React from "react";

type Variant = "neutral" | "success" | "warning";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const styles: Record<Variant, string> = {
  neutral: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
};

export default function Badge({ children, variant = "neutral", className = "" }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        styles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
