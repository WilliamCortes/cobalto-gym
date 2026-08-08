import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/lib/content";
import { CIUDADES_CERCANAS, getCiudadBySlug } from "@/lib/seo-locations";

export async function generateStaticParams() {
  return CIUDADES_CERCANAS.map((c) => ({ ciudad: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}): Promise<Metadata> {
  const { ciudad } = await params;
  const data = getCiudadBySlug(ciudad);
  if (!data) return {};

  const title = `Gimnasio cerca de ${data.nombre} | Gym Cobalto en Cachipay`;
  const description = `¿Buscas un gimnasio cerca de ${data.nombre}? Gym Cobalto en Cachipay está a solo ${data.distanciaKm} km (${data.tiempoMin} min). Musculación, funcional y cardio desde $70.000/mes.`;

  return {
    title,
    description,
    keywords: `gimnasio cerca ${data.nombre}, gym ${data.nombre}, gimnasio ${data.nombre} cundinamarca, gym cerca de ${data.nombre}, fitness ${data.nombre}`,
    alternates: {
      canonical: `${t.meta.siteUrl}/cerca/${data.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${t.meta.siteUrl}/cerca/${data.slug}`,
      images: [{ url: "/images/gym-interior.jpg", width: 1200, height: 630 }],
    },
  };
}

const PLANES = [
  { label: "Plan Mensual", precio: "$70.000", duracion: "30 días" },
  { label: "Plan Trimestral", precio: "$190.000", duracion: "3 meses" },
  { label: "Plan Semestral", precio: "$360.000", duracion: "6 meses" },
  { label: "Plan Anual", precio: "$690.000", duracion: "12 meses" },
  { label: "Día suelto", precio: "$8.000", duracion: "1 día" },
];

const SERVICIOS = [
  { emoji: "💪", nombre: "Zona de Musculación", desc: "Máquinas profesionales, cables, pesas libres y equipos de resistencia para hipertrofia y fuerza." },
  { emoji: "🔥", nombre: "Entrenamiento Funcional", desc: "Circuitos HIIT, CrossFit-style y trabajo funcional para potencia, resistencia y definición." },
  { emoji: "🚴", nombre: "Cardio", desc: "Bicicletas estáticas, elípticas y área de cardio ventilada. Quema calorías en un ambiente agradable." },
  { emoji: "🧠", nombre: "Entrenador Personal", desc: "Edwin González, coach certificado con 5+ años de experiencia, diseña tu plan personalizado." },
];

export default async function CercaDePage({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad } = await params;
  const data = getCiudadBySlug(ciudad);
  if (!data) notFound();

  const waMsg = encodeURIComponent(
    `Hola! Estoy en ${data.nombre} y quiero info sobre Gym Cobalto`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: "Gym Cobalto",
    description: `Gimnasio en Cachipay, el más cercano a ${data.nombre} (${data.distanciaKm} km). Musculación, funcional y cardio.`,
    url: `${t.meta.siteUrl}/cerca/${data.slug}`,
    telephone: t.brand.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: t.brand.address,
      addressLocality: "Cachipay",
      addressRegion: "Cundinamarca",
      postalCode: t.brand.postalCode,
      addressCountry: "CO",
    },
    geo: { "@type": "GeoCoordinates", latitude: 4.7284, longitude: -74.5305 },
    openingHours: ["Mo-Fr 05:00-11:30", "Mo-Fr 16:00-22:00", "Sa 07:30-12:00"],
    priceRange: "$",
    areaServed: [
      { "@type": "City", name: "Cachipay" },
      { "@type": "City", name: data.nombre },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planes de membresía",
      itemListElement: PLANES.map((p) => ({
        "@type": "Offer",
        name: p.label,
        price: p.precio.replace(/[^0-9]/g, ""),
        priceCurrency: "COP",
        description: p.duracion,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: "#0d1117", color: "#fff", minHeight: "100vh", fontFamily: "var(--font-inter, sans-serif)" }}>

        {/* Header */}
        <header style={{ borderBottom: "1px solid rgba(255,255,255,.08)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#16A34A", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 24, letterSpacing: 2, textDecoration: "none" }}>
            GYM COBALTO
          </Link>
          <Link href={t.nav.ctaHref} style={{ background: "#16A34A", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            WhatsApp
          </Link>
        </header>

        {/* Hero */}
        <section style={{ padding: "64px 24px 48px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#16A34A", fontWeight: 700, letterSpacing: 3, fontSize: 13, textTransform: "uppercase", marginBottom: 16 }}>
            Gimnasio cerca de {data.nombre} · Cundinamarca
          </p>
          <h1 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: "clamp(40px, 8vw, 72px)", lineHeight: 1, marginBottom: 24 }}>
            EL GIMNASIO MÁS CERCANO<br />A {data.nombre.toUpperCase()}
          </h1>
          <p style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>
            {data.contexto} Gym Cobalto está en Cachipay, a solo <strong style={{ color: "#fff" }}>{data.distanciaKm} km de {data.nombre}</strong> — aproximadamente <strong style={{ color: "#fff" }}>{data.tiempoMin} minutos</strong> {data.via}.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`https://wa.me/573004436649?text=${waMsg}`} style={{ background: "#16A34A", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 16 }}>
              Consultar por WhatsApp
            </a>
            <Link href="/#planes" style={{ border: "1px solid rgba(255,255,255,.2)", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontSize: 16 }}>
              Ver todos los planes
            </Link>
          </div>
        </section>

        {/* Distancia badge */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <div style={{ background: "rgba(22,163,74,.1)", border: "1px solid rgba(22,163,74,.3)", borderRadius: 16, padding: "24px 32px", display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 40, color: "#16A34A", lineHeight: 1 }}>{data.distanciaKm} KM</div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>desde {data.nombre}</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,.1)" }} />
            <div>
              <div style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 40, color: "#16A34A", lineHeight: 1 }}>{data.tiempoMin} MIN</div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>en carro</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,.1)" }} />
            <div>
              <div style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 40, color: "#16A34A", lineHeight: 1 }}>22°C</div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>clima ideal</div>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,.1)" }} />
            <div>
              <div style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 40, color: "#16A34A", lineHeight: 1 }}>5+ AÑOS</div>
              <div style={{ color: "#9ca3af", fontSize: 13 }}>de trayectoria</div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 32, textAlign: "center" }}>
            QUÉ ENCUENTRAS EN GYM COBALTO
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {SERVICIOS.map((s) => (
              <div key={s.nombre} style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.emoji}</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{s.nombre}</h3>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Planes */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 8, textAlign: "center" }}>
            PLANES Y PRECIOS
          </h2>
          <p style={{ color: "#9ca3af", textAlign: "center", marginBottom: 32 }}>
            Los mismos precios para todos — sin letra pequeña.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {PLANES.map((p) => (
              <div key={p.label} style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 8 }}>{p.label}</div>
                <div style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 32, color: "#16A34A", lineHeight: 1 }}>{p.precio}</div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>{p.duracion}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo llegar */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 24 }}>
            CÓMO LLEGAR DESDE {data.nombre.toUpperCase()}
          </h2>
          <div style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 24 }}>
            <p style={{ color: "#d1d5db", lineHeight: 1.8, marginBottom: 16 }}>
              Desde {data.nombre}, toma {data.via} hasta Cachipay. El trayecto es de aproximadamente {data.tiempoMin} minutos ({data.distanciaKm} km).
            </p>
            <p style={{ color: "#d1d5db", lineHeight: 1.8, marginBottom: 20 }}>
              <strong>Dirección:</strong> Calle 3 #1-63, Vía al Colegio Departamental, Cachipay, Cundinamarca.
            </p>
            <a
              href={t.brand.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", background: "#16A34A", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14 }}
            >
              Ver en Google Maps →
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 32 }}>
            PREGUNTAS FRECUENTES
          </h2>
          {[
            {
              q: `¿Hay un gimnasio cerca de ${data.nombre}?`,
              a: `Sí. Gym Cobalto en Cachipay está a ${data.distanciaKm} km de ${data.nombre}, aproximadamente ${data.tiempoMin} minutos en carro ${data.via}. Es el gimnasio completo más cercano a ${data.nombre} en la región de Tequendama.`,
            },
            {
              q: `¿Cuánto cuesta el gimnasio cerca de ${data.nombre}?`,
              a: `Gym Cobalto ofrece planes desde $8.000/día, $70.000/mes, $190.000/trimestre, $360.000/semestre y $690.000/año. No hay costos de matrícula ni cargos ocultos.`,
            },
            {
              q: `¿Cómo llegar a Gym Cobalto desde ${data.nombre}?`,
              a: `Desde ${data.nombre}, sigue ${data.via} hasta Cachipay. La dirección es Calle 3 #1-63, Vía al Colegio Departamental. El recorrido es de aproximadamente ${data.distanciaKm} km.`,
            },
            {
              q: `¿Qué servicios tiene el gimnasio?`,
              a: `Gym Cobalto tiene zona de musculación con máquinas profesionales, área de entrenamiento funcional, cardio (bicicletas estáticas y elípticas) y entrenador personal (Edwin González, 5+ años de experiencia).`,
            },
            {
              q: `¿Cuáles son los horarios?`,
              a: `Lunes a viernes: 5:00 a.m. – 11:30 a.m. y 4:00 p.m. – 10:00 p.m. Sábados: 7:30 a.m. – 12:00 p.m. Domingos: cerrado.`,
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              style={{ borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 20, marginBottom: 20 }}
            >
              <summary style={{ fontWeight: 700, fontSize: 16, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                {q} <span style={{ color: "#16A34A" }}>+</span>
              </summary>
              <p style={{ color: "#9ca3af", lineHeight: 1.7, marginTop: 12, paddingLeft: 4 }}>{a}</p>
            </details>
          ))}
        </section>

        {/* CTA final */}
        <section style={{ background: "rgba(22,163,74,.08)", borderTop: "1px solid rgba(22,163,74,.2)", padding: "48px 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 40, marginBottom: 16 }}>
            ¿LISTO PARA EMPEZAR?
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            Escríbenos por WhatsApp y te orientamos para que empieces esta semana.
          </p>
          <a
            href={`https://wa.me/573004436649?text=${waMsg}`}
            style={{ background: "#16A34A", color: "#fff", padding: "16px 40px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 18, display: "inline-block" }}
          >
            Escríbenos ahora →
          </a>
        </section>

        {/* Footer */}
        <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.06)", color: "#6b7280", fontSize: 13 }}>
          <p>
            <Link href="/" style={{ color: "#16A34A", textDecoration: "none" }}>Gym Cobalto</Link>
            {" · "}Calle 3 #1-63, Cachipay, Cundinamarca
            {" · "}
            <a href={`tel:${t.brand.phone}`} style={{ color: "#9ca3af" }}>{t.brand.phoneDisplay}</a>
          </p>
          <p style={{ marginTop: 8 }}>
            <Link href="/cerca/la-mesa" style={{ color: "#6b7280", marginRight: 16 }}>Cerca de La Mesa</Link>
            <Link href="/cerca/el-colegio" style={{ color: "#6b7280", marginRight: 16 }}>Cerca de El Colegio</Link>
            <Link href="/cerca/tena" style={{ color: "#6b7280", marginRight: 16 }}>Cerca de Tena</Link>
            <Link href="/cerca/anapoima" style={{ color: "#6b7280" }}>Cerca de Anapoima</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
