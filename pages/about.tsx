import Image from "next/image";
import Layout from "@/components/Layout";
import Card from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <Layout title="About" description="About this airline ticket booking website demo.">
      <section className="bg-flight-gradient px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">About</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-black sm:text-5xl">A simpler airline-ticket-only booking website.</h1>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black text-navy dark:text-white">Built for clean flight search and demo checkout.</h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">This project is inspired by flight comparison websites, but redesigned with a modern SaaS-style feel: glassmorphism cards, gradients, reusable components, mock data, responsive layouts, and no authentication system.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['No login/signup', 'No car rentals', 'Mock JSON flights', 'UI-only payment'].map((item) => <Card key={item} className="p-4 font-bold">{item}</Card>)}
            </div>
          </div>
          <Image src="/images/about-banner.png" alt="About airline booking" width={700} height={520} className="rounded-[2rem] shadow-soft" />
        </div>
      </section>
    </Layout>
  );
}
