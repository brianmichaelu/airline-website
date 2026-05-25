import Image from "next/image";
import Layout from "@/components/Layout";
import Card from "@/components/ui/Card";
import {
  Globe2,
  Headphones,
  ShieldCheck,
  TicketCheck,
} from "lucide-react";

const values = [
  {
    title: "Clear flight options",
    text: "We help customers compare routes, fares, airlines, travel dates, and cabin classes before making a reservation.",
    icon: TicketCheck,
  },
  {
    title: "Regional and international travel",
    text: "Our flight search experience supports popular routes across Tanzania, East Africa, the Middle East, Europe, and Asia.",
    icon: Globe2,
  },
  {
    title: "Reliable booking support",
    text: "Customers can get help with passenger details, preferred travel times, payment instructions, and reservation follow-up.",
    icon: Headphones,
  },
  {
    title: "Secure reservation process",
    text: "The booking flow is designed to collect the right travel details clearly before payment confirmation and ticket processing.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <Layout
      title="About SkyLink Travels"
      description="Learn about SkyLink Travels, a flight reservation service helping customers search, compare, and reserve airline tickets."
    >
      <section className="bg-flight-gradient px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">About SkyLink Travels</p>

          <h1 className="mt-2 max-w-3xl text-4xl font-black sm:text-5xl">
            Making airline ticket booking easier for modern travellers.
          </h1>

          <p className="mt-4 max-w-2xl text-blue-50">
            We help customers find suitable flight options, compare fares, and
            reserve airline tickets with a smooth and simple booking process.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="font-bold text-ocean">Who we are</p>

            <h2 className="mt-2 text-3xl font-black text-navy dark:text-white">
              A travel reservation service focused on flights.
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              SkyLink Travels provides a clean way for customers to search
              routes, compare fare options, submit passenger details, and
              receive booking support from a reservations team. The experience
              is built for travellers who want a straightforward way to plan
              regional and international trips.
            </p>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              Whether the journey is for business, family, study, holiday, or
              relocation, our goal is to make the reservation process easier to
              understand from search to confirmation.
            </p>
          </div>

          <Image
            src="/images/about-banner.png"
            alt="SkyLink Travels airline reservation service"
            width={700}
            height={520}
            className="rounded-[2rem] shadow-soft"
          />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="font-bold text-ocean">What we focus on</p>

            <h2 className="mt-2 text-3xl font-black text-navy dark:text-white">
              Built around the needs of flight customers.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="p-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/40">
                  <value.icon size={22} />
                </span>

                <h3 className="mt-5 text-lg font-black text-navy dark:text-white">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {value.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
