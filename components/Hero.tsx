import { motion } from "framer-motion";
import Image from "next/image";
import FlightSearchForm from "@/components/FlightSearchForm";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-flight-gradient px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.22),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
          >
            Trusted flight reservations for regional and international travel.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl"
          >
            Find the right flight at the right fare.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-blue-50"
          >
            Search flights, compare fares, review passenger details, and reserve
            airline tickets with a simple booking process built for modern
            travellers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-black">15+</p>
              <p className="mt-1 text-sm text-blue-50">Popular routes</p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-black">5</p>
              <p className="mt-1 text-sm text-blue-50">Payment options</p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-black">24/7</p>
              <p className="mt-1 text-sm text-blue-50">Online search</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative hidden lg:block"
        >
          <Image
            src="/images/hero-plane.png"
            alt="Airline ticket booking and travel reservations"
            width={680}
            height={520}
            priority
            className="drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl">
        <FlightSearchForm />
      </div>
    </section>
  );
}
