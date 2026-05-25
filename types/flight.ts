export type TripType = "round-trip" | "one-way";
export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First Class";

export interface Airport {
  city: string;
  code: string;
  country: string;
}

export interface FlightSegment {
  from: Airport;
  to: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  price: number;
  currency: string;
  stops: number;
  cabin: CabinClass;
  baggage: string;
  refundable: boolean;
  tags: string[];
  outbound: FlightSegment;
  returnSegment?: FlightSegment;
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
}

export interface SearchFormValues {
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  cabin: CabinClass;
}
