import {
  ArrowLeftRight,
  CalendarDays,
  MapPin,
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
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-80 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-400";

const suggestionBoxClass =
  "absolute left-0 top-full z-[80] mt-3 max-h-80 w-full min-w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:min-w-[430px]";

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

export default function SearchPage() {
  const [tripType, setTripType] = useState<TripType>("round-trip");

  const [from, setFrom] = useState("Dar es Salaam");
  const [to, setTo] = useState("Dubai");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Economy");

  const [activeSuggestion, setActiveSuggestion] = useState<
    "from" | "to" | null
  >(null);

  const [selectedAirline, setSelectedAirline] = useState("All");
  const [selectedStops, setSelectedStops] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(900);
  const [sort, setSort] = useState("recommended");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fromSuggestions = useMemo(() => getAirportSuggestions(from), [from]);
  const toSuggestions = useMemo(() => getAirportSuggestions(to), [to]);

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

    setActiveSuggestion(null);
    setHasSearched(true);
    simulateLoading();
  };

  const chooseFromAirport = (airport: Airport) => {
    setFrom(formatAirportValue(airport));
    setActiveSuggestion(null);
  };

  const chooseToAirport = (airport: Airport) => {
    setTo(formatAirportValue(airport));
    setActiveSuggestion(null);
  };

  const swapRoute = () => {
    setFrom(to);
    setTo(from);
    setActiveSuggestion(null);
  };

  return (
    <Layout
      title="Search Flights"
      description="Search and compare available airline ticket options by route, date, airline, stops, and cabin class."
    >
      <section
        className="bg-flight-gradient px-4 pb-16 pt-12 text-white sm:px-6 lg:px-8"
        onClick={() => setActiveSuggestion(null)}
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">
            Flight Search
          </p>

          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Compare available flight options
          </h1>

          <p className="mt-3 max-w-2xl text-blue-50">
            Select your route, travel dates, passengers, and cabin class to
            find suitable airline ticket options.
          </p>

          <div onClick={(event) => event.stopPropagation()}>
            <Card className="mt-8 overflow-visible border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:bg-slate-950/95 sm:p-5">
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

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.15fr_auto_1.15fr_1fr_1fr_0.8fr_1fr_auto]">
                  <label className="relative block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Plane size={16} />
                      From
                    </span>

                    <input
                      className={fieldClass}
                      value={from}
                      onFocus={() => setActiveSuggestion("from")}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveSuggestion("from");
                      }}
                      onChange={(event) => {
                        setFrom(event.target.value);
                        setActiveSuggestion("from");
                      }}
                      placeholder="Dar es Salaam"
                      autoComplete="off"
                    />

                    {activeSuggestion === "from" && (
                      <div
                        className={suggestionBoxClass}
                        onClick={(event) => event.stopPropagation()}
                      >
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
                  </label>

                  <div className="hidden items-end justify-center xl:flex">
                    <button
                      type="button"
                      onClick={swapRoute}
                      className="grid h-[46px] w-[46px] place-items-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                      aria-label="Swap route"
                    >
                      <ArrowLeftRight size={18} />
                    </button>
                  </div>

                  <label className="relative block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Plane size={16} />
                      To
                    </span>

                    <input
                      className={fieldClass}
                      value={to}
                      onFocus={() => setActiveSuggestion("to")}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveSuggestion("to");
                      }}
                      onChange={(event) => {
                        setTo(event.target.value);
                        setActiveSuggestion("to");
                      }}
                      placeholder="Dubai"
                      autoComplete="off"
                    />

                    {activeSuggestion === "to" && (
                      <div
                        className={suggestionBoxClass}
                        onClick={(event) => event.stopPropagation()}
                      >
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
                  </label>

                  <div className="flex items-end xl:hidden">
                    <button
                      type="button"
                      onClick={swapRoute}
                      className="grid h-[46px] w-full place-items-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-sm transition hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <span className="flex items-center gap-2 text-sm font-black">
                        <ArrowLeftRight size={17} />
                        Swap route
                      </span>
                    </button>
                  </div>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <CalendarDays size={16} />
                      Departure
                    </span>
                    <input
                      type="date"
                      className={fieldClass}
                      value={departureDate}
                      onChange={(event) =>
                        setDepartureDate(event.target.value)
                      }
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <CalendarDays size={16} />
                      Return
                    </span>
                    <input
                      type="date"
                      className={fieldClass}
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
                      Showing available fares for{" "}
                      <strong className="text-navy dark:text-white">
                        {from}
                      </strong>{" "}
                      to{" "}
                      <strong className="text-navy dark:text-white">
                        {to}
                      </strong>
                      {departureDate && <> departing {departureDate}</>}
                      {tripType === "round-trip" && returnDate && (
                        <> and returning {returnDate}</>
                      )}
                      .
                    </span>
                  ) : (
                    <span>
                      Choose your route and travel dates above, then search to
                      view matching flight options.
                    </span>
                  )}
                </div>
              </form>
            </Card>
          </div>
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
                  {filteredFlights.length}{" "}
                  {filteredFlights.length === 1 ? "flight" : "flights"} found
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Results based on your selected route, filters, and sorting
                  preference.
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
              <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <SlidersHorizontal size={16} />
                Filter Results
              </div>

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
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                      Try adjusting your price range, airline, stops, or travel
                      time filters.
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
