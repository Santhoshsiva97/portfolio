// Typed, validated access to everything in content/. Components import from here, never from content/ directly.
export { getHome } from "./home";
export { getNow } from "./now";
export { getResume } from "./resume";
export { getServices } from "./services";
export {
  getProject,
  getProjectBody,
  getProjects,
  getProjectSlugs,
  type Project,
  type ProjectHeading,
} from "./projects";
export type {
  Home,
  Now,
  ProjectStatus,
  ProjectType,
  Resume,
  Services,
} from "./schemas";
export {
  formatDate,
  formatRange,
  formatYearMonth,
  statusLabel,
  typeLabel,
} from "./format";
