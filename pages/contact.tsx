import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <Layout
      title="Contact SkyLink Travels"
      description="Contact SkyLink Travels for flight reservations, fare questions, passenger details, and booking support."
    >
      <section className="bg-flight-gradient px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">Contact Us</p>

          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Need help with a flight?
          </h1>

          <p className="mt-4 max-w-2xl text-blue-50">
            Our reservations team can help with route options, fare questions,
            passenger details, payment instructions, and booking follow-up.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Card className="p-5">
              <Phone className="mb-3 text-ocean" />
              <p className="font-black text-navy dark:text-white">
                Phone / WhatsApp
              </p>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                {siteConfig.phone}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                For quick booking assistance and fare questions.
              </p>
            </Card>

            <Card className="p-5">
              <Mail className="mb-3 text-ocean" />
              <p className="font-black text-navy dark:text-white">Email</p>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                {siteConfig.email}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Send passenger details, travel dates, and route requests.
              </p>
            </Card>

            <Card className="p-5">
              <MapPin className="mb-3 text-ocean" />
              <p className="font-black text-navy dark:text-white">Location</p>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                {siteConfig.location}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Serving travellers across Tanzania and nearby regions.
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/40">
                <MessageCircle size={22} />
              </span>

              <div>
                <h2 className="text-2xl font-black text-navy dark:text-white">
                  Send a message
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Tell us where you want to travel and our team will respond
                  with suitable flight options.
                </p>
              </div>
            </div>

            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => event.preventDefault()}
            >
              <Input label="Full Name" placeholder="Your name" />

              <Input label="Email" type="email" placeholder="you@example.com" />

              <Input label="Phone / WhatsApp" placeholder="+255689824682" />

              <Input label="Travel Route" placeholder="Dar es Salaam to Dubai" />

              <Input label="Travel Date" type="date" />

              <Input label="Passengers" type="number" placeholder="1" />

              <div className="sm:col-span-2">
                <Input
                  label="Subject"
                  placeholder="Flight booking assistance"
                />
              </div>

              <label className="sm:col-span-2">
                <span className="label-style">Message</span>
                <textarea
                  className="input-style min-h-36 resize-none"
                  placeholder="Tell us your preferred destination, travel dates, number of passengers, and any special request..."
                />
              </label>

              <div className="sm:col-span-2">
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
