import { Mail, MapPin, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <Layout title="Contact" description="Contact the demo airline ticket website team.">
      <section className="bg-flight-gradient px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-blue-100">Contact</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Need help with a flight?</h1>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Card className="p-5"><Phone className="mb-3 text-ocean" /><p className="font-black">Phone / WhatsApp</p><p className="text-slate-600 dark:text-slate-300">{siteConfig.phone}</p></Card>
            <Card className="p-5"><Mail className="mb-3 text-ocean" /><p className="font-black">Email</p><p className="text-slate-600 dark:text-slate-300">{siteConfig.email}</p></Card>
            <Card className="p-5"><MapPin className="mb-3 text-ocean" /><p className="font-black">Location</p><p className="text-slate-600 dark:text-slate-300">{siteConfig.location}</p></Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-black text-navy dark:text-white">Send a message</h2>
            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
              <Input label="Full Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="you@example.com" />
              <div className="sm:col-span-2"><Input label="Subject" placeholder="Flight booking question" /></div>
              <label className="sm:col-span-2">
                <span className="label-style">Message</span>
                <textarea className="input-style min-h-36" placeholder="Tell us what you need..." />
              </label>
              <div className="sm:col-span-2"><Button type="submit">Send Demo Message</Button></div>
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
