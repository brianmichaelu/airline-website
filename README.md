# SkyLink Travels - Airline Ticket Booking Website

SkyLink Travels is a modern responsive airline ticket booking website for searching, comparing, and reserving regional and international flight options.

The website is designed for a travel agency, ticketing office, or airline reservation business that wants a clean online presence with a simple flight search and booking request flow.

## Main Features

- Modern responsive homepage
- Flight search form
- One-way and round-trip options
- Departure and return date fields
- Passenger count field
- Cabin class selection
- Airport and city suggestions
- Flight results page
- Flight filtering by airline, stops, price, and departure time
- Flight details page
- Passenger information form
- Tanzania mobile money payment method selection
- Booking confirmation page
- About page
- Contact page
- Newsletter section
- Dark mode support
- Mobile-friendly navigation
- Reusable components

## Tech Stack

- React + Next.js
- TypeScript using `.tsx` pages and components
- Tailwind CSS
- Framer Motion animations
- Lucide React icons
- Responsive mobile-first layouts
- Reusable UI components
- PNG image assets

## Business Contacts

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
