export enum GameStatus {
  Released = "released",
  InDevelopment = "in-development",
  ComingSoon = "coming-soon",
}

export enum ProjectType {
  GameJam = "game-jam",
  Prototype = "prototype",
  Experiment = "experiment",
  Concept = "concept",
  Cancelled = "cancelled",
  InternalDemo = "internal-demo",
}

export interface Game {
  id: string;
  title: string;
  description: string;
  cover: string;
  gallery: string[];
  status: GameStatus;
  genre: string;
  itchUrl?: string;
  featured: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  cover: string;
  gallery: string[];
  type: ProjectType;
  year: number;
  itchUrl?: string;
}

export type ThemeMode = "night" | "dawn";

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}
