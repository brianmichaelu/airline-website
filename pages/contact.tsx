import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { siteConfig } from "@/lib/site";

function getWhatsAppLink(message: string) {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function ContactPage() {
  const whatsappMessage =
    "Hello SkyLink Travels, I need help with a flight reservation.";

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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>

            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
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

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={getWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ocean px-4 py-2.5 text-sm font-black text-white transition hover:bg-blue-700"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-2.5 text-sm font-black text-ocean transition hover:bg-blue-100 dark:bg-blue-950/40"
                >
                  <Phone size={16} />
                  Call
                </a>
              </div>
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

              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-50 px-4 py-2.5 text-sm font-black text-ocean transition hover:bg-blue-100 dark:bg-blue-950/40"
              >
                <Mail size={16} />
                Email Us
              </a>
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
                  className="input-style min-h-36 resize-none bg-white text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="Tell us your preferred destination, travel dates, number of passengers, and any special request..."
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <Button type="submit">Send Message</Button>

                <a
                  href={getWhatsAppLink(
                    "Hello SkyLink Travels, I would like help with a flight booking."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-green-700"
                >
                  <MessageCircle size={18} />
                  Continue on WhatsApp
                </a>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
