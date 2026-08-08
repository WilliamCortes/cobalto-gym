export interface NearbyCity {
  slug: string;
  nombre: string;
  distanciaKm: number;
  tiempoMin: number;
  via: string;
  demanda: string;
  contexto: string;
}

export const CIUDADES_CERCANAS: NearbyCity[] = [
  {
    slug: "la-mesa",
    nombre: "La Mesa",
    distanciaKm: 13,
    tiempoMin: 15,
    via: "vía Bogotá–Girardot (Autopista del Tequendama)",
    demanda: "alta",
    contexto: "La Mesa es la capital del municipio de Tequendama y la ciudad principal de la región. Sus residentes buscan opciones de gimnasio completas que no impliquen viajar a Bogotá.",
  },
  {
    slug: "el-colegio",
    nombre: "El Colegio",
    distanciaKm: 8,
    tiempoMin: 10,
    via: "vía Cachipay–El Colegio",
    demanda: "alta",
    contexto: "El Colegio es el municipio más cercano a Cachipay. Muchos residentes del Colegio frecuentan Gym Cobalto por su cercanía y la calidad de sus instalaciones.",
  },
  {
    slug: "tena",
    nombre: "Tena",
    distanciaKm: 15,
    tiempoMin: 18,
    via: "vía Autopista del Tequendama",
    demanda: "media",
    contexto: "Tena es un municipio tranquilo con comunidad activa. Sus habitantes buscan un gimnasio con equipos profesionales sin necesidad de ir a Bogotá.",
  },
  {
    slug: "anapoima",
    nombre: "Anapoima",
    distanciaKm: 25,
    tiempoMin: 28,
    via: "vía Autopista Bogotá–Girardot",
    demanda: "media",
    contexto: "Anapoima es un destino turístico de clima cálido. Residentes y visitantes de fin de semana buscan mantenerse activos con entrenamientos de calidad.",
  },
  {
    slug: "apulo",
    nombre: "Apulo",
    distanciaKm: 35,
    tiempoMin: 38,
    via: "vía Autopista Bogotá–Girardot pasando por Anapoima",
    demanda: "baja",
    contexto: "Apulo es un municipio de temperatura cálida. Para sus residentes activos, Gym Cobalto es la opción de gimnasio completo más accesible de la región.",
  },
];

export function getCiudadBySlug(slug: string): NearbyCity | undefined {
  return CIUDADES_CERCANAS.find((c) => c.slug === slug);
}
