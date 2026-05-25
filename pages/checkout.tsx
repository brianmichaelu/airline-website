import { useRouter } from "next/router";
import BookingForm from "@/components/BookingForm";
import Layout from "@/components/Layout";
import Card from "@/components/ui/Card";
import { flights, getFlightById } from "@/data/flights";
import { formatMoney } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const flightId = typeof router.query.flight === "string" ? router.query.flight : flights[0].id;
  const flight = getFlightById(flightId) || flights[0];

  return (
    <Layout title="Checkout" description="Complete passenger and payment information in a safe UI-only checkout.">
      <section className="bg-flight-gradient px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">Checkout</p>
          <h1 className="mt-2 text-4xl font-black">Complete your demo booking</h1>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <BookingForm />

          <aside>
            <Card className="sticky top-24 p-6">
              <h2 className="text-xl font-black text-navy dark:text-white">Booking Summary</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div><p className="text-slate-500">Airline</p><p className="font-bold">{flight.airline} • {flight.flightNumber}</p></div>
                <div><p className="text-slate-500">Route</p><p className="font-bold">{flight.outbound.from.code} to {flight.outbound.to.code}</p></div>
                <div><p className="text-slate-500">Cabin</p><p className="font-bold">{flight.cabin}</p></div>
                <div><p className="text-slate-500">Baggage</p><p className="font-bold">{flight.baggage}</p></div>
              </div>
              <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="text-3xl font-black text-ocean">{formatMoney(flight.price, flight.currency)}</span>
              </div>
            </Card>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
