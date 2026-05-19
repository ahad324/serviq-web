import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Serviq | AI-Powered Local Service Orchestrator",
  description: "Bilingual, natural language matching engine connecting users with highly-rated local expert technicians. No more forms, just talk to Serviq.",
  keywords: ["Serviq", "AI local services", "home repair AI", "handyman booking app", "Urdu voice-to-text service"],
  openGraph: {
    title: "Serviq | AI-Powered Local Service Orchestrator",
    description: "Bilingual, natural language matching engine connecting users with highly-rated local expert technicians.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans min-h-screen antialiased overflow-x-hidden`}
      >
        <LenisProvider>
          <div className="noise-overlay" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
