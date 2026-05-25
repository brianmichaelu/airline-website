import Card from "@/components/ui/Card";

interface FiltersSidebarProps {
  selectedAirline: string;
  setSelectedAirline: (value: string) => void;
  selectedStops: string;
  setSelectedStops: (value: string) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}

export default function FiltersSidebar({ selectedAirline, setSelectedAirline, selectedStops, setSelectedStops, maxPrice, setMaxPrice }: FiltersSidebarProps) {
  const airlines = ["All", "SkyVista Airways", "Azure Jet", "Coastal Wings", "Nova Air"];

  return (
    <Card className="sticky top-24 p-5">
      <h2 className="text-lg font-black text-navy dark:text-white">Filters</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Narrow your mock flight results.</p>

      <div className="mt-6 space-y-6">
        <div>
          <label className="label-style">Max Price: ${maxPrice}</label>
          <input type="range" min={150} max={900} step={25} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-blue-600" />
        </div>

        <div>
          <label className="label-style">Airline</label>
          <select className="input-style" value={selectedAirline} onChange={(event) => setSelectedAirline(event.target.value)}>
            {airlines.map((airline) => <option key={airline}>{airline}</option>)}
          </select>
        </div>

        <div>
          <label className="label-style">Stops</label>
          <select className="input-style" value={selectedStops} onChange={(event) => setSelectedStops(event.target.value)}>
            <option>Any</option>
            <option>Direct only</option>
            <option>1 stop</option>
            <option>2 stops</option>
          </select>
        </div>

        <div>
          <label className="label-style">Departure Time</label>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
              <button key={time} className="rounded-2xl border border-slate-200 px-3 py-2 transition hover:border-ocean hover:text-ocean dark:border-white/10">
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
