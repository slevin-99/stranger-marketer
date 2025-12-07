import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google"; // Using Bebas Neue as requested fallback for Benguiat
import "./globals.css";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Which Stranger Things Marketer Are You? | Marketing Quiz',
  description: 'Scopri quale personaggio di Stranger Things rappresenta il tuo ruolo nel marketing digitale. Un quiz sarcastico per marketer che vivono nel Sottosopra.',
  keywords: ['marketing quiz', 'stranger things', 'digital marketing', 'marketing personality'],
  authors: [{ name: 'Hawkins Lab' }],
  openGraph: {
    title: 'Stranger Things Marketing Quiz',
    description: 'Quale marketer di Hawkins sei?',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stranger Things Marketing Quiz',
    description: 'Scopri il tuo personaggio marketer',
    images: ['/twitter-image.png'],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={clsx(inter.variable, bebas.variable, "antialiased bg-dark-bg text-text-primary min-h-screen")} suppressHydrationWarning>
        {/* Global Effects */}
        <div className="scanlines" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <main className="relative z-10 w-full min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
