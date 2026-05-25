import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/5 ${className}`}>{children}</div>;
}
