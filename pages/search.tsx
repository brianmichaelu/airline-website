import {
  CalendarDays,
  Plane,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import FiltersSidebar from "@/components/FiltersSidebar";
import FlightCard from "@/components/FlightCard";
import Layout from "@/components/Layout";
import SkeletonLoader from "@/components/SkeletonLoader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { flights } from "@/data/flights";

type TripType = "round-trip" | "one-way";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

export default function SearchPage() {
  const [tripType, setTripType] = useState<TripType>("round-trip");

  const [from, setFrom] = useState("Dar es Salaam");
  const [to, setTo] = useState("Dubai");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Economy");

  const [selectedAirline, setSelectedAirline] = useState("All");
  const [selectedStops, setSelectedStops] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(900);
  const [sort, setSort] = useState("recommended");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const filteredFlights = useMemo(() => {
    let results = flights.filter((flight) => flight.price <= maxPrice);

    if (selectedAirline !== "All") {
      results = results.filter((flight) => flight.airline === selectedAirline);
    }

    if (selectedStops === "Direct only") {
      results = results.filter((flight) => flight.stops === 0);
    }

    if (selectedStops === "1 stop") {
      results = results.filter((flight) => flight.stops === 1);
    }

    if (selectedStops === "2 stops") {
      results = results.filter((flight) => flight.stops === 2);
    }

    if (sort === "price-low") {
      results = [...results].sort((a, b) => a.price - b.price);
    }

    if (sort === "duration") {
      results = [...results].sort((a, b) =>
        a.outbound.duration.localeCompare(b.outbound.duration)
      );
    }

    return results;
  }, [selectedAirline, selectedStops, maxPrice, sort]);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!from.trim() || !to.trim() || !departureDate) {
      alert("Please fill in From, To, and Departure Date.");
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      alert("Please choose a Return Date or switch to One-way.");
      return;
    }

    setHasSearched(true);
    simulateLoading();
  };

  return (
    <Layout
      title="Search Flights"
      description="Compare mock airline tickets with filters, sorting, and responsive flight cards."
    >
      <section className="bg-flight-gradient px-4 pb-16 pt-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">Search Results</p>

          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Find your next airline ticket
          </h1>

          <p className="mt-3 max-w-2xl text-blue-50">
            Search flights, compare fares, and continue to booking without
            login, signup, hotels, or car rentals.
          </p>

          <Card className="mt-8 border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:bg-slate-950/95 sm:p-5">
            <form onSubmit={handleSearch}>
              <div className="mb-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setTripType("round-trip")}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    tripType === "round-trip"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  Round-trip
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTripType("one-way");
                    setReturnDate("");
                  }}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    tripType === "one-way"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  One-way
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1.1fr_1fr_1fr_0.8fr_1fr_auto]">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <Plane size={16} />
                    From
                  </span>
                  <input
                    className={fieldClass}
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                    placeholder="Dar es Salaam"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <Plane size={16} />
                    To
                  </span>
                  <input
                    className={fieldClass}
                    value={to}
                    onChange={(event) => setTo(event.target.value)}
                    placeholder="Dubai"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <CalendarDays size={16} />
                    Departure
                  </span>
                  <input
                    type="date"
                    className={fieldClass}
                    value={departureDate}
                    onChange={(event) => setDepartureDate(event.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <CalendarDays size={16} />
                    Return
                  </span>
                  <input
                    type="date"
                    className={`${fieldClass} disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-70 dark:disabled:bg-slate-800 dark:disabled:text-slate-400`}
                    value={returnDate}
                    onChange={(event) => setReturnDate(event.target.value)}
                    disabled={tripType === "one-way"}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <Users size={16} />
                    Passengers
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={9}
                    className={fieldClass}
                    value={passengers}
                    onChange={(event) =>
                      setPassengers(Number(event.target.value))
                    }
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
                    Cabin
                  </span>
                  <select
                    className={fieldClass}
                    value={cabinClass}
                    onChange={(event) => setCabinClass(event.target.value)}
                  >
                    <option>Economy</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </label>

                <div className="flex items-end">
                  <Button type="submit" className="w-full xl:h-[46px]">
                    <Search size={18} />
                    Search
                  </Button>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {hasSearched ? (
                  <span>
                    Showing demo fares for{" "}
                    <strong className="text-navy dark:text-white">{from}</strong>{" "}
                    to{" "}
                    <strong className="text-navy dark:text-white">{to}</strong>
                    {departureDate && <> departing {departureDate}</>}
                    {tripType === "round-trip" && returnDate && (
                      <> and returning {returnDate}</>
                    )}
                    .
                  </span>
                ) : (
                  <span>
                    Choose your route and dates above, then search to refresh the
                    demo flight results.
                  </span>
                )}
              </div>
            </form>
          </Card>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="hidden lg:block">
            <FiltersSidebar
              selectedAirline={selectedAirline}
              setSelectedAirline={setSelectedAirline}
              selectedStops={selectedStops}
              setSelectedStops={setSelectedStops}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </aside>

          <div>
            <Card className="mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-black text-navy dark:text-white">
                  {filteredFlights.length} flight
                  {filteredFlights.length === 1 ? "" : "s"} found
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Mock data from the frontend JSON file.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="secondary" onClick={simulateLoading}>
                  <SlidersHorizontal size={16} />
                  Refresh
                </Button>

                <select
                  className={fieldClass}
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Lowest price</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </Card>

            <div className="mb-6 block lg:hidden">
              <FiltersSidebar
                selectedAirline={selectedAirline}
                setSelectedAirline={setSelectedAirline}
                selectedStops={selectedStops}
                setSelectedStops={setSelectedStops}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </div>

            {loading ? (
              <SkeletonLoader />
            ) : (
              <div className="space-y-5">
                {filteredFlights.length > 0 ? (
                  filteredFlights.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))
                ) : (
                  <Card className="p-10 text-center">
                    <h3 className="text-2xl font-black text-navy dark:text-white">
                      No flights found
                    </h3>
                    <p className="mt-2 text-slate-500">
                      Try increasing the price range or clearing filters.
                    </p>
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
