import Card from "@/components/ui/Card";

interface FiltersSidebarProps {
  selectedAirline: string;
  setSelectedAirline: (value: string) => void;
  selectedStops: string;
  setSelectedStops: (value: string) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  selectedDepartureTime?: string;
  setSelectedDepartureTime?: (value: string) => void;
}

export default function FiltersSidebar({
  selectedAirline,
  setSelectedAirline,
  selectedStops,
  setSelectedStops,
  maxPrice,
  setMaxPrice,
  selectedDepartureTime = "Any time",
  setSelectedDepartureTime,
}: FiltersSidebarProps) {
  const airlines = [
    "All",
    "SkyVista Airways",
    "Azure Jet",
    "Coastal Wings",
    "Nova Air",
  ];

  const departureTimes = ["Any time", "Morning", "Afternoon", "Evening", "Night"];

  return (
    <Card className="sticky top-24 p-5">
      <h2 className="text-lg font-black text-navy dark:text-white">
        Filter Flights
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Narrow results by price, airline, stops, and departure time.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <label className="label-style">Max Price: ${maxPrice}</label>

          <input
            type="range"
            min={150}
            max={900}
            step={25}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="w-full accent-blue-600"
          />

          <div className="mt-2 flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>$150</span>
            <span>$900+</span>
          </div>
        </div>

        <div>
          <label className="label-style">Airline</label>

          <select
            className="input-style"
            value={selectedAirline}
            onChange={(event) => setSelectedAirline(event.target.value)}
          >
            {airlines.map((airline) => (
              <option key={airline}>{airline}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-style">Stops</label>

          <select
            className="input-style"
            value={selectedStops}
            onChange={(event) => setSelectedStops(event.target.value)}
          >
            <option>Any</option>
            <option>Direct only</option>
            <option>1 stop</option>
            <option>2 stops</option>
          </select>
        </div>

        <div>
          <label className="label-style">Departure Time</label>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {departureTimes.map((time) => {
              const active = selectedDepartureTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedDepartureTime?.(time)}
                  className={`rounded-2xl border px-3 py-2 font-semibold transition ${
                    active
                      ? "border-ocean bg-blue-50 text-ocean ring-4 ring-blue-500/10 dark:border-blue-400 dark:bg-blue-950/40 dark:text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-ocean hover:bg-blue-50 hover:text-ocean dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-blue-950/40 dark:hover:text-white"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
