import { useRouter } from "next/router";
import BookingForm from "@/components/BookingForm";
import Layout from "@/components/Layout";
import Card from "@/components/ui/Card";
import { flights, getFlightById } from "@/data/flights";
import { formatMoney } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();

  const flightId =
    typeof router.query.flight === "string" ? router.query.flight : flights[0].id;

  const flight = getFlightById(flightId) || flights[0];

  return (
    <Layout
      title="Complete Reservation"
      description="Enter passenger details, choose a payment method, and confirm your airline ticket reservation."
    >
      <section className="bg-flight-gradient px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">Reservation Checkout</p>

          <h1 className="mt-2 text-4xl font-black">
            Complete your flight reservation
          </h1>

          <p className="mt-3 max-w-2xl text-blue-50">
            Review your selected flight, enter traveller details, and choose your
            preferred payment method.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <BookingForm />

          <aside>
            <Card className="sticky top-24 p-6">
              <h2 className="text-xl font-black text-navy dark:text-white">
                Booking Summary
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Please confirm the flight details before submitting your
                reservation.
              </p>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Airline</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {flight.airline} • {flight.flightNumber}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 dark:text-slate-400">Route</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {flight.outbound.from.code} to {flight.outbound.to.code}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 dark:text-slate-400">Cabin</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {flight.cabin}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 dark:text-slate-400">Baggage</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {flight.baggage}
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-slate-900 dark:text-white">
                  Total Fare
                </span>

                <span className="text-3xl font-black text-ocean">
                  {formatMoney(flight.price, flight.currency)}
                </span>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Final ticket availability and fare confirmation may be reviewed
                by the reservations team before payment instructions are sent.
              </p>
            </Card>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
