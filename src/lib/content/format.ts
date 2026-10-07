import type { ProjectStatus, ProjectType } from "./schemas";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2023-05" → "May 2023". Pure string formatting (reading the clock would break prerendering). */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** "2026-10-07" → "7 Oct 2026" */
export function formatDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

/** ("2023-05", null) → "May 2023 – Present" */
export function formatRange(start: string, end: string | null): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : "Present"}`;
}

export const statusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Coming soon",
};

export const typeLabel: Record<ProjectType, string> = {
  freelance: "Client project",
  personal: "Personal project",
  professional: "Professional work",
};
