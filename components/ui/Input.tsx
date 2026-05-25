import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <label className="block">
      <span className="label-style">{label}</span>

      <input
        className={`input-style bg-white text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${className}`}
        {...props}
      />

      {error && (
        <span className="mt-1 block text-xs font-medium text-red-500">
          {error}
        </span>
      )}
    </label>
  );
}
