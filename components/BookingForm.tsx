import { CreditCard, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/router";

export default function BookingForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const required = ["firstName", "lastName", "email", "phone", "cardName", "cardNumber"];
    const nextErrors: Record<string, string> = {};

    required.forEach((field) => {
      if (!String(form.get(field) || "").trim()) nextErrors[field] = "Required";
    });

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setLoading(true);
      setTimeout(() => router.push("/confirmation"), 900);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
        <h2 className="text-xl font-black text-navy dark:text-white">Passenger Information</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="First Name" name="firstName" placeholder="Brian" error={errors.firstName} />
          <Input label="Last Name" name="lastName" placeholder="Undiri" error={errors.lastName} />
          <Input label="Email" name="email" type="email" placeholder="lubrun.enterprises@gmail.com" error={errors.email} />
          <Input label="Phone" name="phone" placeholder="+255689824682" error={errors.phone} />
          <Input label="Nationality" name="nationality" placeholder="Tanzanian" />
          <Input label="Passport / ID Number" name="passport" placeholder="Demo only" />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/40"><CreditCard /></span>
          <div>
            <h2 className="text-xl font-black text-navy dark:text-white">Payment Details</h2>
            <p className="text-sm text-slate-500">UI only. No real payment will be processed.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Cardholder Name" name="cardName" placeholder="Brian Undiri" error={errors.cardName} />
          <Input label="Card Number" name="cardNumber" placeholder="4242 4242 4242 4242" error={errors.cardNumber} />
          <Input label="Expiry Date" name="expiry" placeholder="12/28" />
          <Input label="CVC" name="cvc" placeholder="123" />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <LockKeyhole size={16} /> Secure demo checkout UI
          <img src="/images/payment-icons.png" alt="Payment icons" className="h-8 w-auto" />
        </div>
      </section>

      <Button type="submit" disabled={loading} className="w-full py-4 text-base">
        {loading ? "Processing Demo Booking..." : "Confirm Booking"}
      </Button>
    </form>
  );
}
