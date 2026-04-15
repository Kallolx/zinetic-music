import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zineticmusic.com"),
  title: {
    default: "Home - Zinetic Music Limited",
    template: "%s - Zinetic Music Limited",
  },
  description:
    "Empowering independent artists with global music distribution, 100% royalties, and advanced analytics. Join Zinetic Music and take control of your musical journey.",
  keywords: [
    "music distribution",
    "independent artists",
    "music royalties",
    "global music release",
    "zinetic music",
    "digital distribution",
    "music streaming services",
    "independent label support",
    "distribute music to spotify",
    "apple music distribution",
  ],
  authors: [{ name: "Zinetic Music" }],
  creator: "Zinetic Music",
  publisher: "Zinetic Music",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zinetic Music | Global Music Distribution",
    description:
      "Release your music worldwide while keeping 100% of your royalties. Empowering independent artists with technology and support.",
    url: "https://zineticmusic.com",
    siteName: "Zinetic Music",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Zinetic Music Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zinetic Music | The Future of Sound",
    description:
      "Independent music distribution built for the modern artist. Keep your rights, keep your royalties.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
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
      className={`${dmSans.variable} ${inter.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
