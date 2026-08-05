import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laundry Pickup & Delivery in Los Angeles | Laundry Farm",
  description: "Door-to-door wash and fold for Los Angeles apartments. Pickup and delivery included, transparent pricing, and 48-hour turnaround.",
  icons: { icon: "/assets/laundry-farm-logo.png", shortcut: "/assets/laundry-farm-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
