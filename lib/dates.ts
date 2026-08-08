export const PLAN_DURATIONS: Record<string, { months?: number; days?: number }> = {
  semanal:          { days: 6 },
  quincenal:        { days: 14 },
  mensual:          { months: 1 },
  pareja:           { months: 1 },
  familiar:         { months: 1 },
  "semi-asistido":  { months: 1 },
  trimestral:       { months: 3 },
  semestral:        { months: 6 },
  anual:            { months: 12 },
};

export function calcEndDate(start: string, planType: string): string {
  if (!start) return "";
  const dur = PLAN_DURATIONS[planType];
  if (!dur) return "";
  const d = new Date(start + "T12:00:00");
  if (dur.days !== undefined) {
    d.setDate(d.getDate() + dur.days);
  } else if (dur.months !== undefined) {
    // Clampar al último día del mes destino antes de restar 1 día
    // para evitar que Jan 31 + 1 mes desborde a Mar 3 en lugar de Feb 28
    const targetMonth = d.getMonth() + dur.months;
    const lastDayOfTarget = new Date(d.getFullYear(), targetMonth + 1, 0).getDate();
    const clampedDay = Math.min(d.getDate(), lastDayOfTarget);
    d.setDate(clampedDay);
    d.setMonth(targetMonth);
    d.setDate(d.getDate() - 1);
  }
  return d.toISOString().split("T")[0];
}

export interface PaidSub {
  start_date: string;
  end_date: string;
}

export function calcStreakMonths(paidSubs: PaidSub[], today: string): number {
  if (paidSubs.length === 0) return 0;
  const sorted = [...paidSubs].sort((a, b) => a.start_date.localeCompare(b.start_date));
  const todayMs = new Date(today + "T00:00:00").getTime();
  let streak = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    const subEnd = new Date(sorted[i].end_date + "T00:00:00").getTime();
    if (i === sorted.length - 1) {
      if (subEnd >= todayMs) { streak = 1; } else { break; }
    } else {
      const nextStart = new Date(sorted[i + 1].start_date + "T00:00:00").getTime();
      const gapDays = Math.round((nextStart - subEnd) / 86400000);
      if (gapDays <= 2) { streak++; } else { break; }
    }
  }
  return streak;
}

export function calcTotalDaysActive(paidSubs: PaidSub[]): number {
  return paidSubs.reduce((sum, s) => {
    const start = new Date(s.start_date + "T00:00:00");
    const end = new Date(s.end_date + "T00:00:00");
    return sum + Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
  }, 0);
}
