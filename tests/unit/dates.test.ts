import { describe, it, expect } from "vitest";
import { calcEndDate, calcStreakMonths, calcTotalDaysActive } from "@/lib/dates";

// ── calcEndDate ──────────────────────────────────────────────────────────────

describe("calcEndDate", () => {
  it("mensual: paga el 5 de marzo → vence el 4 de abril", () => {
    expect(calcEndDate("2026-03-05", "mensual")).toBe("2026-04-04");
  });

  it("mensual: paga el 10 de abril → vence el 9 de mayo", () => {
    expect(calcEndDate("2026-04-10", "mensual")).toBe("2026-05-09");
  });

  it("mensual: paga el 31 de enero → vence el 28 de febrero (año no bisiesto)", () => {
    expect(calcEndDate("2025-01-31", "mensual")).toBe("2025-02-27");
  });

  it("semanal: inicio el lunes → vence el domingo (6 días)", () => {
    expect(calcEndDate("2026-08-03", "semanal")).toBe("2026-08-09");
  });

  it("quincenal: +14 días", () => {
    expect(calcEndDate("2026-08-01", "quincenal")).toBe("2026-08-15");
  });

  it("trimestral: +3 meses -1 día", () => {
    expect(calcEndDate("2026-01-01", "trimestral")).toBe("2026-03-31");
  });

  it("semestral: +6 meses -1 día", () => {
    expect(calcEndDate("2026-01-01", "semestral")).toBe("2026-06-30");
  });

  it("anual: +12 meses -1 día", () => {
    expect(calcEndDate("2026-01-01", "anual")).toBe("2026-12-31");
  });

  it("plan desconocido devuelve cadena vacía", () => {
    expect(calcEndDate("2026-08-01", "desconocido")).toBe("");
  });

  it("sin fecha inicio devuelve cadena vacía", () => {
    expect(calcEndDate("", "mensual")).toBe("");
  });

  it("pareja usa la misma duración que mensual", () => {
    expect(calcEndDate("2026-05-01", "pareja")).toBe("2026-05-31");
  });
});

// ── calcStreakMonths ─────────────────────────────────────────────────────────

describe("calcStreakMonths", () => {
  it("sin suscripciones → racha 0", () => {
    expect(calcStreakMonths([], "2026-08-08")).toBe(0);
  });

  it("suscripción activa única → racha 1", () => {
    expect(calcStreakMonths([
      { start_date: "2026-08-01", end_date: "2026-08-31" },
    ], "2026-08-08")).toBe(1);
  });

  it("suscripción vencida → racha 0", () => {
    expect(calcStreakMonths([
      { start_date: "2026-06-01", end_date: "2026-06-30" },
    ], "2026-08-08")).toBe(0);
  });

  it("2 meses consecutivos (sin gap) → racha 2", () => {
    expect(calcStreakMonths([
      { start_date: "2026-07-01", end_date: "2026-07-31" },
      { start_date: "2026-08-01", end_date: "2026-08-31" },
    ], "2026-08-08")).toBe(2);
  });

  it("2 meses con gap de 1 día (dentro del margen ≤2) → racha 2", () => {
    expect(calcStreakMonths([
      { start_date: "2026-07-01", end_date: "2026-07-31" },
      { start_date: "2026-08-02", end_date: "2026-09-01" },
    ], "2026-08-08")).toBe(2);
  });

  it("gap de 3 días rompe la racha → 1", () => {
    expect(calcStreakMonths([
      { start_date: "2026-06-01", end_date: "2026-06-30" },
      { start_date: "2026-07-05", end_date: "2026-08-04" },
      { start_date: "2026-08-05", end_date: "2026-09-04" },
    ], "2026-08-08")).toBe(2);
  });

  it("3 meses consecutivos → racha 3", () => {
    expect(calcStreakMonths([
      { start_date: "2026-06-01", end_date: "2026-06-30" },
      { start_date: "2026-07-01", end_date: "2026-07-31" },
      { start_date: "2026-08-01", end_date: "2026-08-31" },
    ], "2026-08-08")).toBe(3);
  });

  it("historial largo pero el más reciente vencido → racha 0", () => {
    expect(calcStreakMonths([
      { start_date: "2026-05-01", end_date: "2026-05-31" },
      { start_date: "2026-06-01", end_date: "2026-06-30" },
    ], "2026-08-08")).toBe(0);
  });
});

// ── calcTotalDaysActive ──────────────────────────────────────────────────────

describe("calcTotalDaysActive", () => {
  it("sin suscripciones → 0 días", () => {
    expect(calcTotalDaysActive([])).toBe(0);
  });

  it("suscripción de 1 mes (31 días) → 31 días", () => {
    expect(calcTotalDaysActive([
      { start_date: "2026-08-01", end_date: "2026-08-31" },
    ])).toBe(31);
  });

  it("suscripción semanal (7 días: inicio + 6) → 7 días", () => {
    expect(calcTotalDaysActive([
      { start_date: "2026-08-01", end_date: "2026-08-07" },
    ])).toBe(7);
  });

  it("acumula días de múltiples suscripciones", () => {
    expect(calcTotalDaysActive([
      { start_date: "2026-07-01", end_date: "2026-07-31" },
      { start_date: "2026-08-01", end_date: "2026-08-31" },
    ])).toBe(62);
  });
});
