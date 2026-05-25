import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
