import { GameStatus } from "../types";
import type { Game } from "../types";

export const games: Game[] = [
  {
    id: "unannounced-project",
    title: "Unannounced Project",
    description:
      "An atmospheric psychological horror experience currently in development. A strange world where reality bends and memories fade. The project is still taking shape, and we're not ready to reveal its full form just yet.",
    cover: "/placeholder-cover.jpg",
    gallery: [],
    status: GameStatus.InDevelopment,
    genre: "Psychological Horror",
    featured: true,
  },
];
