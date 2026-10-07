// Typed, validated access to everything in content/. Components import from here, never from content/ directly.
export { getResume } from "./resume";
export {
  getProject,
  getProjectBody,
  getProjects,
  getProjectSlugs,
  type Project,
} from "./projects";
export type { ProjectStatus, ProjectType, Resume } from "./schemas";
