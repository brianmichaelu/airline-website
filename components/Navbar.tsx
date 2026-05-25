import { Menu, Moon, Plane, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Flights", href: "/search" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-navy/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-black text-navy dark:text-white">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-flight-gradient text-white shadow-lg shadow-blue-500/25">
            <Plane size={21} />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 transition hover:text-ocean dark:text-slate-200">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button onClick={() => setDark((value) => !value)} className="rounded-2xl border border-slate-200 p-3 transition hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10" aria-label="Toggle dark mode">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button href="/search">Book Flight</Button>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-2xl border border-slate-200 p-3 md:hidden dark:border-white/10" aria-label="Open menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white p-4 md:hidden dark:border-white/10 dark:bg-navy">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/10">
                {link.label}
              </Link>
            ))}
            <button onClick={() => setDark((value) => !value)} className="rounded-2xl px-4 py-3 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-white/10">
              Toggle Dark Mode
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
