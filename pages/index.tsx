import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  BellRing,
  CheckCircle2,
  Clock3,
  CreditCard,
  Globe2,
  Headphones,
  MessageCircle,
  PlaneTakeoff,
  SearchCheck,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { siteConfig } from "@/lib/site";

const features = [
  {
    icon: Ticket,
    title: "Easy flight booking",
    text: "Search popular routes, compare fares, review flight details, and reserve your ticket in a simple guided process.",
  },
  {
    icon: ShieldCheck,
    title: "Secure payment options",
    text: "Choose flexible local payment options including mobile money and bank transfer for a smoother booking experience.",
  },
  {
    icon: Headphones,
    title: "Local travel support",
    text: "Get help with flight options, booking changes, travel dates, and passenger details from a responsive reservations team.",
  },
];

const bookingSteps = [
  {
    icon: SearchCheck,
    title: "Search your route",
    text: "Choose your departure city, destination, travel dates, passengers, and cabin class.",
  },
  {
    icon: PlaneTakeoff,
    title: "Select a flight",
    text: "Compare available options by airline, fare, baggage, travel time, and number of stops.",
  },
  {
    icon: CreditCard,
    title: "Confirm reservation",
    text: "Submit traveller details and choose a preferred payment method for booking follow-up.",
  },
];

const destinations = [
  {
    image: "/images/destination-1.png",
    city: "Dubai",
    route: "Dar es Salaam to Dubai",
    text: "Popular for business trips, shopping, family holidays, and convenient onward connections.",
  },
  {
    image: "/images/destination-2.png",
    city: "Nairobi",
    route: "Dar es Salaam to Nairobi",
    text: "Fast regional flights for meetings, short visits, weekend travel, and East African connections.",
  },
  {
    image: "/images/destination-3.png",
    city: "London",
    route: "Dar es Salaam to London",
    text: "Long-haul travel options with flexible cabin classes and reliable international airline partners.",
  },
  {
    image: "/images/destination-4.png",
    city: "Istanbul",
    route: "Dar es Salaam to Istanbul",
    text: "A strong connection point for Europe, Asia, and Middle East travel with frequent flight options.",
  },
];

const faqs = [
  [
    "How do I book a flight?",
    "Enter your departure city, destination, travel dates, passengers, and cabin class. Then compare available fares and continue to the booking page.",
  ],
  [
    "Can I pay with mobile money?",
    "Yes. The booking page supports Tanzania-friendly payment choices such as M-Pesa, Airtel Money, Mixx by Yas, HaloPesa, and bank transfer.",
  ],
  [
    "Can I book one-way and return flights?",
    "Yes. You can search for both one-way and round-trip tickets depending on your travel plan.",
  ],
  [
    "Can your team help me choose a flight?",
    "Yes. Customers can contact the reservations team for help with routes, travel dates, fare options, and passenger information.",
  ],
];

const stats = [
  { value: "24/7", label: "Online flight search" },
  { value: "15+", label: "Popular destinations" },
  { value: "5", label: "Payment options" },
];

function getWhatsAppLink(message: string) {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function HomePage() {
  const [fareEmail, setFareEmail] = useState("");
  const [fareError, setFareError] = useState("");

  const handleFareUpdates = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = fareEmail.trim();

    if (!email) {
      setFareError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setFareError("Please enter a valid email address.");
      return;
    }

    setFareError("");

    const message = [
      "Hello SkyLink Travels, I would like to receive fare alerts and travel updates.",
      "",
      `Email: ${email}`,
    ].join("\n");

    window.location.href = getWhatsAppLink(message);
  };

  return (
    <Layout
      title="SkyLink Travels"
      description="Search, compare, and reserve airline tickets with SkyLink Travels. Find regional and international flights with flexible payment options."
    >
      <Hero />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="font-bold text-ocean">Why book with us</p>
              <h2 className="mt-2 text-3xl font-black text-navy dark:text-white sm:text-4xl">
                Flight booking made simple, clear, and convenient.
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
                SkyLink Travels helps customers compare airline ticket options
                for regional and international routes, with a clean booking
                process and local support when it matters.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-4 text-center">
                  <p className="text-2xl font-black text-ocean">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/50">
                    <feature.icon />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-navy dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {feature.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="overflow-hidden bg-white p-6 dark:bg-white/5 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="font-bold text-ocean">How booking works</p>
                <h2 className="mt-2 text-3xl font-black text-navy dark:text-white sm:text-4xl">
                  From search to reservation in three simple steps.
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  The booking flow is designed to help travellers compare flight
                  options clearly before submitting reservation details for
                  follow-up.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {bookingSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="relative rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900"
                  >
                    <span className="absolute right-5 top-5 text-4xl font-black text-slate-200 dark:text-white/10">
                      0{index + 1}
                    </span>

                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/50">
                      <step.icon size={22} />
                    </span>

                    <h3 className="mt-5 font-black text-navy dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-skysoft px-4 py-16 dark:bg-white/5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="font-bold text-ocean">Featured destinations</p>
            <h2 className="mt-2 text-3xl font-black text-navy dark:text-white sm:text-4xl">
              Popular routes for business, family, and holiday travel.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Explore frequently requested destinations from Tanzania to East
              Africa, the Middle East, Europe, and beyond. Compare fares and
              choose the route that fits your schedule.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["Dubai", "Nairobi", "Istanbul", "London", "Doha"].map(
                (city) => (
                  <span
                    key={city}
                    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow dark:bg-white/10 dark:text-white"
                  >
                    {city}
                  </span>
                )
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-ocean shadow dark:bg-white/10">
                  <Clock3 size={20} />
                </span>
                <div>
                  <h3 className="font-black text-navy dark:text-white">
                    Flexible travel dates
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Compare options across different dates and cabin classes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-ocean shadow dark:bg-white/10">
                  <Globe2 size={20} />
                </span>
                <div>
                  <h3 className="font-black text-navy dark:text-white">
                    Regional and international
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Find routes across Africa, the Middle East, Europe, and
                    Asia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {destinations.map((destination) => (
              <Card key={destination.city} className="overflow-hidden">
                <Image
                  src={destination.image}
                  alt={`${destination.city} flight destination`}
                  width={500}
                  height={320}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-lg font-black text-navy dark:text-white">
                    {destination.city}
                  </p>
                  <p className="mt-1 text-sm font-bold text-ocean">
                    {destination.route}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {destination.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <Card className="p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/50">
                <PlaneTakeoff size={24} />
              </span>
              <div>
                <p className="font-bold text-ocean">Travel questions</p>
                <h2 className="text-3xl font-black text-navy dark:text-white">
                  FAQ
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {faqs.map(([question, answer]) => (
                <details
                  key={question}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"
                >
                  <summary className="cursor-pointer font-bold text-navy dark:text-white">
                    {question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </Card>

          <Card className="relative overflow-hidden bg-flight-gradient p-8 text-white">
            <BellRing className="mb-5" size={40} />
            <h2 className="text-3xl font-black">
              Request fare alerts and travel updates.
            </h2>
            <p className="mt-3 text-blue-50">
              Leave your email to receive route updates, seasonal fare alerts,
              and travel support from SkyLink Travels.
            </p>

            <form
              onSubmit={handleFareUpdates}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <div className="min-w-0 flex-1">
                <input
                  type="email"
                  value={fareEmail}
                  onChange={(event) => {
                    setFareEmail(event.target.value);
                    setFareError("");
                  }}
                  className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 font-semibold text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-200 focus:ring-4 focus:ring-white/20"
                  placeholder="Enter email address"
                />

                {fareError && (
                  <p className="mt-2 text-sm font-semibold text-white">
                    {fareError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <MessageCircle size={18} />
                Request Updates
              </button>
            </form>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm text-blue-50">
              <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
              <p>
                Customers can also contact our reservations team directly for
                route advice, fare checks, passenger details, and booking
                assistance.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
