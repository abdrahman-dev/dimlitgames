import { projects as localProjects } from "../data/projects";
import type { Project, ProjectType } from "../types";

class ProjectService {
  private projects: Project[] = localProjects;

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getByType(type: ProjectType): Promise<Project[]> {
    return this.projects.filter((p) => p.type === type);
  }
}

export const projectService = new ProjectService();
