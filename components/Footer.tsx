import { Mail, MapPin, MessageCircle, Phone, Plane } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

function getWhatsAppLink(message: string) {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function Footer() {
  const whatsappMessage =
    "Hello SkyLink Travels, I need help with a flight reservation.";

  return (
    <footer className="bg-navy px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-xl font-black">
            <Plane />
            {siteConfig.name}
          </div>

          <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">
            Search, compare, and reserve airline tickets for regional and
            international travel. Our reservations team helps customers with
            route options, fare questions, passenger details, and payment
            instructions.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
              Flight Reservations
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
              Mobile Money Support
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
              Regional & International Routes
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>

            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-navy transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Search Flights
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">Quick Links</h3>

          <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100">
            <Link className="transition hover:text-white" href="/">
              Home
            </Link>
            <Link className="transition hover:text-white" href="/search">
              Search Flights
            </Link>
            <Link className="transition hover:text-white" href="/about">
              About
            </Link>
            <Link className="transition hover:text-white" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">Contact</h3>

          <div className="mt-4 space-y-3 text-sm text-blue-100">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={16} />
              {siteConfig.email}
            </a>

            <p className="flex items-center gap-2">
              <MapPin size={16} />
              {siteConfig.location}
            </p>
          </div>

          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/20"
          >
            <MessageCircle size={16} />
            WhatsApp Support
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-blue-100 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>

        <p>
          Airline ticket reservations, fare support, and travel assistance.
        </p>
      </div>
    </footer>
  );
}
