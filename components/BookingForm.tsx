import {
  Banknote,
  CheckCircle2,
  LockKeyhole,
  Phone,
  Smartphone,
  UserRound,
  Wallet,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";

type PaymentMethod =
  | "M-Pesa"
  | "Airtel Money"
  | "Mixx by Yas"
  | "HaloPesa"
  | "Bank Transfer";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-80 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-400";

const labelClass =
  "mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200";

const errorClass = "mt-1 text-xs font-semibold text-red-500";

const paymentMethods: {
  name: PaymentMethod;
  description: string;
}[] = [
  {
    name: "M-Pesa",
    description: "Pay using Vodacom M-Pesa mobile money.",
  },
  {
    name: "Airtel Money",
    description: "Pay using Airtel Money mobile wallet.",
  },
  {
    name: "Mixx by Yas",
    description: "Pay using Mixx by Yas / Tigo Pesa.",
  },
  {
    name: "HaloPesa",
    description: "Pay using HaloPesa mobile money.",
  },
  {
    name: "Bank Transfer",
    description: "Receive bank transfer instructions after confirmation.",
  },
];

export default function BookingForm() {
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("M-Pesa");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "paymentPhone",
    ];

    const nextErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!String(form.get(field) || "").trim()) {
        nextErrors[field] = "Required";
      }
    });

    const email = String(form.get("email") || "");
    if (email && !email.includes("@")) {
      nextErrors.email = "Enter a valid email address";
    }

    const paymentPhone = String(form.get("paymentPhone") || "");
    if (paymentPhone && !paymentPhone.startsWith("+255")) {
      nextErrors.paymentPhone = "Use Tanzania format, example +255689824682";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setLoading(true);

      setTimeout(() => {
        router.push(
          `/confirmation?method=${encodeURIComponent(paymentMethod)}`
        );
      }, 900);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/40">
            <UserRound size={22} />
          </span>

          <div>
            <h2 className="text-xl font-black text-navy dark:text-white">
              Passenger Information
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter traveller details exactly as they should appear on the
              airline ticket.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>First Name</span>
            <input
              name="firstName"
              className={fieldClass}
              placeholder="Brian"
            />
            {errors.firstName && (
              <p className={errorClass}>{errors.firstName}</p>
            )}
          </label>

          <label>
            <span className={labelClass}>Last Name</span>
            <input
              name="lastName"
              className={fieldClass}
              placeholder="Undiri"
            />
            {errors.lastName && (
              <p className={errorClass}>{errors.lastName}</p>
            )}
          </label>

          <label>
            <span className={labelClass}>Email</span>
            <input
              name="email"
              type="email"
              className={fieldClass}
              placeholder="lubrun.enterprises@gmail.com"
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </label>

          <label>
            <span className={labelClass}>Phone</span>
            <input
              name="phone"
              className={fieldClass}
              placeholder="+255689824682"
            />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </label>

          <label>
            <span className={labelClass}>Nationality</span>
            <input
              name="nationality"
              className={fieldClass}
              placeholder="Tanzanian"
            />
          </label>

          <label>
            <span className={labelClass}>Passport / ID Number</span>
            <input
              name="passport"
              className={fieldClass}
              placeholder="Enter passport or national ID"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-ocean dark:bg-blue-950/40">
            <Wallet size={22} />
          </span>

          <div>
            <h2 className="text-xl font-black text-navy dark:text-white">
              Payment Method
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose how you would like to receive payment instructions for this
              reservation.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {paymentMethods.map((method) => {
            const active = paymentMethod === method.name;

            return (
              <button
                key={method.name}
                type="button"
                onClick={() => setPaymentMethod(method.name)}
                className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                  active
                    ? "border-blue-600 bg-blue-50 ring-4 ring-blue-600/10 dark:border-blue-400 dark:bg-blue-950/40"
                    : "border-slate-200 bg-white hover:border-blue-300 dark:border-white/10 dark:bg-slate-900"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-navy dark:text-white">
                      {method.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {method.description}
                    </p>
                  </div>

                  {active ? (
                    <CheckCircle2 className="text-blue-600" size={20} />
                  ) : (
                    <Smartphone className="text-slate-400" size={20} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label>
            <span className={labelClass}>Mobile Money Number</span>
            <div className="relative">
              <Phone
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="paymentPhone"
                className={`${fieldClass} pl-11`}
                placeholder="+255689824682"
              />
            </div>
            {errors.paymentPhone && (
              <p className={errorClass}>{errors.paymentPhone}</p>
            )}
          </label>

          <label>
            <span className={labelClass}>Preferred Contact Time</span>
            <select name="contactTime" className={fieldClass}>
              <option>Any time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>
        </div>

        <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <div className="flex gap-3">
            <LockKeyhole
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />
            <p>
              Your selected payment method is{" "}
              <strong className="text-navy dark:text-white">
                {paymentMethod}
              </strong>
              . Our reservations team will review your request and share the
              next payment step using the contact details provided.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <Banknote size={16} />
          Payment options include mobile money and bank transfer for convenient
          local booking support.
        </div>
      </section>

      <Button type="submit" disabled={loading} className="w-full py-4 text-base">
        {loading ? "Processing Booking Request..." : "Confirm Reservation"}
      </Button>
    </form>
  );
}
