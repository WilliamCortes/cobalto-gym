import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { t } from "@/lib/content";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(t.meta.siteUrl),
  title: {
    default: t.meta.title,
    template: t.meta.titleTemplate,
  },
  description: t.meta.description,
  keywords: t.meta.keywords,
  authors: [{ name: t.meta.author }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: t.meta.siteUrl,
    siteName: t.brand.name,
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    locale: "es_CO",
    images: [
      {
        url: "/images/gym-interior.jpg",
        width: 1200,
        height: 630,
        alt: "Gym Cobalto — el gimnasio #1 de Cachipay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t.meta.twitterTitle,
    description: t.meta.twitterDescription,
    images: ["/images/gym-interior.jpg"],
  },
  alternates: {
    canonical: t.meta.siteUrl,
    languages: { "es-CO": t.meta.siteUrl },
  },
  other: {
    "geo.region": "CO-CUN",
    "geo.placename": "Cachipay, Cundinamarca, Colombia",
    "geo.position": "4.7284;-74.5305",
    ICBM: "4.7284, -74.5305",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#16A34A",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: t.brand.name,
  alternateName: "GymCobalto",
  description: t.meta.description,
  url: t.meta.siteUrl,
  telephone: t.brand.phone,
  image: `${t.meta.siteUrl}/images/gym-interior.jpg`,
  logo: `${t.meta.siteUrl}/logo.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: t.brand.address,
    addressLocality: t.brand.city,
    addressRegion: t.brand.region,
    postalCode: t.brand.postalCode,
    addressCountry: t.brand.country === "Colombia" ? "CO" : t.brand.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: 4.7284, longitude: -74.5305 },
  hasMap: t.brand.mapsUrl,
  openingHours: ["Mo-Fr 05:00-11:30", "Mo-Fr 16:00-22:00", "Sa 07:30-12:00"],
  priceRange: "$",
  currenciesAccepted: "COP",
  paymentAccepted: "Cash, Nequi, Daviplata, Bank Transfer",
  areaServed: [
    { "@type": "City", name: "Cachipay" },
    { "@type": "City", name: "La Mesa" },
    { "@type": "City", name: "Anapoima" },
    { "@type": "City", name: "Tena" },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Zona de musculación", value: true },
    { "@type": "LocationFeatureSpecification", name: "Entrenamiento funcional", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cardio", value: true },
    { "@type": "LocationFeatureSpecification", name: "Entrenador personal", value: true },
  ],
  sameAs: [t.brand.instagram, t.brand.facebook, t.brand.whatsapp],
  founder: {
    "@type": "Person",
    name: t.brand.founder,
    jobTitle: t.brand.founderTitle,
    sameAs: t.brand.founderInstagram,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
