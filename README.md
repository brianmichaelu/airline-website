# AirFare Direct - Airline Ticket Booking Website

A modern responsive airline ticket booking frontend inspired by CheapOair-style search experiences, but simpler, cleaner, and strictly focused on airline tickets.

No login, signup, authentication, user dashboard, car rental, or backend payment integration is included.

## Tech Stack

- React + Next.js
- TypeScript using `.tsx` pages and components
- Tailwind CSS
- Framer Motion animations
- Lucide React icons
- Mock JSON flight data
- Dark mode support
- Responsive mobile-first layouts

## Demo Contacts Used

- Phone / WhatsApp: `+255689824682`
- Email: `lubrun.enterprises@gmail.com`
- Location: `Dar es Salaam, Tanzania`

## Folder Structure

```txt
Airline-website/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── BookingForm.tsx
│   ├── FiltersSidebar.tsx
│   ├── FlightCard.tsx
│   ├── FlightSearchForm.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   └── SkeletonLoader.tsx
├── data/
│   └── flights.ts
├── lib/
│   ├── format.ts
│   └── site.ts
├── pages/
│   ├── flight/
│   │   └── [id].tsx
│   ├── _app.tsx
│   ├── about.tsx
│   ├── checkout.tsx
│   ├── confirmation.tsx
│   ├── contact.tsx
│   ├── index.tsx
│   └── search.tsx
├── public/
│   └── images/
│       ├── airline-azure.png
│       ├── airline-coastal.png
│       ├── airline-nova.png
│       ├── airline-skyvista.png
│       ├── about-banner.png
│       ├── destination-1.png
│       ├── destination-2.png
│       ├── destination-3.png
│       ├── destination-4.png
│       ├── hero-plane.png
│       └── payment-icons.png
├── styles/
│   └── globals.css
├── types/
│   └── flight.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Installation Steps

Open PowerShell in your project folder:

```powershell
cd "C:\Users\mwika\OneDrive\Desktop\Brian\Airline-website"
```

Install dependencies:

```powershell
npm.cmd install
```

Run locally:

```powershell
npm.cmd run dev
```

Open:

```txt
http://localhost:3000
```

Before pushing to GitHub or deploying on Vercel, test the build:

```powershell
npm.cmd run build
```

## GitHub Push Steps

```powershell
git init
git add .
git commit -m "Create airline ticket booking website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your real GitHub repository URL.

## Notes

- All images are `.png` placeholders inside `/public/images/`.
- Flight data is stored in `data/flights.ts`.
- Payment form is UI only. It does not process real payments.
- Confirmation page is demo only. It does not issue real tickets.
- This project is prepared for frontend portfolio/demo use and can be connected to real APIs later.
