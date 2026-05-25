import { CheckCircle2, Download, Mail, PlaneTakeoff } from "lucide-react";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { siteConfig } from "@/lib/site";

export default function ConfirmationPage() {
  const bookingRef = "SKY-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <Layout
      title="Reservation Confirmed"
      description="Your flight reservation request has been received successfully."
    >
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-3xl overflow-hidden text-center">
          <div className="bg-flight-gradient p-10 text-white">
            <CheckCircle2 className="mx-auto" size={70} />

            <h1 className="mt-5 text-4xl font-black">
              Reservation request received
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-blue-50">
              Thank you for choosing SkyLink Travels. Our reservations team will
              review your request and contact you with the next booking steps.
            </p>
          </div>

          <div className="p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Booking Reference
            </p>

            <p className="mt-1 text-3xl font-black text-navy dark:text-white">
              {bookingRef}
            </p>

            <div className="mx-auto mt-6 max-w-xl rounded-3xl bg-blue-50 p-5 text-left dark:bg-slate-900">
              <div className="flex gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-ocean shadow-sm dark:bg-slate-800">
                  <PlaneTakeoff size={22} />
                </span>

                <div>
                  <h2 className="font-black text-navy dark:text-white">
                    What happens next?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    A reservations advisor will confirm seat availability, fare
                    details, passenger information, and payment instructions
                    using the contact details provided during checkout.
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              <p>
                For urgent support, contact us at{" "}
                <strong className="text-navy dark:text-white">
                  {siteConfig.email}
                </strong>{" "}
                or{" "}
                <strong className="text-navy dark:text-white">
                  {siteConfig.phone}
                </strong>
                .
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/search">
                <PlaneTakeoff size={16} />
                Book Another Flight
              </Button>

              <Button variant="secondary" href="/contact">
                <Mail size={16} />
                Contact Support
              </Button>

              <Button variant="ghost">
                <Download size={16} />
                Download Summary
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </Layout>
  );
}
