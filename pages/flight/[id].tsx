import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  Clock,
  PlaneTakeoff,
  ShieldCheck,
} from "lucide-react";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { flights, getFlightById } from "@/data/flights";
import { formatMoney } from "@/lib/format";
import type { Flight } from "@/types/flight";

interface FlightDetailsPageProps {
  flight: Flight;
}

export default function FlightDetailsPage({ flight }: FlightDetailsPageProps) {
  const baseFare = flight.price - 52;
  const taxesAndFees = 52;

  return (
    <Layout
      title={`${flight.airline} ${flight.flightNumber}`}
      description={`Review flight details for ${flight.outbound.from.city} to ${flight.outbound.to.city} and continue your reservation.`}
    >
      <section className="bg-flight-gradient px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">Flight Details</p>

          <h1 className="mt-2 text-4xl font-black">
            {flight.outbound.from.city} to {flight.outbound.to.city}
          </h1>

          <p className="mt-3 max-w-2xl text-blue-50">
            Review airline, route, baggage, ticket conditions, and fare details
            before continuing to reservation checkout.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={flight.airlineLogo}
                    alt={`${flight.airline} logo`}
                    width={64}
                    height={64}
                    className="rounded-2xl"
                  />

                  <div>
                    <h2 className="text-2xl font-black text-navy dark:text-white">
                      {flight.airline}
                    </h2>

                    <p className="text-slate-500 dark:text-slate-400">
                      {flight.flightNumber} • {flight.cabin}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-blue-50 px-4 py-2 text-sm font-bold text-ocean dark:bg-blue-950/50">
                  {flight.refundable ? "Refundable fare" : "Non-refundable fare"}
                </div>
              </div>

              <div className="mt-8 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
                <div>
                  <p className="text-4xl font-black text-slate-900 dark:text-white">
                    {flight.outbound.departureTime}
                  </p>

                  <p className="font-bold text-navy dark:text-white">
                    {flight.outbound.from.code}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {flight.outbound.from.city},{" "}
                    {flight.outbound.from.country}
                  </p>
                </div>

                <div className="text-center text-slate-400 dark:text-slate-500">
                  <PlaneTakeoff className="mx-auto" />
                  <p className="mt-2 text-sm font-semibold">
                    {flight.outbound.duration}
                  </p>
                  <p className="text-xs">
                    {flight.stops === 0
                      ? "Direct flight"
                      : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                  </p>
                </div>

                <div className="md:text-right">
                  <p className="text-4xl font-black text-slate-900 dark:text-white">
                    {flight.outbound.arrivalTime}
                  </p>

                  <p className="font-bold text-navy dark:text-white">
                    {flight.outbound.to.code}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {flight.outbound.to.city}, {flight.outbound.to.country}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-black text-navy dark:text-white">
                Included benefits
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/10">
                  <Briefcase className="mb-3 text-ocean" />
                  <p className="font-bold text-slate-900 dark:text-white">
                    Baggage
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {flight.baggage}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/10">
                  <Clock className="mb-3 text-ocean" />
                  <p className="font-bold text-slate-900 dark:text-white">
                    Duration
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {flight.outbound.duration}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/10">
                  <ShieldCheck className="mb-3 text-ocean" />
                  <p className="font-bold text-slate-900 dark:text-white">
                    Ticket rules
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Fare conditions will be confirmed before ticketing.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="h-fit p-6">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Total from
            </p>

            <p className="text-4xl font-black text-ocean">
              {formatMoney(flight.price, flight.currency)}
            </p>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Fare includes estimated taxes and carrier fees.
            </p>

            <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between gap-4">
                <span>Base fare</span>
                <strong className="text-slate-900 dark:text-white">
                  {formatMoney(baseFare, flight.currency)}
                </strong>
              </div>

              <div className="flex justify-between gap-4">
                <span>Taxes & fees</span>
                <strong className="text-slate-900 dark:text-white">
                  {formatMoney(taxesAndFees, flight.currency)}
                </strong>
              </div>
            </div>

            <Button href={`/checkout?flight=${flight.id}`} className="mt-6 w-full">
              Continue Reservation
              <ArrowRight size={16} />
            </Button>

            <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Final fare and seat availability may be confirmed before payment
              instructions are issued.
            </p>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: flights.map((flight) => ({ params: { id: flight.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<FlightDetailsPageProps> = async ({
  params,
}) => {
  const flight = getFlightById(String(params?.id));

  if (!flight) {
    return { notFound: true };
  }

  return { props: { flight } };
};
