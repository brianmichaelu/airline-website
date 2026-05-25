import { motion } from "framer-motion";
import { CheckCircle2, Globe2, ShieldCheck, Ticket } from "lucide-react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const features = [
  { icon: Ticket, title: "Simple ticket booking", text: "Search, compare, view details, and complete a demo checkout without accounts." },
  { icon: ShieldCheck, title: "Clean payment UI", text: "Payment screen is UI only, making it safe for demo and portfolio use." },
  { icon: Globe2, title: "Responsive layout", text: "Built with mobile, tablet, and desktop users in mind." },
];

const faqs = [
  ["Is this a real booking engine?", "No. This is a frontend demo using mock flight data only."],
  ["Does it include login or signup?", "No. The website is intentionally public and simple."],
  ["Can real API/payment be added later?", "Yes. The structure is ready for backend and payment integration later."],
];

export default function HomePage() {
  return (
    <Layout>
      <Hero />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="font-bold text-ocean">Why book here</p>
            <h2 className="mt-2 text-3xl font-black text-navy dark:text-white sm:text-4xl">Modern flight booking without the clutter.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <Card className="h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/50"><feature.icon /></span>
                  <h3 className="mt-5 text-xl font-black text-navy dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-skysoft px-4 py-16 dark:bg-white/5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="font-bold text-ocean">Featured destinations</p>
            <h2 className="mt-2 text-3xl font-black text-navy dark:text-white sm:text-4xl">Promotional cards using PNG placeholders.</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">Replace these demo PNG images later with real destination banners or airline promotions.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {['Dubai', 'Nairobi', 'London', 'New York'].map((city) => <span key={city} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow dark:bg-white/10 dark:text-white">{city}</span>)}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <Image src={`/images/destination-${item}.png`} alt={`Destination banner ${item}`} width={500} height={320} className="h-44 w-full object-cover" />
                <div className="p-4"><p className="font-black">Special Fare #{item}</p><p className="text-sm text-slate-500">Limited demo promo</p></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <Card className="p-8">
            <h2 className="text-3xl font-black text-navy dark:text-white">FAQ</h2>
            <div className="mt-6 space-y-4">
              {faqs.map(([question, answer]) => (
                <details key={question} className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                  <summary className="cursor-pointer font-bold">{question}</summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{answer}</p>
                </details>
              ))}
            </div>
          </Card>
          <Card className="relative overflow-hidden bg-flight-gradient p-8 text-white">
            <CheckCircle2 className="mb-5" size={40} />
            <h2 className="text-3xl font-black">Get fare updates in your inbox.</h2>
            <p className="mt-3 text-blue-50">Newsletter UI section for collecting interest. Connect it to a real email service later.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input className="min-w-0 flex-1 rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder:text-blue-100 outline-none" placeholder="Enter email address" />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
