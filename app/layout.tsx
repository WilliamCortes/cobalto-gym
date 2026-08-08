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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta el gimnasio en Cachipay?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gym Cobalto ofrece planes desde $8.000 por día, $35.000 semanal, $70.000 mensual, $190.000 trimestral, $360.000 semestral y $690.000 anual. Todos los precios en pesos colombianos. No hay costo de matrícula ni cargos adicionales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es el gimnasio en Cachipay, Cundinamarca?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gym Cobalto es el gimnasio #1 de Cachipay, ubicado en la Calle 3 #1-63, Vía al Colegio Departamental. Tiene más de 5 años de trayectoria y ofrece musculación, entrenamiento funcional, cardio y entrenador personal.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuáles son los horarios de Gym Cobalto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lunes a viernes: 5:00 a.m. a 11:30 a.m. y 4:00 p.m. a 10:00 p.m. Sábados: 7:30 a.m. a 12:00 p.m. Domingos cerrado.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hay gimnasio cerca de La Mesa, Cundinamarca?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Gym Cobalto en Cachipay está a solo 13 km de La Mesa, aproximadamente 15 minutos en carro por la Autopista del Tequendama. Es el gimnasio completo más cercano a La Mesa en la región.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hay gimnasio cerca de Anapoima?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Gym Cobalto en Cachipay está a 25 km de Anapoima, unos 28 minutos en carro por la vía Bogotá–Girardot. Es la opción de gimnasio profesional más próxima a Anapoima.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué servicios tiene Gym Cobalto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gym Cobalto ofrece: zona de musculación con máquinas profesionales y pesas libres, área de entrenamiento funcional (HIIT y CrossFit-style), cardio con bicicletas estáticas y elípticas, y servicio de entrenador personal con Edwin González (coach certificado con más de 5 años de experiencia).",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo pagar la membresía en Gym Cobalto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gym Cobalto acepta pago en efectivo, Nequi, Daviplata y transferencia bancaria. Puedes iniciar contactando al 300 443 6649 por WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo llegar a Gym Cobalto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La dirección es Calle 3 #1-63, Vía al Colegio Departamental, Cachipay, Cundinamarca, Colombia. Desde Bogotá toma la Autopista Bogotá–Girardot y sigue las indicaciones hacia Cachipay. Coordenadas GPS: 4.7284, -74.5305.",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
