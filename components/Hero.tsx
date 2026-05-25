import { motion } from "framer-motion";
import Image from "next/image";
import FlightSearchForm from "@/components/FlightSearchForm";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-flight-gradient px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.22),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            Strictly airline tickets. Simple public booking flow.
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
            Find smart fares with a cleaner booking experience.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg text-blue-50">
            Search flights, compare mock fares, review passenger details, and complete a demo checkout without accounts, login pages, or car rentals.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} className="relative hidden lg:block">
          <Image src="/images/hero-plane.png" alt="Modern airline booking hero" width={680} height={520} priority className="drop-shadow-2xl" />
        </motion.div>
      </div>
      <div className="relative mx-auto mt-10 max-w-7xl">
        <FlightSearchForm />
      </div>
    </section>
  );
}
