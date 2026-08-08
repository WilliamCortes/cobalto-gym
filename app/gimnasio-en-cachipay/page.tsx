import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gimnasio en Cachipay Cundinamarca | Gym Cobalto",
  description:
    "Gym Cobalto es el gimnasio #1 en Cachipay, Cundinamarca. Musculación, funcional y cardio desde $8.000/día. Entrenador personal certificado. Horarios: L-V 5am–11:30am y 4pm–10pm.",
  keywords:
    "gimnasio en Cachipay, gym Cachipay, gimnasio Cachipay Cundinamarca, gym en Cachipay, gimnasio Cachipay Colombia, ejercicio Cachipay",
  alternates: {
    canonical: `${t.meta.siteUrl}/gimnasio-en-cachipay`,
  },
  openGraph: {
    title: "Gimnasio en Cachipay Cundinamarca | Gym Cobalto",
    description:
      "El único gimnasio completo de Cachipay. Musculación, funcional, cardio y entrenador personal. Precios desde $8.000.",
    url: `${t.meta.siteUrl}/gimnasio-en-cachipay`,
    images: [{ url: "/images/gym-interior.jpg", width: 1200, height: 630 }],
  },
};

const PLANES = [
  { label: "Día suelto", precio: "$8.000", duracion: "1 día", best: false },
  { label: "Semanal", precio: "$35.000", duracion: "6 días", best: false },
  { label: "Quincenal", precio: "$55.000", duracion: "15 días", best: false },
  { label: "Mensual", precio: "$70.000", duracion: "30 días", best: true },
  { label: "Pareja", precio: "$120.000", duracion: "mes / 2 personas", best: false },
  { label: "Familiar", precio: "$150.000", duracion: "mes / familia", best: false },
  { label: "Trimestral", precio: "$190.000", duracion: "3 meses", best: false },
  { label: "Semestral", precio: "$360.000", duracion: "6 meses", best: false },
  { label: "Anual", precio: "$690.000", duracion: "12 meses", best: false },
];

const SERVICIOS = [
  {
    emoji: "💪",
    nombre: "Zona de Musculación",
    desc: "Equipos profesionales de resistencia, máquinas de cable, mancuernas y pesas libres para hipertrofia y fuerza máxima. Ideal para todos los niveles.",
  },
  {
    emoji: "🔥",
    nombre: "Entrenamiento Funcional",
    desc: "Circuitos de alta intensidad, HIIT y entrenamientos CrossFit-style para potencia, resistencia y definición. Quema grasa de forma eficiente.",
  },
  {
    emoji: "🚴",
    nombre: "Cardio",
    desc: "Bicicletas estáticas, elípticas y área de cardio con ventilación natural. Mejora tu condición cardiovascular en un ambiente agradable.",
  },
  {
    emoji: "🧠",
    nombre: "Entrenador Personal",
    desc: "Edwin González, coach certificado con más de 5 años de experiencia, diseña tu plan de entrenamiento y nutrición personalizado.",
  },
];

const FAQ = [
  {
    q: "¿Dónde está el gimnasio en Cachipay?",
    a: "Gym Cobalto está ubicado en la Calle 3 #1-63, Vía al Colegio Departamental, Cachipay, Cundinamarca, Colombia. Puedes encontrarnos fácilmente en Google Maps buscando 'Gym Cobalto Cachipay'.",
  },
  {
    q: "¿Cuánto cuesta el gimnasio en Cachipay?",
    a: "Gym Cobalto ofrece planes para todos los presupuestos: desde $8.000 por un día hasta $690.000 por un año. El plan mensual más popular cuesta $70.000. No hay costos de matrícula ni cargos ocultos.",
  },
  {
    q: "¿Cuáles son los horarios del gimnasio en Cachipay?",
    a: "Lunes a viernes: 5:00 a.m. – 11:30 a.m. y 4:00 p.m. – 10:00 p.m. Sábados: 7:30 a.m. – 12:00 p.m. Domingos: cerrado.",
  },
  {
    q: "¿Tiene entrenador personal el gimnasio de Cachipay?",
    a: "Sí. Edwin González, fundador y coach certificado con más de 5 años de experiencia, está disponible para planes de entrenamiento personalizados. Contáctanos por WhatsApp para más información.",
  },
  {
    q: "¿Qué métodos de pago acepta Gym Cobalto?",
    a: "Aceptamos efectivo, Nequi, Daviplata y transferencia bancaria. Puedes iniciar tu membresía escribiéndonos al WhatsApp 300 443 6649.",
  },
  {
    q: "¿Hay gimnasio cerca de Cachipay para personas de La Mesa o El Colegio?",
    a: "Gym Cobalto es el gimnasio de Cachipay más cercano para personas de La Mesa (13 km, ~15 min), El Colegio (8 km, ~10 min), Tena (15 km, ~18 min) y Anapoima (25 km, ~28 min).",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "Gym Cobalto",
  alternateName: "Gimnasio Cachipay",
  description:
    "El gimnasio #1 de Cachipay, Cundinamarca. Musculación, entrenamiento funcional, cardio y entrenador personal. Fundado por Edwin González con más de 5 años de trayectoria.",
  url: `${t.meta.siteUrl}/gimnasio-en-cachipay`,
  telephone: t.brand.phone,
  image: `${t.meta.siteUrl}/images/gym-interior.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 3 #1-63, Vía al Colegio Departamental",
    addressLocality: "Cachipay",
    addressRegion: "Cundinamarca",
    postalCode: "252637",
    addressCountry: "CO",
  },
  geo: { "@type": "GeoCoordinates", latitude: 4.7284, longitude: -74.5305 },
  hasMap: t.brand.mapsUrl,
  openingHours: ["Mo-Fr 05:00-11:30", "Mo-Fr 16:00-22:00", "Sa 07:30-12:00"],
  priceRange: "$",
  currenciesAccepted: "COP",
  paymentAccepted: "Cash, Nequi, Daviplata, Bank Transfer",
  areaServed: { "@type": "City", name: "Cachipay" },
  founder: {
    "@type": "Person",
    name: "Edwin González",
    jobTitle: "Coach & CEO",
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const WA_LINK = "https://wa.me/573004436649?text=Hola!%20Quiero%20info%20sobre%20el%20gimnasio%20en%20Cachipay";

export default function GimnasioEnCachipayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div style={{ background: "#0d1117", color: "#fff", minHeight: "100vh", fontFamily: "var(--font-inter, sans-serif)" }}>

        {/* Header */}
        <header style={{ borderBottom: "1px solid rgba(255,255,255,.08)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#16A34A", fontFamily: "var(--font-bebas, sans-serif)", fontSize: 24, letterSpacing: 2, textDecoration: "none" }}>
            GYM COBALTO
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#16A34A", color: "#fff", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            WhatsApp
          </a>
        </header>

        {/* Hero */}
        <section style={{ padding: "64px 24px 48px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#16A34A", fontWeight: 700, letterSpacing: 3, fontSize: 13, textTransform: "uppercase", marginBottom: 16 }}>
            Cachipay · Cundinamarca · Colombia
          </p>
          <h1 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: "clamp(40px, 8vw, 80px)", lineHeight: 1, marginBottom: 24 }}>
            GIMNASIO EN CACHIPAY<br />CUNDINAMARCA
          </h1>
          <p style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 16px" }}>
            Gym Cobalto es el <strong style={{ color: "#fff" }}>único gimnasio completo de Cachipay</strong>. Más de 5 años formando cuerpos y comunidad en el corazón del municipio, fundado y dirigido por Edwin González, coach certificado.
          </p>
          <p style={{ fontSize: 16, color: "#9ca3af", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>
            Musculación, entrenamiento funcional, cardio y entrenador personal. Todo en un solo lugar, con precios accesibles y sin matrícula.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#16A34A", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 16 }}>
              Empezar ahora →
            </a>
            <Link href="/#planes" style={{ border: "1px solid rgba(255,255,255,.2)", color: "#fff", padding: "14px 28px", borderRadius: 10, textDecoration: "none", fontSize: 16 }}>
              Ver planes y precios
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <div style={{ background: "rgba(22,163,74,.1)", border: "1px solid rgba(22,163,74,.3)", borderRadius: 16, padding: "24px 32px", display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
            {[
              { value: "5+", label: "años en Cachipay" },
              { value: "$8K", label: "desde por día" },
              { value: "22°C", label: "clima ideal" },
              { value: "4", label: "servicios completos" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 40, color: "#16A34A", lineHeight: 1 }}>{value}</div>
                <div style={{ color: "#9ca3af", fontSize: 13 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Por qué Cachipay */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 24 }}>
            POR QUÉ ENTRENAR EN CACHIPAY
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { emoji: "🌿", titulo: "Clima perfecto todo el año", texto: "Cachipay tiene una temperatura promedio de 22°C con vegetación exuberante. Entrenar aquí es disfrutar del entorno natural mientras cuidas tu cuerpo." },
              { emoji: "🏙️", titulo: "Sin el caos de la ciudad", texto: "Olvídate del tráfico y el estrés de Bogotá. En Gym Cobalto entrenas en un ambiente tranquilo, motivado y enfocado en tus resultados." },
              { emoji: "💰", titulo: "Precios justos", texto: "Precios asequibles sin sacrificar calidad. Gym Cobalto ofrece equipos profesionales y atención personalizada al precio del municipio." },
              { emoji: "👥", titulo: "Comunidad fitness local", texto: "Más de 5 años construyendo comunidad en Cachipay. Aquí todos se conocen, se apoyan y progresan juntos." },
            ].map(({ emoji, titulo, texto }) => (
              <div key={titulo} style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{emoji}</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{titulo}</h3>
                <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.6 }}>{texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Servicios */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 8 }}>
            SERVICIOS DEL GIMNASIO EN CACHIPAY
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: 32 }}>
            Gym Cobalto cuenta con todo lo que necesitas para alcanzar tus metas fitness en Cachipay, Cundinamarca.
          </p>
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

        {/* Planes y precios */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 8 }}>
            PLANES Y PRECIOS EN CACHIPAY
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: 32 }}>
            Sin matrícula. Sin letra pequeña. Pagas solo lo que usas.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {PLANES.map((p) => (
              <div
                key={p.label}
                style={{
                  background: p.best ? "rgba(22,163,74,.12)" : "#161b22",
                  border: p.best ? "1px solid rgba(22,163,74,.5)" : "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12, padding: "20px 16px", textAlign: "center",
                }}
              >
                <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 8 }}>{p.label}</div>
                <div style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 30, color: p.best ? "#22C55E" : "#16A34A", lineHeight: 1 }}>{p.precio}</div>
                <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>{p.duracion}</div>
                {p.best && <div style={{ marginTop: 8, fontSize: 11, color: "#22C55E", fontWeight: 700, letterSpacing: 1 }}>MÁS POPULAR</div>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: "20px 24px", background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12 }}>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 8 }}>
              <strong style={{ color: "#fff" }}>Métodos de pago:</strong> Efectivo · Nequi · Daviplata · Transferencia bancaria
            </p>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>
              <strong style={{ color: "#fff" }}>Contacto:</strong> WhatsApp 300 443 6649 · @gymcobalto
            </p>
          </div>
        </section>

        {/* Horarios */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 24 }}>
            HORARIOS DEL GIMNASIO EN CACHIPAY
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { dia: "Lunes – Viernes (mañana)", hora: "5:00 a.m. – 11:30 a.m." },
              { dia: "Lunes – Viernes (tarde)", hora: "4:00 p.m. – 10:00 p.m." },
              { dia: "Sábados", hora: "7:30 a.m. – 12:00 p.m." },
              { dia: "Domingos", hora: "Cerrado" },
            ].map(({ dia, hora }) => (
              <div key={dia} style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 6 }}>{dia}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{hora}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Ubicación */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 24 }}>
            UBICACIÓN EN CACHIPAY
          </h2>
          <div style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 24 }}>
            <p style={{ color: "#d1d5db", lineHeight: 1.8, marginBottom: 8 }}>
              <strong>Dirección:</strong> Calle 3 #1-63, Vía al Colegio Departamental, Cachipay, Cundinamarca, Colombia
            </p>
            <p style={{ color: "#d1d5db", lineHeight: 1.8, marginBottom: 8 }}>
              <strong>Coordenadas:</strong> 4.7284, -74.5305
            </p>
            <p style={{ color: "#d1d5db", lineHeight: 1.8, marginBottom: 20 }}>
              <strong>Cómo llegar desde Bogotá:</strong> Toma la Autopista Bogotá–Girardot y sigue las indicaciones hacia Cachipay. El municipio está a aproximadamente 1 hora de Bogotá.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={t.brand.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#16A34A", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                Ver en Google Maps →
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,.2)", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontSize: 14 }}>
                Pedir indicaciones por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 36, letterSpacing: 2, marginBottom: 32 }}>
            PREGUNTAS FRECUENTES — GIMNASIO CACHIPAY
          </h2>
          {FAQ.map(({ q, a }) => (
            <details key={q} style={{ borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 20, marginBottom: 20 }}>
              <summary style={{ fontWeight: 700, fontSize: 16, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                {q} <span style={{ color: "#16A34A", flexShrink: 0, marginLeft: 16 }}>+</span>
              </summary>
              <p style={{ color: "#9ca3af", lineHeight: 1.7, marginTop: 12, paddingLeft: 4 }}>{a}</p>
            </details>
          ))}
        </section>

        {/* Ciudades cercanas */}
        <section style={{ maxWidth: 800, margin: "0 auto 64px", padding: "0 24px" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 30, letterSpacing: 2, marginBottom: 20 }}>
            TAMBIÉN ATENDEMOS DESDE
          </h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "La Mesa", slug: "la-mesa", km: 13 },
              { label: "El Colegio", slug: "el-colegio", km: 8 },
              { label: "Tena", slug: "tena", km: 15 },
              { label: "Anapoima", slug: "anapoima", km: 25 },
              { label: "Apulo", slug: "apulo", km: 35 },
            ].map(({ label, slug, km }) => (
              <Link key={slug} href={`/cerca/${slug}`} style={{ background: "#161b22", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "12px 20px", textDecoration: "none", color: "#d1d5db", fontSize: 14 }}>
                {label} <span style={{ color: "#16A34A" }}>{km} km</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section style={{ background: "rgba(22,163,74,.08)", borderTop: "1px solid rgba(22,163,74,.2)", padding: "48px 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-bebas, sans-serif)", fontSize: 40, marginBottom: 16 }}>
            EMPIEZA HOY EN EL GIMNASIO DE CACHIPAY
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.7 }}>
            No esperes más. Escríbenos por WhatsApp y te orientamos para que empieces esta semana. Tu primera visita puede ser hoy mismo.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#16A34A", color: "#fff", padding: "16px 40px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 18, display: "inline-block" }}>
            Escribir por WhatsApp →
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
            <Link href="/cerca/anapoima" style={{ color: "#6b7280" }}>Cerca de Anapoima</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
