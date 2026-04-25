import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SSC Navigator - Search & Filter SSC Phase 14 Vacancies",
    template: "%s | SSC Navigator"
  },
  description: "SSC Navigator helps you search and filter SSC Phase 14 post vacancies by region, qualification, and job requirements. Find UR, OBC, SC, ST, and EWS vacancies easily.",
  keywords: ["SSC Phase 14", "SSC vacancies", "SSC recruitment", "SSC posts", "government jobs", "SSC CGL", "SSC CHSL", "SSC MTS", "UR OBC SC ST EWS"],
  authors: [{ name: "jashgro" }],
  creator: "jashgro",
  publisher: "SSC Navigator",
  metadataBase: new URL('https://sscnavigator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sscnavigator.vercel.app',
    title: 'SSC Navigator - Search & Filter SSC Phase 14 Vacancies',
    description: 'Search and filter SSC Phase 14 post vacancies by region, qualification, and job requirements. Find UR, OBC, SC, ST, and EWS vacancies easily.',
    siteName: 'SSC Navigator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSC Navigator - Search & Filter SSC Phase 14 Vacancies',
    description: 'Search and filter SSC Phase 14 post vacancies by region, qualification, and job requirements.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'DVOurP3yStg62QYnCZT4L4fC0Atod7PVxvzNFgUkqx8',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
