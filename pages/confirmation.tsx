import { CheckCircle2, Download, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { siteConfig } from "@/lib/site";

export default function ConfirmationPage() {
  const bookingRef = "AFD-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <Layout title="Booking Confirmed" description="Demo booking confirmation screen.">
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-3xl overflow-hidden text-center">
          <div className="bg-flight-gradient p-10 text-white">
            <CheckCircle2 className="mx-auto" size={70} />
            <h1 className="mt-5 text-4xl font-black">Booking request confirmed</h1>
            <p className="mt-3 text-blue-50">This is a frontend demo confirmation. No real ticket has been issued.</p>
          </div>
          <div className="p-8">
            <p className="text-sm text-slate-500">Booking Reference</p>
            <p className="mt-1 text-3xl font-black text-navy dark:text-white">{bookingRef}</p>
            <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-300">A real version could email the ticket, connect to an airline API, and process payment securely. For this demo, contact details use {siteConfig.email} and {siteConfig.phone}.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/search">Book Another Flight</Button>
              <Button variant="secondary" href="/contact"><Mail size={16} /> Contact Support</Button>
              <Button variant="ghost"><Download size={16} /> Download UI</Button>
            </div>
          </div>
        </Card>
      </section>
    </Layout>
  );
}
