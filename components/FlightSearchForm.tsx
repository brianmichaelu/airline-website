import { motion } from "framer-motion";
import { CalendarDays, PlaneLanding, PlaneTakeoff, Search, Users } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import type { CabinClass, SearchFormValues, TripType } from "@/types/flight";

const cabinClasses: CabinClass[] = ["Economy", "Premium Economy", "Business", "First Class"];

export default function FlightSearchForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<SearchFormValues>({
    tripType: "round-trip",
    from: "Dar es Salaam",
    to: "Dubai",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    cabin: "Economy",
  });

  const update = <K extends keyof SearchFormValues>(key: K, value: SearchFormValues[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.from.trim()) newErrors.from = "Origin is required";
    if (!form.to.trim()) newErrors.to = "Destination is required";
    if (!form.departureDate) newErrors.departureDate = "Departure date is required";
    if (form.tripType === "round-trip" && !form.returnDate) newErrors.returnDate = "Return date is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push({ pathname: "/search", query: { from: form.from, to: form.to, cabin: form.cabin, passengers: form.passengers } });
    }
  };

  return (
    <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} onSubmit={submit} className="glass-card rounded-[2rem] p-4 sm:p-6">
      <div className="mb-5 inline-flex rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
        {(["round-trip", "one-way"] as TripType[]).map((type) => (
          <button key={type} type="button" onClick={() => update("tripType", type)} className={`rounded-xl px-4 py-2 text-sm font-bold capitalize transition ${form.tripType === type ? "bg-ocean text-white shadow" : "text-slate-600 dark:text-slate-300"}`}>
            {type.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="label-style flex items-center gap-2"><PlaneTakeoff size={16} /> From</span>
          <input className="input-style" value={form.from} onChange={(event) => update("from", event.target.value)} placeholder="Dar es Salaam" />
          {errors.from && <span className="mt-1 block text-xs text-red-500">{errors.from}</span>}
        </label>

        <label className="block">
          <span className="label-style flex items-center gap-2"><PlaneLanding size={16} /> To</span>
          <input className="input-style" value={form.to} onChange={(event) => update("to", event.target.value)} placeholder="Dubai" />
          {errors.to && <span className="mt-1 block text-xs text-red-500">{errors.to}</span>}
        </label>

        <label className="block">
          <span className="label-style flex items-center gap-2"><CalendarDays size={16} /> Departure</span>
          <input type="date" className="input-style" value={form.departureDate} onChange={(event) => update("departureDate", event.target.value)} />
          {errors.departureDate && <span className="mt-1 block text-xs text-red-500">{errors.departureDate}</span>}
        </label>

        <label className="block">
          <span className="label-style flex items-center gap-2"><CalendarDays size={16} /> Return</span>
          <input type="date" className="input-style" value={form.returnDate} onChange={(event) => update("returnDate", event.target.value)} disabled={form.tripType === "one-way"} />
          {errors.returnDate && <span className="mt-1 block text-xs text-red-500">{errors.returnDate}</span>}
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <label>
          <span className="label-style flex items-center gap-2"><Users size={16} /> Passengers</span>
          <input type="number" min={1} max={9} className="input-style" value={form.passengers} onChange={(event) => update("passengers", Number(event.target.value))} />
        </label>
        <label>
          <span className="label-style">Cabin Class</span>
          <select className="input-style" value={form.cabin} onChange={(event) => update("cabin", event.target.value as CabinClass)}>
            {cabinClasses.map((cabin) => <option key={cabin}>{cabin}</option>)}
          </select>
        </label>
        <div className="flex items-end">
          <Button type="submit" className="w-full px-8"><Search size={18} /> Search Flights</Button>
        </div>
      </div>
    </motion.form>
  );
}
