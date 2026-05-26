import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Users,
} from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import type { CabinClass, SearchFormValues, TripType } from "@/types/flight";

const cabinClasses: CabinClass[] = [
  "Economy",
  "Premium Economy",
  "Business",
  "First Class",
];

type Airport = {
  city: string;
  country: string;
  airport: string;
  code: string;
};

const airports: Airport[] = [
  {
    city: "Dar es Salaam",
    country: "Tanzania",
    airport: "Julius Nyerere International Airport",
    code: "DAR",
  },
  {
    city: "Zanzibar",
    country: "Tanzania",
    airport: "Abeid Amani Karume International Airport",
    code: "ZNZ",
  },
  {
    city: "Kilimanjaro",
    country: "Tanzania",
    airport: "Kilimanjaro International Airport",
    code: "JRO",
  },
  {
    city: "Mwanza",
    country: "Tanzania",
    airport: "Mwanza Airport",
    code: "MWZ",
  },
  {
    city: "Nairobi",
    country: "Kenya",
    airport: "Jomo Kenyatta International Airport",
    code: "NBO",
  },
  {
    city: "Mombasa",
    country: "Kenya",
    airport: "Moi International Airport",
    code: "MBA",
  },
  {
    city: "Entebbe",
    country: "Uganda",
    airport: "Entebbe International Airport",
    code: "EBB",
  },
  {
    city: "Kigali",
    country: "Rwanda",
    airport: "Kigali International Airport",
    code: "KGL",
  },
  {
    city: "Addis Ababa",
    country: "Ethiopia",
    airport: "Bole International Airport",
    code: "ADD",
  },
  {
    city: "Doha",
    country: "Qatar",
    airport: "Hamad International Airport",
    code: "DOH",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    airport: "Dubai International Airport",
    code: "DXB",
  },
  {
    city: "Istanbul",
    country: "Turkey",
    airport: "Istanbul Airport",
    code: "IST",
  },
  {
    city: "London",
    country: "United Kingdom",
    airport: "Heathrow Airport",
    code: "LHR",
  },
  {
    city: "Mumbai",
    country: "India",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    code: "BOM",
  },
  {
    city: "Johannesburg",
    country: "South Africa",
    airport: "O. R. Tambo International Airport",
    code: "JNB",
  },
];

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-ocean focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-80 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-blue-950 dark:disabled:bg-slate-800 dark:disabled:text-slate-400";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200";

const suggestionBoxClass =
  "absolute left-0 top-full z-[9999] mt-3 max-h-80 w-full min-w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:min-w-[430px]";

function getAirportSuggestions(value: string) {
  const searchValue = value.trim().toLowerCase();

  if (!searchValue) {
    return airports.slice(0, 7);
  }

  return airports
    .filter((airport) => {
      const searchableText =
        `${airport.city} ${airport.country} ${airport.airport} ${airport.code}`.toLowerCase();

      return searchableText.includes(searchValue);
    })
    .slice(0, 7);
}

function formatAirportValue(airport: Airport) {
  return `${airport.city} (${airport.code})`;
}

export default function FlightSearchForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeSuggestion, setActiveSuggestion] = useState<
    "from" | "to" | null
  >(null);

  const [form, setForm] = useState<SearchFormValues>({
    tripType: "round-trip",
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    cabin: "Economy",
  });

  const fromSuggestions = useMemo(
    () => getAirportSuggestions(form.from),
    [form.from]
  );

  const toSuggestions = useMemo(
    () => getAirportSuggestions(form.to),
    [form.to]
  );

  const update = <K extends keyof SearchFormValues>(
    key: K,
    value: SearchFormValues[K]
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const chooseFromAirport = (airport: Airport) => {
    update("from", formatAirportValue(airport));
    setActiveSuggestion(null);
  };

  const chooseToAirport = (airport: Airport) => {
    update("to", formatAirportValue(airport));
    setActiveSuggestion(null);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.from.trim()) {
      newErrors.from = "Origin is required";
    }

    if (!form.to.trim()) {
      newErrors.to = "Destination is required";
    }

    if (!form.departureDate) {
      newErrors.departureDate = "Departure date is required";
    }

    if (form.tripType === "round-trip" && !form.returnDate) {
      newErrors.returnDate = "Return date is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setActiveSuggestion(null);

      router.push({
        pathname: "/search",
        query: {
          from: form.from,
          to: form.to,
          cabin: form.cabin,
          passengers: form.passengers,
          departureDate: form.departureDate,
          returnDate: form.returnDate,
          tripType: form.tripType,
        },
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      onSubmit={submit}
      onClick={(event) => event.stopPropagation()}
      className="glass-card relative z-[100] overflow-visible rounded-[2rem] p-4 sm:p-6"
    >
      <div className="mb-5 inline-flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-900">
        {(["round-trip", "one-way"] as TripType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              update("tripType", type);

              if (type === "one-way") {
                update("returnDate", "");
              }
            }}
            className={`rounded-xl px-4 py-2 text-sm font-bold capitalize transition ${
              form.tripType === type
                ? "bg-ocean text-white shadow"
                : "text-slate-700 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {type.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="relative z-[200] block">
          <span className={labelClass}>
            <PlaneTakeoff size={16} />
            From
          </span>

          <input
            className={fieldClass}
            value={form.from}
            onFocus={() => setActiveSuggestion("from")}
            onClick={() => setActiveSuggestion("from")}
            onChange={(event) => {
              update("from", event.target.value);
              setActiveSuggestion("from");
            }}
            placeholder="From city or airport"
            autoComplete="off"
          />

          {activeSuggestion === "from" && (
            <div className={suggestionBoxClass}>
              {fromSuggestions.length > 0 ? (
                fromSuggestions.map((airport) => (
                  <button
                    key={`${airport.code}-from`}
                    type="button"
                    onMouseDown={() => chooseFromAirport(airport)}
                    className="flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition hover:bg-blue-50 dark:hover:bg-slate-900"
                  >
                    <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                      <MapPin size={18} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2 text-base font-black leading-snug text-navy dark:text-white">
                        {airport.city}
                        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-black text-white">
                          {airport.code}
                        </span>
                      </span>

                      <span className="mt-1 block text-sm font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                        {airport.airport}
                      </span>

                      <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {airport.country}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  No matching airport found.
                </p>
              )}
            </div>
          )}

          {errors.from && (
            <span className="mt-1 block text-xs font-semibold text-red-500">
              {errors.from}
            </span>
          )}
        </label>

        <label className="relative z-[190] block">
          <span className={labelClass}>
            <PlaneLanding size={16} />
            To
          </span>

          <input
            className={fieldClass}
            value={form.to}
            onFocus={() => setActiveSuggestion("to")}
            onClick={() => setActiveSuggestion("to")}
            onChange={(event) => {
              update("to", event.target.value);
              setActiveSuggestion("to");
            }}
            placeholder="To city or airport"
            autoComplete="off"
          />

          {activeSuggestion === "to" && (
            <div className={suggestionBoxClass}>
              {toSuggestions.length > 0 ? (
                toSuggestions.map((airport) => (
                  <button
                    key={`${airport.code}-to`}
                    type="button"
                    onMouseDown={() => chooseToAirport(airport)}
                    className="flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition hover:bg-blue-50 dark:hover:bg-slate-900"
                  >
                    <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                      <MapPin size={18} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2 text-base font-black leading-snug text-navy dark:text-white">
                        {airport.city}
                        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-black text-white">
                          {airport.code}
                        </span>
                      </span>

                      <span className="mt-1 block text-sm font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                        {airport.airport}
                      </span>

                      <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {airport.country}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  No matching airport found.
                </p>
              )}
            </div>
          )}

          {errors.to && (
            <span className="mt-1 block text-xs font-semibold text-red-500">
              {errors.to}
            </span>
          )}
        </label>

        <label className="block">
          <span className={labelClass}>
            <CalendarDays size={16} />
            Departure
          </span>

          <input
            type="date"
            className={fieldClass}
            value={form.departureDate}
            onChange={(event) => update("departureDate", event.target.value)}
          />

          {errors.departureDate && (
            <span className="mt-1 block text-xs font-semibold text-red-500">
              {errors.departureDate}
            </span>
          )}
        </label>

        <label className="block">
          <span className={labelClass}>
            <CalendarDays size={16} />
            Return
          </span>

          <input
            type="date"
            className={fieldClass}
            value={form.returnDate}
            onChange={(event) => update("returnDate", event.target.value)}
            disabled={form.tripType === "one-way"}
          />

          {errors.returnDate && (
            <span className="mt-1 block text-xs font-semibold text-red-500">
              {errors.returnDate}
            </span>
          )}
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <label>
          <span className={labelClass}>
            <Users size={16} />
            Passengers
          </span>

          <select
  className={fieldClass}
  value={form.passengers}
  onChange={(event) => update("passengers", Number(event.target.value))}
>
  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((passengerCount) => (
    <option key={passengerCount} value={passengerCount}>
      {passengerCount} {passengerCount === 1 ? "Passenger" : "Passengers"}
    </option>
  ))}
</select>

        </label>

        <label>
          <span className="label-style">Cabin Class</span>

          <select
            className={fieldClass}
            value={form.cabin}
            onChange={(event) =>
              update("cabin", event.target.value as CabinClass)
            }
          >
            {cabinClasses.map((cabin) => (
              <option key={cabin}>{cabin}</option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <Button type="submit" className="w-full px-8">
            <Search size={18} />
            Search Flights
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
