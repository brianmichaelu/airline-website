import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import FiltersSidebar from "@/components/FiltersSidebar";
import FlightCard from "@/components/FlightCard";
import Layout from "@/components/Layout";
import SkeletonLoader from "@/components/SkeletonLoader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { flights } from "@/data/flights";

export default function SearchPage() {
  const [selectedAirline, setSelectedAirline] = useState("All");
  const [selectedStops, setSelectedStops] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(900);
  const [sort, setSort] = useState("recommended");
  const [loading, setLoading] = useState(false);

  const filteredFlights = useMemo(() => {
    let results = flights.filter((flight) => flight.price <= maxPrice);
    if (selectedAirline !== "All") results = results.filter((flight) => flight.airline === selectedAirline);
    if (selectedStops === "Direct only") results = results.filter((flight) => flight.stops === 0);
    if (selectedStops === "1 stop") results = results.filter((flight) => flight.stops === 1);
    if (selectedStops === "2 stops") results = results.filter((flight) => flight.stops === 2);
    if (sort === "price-low") results = [...results].sort((a, b) => a.price - b.price);
    if (sort === "duration") results = [...results].sort((a, b) => a.outbound.duration.localeCompare(b.outbound.duration));
    return results;
  }, [selectedAirline, selectedStops, maxPrice, sort]);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  };

  return (
    <Layout title="Search Flights" description="Compare mock airline tickets with filters, sorting, and responsive flight cards.">
      <section className="bg-flight-gradient px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">Search Results</p>
          <h1 className="mt-2 text-4xl font-black">Available airline tickets</h1>
          <p className="mt-3 max-w-2xl text-blue-50">Use filters and sorting to compare public demo fares. No car rentals, hotels, or login required.</p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block">
            <FiltersSidebar selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} selectedStops={selectedStops} setSelectedStops={setSelectedStops} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          </aside>

          <div>
            <Card className="mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-black text-navy dark:text-white">{filteredFlights.length} flight{filteredFlights.length === 1 ? "" : "s"} found</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Mock data from the frontend JSON file.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={simulateLoading}><SlidersHorizontal size={16} /> Refresh</Button>
                <select className="input-style max-w-[190px]" value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Lowest price</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </Card>

            <div className="mb-6 block lg:hidden">
              <FiltersSidebar selectedAirline={selectedAirline} setSelectedAirline={setSelectedAirline} selectedStops={selectedStops} setSelectedStops={setSelectedStops} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            </div>

            {loading ? <SkeletonLoader /> : (
              <div className="space-y-5">
                {filteredFlights.length > 0 ? filteredFlights.map((flight) => <FlightCard key={flight.id} flight={flight} />) : (
                  <Card className="p-10 text-center">
                    <h3 className="text-2xl font-black text-navy dark:text-white">No flights found</h3>
                    <p className="mt-2 text-slate-500">Try increasing the price range or clearing filters.</p>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
