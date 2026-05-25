import Head from "next/head";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/lib/site";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Modern Flight Booking`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description || "Search and book airline tickets with a modern, simple flight booking website."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
