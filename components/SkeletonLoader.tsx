export default function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
          <div className="h-5 w-40 rounded bg-slate-200 dark:bg-white/10" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="h-16 rounded-2xl bg-slate-200 dark:bg-white/10" />
            <div className="h-16 rounded-2xl bg-slate-200 dark:bg-white/10" />
            <div className="h-16 rounded-2xl bg-slate-200 dark:bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
