"use client";
import { useState, useRef, useEffect, type KeyboardEvent, type FormEvent } from "react";
import Image from "next/image";

type Role = "bot" | "user";
interface Msg { role: Role; text: string; }

// ─── FAQ knowledge base ────────────────────────────────────────────────────
const FAQS: { id: string; keywords: string[]; answer: string }[] = [
  {
    id: "saludo",
    keywords: ["hola", "buenas", "buenos", "dias", "tardes", "noches", "hey", "saludos", "bienvenido"],
    answer: "¡Hola! 👋 Soy el asistente de **Gym Cobalto** en Cachipay. Estoy aquí para responder tus dudas sobre horarios, precios, servicios y más.\n\n¿En qué te puedo ayudar hoy? 💪",
  },
  {
    id: "horarios",
    keywords: ["horario", "hora", "abren", "cierran", "abre", "cierra", "cuando", "abierto", "cerrado", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo", "dias", "jornada", "apertura", "cierre", "atienden", "funciona"],
    answer: "📅 **Horarios Gym Cobalto:**\n\n🟢 Lun–Vie: 5:00 AM – 11:30 AM\n          4:00 PM – 10:00 PM\n🟡 Sábado: 7:30 AM – 12:00 M\n🔴 Domingo: Cerrado\n\nDoble jornada entre semana para que siempre encuentres tu momento 💪\n\n¿Confirmas horarios en Instagram? → @gymcobalto",
  },
  {
    id: "precios",
    keywords: ["precio", "cuanto", "vale", "cuesta", "mensualidad", "plan", "planes", "tarifa", "cobran", "costo", "valor", "pagar", "inscripcion", "membresia", "afiliacion", "dinero", "plata", "caro", "barato", "economico"],
    answer: "💰 **Planes y precios:**\n\n• Día ............. $8.000\n• Semana ......... $35.000\n• Quincena ....... $45.000\n• Mensual básico .. $70.000\n• Semi-asistido ... $120.000\n• Personalizado ... $600.000\n• Trimestre ....... $170.000\n• Semestre ........ $320.000\n• Anual 🏆 ........ $600.000\n• Pareja .......... $65.000 c/u\n• Familiar ........ $60.000 c/u\n\nTodos incluyen acceso a musculación, funcional y cardio 🔥",
  },
  {
    id: "ubicacion",
    keywords: ["donde", "ubicacion", "direccion", "llegar", "mapa", "queda", "encuentran", "esta", "lugar", "como llegar", "cachipay", "calle"],
    answer: "📍 **¿Dónde estamos?**\n\nCalle 3 #1-63\nVía al Colegio Departamental\nCachipay, Cundinamarca\n\nSomos el gym más accesible del municipio — fácil de encontrar y fácil de llegar 🗺️\n\nVer en Maps → bit.ly/gymcobalto-maps",
  },
  {
    id: "servicios",
    keywords: ["servicio", "hacen", "ofrece", "tienen", "hay", "incluye", "disciplina", "actividad", "ejercicio", "entrenamiento", "que hacen", "disponible"],
    answer: "💪 **Servicios disponibles:**\n\n🏋️ **Musculación** — Pesas libres, mancuernas, cables y poleas\n⚡ **Funcional** — HIIT, circuitos, peso corporal y resistencia\n🫀 **Cardio** — Máquinas cardiovasculares completas\n🏃 **Zona Fit** — Clases grupales (¡próximamente!)\n\nTodo en un solo lugar, con equipos completos y ambiente real 🔥",
  },
  {
    id: "entrenador",
    keywords: ["entrenador", "coach", "edwin", "gonzalez", "personal", "quien", "instructor", "profe", "profesor", "asesor", "guia", "dueno", "dueño", "fundador"],
    answer: "👤 **Edwin González — CEO & Coach**\n\nFundador y entrenador jefe de Gym Cobalto. Cachipayuno que empezó con una idea grande: transformar vidas en su propio pueblo.\n\n5+ años formando atletas en Cachipay. Disponible para entrenamientos Semi-Asistidos ($120.000/mes) y Personalizados 1:1 ($600.000/mes).\n\n→ Instagram: @edwin.gonzalez.d",
  },
  {
    id: "contacto",
    keywords: ["contacto", "whatsapp", "telefono", "llamar", "escribir", "numero", "comunicar", "mensaje", "info", "informacion", "hablar"],
    answer: "📞 **Contacto directo:**\n\n💬 WhatsApp: **300 443 6649**\n📱 Instagram: @gymcobalto\n📘 Facebook: Gym Cobalto\n\nEscríbenos por WhatsApp para cualquier consulta, ¡respondemos rápido! 🚀",
  },
  {
    id: "pago",
    keywords: ["pago", "pagar", "transferencia", "nequi", "daviplata", "efectivo", "metodo", "forma de pago", "como pagar", "billetera", "virtual"],
    answer: "💳 **Métodos de pago:**\n\n💜 Nequi → 300 443 6649\n🔴 Daviplata → 300 443 6649\n🏦 Transferencia por llave\n💵 Efectivo en el gym\n\nEnvía tu comprobante por WhatsApp al **300 443 6649** y listo ✅",
  },
  {
    id: "principiante",
    keywords: ["principiante", "nuevo", "nunca", "empezar", "comenzar", "primera vez", "inicio", "novato", "experiencia", "saber"],
    answer: "🌱 **¿Eres nuevo? ¡Bienvenido!**\n\nEn Gym Cobalto recibes orientación desde el primer día. Edwin o su equipo te guían en:\n\n✅ Rutina inicial adaptada a tu objetivo\n✅ Uso correcto de equipos\n✅ Corrección de técnica\n\nEl plan **Semi-Asistido ($120.000/mes)** es perfecto para empezar con guía 💪\n\nEscríbenos: 300 443 6649",
  },
  {
    id: "bajar_peso",
    keywords: ["bajar", "perder", "adelgazar", "grasa", "quemar", "peso", "kilos", "gordura", "barriga", "delgado", "flaco", "dieta", "calorias"],
    answer: "🔥 **Para bajar de peso:**\n\nEn Gym Cobalto combinamos:\n\n⚡ Clases Funcionales — quema grasa intensamente\n🫀 Cardio — resistencia y calorías\n🏋️ Pesas — acelera el metabolismo\n\nEl plan **Semi-Asistido ($120.000/mes)** incluye rutina personalizada para tu objetivo y seguimiento de progreso.\n\nResultados reales, sin suplementos milagrosos 💯",
  },
  {
    id: "ganar_musculo",
    keywords: ["musculo", "ganar", "volumen", "masa", "fuerza", "crecer", "grande", "fibras", "hipertrofia", "tono", "tonificar", "definir"],
    answer: "💪 **Para ganar músculo y fuerza:**\n\nNuestra zona de musculación tiene:\n• Mancuernas completas\n• Barras y discos\n• Máquinas de cables\n• Poleas y equipos de aislamiento\n\nCon un plan personalizado, Edwin diseña tu rutina de sobrecarga progresiva para resultados reales 📈\n\nPlan recomendado: **Semi-Asistido $120.000/mes** o **Personalizado $600.000/mes**",
  },
  {
    id: "distancia",
    keywords: ["lejos", "cerca", "distancia", "la mesa", "anapoima", "tena", "el colegio", "zipacon", "anolaima", "municipio", "veredas", "km", "minutos", "tiempo", "llegar"],
    answer: "🗺️ **¿Vienes de otro municipio?**\n\nEstamos en Cachipay, Cundinamarca. Referentes de distancia:\n\n• La Florida: ~6 km (8 min)\n• La Mesa: ~18 km (22 min)\n• Anolaima: ~10 km (12 min)\n• El Colegio: ~12 km\n• Zipacón: ~22 km (25 min)\n\nMuchos clientes vienen de municipios vecinos porque somos el gym más completo de la zona 🙌",
  },
  {
    id: "clases_funcional",
    keywords: ["clase", "clases", "grupal", "funcional", "hiit", "circuito", "grupo", "sesion", "sesiones"],
    answer: "⚡ **Clases de Funcional:**\n\nEntrenamiento de alta intensidad con enfoque military-style:\n\n• Circuitos de trabajo\n• Peso corporal + resistencia\n• Quema grasa en tiempo récord\n• Clases grupales con Edwin\n\nIncluido en **todos los planes** 💥\n\n¿Cuándo quieres empezar? Escríbenos al 300 443 6649",
  },
  {
    id: "pareja_familiar",
    keywords: ["pareja", "familiar", "familia", "esposa", "esposo", "novio", "novia", "hermano", "dos", "tres", "juntos", "grupo"],
    answer: "👫 **Planes grupales:**\n\n👫 **Plan Pareja** — $65.000 c/u/mes\nDos personas, mismo plan. ¡Entrenen juntos!\n\n👨‍👩‍👧 **Plan Familiar** — $60.000 c/u/mes\n3 o más del mismo hogar. El precio más bajo del gym.\n\nIdeal para motivarse en familia 💪❤️\n\nEscríbenos: 300 443 6649",
  },
  {
    id: "inscripcion",
    keywords: ["inscribir", "registrar", "unir", "afiliarse", "matricular", "entrar", "como empiezo", "primer paso", "ingresar"],
    answer: "✅ **¿Cómo me inscribo?**\n\n3 pasos simples:\n\n1️⃣ Escríbenos por WhatsApp → **300 443 6649**\n2️⃣ Elige tu plan y paga (Nequi, Daviplata o efectivo)\n3️⃣ ¡Ven y empieza! Edwin te orienta el primer día\n\nSin papeleos, sin trámites. Más simple que eso, imposible 🚀",
  },
  {
    id: "resultados",
    keywords: ["resultado", "cuanto tarda", "tiempo", "cuando", "ver cambios", "transformacion", "rapido", "semanas", "meses"],
    answer: "📈 **¿Cuándo veo resultados?**\n\n⚡ Semana 1-2: Más energía, mejor sueño\n💧 Semana 3-4: Cuerpo empieza a adaptarse\n💪 Mes 2-3: Cambios visibles en fuerza y composición\n🔥 Mes 4-6: Transformación evidente\n\nLa clave: **constancia + técnica + plan correcto**. Por eso el plan Semi-Asistido con Edwin acelera los resultados hasta 50% más rápido 🎯",
  },
  {
    id: "gracias",
    keywords: ["gracias", "perfecto", "genial", "excelente", "listo", "entendi", "ok", "bueno", "chevere", "chévere"],
    answer: "¡Con gusto! 😊 Si tienes más dudas, aquí estoy. Recuerda que también puedes escribirnos directamente al WhatsApp **300 443 6649** para todo lo que necesites. ¡Nos vemos en el gym! 💪🟢",
  },
];

const DEFAULT_ANSWER = "Hmm, no estoy seguro de eso 🤔\n\nTe recomiendo escribirle directamente a Edwin por WhatsApp para una respuesta más precisa:\n\n💬 **300 443 6649**\n\nO puedes preguntar sobre: horarios, precios, servicios, ubicación, pagos, inscripción...";

const QUICK_REPLIES = [
  "📅 Horarios",
  "💰 Precios",
  "📍 Ubicación",
  "💪 Servicios",
  "✅ ¿Cómo me inscribo?",
  "👤 Entrenador",
  "💳 ¿Cómo pago?",
];

// ─── Utils ─────────────────────────────────────────────────────────────────
function normalize(s: string) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();
}

function findAnswer(query: string): string {
  const q = normalize(query);
  let best = { score: 0, idx: -1 };
  FAQS.forEach((faq, idx) => {
    const score = faq.keywords.reduce((acc, kw) => {
      if (q.includes(normalize(kw))) return acc + kw.split(" ").length;
      return acc;
    }, 0);
    if (score > best.score) best = { score, idx };
  });
  return best.score > 0 ? FAQS[best.idx].answer : DEFAULT_ANSWER;
}

// ─── Markdown renderer (bold + line breaks) ────────────────────────────────
function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "¡Hola! 👋 Soy el asistente de **Gym Cobalto**.\n\nPregúntame sobre horarios, precios, ubicación, servicios o cómo inscribirte 💪" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: q }]);
    setTyping(true);
    setTimeout(() => {
      const answer = findAnswer(q);
      setMessages(prev => [...prev, { role: "bot", text: answer }]);
      setTyping(false);
    }, 420);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send();
  }

  return (
    <>
      {/* ── Chat panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Asistente Gym Cobalto"
          style={{
            position: "fixed", bottom: 104, right: 24, zIndex: 998,
            width: "min(360px, calc(100vw - 32px))",
            background: "#0d1117",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 20,
            boxShadow: "0 24px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(22,163,74,.15)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            fontFamily: "var(--font-inter, system-ui, sans-serif)",
          }}
        >
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg,#16A34A 0%,#15803d 100%)",
            padding: "14px 18px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Image src="/chatbot-icon-2.png" alt="Asistente" width={36} height={36} style={{ objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.2 }}>
                Asistente Gym Cobalto
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#86efac", display: "inline-block" }} />
                En línea · Respuesta instantánea
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              style={{ background: "none", border: "none", color: "rgba(255,255,255,.8)", cursor: "pointer", padding: 4, fontSize: 18, lineHeight: 1 }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px 14px 8px",
            display: "flex", flexDirection: "column", gap: 10,
            maxHeight: 340,
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,.1) transparent",
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "84%",
                  padding: "10px 13px",
                  borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                  background: m.role === "user"
                    ? "linear-gradient(135deg,#16A34A,#15803d)"
                    : "#161b22",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,.08)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: m.role === "user" ? "#fff" : "#d1d5db",
                  wordBreak: "break-word",
                }}>
                  {renderText(m.text)}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 16px",
                  background: "#161b22",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: "4px 16px 16px 16px",
                  display: "flex", gap: 4, alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#16A34A",
                      animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div style={{
            padding: "6px 10px",
            overflowX: "auto",
            display: "flex", gap: 6,
            scrollbarWidth: "none",
            borderTop: "1px solid rgba(255,255,255,.06)",
          }}>
            {QUICK_REPLIES.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  flexShrink: 0,
                  fontSize: 11, fontWeight: 600,
                  padding: "5px 11px",
                  borderRadius: 999,
                  background: "rgba(22,163,74,.1)",
                  border: "1px solid rgba(22,163,74,.25)",
                  color: "#4ade80",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background .15s",
                }}
                onMouseOver={e => (e.currentTarget.style.background = "rgba(22,163,74,.22)")}
                onMouseOut={e => (e.currentTarget.style.background = "rgba(22,163,74,.1)")}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{
            display: "flex", gap: 8, padding: "10px 12px 12px",
            borderTop: "1px solid rgba(255,255,255,.06)",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta..."
              aria-label="Pregunta al asistente"
              style={{
                flex: 1,
                background: "#161b22",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 10,
                padding: "9px 13px",
                fontSize: 13,
                color: "#fff",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              aria-label="Enviar"
              disabled={!input.trim()}
              style={{
                width: 38, height: 38,
                borderRadius: 10,
                background: input.trim() ? "#16A34A" : "rgba(22,163,74,.25)",
                border: "none", cursor: input.trim() ? "pointer" : "default",
                color: "#fff", fontSize: 17,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background .15s",
                flexShrink: 0,
              }}
            >
              ↑
            </button>
          </form>
        </div>
      )}

      {/* ── Floating bubble ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente Gym Cobalto"}
        style={{
          position: "fixed", bottom: 100, right: 28, zIndex: 999,
          width: 52, height: 52,
          borderRadius: "50%",
          background: open ? "rgba(22,163,74,.15)" : "#000",
          border: open ? "2px solid #16A34A" : "2px solid #16A34A",
          boxShadow: open ? "none" : "0 4px 20px rgba(22,163,74,.5)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          padding: 0,
          transition: "all .2s",
        }}
      >
        {open
          ? <span style={{ fontSize: 20, color: "#16A34A", fontWeight: 700 }}>✕</span>
          : <Image src="/chatbot-icon-2.png" alt="Asistente Gym Cobalto" width={52} height={52} style={{ objectFit: "cover" }} />
        }
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: .5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
