import { Mail, MapPin, Phone, Plane } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-xl font-black"><Plane /> {siteConfig.name}</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-blue-100">A modern public airline ticket booking website demo. Built for searching flights, viewing fare cards, and completing a clean UI-only checkout.</p>
        </div>
        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100">
            <Link href="/search">Search Flights</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">Demo Contacts</h3>
          <div className="mt-4 space-y-3 text-sm text-blue-100">
            <p className="flex items-center gap-2"><Phone size={16} /> {siteConfig.phone}</p>
            <p className="flex items-center gap-2"><Mail size={16} /> {siteConfig.email}</p>
            <p className="flex items-center gap-2"><MapPin size={16} /> {siteConfig.location}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-blue-100">© {new Date().getFullYear()} {siteConfig.name}. Demo website only.</div>
    </footer>
  );
}
