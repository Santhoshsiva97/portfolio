// Typed, validated access to everything in content/. Components import from here, never from content/ directly.
export { getHome } from "./home";
export { getResume } from "./resume";
export {
  getProject,
  getProjectBody,
  getProjects,
  getProjectSlugs,
  type Project,
  type ProjectHeading,
} from "./projects";
export type { Home, ProjectStatus, ProjectType, Resume } from "./schemas";
export {
  formatDate,
  formatRange,
  formatYearMonth,
  statusLabel,
  typeLabel,
} from "./format";
