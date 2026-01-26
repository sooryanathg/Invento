import type { Metadata } from "next";
import "./globals.css";
import { EventProvider } from "@/src/context/EventContext";
import { akira, flood, poppins, urbanist } from "../lib/fonts";
import MenuPortal from "../components/ui/menubar/menuPortal";
import { LoadingProvider } from "../components/providers/LoadingProvider";
import AutoScroll from "../components/ui/autoScroll";

export const metadata: Metadata = {
  title: "INVENTO | GEC Palakkad",
  description:
    "INVENTO is the national-level annual techno-management festival of Government Engineering College Palakkad, celebrating innovation, technology, and leadership.",

  keywords: [
    "INVENTO",
    "GEC Palakkad",
    "Techno-management fest",
    "Engineering fest",
    "Technical festival Kerala",
    "College fest India"
  ],

  authors: [{ name: "Government Engineering College Palakkad" }],

  openGraph: {
    title: "INVENTO | GEC Palakkad",
    description:
      "The national-level annual techno-management festival of Government Engineering College Palakkad.",
    url: "https://www.invento26.org/", 
    siteName: "INVENTO",
    images: [
      {
        url: "/logo.png", 
        width: 1200,
        height: 630,
        alt: "INVENTO GEC Palakkad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "INVENTO | GEC Palakkad",
    description:
      "National-level annual techno-management festival of Government Engineering College Palakkad.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${urbanist.variable} ${flood.variable} ${akira.variable} antialiased overflow-x-hidden`}
      >
        <LoadingProvider>
          <AutoScroll />
          <EventProvider>{children}</EventProvider>
          <MenuPortal />
        </LoadingProvider>
      </body>
    </html>
  );
}
