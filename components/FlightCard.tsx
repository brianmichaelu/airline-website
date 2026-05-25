import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Clock, Plane, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { formatMoney } from "@/lib/format";
import type { Flight } from "@/types/flight";

interface FlightCardProps {
  flight: Flight;
}

function getPassengerCount(value: string | string[] | undefined) {
  if (typeof value === "string") {
    const parsed = Number(value);

    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  if (Array.isArray(value)) {
    const parsed = Number(value[0]);

    if (!Number.isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return 1;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const router = useRouter();

  const passengers = getPassengerCount(router.query.passengers);
  const totalFare = flight.price * passengers;

  const stopsText =
    flight.stops === 0
      ? "Direct flight"
      : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={flight.airlineLogo}
              alt={`${flight.airline} logo`}
              width={56}
              height={56}
              className="rounded-2xl"
            />

            <div>
              <h3 className="font-black text-navy dark:text-white">
                {flight.airline}
              </h3>

              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {flight.flightNumber} • {flight.cabin}
              </p>
            </div>
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-[1fr_auto_1fr] lg:max-w-xl">
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {flight.outbound.departureTime}
              </p>

              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {flight.outbound.from.code} • {flight.outbound.from.city}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
              <span className="h-px w-14 bg-slate-300 dark:bg-slate-700" />
              <Plane size={18} />
              <span className="h-px w-14 bg-slate-300 dark:bg-slate-700" />
            </div>

            <div className="sm:text-right">
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {flight.outbound.arrivalTime}
              </p>

              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {flight.outbound.to.code} • {flight.outbound.to.city}
              </p>
            </div>
          </div>

          <div className="min-w-[210px] rounded-3xl bg-skysoft p-4 text-center dark:bg-white/10">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
              Per passenger
            </p>

            <p className="text-3xl font-black text-ocean">
              {formatMoney(flight.price, flight.currency)}
            </p>

            <div className="mt-2 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
              Total for {passengers}{" "}
              {passengers === 1 ? "traveller" : "travellers"}:{" "}
              <span className="text-navy dark:text-white">
                {formatMoney(totalFare, flight.currency)}
              </span>
            </div>

            <Button
              href={`/flight/${flight.id}?passengers=${passengers}`}
              className="mt-3 w-full"
            >
              Select Flight
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
          <span className="inline-flex items-center gap-2">
            <Clock size={16} />
            {flight.outbound.duration}
          </span>

          <span>{stopsText}</span>

          <span className="inline-flex items-center gap-2">
            <Briefcase size={16} />
            {flight.baggage}
          </span>

          <span className="inline-flex items-center gap-2">
            <Users size={16} />
            {passengers} {passengers === 1 ? "traveller" : "travellers"}
          </span>

          {flight.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 font-bold text-ocean dark:bg-blue-950/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
