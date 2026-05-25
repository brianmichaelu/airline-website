import { FormEvent, useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { siteConfig } from "@/lib/site";

function getWhatsAppLink(message: string) {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const whatsappMessage =
    "Hello SkyLink Travels, I need help with a flight reservation.";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const travelRoute = String(form.get("travelRoute") || "").trim();
    const travelDate = String(form.get("travelDate") || "").trim();
    const passengers = String(form.get("passengers") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const message = String(form.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};

    if (!fullName) nextErrors.fullName = "Full name is required";
    if (!phone) nextErrors.phone = "Phone / WhatsApp is required";
    if (!travelRoute) nextErrors.travelRoute = "Travel route is required";

    if (email && !email.includes("@")) {
      nextErrors.email = "Enter a valid email address";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const preparedMessage = [
      "Hello SkyLink Travels, I would like help with a flight booking.",
      "",
      `Full Name: ${fullName}`,
      email ? `Email: ${email}` : "",
      `Phone / WhatsApp: ${phone}`,
      `Travel Route: ${travelRoute}`,
      travelDate ? `Travel Date: ${travelDate}` : "",
      passengers ? `Passengers: ${passengers}` : "",
      subject ? `Subject: ${subject}` : "",
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = getWhatsAppLink(preparedMessage);
  };

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
                  Fill in your travel request and send it directly through
                  WhatsApp.
                </p>
              </div>
            </div>

            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <Input
                label="Full Name"
                name="fullName"
                placeholder="Your name"
                error={errors.fullName}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                error={errors.email}
              />

              <Input
                label="Phone / WhatsApp"
                name="phone"
                placeholder="+255689824682"
                error={errors.phone}
              />

              <Input
                label="Travel Route"
                name="travelRoute"
                placeholder="Dar es Salaam to Dubai"
                error={errors.travelRoute}
              />

              <Input label="Travel Date" name="travelDate" type="date" />

              <Input
                label="Passengers"
                name="passengers"
                type="number"
                min={1}
                placeholder="1"
              />

              <div className="sm:col-span-2">
                <Input
                  label="Subject"
                  name="subject"
                  placeholder="Flight booking assistance"
                />
              </div>

              <label className="sm:col-span-2">
                <span className="label-style">Message</span>

                <textarea
                  name="message"
                  className="input-style min-h-36 resize-none bg-white text-slate-900 placeholder:text-slate-400 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                  placeholder="Tell us your preferred destination, travel dates, number of passengers, and any special request..."
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ocean px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <MessageCircle size={18} />
                  Send Message
                </button>

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
